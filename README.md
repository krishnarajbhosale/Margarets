# Margaret's Beauty Bar — Website

A luxury marketing website for **Margaret's Beauty Bar**, a premium salon-meets-cocktail-bar
concept. The site is a fully responsive, single-page React application with a dark-green &
gold aesthetic, hand-crafted decorative ornaments, and a complete "browse → select → book"
customer journey.

Every section is a pixel-faithful recreation of design mockups delivered as SVG files. The
imagery and gold ornaments used across the site are extracted and cropped directly from those
design files via a small Node/Sharp tooling pipeline (see [Asset Pipeline](#asset-pipeline)).

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Routing & Page Flow](#routing--page-flow)
- [Pages & Components](#pages--components)
- [Design System](#design-system)
- [Service Catalog Data](#service-catalog-data)
- [Asset Pipeline](#asset-pipeline)
- [Booking Flow](#booking-flow)
- [Conventions & Notes](#conventions--notes)

---

## Tech Stack

| Concern            | Choice                                                        |
| ------------------ | ------------------------------------------------------------- |
| Build tool         | **Vite 5**                                                    |
| UI library         | **React 18** (`react`, `react-dom`)                           |
| Routing            | **React Router 6** (`BrowserRouter`)                          |
| Styling            | **Tailwind CSS v4** via `@tailwindcss/vite` (no config file)  |
| Fonts              | Google Fonts — Cormorant Garamond, Great Vibes, Jost          |
| Tooling (dev-only) | **sharp** (image processing), **puppeteer** (screenshots)     |

> **Note on Tailwind v4:** There is no `tailwind.config.js`. All theme tokens (colors, fonts)
> are declared with the `@theme` directive inside [`src/styles/global.css`](src/styles/global.css).
> The Tailwind plugin is wired up in [`vite.config.js`](vite.config.js).

---

## Quick Start

```bash
# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev

# production build → dist/
npm run build

# preview the production build (http://localhost:4173)
npm run preview
```

**Requirements:** Node 18+. The `sharp` and `puppeteer` packages are only needed for the
asset-generation scripts, not for running the site itself.

---

## Project Structure

```
Margarates/
├── index.html                  # HTML shell, Google Fonts <link>, favicon
├── vite.config.js              # Vite + React + Tailwind plugins
├── package.json
│
├── scripts/                    # Node/Sharp/Puppeteer build-time tooling (not shipped)
│   ├── extract-images.mjs      # pulls data-URI <image>s out of a design .svg
│   ├── organize.mjs            # renames/crops Home_Page.svg assets
│   ├── organize-service.mjs    # renames/crops Service.svg assets + gold ornaments
│   ├── organize-barmenu.mjs    # crops Bar_Menu.svg drink icons, bulb, title, daisy
│   ├── crop.mjs                # ad-hoc region crops from an extracted sheet
│   └── screenshot.mjs          # puppeteer full-page + fold screenshots
│
└── src/
    ├── main.jsx                # React root; wraps <App/> in <BrowserRouter>
    ├── App.jsx                 # <Navbar/> + <Routes/> + <Footer/>
    │
    ├── assets/
    │   ├── *.svg               # original design mockups (Home_Page, Service, Bar_Menu)
    │   ├── logo.svg, sparkle-swirl.svg
    │   ├── icons/              # diamond, cocktail, flower, chair (feature icons)
    │   └── images/             # all generated PNG/JPEG assets used by components
    │
    ├── components/
    │   ├── Navbar.jsx          # shared, fixed, router-aware nav (mobile menu)
    │   ├── Footer.jsx          # shared footer (all pages)
    │   ├── Hero.jsx            # home hero
    │   ├── Indulgence.jsx      # "Where Beauty Meets Indulgence" band
    │   ├── Features.jsx        # 4-icon value strip (reused on Home + Menu)
    │   ├── SignatureServices.jsx
    │   ├── barmenu/BarMenu.jsx # the drink menu section
    │   └── services/           # one component per Services-page section
    │       ├── ServicesHero.jsx
    │       ├── NailArt.jsx
    │       ├── Eyelashes.jsx
    │       ├── Hairstyles.jsx
    │       ├── SpaCards.jsx
    │       ├── Makeup.jsx
    │       ├── Eyebrows.jsx        # component exists but not currently rendered
    │       └── FlourishDivider.jsx # gold flourish/label divider
    │
    ├── pages/
    │   ├── Home.jsx            # /
    │   ├── Services.jsx        # /services
    │   ├── Menu.jsx            # /menu   (BarMenu + reused Features)
    │   ├── Book.jsx            # /book   (full service catalog + selection)
    │   └── Contact.jsx         # /contact (info + booking form)
    │
    ├── data/
    │   └── services.js         # full service catalog (9 categories, 161 treatments)
    │
    ├── lib/
    │   └── scroll.js           # scrollToId() smooth-scroll helper
    │
    └── styles/
        └── global.css         # Tailwind import + @theme tokens + base layer
```

---

## Routing & Page Flow

Routing lives in [`src/App.jsx`](src/App.jsx). The **Navbar** and **Footer** render on every
route; only the middle swaps.

| Path        | Page          | Description                                             |
| ----------- | ------------- | ------------------------------------------------------ |
| `/`         | `Home`        | Hero → Indulgence → Features → Signature Services       |
| `/services` | `Services`    | The full treatment showcase, section by section         |
| `/menu`     | `Menu`        | The "Bar Menu" (beer/coffee/tea/soft/water) + Features   |
| `/book`     | `Book`        | Browse & select from all 161 services, then book         |
| `/contact`  | `Contact`     | Contact info + booking form (receives Book selections)   |

**Navbar links:** `HOME · SERVICES · BEAUTY BAR (→ /menu) · BOOK APPOINTMENT (→ /book) · CONTACT`
plus a `Book Appointment` CTA button (→ `/book`).

The navbar is **router-aware**: in-page section links (e.g. Home hero, Gallery) route to the
correct page first and then smooth-scroll to the target `id`; route links navigate and scroll
to top. Logic lives in the `go()` handler in [`Navbar.jsx`](src/components/Navbar.jsx).

---

## Pages & Components

### Home (`/`)
- **Hero** — headline, script accent, sparkle-swirl ornament, and two CTAs
  (`Reserve Experience → /book`, `Explore Services → /services`). A single gold wave flows
  into the next section (no double-wave gap).
- **Indulgence** — "Where Beauty Meets Indulgence": left cocktail/salon photo with a wavy gold
  top edge, right copy block, and a large line-art daisy.
- **Features** — 4 value props (Luxurious Experience, Cocktails & Social, Premium Products,
  Expert Artists) with gold-masked icons. **Reused** on the Menu page.
- **SignatureServices** — scalloped-card highlights over a decorative background.

### Services (`/services`)
Full-bleed sections, each its own component and each with an `id` for deep-linking:
`ServicesHero`, `NailArt` (#nail-art), `Eyelashes` (#eyelashes), `Hairstyles` (#hairstyles),
`SpaCards` (#spa), `Makeup` (#makeup). Section headers use the shared **FlourishDivider**
(gold leaf flourishes + optional script label).

### Bar Menu (`/menu`)
`BarMenu` renders a hanging Edison bulb, a display "BAR MENU" title, and five drink cards
(Beer / Coffee / Tea / Soft Drinks / Water) with circular gold-ringed icons, film-grain
texture, and a faint daisy watermark. Followed by the reused **Features** strip.

### Book An Appointment (`/book`)
The customer-facing booking browser, driven entirely by [`src/data/services.js`](src/data/services.js):
- Hero with **live search** that filters all categories as you type.
- **Sticky category pill bar** with live counts; click to jump to a category.
- Each category is a `FlourishDivider`-titled grid of **tap-to-select** service chips (`+` → `✓`).
- A **sticky bottom bar** shows the running selection count and a
  `Continue to Booking →` button that carries the selection to the Contact page.

### Contact (`/contact`)
- Hero with line-art daisies flanking the title.
- Left: address / phone / email / hours with icons + a closing image band.
- Right: a **working contact form** (name, phone, email, message) with local validation and a
  graceful "Thank You!" success state. If the visitor arrived from `/book`, the selected
  treatments are shown as a summary chip and pre-filled into the message.

---

## Design System

Defined once in [`src/styles/global.css`](src/styles/global.css) via `@theme`, then used as
regular Tailwind utilities (`bg-green-deep`, `text-gold`, `font-script`, …).

### Colors

| Token                 | Hex       | Usage                              |
| --------------------- | --------- | ---------------------------------- |
| `--color-green-darkest` | `#06140e` | Deepest background / footer        |
| `--color-green-dark`    | `#0a1f15` | Home base background               |
| `--color-green`         | `#0d2419` | Panels                             |
| `--color-green-panel`   | `#0f2a1d` | Raised panels                      |
| `--color-green-deep`    | `#061c16` | Services / Menu base background     |
| `--color-green-card`    | `#101b13` | Cards & inputs                     |
| `--color-gold`          | `#c7a253` | Primary gold (borders, headings)   |
| `--color-gold-bright`   | `#d8b95f` | Hover gold                         |
| `--color-gold-soft`     | `#e6cf94` | Soft gold accents / labels         |
| `--color-gold-pale`     | `#feeb87` | Brightest gold                     |
| `--color-olive`         | `#6f551d` | Olive borders / gradients          |
| `--color-cream`         | `#f4ecd8` | Primary light text                 |
| `--color-muted`         | `#cdbf9f` | Secondary/body text                |

### Typography

| Token          | Family                | Utility        | Role                          |
| -------------- | --------------------- | -------------- | ----------------------------- |
| `--font-serif` | Cormorant Garamond    | `font-serif`   | Headings, body, elegant copy  |
| `--font-script`| Great Vibes           | `font-script`  | Script accents ("Margaret's") |
| `--font-sans`  | Jost                  | `font-sans`    | Nav, labels, UI text          |

### Recurring visual techniques
- **Full-width, edge-to-edge** layout (no max-width cap on the page shells; content is padded
  with `px-6 sm:px-10`).
- **Gold wave dividers** drawn as inline `<svg>` paths with `preserveAspectRatio="none"`.
- **Organic ornaments** (leaf branches, daisies) placed as absolutely-positioned images; where
  a crop still carried a dark backing, an **alpha-keyed transparent variant** was generated
  (e.g. `svc-spa-branch-t.png`, `svc-spa-daisy-t.png`).
- **Film grain** via an inline `feTurbulence` SVG data-URI at low opacity + `mix-blend-soft-light`.
- **Gold-masked icons** using CSS `mask-image` so monochrome icon PNGs render in brand gold.

---

## Service Catalog Data

[`src/data/services.js`](src/data/services.js) is the single source of truth for the booking
page. It exports `SERVICE_CATEGORIES`, an array of `{ id, name, script, services[] }`:

| Category                | `id`        | Count |
| ----------------------- | ----------- | ----- |
| Eyelash Services        | `eyelashes` | 22    |
| Manicure & Pedicure     | `nails`     | 45    |
| Waxing Services         | `waxing`    | 33    |
| Threading Services      | `threading` | 9     |
| Eyebrow Services        | `eyebrows`  | 4     |
| Hair Styling & Services | `hair`      | 36    |
| Makeup Services         | `makeup`    | 4     |
| Kids Services           | `kids`      | 5     |
| Facial Treatments       | `facials`   | 3     |
| **Total**               |             | **161** |

> Counts are derived from the arrays at render time, so the lists remain the single source of
> truth. (Two exact duplicates in the original source list — "Lash Lift with Tint" and "Ombré"
> — were de-duplicated, giving 161 unique treatments.)

---

## Asset Pipeline

The design was delivered as three tall SVG mockups with fonts outlined to paths and photos
embedded as base64 data-URIs:

- `src/assets/Home_Page.svg`
- `src/assets/Service.svg`
- `src/assets/Bar_Menu.svg`

Because text is outlined (no `<text>` tags), copy was transcribed by rasterizing regions to
PNG and reading them. Photos and gold ornaments were extracted/cropped with **sharp** and
saved into `src/assets/images/`. The helper scripts:

| Script                        | Purpose                                                                 |
| ----------------------------- | ----------------------------------------------------------------------- |
| `extract-images.mjs <svg> <out>` | Pulls every embedded `<image data:…>` out of an SVG into a folder + manifest. |
| `organize.mjs`                | Renames/crops the Home page assets into semantic filenames.             |
| `organize-service.mjs`        | Copies Service-page photos; crops gold ornaments (flourishes, frame line, leaf corners, henna leaf, spa branch/daisy) from the rasterized SVG. |
| `organize-barmenu.mjs`        | Crops the 5 circular drink icons, hanging bulb, "BAR MENU" title, and daisy divider from Bar_Menu.svg. |
| `crop.mjs`                    | One-off region crops from an extracted sheet.                           |
| `screenshot.mjs`              | Puppeteer full-page + above-the-fold screenshots for visual QA.         |

Rasterization uses `sharp(svg, { density: 96, limitInputPixels: false })`, which renders the
1440-wide designs at a crisp 1920px. Regenerating an asset set is as simple as re-running the
matching `organize-*.mjs` script.

> On this machine, Puppeteer is pointed at the system Chrome
> (`C:/Program Files/Google/Chrome/Application/chrome.exe`) because a bundled Chromium isn't
> installed. Adjust `executablePath` in the screenshot scripts if yours differs.

---

## Booking Flow

The end-to-end customer journey is intentionally continuous:

```
Any "Book Appointment" CTA  ─▶  /book
        (navbar · footer · hero)         │
                                         ▼
                         search / browse 9 categories
                                         │
                        tap chips to build a selection
                                         │
                     sticky bar ▶ "Continue to Booking"
                                         │
        navigate("/contact", { state: { services: [...] } })
                                         ▼
        Contact form pre-fills the message + shows a selection chip
                                         │
                      submit ▶ "Thank You!" success state
```

Selections are passed via React Router's location `state`, so no global store is required.

---

## Conventions & Notes

- **Shared shell:** `Navbar` and `Footer` are rendered once in `App.jsx`, outside `<Routes>`,
  so they persist across navigation.
- **Scroll behavior:** each page component calls `window.scrollTo(0, 0)` on mount; in-page jumps
  use `scrollToId()` from `src/lib/scroll.js`.
- **Responsiveness:** layouts are mobile-first; heavy decorative elements are hidden below `lg`
  (`hidden lg:block`) so small screens stay clean.
- **No backend:** the contact form and newsletter signup are front-end only (local state +
  success UI). Wire them to a form service / API when going live.
- **Placeholders to replace before launch:** address, phone (`(555) 018-2946`), and email
  (`hello@margaretsbeautybar.com`) appear in the Footer and Contact page and are placeholders.
- **`Eyebrows.jsx`** exists but is not currently rendered on the Services page (kept for reuse).

---

_Built with React + Vite + Tailwind. Designed as a 1:1 recreation of the Margaret's Beauty Bar
mockups._
