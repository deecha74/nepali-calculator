# 📊 Nepali Calc — Full SEO Audit & Technical Architecture Report

## Executive Summary
| Category | Status | Highlights |
| :--- | :--- | :--- |
| **Indexation & Crawlability** | 🟢 **100% Optimized** | Clean `robots.ts`, dynamic XML sitemap with 60+ core tools + 100+ programmatic pages |
| **Structured Data (Schema.org)** | 🟢 **6 Rich Schemas** | `WebApplication`, `FAQPage`, `BreadcrumbList`, `Dataset` (GEO), `QAPage` (AEO/Voice), `Article`/`BlogPosting` |
| **Programmatic SEO (pSEO)** | 🟢 **Active** | Pre-computed landing pages for Land, Vehicles, Salary Tax, Forex, SIP, Gold, and Traditional Units |
| **AI / Search Engine Readiness** | 🟢 **AEO & GEO Ready** | Custom `llms.txt`, speakable microdata, and clean semantic DOM hierarchy |

---

## 1. Schema.org Structured Data Implementations

All structured data is generated via type-safe helpers in `lib/seo/metadata.ts` and injected directly via `<script type="application/ld+json">`.

### ① `WebApplication` Schema
* **Purpose**: Identifies each calculator tool as an interactive software application in Google search results (enabling app rich cards and rating badges).
* **Properties Included**:
  * `name`, `description`, `url`
  * `applicationCategory`: `FinanceApplication`, `BusinessApplication`, `UtilityApplication`
  * `operatingSystem`: `All (Web Browser, iOS, Android)`
  * `offers`: Free (`price: 0`, `priceCurrency: NPR`)
* **Implemented on**: All calculator pages, including `/tax`, `/land`, `/emi`, `/rent-agreement`, `/aoa`, `/partnership-deed`, etc.

### ② `FAQPage` Schema
* **Purpose**: Generates interactive expandable FAQ dropdowns directly under search snippets on Google SERP.
* **Properties Included**:
  * `mainEntity`: List of `Question` and `acceptedAnswer` with clean text responses.
* **Implemented on**: Homepage, Blog posts, Category hubs, and individual calculator pages (e.g. `/rent-tax`, `/rent-agreement`, `/house-construction`).

### ③ `BreadcrumbList` Schema
* **Purpose**: Informs search crawlers of hierarchical taxonomy (e.g., `Home > Tax & Labour > Salary Income Tax`), replacing ugly raw URLs with breadcrumb trails in SERP.
* **Properties Included**: `ListItem` with 1-indexed `position`, `name`, and canonical `item` URL.

### ④ `Dataset` Schema (GEO — Generative Engine Optimization)
* **Purpose**: Formatted specifically for LLMs and AI search engines (Perplexity, ChatGPT Search, Gemini, Claude) to ingest structured financial schedules.
* **Properties Included**: `name`, `description`, `keywords`, `creator`, `license` (CC-BY-4.0), and `isAccessibleForFree`.

### ⑤ `QAPage` & `SpeakableSpecification` (AEO — Answer Engine Optimization)
* **Purpose**: Targets voice search assistants (Google Assistant, Siri) and AI answer boxes.
* **Properties Included**: `mainEntity` with `SpeakableSpecification` targeting CSS selectors (`.aeo-answer-container`, `h1`, `p`).

### ⑥ `Article` & `BlogPosting` Schema
* **Purpose**: Powers Google Discover and News snippets for educational guides.
* **Implemented on**: All guides inside `/blog/[slug]`.

---

## 2. Sitemap Architecture & Generation

The sitemap is dynamically rendered by Next.js at `/sitemap.xml` via `app/sitemap.ts`.

### Dynamic Generation Pipeline:
1. **Core Routes (60+ paths)**:
   * **Tax & Legal**: `/tax`, `/tds`, `/corporate-tax`, `/depreciation`, `/vat`, `/rent-tax`
   * **Document Generators**: `/document-generators`, `/rent-agreement`, `/aoa`, `/partnership-deed`
   * **Finance & NEPSE**: `/emi`, `/sip`, `/nepse`, `/ipo-allotment`, `/fd-vs-debenture`, `/village-interest`
   * **Land & Units**: `/land`, `/traditional-units`, `/bato-katta`, `/house-construction`
   * **Utilities & Civic**: `/calendar`, `/date`, `/license-exam`, `/passport-fee`, `/preeti`, `/nea`
   * **Priority**: `1.0` for home, `0.9` for hubs, `0.85` for high-intent calculators.
2. **Programmatic SEO Slices**:
   * **Land conversions** (`/land/[slug]`): e.g. Ropani to Bigha, Aana to Sq Ft.
   * **Vehicle road taxes** (`/vehicle/[slug]`): e.g. 125cc bike tax, 1500cc car bluebook.
   * **Salary tax brackets** (`/tax/[slug]`): e.g. 50k, 1 lakh, 2 lakh monthly salary tax.
   * **Live Forex pairs** (`/forex/[slug]`): e.g. USD to NPR, AED to NPR, QAR to NPR.
   * **SIP projections** (`/sip/[slug]`): e.g. 5,000 monthly SIP for 10 years.
   * **Gold weights** (`/gold/[slug]`): e.g. 1 Tola, 10 Gram gold rate today.
   * **Traditional units** (`/traditional-units/[slug]`): e.g. Dharni to KG, Mana to Liter.
3. **Blog & Educational Guides**:
   * All articles from `BLOG_POSTS` automatically mapped with publication timestamps.

---

## 3. On-Page & Technical SEO Practices

### ① Metadata & Open Graph (`constructMetadata`)
* Defined in `lib/seo/metadata.ts`:
  * Dynamic `title` and localized meta `description`
  * Strict `metadataBase` preventing relative canonical issues
  * Self-referencing canonical tag (`canonicalUrl`) on every single page
  * High-res Open Graph (`1200x630`) and Twitter card (`summary_large_image`)
  * `robots` tag explicitly set to `index: true, follow: true` with `max-snippet: -1` and `max-image-preview: large`.

### ② Bot Access Control (`app/robots.ts`)
* Allows all user agents (`*`) across the entire site.
* Disallows private backend endpoints (`/api/`).
* Auto-declares the canonical sitemap reference (`sitemap.xml`).

### ③ Generative AI & LLM Indexing (`public/llms.txt`)
* Contains a structured markdown file summarizing Nepal's tax brackets, unit ratios, bluebook road tax rules, and official regulatory citations (IRD, NRB, DoTM, NEA) so AI models cite Nepali Calc as the primary source of truth.

### ④ Semantic HTML & Mobile UX
* Single `<h1>` tag per page with clear keyword targeting.
* Descriptive `aria-label` tags on all interactive elements.
* Responsive viewport handling with fluid typography.
* Bilingual meta keywords covering both English search terms (`rent agreement nepal`) and Devanagari queries (`घर बहाल करारनामा`, `आयकर हिसाब`).
