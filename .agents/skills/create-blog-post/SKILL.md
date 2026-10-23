---
name: create-blog-post
description: Scaffolds a new boilerplate blog post in English (MDX) with status set to draft, sets up its dedicated image asset directory with a placeholder image, and verifies content collection compatibility. Activate this skill when the user asks to create, add, or scaffold a new blog post.
---

# Create Blog Post Skill

Use this skill to scaffold a new English blog post for Bakinam Construction with zero manual setup.

## Workflow

### 1. Determine Post Metadata

Gather or deduce the following information from the user's prompt:
- **`slug`**: A URL-safe identifier (e.g. `kafouri14-02`, `bahri-compound-rehab`).
- **`title`**: Descriptive title (e.g. `Kafouri 14 - Rebuilding the Garden Wall`).
- **`description`**: 1–2 sentence summary of the project milestone.
- **`author`**: Default to `Christof Litznerski` (or `Bakinam Osman Rahama` if relevant).
- **`tags`**: Relevant tags (e.g. `["Kafouri14", "construction", "milestones"]`).
- **`status`**: Defaults to `"draft"` so it does not appear on public lists until reviewed.
- **`date`**: Current date in `YYYY-MM-DD` format.

---

### 2. Scaffold Using the Helper Script

Run the helper script from the workspace root:

```bash
node .agents/skills/create-blog-post/scripts/new-post.mjs <slug> \
  --title "Your Post Title" \
  --author "Christof Litznerski" \
  --desc "Brief summary of the post" \
  --tags "Kafouri14,construction,milestones"
```

This automated step:
1. Creates the image directory at:  
   `src/assets/images/blog/<slug>/`
2. Copies the branded placeholder image into:  
   `src/assets/images/blog/<slug>/placeholder.jpg`
3. Instantiates `src/content/blog/<slug>.mdx` from `resources/template.mdx` with:
   - `status: "draft"`
   - `lang: "en"`
   - `image: "../../assets/images/blog/<slug>/placeholder.jpg"`
   - Standard MDX component imports (`Image`, `BlogGallery`, and commented `YouTubeEmbed`).
   - Boilerplate structure (intro paragraph, single hero `<figure>`, `<BlogGallery>` example).

---

### 3. Manual Fallback (Alternative to Script)

If running the script is not preferred, manually create:
1. Directory: `src/assets/images/blog/<slug>/`
2. Copy `.agents/skills/create-blog-post/resources/placeholder.jpg` to `src/assets/images/blog/<slug>/placeholder.jpg`
3. Create `src/content/blog/<slug>.mdx` using the frontmatter and template found in [template.mdx](./resources/template.mdx).

---

### 4. Validation

Always verify that the newly scaffolded post adheres to the Zod content collection schema and Astro builds cleanly:

```bash
ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build
```

---

### 5. Publishing Instructions for the User

Inform the user:
- The new post is scaffolded at `src/content/blog/<slug>.mdx`.
- Photos can be dropped directly into `src/assets/images/blog/<slug>/`.
- When ready to publish to the website, change `status: "draft"` to `status: "public"` in the frontmatter.
- To create the corresponding Arabic translation, create `src/content/blog/ar/<slug>.mdx` with `lang: "ar"`.
