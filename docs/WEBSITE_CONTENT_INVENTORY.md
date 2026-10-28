# Website Content Inventory

Official source: https://www.konarkglobal.com/ (inspected 2026-10-28). This inventory distinguishes accessible source copy from routes whose source pages could not be retrieved. Images are referenced remotely in the implementation; image bytes have not been mirrored locally. See `KONARK_REVAMP_CONTENT_STATUS.md` and `IMAGE_ASSET_MAPPING.md` for detailed follow-up.

## Main pages

| Original URL | Page name | Page type | Source sections captured | React route | Implementation / verification |
|---|---|---|---|---|---|
| https://www.konarkglobal.com/ | One-Stop Solution for Industrial Equipment & Energy Efficiency | Home | Brand and vision, group companies, partner offer, why choose, 12 industry segments, three testimonials, footer and SEO links | `/` | First-pass implemented; source copy and imagery parity require final review |
| https://www.konarkglobal.com/about_us | About Konark Global: Industrial Solutions | Company | Overview, historical 2025 vision, five values, group missions, five directors, seven award/certificate image labels, five operation areas, six timeline entries | `/about_us` | Text implemented; portraits and certificate images pending |
| https://www.konarkglobal.com/products | Industrial Equipment & Energy Solutions | Catalog | Thermax, water/waste, accessories, chemical and Enviro categories; Atlas Copco; Grundfos; Advance Cooling Tower; spares | `/products` | Catalog and detail index implemented; source links audit pending |
| https://www.konarkglobal.com/projects | Projects | Project gallery | 16 project captions and source photographs | `/projects` | Gallery/lightbox implemented; remote original photos pending local copy |
| https://www.konarkglobal.com/services | Services | Service listing | 16 service types and seven core competencies | `/services` | Implemented; final source parity review pending |
| https://www.konarkglobal.com/manufacturing | Industrial Manufacturing by Konark Global | Manufacturing | Intro, materials, reasons to choose, facility, TPI list, five capability specifications, industry, 18 photos | `/manufacturing` | Content and gallery references implemented; local imagery pending |
| https://www.konarkglobal.com/industries | Industry Segments | Industry listing | Intro and all 12 segments with original descriptions | `/industries` | Implemented; industry image references are remote |
| https://www.konarkglobal.com/gallery | Gallery | Gallery | Gallery page body returned a cache miss | `/gallery` | Interim project gallery shown; exact source gallery audit remains |
| https://www.konarkglobal.com/contact_us | Contact Us | Contact | Address, two emails, four phone numbers, six form fields | `/contact_us` | Form matches source fields; mailto draft only because server behavior is unknown |
| https://www.konarkglobal.com/career | Careers | Careers | HR contact, four job records, CV form fields, partner capabilities | `/career` | UI implemented; no upload endpoint verified |
| https://www.konarkglobal.com/join_the_team | Join the Team | Careers | Source returned HTTP 406 | `/join_the_team` | Career content fallback; source page still unverified |
| https://www.konarkglobal.com/sitemap | Site map | Sitemap | Main routes, nested catalog, partners and footer links | `/sitemap` | Routes represented; detailed link equivalence audit pending |

## Product detail routes discovered

All listed routes are implemented from source-derived accessible copy or retained with a clear restricted-source notice.

| Original URL | Page name | Type | Captured content | Status | React route |
|---|---|---|---|---|---|
| https://www.konarkglobal.com/thermax-steam-boiler | Thermax Coil-Type Steam Boilers | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-steam-boiler` |
| https://www.konarkglobal.com/thermax-thermic-fluid-heater | Thermic Fluid Heaters | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-thermic-fluid-heater` |
| https://www.konarkglobal.com/thermax-hot-water-generator | Hot Water Generators | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-hot-water-generator` |
| https://www.konarkglobal.com/thermax-aquanexa-hot-water-generator | AquaNexa Hot Water Heat Pump | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-aquanexa-hot-water-generator` |
| https://www.konarkglobal.com/thermax-water-treatment | Water Treatment Solutions | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-water-treatment` |
| https://www.konarkglobal.com/thermax-waste-water-treatment | Waste Water Treatment | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-waste-water-treatment` |
| https://www.konarkglobal.com/thermax-surface-auto-blowdown-steam-accessories | Surface Auto Blowdown Control System (SABCO) | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-surface-auto-blowdown-steam-accessories` |
| https://www.konarkglobal.com/thermax-steam-distribution-steam-accessories | Steam Distribution | Product detail | Available intro and detail sections in source | Original page restricted; category retained and access notice shown | `/thermax-steam-distribution-steam-accessories` |
| https://www.konarkglobal.com/thermax-pressure-reducing-stations-steam-accessories | Pressure Reducing Stations | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-pressure-reducing-stations-steam-accessories` |
| https://www.konarkglobal.com/thermax-float-trap-module-steam-accessories | Float Trap Module · HPCRS | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-float-trap-module-steam-accessories` |
| https://www.konarkglobal.com/thermax-water-treatment-chemicals | Water Treatment Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-water-treatment-chemicals` |
| https://www.konarkglobal.com/thermax-cooling-water-treatment | Cooling Water Treatment Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-cooling-water-treatment` |
| https://www.konarkglobal.com/thermax-boiler-water-treatment-chemicals | Boiler Water Treatment Chemicals | Product detail | Available intro and detail sections in source | Original page restricted; category retained and access notice shown | `/thermax-boiler-water-treatment-chemicals` |
| https://www.konarkglobal.com/thermax-ro-membrane-treatment-chemicals | RO Water Treatment Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-ro-membrane-treatment-chemicals` |
| https://www.konarkglobal.com/thermax-polyelectctrolytes-chemicals | Polyelectrolytes for Water & Wastewater Treatment | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-polyelectctrolytes-chemicals` |
| https://www.konarkglobal.com/thermax-green-chemicals | Green Chemicals for Sustainable Water Treatment | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-green-chemicals` |
| https://www.konarkglobal.com/thermax-air-polution-control | Air Pollution Control | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-air-polution-control` |
| https://www.konarkglobal.com/thermax-electrostatic-precipitators-air-polution-control | Electrostatic Precipitators | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-electrostatic-precipitators-air-polution-control` |
| https://www.konarkglobal.com/thermax-bag-filters-air-polution-control | Bag Houses / Bag Filters | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-bag-filters-air-polution-control` |
| https://www.konarkglobal.com/thermax-combofiltertm-air-polution-control | Cyclomax & MDC · ComboFilter | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-combofiltertm-air-polution-control` |
| https://www.konarkglobal.com/atlas-copco | Atlas Copco Compressor Technique | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/atlas-copco` |
| https://www.konarkglobal.com/grundfos-pumps | Grundfos Pumps | Product detail | Available intro and detail sections in source | Original page restricted; category retained and access notice shown | `/grundfos-pumps` |
| https://www.konarkglobal.com/Aseries | CTI Certified Towers (A Series) | Product detail | Available intro and detail sections in source | Original page restricted; category retained and access notice shown | `/Aseries` |
| https://www.konarkglobal.com/RMseries | Energy Efficient Cooling Tower (RM Series) | Product detail | Available intro and detail sections in source | Original page restricted; category retained and access notice shown | `/RMseries` |
| https://www.konarkglobal.com/KRseries | Rectangular Cooling Tower (KR Series) | Product detail | Available intro and detail sections in source | Original page restricted; category retained and access notice shown | `/KRseries` |
| https://www.konarkglobal.com/DMseries | Circular Cooling Tower (DM Series) | Product detail | Available intro and detail sections in source | Original page restricted; category retained and access notice shown | `/DMseries` |
| https://www.konarkglobal.com/thermax-genuine-spares | Thermax Genuine Spares | Product detail | Available intro and detail sections in source | Original page restricted; category retained and access notice shown | `/thermax-genuine-spares` |
| https://www.konarkglobal.com/thermax-steamatic-steam-boilers | Steamatic | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-steamatic-steam-boilers` |
| https://www.konarkglobal.com/thermax-energen-steam-boilers | Energen | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-energen-steam-boilers` |
| https://www.konarkglobal.com/thermax-revomax-steam-boilers | Revomax Nxt | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-revomax-steam-boilers` |
| https://www.konarkglobal.com/thermax-shellmax-steam-boilers | Shellmax | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-shellmax-steam-boilers` |
| https://www.konarkglobal.com/thermax-thermosyphon-steam-boilers | Thermosyphon | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-thermosyphon-steam-boilers` |
| https://www.konarkglobal.com/thermax-thermeon-steam-boilers | Thermeon | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-thermeon-steam-boilers` |
| https://www.konarkglobal.com/thermax-combloc-steam-boilers | Combloc | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-combloc-steam-boilers` |
| https://www.konarkglobal.com/thermax-combipac-steam-boilers | Combipac | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-combipac-steam-boilers` |
| https://www.konarkglobal.com/thermax-woodpac-steam-boilers | Woodpac | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-woodpac-steam-boilers` |
| https://www.konarkglobal.com/thermax-cocomax-steam-boilers | Cocomax | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-cocomax-steam-boilers` |
| https://www.konarkglobal.com/thermax-huskpac-steam-boilers | Huskpac Ultra | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-huskpac-steam-boilers` |
| https://www.konarkglobal.com/thermax-bi-drum-boiler-steam-boilers | Bi-Drum (Powermax) | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-bi-drum-boiler-steam-boilers` |
| https://www.konarkglobal.com/thermax-powerpac-steam-boilers | Powerpac | Product detail | Available intro and detail sections in source | Original page restricted; category retained and access notice shown | `/thermax-powerpac-steam-boilers` |
| https://www.konarkglobal.com/thermax-sugar-process-chemicals | Sugar Process Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-sugar-process-chemicals` |
| https://www.konarkglobal.com/thermax-efficient-microbes-chemicals | Efficient Microbes | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-efficient-microbes-chemicals` |
| https://www.konarkglobal.com/thermax-paper-chemicals | Paper Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-paper-chemicals` |
| https://www.konarkglobal.com/thermax-coagulants-and-flocculants-chemicals | Coagulants and Flocculants | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-coagulants-and-flocculants-chemicals` |
| https://www.konarkglobal.com/thermax-sizing-chemicals | Sizing Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-sizing-chemicals` |
| https://www.konarkglobal.com/thermax-strength-resins-chemicals | Strength Resins | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-strength-resins-chemicals` |
| https://www.konarkglobal.com/thermax-microbiocides-deposit-control-chemicals | Microbiocides and Deposit Control | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-microbiocides-deposit-control-chemicals` |
| https://www.konarkglobal.com/thermax-defoamer-antifoamers-chemicals | Defoamers and Antifoamers | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-defoamer-antifoamers-chemicals` |
| https://www.konarkglobal.com/thermax-de-inking-refining-bleaching-additives-chemicals | De-Inking, Refining and Bleaching Additives | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-de-inking-refining-bleaching-additives-chemicals` |
| https://www.konarkglobal.com/thermax-coating-chemicals | Coating Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-coating-chemicals` |
| https://www.konarkglobal.com/thermax-paper-chemicals-application-chemicals | Paper Chemicals Application-Wise | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-paper-chemicals-application-chemicals` |
| https://www.konarkglobal.com/thermax-flow-assurance-chemicals | Flow Assurance Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-flow-assurance-chemicals` |
| https://www.konarkglobal.com/thermax-separation-chemicals | Separation Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-separation-chemicals` |
| https://www.konarkglobal.com/thermax-asset-integrity-chemicals | Asset Integrity Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-asset-integrity-chemicals` |
| https://www.konarkglobal.com/thermax-water-injection-chemicals | Water Injection Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-water-injection-chemicals` |
| https://www.konarkglobal.com/thermax-down-stream-chemicals | Downstream Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-down-stream-chemicals` |
| https://www.konarkglobal.com/thermax-oil-field-chemicals | Oil Field Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-oil-field-chemicals` |
| https://www.konarkglobal.com/thermax-fuel-additives-chemicals | Fuel Additives and Fireside Chemicals | Product detail | Available intro and detail sections in source | Source-derived detail page implemented | `/thermax-fuel-additives-chemicals` |

## Functionality and resources

- Contact form source fields: Firstname, Middlename, Lastname, Email Id, mobile, City. Current UI prepares a user-reviewed email draft; no server submission claim is made.
- Career application prepares an email draft and explicitly asks applicants to attach the CV manually; no file upload endpoint was identified.
- Product pages link to contact enquiry; source brochures and PDF URLs still require page-by-page mapping and verification.
- Social icon image URLs are known, but profile destinations were not exposed reliably and are not guessed.
- The source contains a 2025 revenue target; it is presented as a historical statement, not as a current commitment.
