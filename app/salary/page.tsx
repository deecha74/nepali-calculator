import type { Metadata } from 'next';
import Link from 'next/link';
import { Wallet, ArrowRight } from 'lucide-react';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { IncomeTaxCalculator } from '@/components/calculators/IncomeTaxCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';
import { PROGRAMMATIC_SALARY_TAXES } from '@/lib/rates/programmaticTax';

export const metadata: Metadata = constructMetadata({
  title: 'Nepal Salary Calculator (FY 2083/84) — Net Take-Home & SSF',
  description:
    'Calculate your monthly net in-hand salary in Nepal (FY 2083/84). Compare SSF (11% + 20%), EPF/CIT deductions, Dashain allowance & monthly TDS.',
  path: '/salary',
  keywords: [
    'salary calculator nepal',
    'in hand salary calculator nepal',
    'net take home salary nepal',
    'ssf salary calculator nepal',
    'nepal salary tax calculator 2083/84',
    'तलब क्यालकुलेटर नेपाल',
  ],
});

export default function SalaryCalculatorPage() {
  const schema = generateWebApplicationSchema({
    name: 'Nepal Salary & Net Take-Home Pay Calculator (FY 2083/84)',
    description:
      'Calculate monthly net take-home salary after Social Security Fund (SSF), EPF, CIT, and Inland Revenue Department (IRD) income tax deductions in Nepal.',
    url: 'https://nepalicalc.com/salary',
    category: 'FinanceApplication',
  });

  const faqs = [
    {
      question: 'How do I calculate my net in-hand monthly salary in Nepal?',
      answer:
        'Your monthly net take-home salary equals Gross Monthly Salary minus your retirement contribution (11% of basic salary for SSF or 10% for EPF plus voluntary CIT) minus Monthly TDS (Annual Income Tax divided by 12).',
    },
    {
      question: 'How much is deducted for Social Security Fund (SSF) from salary in Nepal?',
      answer:
        'Under the Contribution-Based Social Security Act 2074, 11% of the employee’s basic salary is deducted from their paycheck, while the employer contributes 20% of basic salary (10% PF + 8.33% Gratuity + 1.67% Medical/Accident Insurance), making a 31% total monthly SSF deposit. Employees enrolled in SSF also get the 1% Social Security Tax (SST) on the first slab completely waived.',
    },
    {
      question: 'Is Dashain Allowance (1 month basic salary) taxable in Nepal?',
      answer:
        'Yes. Under the Income Tax Act 2058, festival/Dashain allowance (चाडपर्व खर्च) is part of assessable employment income, making a standard full-year package equal to 13 months of basic salary plus 12 months of allowances.',
    },
  ];

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="badge badge-emerald">Net In-Hand Paycheck</span>
          <span className="badge badge-blue">SSF 31% &amp; EPF/CIT</span>
          <span className="badge badge-neutral">FY 2083/84 IRD Slabs</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 3.8vw, 34px)', fontWeight: 800, marginTop: '10px', color: 'var(--text-primary)' }}>
          Nepal Salary Calculator (FY 2083/84) — Net Take-Home &amp; SSF Breakdown
        </h1>
        <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginTop: '6px', maxWidth: '780px', lineHeight: 1.6 }}>
          Calculate your exact monthly in-hand paycheck after Social Security Fund (SSF 11% + 20%), Karmachari Sanchaya Kosh (EPF), Citizen Investment Trust (CIT), and monthly TDS deductions.
        </p>
      </div>

      <IncomeTaxCalculator titleTag="h2" />

      <AdBanner slotId="salary-page-mid" format="horizontal" />

      {/* Monthly Salary Take-Home Reference Table */}
      <div className="white-card" style={{ padding: '28px', margin: '36px 0 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Wallet size={20} color="#059669" />
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
            Monthly Salary vs Net Take-Home Pay Table in Nepal (FY 2083/84)
          </h2>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
          Quick benchmark showing annual tax and monthly net take-home salary across popular Nepal pay scales (click any salary tier for full breakdown):
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', fontSize: '13px' }}>
            <thead>
              <tr>
                <th>Gross Monthly Salary</th>
                <th>Annual Gross (12 Mo)</th>
                <th>Annual Tax (With SSF)</th>
                <th>Annual Tax (Standard)</th>
                <th>Est. Net Take-Home / Mo</th>
                <th>Detailed Guide</th>
              </tr>
            </thead>
            <tbody>
              {PROGRAMMATIC_SALARY_TAXES.map((row) => (
                <tr key={row.slug}>
                  <td><strong>रु {row.monthlySalary.toLocaleString('en-IN')}</strong></td>
                  <td>रु {row.annualSalary.toLocaleString('en-IN')}</td>
                  <td style={{ color: '#059669', fontWeight: 700 }}>रु {row.singleAnnualTaxSsf.toLocaleString('en-IN')}</td>
                  <td>रु {row.singleAnnualTaxNormal.toLocaleString('en-IN')}</td>
                  <td><strong>रु {row.takeHomeMonthlySsf.toLocaleString('en-IN')}</strong></td>
                  <td>
                    <Link
                      href={`/tax/${row.slug}`}
                      style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>View Slab</span>
                      <ArrowRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FAQAccordion
        items={faqs}
        title="Nepal Salary & SSF Paycheck FAQs"
        quickSummary={{
          question: 'How is net take-home salary calculated in Nepal?',
          directAnswer:
            'Net monthly take-home salary in Nepal is calculated by subtracting retirement contributions (11% of basic salary for SSF or 10% for EPF/CIT) and monthly TDS (based on FY 2083/84 IRD slabs from 1% to 39%) from gross monthly pay.',
          keyFacts: ['SSF: 11% Employee + 20% Employer', '0% 1st Slab Tax with SSF', 'Up to रु 5L Retirement Deduction'],
          authoritySource: 'Inland Revenue Department (IRD) & Social Security Fund (SSF) Nepal',
        }}
      />
    </div>
  );
}
