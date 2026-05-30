# Nicole — OS Theme Portfolio

A pixel-art Win95-style OS desktop portfolio built with Jekyll and powered by markdown.
Live at **https://niccomi.github.io/portfolio/**

## How it works

The homepage (`index.html`) is a single desktop "OS". Each icon opens a draggable
window. **Projects** and **Blog** are driven by markdown files in `_posts/`, and
each entry opens *in-desktop* as a draggable popup window (an `<iframe>` of the
post's own page) — while still having a real shareable permalink.

| Window | Source | Notes |
|--------|--------|-------|
| About.txt | `_data/about.yml` | Bio, links, philosophy |
| Projects.doc | `_posts/*.md` with `category: projects` | Cards with thumbnail images |
| Blog.log | `_posts/*.md` with **any other** category | Excludes `projects` |
| Contact.txt | `_data/contact.yml` | Social / contact links |
| Garden.plant | external link | Opens the digital garden site |
| Library.bk | `_data/library.yml` | **Currently hidden** (see below) |

> The single rule for posts: `category: projects` → **Projects.doc**.
> Anything else (e.g. `blog`, `personal`) → **Blog.log**.

## Structure

```
├── _config.yml          # Jekyll config (baseurl: /portfolio)
├── index.html           # OS desktop (the single-page shell)
├── _data/               # about.yml, contact.yml, library.yml
├── _posts/              # Projects (category: projects) + blog posts
├── _layouts/            # default.html, post.html, library.html
├── assets/
│   ├── css/os-theme.css # Win95 pixel-art styling
│   └── js/os-theme.js   # Window manager, audio, popups, routing
├── images/              # Project thumbnails & post images
└── .github/workflows/   # jekyll.yml — builds & deploys to Pages
```

## Quick Start (local)

```bash
bundle install
bundle exec jekyll serve
```

Then open **http://localhost:4000/portfolio/** — the `/portfolio/` path matters
because `baseurl` is set for the project-pages deploy.

```bash
# Production build
bundle exec jekyll build
```

## Adding Content

### A Project (shows in Projects.doc)
Create `_posts/YYYY-MM-DD-title.md`:
```yaml
---
layout: post
category: projects
project_type: work        # or: personal  (optional)
title: My Project Title
headline: One-line summary shown in the post header
date: YYYY-MM-DD
image: /images/my-thumb.png   # card thumbnail (preview: also works)
tags: [Marketing, Branding]   # optional chips
period: Present               # optional, shown in card subtitle
---

Markdown body here…
```
- The card thumbnail comes from `image:` **or** `preview:` (either key works).
- Put image files in `images/` and reference them as `/images/...`.
- ⚠️ Avoid spaces in image filenames — use hyphens (`my-thumb.png`).

### A Blog Post (shows in Blog.log)
Create `_posts/YYYY-MM-DD-title.md`:
```yaml
---
layout: post
category: blog            # anything except "projects"
title: My Post Title
date: YYYY-MM-DD
---

Markdown body here…
```

## Re-enabling hidden sections

Two things are intentionally **hidden but preserved** in the code:

- **Library** — uncomment the Library desktop icon and taskbar button in
  `index.html` (search for `Library temporarily hidden`).
- **Game intro** — remove the two Liquid comment wrappers (`{% comment %}` /
  `{% endcomment %}`) around the `#game-intro` block in `index.html`
  (search for `GAME INTRO temporarily hidden`).

## Deployment

GitHub Pages builds automatically on every push to `main` via a **single** workflow
(`.github/workflows/jekyll.yml`, using `actions/jekyll-build-pages`).
Pages **Source** must be set to **GitHub Actions** (Settings → Pages).

```bash
git add . && git commit -m "content: update" && git push
```

> Note: keep only one Pages workflow. Multiple deploy workflows race each other and
> can intermittently serve raw, unbuilt files.

---

Made with 💜 and VT323.
