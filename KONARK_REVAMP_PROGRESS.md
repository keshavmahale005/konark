# Konark Global Revamp — Progress

Last updated: 2026-10-28  
Project path: `D:\konarkglobal.com`  
Current stage: First-pass full route implementation and verified production build; source parity and asset retrieval still remain.

## Completed

- Inspected the starter repository, dependencies, source files, CSS and available assets. Added project memory, source content inventory and asset mapping documentation.
- Integrated the user-provided 272×146 RGBA Konark logo (`public/images/logo/logo.png`) in the shared header and footer with proportions preserved.
- Inspected live Home, About, Products, Projects, Services, Manufacturing, Industries, Contact, Careers and Sitemap pages. Logged Gallery cache miss and Join-the-Team HTTP 406.
- Implemented React pages for Home, About, Products, Projects, Services, Manufacturing, Industries, Gallery, Contact, Career, Join the Team, Sitemap and fallback.
- Implemented 58 product detail routes, including boiler families and source-verified chemical subpages. Restricted source pages are identified and carry an honest notice.
- Split the shared header/footer into `src/components/layout/SiteChrome.tsx`; shared navigation is centralized in `src/data/navigation.ts`. Project and manufacturing galleries and reveal-group behavior are reusable components.
- Added source image references and mappings for 12 industry images, 16 project photos, 18 manufacturing images and the homepage hero. These still load from official source URLs; local copies are pending.
- Added keyboard-operated lightbox, focus-managed quote dialog, keyboard/mobile navigation behavior, staggered intersection reveals, reduced-motion fallback, mailto quote/contact/career drafts, dynamic titles/descriptions/canonical/Open Graph tags, generated robots/sitemap files.
- Restored the homepage's three source testimonials and the on-time delivery statement; corrected contact form fields and dated the 2025 vision target as historical.
- Pinned package versions and added React type packages. Build now runs TypeScript build plus Vite production build.
- `npm.cmd run verify:routes` confirms 10 navigation routes + 58 product routes and 70 unique sitemap entries, with no `href="#"` in key components.

## Verification

- `npm.cmd run typecheck`: passed (`tsc -b`).
- `npm.cmd run build`: passed (`tsc -b && vite build`; Vite 8.3.5, production bundle about 320 kB / 97 kB gzip JS).
- `npm.cmd run verify:routes`: passed (70 sitemap routes, all known route paths present).
- Browser screenshot, real viewport, and runtime HTTP smoke test: not completed. Automatic sandbox approval review rejected starting a hidden local preview server; no browser automation package was in the repo.
- `npm install --offline` succeeded for declared packages after caching the required type packages inside the writable workspace. No audit vulnerabilities were reported by that install.

## Pending

1. Retrieve the original Konark Global logo/favicon, partner marks, director portraits, awards/certificates and original source image bytes. Verify dimensions and sample exact brand colours.
2. Replace remote image references with verified local assets; optimize images and check broken URLs.
3. Audit all remaining downloadable PDFs, nested pages, partner destinations, and complete exact product copy/source link parity.
4. Retrieve Gallery and Join-the-Team original content after source access is available.
5. Confirm actual contact form and career upload endpoints. Keep current honest email drafts until integration is verifiable.
6. Verify career years/vacancy columns against the source table; its extracted row structure is ambiguous.
7. Do browser-based responsive, accessibility and visual parity review after preview access is available.

## Known environment / repository issues

- Direct PowerShell requests to the official site fail with `Unable to connect to the remote server`; source reader supplied public text and URLs but could not provide image bytes.
- The source logo URL was not discoverable, but the user-provided `public/images/logo/logo.png` is now used in header and footer. The original favicon remains unavailable; empty starter files remain unused.
- The workspace `.git` directory is mounted read-only. `git add` failed when creating `.git/index.lock`; no commit or push was made. Open a writable shared checkout for durable cross-account Git handoff.
- `.gitignore` now excludes `node_modules`, `dist`, Vite and npm cache, but the read-only existing index cannot be cleaned in this session.

## Next immediate task

Next: localize and visually verify official About/shared images, locate the original favicon and partner marks, and continue full-site content/download auditing. Review logo colour sampling and responsive rendering in a browser.
## About page follow-up — 2026-10-28

- Re-read the full official About page (264 source lines) and compared its text, section order, outbound link and media references against `src/App.tsx`.
- Restored the source wording in the two overview paragraphs and current vision paragraph. Kept the 2025 target clearly marked as historical and removed an invented roadmap description.
- Added the official product CTA, About image, vision icon, mission icons, five director portraits, seven award/certificate images and the 2025 target image using exact official asset URLs. Image bytes remain unavailable for local download in this environment.
- Addressed the 27-item usability audit: raised small type, normalized About/footer type and text color treatments, removed duplicate footer-only links while retaining page routes elsewhere, corrected footer heading levels/casing, changed the sparse roadmap into an accessible vertical timeline, balanced leader/operations grids, added original portrait imagery, and tightened the values group.
- The Career and Join the Team routes remain distinct. The footer now has a single Careers link; the Join the Team route remains available in the primary navigation.
- Validation after these changes: `npm.cmd run build` and `npm.cmd run verify:routes` passed. Browser-based visual/image-load verification remains pending.
