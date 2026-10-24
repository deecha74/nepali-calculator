'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Send, 
  Building2, 
  Smartphone, 
  Banknote, 
  Copy, 
  Check, 
  Share2, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Info,
  Sparkles,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { REMITTANCE_CORRIDORS, REMITTANCE_CHANNELS, RemittanceCorridor, RemittanceChannel } from '@/lib/rates/remittanceRates';
import { toNepaliDigits } from '@/lib/nepaliDate';

export function RemittanceCalculator() {
  const { language, t } = useLanguage();
  const isNe = language === 'ne';

  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>('AED');
  const [foreignAmount, setForeignAmount] = useState<number>(1000);
  const [selectedChannelId, setSelectedChannelId] = useState<'bank' | 'wallet' | 'cash'>('bank');
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [ratesMap, setRatesMap] = useState<Record<string, number>>({});
  const [isLive, setIsLive] = useState<boolean>(false);

  // Fetch live exchange rates from NRB API
  useEffect(() => {
    async function loadLiveRates() {
      try {
        const res = await fetch('/api/live-rates');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.forex?.currencies)) {
            const map: Record<string, number> = {};
            data.forex.currencies.forEach((c: any) => {
              if (c.code && typeof c.buyNpr === 'number') {
                map[c.code] = c.buyNpr;
              }
            });
            setRatesMap(map);
            setIsLive(true);
          }
        }
      } catch (e) {
        // Fallback to static corridor rates
      }
    }
    loadLiveRates();
  }, []);

  const corridor: RemittanceCorridor = useMemo(() => {
    return REMITTANCE_CORRIDORS.find((c) => c.code === selectedCurrencyCode) || REMITTANCE_CORRIDORS[0];
  }, [selectedCurrencyCode]);

  const channel: RemittanceChannel = useMemo(() => {
    return REMITTANCE_CHANNELS.find((ch) => ch.id === selectedChannelId) || REMITTANCE_CHANNELS[0];
  }, [selectedChannelId]);

  // Determine current unit rate (NPR per 1 foreign currency unit)
  const effectiveBaseRate = useMemo(() => {
    const liveBuy = ratesMap[corridor.code];
    const buyNpr = liveBuy !== undefined ? liveBuy : corridor.baseNprBuy;
    return buyNpr / corridor.unit;
  }, [ratesMap, corridor]);

  // Remittance computation
  const calculation = useMemo(() => {
    const feeInForeign = channel.averageFeeForeign;
    const netForeign = Math.max(0, foreignAmount - feeInForeign);
    const bonusRate = channel.bonusRateNpr;
    const effectiveRateWithBonus = effectiveBaseRate + bonusRate;
    const totalNprReceived = Math.round(netForeign * effectiveRateWithBonus);
    const standardNprNoFee = Math.round(foreignAmount * effectiveBaseRate);
    const savingsOrDiff = totalNprReceived - standardNprNoFee;

    return {
      feeInForeign,
      netForeign,
      effectiveRateWithBonus,
      totalNprReceived,
      standardNprNoFee,
      savingsOrDiff,
    };
  }, [foreignAmount, channel, effectiveBaseRate]);

  // Formatter helpers based on language
  const formatNumber = (num: number): string => {
    const formatted = num.toLocaleString(isNe ? 'ne-NP' : 'en-IN');
    return isNe ? toNepaliDigits(formatted) : formatted;
  };

  const formatRate = (rate: number): string => {
    const fixed = rate.toFixed(2);
    return isNe ? toNepaliDigits(fixed) : fixed;
  };

  const handleCopy = () => {
    const textEn = `Nepali Remittance In-Hand Quote:
Sent Amount: ${foreignAmount} ${corridor.code} (${corridor.nameEn})
Channel: ${channel.nameEn}
Effective Exchange Rate: 1 ${corridor.code} = NPR ${calculation.effectiveRateWithBonus.toFixed(2)}
Transfer Fee: ${calculation.feeInForeign} ${corridor.code}
Net In-Hand Received in Nepal: NPR ${calculation.totalNprReceived.toLocaleString('en-IN')}
Calculated via Nepali Calc: https://nepalcalc.com/remittance-calculator`;

    const textNe = `नेपाली रेमिट्यान्स हिसाब:
पठाएको रकम: ${toNepaliDigits(foreignAmount)} ${corridor.nameNe} (${corridor.code})
माध्यम: ${channel.nameNe}
लागु भएको सटही दर: १ ${corridor.code} = रू. ${toNepaliDigits(calculation.effectiveRateWithBonus.toFixed(2))}
सेवा शुल्क (शुल्क): ${toNepaliDigits(calculation.feeInForeign)} ${corridor.code}
नेपालमा प्राप्त हुने खुद रकम: रू. ${toNepaliDigits(calculation.totalNprReceived.toLocaleString('ne-NP'))}
नेपाली क्याल्क मार्फत हिसाब गरिएको: https://nepalcalc.com/remittance-calculator`;

    navigator.clipboard.writeText(isNe ? textNe : textEn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const messageEn = encodeURIComponent(
      `Sending ${foreignAmount} ${corridor.code} to Nepal delivers NPR ${calculation.totalNprReceived.toLocaleString('en-IN')} via ${channel.nameEn} (Rate: NPR ${calculation.effectiveRateWithBonus.toFixed(2)}). Check live rate: https://nepalcalc.com/remittance-calculator`
    );
    const messageNe = encodeURIComponent(
      `नेपालमा ${toNepaliDigits(foreignAmount)} ${corridor.nameNe} पठाउँदा ${channel.nameNe} मार्फत खुद रू. ${toNepaliDigits(calculation.totalNprReceived.toLocaleString('ne-NP'))} प्राप्त हुन्छ। प्रत्यक्ष दर हेर्नुहोस्: https://nepalcalc.com/remittance-calculator`
    );

    const shareUrl = `https://api.whatsapp.com/send?text=${isNe ? messageNe : messageEn}`;
    window.open(shareUrl, '_blank');
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
              {isLive ? t('Live NRB Daily Rates', 'नेपाल राष्ट्र बैंक प्रत्यक्ष दर') : t('Official Exchange Benchmark', 'आधिकारिक सटही दर')}
            </span>
            <span className="badge badge-blue">
              {t('Net In-Hand NPR', 'नेपालमा प्राप्त हुने खुद रकम')}
            </span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
            {t('Foreign Remittance In-Hand Net Calculator', 'वैदेशिक रेमिट्यान्स हिसाब क्याल्कुलेटर')}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            {t(
              'Calculate the exact Nepalese Rupees (NPR) received by your family after exchange spreads and fees from UAE, Qatar, Saudi Arabia, USA, Australia, and worldwide.',
              'कतार, युएई (दुबई), साउदी, मलेसिया, अमेरिका तथा अस्ट्रेलियाबाट नेपालमा पैसा पठाउँदा बैंक, वालेट तथा काउन्टर मार्फत कति रकम प्राप्त हुन्छ हिसाब गर्नुहोस्।'
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={handleCopy} 
            className="btn-secondary" 
            style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
            title={t('Copy calculation', 'हिसाब प्रतिलिपि गर्नुहोस्')}
          >
            {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
            <span>{copied ? t('Copied!', 'प्रतिलिपि भयो!') : t('Copy', 'कपि')}</span>
          </button>
          <button 
            onClick={handleWhatsAppShare} 
            className="btn-primary" 
            style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: '#25D366', borderColor: '#25D366' }}
            title={t('Share on WhatsApp', 'ह्वाट्सएपमा पठाउनुहोस्')}
          >
            <Share2 size={16} />
            <span>{t('Share on WhatsApp', 'ह्वाट्सएप सेयर')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Left Column: Inputs & Channel Selection */}
        <div>
          {/* Sending Country / Currency Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label className="input-label" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Send size={15} color="var(--primary)" />
              {t('Sending Country / Currency', 'पैसा पठाउने देश / मुद्रा')}
            </label>
            <select
              className="select-input"
              value={selectedCurrencyCode}
              onChange={(e) => setSelectedCurrencyCode(e.target.value)}
              style={{ fontSize: '15px', fontWeight: 600 }}
            >
              {REMITTANCE_CORRIDORS.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} — {isNe ? c.nameNe : c.nameEn} ({isNe ? c.countryNe : c.countryEn})
                </option>
              ))}
            </select>
          </div>

          {/* Amount Sent Input */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="input-label" style={{ fontWeight: 600, margin: 0 }}>
                {t(`Amount Sent (${corridor.code})`, `पठाउने रकम (${corridor.code})`)}
              </label>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {isNe 
                  ? `१ ${corridor.code} = रू. ${formatRate(effectiveBaseRate)}`
                  : `1 ${corridor.code} = NPR ${effectiveBaseRate.toFixed(2)}`}
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-muted)', fontSize: '15px' }}>
                {corridor.flag} {corridor.code}
              </span>
              <input
                type="number"
                min="1"
                step="any"
                className="number-input"
                value={foreignAmount || ''}
                onChange={(e) => setForeignAmount(parseFloat(e.target.value) || 0)}
                style={{ paddingLeft: '85px', fontSize: '18px', fontWeight: 700 }}
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {corridor.presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setForeignAmount(amt)}
                className={`btn-secondary ${foreignAmount === amt ? 'active' : ''}`}
                style={{ 
                  padding: '6px 12px', 
                  fontSize: '12px', 
                  borderRadius: '20px',
                  borderColor: foreignAmount === amt ? 'var(--primary)' : 'var(--border-subtle)',
                  background: foreignAmount === amt ? 'var(--primary-light, #eff6ff)' : 'transparent',
                  color: foreignAmount === amt ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: 600,
                }}
              >
                {formatNumber(amt)} {corridor.code}
              </button>
            ))}
          </div>

          {/* Delivery Channel Selector */}
          <div>
            <label className="input-label" style={{ fontWeight: 600, marginBottom: '10px' }}>
              {t('Payout Delivery Channel in Nepal', 'नेपालमा भुक्तानी पाउने माध्यम')}
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {REMITTANCE_CHANNELS.map((ch) => {
                const isSelected = selectedChannelId === ch.id;
                const IconComponent = ch.id === 'bank' ? Building2 : ch.id === 'wallet' ? Smartphone : Banknote;

                return (
                  <div
                    key={ch.id}
                    onClick={() => setSelectedChannelId(ch.id)}
                    style={{
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-subtle)'}`,
                      borderRadius: '12px',
                      padding: '14px 16px',
                      cursor: 'pointer',
                      background: isSelected ? 'var(--bg-elevated, #f8fafc)' : 'var(--bg-card)',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.08)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                          width: '38px', 
                          height: '38px', 
                          borderRadius: '8px', 
                          background: isSelected ? 'var(--primary)' : 'var(--bg-muted, #f1f5f9)', 
                          color: isSelected ? '#fff' : 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>
                            {isNe ? ch.nameNe : ch.nameEn}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {isNe ? ch.speedNe : ch.speedEn} • {ch.operators.slice(0, 2).join(', ')}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <span className={`badge ${ch.averageFeeForeign === 0 ? 'badge-emerald' : 'badge-neutral'}`} style={{ fontSize: '11px' }}>
                          {ch.averageFeeForeign === 0 
                            ? t('Zero Fee', 'निशुल्क') 
                            : `${formatNumber(ch.averageFeeForeign)} ${corridor.code} ${t('Fee', 'शुल्क')}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: In-Hand Net Breakdown Card */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.04) 0%, rgba(16, 185, 129, 0.05) 100%)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '24px',
            position: 'sticky',
            top: '20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                {t('Net In-Hand Receivable in Nepal', 'नेपालमा प्राप्त हुने खुद रकम')}
              </span>
              <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} />
                {t('Verified Spread', 'प्रमाणित दर')}
              </span>
            </div>

            {/* Giant Big Number */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                {t('Total NPR Credited to Recipient', 'प्राप्तकर्ताले पाउने कुल रकम:')}
              </div>
              <div style={{ fontSize: '38px', fontWeight: 900, color: 'var(--primary)', lineHeight: 1.1 }}>
                {isNe ? `रू. ${formatNumber(calculation.totalNprReceived)}` : `NPR ${formatNumber(calculation.totalNprReceived)}`}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                {isNe 
                  ? `(पठाएको ${toNepaliDigits(foreignAmount)} ${corridor.code} मध्ये सेवा शुल्क कटाएर)`
                  : `(From ${foreignAmount} ${corridor.code} sent minus applicable fees)`}
              </div>
            </div>

            {/* Detailed Line Breakdown */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {t('Gross Foreign Amount', 'पठाएको कुल रकम')}
                </span>
                <span style={{ fontWeight: 600 }}>
                  {formatNumber(foreignAmount)} {corridor.code}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {t('Transfer Service Fee', 'रेमिट्यान्स सेवा शुल्क')}
                </span>
                <span style={{ fontWeight: 600, color: calculation.feeInForeign === 0 ? '#059669' : 'var(--text-primary)' }}>
                  {calculation.feeInForeign === 0 
                    ? t('Free / Zero Fee', 'निशुल्क (रू. ०)') 
                    : `${formatNumber(calculation.feeInForeign)} ${corridor.code}`}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {t('Net Foreign Exchanged', 'सटही हुने खुद रकम')}
                </span>
                <span style={{ fontWeight: 600 }}>
                  {formatNumber(calculation.netForeign)} {corridor.code}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {t('Applied Exchange Rate', 'लागु भएको सटही दर')}
                </span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  {isNe 
                    ? `१ ${corridor.code} = रू. ${formatRate(calculation.effectiveRateWithBonus)}`
                    : `1 ${corridor.code} = NPR ${calculation.effectiveRateWithBonus.toFixed(2)}`}
                </span>
              </div>

              {channel.bonusRateNpr > 0 && (
                <div style={{ 
                  background: 'rgba(16, 185, 129, 0.1)', 
                  borderRadius: '8px', 
                  padding: '10px 12px', 
                  fontSize: '12px', 
                  color: '#065f46',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Zap size={14} color="#059669" />
                  <span>
                    {isNe 
                      ? `बैंक निक्षेप प्रोत्साहन: प्रति ${corridor.code} रू. ${toNepaliDigits(channel.bonusRateNpr.toFixed(2))} थप दर समावेश गरिएको छ।`
                      : `Bank deposit incentive: Extra NPR ${channel.bonusRateNpr.toFixed(2)} per ${corridor.code} included.`}
                  </span>
                </div>
              )}
            </div>

            {/* NRB Directive Notice */}
            <div style={{ 
              marginTop: '18px', 
              paddingTop: '14px', 
              borderTop: '1px solid var(--border-subtle)', 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '8px', 
              fontSize: '11px', 
              color: 'var(--text-muted)' 
            }}>
              <ShieldCheck size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                {t(
                  'As per Nepal Rastra Bank directives, remittances deposited into formal commercial bank savings and fixed deposit accounts enjoy +1% higher annual interest rates compared to standard local deposits.',
                  'नेपाल राष्ट्र बैंकको निर्देशन अनुसार औपचारिक बैंकिङ प्रणालीबाट भित्रिने रेमिट्यान्सलाई मुद्दती तथा बचत खातामा १ प्रतिशत थप ब्याजदर दिने व्यवस्था रहेको छ।'
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
