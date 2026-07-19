import { defineConfig } from 'tinacms';

// ---------------------------------------------------------------------------
// TINA CMS CONFIGURATION
// This file defines every content type the marina/BYC owner can edit
// from the Tina admin UI — no HTML knowledge required.
// Docs: https://tina.io/docs/reference/schema/
// ---------------------------------------------------------------------------

export default defineConfig({
  // Your TinaCloud client ID (free tier at app.tina.io)
  clientId: process.env.TINA_CLIENT_ID,
  token:    process.env.TINA_TOKEN,
  branch:   process.env.TINA_BRANCH || 'main',

  build: {
    outputFolder: 'admin',    // Admin UI lives at /admin on the deployed site
    publicFolder: 'public',
  },

  media: {
    // All uploaded images go into public/uploads — committed to Git
    tina: {
      mediaRoot:    'uploads',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [

      // ── 1. SITE SETTINGS ─────────────────────────────────────────────────
      // Owner edits: site name, tagline, contact info, social links, hours
      {
        name:  'settings',
        label: '⚙️ Site Settings',
        path:  'src/content/settings',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } }, // singleton
        fields: [
          { name: 'siteName',   label: 'Site Name',   type: 'string', required: true },
          { name: 'tagline',    label: 'Tagline',     type: 'string' },
          { name: 'phone',      label: 'Phone',       type: 'string' },
          { name: 'email',      label: 'Email',       type: 'string' },
          { name: 'address',    label: 'Address',     type: 'string' },
          {
            name: 'storeHours', label: 'Ship Store Hours', type: 'object',
            fields: [
              { name: 'thuFri', label: 'Thursday – Friday', type: 'string' },
              { name: 'sat',    label: 'Saturday',          type: 'string' },
              { name: 'sun',    label: 'Sunday',            type: 'string' },
              { name: 'holiday',label: 'Holidays',          type: 'string' },
            ],
          },
          {
            name: 'social', label: 'Social Links', type: 'object',
            fields: [
              { name: 'facebook', label: 'Facebook URL', type: 'string' },
              { name: 'bycFacebook', label: 'BYC Facebook Group URL', type: 'string' },
            ],
          },
        ],
      },

      // ── 2. HOME PAGE ─────────────────────────────────────────────────────
      // Hero headline, subtext, CTA buttons — owner edits freely
      {
        name:  'homePage',
        label: '🏠 Home Page',
        path:  'src/content/home',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { name: 'heroHeadline',    label: 'Hero Headline (line 1)', type: 'string' },
          { name: 'heroAccent',      label: 'Hero Accent Word',       type: 'string' },
          { name: 'heroSubheadline', label: 'Hero Subheadline',       type: 'string' },
          { name: 'heroBody',        label: 'Hero Body Text',         type: 'string', ui: { component: 'textarea' } },
          { name: 'heroCta1',        label: 'Primary CTA Label',      type: 'string' },
          { name: 'heroCta2',        label: 'Secondary CTA Label',    type: 'string' },
          { name: 'heroImage',       label: 'Hero Background Image',  type: 'image' },
          {
            name: 'aboutSection', label: 'About Section', type: 'object',
            fields: [
              { name: 'headline', label: 'Headline',   type: 'string' },
              { name: 'body',     label: 'Body Text',  type: 'string', ui: { component: 'textarea' } },
              { name: 'body2',    label: 'Body Text 2',type: 'string', ui: { component: 'textarea' } },
            ],
          },
          {
            // BYC cross-promo block — keeps both orgs in sync
            name: 'bycSection', label: 'BYC Promo Section', type: 'object',
            fields: [
              { name: 'headline',  label: 'Headline',   type: 'string' },
              { name: 'body',      label: 'Body Text',  type: 'string', ui: { component: 'textarea' } },
              { name: 'ctaLabel',  label: 'CTA Label',  type: 'string' },
              { name: 'ctaUrl',    label: 'CTA URL',    type: 'string' },
              { name: 'image',     label: 'Image',      type: 'image' },
            ],
          },
        ],
      },

      // ── 3. SERVICES ──────────────────────────────────────────────────────
      // Each service is its own markdown file — owner can add/remove/reorder
      {
        name:  'services',
        label: '🔧 Services',
        path:  'src/content/services',
        format: 'md',
        fields: [
          { name: 'title',     label: 'Service Name',   type: 'string',  required: true, isTitle: true },
          { name: 'icon',      label: 'Emoji Icon',     type: 'string' },
          { name: 'summary',   label: 'Short Summary (card)',  type: 'string', ui: { component: 'textarea' } },
          { name: 'price',     label: 'Price / Rate',   type: 'string' },
          { name: 'order',     label: 'Display Order',  type: 'number' },
          { name: 'featured',  label: 'Show on Homepage?', type: 'boolean' },
          {
            name: 'body', label: 'Full Description',
            type: 'rich-text',  // WYSIWYG editor in Tina — no HTML needed
            isBody: true,
          },
        ],
      },

      // ── 4. SLIP RATES ────────────────────────────────────────────────────
      // Owner updates pricing without touching any code
      {
        name:  'slipRates',
        label: '⚓ Slip Rates',
        path:  'src/content/slip-rates',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { name: 'seasonNote',   label: 'Season Rate Note',     type: 'string', ui: { component: 'textarea' } },
          { name: 'electricNote', label: 'Electric Fee Note',    type: 'string' },
          { name: 'storageNote',  label: 'Storage Fee Note',     type: 'string' },
          { name: 'dayUseRate',   label: 'Day Use Rate',         type: 'string' },
          {
            name: 'rates', label: 'Rate Table', type: 'object', list: true,
            ui: { itemProps: item => ({ label: `${item.lengthFt} ft` }) },
            fields: [
              { name: 'lengthFt',      label: 'Vessel Length (ft)',   type: 'number', required: true },
              { name: 'monthlyRate',   label: 'Monthly Rate ($)',     type: 'number', required: true },
              { name: 'seasonRate',    label: 'Season Total ($)',     type: 'number', required: true },
              { name: 'monthToMonth',  label: 'Month-to-Month Rate ($)', type: 'number' },
            ],
          },
        ],
      },

      // ── 5. EVENTS ────────────────────────────────────────────────────────
      // Covers BOTH Marina events and BYC events — unified calendar
      {
        name:  'events',
        label: '📅 Events',
        path:  'src/content/events',
        format: 'md',
        defaultItem: () => ({
          date: new Date().toISOString(),
          published: true,
          org: 'Marina',
        }),
        fields: [
          { name: 'title',     label: 'Event Name',    type: 'string',   required: true, isTitle: true },
          { name: 'date',      label: 'Date & Time',   type: 'datetime', required: true },
          { name: 'endDate',   label: 'End Date/Time', type: 'datetime' },
          {
            name: 'org', label: 'Hosted By', type: 'string',
            options: [
              { value: 'Marina', label: '⚓ Boulder Marina' },
              { value: 'BYC',    label: '⛵ Boulder Yacht Club' },
              { value: 'Both',   label: '🤝 Marina + BYC Joint' },
              { value: 'SeaScouts', label: '🧭 Sea Scout Ship 9' },
            ],
          },
          {
            name: 'category', label: 'Category', type: 'string',
            options: ['Racing', 'Regatta', 'Social', 'Charity', 'Maintenance', 'Holiday', 'Kids', 'Other'],
          },
          { name: 'location',  label: 'Location',      type: 'string' },
          { name: 'summary',   label: 'Short Summary', type: 'string', ui: { component: 'textarea' } },
          { name: 'image',     label: 'Event Image',   type: 'image' },
          { name: 'published', label: 'Published?',    type: 'boolean' },
          { name: 'featured',  label: 'Featured on Homepage?', type: 'boolean' },
          { name: 'externalUrl', label: 'External Link (BYC Facebook etc)', type: 'string' },
          {
            name: 'body', label: 'Full Event Description',
            type: 'rich-text',
            isBody: true,
          },
        ],
      },

      // ── 6. BOATS FOR SALE ────────────────────────────────────────────────
      {
        name:  'boatsForSale',
        label: '🛥️ Boats for Sale',
        path:  'src/content/boats-for-sale',
        format: 'md',
        defaultItem: () => ({ available: true, postedDate: new Date().toISOString() }),
        fields: [
          { name: 'title',       label: 'Boat Name / Model',   type: 'string', required: true, isTitle: true },
          { name: 'year',        label: 'Year',                type: 'number' },
          { name: 'make',        label: 'Make',                type: 'string' },
          { name: 'model',       label: 'Model',               type: 'string' },
          { name: 'length',      label: 'Length (ft)',         type: 'number' },
          { name: 'price',       label: 'Asking Price ($)',    type: 'number' },
          { name: 'contactName', label: 'Seller Contact Name', type: 'string' },
          { name: 'contactPhone',label: 'Seller Phone',        type: 'string' },
          { name: 'contactEmail',label: 'Seller Email',        type: 'string' },
          { name: 'available',   label: 'Still Available?',    type: 'boolean' },
          { name: 'postedDate',  label: 'Date Posted',         type: 'datetime' },
          {
            name: 'images', label: 'Photos', type: 'image', list: true,
          },
          {
            name: 'body', label: 'Description & Details',
            type: 'rich-text',
            isBody: true,
          },
        ],
      },

      // ── 7. BYC BOARD MEMBERS ─────────────────────────────────────────────
      {
        name:  'board',
        label: '⛵ BYC Board Members',
        path:  'src/content/board',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            name: 'officers', label: 'Officers', type: 'object', list: true,
            ui: { itemProps: item => ({ label: `${item.role}: ${item.name}` }) },
            fields: [
              { name: 'role',  label: 'Title / Role', type: 'string', required: true },
              { name: 'name',  label: 'Name',         type: 'string', required: true },
              { name: 'email', label: 'Email',        type: 'string' },
              { name: 'photo', label: 'Photo',        type: 'image' },
              { name: 'bio',   label: 'Short Bio',    type: 'string', ui: { component: 'textarea' } },
            ],
          },
        ],
      },

      // ── 8. GALLERY ───────────────────────────────────────────────────────
      {
        name:  'gallery',
        label: '📸 Photo Gallery',
        path:  'src/content/gallery',
        format: 'json',
        fields: [
          { name: 'title',    label: 'Album Title',    type: 'string', required: true, isTitle: true },
          { name: 'year',     label: 'Year',           type: 'number' },
          { name: 'featured', label: 'Featured Album?', type: 'boolean' },
          {
            name: 'photos', label: 'Photos', type: 'object', list: true,
            ui: { itemProps: item => ({ label: item.caption || 'Photo' }) },
            fields: [
              { name: 'src',     label: 'Image',   type: 'image', required: true },
              { name: 'caption', label: 'Caption', type: 'string' },
              { name: 'alt',     label: 'Alt Text (for accessibility & SEO)', type: 'string' },
            ],
          },
        ],
      },

      // ── 9. PAGES (generic — About, Links, etc.) ──────────────────────────
      {
        name:  'pages',
        label: '📄 Pages',
        path:  'src/content/pages',
        format: 'md',
        fields: [
          { name: 'title',       label: 'Page Title',      type: 'string', required: true, isTitle: true },
          { name: 'slug',        label: 'URL Slug',        type: 'string' },
          { name: 'metaTitle',   label: 'SEO Title',       type: 'string' },
          { name: 'metaDesc',    label: 'SEO Description (160 chars max)', type: 'string', ui: { component: 'textarea' } },
          { name: 'heroImage',   label: 'Hero Image',      type: 'image' },
          { name: 'showInNav',   label: 'Show in Navigation?', type: 'boolean' },
          { name: 'navOrder',    label: 'Nav Order',       type: 'number' },
          {
            name: 'body', label: 'Page Content',
            type: 'rich-text',
            isBody: true,
          },
        ],
      },

    ],
  },
});
