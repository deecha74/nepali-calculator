const ONES_NEP = [
  "", "एक", "दुई", "तीन", "चार", "पाँच", "छ", "सात", "आठ", "नौ",
  "दश", "एघार", "बाह्र", "तेह्र", "चौध", "पन्ध्र", "सोह्र", "सत्र", "अठार", "उन्नाइस",
  "बीस", "एक्काइस", "बाइस", "तेइस", "चौबीस", "पच्चीस", "छब्बीस", "सत्ताइस", "अठ्ठाइस", "उनन्तीस",
  "तीस", "एकतीस", "बत्तीस", "तेत्तीस", "चौंतीस", "पैंतीस", "छत्तीस", "सरसत्ती", "अठतीस", "उनन्चालीस",
  "चालीस", "एकचालीस", "बयालीस", "त्रिचालीस", "चवालीस", "पैंतालीस", "छयालीस", "सड्चालीस", "अठचालीस", "उनन्पचास",
  "पचास", "एकाउन्न", "बाउन्न", "त्रिपन्न", "चउन्न", "पचपन्न", "छपन्न", "सन्ताउन्न", "अन्ठाउन्न", "उनन्साठ्ठी",
  "साठ्ठी", "एकसट्ठी", "बाइसट्ठी", "त्रिसट्ठी", "चौंसट्ठी", "पैंसट्ठी", "छयसट्ठी", "सतसट्ठी", "अठसट्ठी", "उनन्सत्तरी",
  "सत्तरी", "एकहत्तर", "बहत्तर", "त्रिहत्तर", "चौहत्तर", "पचहत्तर", "छयहत्तर", "सतहत्तर", "अठहत्तर", "उनासी",
  "असी", "एकासी", "बयासी", "त्रियासी", "चौरासी", "पचासी", "छयासी", "सतासी", "अठासी", "उनान्नब्बे",
  "नब्बे", "एकान्नब्बे", "बयानब्बे", "त्रियान्नब्बे", "चौरानब्बे", "पन्चानब्बे", "छयान्नब्बे", "सन्तान्नब्बे", "अन्ठान्ब्बे", "उनान्सय"
];

const ONES_ENG = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
];

const TENS_ENG = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
];

function engTwoDigits(num: number): string {
  if (num < 20) return ONES_ENG[num];
  const ten = Math.floor(num / 10);
  const one = num % 10;
  return `${TENS_ENG[ten]} ${ONES_ENG[one]}`.trim();
}

function engThreeDigits(num: number): string {
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;
  let str = "";
  if (hundred > 0) str += `${ONES_ENG[hundred]} Hundred `;
  if (remainder > 0) str += engTwoDigits(remainder);
  return str.trim();
}

/**
 * Converts integer to English words using South Asian numbering (Crore, Lakh, Thousand)
 */
export function numberToEnglishWords(num: number): string {
  if (num === 0) return "Zero Rupees Only";
  if (num < 0) return "Negative " + numberToEnglishWords(Math.abs(num));

  const crore = Math.floor(num / 10000000);
  let rem = num % 10000000;
  const lakh = Math.floor(rem / 100000);
  rem = rem % 100000;
  const thousand = Math.floor(rem / 1000);
  rem = rem % 1000;
  const hundreds = rem;

  let words = "";
  if (crore > 0) words += `${engTwoDigits(crore)} Crore `;
  if (lakh > 0) words += `${engTwoDigits(lakh)} Lakh `;
  if (thousand > 0) words += `${engTwoDigits(thousand)} Thousand `;
  if (hundreds > 0) words += engThreeDigits(hundreds);

  return words.trim() + " Rupees Only";
}

/**
 * Converts integer to Nepali words (करोड, लाख, हजार, सय, रुपैयाँ मात्र)
 */
export function numberToNepaliWords(num: number): string {
  if (num === 0) return "शून्य रुपैयाँ मात्र";
  if (num < 0) return "ऋणात्मक " + numberToNepaliWords(Math.abs(num));

  const crore = Math.floor(num / 10000000);
  let rem = num % 10000000;
  const lakh = Math.floor(rem / 100000);
  rem = rem % 100000;
  const thousand = Math.floor(rem / 1000);
  rem = rem % 1000;
  const hundreds = Math.floor(rem / 100);
  const lastTwo = rem % 100;

  let words = "";
  if (crore > 0) words += `${ONES_NEP[crore]} करोड `;
  if (lakh > 0) words += `${ONES_NEP[lakh]} लाख `;
  if (thousand > 0) words += `${ONES_NEP[thousand]} हजार `;
  if (hundreds > 0) words += `${ONES_NEP[hundreds]} सय `;
  if (lastTwo > 0) words += `${ONES_NEP[lastTwo]} `;

  return words.trim() + " रुपैयाँ मात्र";
}
