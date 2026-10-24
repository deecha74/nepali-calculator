import type { DocDef, FieldDef, Block } from './types';
import { g, r, rows, nd, num, money, dateNe, fmt } from './helpers';

const f = (id: string, label: string, labelNe: string, extra: Partial<FieldDef> = {}): FieldDef => ({
  id, label, labelNe, type: 'text', ...extra,
});

export const partnershipDeed: DocDef = {
  slug: 'partnership-deed',
  sections: [
    {
      id: 'firm', title: 'Firm details', titleNe: 'फर्मको विवरण',
      fields: [
        f('firmName', 'Firm name', 'फर्मको नाम'),
        f('firmAddr', 'Registered address', 'फर्मको ठेगाना'),
        f('objective', 'Business objective', 'व्यवसायको उद्देश्य', { type: 'textarea', span: 2, placeholder: 'व्यापार, आयात-निर्यात, सेवा आदि' }),
        f('start', 'Start date (BS)', 'सुरु मिति (वि.सं.)', { placeholder: '2083/01/01' }),
        f('duration', 'Duration', 'अवधि', { placeholder: 'अनिश्चित / १० वर्ष' }),
      ],
    },
    {
      id: 'partners', title: 'Partners', titleNe: 'साझेदारहरू',
      repeat: { min: 2, max: 10, itemLabel: 'Partner', itemLabelNe: 'साझेदार' },
      fields: [
        f('name', 'Full name', 'पूरा नाम'),
        f('father', "Father's name", 'बाबुको नाम'),
        f('addr', 'Address', 'ठेगाना'),
        f('cit', 'Citizenship no.', 'नागरिकता नं.'),
        f('capital', 'Capital (NPR)', 'पूँजी (रु.)', { type: 'number' }),
        f('share', 'Profit share (%)', 'नाफा हिस्सा (%)', { type: 'number' }),
      ],
    },
    {
      id: 'ops', title: 'Management & rules', titleNe: 'सञ्चालन र नियम',
      fields: [
        f('manager', 'Managing partner', 'व्यवस्थापक साझेदार'),
        {
          id: 'bank', label: 'Bank operation', labelNe: 'बैंक सञ्चालन', type: 'select',
          options: [
            { value: 'any', label: 'Any one partner', labelNe: 'कुनै एक साझेदार' },
            { value: 'two', label: 'Any two jointly', labelNe: 'कुनै दुई साझेदार संयुक्त' },
            { value: 'all', label: 'All partners jointly', labelNe: 'सबै साझेदार संयुक्त' },
          ],
        },
        f('interest', 'Interest on capital (% p.a.)', 'पूँजीमा ब्याज (% वार्षिक)', { type: 'number' }),
        f('notice', 'Retirement notice (days)', 'अवकाश सूचना (दिन)', { type: 'number' }),
        f('fy', 'Financial year ends', 'आर्थिक वर्ष अन्त्य', { placeholder: 'असार मसान्त' }),
        f('agDate', 'Deed date (BS)', 'सम्झौता मिति (वि.सं.)', { placeholder: '2083/01/01' }),
      ],
    },
    {
      id: 'witnesses', title: 'Witnesses', titleNe: 'साक्षी',
      repeat: { min: 2, max: 4, itemLabel: 'Witness', itemLabelNe: 'साक्षी' },
      fields: [f('name', 'Name', 'नाम'), f('addr', 'Address', 'ठेगाना')],
    },
  ],
  initial: () => ({
    bank: 'two', interest: '0', notice: '60', fy: 'असार मसान्त', duration: 'अनिश्चित',
    partners: [
      { name: '', father: '', addr: '', cit: '', capital: '', share: '50' },
      { name: '', father: '', addr: '', cit: '', capital: '', share: '50' },
    ],
    witnesses: [{ name: '', addr: '' }, { name: '', addr: '' }],
  }),
  render: (v) => {
    const ps = rows(v, 'partners');
    const ws = rows(v, 'witnesses');
    const totalCap = ps.reduce((s, p) => s + (parseFloat(p.capital) || 0), 0);
    const bank = v.bank === 'all' ? 'सबै साझेदारको संयुक्त हस्ताक्षरबाट' : v.bank === 'any' ? 'कुनै एक साझेदारको हस्ताक्षरबाट' : 'कुनै दुई साझेदारको संयुक्त हस्ताक्षरबाट';
    const interest = num(v, 'interest');
    const notice = num(v, 'notice') || 60;
    const clauses = [
      `फर्मको नाम “${g(v, 'firmName')}” र कार्यालय ${g(v, 'firmAddr')} मा रहनेछ। आवश्यकता अनुसार साझेदारहरूको सहमतिमा कार्यालय सारिन सक्नेछ।`,
      `फर्मको उद्देश्य ${g(v, 'objective')} रहेको छ। साझेदारहरूको सहमतिमा अन्य कानुनसम्मत व्यवसाय पनि गर्न सकिनेछ।`,
      `फर्म मिति ${dateNe(String(v.start || ''))} देखि ${g(v, 'duration')} अवधिका लागि स्थापना भएको हो।`,
      `साझेदारहरूले फर्ममा लगानी गरेको कुल पूँजी ${money(totalCap)} हुनेछ। प्रत्येक साझेदारको पूँजी माथिको तालिकामा उल्लेख छ। थप पूँजी सबै साझेदारको सहमतिमा मात्र थप्न सकिनेछ।${interest ? ` पूँजीमा वार्षिक ${nd(interest)} प्रतिशत ब्याज दिइनेछ।` : ''}`,
      `फर्मको नाफा-नोक्सान साझेदारहरू बीच तालिकामा उल्लेखित प्रतिशत बमोजिम बाँडफाँड गरिनेछ।`,
      `फर्मको दैनिक व्यवस्थापन ${g(v, 'manager')} ले गर्नेछ। नीतिगत निर्णय, सम्पत्ति खरिद-बिक्री तथा ऋण लिने जस्ता महत्वपूर्ण निर्णय सबै साझेदारको सहमतिमा हुनेछ।`,
      `फर्मको नाममा बैंक खाता खोलिनेछ र सो खाता ${bank} सञ्चालन गरिनेछ।`,
      `फर्मको आर्थिक वर्ष ${g(v, 'fy')} सम्म हुनेछ। प्रत्येक वर्ष हिसाब किताब तयार गरी लेखापरीक्षण गराई साझेदारहरूलाई जानकारी गराइनेछ।`,
      `नयाँ साझेदार भर्ना गर्न सबै साझेदारको लिखित सहमति आवश्यक पर्नेछ।`,
      `कुनै साझेदारले फर्मबाट अवकाश लिन चाहेमा कम्तीमा ${nd(notice)} दिन अगाडि अन्य साझेदारलाई लिखित सूचना दिनु पर्नेछ। अवकाश लिने साझेदारको हिसाब मिलान गरी बाँकी रकम तोकिएको समयमा भुक्तानी गरिनेछ।`,
      `कुनै साझेदारको मृत्यु वा टाट पल्टिएमा फर्म स्वतः विघटन हुने छैन; बाँकी साझेदारहरूले फर्म सञ्चालन गरी सम्बन्धित साझेदार वा निजको हकवालालाई हिसाब मिलान गरी हिस्सा बुझाउनेछन्।`,
      `कुनै साझेदारले अन्य साझेदारको सहमति बिना फर्मको व्यवसायसँग प्रतिस्पर्धा हुने व्यवसाय गर्न पाउने छैन।`,
      `फर्म विघटन गर्नुपरेमा सबै ऋण दायित्व चुक्ता गरेपछि बाँकी रहेको सम्पत्ति साझेदारहरू बीच नाफा-नोक्सानको अनुपातमा बाँडफाँड गरिनेछ।`,
      `यस सम्झौताको कुनै व्यहोरा विवाद भएमा आपसी छलफलबाट समाधान गरिनेछ, नभएमा मध्यस्थता वा सम्बन्धित अदालतमा जाने छन्।`,
      `यस सम्झौतामा परिवर्तन वा संशोधन सबै साझेदारको लिखित सहमतिबाट मात्र हुनेछ।`,
      `यस सम्झौतामा उल्लेख नभएका विषयमा साझेदारी ऐन, २०२० र प्रचलित नेपाल कानुन बमोजिम हुनेछ।`,
    ];
    const blocks: Block[] = [
      { t: 'title', text: 'साझेदारी सम्झौतापत्र' },
      { t: 'p', text: `साझेदारी ऐन, २०२० बमोजिम “${g(v, 'firmName')}” नामक साझेदारी फर्म सञ्चालन गर्न निम्न साझेदारहरू बीच मिति ${dateNe(String(v.agDate || ''))} मा देहाय बमोजिमको सम्झौता गरियो:` },
      {
        t: 'table',
        head: ['सि.नं.', 'साझेदारको नाम', 'बाबुको नाम', 'ठेगाना', 'ना.प्र.नं.', 'पूँजी (रु.)', 'नाफा %'],
        rows: ps.map((p, i) => [nd(i + 1), r(p, 'name'), r(p, 'father'), r(p, 'addr'), p.cit ? nd(p.cit) : '……', p.capital ? fmt(parseFloat(p.capital)) : '……', p.share ? nd(p.share) : '……']),
      },
      { t: 'ol', items: clauses },
      { t: 'p', text: 'माथि लेखिएका सबै कुरा हामी साझेदारहरूले पढी बुझी, मञ्जुर गरी सहिछाप गरी दिएका छौँ।' },
      { t: 'sign', names: ps.map((p, i) => `साझेदार ${nd(i + 1)}\n${r(p, 'name')}`) },
      { t: 'h', text: 'साक्षीहरू' },
      { t: 'sign', names: ws.map((x, i) => `साक्षी ${nd(i + 1)}\n${r(x, 'name')}\n${x.addr || ''}`) },
    ];
    return blocks;
  },
  warnings: (v) => {
    const out: { en: string; ne: string }[] = [];
    const ps = rows(v, 'partners');
    const total = ps.reduce((s, p) => s + (parseFloat(p.share) || 0), 0);
    if (Math.abs(total - 100) > 0.001) out.push({ en: `Profit shares total ${total}% — should be 100%.`, ne: `नाफा हिस्सा जम्मा ${nd(total)}% छ — १००% हुनुपर्छ।` });
    return out;
  },
};
