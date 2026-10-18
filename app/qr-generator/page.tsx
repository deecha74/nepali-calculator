import type { Metadata } from 'next';
import { constructMetadata, generateWebApplicationSchema } from '@/lib/seo/metadata';
import { PaymentQrGenerator } from '@/components/calculators/PaymentQrGenerator';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = constructMetadata({
  title: "Nepal Payment QR Code Generator (Fonepay & eSewa क्युआर)",
  description: "Generate official printable Fonepay, eSewa, and NepalPay QR payment standees and stickers with merchant name, account number, and custom amount in NPR.",
  path: "/qr-generator",
  keywords: [
    "fonepay qr generator",
    "esewa payment qr nepal",
    "nepal pay qr code print",
    "merchant payment standee nepal",
    "क्युआर कोड जेनेरेटर",
    "फोनपे क्युआर"
  ],
});

export default function QrGeneratorPage() {
  const schema = generateWebApplicationSchema({
    name: "Nepal Payment QR Generator",
    description: "Generate standard interoperable payment QR code stickers for Fonepay, eSewa, and NepalPay merchant accounts.",
    url: "https://nepalcalc.com/qr-generator",
    category: "BusinessApplication",
  });

  const faqs = [
    {
      question: "Can customers scan this QR code using any mobile banking app in Nepal?",
      answer: "Yes, Fonepay and NepalPay (NCHL) utilize the Nepal Rastra Bank NepalQR interoperability standard, allowing customers to scan and pay from all commercial bank apps, development bank apps, and digital wallets (eSewa, Khalti, IME Pay).",
      questionNep: "के ग्राहकहरूले नेपालका कुनै पनि मोबाइल बैंकिङ एपबाट यो क्युआर स्क्यान गर्न सक्छन्?",
      answerNep: "हो, फोनपे र नेपालपे (NCHL) नेपाल राष्ट्र बैंकको नेपाल-क्युआर (NepalQR) अन्तरआवद्धता मापदण्डमा आधारित भएकाले सबै बैंक तथा वित्तीय संस्था, इसेवा, खल्ती र वालेटहरूबाट सिधै भुक्तानी गर्न मिल्छ।",
    },
    {
      question: "Can I print this QR code as a shop counter standee?",
      answer: "Yes, clicking the 'Print Sticker' button generates a formatted, high-resolution printable card suitable for table standees or shop counter stickers.",
      questionNep: "के म यसलाई पसलको काउन्टरमा राख्न मिल्ने गरी प्रिन्ट गर्न सक्छु?",
      answerNep: "हो, 'प्रिन्ट स्टिकर' बटनमा क्लिक गर्दा सिधै काउन्टर स्ट्यान्डी वा स्टिकर साइजमा उच्च गुणस्तरको प्रिन्ट कार्ड तयार हुन्छ।",
    },
    {
      question: "Is there any charge for creating this QR code?",
      answer: "No, generating printable QR code standees on NepalCalc is 100% free with no registration or fee required.",
      questionNep: "यो क्युआर कोड बनाउन कुनै शुल्क लाग्छ?",
      answerNep: "लाग्दैन, नेपालक्याल्कमा प्रिन्ट गर्न मिल्ने क्युआर कोड पूर्ण रूपमा निःशुल्क छ र कुनै दर्ता वा शुल्क आवश्यक पर्दैन।",
    },
  ];

  return (
    <div className="container" style={{ padding: '36px 20px 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PaymentQrGenerator />
      <div className="no-print" style={{ maxWidth: '880px', margin: '40px auto 0' }}>
        <FAQAccordion 
          items={faqs} 
          title="Payment QR Standee FAQs" 
          titleNep="क्युआर भुक्तानी सम्बन्धी जानकारी (FAQs)"
        />
      </div>
    </div>
  );
}
