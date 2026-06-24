# Boulder Marina Website — Owner Guide

**For:** Marina ownership / management
**Prepared by:** Phil Stepson, Vice-Commodore, Boulder Yacht Club

---

## What You're Looking At

The new bouldermarina.com is a fully redesigned static website built to replace the existing WordPress site. It covers both **Boulder Access Marina** and **Boulder Yacht Club** in a unified, modern site.

All 8 pages are built and ready for your review:

| Page | URL | What's on it |
|---|---|---|
| Home | `/` | Hero photo, marina intro, BYC cross-promo, stats, CTA |
| About | `/about` | Marina history, amenities, store hours, location |
| Services | `/services` | Complete slip rate table, haul/launch, labor, storage |
| Events | `/events` | 2025 BYC racing and social calendar (filterable) |
| Yacht Club | `/boulder-yacht-club` | BYC racing, social events, Sea Scouts, membership |
| Gallery | `/gallery` | Photo albums with lightbox viewer |
| Boats for Sale | `/boats-for-sale` | Member listing placeholder + regional broker directory |
| Contact | `/contact` | Phone, email, hours, slip reservation form, map |

The **"Reserve a Slip"** button in the top navigation opens a reservation form on every page of the site.

---

## Going Live — Step-by-Step

The following steps are required before the new site goes live at bouldermarina.com.

### Step 1 — Owner Review and Approval

Review each of the 8 pages above and mark up any changes:
- Text corrections, updated pricing, additional content
- Photo replacements or additions
- Any pages you'd like added or removed

No changes get made without your approval. The site does not go live until you say so.

---

### Step 2 — Set Up the Contact Form (15 minutes)

Both the "Reserve a Slip" modal and the Contact page form currently use a placeholder address. Before launch, this needs to be registered so form submissions reach your email inbox.

**Steps:**
1. Go to **formspree.io** and create a free account
2. Create a new form — point it to your email address (e.g. `bouldermarina@charter.net`)
3. Copy the form ID that Formspree gives you (looks like `xrgvkpqz`)
4. Share that ID with Phil — he'll update the two lines of code in about 2 minutes

**Cost:** Free for up to 50 submissions/month. Paid plans start at $10/mo if you need more.

---

### Step 3 — GitHub Repository

The website's code and content files live in a **GitHub repository** — think of it as a cloud filing cabinet that tracks every change ever made to the site.

The repository has already been created locally. To go live, it needs to be pushed to GitHub.com:

**Phil's action:** Create a GitHub account (or organization) for the marina and push the repo.
**Your action:** None required. You don't need a GitHub account unless you want one.

**GitHub cost:** Free for public repositories. Private repo is $4/month if desired.

---

### Step 4 — Connect Cloudflare Pages (20 minutes)

**Cloudflare Pages** is the service that takes the code from GitHub and publishes it to the web. It rebuilds and republishes the site automatically every time a change is pushed to GitHub.

**Steps (Phil does this):**
1. Log into Cloudflare dashboard
2. Go to Pages → Create a project → Connect to GitHub
3. Select the Boulder Marina repository
4. Set build command: `npm run build`, output directory: `dist`
5. Click Deploy

From that point on, the site is live at a Cloudflare Pages preview URL (e.g. `boulder-marina-abc123.pages.dev`). You can review it at that URL before switching the domain.

**Cost:** Free. Cloudflare Pages free tier covers the site's needs with room to spare.

---

### Step 5 — Domain Cutover (5 minutes, scheduled in advance)

This is the step that switches bouldermarina.com from the old WordPress site to the new one. It's a simple DNS record change and takes effect within minutes.

**What happens:**
1. Log into your domain registrar (wherever bouldermarina.com is registered)
2. Update the DNS record to point to Cloudflare Pages
3. New site is live — old site is no longer served

**Important:** This is instant and reversible. If anything looks wrong after the switch, it can be pointed back to the old site within minutes while issues are corrected. The old WordPress site is not deleted at cutover.

**Best practice:** Schedule the cutover for a weekday morning when you're available to monitor.

---

### Step 6 — Google Search Console (optional, 10 minutes)

Submit the new sitemap to Google so search rankings transfer smoothly:
1. Go to search.google.com/search-console
2. Verify ownership of bouldermarina.com
3. Submit: `https://bouldermarina.com/sitemap-index.xml`

The new site has structured data (schema.org) and proper SEO tags already built in — this step just helps Google index everything faster.

---

## Estimated Launch Timeline

| Step | Who | Time required |
|---|---|---|
| Owner review + change requests | You | Your schedule |
| Apply requested changes | Phil | 1–2 days per round of feedback |
| Formspree setup | You + Phil | 15 min |
| GitHub + Cloudflare Pages setup | Phil | 1 hour |
| Owner approval of preview URL | You | Your schedule |
| Domain cutover | Phil (you watch) | 5 min |

---

## Updating the Site After Launch

This is the part that matters most for day-to-day ownership.

### Option A — What's Available Right Now

The site is built with **Astro**, a modern web framework that generates plain HTML files. All the content lives in straightforward text files. There are two ways to make changes:

**Through GitHub (no software needed):**
1. Go to the repository on github.com
2. Find the file you want to change (e.g. `src/pages/events.astro`)
3. Click the pencil icon to edit it directly in the browser
4. Make your changes and click "Commit changes"
5. Cloudflare Pages detects the change and rebuilds the site automatically — **usually live within 60 seconds**

This works well for: updating events, changing pricing, editing text, adding news.

**Send changes to Phil:**
For anything more complex (new pages, layout changes, adding photos), send Phil the content and he'll apply and push the changes. Because of the automated pipeline, changes go live within a minute of being pushed.

---

### Option B — TinaCMS Visual Editor (Recommended for Long-Term)

**TinaCMS** is a visual content management system that sits on top of this site and gives you a point-and-click editing experience — no code, no GitHub, no technical knowledge required.

Here's how it works:

```
You edit content in a    →  TinaCMS saves it     →  GitHub stores the    →  Cloudflare Pages
visual admin panel           to GitHub on             change automatically     rebuilds the site
(like WordPress)             your behalf              (version history kept)   in ~60 seconds
```

**What it looks like:**
- You log into `bouldermarina.com/admin`
- You see a menu: Slip Rates, Events, Gallery, Boats for Sale, etc.
- You click what you want to change, edit it in a form, and hit Save
- The site updates automatically — no developer involvement

**What you can edit yourself with TinaCMS:**
- ⚓ Slip rates and pricing — update any row in the table
- 📅 Events — add, remove, or edit any event on the calendar
- 🛥️ Boats for Sale — post a new listing or mark one as sold
- 📸 Gallery — upload new photos, create albums
- ⚙️ Site settings — phone number, email, store hours, address
- ⛵ BYC Board Members — update the officer list each year

**Why isn't it active right now?**
TinaCMS requires a specific software component (`better-sqlite3`) that needs compilation tools not currently present on the development machine. This is a one-time setup issue — once resolved, TinaCMS can be connected in an hour. It does not affect the site's appearance or functionality; it's purely a behind-the-scenes editing tool.

**TinaCMS cost:** Free for the features this site needs (TinaCloud free tier).

---

## Architecture Summary

Here's how the three pieces fit together once TinaCMS is active:

```
┌─────────────────────┐     saves content       ┌───────────────────┐
│   TinaCMS Admin     │ ─────────────────────►  │   GitHub Repo     │
│  (bouldermarina.com │                         │  (source of truth │
│        /admin)      │                         │   every change    │
│                     │                         │   is versioned)   │
│  You log in here    │                         └────────┬──────────┘
│  and edit content   │                                  │
│  like a word        │                                  │ auto-deploy
│  processor          │                                  │ on every change
└─────────────────────┘                                  ▼
                                              ┌───────────────────────┐
                                              │   Cloudflare Pages    │
                                              │  (builds the site and │
                                              │   serves it globally) │
                                              │                       │
                                              │  bouldermarina.com    │
                                              └───────────────────────┘
```

**Key point:** GitHub is just a filing cabinet. You never need to touch it directly — TinaCMS handles it on your behalf. And because every change is stored in GitHub, nothing is ever lost and anything can be undone.

---

## What This Costs (Monthly)

| Service | Cost | What it does |
|---|---|---|
| Cloudflare Pages | **Free** | Hosts and publishes the site globally |
| GitHub | **Free** | Stores all site files and change history |
| TinaCMS (TinaCloud) | **Free** | Visual CMS editor |
| Formspree | **Free** (up to 50 forms/mo) | Delivers reservation form submissions to email |
| Domain (bouldermarina.com) | ~$15/yr | You likely already pay this |

**Total ongoing cost: $0/month** (or ~$1.25/month annualized for the domain)

---

## Frequently Asked Questions

**Can we add new pages later?**
Yes. New pages can be added at any time — Phil creates the page file, pushes to GitHub, and it's live immediately. With TinaCMS active, simple pages can be created directly in the admin panel.

**What happens if something breaks?**
Because every change is stored in GitHub with a full history, any change can be reversed instantly. It's like "undo" with no time limit.

**Can we keep the old WordPress site as a backup?**
Yes. The WordPress site stays on its hosting until you explicitly cancel it. The DNS cutover simply stops directing traffic to it — it remains available at its hosting provider's URL indefinitely.

**Do we need a developer on retainer?**
Not for routine content updates once TinaCMS is active. A developer (Phil) would be needed for: new features, layout redesigns, major new sections, or any custom functionality.

**What about email? Does this affect bouldermarina@charter.net?**
No. Email is completely separate from the website. Switching the domain to Cloudflare Pages has no effect on your email service.

**Is the site mobile-friendly?**
Yes. Every page is fully responsive — tested at mobile, tablet, and desktop widths. The navigation collapses to a hamburger menu on phones.

---

## Contact for Technical Questions

**Phil Stepson**
Vice-Commodore, Boulder Yacht Club
[your contact info here]
