export interface CurrencyRate {
  code: string;
  name: string;
  flag: string;
  unit: number;
  buyNpr: number;
  sellNpr: number;
}

export const DEFAULT_FOREX_RATES: CurrencyRate[] = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", unit: 1, buyNpr: 134.80, sellNpr: 135.40 },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", unit: 1, buyNpr: 90.15, sellNpr: 90.55 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", unit: 1, buyNpr: 147.20, sellNpr: 147.85 },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", unit: 1, buyNpr: 176.50, sellNpr: 177.30 },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", unit: 1, buyNpr: 36.70, sellNpr: 36.86 },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", unit: 1, buyNpr: 35.92, sellNpr: 36.08 },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦", unit: 1, buyNpr: 37.01, sellNpr: 37.18 },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", unit: 10, buyNpr: 9.05, sellNpr: 9.09 },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷", unit: 100, buyNpr: 9.95, sellNpr: 9.99 },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾", unit: 1, buyNpr: 31.25, sellNpr: 31.40 },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", unit: 1, buyNpr: 98.40, sellNpr: 98.80 },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", unit: 100, buyNpr: 160.00, sellNpr: 160.15 },
];

export interface ProgrammaticForexConversion {
  slug: string;
  code: string;
  name: string;
  flag: string;
  title: string;
  metaDescription: string;
  keywords: string[];
}

export const PROGRAMMATIC_FOREX_CONVERSIONS: ProgrammaticForexConversion[] = [
  {
    slug: "usd-to-npr",
    code: "USD",
    name: "US Dollar",
    flag: "🇺🇸",
    title: "USD to NPR (US Dollar to Nepalese Rupee) Today — NRB Exchange Rate",
    metaDescription: "Live US Dollar (USD) to Nepalese Rupee (NPR) exchange rate today. Convert 1 USD, 100 USD to NPR based on official Nepal Rastra Bank (NRB) buying and selling rates.",
    keywords: ["usd to npr", "dollar to npr today", "us dollar rate nepal", "100 dollar in nepali rupees"],
  },
  {
    slug: "aud-to-npr",
    code: "AUD",
    name: "Australian Dollar",
    flag: "🇦🇺",
    title: "AUD to NPR (Australian Dollar to Nepalese Rupee) Rate Today",
    metaDescription: "Convert Australian Dollar (AUD) to Nepalese Rupee (NPR) with latest NRB foreign exchange rate. Calculate student remittance and money transfer to Nepal.",
    keywords: ["aud to npr", "australian dollar to npr", "aud rate today nepal", "australian dollar in nepal"],
  },
  {
    slug: "aed-to-npr",
    code: "AED",
    name: "UAE Dirham",
    flag: "🇦🇪",
    title: "AED to NPR (Dubai Dirham to Nepalese Rupee) Rate Today — Remittance",
    metaDescription: "Convert UAE Dirham (AED) to Nepalese Rupee (NPR). Official Nepal Rastra Bank forex rate for Dubai and UAE workers remitting money home.",
    keywords: ["aed to npr", "dubai dirham rate in nepal", "100 aed to npr", "uae dirham exchange rate nepal"],
  },
  {
    slug: "qar-to-npr",
    code: "QAR",
    name: "Qatari Riyal",
    flag: "🇶🇦",
    title: "QAR to NPR (Qatar Riyal to Nepalese Rupee) Exchange Rate Today",
    metaDescription: "Convert Qatar Riyal (QAR) to Nepalese Rupee (NPR). Official NRB buying and selling exchange rate for Qatar remittance to Nepal.",
    keywords: ["qar to npr", "qatar riyal to nepali rupees", "100 qar to npr", "qatar currency rate nepal"],
  },
  {
    slug: "sar-to-npr",
    code: "SAR",
    name: "Saudi Riyal",
    flag: "🇸🇦",
    title: "SAR to NPR (Saudi Riyal to Nepalese Rupee) Rate Today",
    metaDescription: "Convert Saudi Riyal (SAR) to Nepalese Rupee (NPR). Real-time exchange rate based on Nepal Rastra Bank daily forex bulletin.",
    keywords: ["sar to npr", "saudi riyal to npr today", "saudi currency to nepali rupees", "500 sar to npr"],
  },
  {
    slug: "eur-to-npr",
    code: "EUR",
    name: "Euro",
    flag: "🇪🇺",
    title: "EUR to NPR (Euro to Nepalese Rupee) Exchange Rate Today",
    metaDescription: "Convert Euro (EUR) to Nepalese Rupee (NPR) with live NRB buying and selling rates. Quick remittance and forex converter for Nepal.",
    keywords: ["eur to npr", "euro to nepali rupee", "euro rate nepal today", "100 euro in npr"],
  },
  {
    slug: "gbp-to-npr",
    code: "GBP",
    name: "British Pound",
    flag: "🇬🇧",
    title: "GBP to NPR (British Pound to Nepalese Rupee) Rate Today",
    metaDescription: "Convert British Pound (GBP) to Nepalese Rupee (NPR). Official UK pound sterling exchange rates in Nepal.",
    keywords: ["gbp to npr", "pound to npr", "uk pound to nepali rupees today", "100 pound in npr"],
  },
  {
    slug: "cad-to-npr",
    code: "CAD",
    name: "Canadian Dollar",
    flag: "🇨🇦",
    title: "CAD to NPR (Canadian Dollar to Nepalese Rupee) Rate Today",
    metaDescription: "Convert Canadian Dollar (CAD) to Nepalese Rupee (NPR). Live NRB currency exchange rate for Canadian student tuition and remittance.",
    keywords: ["cad to npr", "canadian dollar to npr", "cad rate today nepal"],
  },
  {
    slug: "myr-to-npr",
    code: "MYR",
    name: "Malaysian Ringgit",
    flag: "🇲🇾",
    title: "MYR to NPR (Malaysia Ringgit to Nepalese Rupee) Exchange Rate Today",
    metaDescription: "Convert Malaysian Ringgit (MYR) to Nepalese Rupee (NPR). Fast live exchange rates for Nepali workers remitting from Malaysia.",
    keywords: ["myr to npr", "malaysia ringgit to nepali rupees", "100 ringgit to npr", "malaysia currency rate in nepal"],
  },
  {
    slug: "krw-to-npr",
    code: "KRW",
    name: "South Korean Won",
    flag: "🇰🇷",
    title: "KRW to NPR (South Korean Won to Nepalese Rupee) Rate Today",
    metaDescription: "Convert Korean Won (KRW) to NPR. Reference exchange rate for EPS workers remitting salary from South Korea to Nepal.",
    keywords: ["krw to npr", "korean won to nepali rupee", "10000 won to npr", "eps korea remittance to nepal"],
  },
  {
    slug: "jpy-to-npr",
    code: "JPY",
    name: "Japanese Yen",
    flag: "🇯🇵",
    title: "JPY to NPR (Japanese Yen to Nepalese Rupee) Rate Today",
    metaDescription: "Convert Japanese Yen (JPY) to Nepalese Rupee (NPR). Live 10 Yen / 1000 Yen rates based on NRB currency exchange figures.",
    keywords: ["jpy to npr", "japanese yen to nepali rupees", "1000 yen in nepali rupees", "japan currency to npr"],
  },
];
