#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../..');

const args = process.argv.slice(2);
const slugArg = args.find((a) => !a.startsWith('-'));

if (!slugArg) {
  console.error('Error: Please provide a blog post slug.');
  console.log('Usage: node sync-ar.mjs <slug> [--force]');
  console.log('Example: node sync-ar.mjs kafouri14-02-kitchen-prep');
  process.exit(1);
}

const slug = slugArg.replace(/\.mdx?$/, '');
const enPath = path.join(projectRoot, 'src/content/blog', `${slug}.mdx`);
const arPath = path.join(projectRoot, 'src/content/blog/ar', `${slug}.mdx`);

if (!fs.existsSync(enPath)) {
  console.error(`Error: English post not found at ${enPath}`);
  process.exit(1);
}

// Load glossary
const glossaryPath = path.join(__dirname, '../resources/glossary.json');
let glossary = { authors: {}, tags: {}, terms: {} };
if (fs.existsSync(glossaryPath)) {
  try {
    glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));
  } catch (err) {
    console.warn('Warning: Could not parse glossary.json');
  }
}

const enContent = fs.readFileSync(enPath, 'utf8');

// Parse frontmatter
const fmMatch = enContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) {
  console.error('Error: Could not parse frontmatter in English post.');
  process.exit(1);
}

const rawFrontmatter = fmMatch[1];
const body = enContent.slice(fmMatch[0].length);

// Helper to adjust relative paths from 2 levels up (../../) to 3 levels up (../../../)
function adjustPaths(str) {
  return str
    .replace(/(['"])\.\.\/\.\.\/components\//g, '$1../../../components/')
    .replace(/(['"])\.\.\/\.\.\/assets\//g, '$1../../../assets/');
}

// Transform frontmatter for Arabic
let arFrontmatter = adjustPaths(rawFrontmatter);

// Ensure lang: "ar"
if (/^lang:\s*.*$/m.test(arFrontmatter)) {
  arFrontmatter = arFrontmatter.replace(/^lang:\s*.*$/m, 'lang: "ar"');
} else {
  arFrontmatter += '\nlang: "ar"';
}

// Translate author if in glossary
for (const [enAuthor, arAuthor] of Object.entries(glossary.authors || {})) {
  const authorRegex = new RegExp(`^author:\\s*["']?${enAuthor}["']?`, 'm');
  if (authorRegex.test(arFrontmatter)) {
    arFrontmatter = arFrontmatter.replace(authorRegex, `author: "${arAuthor}"`);
  }
}

// Translate tags if matched
const tagsMatch = arFrontmatter.match(/^tags:\s*\[(.*?)\]/m);
if (tagsMatch) {
  const currentTags = tagsMatch[1]
    .split(',')
    .map((t) => t.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);

  const translatedTags = currentTags.map((tag) => {
    return glossary.tags[tag] || tag;
  });

  const formattedTags = `tags: [${translatedTags.map((t) => `"${t}"`).join(', ')}]`;
  arFrontmatter = arFrontmatter.replace(tagsMatch[0], formattedTags);
}

const exists = fs.existsSync(arPath);
const force = args.includes('--force');

if (!exists || force) {
  // Transform imports and paths in body
  const transformedBody = adjustPaths(body);

  const fullArFile = `---\n${arFrontmatter.trim()}\n---\n${transformedBody}`;
  fs.mkdirSync(path.dirname(arPath), { recursive: true });
  fs.writeFileSync(arPath, fullArFile, 'utf8');

  console.log(`✓ ${exists ? 'Overwrote' : 'Created'} Arabic skeleton at:`);
  console.log(`  ${path.relative(projectRoot, arPath)}`);
  console.log('\nPaths automatically adjusted:');
  console.log('  - Components: ../../../components/');
  console.log('  - Assets: ../../../assets/');
  console.log('  - lang: "ar"');
} else {
  console.log(`ℹ Arabic post already exists at: ${path.relative(projectRoot, arPath)}`);
  console.log('Synchronizing structural components and asset imports...');

  const currentArContent = fs.readFileSync(arPath, 'utf8');
  
  // Extract all import statements from EN
  const enImports = (enContent.match(/^import\s+.*?;?$/gm) || []).map(adjustPaths);
  const arImports = (currentArContent.match(/^import\s+.*?;?$/gm) || []);

  const missingImports = enImports.filter((imp) => !arImports.includes(imp));
  if (missingImports.length > 0) {
    console.log(`\nFound ${missingImports.length} missing or updated import(s) from EN post:`);
    missingImports.forEach((imp) => console.log(`  + ${imp}`));
  } else {
    console.log('All image and component imports are up-to-date.');
  }

  // Check gallery and embed presence
  const enGalleries = (enContent.match(/<BlogGallery[\s\S]*?\/>/g) || []).length;
  const arGalleries = (currentArContent.match(/<BlogGallery[\s\S]*?\/>/g) || []).length;
  const enEmbeds = (enContent.match(/<YouTubeEmbed[\s\S]*?\/>/g) || []).length;
  const arEmbeds = (currentArContent.match(/<YouTubeEmbed[\s\S]*?\/>/g) || []).length;

  console.log(`\nComponent Counts:`);
  console.log(`  - <BlogGallery />: EN=${enGalleries}, AR=${arGalleries}`);
  console.log(`  - <YouTubeEmbed />: EN=${enEmbeds}, AR=${arEmbeds}`);

  if (enGalleries !== arGalleries || enEmbeds !== arEmbeds) {
    console.log('\n⚠ Warning: Component count mismatch between EN and AR posts. Check for added or removed media.');
  }
}
