# CLAUDE.md — Boulder Marina Project Context

> This file is the primary context document for Claude Code sessions.
> Read this before touching any file. Do not relitigate decisions marked final.

---

## Project

**Boulder Access Marina** + **Boulder Yacht Club** unified website.
Two organizations that share a home port on Carlyle Lake, IL — both promoted throughout the site.

- Marina site: https://bouldermarina.com (currently WordPress — being replaced)
- BYC site: https://boulderyc.org (stays live — we cross-link to it)
- New preview URL: Cloudflare Pages (pending DNS cutover — owner approval required)

---

## Stack Decisions — Final, Do Not Relitigate

| Decision | Choice | Reason |
|---|---|---|
| Framework | Astro 6, static output | SEO, performance, no PHP |
| CMS | TinaCMS removed (schema kept in `tina/`) | `better-sqlite3` fails to compile on Node 26 without Xcode CLT. Re-add when Node/toolchain is confirmed. |
| Hosting | Cloudflare Pages | Free, global edge, instant DNS cut |
| Styling | CSS custom properties, no Tailwind | Full design control, no purge issues |
| JS | Vanilla JS in Astro `<script>` blocks | No React islands needed currently |
| Font | Cormorant Garamond + DM Sans | Brand typography — do not change |
| Forms | Formspree | No backend needed |

---

## Design System

All tokens are in `src/styles/global.css`. Never hardcode colors or fonts inline.

```css
--gold:        #c49a2a   /* primary accent — use for all highlights */
--navy:        #06090f   /* page background */
--navy-mid:    #09111c   /* alternate section background */
--navy-light:  #0d1a2e   /* gradient use */
--cream:       #ddd5c4   /* primary text */
--font-serif:  'Cormorant Garamond', Georgia, serif
--font-sans:   'DM Sans', system-ui, sans-serif
--section-pad: clamp(64px, 8vw, 120px)
--container:   1200px
```

Shared classes in global.css: `.container`, `.section-tag`, `.btn`, `.btn--fill`, `.gold-rule`, `.fade-up`

---

## Project Structure

```
boulder-marina/
├── CLAUDE.md                          ← you are here
├── README.md                          ← developer + owner onboarding
├── astro.config.mjs                   ← site URL, integrations, static output
├── package.json
├── tina/
│   └── config.ts                      ← TinaCMS schema kept for future re-integration
├── public/
│   └── uploads/                       ← all site images
│       ├── boulder-marina-logo.png    ← 270×270, downloaded from WordPress
│       ├── marina-hero.jpg            ← aerial photo (used on homepage)
│       ├── marina-panorama.jpg        ← 1024×298 panorama (interior page mastheads)
│       ├── boats-for-sale.jpg         ← BYC boats photo
│       └── gallery/                   ← 12 images across 3 albums
│           ├── marina-dock-1/2.jpg
│           ├── marina-aerial.jpeg
│           ├── marina-logo-sign.jpg
│           ├── tapas-1/2/3/4.jpg
│           └── pro-dock-1/2/3.jpg, spring-thaw.jpg
└── src/
    ├── styles/
    │   └── global.css                 ← design tokens — single source of truth
    ├── layouts/
    │   └── BaseLayout.astro           ← SEO, structured data, fonts — all pages use this
    ├── components/
    │   ├── Nav.astro                  ← sticky nav + Reserve a Slip modal + mobile drawer
    │   └── Footer.astro               ← Marina + BYC links, hours, contact
    └── pages/
        ├── index.astro                ✅ homepage — aerial hero + BYC cross-promo
        ├── about.astro                ✅ marina history, amenities, hours, CTA
        ├── services.astro             ✅ all 20 slip rate rows + labor/haul services
        ├── events.astro               ✅ 2025 BYC calendar — filterable by category
        ├── boulder-yacht-club.astro   ✅ BYC hub — racing, social events, membership
        ├── gallery.astro              ✅ masonry grid, 3 albums, JS lightbox
        ├── boats-for-sale.astro       ✅ resource directory + member listing placeholder
        └── contact.astro              ✅ contact info + slip form + Google Maps embed
```

---

## Component Notes

### Nav.astro
- Transparent over hero → `rgba(6,9,15,0.96)` + blur after 60px scroll
- 8 nav links, all visible at desktop (≤960px collapses to hamburger drawer)
- **"Reserve a Slip" CTA** opens a modal (not a page link)
  - Modal posts to Formspree — endpoint ID `bouldermarina` is a placeholder, needs registration
  - Fields: name, phone, boat name, registration, vessel length, arrival/departure date, arrival time, notes
  - Closes on: backdrop click, ✕ button, Escape key; focus-trapped for accessibility

### Events page
- 2025 events pulled from BYC Tribe Events REST API:
  `https://boulderyc.org/wp-json/tribe/events/v1/events?start_date=2025-01-01&end_date=2025-12-31&per_page=50`
- Hardcoded in the page — update to 2026 when owner supplies the calendar
- Filter bar: All / Racing / Social / Marina / Charity / Lakewide
- Grouped by month; empty months collapse via JS

---

## Content Already Sourced (Do Not Re-Scrape)

**Boulder Marina (bouldermarina.com)**
- Address: 26000 Boulder Access Rd, Boulder, IL 62231
- Phone: (618) 226-3223
- Email: bouldermarina@charter.net
- VHF: Channel 16
- All 20 slip rate rows (18–37 ft) — exact to the cent, in `slip-rates/index.json`
- Labor rate: $125/hr
- Lift-in/out: $200/ride (first 2 hrs)
- Bottom paint: $30/ft + materials
- Power wash: $75 bottom
- Dry storage: $99/mo ($1,188/season)
- Day use: $25 flat · Trailer parking: $7.50/day
- Electric: $50/season (≤24ft) · $80/season (25ft+)
- Cradle/trailer/jack stand: $75/season
- Ship Store hours: Thu–Fri 11–6, Sat 9–5, Sun 9–3:30, Holidays 9–3:30

**Boulder Yacht Club (boulderyc.org)**
- Founded: 1983 · 501(c)(7) nonprofit
- Only yacht club on the eastern shore of Carlyle Lake
- 2026 Officers in `src/content/board/index.json`
- 8 club races/season including Moonlight Regatta, Renshaw Regatta, Commodore's Cup
- Signature social events: Tapas on the Docks, Pirate Party, Spero's Spaghetti Dinner,
  Seafood Charity Dinner, Survivor Party, Chili Cookoff, Canoe Race, Annual Charity Dinner
- Charities: Backstoppers, Hannah's Playground, Got Your Six, Miracles in Progress
- Sea Scout Ship 9 based here
- Membership form: Google Drive link (embedded in BYC page)
- Mail address: C/O Pam McBride, 1880 Ridgeway Dr, Arnold, MO 63010

---

## Content Pending from Owner

- [ ] 2026 event calendar with actual dates (Marina + BYC) — update `events.astro`
- [ ] Confirmation that slip rates are unchanged for 2026
- [ ] Boats currently for sale — add to `boats-for-sale.astro`
- [ ] Additional photos beyond what's on the current WordPress site
- [ ] Owner approval of entire site before DNS cutover

---

## Deployment Pipeline

```
Local dev:   npm run dev  →  localhost:4321
Build:       npm run build  →  astro build  →  dist/
Deploy:      push to main  →  Cloudflare Pages auto-deploys
Production:  bouldermarina.com → CNAME → boulder-marina.pages.dev (pending owner approval)
```

No environment variables needed (TinaCMS removed). Cloudflare Pages build command: `npm run build`, output: `dist`.

---

## Before DNS Cutover

1. Register Formspree endpoint and update both form `action` attributes:
   - `src/components/Nav.astro` — modal form
   - `src/pages/contact.astro` — reservation form
2. Owner reviews and approves all 8 pages
3. Create `public/_redirects` for WordPress URL compatibility:
   ```
   /gallery/              /gallery              301
   /boulder-yacht-club/   /boulder-yacht-club   301
   /services/             /services             301
   /about/                /about                301
   /contact/              /contact              301
   /boats-for-sale/       /boats-for-sale       301
   ```
   Crawl the live WordPress site with `wget --spider` to catch any additional URLs.
4. Add Cloudflare Pages custom domain → CNAME to `boulder-marina.pages.dev`
5. Submit new sitemap to Google Search Console

---

## SEO — Automatic

- Sitemap: `/sitemap-index.xml` — auto-generated by `@astrojs/sitemap`
- Structured data: `Marina` schema.org JSON-LD in BaseLayout — every page
- Open Graph + Twitter cards: BaseLayout
- Canonical URLs: BaseLayout
- Image optimization: Astro Sharp — auto WebP, lazy load

---

## Commands

```bash
npm run dev      # Astro dev server → localhost:4321
npm run build    # production build → dist/
npm run preview  # preview production build locally
```
