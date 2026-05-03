# Quick Reference Card

## Add Content

| Type | Command | Location |
|------|---------|----------|
| Blog post | `_posts/YYYY-MM-DD-title.md` | Auto-listed in Blog.log |
| Book note | `_notes/title.md` | Auto-listed in Library → Notes |
| Project | Edit `_data/projects.yml` | Listed in Projects.doc |
| Book | Edit `_data/library.yml` | Listed in Library → Shelf |

## Front Matter Templates

### Blog Post
```yaml
---
layout: post
title: "Title"
date: 2024-01-15 12:00:00 +0800
categories: category
---
```

### Book Note
```yaml
---
title: "Book — Author"
source: "Book Title"
tags: [tag1, tag2]
---
```

## URLs

| Page | URL |
|------|-----|
| Homepage | `/` |
| Blog post | `/blog/YYYY/MM/DD/title/` |
| Garden note | `/garden/title/` |
| Book note | `/notes/title/` |
| Desktop + Blog open | `/#w-blog` |
| Desktop + Library open | `/#w-library` |

## Deploy

```bash
git add . && git commit -m "content: update" && git push
```

GitHub Pages auto-builds from `main` branch.
