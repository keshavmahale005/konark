# Konark Global Revamp — Decisions

## Source and factual accuracy

- `www.konarkglobal.com` is the source of truth. Source extraction or access failure is documented rather than papered over with invented copy.
- Do not infer social profile destinations, form backends, business claims, specifications, or image identity from filenames alone.
- The source's 100 Cr by 2025 vision is displayed as a historical target, not a current commitment.
- Source pages returned cache miss / HTTP 406 in some cases. Their React routes remain with notices or safe career fallback; complete copy is not claimed.

## Visual system

- Use warm off-white, charcoal, white and restrained orange as a provisional brand-consistent palette. Replace provisional values only after sampling the actual logo.
- Typography: Manrope headings and DM Sans body copy, with CSS `clamp()` sizing.
- Use cinematic original industrial hero photography, editorial layouts, accessible contrast and responsive card grids.
- Original logo is unavailable locally; do not recreate or fake the symbol. The existing plain wordmark is a temporary fallback, pending retrieval.

## Architecture and behavior

- Preserve React + TypeScript + Vite and existing project config.
- Preserve source URL paths. Product details use `src/data/productPages.ts` and `ProductDetail.tsx`; project/manufacturing galleries have their own data/components.
- CSS transitions, hero keyframes and Intersection Observer reveal groups avoid a motion package; reduced-motion users skip reveal movement.
- Use source images by official URLs until they can be downloaded and verified locally. Do not use unrelated stock photos.
- Contact and career forms mirror verified source fields. Since server endpoints could not be inspected, prepare honest mailto drafts and tell applicants to attach a CV manually.
- Sitemap contains known routes. Product categories without verified internal route targets remain navigable through the catalog and detail index.
- Product details with restricted source content are never given fabricated technical specifications.

## Workflow and safety

- No push or external publication without authorization.
- Workspace requests to the live site fail; only public reader/search access has worked.
- Git metadata is read-only in this environment; do not claim a commit exists.
- `npm run build` runs `tsc -b && vite build`; the typecheck and production bundle both pass.
- Keep the continuation and status docs updated after meaningful changes.
## Audit decisions — 2026-10-28

- About source was reopened and compared section by section before changing page text.
- For portrait/certificate/feature imagery, use only exact image URLs exposed by the official About page. Keep the original alt/caption text; local bytes and visual content remain unverified until the source can be downloaded.
- Keep Career and Join the Team as distinct routes because the source navigation exposes both. Remove the duplicate Join the Team item only from the footer’s redundant quick-link list; the route remains reachable from primary navigation.
- Use a single vertical chronological timeline to make all six roadmap milestones and their source descriptions readable without a confusing wrap from 2012 back to 2017.

- User-provided logo asset: `public/images/logo/logo.png` (PNG, 272 × 146, RGBA). Used directly in header and footer; source aspect ratio is preserved and the footer has a white backing to retain contrast.

## Homepage redesign — 2026-10-28

- Homepage moved out of `App.tsx` into `src/pages/Home/Home.tsx` plus `src/components/home/*`; data in `src/data/{industries,testimonials,partners}.ts`. All original homepage copy, CTAs and destinations are preserved verbatim (scripted check against the previous `Home()`).
- Homepage palette uses colours sampled from `logo.png`: orange `#e97b1a`, charcoal; `#a8520c` for small orange text on light backgrounds (AA). `src/styles/home.css` is fully scoped to `.home-page`.
- Additions reuse existing site content only: channel-partner strip (footer list), project showcase (`projectGallery`), phone/email in the closing CTA (topline). Group-company rows now link to /products, /projects, /manufacturing.
- Fixed CSS load order in `src/main.tsx`: `global.css` now loads before `App` so `responsive.css` media queries apply (previously the mobile menu never appeared and header/footer overflowed at ≤900px on every page). Desktop (>1180px) rendering is unchanged because every `responsive.css` rule sits inside a media query.
- Navbar redesign (shared `Header` in `SiteChrome.tsx`, styles in `src/styles/header.css`): larger, higher-contrast nav labels with a clear active state; Products opens a mega menu grouping all product pages into five families derived from each page's eyebrow; Career and Join the Team grouped under a "Careers" dropdown (both routes unchanged); hamburger drawer at ≤1180px with product/career accordions. Old `.topline/.header/.desktop-nav/.mobile-nav` CSS is now unused. Hero grid overlay removed on request.

## Projects page redesign — 2026-10-28

- `/projects` now renders `src/pages/Projects/Projects.tsx` (sections in `src/components/projects/Project*.tsx`, styles fully scoped to `.projects-page` in `src/styles/projects.css`). `/gallery` still uses the unchanged `ProjectGallery`.
- Copy is reused from existing pages only: hero/intro from the old Projects page, the Konark Fabtech mission sentence and the five stages it names (About), 1994/2012 milestones (About timeline), "Pan India" project reach (About areas of operation), CTA and contacts (homepage CTA). The "16 project snapshots" figure is the gallery's own count.
- Project groups (Boilers & steam, Pipelines, Cooling, Chimneys) in `src/data/projectGroups.ts` are derived from each photo's title, not from source metadata.
- Each section has its own motion: hero word-mask rise + counter-scrolling photo reels; odometer digits; scroll-linked process rail; expanding scope panels that self-advance; gallery curtain reveal, pointer tilt, sliding filter pill and View Transitions morph; CTA unfold, drawn underline, spotlight and magnetic button. All of it is disabled under `prefers-reduced-motion`.
- A scrolling project-name marquee was tried and replaced by the scope panels on request.
- Source project photos are only 258 × 172 px; the lightbox scales them up to the stage, so they look soft at large sizes until higher-resolution originals are available.

## Services page redesign — 2026-10-28

- `/services` now renders `src/pages/Services/Services.tsx` (sections in `src/components/services/Service*.tsx`, styles scoped to `.services-page` in `src/styles/services.css`). The service list and core competencies moved verbatim into `src/data/services.ts`; the sitemap reads the same list. Card ids `service-1`…`service-16` are kept.
- Added copy comes from the About page only: "24/7 support through our committed team" and Konark Engineers' list of equipment it sells and services.
- Motion was chosen not to repeat the homepage or projects page: scrambled-glyph title decode, split-flap "Now servicing" board, pressure dial (tick sweep, spring needle that leans toward the pointer), cards flipping in along diagonals with one pointer light across all borders, equipment names launching into a counter-rotating orbit (two-column board on phones), sticky competency cards that recede as the next one covers them, and a CTA that fills with rolling liquid and bubbles. All disabled under `prefers-reduced-motion`.
