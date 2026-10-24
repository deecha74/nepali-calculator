export interface DocGeneratorMeta {
  slug: string;
  href: string;
  titleEn: string;
  titleNe: string;
  shortEn: string;
  shortNe: string;
  descEn: string;
  descNe: string;
  icon: 'Home' | 'Scale' | 'Handshake';
  color: string;
  bgLight: string;
  actNe: string;
}

/** Single source of truth for the legal-document generator section (hub, footer, homepage, sitemap). */
export const DOC_GENERATORS: DocGeneratorMeta[] = [
  {
    slug: 'rent-agreement',
    href: '/rent-agreement',
    titleEn: 'Rent Agreement Generator',
    titleNe: 'घर बहाल करार',
    shortEn: 'Rent Agreement',
    shortNe: 'घर बहाल करार',
    descEn: 'Print-ready Nepali house / office / shop rent agreement with deposit, TDS and registered-office consent clauses.',
    descNe: 'घर, कार्यालय वा पसल बहालको धरौटी, TDS र कम्पनी ठेगाना सहमति सहितको छाप्न मिल्ने करारनामा।',
    icon: 'Home',
    color: '#d97706',
    bgLight: '#fef9c3',
    actNe: 'करार ऐन, २०५६',
  },
  {
    slug: 'aoa',
    href: '/aoa',
    titleEn: 'AOA Generator (Articles of Association)',
    titleNe: 'नियमावली (AOA)',
    shortEn: 'AOA / Articles',
    shortNe: 'नियमावली (AOA)',
    descEn: 'Pvt. Ltd. नियमावली in six परिच्छेद — shares, meetings, directors, accounts and winding up.',
    descNe: 'प्रा.लि. को शेयर, साधारण सभा, सञ्चालक समिति, लेखा र विघटन समेटिएको छ परिच्छेदको नियमावली।',
    icon: 'Scale',
    color: '#7c3aed',
    bgLight: '#f3e8ff',
    actNe: 'कम्पनी ऐन, २०६३',
  },
  {
    slug: 'partnership-deed',
    href: '/partnership-deed',
    titleEn: 'Partnership Deed Generator',
    titleNe: 'साझेदारी सम्झौता',
    shortEn: 'Partnership Deed',
    shortNe: 'साझेदारी सम्झौता',
    descEn: 'Partners, capital, profit ratio, bank operation, retirement and dispute clauses for a Partnership Firm.',
    descNe: 'साझेदार, पूँजी, नाफा-नोक्सान अनुपात, बैंक सञ्चालन, अवकाश र विवाद समाधानसहितको सम्झौता।',
    icon: 'Handshake',
    color: '#059669',
    bgLight: '#dcfce7',
    actNe: 'साझेदारी ऐन, २०२०',
  },
];
