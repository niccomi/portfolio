# Quick Reference Card

## Add Content

| Type | File | Shows in |
|------|------|----------|
| Project | `_posts/YYYY-MM-DD-title.md` with `category: projects` | Projects.doc (as a card) |
| Blog post | `_posts/YYYY-MM-DD-title.md` with any other category | Blog.log |
| About / Contact | edit `_data/about.yml` / `_data/contact.yml` | About.txt / Contact.txt |
| Library (hidden) | `_data/library.yml` | Library.bk *(currently hidden)* |

**Rule:** `category: projects` → Projects. Anything else (`blog`, `personal`, …) → Blog.

## Front Matter Templates

### Project
```yaml
---
layout: post
category: projects
project_type: work          # or personal (optional)
title: Project Title
headline: One-line summary
date: 2025-01-15
image: /images/thumb.png    # card image (preview: also works)
tags: [Branding, Strategy]  # optional
period: Present             # optional
---
```

### Blog Post
```yaml
---
layout: post
category: blog              # NOT "projects"
title: Post Title
date: 2025-01-15
---
```

## Images
- Put files in `images/`, reference as `/images/name.png`.
- Card thumbnail = `image:` **or** `preview:` front matter.
- Use hyphens, **no spaces**, in filenames (`my-image.png`).

## Behavior notes
- Project & blog entries open as **draggable popup windows** (iframe of the post).
- Each post also has a real permalink (good for sharing / SEO).
- **Library** and the **game intro** are hidden but preserved — see README to re-enable.

## URLs

| Page | URL |
|------|-----|
| Homepage | `/portfolio/` |
| Blog/Project post | `/portfolio/blog/YYYY/MM/DD/title/` |
| Desktop + Blog open | `/portfolio/#w-blog` |
| Desktop + Projects open | `/portfolio/#w-projects` |
| Local dev | `http://localhost:4000/portfolio/` |

## Deploy

```bash
git add . && git commit -m "content: update" && git push
```

GitHub Pages auto-builds from `main` via `.github/workflows/jekyll.yml`
(Pages Source = **GitHub Actions**). Keep only **one** Pages workflow.
