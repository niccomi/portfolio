# ═══════════════════════════════════════════════════════════════
#  OPTION B: HYBRID SETUP — STEP-BY-STEP GUIDE
#  OS Theme + Jekyll Markdown Collections + Permalink Pages
# ═══════════════════════════════════════════════════════════════

## Overview

This setup gives you:
- ✅ A single-page OS desktop as the homepage (your `index_os_code.html` experience)
- ✅ Individual permalink pages for every post, garden note, and book note
- ✅ Standard Jekyll markdown workflow (add .md files → Jekyll builds → deploy)
- ✅ Deep-linking support (share `/blog/2023/08/31/gaming/` directly)
- ✅ The game intro sequence preserved on first visit

---

## STEP 1: Prepare Your Repo

### 1.1 Create a new branch (recommended)
```bash
cd /path/to/nicothyun.github.io
git checkout -b os-theme-jekyll
```

### 1.2 Backup your current site
```bash
# Save your current Jekyll files
git add .
git commit -m "backup: pre-os-theme"
```

---

## STEP 2: Install the Starter Files

Copy all files from the `nicothyun-os-jekyll/` folder into your repo root:

```
nicothyun.github.io/
├── _config.yml              ← NEW (Jekyll collections config)
├── Gemfile                  ← NEW (dependencies)
├── index.html               ← NEW (OS desktop with Liquid)
├── README.md                ← NEW (documentation)
│
├── _data/
│   ├── about.yml            ← NEW (About window content)
│   ├── projects.yml         ← NEW (Projects window content)
│   ├── contact.yml          ← NEW (Contact window content)
│   └── library.yml          ← NEW (Library books data)
│
├── _posts/                  ← EXISTING (keep your current posts)
│   ├── 2023-08-31-gaming.md
│   └── 2015-11-28-travel.md
│
├── _garden/                 ← NEW (Digital Garden notes)
│   ├── knowledge-through-action.md
│   ├── crypto-as-coordination.md
│   └── rugby-as-systems-thinking.md
│
├── _notes/                  ← NEW (Book notes & highlights)
│   ├── obviously-awesome.md
│   ├── positioning.md
│   ├── zero-to-one.md
│   ├── hooked.md
│   └── art-of-living.md
│
├── _layouts/
│   ├── default.html         ← NEW (minimal wrapper)
│   ├── post.html            ← NEW (single blog post page)
│   ├── garden.html          ← NEW (single garden note page)
│   └── note.html            ← NEW (single book note page)
│
└── assets/
    ├── css/
    │   └── os-theme.css     ← NEW (extracted styles)
    └── js/
        └── os-theme.js      ← NEW (extracted scripts + routing)
```

---

## STEP 3: Configure Jekyll

### 3.1 Review `_config.yml`

The provided `_config.yml` defines three collections:

```yaml
collections:
  posts:      # Standard Jekyll blog posts
    output: true
    permalink: /blog/:year/:month/:day/:title/

  garden:     # Digital garden notes
    output: true
    permalink: /garden/:title/

  notes:      # Book notes & highlights
    output: true
    permalink: /notes/:title/
```

### 3.2 Install dependencies
```bash
bundle install
```

If you don't have Bundler:
```bash
gem install bundler
bundle install
```

---

## STEP 4: Migrate Your Existing Content

### 4.1 Blog Posts (if you have existing `_posts/`)

Your existing Jekyll posts should work as-is. Just ensure they have front matter:

```yaml
---
layout: post
title: "Your Title"
date: YYYY-MM-DD HH:MM:SS +0800
categories: category-name
---
```

### 4.2 About Section

Edit `_data/about.yml`:
```yaml
name: Nicole Teo
title: Marketing & Strategy
location: Singapore 🇸🇬

bio: |
  Your bio here. Supports **markdown**.

philosophy: |
  Your philosophy here.

links:
  - label: Publications & content archive
    url: https://your-notion-link
    icon: 📚
```

### 4.3 Projects

Edit `_data/projects.yml`:
```yaml
- title: Your Project Title
  period: 2022 – Present
  description: |
    Your description. Supports markdown.
  tags:
    - Tag1
    - Tag2
```

### 4.4 Library Books

Edit `_data/library.yml`:
```yaml
currently_reading:
  title: Book Title
  author: Author Name
  cover: https://covers.openlibrary.org/b/isbn/XXXXXXXXXX-M.jpg
  progress: 68

read:
  - title: Another Book
    author: Another Author
    cover: https://covers.openlibrary.org/b/isbn/XXXXXXXXXX-M.jpg
    isbn: "XXXXXXXXXX"
```

### 4.5 Contact

Edit `_data/contact.yml`:
```yaml
- platform: Email
  handle: your@email.com
  url: mailto:your@email.com
  icon: ✉️
```

---

## STEP 5: Test Locally

### 5.1 Serve the site
```bash
bundle exec jekyll serve
```

### 5.2 Open in browser
```
http://localhost:4000
```

### 5.3 Test the flow
1. Game intro should play (click or space to advance)
2. Skip intro → Desktop appears
3. Double-click icons → Windows open
4. Click Blog entries → Should open individual post pages
5. Click Garden sprouts → Should open individual note pages
6. Click Library notes → Should open individual note pages

### 5.4 Test deep-linking
```
http://localhost:4000#w-blog       → Opens Blog window directly
http://localhost:4000#w-library      → Opens Library window directly
http://localhost:4000/blog/2023/08/31/gaming/  → Direct post page
```

---

## STEP 6: Customize

### 6.1 Add a new blog post
```bash
# Create file: _posts/2024-01-15-new-post.md
---
layout: post
title: "New Post Title"
date: 2024-01-15 12:00:00 +0800
categories: marketing
---

Your markdown content here.
```

### 6.2 Add a garden note
```bash
# Create file: _garden/new-idea.md
---
title: "New Idea"
tags: [strategy, growth]
status: seedling
---

Your evergreen note here.
```

### 6.3 Add a book note
```bash
# Create file: _notes/new-book.md
---
title: "Book Title — Author"
source: "Book Title"
tags: [category1, category2]
---

Your highlight or thought here.
```

### 6.4 Update library books
Edit `_data/library.yml` and add to the `read:` array.

---

## STEP 7: Deploy to GitHub Pages

### 7.1 Commit everything
```bash
git add .
git commit -m "feat: os theme with jekyll collections"
```

### 7.2 Push to GitHub
```bash
git push origin os-theme-jekyll
```

### 7.3 Merge to main
```bash
git checkout main
git merge os-theme-jekyll
git push origin main
```

### 7.4 GitHub Pages settings
1. Go to repo Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Wait 2-3 minutes for build

---

## STEP 8: Post-Deploy Verification

### 8.1 Check these URLs
```
https://nicothyun.github.io/                    → OS Desktop
https://nicothyun.github.io/#w-blog              → Desktop with Blog open
https://nicothyun.github.io/blog/2023/08/31/gaming/  → Individual post
https://nicothyun.github.io/garden/knowledge-through-action/  → Garden note
https://nicothyun.github.io/notes/obviously-awesome/  → Book note
```

### 8.2 Common issues

| Issue | Fix |
|-------|-----|
| CSS not loading | Check `baseurl` in `_config.yml`. If using custom domain, set `baseurl: ""` |
| Posts not showing | Ensure filenames use `YYYY-MM-DD-title.md` format |
| Garden/notes 404 | Check `_config.yml` collections are defined correctly |
| Images broken | Use `{{ '/assets/images/file.jpg' \| relative_url }}` for paths |

---

## FILE REFERENCE

### Content Sources for Each Window

| Window | Source File | Edit This To Change |
|--------|-------------|---------------------|
| **About.txt** | `_data/about.yml` | Bio, philosophy, links |
| **Projects.doc** | `_data/projects.yml` | Project list, descriptions |
| **Blog.log** | `_posts/*.md` | Add new .md files |
| **Garden.plant** | `_garden/*.md` | Add new .md files |
| **Library.bk (Shelf)** | `_data/library.yml` | Book list, covers |
| **Library.bk (Notes)** | `_notes/*.md` | Add new .md files |
| **Contact.txt** | `_data/contact.yml` | Social links |

### Layout Templates

| Layout | Used For | URL Pattern |
|--------|----------|-------------|
| `default.html` | Homepage wrapper | `/` |
| `post.html` | Blog posts | `/blog/YYYY/MM/DD/title/` |
| `garden.html` | Garden notes | `/garden/title/` |
| `note.html` | Book notes | `/notes/title/` |

---

## WORKFLOW SUMMARY

### Daily: Add Content
```bash
# New blog post
echo "---\nlayout: post\ntitle: 'Title'\ndate: $(date +%Y-%m-%d) 12:00:00 +0800\n---\n\nContent" > _posts/$(date +%Y-%m-%d)-title.md

# New garden note
echo "---\ntitle: 'Note'\ntags: [tag]\n---\n\nContent" > _garden/note-title.md

# Rebuild & deploy
git add . && git commit -m "content: new post" && git push
```

### Weekly: Update Static Data
```bash
# Edit YAML files
vim _data/projects.yml
vim _data/library.yml

# Commit & deploy
git add _data/ && git commit -m "data: update projects" && git push
```

---

## NEXT STEPS / ENHANCEMENTS

1. **Custom domain**: Add `CNAME` file and update DNS
2. **Analytics**: Add Plausible or Fathom to `_layouts/default.html`
3. **Comments**: Add Utterances to `_layouts/post.html`
4. **RSS**: Already included via `jekyll-feed` plugin
5. **Search**: Add Lunr.js or Algolia DocSearch
6. **Dark mode**: Add a theme toggle in the taskbar
7. **More windows**: Add Resume.pdf, Photos.album, etc.

---

## TROUBLESHOOTING

### Jekyll build errors
```bash
# Clean and rebuild
bundle exec jekyll clean
bundle exec jekyll build

# Verbose output
bundle exec jekyll build --verbose
```

### GitHub Pages build failures
Check: Settings → Pages → Build and deployment → View build logs

### Local serve issues
```bash
# Check Ruby version
ruby -v  # Should be 2.7+ or 3.x

# Update gems
bundle update

# Check for conflicts
bundle exec jekyll doctor
```

---

Made with 💜 and VT323.
