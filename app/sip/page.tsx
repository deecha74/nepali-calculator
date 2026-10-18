import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { SipCalculator } from '@/components/calculators/SipCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';
import { AdBanner } from '@/components/AdBanner';

export const metadata: Metadata = constructMetadata({
  title: "SIP Mutual Fund Calculator Nepal (एसआइपी हिसाब)",
  description: "Calculate mutual fund SIP returns in Nepal. Compare maturity values for NIBL Sahabhagita, Siddhartha, and SEBON approved open-ended schemes.",
  path: "/sip",
  keywords: [
    "sip calculator nepal",
    "mutual fund sip calculator nepal",
    "systematic investment plan nepal",
    "nibl sahabhagita sip calculator",
    "siddhartha mutual fund sip calculator",
    "best sip mutual funds nepal",
  ],
});

export default function SipPage() {
  const schema = generateWebApplicationSchema({
    name: "SIP Calculator Nepal",
    description: "Online Systematic Investment Plan (SIP) and open-ended mutual fund maturity calculator for Nepal.",
    url: "https://nepalcalc.com/sip",
    category: "FinanceApplication",
  });

  const faqs = [
    {
      question: "What is SIP (Systematic Investment Plan) in Nepal?",
      answer: "A Systematic Investment Plan (SIP) allows you to invest a fixed sum of money (starting from as low as NPR 500 or NPR 1,000 per month) periodically into SEBON-approved open-ended mutual funds in Nepal, benefiting from rupee cost averaging and compounding interest over time.",
    },
    {
      question: "What average returns can I expect from SIP in Nepal?",
      answer: "Historically, equity and balanced open-ended mutual funds in Nepal have generated between 12% to 15% annualized returns (CAGR), while debt schemes yield around 8% to 10%.",
    },
    {
      question: "Which are the best open-ended mutual funds for SIP in Nepal?",
      answer: "Top open-ended mutual funds in Nepal include NIBL Sahabhagita Fund (NIMB Ace Capital), Siddhartha Systematic Investment Scheme (Siddhartha Capital), NMB Saral Bachat Fund-E (NMB Capital), and NIC Asia Dynamic Debt Fund.",
    },
    {
      question: "Is SIP taxable in Nepal?",
      answer: "Mutual fund dividend distributions are subject to 5% Final Withholding Tax (TDS). Capital gains on mutual fund units held for more than 365 days incur 5% CGT, or 7.5% if held for less than 365 days.",
    },
  ];

  return (
    <div className="container" style={{ padding: 'clamp(20px, 4vw, 40px) 20px 80px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-amber" style={{ background: '#fef3c7', color: '#b45309' }}>SEBON Approved Mutual Funds</span>
          <span className="badge badge-emerald">Compounding Wealth Planner</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          SIP Calculator Nepal
        </h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
          Calculate maturity wealth, compound interest gains, and year-by-year growth for systematic monthly investments in Nepal.
        </p>
      </div>

      <SipCalculator />

      <AdBanner slotId="sip-page-middle" format="horizontal" />

      <div style={{ marginTop: '40px' }}>
        <FAQAccordion items={faqs} title="SIP & Mutual Fund Investment in Nepal FAQs" />
      </div>
    </div>
  );
}
