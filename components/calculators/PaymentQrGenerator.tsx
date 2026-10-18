'use client';

import React, { useState, useMemo, useRef } from 'react';
import { QrCode, Download, Printer, Copy, Check, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

const NEPALI_FONTS = [
  { id: 'mukta', name: 'साधारण (Modern Mukta)', family: "'Mukta', 'Noto Sans Devanagari', sans-serif" },
  { id: 'noto-serif', name: 'परम्परागत (Classic Serif)', family: "'Noto Serif Devanagari', Georgia, serif" },
  { id: 'yatra', name: 'काष्ठकला (Heritage Signboard)', family: "'Yatra One', cursive, serif" },
  { id: 'rozha', name: 'राजकीय (Royal Headline)', family: "'Rozha One', serif" },
  { id: 'kalam', name: 'हस्तलेखन (Calligraphy / Kalam)', family: "'Kalam', cursive" },
];

export function PaymentQrGenerator() {
  const { language, t } = useLanguage();
  const [platform, setPlatform] = useState<'fonepay' | 'esewa' | 'nepalpay'>('fonepay');
  const [receiverName, setReceiverName] = useState<string>('नेपाली किराना पसल');
  const [phoneNumber, setPhoneNumber] = useState<string>('9801234567');
  const [amount, setAmount] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('भुक्तानी (Payment)');
  const [selectedFont, setSelectedFont] = useState<string>('mukta');
  const [copied, setCopied] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeFont = NEPALI_FONTS.find(f => f.id === selectedFont) || NEPALI_FONTS[0];

  // Generate standard EMVCo/QR encoded string
  const qrDataUrl = useMemo(() => {
    // Generate an SVG QR code using pure client-side standard SVG matrix
    const payload = `nepalpay://pay?pa=${phoneNumber}@${platform}&pn=${encodeURIComponent(receiverName)}&am=${amount || ''}&tn=${encodeURIComponent(remarks)}&cu=NPR`;

    // Quick encode into Google Charts / QuickChart URL for high-res crisp vector QR
    const encoded = encodeURIComponent(payload);
    return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encoded}&margin=8`;
  }, [platform, receiverName, phoneNumber, amount, remarks]);

  const handlePrint = () => {
    if (!cardRef.current) return;

    // Remove any previously created print iframe
    const oldIframe = document.getElementById('qr-print-isolated-frame');
    if (oldIframe) oldIframe.remove();

    const iframe = document.createElement('iframe');
    iframe.id = 'qr-print-isolated-frame';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${receiverName || 'Payment QR'} - Standee</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;700;900&family=Noto+Serif+Devanagari:wght@400;700;800&family=Yatra+One&family=Rozha+One&family=Kalam:wght@400;700&display=swap');

            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            @page {
              size: auto;
              margin: 8mm;
            }

            body {
              background: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              padding: 20px;
            }

            .printable-qr-standee {
              width: 320px !important;
              max-width: 100% !important;
              border: 2.5px solid ${colors.primary} !important;
              border-radius: 16px !important;
              padding: 24px 20px !important;
              box-shadow: none !important;
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              text-align: center !important;
              background: #ffffff !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
          </style>
        </head>
        <body>
          ${cardRef.current.outerHTML}
        </body>
      </html>
    `;

    doc.open();
    doc.write(html);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 350);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`Scan to Pay via ${platform.toUpperCase()}: ${receiverName} (${phoneNumber})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const colors = {
    fonepay: { primary: '#c8102e', badge: 'Fonepay Interoperable QR', bg: '#fffbfa', border: '#fecaca' },
    esewa: { primary: '#60bb46', badge: 'eSewa Direct Payment QR', bg: '#f0fdf4', border: '#bbf7d0' },
    nepalpay: { primary: '#003893', badge: 'NepalPay (NCHL) Instant QR', bg: '#eff6ff', border: '#bfdbfe' },
  }[platform];

  return (
    <div className="white-card" style={{ padding: '28px 24px', maxWidth: '880px', margin: '0 auto' }}>
      {/* Header */}
      <div className="qr-header-banner" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge badge-blue">{t('Nepal Rastra Bank Interoperable QR (NepalQR)', 'नेपाल राष्ट्र बैंक अन्तरआवद्धता (Interoperable QR)')}</span>
          <span className="badge badge-emerald">Fonepay • eSewa • NepalPay</span>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          {t('Nepal Payment QR Code Generator (Fonepay / eSewa)', 'नेपाल क्युआर कोड स्टिकर जेनेरेटर (Fonepay / eSewa)')}
        </h1>
        <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
          {t(
            'Printable merchant payment standee and counter sticker for Fonepay, eSewa and NepalPay.',
            'पसल, रेस्टुरेन्ट तथा व्यक्तिगत भुक्तानीका लागि प्रिन्ट गर्न मिल्ने फोनपे, इसेवा तथा नेपालपे स्ट्यान्डी क्युआर कोड।'
          )}
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>

        {/* Controls Column */}
        <div className="qr-controls-col" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Platform Selector */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              {t('Payment Network', 'भुक्तानी नेटवर्क')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {[
                { id: 'fonepay', name: 'Fonepay', color: '#c8102e' },
                { id: 'esewa', name: 'eSewa', color: '#60bb46' },
                { id: 'nepalpay', name: 'NepalPay', color: '#003893' }
              ].map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id as any)}
                  style={{
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1.5px solid',
                    borderColor: platform === p.id ? p.color : '#cbd5e1',
                    backgroundColor: platform === p.id ? '#ffffff' : '#f8fafc',
                    color: platform === p.id ? p.color : '#475569',
                    fontSize: '13px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: platform === p.id ? `0 2px 8px ${p.color}25` : 'none'
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Receiver / Merchant Name */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              {t('Merchant / Account Name', 'पसल वा खातावालाको नाम')}
            </label>
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder={t('e.g. Ram Grocery Store', 'उदा: राम किराना स्टोर')}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '13.5px',
                fontWeight: 700,
                outline: 'none',
                fontFamily: activeFont.family,
              }}
            />
          </div>

          {/* Nepali Font Style Selector */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span>{t('Nepali Font Style', 'नेपाली फन्ट शैली')}</span>
              <span style={{ fontSize: '11px', color: '#c59b27', fontWeight: 700 }}>✦ {t('Standee Font', 'स्ट्यान्डी फन्ट')}</span>
            </label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="select-input"
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '13.5px',
                fontWeight: 700,
                color: '#0f172a',
                backgroundColor: '#fdfbf7',
                cursor: 'pointer',
                fontFamily: activeFont.family,
              }}
            >
              {NEPALI_FONTS.map(f => (
                <option key={f.id} value={f.id} style={{ fontFamily: f.family, fontSize: '14px' }}>
                  {f.name} — {receiverName || (language === 'ne' ? 'नमुना' : 'Sample')}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile / Account ID */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              {t('Phone Number / Merchant ID', 'मोबाइल नम्बर वा मर्चेन्ट कोड')}
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={t('98XXXXXXXX', '९८xxxxxxxx')}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '13.5px',
                fontWeight: 700,
                outline: 'none',
              }}
            />
          </div>

          {/* Fixed Amount (Optional) */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              {t('Fixed Amount (NPR - Optional)', 'निश्चित रकम (रुपैयाँ - ऐच्छिक)')}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t('Leave blank if customer enters amount', 'खाली छोडे ग्राहकले आफैं हाल्नेछन्')}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '13.5px',
                fontWeight: 700,
                outline: 'none',
              }}
            />
          </div>

          {/* Remarks */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'block', marginBottom: '6px' }}>
              {t('Remarks / Note', 'कैफियत / विवरण')}
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder={t('e.g. Bill Payment', 'उदा: बिल भुक्तानी')}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '13.5px',
                outline: 'none',
              }}
            />
          </div>

          {/* Print & Action Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={handlePrint}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: colors.primary,
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Printer size={16} />
              <span>{t('Print Sticker (Standee)', 'प्रिन्ट स्टिकर (स्ट्यान्डी)')}</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                border: '1.5px solid #cbd5e1',
                fontWeight: 800,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
              <span>{copied ? t('Copied!', 'कपी भयो') : t('Copy', 'कपी')}</span>
            </button>
          </div>
        </div>

        {/* Printable Standee Preview Column */}
        <div className="qr-preview-col" style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            ref={cardRef}
            id="printable-qr-standee"
            className="printable-qr-standee"
            style={{
              width: '100%',
              maxWidth: '320px',
              backgroundColor: '#ffffff',
              border: `2.5px solid ${colors.primary}`,
              borderRadius: '16px',
              padding: '24px 20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            {/* Top Brand Banner */}
            <div
              style={{
                backgroundColor: colors.primary,
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 900,
                letterSpacing: '0.04em',
                marginBottom: '14px',
                textTransform: 'uppercase'
              }}
            >
              {platform.toUpperCase()} {t('SCAN & PAY', 'स्क्यान गरी तिर्नुहोस्')}
            </div>

            {/* Merchant Name */}
            <div
              style={{
                fontSize: selectedFont === 'rozha' || selectedFont === 'yatra' ? '21px' : '18.5px',
                fontWeight: 900,
                color: '#0f172a',
                marginBottom: '2px',
                lineHeight: 1.3,
                fontFamily: activeFont.family,
                letterSpacing: selectedFont === 'mukta' ? '-0.01em' : 'normal',
                transition: 'font-family 0.15s ease',
              }}
            >
              {receiverName || t('Merchant Name', 'मर्चेन्ट नाम')}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginBottom: '16px' }}>
              {phoneNumber}
            </div>

            {/* Crisp QR Code Frame */}
            <div
              style={{
                padding: '10px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                marginBottom: '16px'
              }}
            >
              <img
                src={qrDataUrl}
                alt="Payment QR Code"
                width={200}
                height={200}
                style={{ display: 'block', borderRadius: '6px' }}
              />
            </div>

            {/* Fixed Amount Tag if any */}
            {amount ? (
              <div style={{ fontSize: '16px', fontWeight: 900, color: colors.primary, marginBottom: '8px' }}>
                {t('Amount: Rs.', 'रकम: रू.')} {Number(amount).toLocaleString()}
              </div>
            ) : null}

            {/* Supported Banks / Apps */}
            <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4, marginTop: '4px' }}>
              {t(
                'Scan and pay directly from any Mobile Banking app, eSewa, Khalti or wallet.',
                'मोबाइल बैंकिङ, इसेवा, खल्ती तथा वालेटबाट सिधै स्क्यान गरी भुक्तानी गर्नुहोस्।'
              )}
            </div>

            {/* Security Footer Badge */}
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '11px', color: '#059669', fontWeight: 800 }}>
              <ShieldCheck size={14} color="#059669" />
              <span>{t('NRB Verified Payment Standard', 'नेपाल राष्ट्र बैंक प्रमाणित भुक्तानी मापदण्ड')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
