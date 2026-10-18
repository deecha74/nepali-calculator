import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema, generateBreadcrumbSchema } from '@/lib/seo/metadata';
import { DocumentHub } from '@/components/documents/DocumentHub';

export const metadata: Metadata = constructMetadata({
  title: "Official Nepal Acts & Documents — Finance Act, Labour Act & Circulars",
  description: "Read, search, and download official Nepal Government Acts: Finance Act tax slabs, Labour Act gratuity rules, Bagmati vehicle schedules, and NRB directives.",
  path: "/documents",
  keywords: [
    "nepal government acts",
    "nepal finance act",
    "labour act 2074 nepal",
    "bagmati vehicle tax schedule",
    "sebon circular",
    "nrb dsti directive",
    "आधिकारिक ऐन",
    "श्रम ऐन २०७४",
    "आर्थिक ऐन",
  ],
});

export default function DocumentsPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Government Official Documents & Acts Reader",
    description: "Official interactive reader for Nepal Finance Acts, Labour Acts, and Departmental Circulars.",
    url: "https://nepalcalc.com/documents",
    category: "GovernmentApplication",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://nepalcalc.com" },
    { name: "Official Documents", url: "https://nepalcalc.com/documents" },
  ]);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '20px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <h1 className="sr-only">
        Official Nepal Government Acts, Regulations & Document Library
      </h1>
      <DocumentHub isHomepage={false} />
    </div>
  );
}
