# Konark Global Revamp — Asset Status

Last reviewed: 2026-10-28. Full row-level source/local mapping: `docs/IMAGE_ASSET_MAPPING.md`.

| Asset group | Required / discovered | Current state | Next action |
|---|---:|---|---|
| Konark Global logo | 1 | User-provided `public/images/logo/logo.png` (272×146 RGBA) integrated in shared header/footer | Verify visual rendering on light/dark backgrounds; do not distort or recolour |
| Favicon | 1 | User-provided logo PNG is registered as favicon; original source favicon not retrieved | Verify browser rendering and replace only if the original favicon is later obtained |
| Partner marks / header partner strip | Multiple | Text partner links only; one official principles image URL identified | Retrieve exact logos and confirm destinations |
| Industry photography | 12 | Correct official URLs referenced by the Industries cards | Download, verify image content/dimensions, use local assets |
| Project photos | 16 | Official source URLs and captions mapped; lightbox supports keyboard | Download and compare original gallery order/crops |
| Manufacturing gallery | 18 | Official `/assets/rd/` URLs mapped | Download, verify/crop and use local assets |
| About portraits | 5 | Exact official URLs resolved and referenced on page; downloads pending | Localize image bytes and verify dimensions/content |
| Awards/certificates | 7 | Exact official URLs resolved and referenced on page; downloads pending | Localize image bytes and verify dimensions/content |
| About icons | Multiple | Vision and mission icon URLs resolved and referenced; some value/area icon URLs remain unresolved | Resolve remaining original icon URLs; localize all bytes |
| Social icons | At least 3 + map | Facebook/Instagram/LinkedIn icon URLs observed; target profile URLs unknown | Retrieve bytes and confirm exact profile destinations before linking |
| Product images / brochures | Many | Product pages include source copy; complete media/download inventory pending | Crawl each product page's images, PDF hrefs, and captions |

## Network and local file facts

- Direct PowerShell request to `https://www.konarkglobal.com/` returns `Unable to connect to the remote server`.
- Source reader can expose text and URLs but not local image bytes.
- Current galleries/cards still use remote official URLs. Therefore local asset verification, dimensions, formats, broken-source checks and byte optimization are pending.
- No arbitrary stock images or fabricated logo files were added.
## About page source-image update (2026-10-28)

- Director portrait and award/certificate source URLs are now resolved from the official About page and used in the page.
- About lead image, mission illustrations, vision icon, and 2025 target image are also mapped and implemented using the official URLs.
- Local copies, exact dimensions, visual matching and availability checks are still pending; no image was generated or substituted.
- The same supplied PNG is also registered as the site favicon; the empty starter `favicon.ico` remains unused.
