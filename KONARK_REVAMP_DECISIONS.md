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
- About page redesign (2026-10-28): moved from `App.tsx` to `src/pages/About/About.tsx`, content in `src/data/about.ts` (verbatim, source typos kept), styles in `src/styles/about.css`. Reuses `SectionTitle`, `RevealGroup`, the homepage `ContactCTA`, and the newly implemented `Breadcrumb`. `home.css` shared primitives are now scoped to `:is(.home-page, .about-page)`. Added a sticky "on this page" bar with scroll-spy; eyebrow labels (Group companies, Leadership, Recognition, Coverage, 1994 – 2025) are navigation labels only. The old `.about-content` rules in `usability.css` are now unused.
- Products page redesign (2026-10-28): moved to `src/pages/Products/Products.tsx` using the `components/products/*` stubs (ProductFilter, ProductCategory, ProductGrid, ProductCard). `products`, `productTargets`, `resolveProductLink` and the product-family grouping now live in `src/data/products.ts` (moved verbatim; the navbar and Sitemap import from there). Added client-side search and family filter tabs. Catalog cards show each page's eyebrow and intro, except restricted pages, whose intros are content-audit notes. Breadcrumb styles moved to `header.css`; `home.css` shared scope now includes `.products-page`.
- Contact page redesign (2026-10-28): moved to `src/pages/Contact/Contact.tsx`; form in `src/components/forms/ContactForm.tsx`; mailto draft builder in `src/services/contactService.ts` (body and subject identical to before). Fields, required rules and input types unchanged; invalid fields are highlighted via `:user-invalid` after interaction. Added quick-contact tiles and an "Open in Google Maps" link for the existing address. Styles in `src/styles/contact.css`; `home.css` shared scope includes `.contact-page`.
- Career page redesign (2026-10-28): moved to `src/pages/Career/Career.tsx` (serves both /career and /join_the_team; breadcrumb follows the route). Roles and partner associations in `src/data/careers.ts` (verbatim); form in `src/components/forms/CareerForm.tsx`; email drafts in `src/services/contactService.ts` (`prepareCareerEmail`, `roleApplicationMailto`, identical to before). Job cards can preselect the role in the form. Form field styles shared from `contact.css`; page styles in `src/styles/career.css`.
- Get-a-quote dialog restyled (`src/styles/quote-dialog.css`, markup in `SiteChrome.tsx`): 460px dialog with dark header, field icons, same fields/validation/mailto. Backdrop z-index raised to 100 so it covers the sticky header (was 25, below the header's 30).
