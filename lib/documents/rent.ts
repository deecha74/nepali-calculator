import type { DocDef, FieldDef } from './types';
import { BLANK, g, nd, num, money, dateNe, fmt } from './helpers';

const f = (id: string, label: string, labelNe: string, extra: Partial<FieldDef> = {}): FieldDef => ({
  id, label, labelNe, type: 'text', ...extra,
});

export const rentAgreement: DocDef = {
  slug: 'rent-agreement',
  sections: [
    {
      id: 'landlord', title: 'Landlord (First party)', titleNe: 'घरधनी (पहिलो पक्ष)',
      fields: [
        f('lName', 'Full name', 'पूरा नाम'),
        f('lFather', "Father's name", 'बाबुको नाम'),
        f('lGrand', "Grandfather's name", 'बाजेको नाम'),
        f('lDistrict', 'District', 'जिल्ला'),
        f('lMuni', 'Municipality / Rural municipality', 'नगरपालिका / गाउँपालिका'),
        f('lWard', 'Ward no.', 'वडा नं.', { type: 'number' }),
        f('lCit', 'Citizenship no.', 'नागरिकता नं.'),
        f('lCitDist', 'Issued district', 'जारी जिल्ला'),
      ],
    },
    {
      id: 'tenant', title: 'Tenant (Second party)', titleNe: 'बहालमा लिने (दोस्रो पक्ष)',
      fields: [
        f('tName', 'Full name / Company', 'पूरा नाम / कम्पनी'),
        f('tRep', 'Representative (if company)', 'प्रतिनिधि (कम्पनी भए)'),
        f('tFather', "Father's name", 'बाबुको नाम'),
        f('tDistrict', 'District', 'जिल्ला'),
        f('tMuni', 'Municipality / Rural municipality', 'नगरपालिका / गाउँपालिका'),
        f('tWard', 'Ward no.', 'वडा नं.', { type: 'number' }),
        f('tCit', 'Citizenship no.', 'नागरिकता नं.'),
        f('tPan', 'PAN no. (optional)', 'प्यान नं. (ऐच्छिक)'),
      ],
    },
    {
      id: 'property', title: 'Property', titleNe: 'बहालमा दिइने सम्पत्ति',
      fields: [
        f('pDistrict', 'District', 'जिल्ला'),
        f('pMuni', 'Municipality', 'नगरपालिका'),
        f('pWard', 'Ward no.', 'वडा नं.', { type: 'number' }),
        f('pTole', 'Tole / Street', 'टोल / बाटो'),
        f('pKitta', 'Kitta no.', 'कित्ता नं.'),
        {
          id: 'pPurpose', label: 'Purpose', labelNe: 'प्रयोजन', type: 'select',
          options: [
            { value: 'आवासीय', label: 'Residential', labelNe: 'आवासीय' },
            { value: 'व्यावसायिक', label: 'Commercial', labelNe: 'व्यावसायिक' },
            { value: 'कार्यालय', label: 'Office', labelNe: 'कार्यालय' },
          ],
        },
        f('pDesc', 'Description (floor, rooms)', 'विवरण (तल्ला, कोठा)', { type: 'textarea', span: 2, placeholder: 'दोस्रो तल्ला, २ वटा कोठा, १ भान्सा, १ बाथरुम' }),
      ],
    },
    {
      id: 'terms', title: 'Rent & Terms', titleNe: 'बहाल रकम र सर्त',
      fields: [
        f('rent', 'Monthly rent (NPR)', 'मासिक बहाल (रु.)', { type: 'number' }),
        f('deposit', 'Security deposit (NPR)', 'धरौटी रकम (रु.)', { type: 'number' }),
        f('start', 'Start date (BS)', 'सुरु मिति (वि.सं.)', { placeholder: '2083/01/01' }),
        f('years', 'Term (years)', 'अवधि (वर्ष)', { type: 'number' }),
        f('increase', 'Yearly increase (%)', 'वार्षिक वृद्धि (%)', { type: 'number' }),
        f('payDay', 'Pay by (day of month)', 'भुक्तानी गर्ने गते', { type: 'number' }),
        f('notice', 'Notice days', 'सूचना दिने दिन', { type: 'number' }),
        {
          id: 'tds', label: 'TDS (10% rent tax)', labelNe: 'TDS (१०% भाडा कर)', type: 'select',
          options: [
            { value: 'net', label: 'Rent is net (tenant pays TDS extra)', labelNe: 'रकम खुद (TDS भाडावालले थप तिर्ने)' },
            { value: 'gross', label: 'Rent is gross (TDS cut from rent)', labelNe: 'रकम कुल (TDS कटाएर दिने)' },
            { value: 'none', label: 'No TDS clause', labelNe: 'TDS खण्ड नराख्ने' },
          ],
        },
        {
          id: 'utility', label: 'Utility bills paid by', labelNe: 'बिजुली/पानी बिल', type: 'select',
          options: [
            { value: 'tenant', label: 'Tenant', labelNe: 'बहालवाला' },
            { value: 'landlord', label: 'Landlord', labelNe: 'घरधनी' },
          ],
        },
        {
          id: 'consent', label: 'Company registered-office consent', labelNe: 'कम्पनी दर्ता ठेगाना सहमति', type: 'select',
          options: [
            { value: 'no', label: 'No', labelNe: 'चाहिँदैन' },
            { value: 'yes', label: 'Yes — allow office registration', labelNe: 'चाहिन्छ — दर्ता ठेगाना प्रयोग' },
          ],
        },
        f('agDate', 'Agreement date (BS)', 'करार मिति (वि.सं.)', { placeholder: '2083/01/01' }),
      ],
    },
    {
      id: 'witnesses', title: 'Witnesses', titleNe: 'साक्षी',
      repeat: { min: 2, max: 4, itemLabel: 'Witness', itemLabelNe: 'साक्षी' },
      fields: [
        f('name', 'Name', 'नाम'),
        f('addr', 'Address', 'ठेगाना'),
      ],
    },
  ],
  initial: () => ({
    pPurpose: 'आवासीय', years: '1', increase: '10', payDay: '7', notice: '35',
    tds: 'net', utility: 'tenant', consent: 'no',
    witnesses: [{ name: '', addr: '' }, { name: '', addr: '' }],
  }),
  render: (v) => {
    const rent = num(v, 'rent');
    const dep = num(v, 'deposit');
    const years = num(v, 'years') || 1;
    const inc = num(v, 'increase');
    const notice = num(v, 'notice') || 35;
    const w = Array.isArray(v.witnesses) ? v.witnesses : [];
    const tds = v.tds;
    const items: string[] = [
      `यस करार बमोजिम बहालमा दिइएको सम्पत्ति ${g(v, 'pDistrict')} जिल्ला, ${g(v, 'pMuni')}, वडा नं. ${nd(g(v, 'pWard'))}, ${g(v, 'pTole')} (कित्ता नं. ${nd(g(v, 'pKitta'))}) मा अवस्थित ${g(v, 'pDesc')} हो। सो सम्पत्ति दोस्रो पक्षले ${g(v, 'pPurpose')} प्रयोजनका लागि मात्र प्रयोग गर्नेछ।`,
      `बहालको अवधि मिति ${dateNe(String(v.start || ''))} देखि ${nd(years)} वर्षको हुनेछ। अवधि समाप्त भएपछि दुवै पक्षको लिखित सहमतिमा नवीकरण गर्न सकिनेछ।`,
      `मासिक बहाल रकम ${money(rent)} हुनेछ।${inc ? ` प्रत्येक वर्ष बहाल रकममा ${nd(inc)} प्रतिशतले वृद्धि गरिनेछ।` : ''} दोस्रो पक्षले प्रत्येक महिनाको ${nd(g(v, 'payDay'))} गते भित्र बहाल रकम बुझाउनु पर्नेछ।`,
      `दोस्रो पक्षले धरौटीवापत ${money(dep)} पहिलो पक्षलाई बुझाएको छ। यो रकम ब्याज रहित हुनेछ र बहाल अवधि समाप्त भई घर खाली गरी बुझाएपछि, बाँकी बहाल वा क्षति रकम कट्टा गरी फिर्ता गरिनेछ।`,
    ];
    if (tds === 'net') items.push(`प्रचलित आयकर ऐन बमोजिम बहाल रकममा लाग्ने १०% कर (TDS) दोस्रो पक्षले आफ्नै खर्चमा कट्टी गरी सरकारी राजस्व कार्यालयमा दाखिला गर्नेछ; माथि उल्लिखित बहाल रकम खुद (कर बाहेक) रकम हो।`);
    if (tds === 'gross') items.push(`प्रचलित आयकर ऐन बमोजिम बहाल रकममा लाग्ने १०% कर (TDS) माथि उल्लिखित कुल बहाल रकमबाट कट्टी गरी दोस्रो पक्षले सरकारी राजस्व कार्यालयमा दाखिला गर्नेछ र कर कट्टीको प्रमाण पहिलो पक्षलाई उपलब्ध गराउनेछ।`);
    items.push(
      `बिजुली, खानेपानी, फोहोरमैला, इन्टरनेट लगायतका सेवा शुल्क ${v.utility === 'landlord' ? 'पहिलो' : 'दोस्रो'} पक्षले नै बेहोर्नेछ।`,
      `दोस्रो पक्षले सम्पत्तिलाई असल नियतले प्रयोग गर्नेछ, पहिलो पक्षको लिखित अनुमति बिना संरचनामा परिवर्तन गर्ने, अरूलाई उप-बहाल दिने वा गैरकानुनी काममा प्रयोग गर्ने छैन।`,
      `सम्पत्तिको ठूला मर्मत सम्भार पहिलो पक्षले र दैनिक प्रयोगका साना मर्मत दोस्रो पक्षले गर्नेछ। दोस्रो पक्षको लापरबाहीबाट भएको क्षतिको भरपाई दोस्रो पक्षले नै गर्नेछ।`,
      `कुनै पक्षले करार अन्त्य गर्न चाहेमा अर्को पक्षलाई कम्तीमा ${nd(notice)} दिन अगाडि लिखित सूचना दिनु पर्नेछ।`,
      `दोस्रो पक्षले बहाल रकम लगातार दुई महिना नबुझाएमा वा करारका सर्त उल्लङ्घन गरेमा पहिलो पक्षले करार रद्द गरी घर खाली गराउन सक्नेछ।`,
    );
    if (v.consent === 'yes') items.push(`पहिलो पक्षले दोस्रो पक्षको कम्पनी/फर्म दर्ताका लागि माथिको सम्पत्तिको ठेगाना कार्यालय (रजिष्टर्ड अफिस) का रूपमा प्रयोग गर्न मञ्जुरी दिएको छ।`);
    items.push(
      `यस करारमा उल्लेख नभएका विषयमा प्रचलित नेपाल कानुन बमोजिम हुनेछ। विवादको सुरुमा आपसी समझदारीमा समाधान खोजिनेछ, नभएमा सम्बन्धित अदालतमा जानेछन्।`,
      `यो करार हामी दुवै पक्षले पढी बुझी, सुनी, मञ्जुर गरी स्वेच्छाले दुई प्रति तयार गरी एक-एक प्रति लियौँ।`,
    );
    return [
      { t: 'title', text: 'घर बहाल करारनामा' },
      { t: 'p', text: `${g(v, 'lDistrict')} जिल्ला, ${g(v, 'lMuni')}, वडा नं. ${nd(g(v, 'lWard'))} बस्ने, बाजे ${g(v, 'lGrand')} का नाति, बाबु ${g(v, 'lFather')} का छोरा/छोरी, ना.प्र.नं. ${nd(g(v, 'lCit'))} (जारी जिल्ला ${g(v, 'lCitDist')}) भएको म ${g(v, 'lName')} (यस करारमा “पहिलो पक्ष” भनिएको) र` },
      { t: 'p', text: `${g(v, 'tDistrict')} जिल्ला, ${g(v, 'tMuni')}, वडा नं. ${nd(g(v, 'tWard'))} बस्ने, बाबु ${g(v, 'tFather')} का छोरा/छोरी, ना.प्र.नं. ${nd(g(v, 'tCit'))} भएको ${g(v, 'tName')}${v.tRep ? ` (प्रतिनिधि: ${g(v, 'tRep')})` : ''}${v.tPan ? `, प्यान नं. ${nd(g(v, 'tPan'))}` : ''} (यस करारमा “दोस्रो पक्ष” भनिएको) बीच देहाय बमोजिमको सर्तमा घर बहाल करार गरी लियौँ-दियौँ:` },
      { t: 'ol', items },
      { t: 'p', text: `इति सम्वत् ${dateNe(String(v.agDate || ''))} मिति।` },
      { t: 'sign', names: ['पहिलो पक्ष (घरधनी)\n' + g(v, 'lName'), 'दोस्रो पक्ष (बहालवाला)\n' + g(v, 'tName')] },
      { t: 'h', text: 'साक्षीहरू' },
      { t: 'sign', names: (w.length ? w : [{}, {}]).map((x, i) => `साक्षी ${nd(i + 1)}\n${(x as Record<string, string>).name || BLANK}\n${(x as Record<string, string>).addr || ''}`) },
    ];
  },
  warnings: (v) => {
    const out: { en: string; ne: string }[] = [];
    const rent = num(v, 'rent');
    if (!rent) out.push({ en: 'Enter the monthly rent to show it in figures and words.', ne: 'मासिक बहाल रकम राख्नुहोस्।' });
    if (rent && num(v, 'deposit') > rent * 12) out.push({ en: `Deposit is above 12 months of rent (${fmt(rent * 12)}) — check.`, ne: 'धरौटी १२ महिनाको बहालभन्दा बढी छ — जाँच गर्नुहोस्।' });
    return out;
  },
};
