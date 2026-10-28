# Konark Global Website Revamp — Project Specification

## Objective

Revamp the existing Konark Global website into a premium, responsive React experience while retaining the actual business identity and all source-verifiable content. The live site is authoritative; improve hierarchy and presentation without changing factual meaning.

**Official source:** https://www.konarkglobal.com/  
**Working directory:** `D:\konarkglobal.com`  
**Primary source page:** https://www.konarkglobal.com/industries

## Non-negotiable content and brand requirements

- Inspect every reachable page, navigation item, footer link, submenu, product detail, media asset, form, and downloadable resource. Track inaccessible source pages explicitly; never invent missing content.
- Preserve every relevant source heading, paragraph, list, specification, caption, contact detail, CTA and destination. Do not use placeholder text, fake metrics, testimonials, certifications, projects, clients or claims.
- Use the original Konark Global logo asset and proportions. Do not redraw it or substitute a fabricated mark. The source logo could not be retrieved in this environment; current text branding is a temporary fallback and must be replaced after asset access.
- Extract actual logo colours. Use restrained orange, charcoal, white and neutrals; never introduce unrelated palettes. Current CSS palette is provisional because the original logo bytes could not be inspected.
- Use original company, product, project, manufacturing and industry imagery in the correct section. Preserve aspect ratios, crop intentionally, add descriptive alt text and lazy-load below-fold images. Local assets are preferred; remote source URLs are temporary while outbound workspace requests fail.
- Preserve external partner links only when verified. Do not guess social links, contact data, technical facts or form endpoints.

## Design direction

Premium industrial editorial design: bold but readable typography, strong image-led compositions, generous whitespace, disciplined brand accents, responsive asymmetric layouts, polished navigation, and distinctive page-specific section structures. Avoid generic corporate templates and excess decoration.

Animation should be subtle, purposeful, lightweight and consistent. Respect `prefers-reduced-motion`; avoid scroll hijacking or motion that blocks interaction. Ensure keyboard operation, clear focus, contrast, semantic structure, accessible forms and screen-reader labels.

## Technology and architecture

Current stack: React + TypeScript + Vite + custom CSS + lucide-react. Preserve the existing framework and dependencies. Keep routes, reusable layout/components, data and page sections organized; avoid replacing unrelated project configuration. Production build runs through Vite; `tsc -b` passes with the pinned React type packages.

Current app uses source-preserving route paths such as `/about_us`, `/contact_us`, `/join_the_team`, and 58 product detail routes recorded in `src/data/productPages.ts`. Preserve these paths. Ensure every nav item resolves, mobile nav is usable, dropdowns are keyboard accessible, and direct routes load under SPA fallback.

## Functionality

Preserve navigation, quote request, contact, career, gallery, downloads, partner navigation and all useful interactions. Existing contact/career integrations could not be verified. Current forms prepare user-reviewed `mailto:` drafts; career applicants attach CV files manually. Never claim server submission or invent an API.

## Technical acceptance

- Responsive at desktop/tablet/mobile sizes with no overflow or clipped controls.
- Use correct title, meta description, canonical, Open Graph, semantic headings, internal links, `robots.txt`, and sitemap.
- Optimize media and loading; avoid unnecessary dependencies and motion overhead.
- Build successfully and verify all route links, forms, keyboard navigation, reduced motion, image loading, accessibility and visual parity.
- Keep all continuity documents current so another Codex session resumes from files by typing `continue`.

## Source-audit documentation

- `docs/WEBSITE_CONTENT_INVENTORY.md`: page and product-route inventory.
- `docs/IMAGE_ASSET_MAPPING.md`: source image URLs, intended local paths and status.
- `KONARK_REVAMP_CONTENT_STATUS.md`: content preservation checklist and gaps.
- `KONARK_REVAMP_ASSET_STATUS.md`: asset retrieval and verification status.
- `KONARK_REVAMP_PROGRESS.md`: work and verification status.
- `KONARK_REVAMP_DECISIONS.md`: durable implementation decisions.
- `KONARK_REVAMP_CONTINUATION.md`: next exact action for a new account/session.

## Cross-account continuity

Persistent project files are the only reliable handoff. A different account/session must open the same directory or latest shared Git checkout, inspect the files above and confirm source state before proceeding. Conversation history is not required. Never push without authorization. The current `.git` metadata is read-only in this workspace, so versioned cross-account handoff requires opening a writable checkout or copying the project to shared storage.