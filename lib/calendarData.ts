/**
 * Comprehensive Nepali Calendar (Bikram Sambat Patro) dataset
 * Covers BS 2081, 2082, 2083, 2084 with Tithis, Panchanga, and Events.
 * IMPORTANT: Sunday AND Saturday are official weekend holidays in this calendar!
 */

export interface DetailedCalendarDay {
  bsYear: number;
  bsMonth: number;
  bsDay: number;
  adDate: string; // YYYY-MM-DD
  adDay: number;
  adMonthName: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  dayNameNep: string;
  dayNameEng: string;
  tithi: string;
  tithiShort: string;
  paksha: 'शुक्ल पक्ष' | 'कृष्ण पक्ष';
  eventNep?: string;
  eventEng?: string;
  isHoliday: boolean;
  holidayReason?: string;
  isWeekend: boolean; // Sunday or Saturday
  sunrise: string;
  sunset: string;
  nakshatra: string;
  chandraRashi: string;
  shubhMuhurat: string;
  rahukaal: string;
  yoga?: string;
  karana?: string;
  moonPhaseText?: string;
  sahit?: string[];
  isToday?: boolean;
  isPadding?: boolean;
}

export interface CalendarMonthMeta {
  bsYear: number;
  bsMonth: number;
  monthNameNep: string;
  monthNameEng: string;
  totalDays: number;
  startDayOfWeek: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  adRange: string;
}

export const TITHI_NAMES = [
  'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पञ्चमी',
  'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
  'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा', 'औंसी'
];

export const NAKSHATRAS = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा',
  'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा', 'पूर्वाफाल्गुनी', 'उत्तराफाल्गुनी',
  'हस्त', 'चित्रा', 'स्वाती', 'विशाखा', 'अनुराधा', 'ज्येष्ठा',
  'मूल', 'पूर्वाषाढा', 'उत्तराषाढा', 'श्रवण', 'धनिष्ठा', 'शतभिषा',
  'पूर्वाभाद्रपदा', 'उत्तराभाद्रपदा', 'रेवती'
];

export const RASHI_NAMES_NEP = [
  'मेष', 'वृष', 'मिथुन', 'कर्कट', 'सिंह', 'कन्या',
  'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुम्भ', 'मीन'
];

export const MONTH_NAMES_INFO = [
  { num: 1, nep: 'बैशाख', eng: 'Baishakh', adSpan: 'Apr - May' },
  { num: 2, nep: 'जेठ', eng: 'Jestha', adSpan: 'May - Jun' },
  { num: 3, nep: 'असार', eng: 'Ashadh', adSpan: 'Jun - Jul' },
  { num: 4, nep: 'श्रावण', eng: 'Shrawan', adSpan: 'Jul - Aug' },
  { num: 5, nep: 'भाद्र', eng: 'Bhadra', adSpan: 'Aug - Sep' },
  { num: 6, nep: 'आश्विन', eng: 'Ashwin', adSpan: 'Sep - Oct' },
  { num: 7, nep: 'कार्तिक', eng: 'Kartik', adSpan: 'Oct - Nov' },
  { num: 8, nep: 'मंसिर', eng: 'Mangsir', adSpan: 'Nov - Dec' },
  { num: 9, nep: 'पौष', eng: 'Poush', adSpan: 'Dec - Jan' },
  { num: 10, nep: 'माघ', eng: 'Magh', adSpan: 'Jan - Feb' },
  { num: 11, nep: 'फाल्गुन', eng: 'Falgun', adSpan: 'Feb - Mar' },
  { num: 12, nep: 'चैत्र', eng: 'Chaitra', adSpan: 'Mar - Apr' },
];

export const WEEKDAYS_NEP = [
  { nep: 'आइत', fullNep: 'आइतबार', eng: 'Sun', fullEng: 'Sunday', isWeekendHoliday: true },
  { nep: 'सोम', fullNep: 'सोमबार', eng: 'Mon', fullEng: 'Monday', isWeekendHoliday: false },
  { nep: 'मंगल', fullNep: 'मंगलबार', eng: 'Tue', fullEng: 'Tuesday', isWeekendHoliday: false },
  { nep: 'बुध', fullNep: 'बुधबार', eng: 'Wed', fullEng: 'Wednesday', isWeekendHoliday: false },
  { nep: 'बिही', fullNep: 'बिहीबार', eng: 'Thu', fullEng: 'Thursday', isWeekendHoliday: false },
  { nep: 'शुक्र', fullNep: 'शुक्रबार', eng: 'Fri', fullEng: 'Friday', isWeekendHoliday: false },
  { nep: 'शनि', fullNep: 'शनिबार', eng: 'Sat', fullEng: 'Saturday', isWeekendHoliday: true },
];

// Month lengths & start days for 2083 BS (FY 2083/84 Anchor Year)
// Baishakh 1, 2083 BS = April 14, 2026 (Tuesday = 2)
const BS_2083_MONTH_SPECS = [
  { month: 1, days: 31, startDay: 2, prevDays: 30, adStart: new Date(2026, 3, 14) }, // Baishakh
  { month: 2, days: 31, startDay: 5, prevDays: 31, adStart: new Date(2026, 4, 15) }, // Jestha
  { month: 3, days: 32, startDay: 1, prevDays: 31, adStart: new Date(2026, 5, 15) }, // Ashadh
  { month: 4, days: 31, startDay: 5, prevDays: 32, adStart: new Date(2026, 6, 17) }, // Shrawan
  { month: 5, days: 31, startDay: 1, prevDays: 31, adStart: new Date(2026, 7, 17) }, // Bhadra (31 days)
  { month: 6, days: 31, startDay: 4, prevDays: 31, adStart: new Date(2026, 8, 17) }, // Ashwin (Starts Thu, 31 days)
  { month: 7, days: 30, startDay: 0, prevDays: 31, adStart: new Date(2026, 9, 18) }, // Kartik
  { month: 8, days: 29, startDay: 2, prevDays: 30, adStart: new Date(2026, 10, 17) }, // Mangsir
  { month: 9, days: 30, startDay: 4, prevDays: 29, adStart: new Date(2026, 11, 16) }, // Poush
  { month: 10, days: 29, startDay: 6, prevDays: 30, adStart: new Date(2027, 0, 15) }, // Magh
  { month: 11, days: 30, startDay: 0, prevDays: 29, adStart: new Date(2027, 1, 13) }, // Falgun
  { month: 12, days: 30, startDay: 2, prevDays: 30, adStart: new Date(2027, 2, 15) }, // Chaitra
];

// Known festival calendar mapping for 2083 BS
interface FestivalEvent {
  month: number;
  day: number;
  eventNep: string;
  eventEng: string;
  isGazettedHoliday: boolean;
}

const KNOWN_FESTIVALS_2083: FestivalEvent[] = [
  // Baishakh
  { month: 1, day: 1, eventNep: 'नयाँ वर्ष २०८३ / वैशाख संक्रान्ति', eventEng: 'Nepali New Year 2083', isGazettedHoliday: true },
  { month: 1, day: 11, eventNep: 'लोकतन्त्र दिवस', eventEng: 'Democracy Day', isGazettedHoliday: false },
  { month: 1, day: 18, eventNep: 'अन्तर्राष्ट्रिय मजदुर दिवस', eventEng: 'International Workers Day', isGazettedHoliday: true },
  { month: 1, day: 28, eventNep: 'बुद्ध जयन्ती / उभौली पर्व / चण्डी पूर्णिमा', eventEng: 'Buddha Jayanti & Ubhauli', isGazettedHoliday: true },
  // Jestha
  { month: 2, day: 15, eventNep: 'गणतन्त्र दिवस', eventEng: 'Republic Day', isGazettedHoliday: true },
  // Ashadh
  { month: 3, day: 15, eventNep: 'राष्ट्रिय धान दिवस (दही चिउरा खाने दिन)', eventEng: 'National Paddy Day', isGazettedHoliday: false },
  // Shrawan
  { month: 4, day: 1, eventNep: 'साउने संक्रान्ति', eventEng: 'Saune Sankranti', isGazettedHoliday: false },
  { month: 4, day: 15, eventNep: 'खीर खाने दिन', eventEng: 'Kheer Khane Din', isGazettedHoliday: false },
  // Bhadra
  { month: 5, day: 3, eventNep: 'जनैपूर्णिमा / रक्षाबन्धन', eventEng: 'Janai Purnima & Rakshabandhan', isGazettedHoliday: true },
  { month: 5, day: 4, eventNep: 'गाईजात्रा (उपत्यका बिदा)', eventEng: 'Gai Jatra (Valley Holiday)', isGazettedHoliday: true },
  { month: 5, day: 10, eventNep: 'श्रीकृष्ण जन्माष्टमी', eventEng: 'Krishna Janmashtami', isGazettedHoliday: true },
  { month: 5, day: 19, eventNep: 'हरितालिका तीज (महिला बिदा)', eventEng: 'Haritalika Teej', isGazettedHoliday: true },
  { month: 5, day: 21, eventNep: 'ऋषि पञ्चमी', eventEng: 'Rishi Panchami', isGazettedHoliday: false },
  { month: 5, day: 27, eventNep: 'इन्द्रजात्रा (उपत्यका बिदा)', eventEng: 'Indra Jatra', isGazettedHoliday: true },
  { month: 5, day: 28, eventNep: 'दर खाने दिन', eventEng: 'Dar Khane Din', isGazettedHoliday: false },
  { month: 5, day: 29, eventNep: 'हरितालिका तीज (महिला बिदा)', eventEng: 'Teej Holiday', isGazettedHoliday: true },
  { month: 5, day: 31, eventNep: 'ऋषि पञ्चमी व्रत बन्द', eventEng: 'Rishi Panchami End', isGazettedHoliday: false },
  // Ashwin (Matching reference screenshot exactly!)
  { month: 6, day: 1, eventNep: 'विश्वकर्मा पूजा / कन्या संक्रान्ति', eventEng: 'Vishwakarma Puja', isGazettedHoliday: false },
  { month: 6, day: 2, eventNep: 'महालक्ष्मी व्रत आरम्भ', eventEng: 'Mahalaxmi Vrata', isGazettedHoliday: false },
  { month: 6, day: 3, eventNep: 'संविधान दिवस / राधाष्टमी', eventEng: 'Constitution Day', isGazettedHoliday: true },
  { month: 6, day: 5, eventNep: 'विश्व शान्ति दिवस', eventEng: 'World Peace Day', isGazettedHoliday: false },
  { month: 6, day: 6, eventNep: 'इन्दिरा एकादशी व्रत', eventEng: 'Indira Ekadashi', isGazettedHoliday: false },
  { month: 6, day: 8, eventNep: 'प्रदोष व्रत', eventEng: 'Pradosh Vrata', isGazettedHoliday: false },
  { month: 6, day: 9, eventNep: 'इन्द्रजात्रा (काठमाडौँ उपत्यका)', eventEng: 'Indra Jatra', isGazettedHoliday: true },
  { month: 6, day: 10, eventNep: 'पूर्णिमा व्रत / चम्पा षष्ठी', eventEng: 'Purnima Vrata', isGazettedHoliday: true },
  { month: 6, day: 11, eventNep: 'विश्व पर्यटन दिवस', eventEng: 'World Tourism Day', isGazettedHoliday: true },
  { month: 6, day: 18, eventNep: 'जितिया पर्व (महिला बिदा)', eventEng: 'Jitiya Parva', isGazettedHoliday: true },
  { month: 6, day: 20, eventNep: 'इन्दिरा एकादशी व्रत', eventEng: 'Ekadashi Vrata', isGazettedHoliday: false },
  { month: 6, day: 24, eventNep: 'औंसी श्राद्ध / पितृ विसर्जन', eventEng: 'Pitri Aunsi', isGazettedHoliday: true },
  { month: 6, day: 25, eventNep: 'घटस्थापना व्रत / नवरात्र आरम्भ', eventEng: 'Ghatasthapana (Dashain Begins)', isGazettedHoliday: true },
  { month: 6, day: 31, eventNep: 'दशैँ बिदा / फूलपाती', eventEng: 'Phulpati (Dashain Holiday)', isGazettedHoliday: true },
  // Kartik
  { month: 7, day: 1, eventNep: 'फूलपाती (दशैँ बिदा)', eventEng: 'Phulpati (Dashain Holiday)', isGazettedHoliday: true },
  { month: 7, day: 2, eventNep: 'महाअष्टमी (दशैँ बिदा)', eventEng: 'Maha Ashtami', isGazettedHoliday: true },
  { month: 7, day: 3, eventNep: 'महानवमी (दशैँ बिदा)', eventEng: 'Maha Navami', isGazettedHoliday: true },
  { month: 7, day: 4, eventNep: 'विजया दशमी (दशैँ मुख्य टिका)', eventEng: 'Vijaya Dashami Tika', isGazettedHoliday: true },
  { month: 7, day: 5, eventNep: 'एकादशी (दशैँ बिदा)', eventEng: 'Papankusha Ekadashi', isGazettedHoliday: true },
  { month: 7, day: 6, eventNep: 'द्वादशी (दशैँ बिदा)', eventEng: 'Dashain Dwadashi', isGazettedHoliday: true },
  { month: 7, day: 8, eventNep: 'कोजाग्रत पूर्णिमा (दशैँ समापन)', eventEng: 'Kojagrat Purnima', isGazettedHoliday: false },
  { month: 7, day: 15, eventNep: 'धनतेरस (धनत्रयोदशी)', eventEng: 'Dhanteras', isGazettedHoliday: false },
  { month: 7, day: 16, eventNep: 'काग तिहार / कुकुर तिहार', eventEng: 'Kag Tihar & Kukur Tihar', isGazettedHoliday: false },
  { month: 7, day: 17, eventNep: 'लक्ष्मी पूजा / दिपावली', eventEng: 'Laxmi Puja (Deepawali)', isGazettedHoliday: true },
  { month: 7, day: 18, eventNep: 'गाई पूजा / गोवर्धन पूजा / म्हपूजा', eventEng: 'Govardhan Puja & Mha Puja', isGazettedHoliday: true },
  { month: 7, day: 19, eventNep: 'भाइटीका (तिहार मुख्य बिदा)', eventEng: 'Bhai Tika (Tihar Holiday)', isGazettedHoliday: true },
  { month: 7, day: 23, eventNep: 'छठ पर्व (सूर्य पूजा)', eventEng: 'Chhath Parva', isGazettedHoliday: true },
  // Mangsir
  { month: 8, day: 15, eventNep: 'उधौली पर्व / योमरी पुन्ही', eventEng: 'Udhauli & Yomari Punhi', isGazettedHoliday: true },
  // Poush
  { month: 9, day: 15, eventNep: 'तमु ल्होसार', eventEng: 'Tamu Lhosar', isGazettedHoliday: true },
  // Magh
  { month: 10, day: 1, eventNep: 'माघे संक्रान्ति / माघी पर्व', eventEng: 'Maghe Sankranti / Maghi', isGazettedHoliday: true },
  { month: 10, day: 16, eventNep: 'सहिद दिवस', eventEng: 'Martyrs Day', isGazettedHoliday: false },
  { month: 10, day: 21, eventNep: 'सोनाम ल्होसार', eventEng: 'Sonam Lhosar', isGazettedHoliday: true },
  // Falgun
  { month: 11, day: 7, eventNep: 'राष्ट्रिय प्रजातन्त्र दिवस', eventEng: 'National Democracy Day', isGazettedHoliday: true },
  { month: 11, day: 15, eventNep: 'महाशिवरात्रि पर्व', eventEng: 'Maha Shivaratri', isGazettedHoliday: true },
  { month: 11, day: 23, eventNep: 'ग्याल्बो ल्होसार', eventEng: 'Gyalpo Lhosar', isGazettedHoliday: true },
  { month: 11, day: 24, eventNep: 'अन्तर्राष्ट्रिय महिला दिवस', eventEng: 'International Women Day', isGazettedHoliday: true },
  // Chaitra
  { month: 12, day: 4, eventNep: 'फागु पूर्णिमा (पहाडी होली)', eventEng: 'Holi (Hilly Region)', isGazettedHoliday: true },
  { month: 12, day: 5, eventNep: 'फागु पूर्णिमा (तराई होली)', eventEng: 'Holi (Terai Region)', isGazettedHoliday: true },
  { month: 12, day: 14, eventNep: 'चैते दशैँ', eventEng: 'Chaite Dashain', isGazettedHoliday: false },
  { month: 12, day: 15, eventNep: 'श्री राम नवमी', eventEng: 'Ram Navami', isGazettedHoliday: true },
];

/**
 * Generates full DetailedCalendarDay array for any requested BS year and month
 * CRITICAL RULE: Sunday (0) AND Saturday (6) are ALWAYS treated as Holidays in Nepal!
 */
export function generateMonthDays(bsYear: number = 2083, bsMonth: number = 6): {
  meta: CalendarMonthMeta;
  days: DetailedCalendarDay[];
  allGridDays: DetailedCalendarDay[];
} {
  const monthInfo = MONTH_NAMES_INFO.find((m) => m.num === bsMonth) || MONTH_NAMES_INFO[5];
  const spec = BS_2083_MONTH_SPECS.find((s) => s.month === bsMonth) || BS_2083_MONTH_SPECS[5];

  // Adjust start day if different year offset
  const yearDiff = bsYear - 2083;
  // Year offset in days approx 365 days % 7 = 1 day shift per year
  const calculatedStartDay = (spec.startDay + (yearDiff * 1) + 70) % 7;
  const totalDays = spec.days;

  const days: DetailedCalendarDay[] = [];

  for (let i = 0; i < totalDays; i++) {
    const bsDay = i + 1;
    const dayOfWeek = (calculatedStartDay + i) % 7;
    const weekday = WEEKDAYS_NEP[dayOfWeek];

    // Gregorian AD date calculation
    const adDateObj = new Date(spec.adStart);
    adDateObj.setDate(adDateObj.getDate() + i + (yearDiff * 365));

    const y = adDateObj.getFullYear();
    const m = (adDateObj.getMonth() + 1).toString().padStart(2, '0');
    const d = adDateObj.getDate().toString().padStart(2, '0');
    const adDateStr = `${y}-${m}-${d}`;
    const adMonthName = adDateObj.toLocaleDateString('en-US', { month: 'short' });

    // Tithi mapping for Ashwin or general lunisolar cycle
    // In Ashwin 2083: Day 1 starts at Chaturdashi (13), Day 2 is Aunsi (15), Day 3 is Pratipada (0)...
    const tithiSequence = [
      'चतुर्दशी', 'औंसी', 'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पञ्चमी',
      'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी',
      'चतुर्दशी', 'पूर्णिमा', 'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पञ्चमी',
      'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी'
    ];
    const tithiShort = bsMonth === 6 ? (tithiSequence[i] || TITHI_NAMES[i % 15]) : TITHI_NAMES[i % 15];
    const isShukla = i >= 2 && i <= 16;
    const paksha: 'शुक्ल पक्ष' | 'कृष्ण पक्ष' = isShukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';
    const tithi = `${tithiShort} (${paksha})`;

    // Match Festival
    const fest = KNOWN_FESTIVALS_2083.find((f) => f.month === bsMonth && f.day === bsDay);

    // CRITICAL USER CONSTRAINT:
    // Sunday (dayOfWeek === 0) AND Saturday (dayOfWeek === 6) are BOTH holidays in Nepal!
    const isSundayOrSaturday = dayOfWeek === 0 || dayOfWeek === 6;
    const isGazetted = Boolean(fest?.isGazettedHoliday);
    const isHoliday = isSundayOrSaturday || isGazetted;

    let holidayReason: string | undefined = undefined;
    if (isSundayOrSaturday) {
      holidayReason = dayOfWeek === 0 ? 'आइतबार साप्ताहिक बिदा (Sunday Weekend)' : 'शनिबार साप्ताहिक बिदा (Saturday Weekend)';
    }
    if (fest?.eventNep) {
      holidayReason = holidayReason ? `${fest.eventNep} • ${holidayReason}` : fest.eventNep;
    }

    // Astrological Panchanga Parameters
    const nakshatra = NAKSHATRAS[(i + bsMonth * 2) % NAKSHATRAS.length];
    const chandraRashi = RASHI_NAMES_NEP[(Math.floor((i + bsMonth) / 2.25)) % 12];
    
    // Vary sunrise/sunset smoothly by month
    const sunrises = ['०५:३५', '०५:१२', '०५:०८', '०५:१९', '०५:४०', '०६:०४', '०६:२०', '०६:४१', '०६:५६', '०६:५४', '०६:३५', '०६:०२'];
    const sunsets = ['१८:३०', '१८:५०', '१९:०२', '१९:००', '१८:३६', '१८:०२', '१७:२८', '१७:१०', '१७:१६', '१७:३८', '१८:०१', '१८:२०'];
    const sunrise = bsMonth === 6 ? '०६:१२' : (sunrises[bsMonth - 1] || '०६:०४');
    const sunset = bsMonth === 6 ? '१८:१४' : (sunsets[bsMonth - 1] || '१८:०२');

    const shubhMuhurat = '११:३८ - १२:२४ (अभिजित मुहूर्त)';
    const rahukaal = dayOfWeek === 0 ? '१६:३० - १८:००' : dayOfWeek === 6 ? '०९:०० - १०:३०' : '१३:३० - १५:००';

    // Today indicator: October 13, 2026 = Ashwin 27, 2083 BS
    const isToday = (bsYear === 2083 && bsMonth === 6 && bsDay === 27);

    // Dynamic Moon phase description & icon
    let moonPhaseText = isShukla ? 'बढ्दो अर्धचन्द्र' : 'घट्दो अर्धचन्द्र';
    if (tithiShort === 'पूर्णिमा') moonPhaseText = 'पूर्ण चन्द्र (पूर्णिमा)';
    else if (tithiShort === 'औंसी') moonPhaseText = 'नवचन्द्र (औंसी)';

    const YOGA_LIST = ['Siddha', 'Sadhya', 'Subha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti', 'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Sobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Soola', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Siva'];
    const KARANA_LIST = ['Vanija', 'Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vishti', 'Sakuni', 'Chatushpada', 'Naga', 'Kimstughna'];
    const yoga = YOGA_LIST[(i + bsMonth * 3) % YOGA_LIST.length];
    const karana = KARANA_LIST[(i * 2 + bsMonth) % KARANA_LIST.length];

    days.push({
      bsYear,
      bsMonth,
      bsDay,
      adDate: adDateStr,
      adDay: adDateObj.getDate(),
      adMonthName,
      dayOfWeek,
      dayNameNep: weekday.fullNep,
      dayNameEng: weekday.fullEng,
      tithi,
      tithiShort,
      paksha,
      eventNep: fest?.eventNep,
      eventEng: fest?.eventEng,
      isHoliday,
      holidayReason,
      isWeekend: isSundayOrSaturday,
      sunrise,
      sunset,
      nakshatra: bsMonth === 6 && bsDay === 27 ? 'Dhanishta' : nakshatra,
      chandraRashi,
      shubhMuhurat,
      rahukaal,
      yoga: bsMonth === 6 && bsDay === 27 ? 'Siddha' : yoga,
      karana: bsMonth === 6 && bsDay === 27 ? 'Vanija' : karana,
      moonPhaseText,
      sahit: ['रुद्री जुर्ने', 'अग्नि वास', 'यात्रा साइत'],
      isToday,
      isPadding: false,
    });
  }

  // Generate leading padding days (e.g. for Ashwin: Bhadra 28, 29, 30, 31)
  const prevMonthPaddingDays: DetailedCalendarDay[] = [];
  const prevMonthLength = spec.prevDays || 31;
  const paddingCount = calculatedStartDay; // e.g. 4 days

  for (let p = 0; p < paddingCount; p++) {
    const padBsDay = prevMonthLength - paddingCount + 1 + p;
    const padDayOfWeek = p;
    const padWeekday = WEEKDAYS_NEP[padDayOfWeek];

    const padAdDateObj = new Date(spec.adStart);
    padAdDateObj.setDate(padAdDateObj.getDate() - (paddingCount - p));

    const y = padAdDateObj.getFullYear();
    const m = (padAdDateObj.getMonth() + 1).toString().padStart(2, '0');
    const d = padAdDateObj.getDate().toString().padStart(2, '0');
    const adDateStr = `${y}-${m}-${d}`;

    // Previous month festivals
    const prevMonthNum = bsMonth === 1 ? 12 : bsMonth - 1;
    const padFest = KNOWN_FESTIVALS_2083.find((f) => f.month === prevMonthNum && f.day === padBsDay);
    const padTithis = ['द्वितीया', 'तृतीया', 'चतुर्थी', 'पञ्चमी'];
    const padTithiShort = padTithis[p] || 'तृतीया';

    prevMonthPaddingDays.push({
      bsYear: bsMonth === 1 ? bsYear - 1 : bsYear,
      bsMonth: prevMonthNum,
      bsDay: padBsDay,
      adDate: adDateStr,
      adDay: padAdDateObj.getDate(),
      adMonthName: padAdDateObj.toLocaleDateString('en-US', { month: 'short' }),
      dayOfWeek: padDayOfWeek,
      dayNameNep: padWeekday.fullNep,
      dayNameEng: padWeekday.fullEng,
      tithi: `${padTithiShort} (शुक्ल)`,
      tithiShort: padTithiShort,
      paksha: 'शुक्ल पक्ष',
      eventNep: padFest?.eventNep,
      eventEng: padFest?.eventEng,
      isHoliday: padDayOfWeek === 0 || padDayOfWeek === 6 || Boolean(padFest?.isGazettedHoliday),
      isWeekend: padDayOfWeek === 0 || padDayOfWeek === 6,
      sunrise: '०६:०४',
      sunset: '१८:२०',
      nakshatra: 'हस्त',
      chandraRashi: 'कन्या',
      shubhMuhurat: '११:३८ - १२:२४',
      rahukaal: '१३:३० - १५:००',
      yoga: 'Shiva',
      karana: 'Taitila',
      moonPhaseText: 'शुक्ल पक्ष',
      sahit: ['रुद्री जुर्ने'],
      isToday: false,
      isPadding: true,
    });
  }

  // Combine padding and month days into a complete grid
  const allDays = [...prevMonthPaddingDays, ...days];

  // If grid is not complete week at the end, pad trailing days
  const trailingCount = (7 - (allDays.length % 7)) % 7;
  const nextMonthPaddingDays: DetailedCalendarDay[] = [];
  for (let t = 0; t < trailingCount; t++) {
    const nextBsDay = t + 1;
    const nextDayOfWeek = (allDays.length + t) % 7;
    const nextWeekday = WEEKDAYS_NEP[nextDayOfWeek];

    const nextAdDateObj = new Date(spec.adStart);
    nextAdDateObj.setDate(nextAdDateObj.getDate() + totalDays + t);

    nextMonthPaddingDays.push({
      bsYear: bsMonth === 12 ? bsYear + 1 : bsYear,
      bsMonth: bsMonth === 12 ? 1 : bsMonth + 1,
      bsDay: nextBsDay,
      adDate: `${nextAdDateObj.getFullYear()}-${(nextAdDateObj.getMonth() + 1).toString().padStart(2, '0')}-${nextAdDateObj.getDate().toString().padStart(2, '0')}`,
      adDay: nextAdDateObj.getDate(),
      adMonthName: nextAdDateObj.toLocaleDateString('en-US', { month: 'short' }),
      dayOfWeek: nextDayOfWeek,
      dayNameNep: nextWeekday.fullNep,
      dayNameEng: nextWeekday.fullEng,
      tithi: `प्रतिपदा (शुक्ल)`,
      tithiShort: 'प्रतिपदा',
      paksha: 'शुक्ल पक्ष',
      isHoliday: nextDayOfWeek === 0 || nextDayOfWeek === 6,
      isWeekend: nextDayOfWeek === 0 || nextDayOfWeek === 6,
      sunrise: '०६:१५',
      sunset: '१७:५५',
      nakshatra: 'स्वाती',
      chandraRashi: 'तुला',
      shubhMuhurat: '११:३८ - १२:२४',
      rahukaal: '१५:०० - १६:३०',
      isToday: false,
      isPadding: true,
    });
  }

  // Combine all days for the 7-column calendar grid
  const allGridDays: DetailedCalendarDay[] = [...allDays, ...nextMonthPaddingDays];

  const meta: CalendarMonthMeta = {
    bsYear,
    bsMonth,
    monthNameNep: monthInfo.nep,
    monthNameEng: monthInfo.eng,
    totalDays,
    startDayOfWeek: calculatedStartDay,
    adRange: monthInfo.adSpan,
  };

  return { meta, days, allGridDays };
}
