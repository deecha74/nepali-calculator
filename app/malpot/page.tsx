import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { MalpotTaxCalculator } from '@/components/calculators/MalpotTaxCalculator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Nepal Land Malpot Registration & Capital Gains Tax Calculator (मालपोत लिखत तथा पूँजीगत लाभकर)",
  description: "Calculate official land deed registration fees for buyers across all municipalities, 25% female ownership discount, and seller Capital Gains Tax (7.5% vs 10% CGT) in Nepal.",
  path: "/malpot",
  keywords: [
    "malpot tax calculator nepal",
    "land registration fee nepal",
    "capital gains tax nepal land",
    "मालपोत रजिस्ट्रेसन दस्तुर",
    "पूँजीगत लाभकर जग्गा",
    "nepal property deed transfer fee",
    "kathmandu malpot valuation",
    "female land discount nepal 25%"
  ],
});

export default function MalpotPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Land Malpot Registration & Capital Gains Tax Calculator",
    description: "Official calculator for Nepal land registration deed fees, female owner concessions, and seller capital gains tax under DoLMA guidelines.",
    url: "https://nepalcalc.com/malpot",
    category: "FinancialApplication",
  });

  const faqs = [
    {
      question: "What is the land registration fee rate in Nepal municipalities?",
      answer: "In Metropolitan cities (Kathmandu, Lalitpur, Pokhara, Bharatpur, Biratnagar, Birgunj), the base deed registration fee is 5%. In Sub-Metropolitan and standard Municipalities it is 4.5%, and in Rural Municipalities (Gaunpalika) it is 3%. Apartments have a 1% rate.",
      questionNep: "नेपालका पालिकाहरूमा जग्गा रजिष्ट्रेसन दस्तुर कति प्रतिशत लाग्छ?",
      answerNep: "महानगरपालिकाहरू (काठमाडौँ, ललितपुर, पोखरा, भरतपुर, विराटनगर, वीरगञ्ज) मा ५% आधार लिखत दस्तुर लाग्छ। उपमहानगर र नगरपालिकामा ४.५% तथा गाउँपालिका क्षेत्रमा ३% लाग्छ। अपार्टमेन्टको हकमा १% दर तोकिएको छ।",
    },
    {
      question: "How much discount do women receive on land registration?",
      answer: "If a property is registered under a woman's sole ownership, she receives a 25% discount on the base registration fee in metropolitan and municipal areas. Single women (including widows) receive an enhanced 35% discount.",
      questionNep: "महिलाको नाममा जग्गा पास गर्दा कति छुट पाइन्छ?",
      answerNep: "महिलाको एकल नाममा जग्गा रजिस्ट्रेसन (पास) गर्दा रजिष्ट्रेसन लिखत दस्तुरमा २५% छुट पाइन्छ। एकल महिलाको हकमा ३५% सम्म छुट पाउने कानुनी व्यवस्था छ।",
    },
    {
      question: "What are the Capital Gains Tax (CGT) rates for selling land or houses in Nepal?",
      answer: "Under the Nepal Finance Act, individual sellers pay 10% Capital Gains Tax on net profit if the property was held for 5 years or less (short-term), and 7.5% if held for more than 5 years (long-term). Transactions with a gross value under NPR 10 Lakhs or continuous primary residences of 10+ years are exempt from CGT.",
      questionNep: "जग्गा वा घर बेच्दा विक्रेताले तिर्नुपर्ने पूँजीगत लाभकर (CGT) कति हो?",
      answerNep: "आर्थिक ऐन अनुसार ५ वर्ष वा सो भन्दा कम समय स्वामित्व भएको सम्पत्ति बिक्री गर्दा खुद नाफाको १०% र ५ वर्षभन्दा बढी स्वामित्व भएकोमा ७.५% पूँजीगत लाभकर लाग्छ। १० लाखभन्दा कम कारोबार वा १० वर्षभन्दा बढी बसोबास गरेको निजी घरजग्गामा लाभकर पूर्ण छुट हुन्छ।",
    },
    {
      question: "Is tax calculated on the agreed price or the government minimum valuation?",
      answer: "The Land Revenue Office (Malpot Karyalaya) evaluates tax on whichever amount is higher: your mutually agreed transaction deed price or the official government Minimum Valuation Book (Nyunatam Mulyankan Pustika) for that road/ward category.",
      questionNep: "कर कारोबार थैली मूल्यमा लाग्छ कि सरकारी न्यूनतम मूल्याङ्कनमा?",
      answerNep: "मालपोत कार्यालयले तपाईंको लिखतमा उल्लिखित कारोबार मूल्य (थैली) र सरकारी न्यूनतम मूल्याङ्कन पुस्तिकामध्ये जुन रकम बढी हुन्छ, सोही रकमलाई आधार मानेर राजस्व र कर निर्धारण गर्दछ।",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <MalpotTaxCalculator />
      <div style={{ maxWidth: '900px', margin: '44px auto 0' }}>
        <FAQAccordion 
          items={faqs} 
          title="Land Registration & Capital Gains Tax FAQs" 
          titleNep="मालपोत रजिष्ट्रेसन तथा पूँजीगत लाभकर सम्बन्धी जानकारी (FAQs)"
        />
      </div>
    </div>
  );
}
