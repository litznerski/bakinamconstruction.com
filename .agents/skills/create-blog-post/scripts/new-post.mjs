#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../../..');

// Helper to parse CLI arguments
const args = process.argv.slice(2);

function getArgValue(flag) {
  const index = args.indexOf(flag);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return null;
}

const rawSlug = args.find((a) => !a.startsWith('-')) || getArgValue('--slug');

if (!rawSlug) {
  console.error('Error: Please provide a post slug.');
  console.log('Usage: node new-post.mjs <slug> [--title "Title"] [--author "Author"] [--desc "Description"] [--tags "tag1,tag2"]');
  console.log('Example: node new-post.mjs kafouri14-02 --title "Garden Wall Construction"');
  process.exit(1);
}

const slug = rawSlug
  .toLowerCase()
  .replace(/[^a-z0-9-_]/g, '-')
  .replace(/--+/g, '-')
  .replace(/^-|-$/g, '');

const today = new Date().toISOString().split('T')[0];

function toTitleCase(str) {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const title = getArgValue('--title') || toTitleCase(slug);
const author = getArgValue('--author') || 'Christof Litznerski';
const description =
  getArgValue('--desc') ||
  getArgValue('--description') ||
  `Stories, milestones, and construction updates for ${title} in Khartoum.`;
const tagsArg = getArgValue('--tags');
const tags = tagsArg
  ? tagsArg.split(',').map((t) => t.trim()).filter(Boolean)
  : ['construction', 'milestones'];

// 1. Create image asset directory
const imageDir = path.join(projectRoot, 'src/assets/images/blog', slug);
fs.mkdirSync(imageDir, { recursive: true });

// 2. Copy placeholder image
const placeholderSource = path.join(__dirname, '../resources/placeholder.jpg');
const placeholderDest = path.join(imageDir, 'placeholder.jpg');
if (fs.existsSync(placeholderSource) && !fs.existsSync(placeholderDest)) {
  fs.copyFileSync(placeholderSource, placeholderDest);
}

// 3. Read template and populate variables
const templatePath = path.join(__dirname, '../resources/template.mdx');
let templateContent = fs.readFileSync(templatePath, 'utf8');

const populatedContent = templateContent
  .replace(/\{\{TITLE\}\}/g, title)
  .replace(/\{\{DESCRIPTION\}\}/g, description)
  .replace(/\{\{AUTHOR\}\}/g, author)
  .replace(/\{\{DATE\}\}/g, today)
  .replace(/\{\{TAGS\}\}/g, JSON.stringify(tags))
  .replace(/\{\{SLUG\}\}/g, slug);

// 4. Write MDX file
const mdxPath = path.join(projectRoot, 'src/content/blog', `${slug}.mdx`);
if (fs.existsSync(mdxPath)) {
  console.error(`Error: Post file already exists at ${mdxPath}`);
  process.exit(1);
}

fs.writeFileSync(mdxPath, populatedContent, 'utf8');

console.log('✓ Successfully created new blog post:');
console.log(`  - Post File: src/content/blog/${slug}.mdx`);
console.log(`  - Image Dir: src/assets/images/blog/${slug}/`);
console.log(`  - Status: draft`);
console.log(`  - Placeholder Image: src/assets/images/blog/${slug}/placeholder.jpg`);
console.log('\nNext steps:');
console.log('  1. Add real photos to the image directory.');
console.log('  2. Edit content and update image references in the .mdx file.');
console.log('  3. Change status from "draft" to "public" when ready to publish.');
