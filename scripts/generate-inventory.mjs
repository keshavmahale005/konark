import fs from 'node:fs';
const text=fs.readFileSync('src/data/productPages.ts','utf8');
const routeMatches=[...text.matchAll(/path:\s*'([^']+)'/g)];
const rows=routeMatches.map((match,index)=>{
  const end=routeMatches[index+1]?.index??text.length;
  const entry=text.slice(match.index,end);
  const title=entry.match(/title:\s*'([^']+)'/)?.[1]??match[1];
  const status=entry.includes("sourceStatus:'restricted'")?'Original page restricted; category retained and access notice shown':'Source-derived detail page implemented';
  return `| https://www.konarkglobal.com${match[1]} | ${title} | Product detail | Available intro and detail sections in source | ${status} | \`${match[1]}\` |`;
});const header=`# Website Content Inventory

Official source: https://www.konarkglobal.com/ (inspected 2026-10-28). This inventory distinguishes accessible source copy from routes whose source pages could not be retrieved. Images are referenced remotely in the implementation; image bytes have not been mirrored locally. See \`KONARK_REVAMP_CONTENT_STATUS.md\` and \`IMAGE_ASSET_MAPPING.md\` for detailed follow-up.

## Main pages

| Original URL | Page name | Page type | Source sections captured | React route | Implementation / verification |
|---|---|---|---|---|---|
| https://www.konarkglobal.com/ | One-Stop Solution for Industrial Equipment & Energy Efficiency | Home | Brand and vision, group companies, partner offer, why choose, 12 industry segments, three testimonials, footer and SEO links | \`/\` | First-pass implemented; source copy and imagery parity require final review |
| https://www.konarkglobal.com/about_us | About Konark Global: Industrial Solutions | Company | Overview, historical 2025 vision, five values, group missions, five directors, seven award/certificate image labels, five operation areas, six timeline entries | \`/about_us\` | Text implemented; portraits and certificate images pending |
| https://www.konarkglobal.com/products | Industrial Equipment & Energy Solutions | Catalog | Thermax, water/waste, accessories, chemical and Enviro categories; Atlas Copco; Grundfos; Advance Cooling Tower; spares | \`/products\` | Catalog and detail index implemented; source links audit pending |
| https://www.konarkglobal.com/projects | Projects | Project gallery | 16 project captions and source photographs | \`/projects\` | Gallery/lightbox implemented; remote original photos pending local copy |
| https://www.konarkglobal.com/services | Services | Service listing | 16 service types and seven core competencies | \`/services\` | Implemented; final source parity review pending |
| https://www.konarkglobal.com/manufacturing | Industrial Manufacturing by Konark Global | Manufacturing | Intro, materials, reasons to choose, facility, TPI list, five capability specifications, industry, 18 photos | \`/manufacturing\` | Content and gallery references implemented; local imagery pending |
| https://www.konarkglobal.com/industries | Industry Segments | Industry listing | Intro and all 12 segments with original descriptions | \`/industries\` | Implemented; industry image references are remote |
| https://www.konarkglobal.com/gallery | Gallery | Gallery | Gallery page body returned a cache miss | \`/gallery\` | Interim project gallery shown; exact source gallery audit remains |
| https://www.konarkglobal.com/contact_us | Contact Us | Contact | Address, two emails, four phone numbers, six form fields | \`/contact_us\` | Form matches source fields; mailto draft only because server behavior is unknown |
| https://www.konarkglobal.com/career | Careers | Careers | HR contact, four job records, CV form fields, partner capabilities | \`/career\` | UI implemented; no upload endpoint verified |
| https://www.konarkglobal.com/join_the_team | Join the Team | Careers | Source returned HTTP 406 | \`/join_the_team\` | Career content fallback; source page still unverified |
| https://www.konarkglobal.com/sitemap | Site map | Sitemap | Main routes, nested catalog, partners and footer links | \`/sitemap\` | Routes represented; detailed link equivalence audit pending |

## Product detail routes discovered

All listed routes are implemented from source-derived accessible copy or retained with a clear restricted-source notice.

| Original URL | Page name | Type | Captured content | Status | React route |
|---|---|---|---|---|---|
${rows.join('\n')}

## Functionality and resources

- Contact form source fields: Firstname, Middlename, Lastname, Email Id, mobile, City. Current UI prepares a user-reviewed email draft; no server submission claim is made.
- Career application prepares an email draft and explicitly asks applicants to attach the CV manually; no file upload endpoint was identified.
- Product pages link to contact enquiry; source brochures and PDF URLs still require page-by-page mapping and verification.
- Social icon image URLs are known, but profile destinations were not exposed reliably and are not guessed.
- The source contains a 2025 revenue target; it is presented as a historical statement, not as a current commitment.
`;
fs.writeFileSync('docs/WEBSITE_CONTENT_INVENTORY.md',header,'utf8');
console.log(`Wrote inventory for ${rows.length} product routes.`);const contentStatus=`# Content Preservation Status

Source audit date: 2026-10-28. Content below comes from the official Konark Global site. Do not mark source-restricted or unavailable text complete until it is independently verified. The full original page URLs and route list are in \`docs/WEBSITE_CONTENT_INVENTORY.md\`.

| Page | Required source content | Implementation status | Verification / remaining work |
|---|---|---|---|
| Home | Hero, vision, group entities, partner claims, why-choose benefits, 12 industries, three testimonials, full footer links | First-pass implemented | Compare every sentence/CTA and source image placement; logo and local assets missing |
| About Us | Overview, dated vision, five values, three missions, five directors, seven award/certificate visuals, operation areas, 1994–2025 timeline | Text sections implemented | Capture original portrait/certificate/icon files and verify image captions |
| Products | Main product and partner categories, nested menu routes, detail page copy, source brochure links | Catalog and 58 local detail routes | Verify external destinations, original downloadable brochures, restricted route copy and newly discovered category pages |
| Projects | 16 project captions and images | All captions/images represented by source URLs; lightbox implemented | Localize images, compare exact source asset order and captions |
| Services | 16 listed service types and seven core competency descriptions | Implemented | Compare original formatting and exact wording; improve anchor/deep-link verification |
| Manufacturing | Company/facility intro, materials, six reasons, facility stats, TPI list, five capabilities, industry line, 18 images | Text and image references implemented | Localize and visually verify all photos; confirm links to R&D Therm capability detail pages |
| Industries | Intro, all 12 industry titles/descriptions | Implemented | Localize images and compare card order/crops |
| Gallery | Original page is a cache miss; project gallery source has 16 captions | Interim project gallery used | Must retrieve actual Gallery source page before claiming exact parity |
| Contact | Address, email addresses, four phone numbers, six source field names | Implemented; email draft only | Actual backend form endpoint/submission is unverified; no backend made up |
| Career | HR email/phone, four role listings, application fields and partner overview | Implemented; email draft only | Role table is parsed from a malformed source table; confirm desired years/vacancy values; no CV upload endpoint verified |
| Join the Team | Source endpoint returned 406 | Career fallback route | Recheck page after source access is available |
| Sitemap | Main navigation, nested catalog, product routes and footer links | Main and product links present | Complete exact target mapping, especially PDF downloads, partner-owned pages and SEO footer destinations |
${rows.join('\n')}

## Explicit remaining content gaps

- The logo and about-page imagery are not retrievable through the current workspace network.
- Source page body for Gallery and Join the Team is unavailable; several product pages also returned 406/cache errors and are called out per route.
- Downloadable PDF and brochure links have not all been inventoried or downloaded.
- Social profile destinations have not been confirmed, so the redesign does not guess these URLs.
- The original contact form processing endpoint and career upload endpoint have not been verified.
- An actual browser visual comparison and viewport-by-viewport review remain pending.
`;
fs.writeFileSync('KONARK_REVAMP_CONTENT_STATUS.md',contentStatus,'utf8');