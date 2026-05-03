# Nicole Teo — OS Theme Portfolio

A pixel-art OS desktop portfolio built with Jekyll. 
Styled with the Win95 aesthetic, powered by markdown.

## Structure

```
├── _config.yml          # Jekyll configuration
├── index.html           # OS Desktop (SPA shell)
├── _data/               # YAML data files (About, Projects, Contact, Library)
├── _posts/              # Blog posts (standard Jekyll)
├── _garden/             # Digital garden notes
├── _notes/              # Book notes & highlights
├── _layouts/            # Page templates
└── assets/              # CSS, JS, images
```

## Quick Start

```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Build for production
bundle exec jekyll build
```

## Adding Content

### Blog Post
Create `_posts/YYYY-MM-DD-title.md` with front matter:
```yaml
---
layout: post
title: "Your Title"
date: YYYY-MM-DD HH:MM:SS +0800
categories: category
---
```
---
```

### Book Note
Create `_notes/book-title.md`:
```yaml
---
title: "Book Title — Author"
source: "Book Title"
tags: [tag1, tag2]
---
```

## Deployment

Push to GitHub. GitHub Pages auto-builds from `main` branch.

---

Made with 💜 and VT323.
