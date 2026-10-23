---
name: translate-blog-post
description: Creates or updates the translated Arabic version of an English blog post in Astro. Adjusts import path depths (../../../), synchronizes frontmatter (lang="ar", status, date), translates metadata, author, tags, captions, and body text using culturally authentic Sudanese Arabic construction terms, and verifies with astro build. Activate this skill when the user asks to translate, create, or update an Arabic blog post.
---

# Translate Blog Post Skill

Use this skill to create a new Arabic translation or update an existing Arabic version of an English blog post for Bakinam Construction.

---

## Key Differences: English vs. Arabic Posts

1. **File Locations**:
   - English: `src/content/blog/<slug>.mdx`
   - Arabic: `src/content/blog/ar/<slug>.mdx`
2. **Relative Path Depth**:
   - Because Arabic posts are inside `ar/`, relative paths must go up **3 levels** (`../../../`) instead of **2 levels** (`../../`):
     - Components: `import BlogGallery from '../../../components/BlogGallery.astro';`
     - Assets: `import HeroImg from '../../../assets/images/blog/<slug>/hero.jpeg';`
     - Frontmatter image: `image: "../../../assets/images/blog/<slug>/hero.jpeg"`
3. **Frontmatter**:
   - `lang: "ar"` (must be set)
   - `status`: Synchronized with English post (`"draft"` or `"public"`)
   - `date`: Matches English post (`YYYY-MM-DD`)
   - `author`: Translated to Arabic script (e.g. `Christof Litznerski` -> `"كريستوف ليتزنرسكي"`, `Bakinam Osman Rahama` -> `"باكينام عثمان رحمة"`)
   - `tags`: Translated into Arabic hashtags/keywords (e.g. `["كافوري١٤", "مطبخ", "بناء_المنازل", "محطات"]`)
   - `title` & `description`: Accurate, natural Arabic suited for Sudanese construction and engineering.
4. **Body & Media Structure**:
   - All components (`<YouTubeEmbed>`, `<BlogGallery>`, `<Image>`, `<figure>`) and image variable names must match the English post 1-to-1.
   - Props like `orientation="portrait"`, `columns={2}`, and `playlist="..."` must be preserved.
   - All `caption`, `alt`, and `title` props should be translated into Arabic.

---

## Workflow

### 1. Identify Post Slug & Mode

Determine the target `<slug>` from the user prompt or active document.
Check if `src/content/blog/ar/<slug>.mdx` exists:
- **Mode A: Create** (file does not exist yet)
- **Mode B: Update / Sync** (file already exists, user edited the English version)

---

### 2. Scaffold or Synchronize Structure

Run the sync helper script:

```bash
node .agents/skills/translate-blog-post/scripts/sync-ar.mjs <slug>
```

- In **Create Mode**: Scaffolds `src/content/blog/ar/<slug>.mdx` with automatically adjusted paths (`../../../`), `lang: "ar"`, translated author, and mapped tags.
- In **Update Mode**: Compares the component count (`<BlogGallery>`, `<YouTubeEmbed>`) and imports against the English version and reports any newly added or missing assets.

---

### 3. Translate Content & Captions

Translate the content following these standards:
- **Tone**: Professional, encouraging, and clear.
- **Terminology Reference**: See [glossary.json](./resources/glossary.json).
  - *Center column* -> العمود الأوسط
  - *Preparation work* -> أعمال التجهيز والتحضير
  - *Foundation / structural work* -> الأعمال الإنشائية
  - *Electrical wiring stripped* -> سحب وسرقة التوصيلات الكهربائية
- **Component Captions**: Translate every `caption` and `alt` attribute in `<BlogGallery images={[...]} />`, `<figure>`, and `<YouTubeEmbed />`.
- **Preserve Video & Playlist IDs**: Do NOT alter YouTube video URLs or playlist IDs (e.g. `playlist="PLFpQvYTKs4K0"`).

---

### 4. Verification

Always verify the site builds cleanly:

```bash
ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build
```

Verify:
1. No `ImageNotFound` errors.
2. Route `/ar/blog/<slug>` is properly generated.
3. Frontmatter matches content collection schema in `src/content.config.ts`.
