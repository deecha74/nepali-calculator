'use client';

import React, { useState, useMemo } from 'react';
import { 
  Plane, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  PhoneCall, 
  DollarSign, 
  CheckCircle2, 
  HelpCircle,
  AlertCircle,
  Building2,
  ExternalLink
} from 'lucide-react';
import { toNepaliDigits } from '@/lib/nepaliDate';

export type DestinationCountry = 'gulf_malaysia' | 'japan_ssw' | 'korea_eps' | 'europe_general';
export type ContractDuration = 'up_to_2_years' | 'above_2_years';

interface CountryConfig {
  id: DestinationCountry;
  nameNep: string;
  nameEng: string;
  hasFreeVisaFreeTicket: boolean;
  legalAgencyFeeMax: number;
  medicalCost: number;
  orientationCost: number;
  ssfCost: number;
  note: string;
}

const COUNTRY_CONFIGS: Record<DestinationCountry, CountryConfig> = {
  gulf_malaysia: {
    id: 'gulf_malaysia',
    nameNep: 'मलेसिया तथा खाडी मुलुक (साउदी, कतार, यूएई, कुवेत, ओमान, बहराइन)',
    nameEng: 'Malaysia & Gulf (Saudi, Qatar, UAE, Kuwait, Oman, Bahrain)',
    hasFreeVisaFreeTicket: true,
    legalAgencyFeeMax: 10000,
    medicalCost: 6500,
    orientationCost: 700,
    ssfCost: 2000,
    note: 'नेपाल सरकारको २०७२ असार २१ को निर्णय अनुसार फ्री भिसा, फ्री टिकट अनिवार्य। रोजगारदाताले टिकट र भिसा व्यहोर्ने र म्यानपावरलाई अधिकतम रु. १०,००० मात्र सेवा शुल्क तिर्नुपर्ने।',
  },
  japan_ssw: {
    id: 'japan_ssw',
    nameNep: 'जापान (SSW / निर्दिष्ट दक्ष कामदार)',
    nameEng: 'Japan (SSW / TITP)',
    hasFreeVisaFreeTicket: false,
    legalAgencyFeeMax: 50000,
    medicalCost: 7500,
    orientationCost: 700,
    ssfCost: 2000,
    note: 'जापान SSW का लागि परीक्षा उत्तीर्ण गरेपछि तोकिएका अनुमतिप्राप्त संस्था मार्फत मात्र प्रक्रिया अघि बढाउनुपर्छ।',
  },
  korea_eps: {
    id: 'korea_eps',
    nameNep: 'दक्षिण कोरिया (EPS - सरकारी प्रणाली)',
    nameEng: 'South Korea (EPS G-to-G)',
    hasFreeVisaFreeTicket: false,
    legalAgencyFeeMax: 0, // Direct G-to-G, zero agency fee
    medicalCost: 6500,
    orientationCost: 700,
    ssfCost: 2000,
    note: 'EPS कोरिया पूर्णतया सरकारी (G-to-G) प्रणाली हो। कुनै पनि निजी म्यानपावर वा दलाललाई १ रुपैयाँ पनि तिर्नु पर्दैन।',
  },
  europe_general: {
    id: 'europe_general',
    nameNep: 'युरोप (क्रोएसिया, पोल्याण्ड, रोमानिया, माल्टा)',
    nameEng: 'Europe (Croatia, Poland, Romania, Malta)',
    hasFreeVisaFreeTicket: false,
    legalAgencyFeeMax: 100000,
    medicalCost: 8500,
    orientationCost: 700,
    ssfCost: 2000,
    note: 'युरोपेली देशहरूका लागि मागपत्र (Demand Letter) राजदूतावासबाट प्रमाणीकरण भएको र श्रम स्वीकृति प्राप्त भएको यकिन गर्नुपर्छ।',
  },
};

export function ForeignEmploymentCalculator() {
  const [selectedCountry, setSelectedCountry] = useState<DestinationCountry>('gulf_malaysia');
  const [contractYears, setContractYears] = useState<ContractDuration>('up_to_2_years');
  const [candidateAge, setCandidateAge] = useState<number>(26);
  const [manpowerDemand, setManpowerDemand] = useState<number>(180000); // What agent is asking

  const countryConfig = COUNTRY_CONFIGS[selectedCountry];

  // Calculations
  const calculation = useMemo(() => {
    // 1. Welfare Fund (कल्याणकारी कोष)
    const welfareFund = contractYears === 'up_to_2_years' ? 1500 : 2500;

    // 2. Term Insurance (म्यादी जीवन बीमा) based on age
    let insuranceCost = 3708;
    if (candidateAge > 35 && candidateAge <= 50) {
      insuranceCost = 4928;
    } else if (candidateAge > 50) {
      insuranceCost = 9284;
    }

    // 3. Social Security Fund (सामाजिक सुरक्षा कोष - SSF)
    const ssf = countryConfig.ssfCost;

    // 4. Orientation (अभिमुखिकरण तालिम)
    const orientation = countryConfig.orientationCost;

    // 5. Medical Examination (स्वास्थ्य परीक्षण)
    const medical = countryConfig.medicalCost;

    // 6. Maximum Legal Agency Service Fee
    const legalServiceFee = countryConfig.legalAgencyFeeMax;

    // Legal Total Cost
    const legalTotal = welfareFund + insuranceCost + ssf + orientation + medical + legalServiceFee;

    // Overcharge Analysis
    const demanded = Math.max(0, manpowerDemand);
    const overcharge = Math.max(0, demanded - legalTotal);
    const isOvercharged = demanded > legalTotal;

    return {
      welfareFund,
      insuranceCost,
      ssf,
      orientation,
      medical,
      legalServiceFee,
      legalTotal,
      demanded,
      overcharge,
      isOvercharged,
    };
  }, [selectedCountry, contractYears, candidateAge, manpowerDemand, countryConfig]);

  return (
    <div className="calculator-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div 
          style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '12px', 
            backgroundColor: '#dbeafe', 
            color: '#1d4ed8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Plane size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            वैदेशिक रोजगार तथा म्यानपावर लागत क्याल्कुलेटर
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            DoFE Free Visa Free Ticket Regulations & Illegal Overcharge Detector
          </p>
        </div>
      </div>

      {/* Selectors Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Destination Country */}
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
            गन्तव्य मुलुक (Destination Country):
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value as DestinationCountry)}
            className="input-field"
            style={{ width: '100%', padding: '10px' }}
          >
            {(Object.keys(COUNTRY_CONFIGS) as DestinationCountry[]).map((c) => (
              <option key={c} value={c}>
                {COUNTRY_CONFIGS[c].nameNep}
              </option>
            ))}
          </select>
          {countryConfig.hasFreeVisaFreeTicket && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>
              <CheckCircle2 size={13} />
              फ्री भिसा, फ्री टिकट लागू भएको देश
            </span>
          )}
        </div>

        {/* Contract Duration */}
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
            सम्झौता अवधि (Contract Period):
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setContractYears('up_to_2_years')}
              style={{
                flex: 1,
                padding: '10px',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                background: contractYears === 'up_to_2_years' ? 'var(--primary)' : 'var(--bg-subtle)',
                color: contractYears === 'up_to_2_years' ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              २ वर्षसम्म (रु. १,५०० कोष)
            </button>
            <button
              type="button"
              onClick={() => setContractYears('above_2_years')}
              style={{
                flex: 1,
                padding: '10px',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                background: contractYears === 'above_2_years' ? 'var(--primary)' : 'var(--bg-subtle)',
                color: contractYears === 'above_2_years' ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              २ वर्षभन्दा बढी (रु. २,५०० कोष)
            </button>
          </div>
        </div>

        {/* Age of candidate */}
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
            कामदारको उमेर (Age - for Insurance):
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[24, 30, 40, 52].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setCandidateAge(a)}
                style={{
                  flex: 1,
                  padding: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                  background: candidateAge === a ? 'var(--primary)' : 'var(--bg-subtle)',
                  color: candidateAge === a ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
              >
                {a} वर्ष
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* The Extortion / Demand Comparison Input */}
      <div style={{ background: 'var(--bg-subtle)', padding: '18px', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <DollarSign size={16} color="#dc2626" />
            म्यानपावर वा एजेन्टले माग गरेको कुल रकम (Demanded Amount):
          </label>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            रु. {manpowerDemand.toLocaleString('en-IN')} ({toNepaliDigits(manpowerDemand.toLocaleString('en-IN'))})
          </span>
        </div>

        <input
          type="number"
          step="5000"
          min="0"
          max="1000000"
          value={manpowerDemand}
          onChange={(e) => setManpowerDemand(parseInt(e.target.value) || 0)}
          className="input-field"
          style={{ width: '100%', padding: '12px', fontSize: '16px', fontWeight: 700 }}
          placeholder="उदाहरण: 150000"
        />

        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          {[10000, 50000, 150000, 200000, 300000].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setManpowerDemand(amt)}
              style={{
                padding: '4px 8px',
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)',
                background: manpowerDemand === amt ? 'var(--primary)' : 'var(--bg-primary)',
                color: manpowerDemand === amt ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              रु. {(amt / 1000)}k
            </button>
          ))}
        </div>
      </div>

      {/* COMPARISON / REALITY CHECK DISPLAY */}
      <div 
        style={{ 
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid',
          borderColor: calculation.isOvercharged ? '#fca5a5' : '#86efac',
          background: calculation.isOvercharged 
            ? 'linear-gradient(135deg, rgba(254, 242, 242, 0.9), rgba(254, 226, 226, 0.4))'
            : 'linear-gradient(135deg, rgba(240, 253, 244, 0.9), rgba(220, 252, 231, 0.4))',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '4px 12px', 
              borderRadius: '999px', 
              fontSize: '13px', 
              fontWeight: 700,
              backgroundColor: calculation.isOvercharged ? '#dc2626' : '#16a34a',
              color: '#fff'
            }}>
              {calculation.isOvercharged ? (
                <>
                  <AlertTriangle size={16} />
                  गैरकानुनी असुली / ठगीको जोखिम (Illegal Overcharge Alert)
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  सरकारी मापदण्ड भित्र (Within Legal Limit)
                </>
              )}
            </div>

            <div style={{ marginTop: '14px' }}>
              <div style={{ fontSize: '12px', color: '#4b5563', fontWeight: 600 }}>
                कानुनी सरकारी अधिकतम लागत (Official Legal Total):
              </div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#15803d', marginTop: '2px' }}>
                NPR {calculation.legalTotal.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {calculation.isOvercharged && (
            <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #fca5a5', maxWidth: '340px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase' }}>
                अतिरिक्त गैरकानुनी रकम (Illegal Overcharge)
              </span>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#b91c1c', marginTop: '2px' }}>
                + NPR {calculation.overcharge.toLocaleString('en-IN')}
              </div>
              <p style={{ fontSize: '11px', color: '#6b7280', margin: '4px 0 0' }}>
                म्यानपावरले सरकारी नियमभन्दा <strong>रु. {calculation.overcharge.toLocaleString('en-IN')}</strong> बढी माग गरिरहेको छ।
              </p>
            </div>
          )}
        </div>

        {calculation.isOvercharged && (
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.08)', fontSize: '13px', color: '#7f1d1d', lineHeight: '1.5' }}>
            ⚠️ <strong>महत्वपूर्ण सचेतना:</strong> मलेसिया तथा खाडी मुलुकमा जाने कामदारसँग टिकट र भिसाको नाममा वा १०,००० रुपैयाँभन्दा बढी सेवा शुल्क लिनु वैदेशिक रोजगार ऐन २०६४ विपरित दण्डनीय अपराध हो। यस्तो माग गरेमा बैंक भौचर/रसिद बिना नगद कहिल्यै नबुझाउनुहोस् र तत्काल वैदेशिक रोजगार विभागको कल सेन्टर (११४१) मा उजुरी गर्नुहोस्।
          </div>
        )}
      </div>

      {/* Official Government Breakdown Table */}
      <div style={{ background: 'var(--bg-subtle)', borderRadius: '14px', padding: '20px', border: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} color="var(--primary)" />
          सरकारी नियम अनुसार लाग्ने खर्चको यकिन विवरण (Official Fee Breakdown):
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-primary)' }}>
                <th style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-secondary)' }}>खर्चको शीर्षक (Fee Item)</th>
                <th style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-secondary)' }}>भुक्तानी पाउने निकाय (Recipient)</th>
                <th style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>रकम (NPR)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px 12px' }}>१. वैदेशिक रोजगार कल्याणकारी कोष</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>वैदेशिक रोजगार बोर्ड सचिवालय</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600 }}>रु. {calculation.welfareFund.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px 12px' }}>२. सामाजिक सुरक्षा कोष (SSF - प्रारम्भिक योगदान)</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>सामाजिक सुरक्षा कोष नेपाल</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600 }}>रु. {calculation.ssf.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px 12px' }}>३. म्यादी जीवन बीमा (उमेर {candidateAge} वर्ष)</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>बीमा कम्पनीहरू (नेपाल बीमा प्राधिकरण)</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600 }}>रु. {calculation.insuranceCost.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px 12px' }}>४. बायोमेट्रिक स्वास्थ्य परीक्षण (Medical)</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>सूचीकृत अस्पताल / GAMCA क्लिनिक</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600 }}>रु. {calculation.medical.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px 12px' }}>५. पूर्व प्रस्थान अभिमुखिकरण तालिम (Orientation)</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>इजाजतप्राप्त तालिम केन्द्र</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600 }}>रु. {calculation.orientation.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px 12px' }}>६. म्यानपावर कम्पनी सेवा शुल्क (अधिकतम सीमा)</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>इजाजतप्राप्त मेनपावर एजेन्सी</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, color: 'var(--primary)' }}>रु. {calculation.legalServiceFee.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px 12px' }}>७. हवाइ टिकट र भिसा दस्तुर (Air Ticket & Visa)</td>
                <td style={{ padding: '8px 12px', color: '#16a34a', fontWeight: 600 }}>विदेशी रोजगारदाता कम्पनीले व्यहोर्ने</td>
                <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, color: '#16a34a' }}>निशुल्क (रु. ०)</td>
              </tr>
              <tr style={{ background: 'var(--bg-primary)' }}>
                <td colSpan={2} style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--text-primary)' }}>कुल कानुनी लागत (Total Legal Ceiling):</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 800, fontSize: '15px', color: '#15803d' }}>
                  रु. {calculation.legalTotal.toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Emergency Helpline Box */}
      <div style={{ background: 'rgba(2, 132, 199, 0.06)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <PhoneCall size={16} />
          गुनासो तथा उजुरी गर्ने आधिकारिक सरकारी निकायहरू (Helplines):
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <div>
            <strong>वैदेशिक रोजगार विभाग (DoFE):</strong>
            <div>टोल फ्री: ११४१ / १६६००१५०००५</div>
          </div>
          <div>
            <strong>श्रम कल सेन्टर (श्रमाधान):</strong>
            <div>टोल फ्री: ११४१</div>
          </div>
          <div>
            <strong>हेलो सरकार:</strong>
            <div>नम्बर: ११११ (२४ सै घण्टा)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
