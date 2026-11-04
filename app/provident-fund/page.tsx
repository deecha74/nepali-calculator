import type { Metadata } from 'next';
import Link from 'next/link';
import { Landmark, ArrowRight } from 'lucide-react';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { PensionCalculator } from '@/components/calculators/PensionCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: 'EPF Calculator Nepal — Karmachari Sanchaya Kosh (सञ्चय कोष)',
  description:
    'Calculate Nepal Provident Fund (EPF / Karmachari Sanchaya Kosh) maturity balance, 10%+10% monthly contribution, compound interest & 90% special loan limit.',
  path: '/provident-fund',
  keywords: [
    'epf calculator nepal',
    'provident fund calculator nepal',
    'karmachari sanchaya kosh calculator',
    'sanchaya kosh interest rate 2083/84',
    'epf special loan calculator nepal',
    'कर्मचारी सञ्चय कोष हिसाब',
    'सञ्चय कोष ब्याजदर',
  ],
});

export default function ProvidentFundPage() {
  const schema = generateWebApplicationSchema({
    name: 'Nepal EPF (Karmachari Sanchaya Kosh) Provident Fund Calculator',
    description:
      'Calculate Employee Provident Fund (EPF) accumulated balance, compound interest, special loan limit, and retirement corpus in Nepal.',
    url: 'https://nepalicalc.com/provident-fund',
    category: 'FinanceApplication',
  });

  const faqs = [
    {
      question: 'How does Employee Provident Fund (EPF / Karmachari Sanchaya Kosh) work in Nepal?',
      answer:
        'Under the Employees Provident Fund Act 2019 (1962) and Labour Act 2074, 10% is deducted from the employee’s basic monthly salary and the employer adds a matching 10%, resulting in a total 20% monthly deposit into Karmachari Sanchaya Kosh (EPF).',
    },
    {
      question: 'How much Special Loan (Sapkati) can I borrow from my EPF account in Nepal?',
      answer:
        'Once you complete 1 to 2 years of continuous contribution, you can withdraw up to 80%–90% of your accumulated EPF balance as a Special Loan (विशेष सापटी) via the EPF mobile app or portal with a low interest spread of roughly 1.0%–1.25% above the deposit rate.',
    },
    {
      question: 'What is the maximum tax exemption limit for EPF and CIT in Nepal (FY 2083/84)?',
      answer:
        'Under Section 63 of the Income Tax Act 2058, combined annual contributions to approved retirement funds (EPF + CIT) are tax-deductible up to the lower of NPR 3,00,000 (for non-SSF approved funds) or NPR 5,00,000 (under SSF/approved retirement ceilings) or one-third (1/3) of assessable income.',
    },
    {
      question: 'What social welfare benefits does Karmachari Sanchaya Kosh provide for free?',
      answer:
        'EPF contributors automatically receive Social Security welfare coverage including Funeral Grant (NPR 40,000), Accident Indemnity (NPR 2,00,000), Medical Reimbursement (up to NPR 1,00,000 for regular illnesses and NPR 10,00,000 for critical illnesses), and Maternity Care allowance.',
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="badge badge-emerald">Karmachari Sanchaya Kosh (EPF)</span>
          <span className="badge badge-neutral">10% + 10% Matching</span>
          <span className="badge badge-blue">FY 2083/84 Rates</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Nepal Provident Fund (EPF) Calculator — कर्मचारी सञ्चय कोष
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '720px', margin: '8px auto 0', lineHeight: 1.6 }}>
          Calculate your Karmachari Sanchaya Kosh (EPF) maturity corpus, annual compound interest, CIT voluntary top-ups, and 90% EPF Special Loan eligibility.
        </p>
      </div>

      <PensionCalculator />

      <AdBanner slotId="epf-page-mid" format="horizontal" />

      {/* EPF Rules & Loan Reference Table */}
      <div className="white-card" style={{ padding: '28px', margin: '36px 0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Landmark size={20} color="#0284c7" />
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
            Karmachari Sanchaya Kosh (EPF) Contribution, Interest &amp; Loan Guide (FY 2083/84)
          </h2>
        </div>
        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.6 }}>
          Summary of official statutory parameters for government civil servants, teachers, security personnel, and corporate contributors enrolled in the Employees Provident Fund (EPF) of Nepal:
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', fontSize: '13px' }}>
            <thead>
              <tr>
                <th>EPF Parameter / Facility</th>
                <th>Statutory Rule / Rate</th>
                <th>Eligibility &amp; Tax Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Employee Deduction</strong></td>
                <td>10% of Basic Monthly Salary</td>
                <td>Deducted at source before income tax</td>
              </tr>
              <tr>
                <td><strong>Employer Matching Contribution</strong></td>
                <td>10% of Basic Monthly Salary</td>
                <td>Total 20% monthly deposit into EPF account</td>
              </tr>
              <tr>
                <td><strong>EPF Deposit Interest Rate</strong></td>
                <td>~7.50% – 8.00% p.a. + Profit Bonus</td>
                <td>Compounded annually + Munafa bonus</td>
              </tr>
              <tr>
                <td><strong>Special Loan (विशेष सापटी)</strong></td>
                <td>Up to 90% of accumulated balance</td>
                <td>Instant online withdrawal after 1 year of service</td>
              </tr>
              <tr>
                <td><strong>Home / Education / Land Loan</strong></td>
                <td>Up to 15 Years Basic Salary (Max रु 1 Crore)</td>
                <td>Requires property collateral valuation</td>
              </tr>
              <tr>
                <td><strong>Income Tax Exemption (Sec. 63)</strong></td>
                <td>Up to 1/3 of Income or रु 3L–5L Limit</td>
                <td>Directly reduces your taxable salary slab</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '18px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href="/salary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#0284c7',
              textDecoration: 'none',
            }}
          >
            <span>Compare EPF vs SSF Net Salary</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/gratuity"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#059669',
              textDecoration: 'none',
            }}
          >
            <span>Calculate 8.33% Gratuity (Upadan)</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <FAQAccordion
        items={faqs}
        title="Nepal Provident Fund (EPF / Sanchaya Kosh) FAQs"
        quickSummary={{
          question: 'How is Employee Provident Fund (EPF) calculated in Nepal?',
          directAnswer:
            'In Nepal, 10% of an employee’s basic salary is deducted monthly and matched with 10% from the employer (total 20% of basic salary) into Karmachari Sanchaya Kosh (EPF). The balance compounds annually at ~7.5%–8.0% interest plus annual profit bonus, and contributors can borrow up to 90% via Special Loan.',
          keyFacts: ['20% Total Monthly Deposit', '90% Special Loan Limit', 'Up to रु 5L Tax Deduction'],
          authoritySource: 'Employees Provident Fund (Karmachari Sanchaya Kosh) Act',
        }}
      />
    </div>
  );
}
