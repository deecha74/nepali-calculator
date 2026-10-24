'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Percent, 
  Coins, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  Info,
  Scale,
  Receipt,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { toNepaliDigits } from '@/lib/nepaliDate';
import { calculateRightShareAdjustment, RightShareResult } from '@/lib/utils/rightShare';

export function RightShareCalculator() {
  const { language, t } = useLanguage();
  const isNe = language === 'ne';

  // Input state
  const [marketPrice, setMarketPrice] = useState<number>(450); // e.g. NPR 450
  const [bonusPercent, setBonusPercent] = useState<number>(10); // 10%
  const [rightRatioString, setRightRatioString] = useState<string>('0.5'); // 1:0.5 = 50%
  const [sharesHeld, setSharesHeld] = useState<number>(500); // 500 kitta
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  const rightRatio = parseFloat(rightRatioString) || 0;

  const result: RightShareResult = useMemo(() => {
    return calculateRightShareAdjustment({
      marketPrice,
      bonusPercent,
      rightRatio,
      sharesHeld,
      faceValue: 100,
    });
  }, [marketPrice, bonusPercent, rightRatio, sharesHeld]);

  // Formatter helpers
  const formatNumber = (num: number): string => {
    const formatted = num.toLocaleString(isNe ? 'ne-NP' : 'en-IN');
    return isNe ? toNepaliDigits(formatted) : formatted;
  };

  const formatCurrency = (num: number): string => {
    const formatted = num.toLocaleString(isNe ? 'ne-NP' : 'en-IN');
    return isNe ? `रू. ${toNepaliDigits(formatted)}` : `NPR ${formatted}`;
  };

  const handleCopy = () => {
    const textEn = `NEPSE Right & Bonus Share Price Adjustment:
Market Closing Price: NPR ${result.marketPrice}
Bonus Share: ${result.bonusPercent}%
Right Share Ratio: 1:${result.rightRatio}
Shares Held: ${result.sharesHeld} Kitta

Results:
• Theoretical Adjusted Opening Price: NPR ${result.adjustedPrice}
• Price Drop on Book Closure: -${result.priceDropPercentage}%
• Bonus Shares Received: ${result.bonusSharesReceived} Kitta
• 5% Bonus Share Dividend Tax Payable: NPR ${result.bonusTaxPayable.toLocaleString('en-IN')} (NPR 5/share)
• Eligible Right Shares: ${result.eligibleRightShares} Kitta
• Right Application Money Required: NPR ${result.rightApplicationAmount.toLocaleString('en-IN')}
• Total Post-Adjustment Shares: ${result.postTotalShares} Kitta
Calculated via Nepali Calc: https://nepalcalc.com/right-share`;

    const textNe = `नेप्से हकप्रद तथा बोनस सेयर मूल्य समायोजन विवरण:
बुकक्लोज अघिको अन्तिम मूल्य: रू. ${toNepaliDigits(result.marketPrice)}
बोनस सेयर: ${toNepaliDigits(result.bonusPercent)}%
हकप्रद सेयर अनुपात: १:${toNepaliDigits(result.rightRatio)}
तपाईंसँग भएको सेयर: ${toNepaliDigits(result.sharesHeld)} कित्ता

नतिजा:
• समायोजन पछिको सैद्धान्तिक मूल्य: रू. ${toNepaliDigits(result.adjustedPrice)}
• मूल्य समायोजन गिरावट: -${toNepaliDigits(result.priceDropPercentage)}%
• प्राप्त हुने बोनस सेयर: ${toNepaliDigits(result.bonusSharesReceived)} कित्ता
• ५% बोनस सेयर लाभांश कर: रू. ${toNepaliDigits(result.bonusTaxPayable.toLocaleString('ne-NP'))} (रू. ५ प्रति कित्ता)
• भर्न पाइने हकप्रद सेयर: ${toNepaliDigits(result.eligibleRightShares)} कित्ता
• हकप्रद आवेदनका लागि आवश्यक रकम: रू. ${toNepaliDigits(result.rightApplicationAmount.toLocaleString('ne-NP'))}
• कुल सेयर संख्या (समायोजन पछि): ${toNepaliDigits(result.postTotalShares)} कित्ता
नेपाली क्याल्क मार्फत हिसाब गरिएको: https://nepalcalc.com/right-share`;

    navigator.clipboard.writeText(isNe ? textNe : textEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const messageEn = encodeURIComponent(
      `NEPSE Adjustment: NPR ${result.marketPrice} stock with ${result.bonusPercent}% Bonus & 1:${result.rightRatio} Right adjusts to NPR ${result.adjustedPrice}. Check your bonus tax & right application amount on: https://nepalcalc.com/right-share`
    );
    const messageNe = encodeURIComponent(
      `नेप्से मूल्य समायोजन: रू. ${toNepaliDigits(result.marketPrice)} को सेयरमा ${toNepaliDigits(result.bonusPercent)}% बोनस र १:${toNepaliDigits(result.rightRatio)} हकप्रद पछि समायोजन मूल्य रू. ${toNepaliDigits(result.adjustedPrice)} हुनेछ। बोनस कर र हकप्रद आवेदन हिसाब गर्नुहोस्: https://nepalcalc.com/right-share`
    );

    window.open(`https://api.whatsapp.com/send?text=${isNe ? messageNe : messageEn}`, '_blank');
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="white-card" style={{ padding: '28px', maxWidth: '1080px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={12} />
              {t('NEPSE Book Closure Formula', 'नेप्से बुकक्लोज सूत्र')}
            </span>
            <span className="badge badge-neutral">
              {t('5% Bonus Tax & Right Ratio', '५% बोनस कर तथा हकप्रद अनुपात')}
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
            {t('NEPSE Right Share & Bonus Adjustment Calculator', 'नेप्से हकप्रद, बोनस सेयर मूल्य समायोजन तथा कर क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            {t(
              'Calculate post-book-closure theoretical opening stock price, 5% cash dividend tax on bonus shares, and required application capital for right shares on the Nepal Stock Exchange.',
              'नेपाल स्टक एक्सचेन्ज (नेप्से) मा बुकक्लोज पछिको सेयर मूल्य समायोजन, बोनस सेयरको ५% कर र हकप्रद सेयर भर्न चाहिने रकम हिसाब गर्नुहोस्।'
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={handleCopy} 
            className="btn-secondary" 
            style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
            <span>{copied ? t('Copied!', 'प्रतिलिपि भयो!') : t('Copy Details', 'विवरण कपि')}</span>
          </button>
          <button 
            onClick={handleWhatsAppShare} 
            className="btn-primary" 
            style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: '#25D366', borderColor: '#25D366' }}
          >
            <Share2 size={16} />
            <span>{t('Share on WhatsApp', 'ह्वाट्सएप सेयर')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Left Column: Inputs */}
        <div>
          {/* Market Price Before Book Closure */}
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label" style={{ fontWeight: 600 }}>
              {t('Market Closing Price Before Book Closure (अन्तिम कारोबार मूल्य)', 'बुकक्लोज अघिको अन्तिम सेयर मूल्य')}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-muted)' }}>
                {isNe ? 'रू.' : 'NPR'}
              </span>
              <input
                type="number"
                min="100"
                step="1"
                className="number-input"
                value={marketPrice || ''}
                onChange={(e) => setMarketPrice(parseFloat(e.target.value) || 0)}
                style={{ paddingLeft: '55px', fontSize: '18px', fontWeight: 700 }}
              />
            </div>
          </div>

          {/* Bonus Share % */}
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label" style={{ fontWeight: 600 }}>
              {t('Proposed Bonus Share Percentage (%)', 'प्रस्तावित बोनस सेयर प्रतिशत (%)')}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-muted)' }}>
                %
              </span>
              <input
                type="number"
                min="0"
                step="0.5"
                className="number-input"
                value={bonusPercent}
                onChange={(e) => setBonusPercent(parseFloat(e.target.value) || 0)}
                style={{ fontSize: '16px', fontWeight: 700 }}
              />
            </div>
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
              {[0, 5, 10, 15, 20, 25].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBonusPercent(b)}
                  className={`btn-secondary ${bonusPercent === b ? 'active' : ''}`}
                  style={{ 
                    padding: '3px 8px', 
                    fontSize: '11px', 
                    borderRadius: '12px',
                    borderColor: bonusPercent === b ? 'var(--primary)' : 'var(--border-subtle)',
                    background: bonusPercent === b ? 'var(--primary-light, #eff6ff)' : 'transparent',
                    color: bonusPercent === b ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: 600,
                  }}
                >
                  {isNe ? `${toNepaliDigits(b)}%` : `${b}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Right Share Ratio */}
          <div style={{ marginBottom: '18px' }}>
            <label className="input-label" style={{ fontWeight: 600, marginBottom: '6px' }}>
              {t('Proposed Right Share Ratio (हकप्रद सेयर अनुपात)', 'प्रस्तावित हकप्रद सेयर अनुपात')}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginBottom: '8px' }}>
              {[
                { label: 'None (0)', val: '0' },
                { label: '1:0.25 (25%)', val: '0.25' },
                { label: '1:0.5 (50%)', val: '0.5' },
                { label: '1:0.7 (70%)', val: '0.7' },
                { label: '1:1 (100%)', val: '1' },
              ].map((r) => (
                <button
                  key={r.val}
                  type="button"
                  onClick={() => setRightRatioString(r.val)}
                  style={{
                    padding: '8px 2px',
                    borderRadius: '8px',
                    border: `1.5px solid ${rightRatioString === r.val ? 'var(--primary)' : 'var(--border-subtle)'}`,
                    background: rightRatioString === r.val ? 'var(--primary)' : 'var(--bg-card)',
                    color: rightRatioString === r.val ? '#ffffff' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '11px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Shares Held */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" style={{ fontWeight: 600 }}>
              {t('Number of Shares Held in Demat (तपाईंसँग भएको कित्ता)', 'तपाईंसँग भएको सेयर कित्ता (Demat)')}
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 600, color: 'var(--text-muted)', fontSize: '13px' }}>
                {t('Kitta', 'कित्ता')}
              </span>
              <input
                type="number"
                min="10"
                step="10"
                className="number-input"
                value={sharesHeld || ''}
                onChange={(e) => setSharesHeld(parseFloat(e.target.value) || 0)}
                style={{ fontSize: '16px', fontWeight: 700 }}
              />
            </div>
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
              {[100, 200, 500, 1000, 2000].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSharesHeld(s)}
                  className={`btn-secondary ${sharesHeld === s ? 'active' : ''}`}
                  style={{ 
                    padding: '3px 8px', 
                    fontSize: '11px', 
                    borderRadius: '12px',
                    borderColor: sharesHeld === s ? 'var(--primary)' : 'var(--border-subtle)',
                    background: sharesHeld === s ? 'var(--primary-light, #eff6ff)' : 'transparent',
                    color: sharesHeld === s ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: 600,
                  }}
                >
                  {formatNumber(s)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Adjusted Price & Bonus/Right Details */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(16, 185, 129, 0.05) 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '24px',
          }}>
            {/* Header pill */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                {t('Theoretical Adjusted Opening Price', 'समायोजन पछिको सैद्धान्तिक मूल्य')}
              </span>
              <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} />
                {t('NEPSE Opening', 'नेप्से सुरु मूल्य')}
              </span>
            </div>

            {/* Giant Big Price Number */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '38px', fontWeight: 900, color: 'var(--primary)', lineHeight: 1.1 }}>
                {formatCurrency(result.adjustedPrice)}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#dc2626', marginTop: '4px' }}>
                {isNe 
                  ? `मूल्य समायोजन गिरावट: -${toNepaliDigits(result.priceDropPercentage)}% (रू. ${toNepaliDigits(result.marketPrice)} बाट)`
                  : `Price drop on book closure: -${result.priceDropPercentage}% (from NPR ${result.marketPrice})`}
              </div>
            </div>

            {/* Bonus & Right Breakdown Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              {/* Bonus Share Card */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {t('Bonus Shares Received:', 'प्राप्त हुने बोनस सेयर:')}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#059669' }}>
                    +{formatNumber(result.bonusSharesReceived)} {t('Kitta', 'कित्ता')}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <span>{t('5% Cash Dividend Tax Payable (रु ५/कित्ता):', '५% नगद लाभांश कर (रू. ५ प्रति कित्ता):')}</span>
                  <span style={{ fontWeight: 700, color: '#d97706' }}>{formatCurrency(result.bonusTaxPayable)}</span>
                </div>
              </div>

              {/* Right Share Card */}
              {result.rightRatio > 0 && (
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {t('Eligible Right Shares to Apply:', 'भर्न पाइने हकप्रद सेयर:')}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>
                      {formatNumber(result.eligibleRightShares)} {t('Kitta', 'कित्ता')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <span>{t('Required Application Capital (x रु १००):', 'हकप्रद आवेदन खर्च (× रू. १००):')}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(result.rightApplicationAmount)}</span>
                  </div>
                </div>
              )}

              {/* Portfolio Comparison Card */}
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{t('Total Shares After Adjustment:', 'समायोजन पछिको कुल सेयर संख्या:')}</span>
                  <span style={{ fontWeight: 700 }}>{formatNumber(result.postTotalShares)} {t('Kitta', 'कित्ता')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{t('Total Portfolio Valuation:', 'समायोजन पछिको कुल पोर्टफोलियो मूल्य:')}</span>
                  <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{formatCurrency(result.postAdjustmentValue)}</span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <Info size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                {t(
                  'As per Nepal tax laws, 5% dividend tax on bonus shares is calculated on par value (NPR 100 face value = NPR 5/share). If the company proposes sufficient cash dividend for tax, shareholders do not need to deposit cash separately.',
                  'नेपालको कर कानून अनुसार बोनस सेयरको ५% लाभांश कर अंकित मूल्य (रू. १०० को ५% = रू. ५ प्रति कित्ता) का दरले लाग्छ। कम्पनीले कर प्रयोजनका लागि छुट्टै नगद लाभांश प्रस्ताव नगरेमा सेयरधनीले स्वयं कर दाखिला गर्नुपर्ने हुन्छ।'
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
