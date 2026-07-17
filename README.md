# Boulder Marina — Astro Static Site

**Live site (current WordPress):** https://bouldermarina.com
**New site preview:** https://boulder-marina.pages.dev (pending DNS cutover — owner approval required)
**Tech stack:** Astro 7 · Static output · Cloudflare Pages · `mailto:` forms (Formspree planned)

> TinaCMS was removed due to a native module compile failure on Node 26 (no Xcode CLT).
> All content is currently hardcoded in the Astro page files. TinaCMS can be re-added once
> the Node / build toolchain is confirmed on the deployment machine.

---

## Project Structure

```
boulder-marina/
├── CLAUDE.md                   # Full project context — read this first
├── astro.config.mjs            # site URL, integrations, static output
├── package.json
├── tina/                       # TinaCMS schema (kept for future re-integration)
│   └── config.ts
├── public/
│   └── uploads/                # All site images live here
│       ├── boulder-marina-logo.png
│       ├── marina-hero.jpg         # Homepage aerial photo
│       ├── marina-panorama.jpg     # Masthead used on all interior pages
│       ├── boats-for-sale.jpg
│       └── gallery/                # 12 gallery images across 3 albums
└── src/
    ├── styles/
    │   └── global.css          # Design tokens — single source of truth
    ├── layouts/
    │   └── BaseLayout.astro    # SEO, structured data, fonts — all pages use this
    ├── components/
    │   ├── Nav.astro           # Sticky nav + Reserve a Slip modal + mobile drawer
    │   └── Footer.astro        # Marina + BYC links, hours, contact
    └── pages/
        ├── index.astro                # Homepage — aerial hero + BYC cross-promo
        ├── about.astro                # Marina history, amenities, location/hours
        ├── services.astro             # Full rate table (all 20 slip sizes) + labor
        ├── events.astro               # 2026 BYC calendar — filterable by category
        ├── boulder-yacht-club.astro   # BYC hub — racing, social events, membership
        ├── gallery.astro              # Masonry gallery — 3 albums, lightbox
        ├── boats-for-sale.astro       # Resource directory + member listing placeholder
        ├── contact.astro              # Contact info + slip reservation form + map
        ├── boat-slips.astro           # SEO landing — "boat slips Carlyle Lake"
        ├── sailboat-marina.astro      # SEO landing — "sailboat marina Carlyle Lake"
        ├── motorboats-pontoons.astro  # SEO landing — "pontoon slips Carlyle Lake"
        ├── boat-storage.astro         # SEO landing — "boat storage Carlyle Lake"
        ├── marina-services.astro      # SEO landing — "marina services Carlyle Lake"
        ├── marina-near-st-louis.astro # SEO landing — "marina near St. Louis"
        └── sailing-carlyle-lake.astro # SEO landing — "sailing Carlyle Lake"
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# → http://localhost:4321

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

No environment variables are required for local development.

---

## Design System

All tokens are in `src/styles/global.css`. Never hardcode colors or fonts inline.

| Token | Value | Use |
|---|---|---|
| `--gold` | `#c49a2a` | Primary accent — all highlights, active states |
| `--navy` | `#06090f` | Page background |
| `--navy-mid` | `#09111c` | Alternate section / card backgrounds |
| `--navy-light` | `#0d1a2e` | Gradient use |
| `--cream` | `#ddd5c4` | Primary text |
| `--font-serif` | Cormorant Garamond | Headings — do not change |
| `--font-sans` | DM Sans | Body / UI — do not change |
| `--section-pad` | `clamp(64px, 8vw, 120px)` | Vertical section spacing |
| `--container` | `1200px` | Max content width |

Shared utility classes: `.container`, `.section-tag`, `.btn`, `.btn--fill`, `.gold-rule`, `.fade-up`

---

## Key Components

### Nav (`src/components/Nav.astro`)
- Transparent over hero, transitions to `rgba(6,9,15,0.96)` with backdrop blur after 60px scroll
- 8 nav links + "Reserve a Slip" CTA button (desktop) + hamburger drawer (mobile ≤960px)
- **Reserve a Slip modal** — opens on CTA click, closes on backdrop click / ✕ / Escape key
  - Form fields: name, phone, boat name, registration, vessel length, arrival/departure date, arrival time, notes
  - Submits via `mailto:` to `bouldermarina@charter.net` (interim, until Formspree is set up)

### Footer (`src/components/Footer.astro`)
- Marina contact: phone, email, address, store hours
- BYC links: racing, social events, Sea Scouts, membership
- Social / external links

---

## Deployment: Cloudflare Pages

1. Push repo to GitHub
2. Cloudflare Dashboard → Pages → Create a project → Connect to Git
3. Build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. No environment variables needed (TinaCMS removed)
5. Every push to `main` auto-deploys

**Estimated monthly cost:** $0 (Cloudflare Pages free tier)

---

## Forms (`mailto:` interim)

Both the Nav modal and the Contact page form build a pre-populated `mailto:bouldermarina@charter.net` link on submit and open the visitor's mail client — no backend required. A success card replaces the form once the mail client opens.

**Migrating to Formspree later** (once the owner has an account): see the step-by-step guide in CLAUDE.md / AGENTS.md under "Migrate forms from mailto: → Formspree."

---

## Content Still Pending from Owner

- [ ] Boat listings currently for sale at the marina
- [ ] Additional photos (beyond what's on the current WordPress site)
- [ ] Confirmation that slip rates are unchanged for 2026
- [ ] Owner approval of all 15 pages before DNS cutover

---

## DNS Cutover Checklist

Before switching bouldermarina.com to the new site:

- [ ] Walk every page on https://boulder-marina.pages.dev — verify images, nav, forms, mobile layout, map embed
- [ ] Test both reservation forms end-to-end (mail client opens with correct subject/body)
- [ ] Owner reviews and approves all 15 pages
- [x] Generate `public/_redirects` from old WordPress URL structure (see CLAUDE.md)
- [x] Cloudflare Pages deployed → https://boulder-marina.pages.dev
- [ ] Add custom domain → CNAME `boulder-marina.pages.dev` → `bouldermarina.com`
- [ ] Submit new sitemap to Google Search Console

---

## Cross-Promo: Marina ↔ BYC

- Homepage has a dedicated BYC section (events, officers, membership CTA)
- `/boulder-yacht-club` page is a full BYC hub with racing, social events, Sea Scouts
- Events page pulls from BYC calendar (2026 BYC events via Tribe Events REST API)
- Footer has a dedicated BYC column
- All BYC external links point to boulderyc.org (stays live — not being replaced)
