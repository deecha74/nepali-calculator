export type PassengerType =
  | 'general_nepali'
  | 'migrant_worker_6mo'
  | 'migrant_worker_12mo'
  | 'tourist';

export type Gender = 'male' | 'female';

export interface BaggageCustomsInput {
  passengerType: PassengerType;
  gender: Gender;
  goldOrnamentsGrams: number;
  rawGoldGrams: number;
  silverOrnamentsGrams: number;
  smartphonesCount: number;
  laptopsCount: number;
  alcoholLiters: number;
  tvSizeInches: number; // 0 if none
  cigaretteSticks: number;
  cashUsd: number;
  hasDrone: boolean;
}

export interface BaggageItemBreakdown {
  category: string;
  categoryNe: string;
  declared: string;
  dutyFreeLimit: string;
  taxableQuantity: string;
  dutyPayableNpr: number;
  status: 'green' | 'yellow' | 'red';
  note: string;
  noteNe: string;
}

export interface BaggageCustomsResult {
  channel: 'green' | 'red' | 'prohibited';
  channelName: string;
  channelNameNe: string;
  totalDutyNpr: number;
  hasRiskOfConfiscation: boolean;
  warnings: string[];
  breakdown: BaggageItemBreakdown[];
}

export const PASSENGER_TYPES = [
  {
    id: 'general_nepali' as PassengerType,
    nameEn: 'General Nepali Traveler (Visit / Student / Tourist)',
    nameNe: 'साधारण नेपाली यात्रु (भिजिट / विद्यार्थी / पर्यटक)',
    badge: 'Standard Allowance',
  },
  {
    id: 'migrant_worker_6mo' as PassengerType,
    nameEn: 'Nepali Returnee with Labor Permit (6 to 11 Months Abroad)',
    nameNe: 'वैदेशिक रोजगारबाट फर्केका (६ देखि ११ महिना श्रम स्वीकृति)',
    badge: 'Extra 1 Phone Free',
  },
  {
    id: 'migrant_worker_12mo' as PassengerType,
    nameEn: 'Nepali Returnee with Labor Permit (12+ Months Abroad)',
    nameNe: 'वैदेशिक रोजगारबाट फर्केका (१ वर्षभन्दा बढी श्रम स्वीकृति)',
    badge: 'Extra Phone + 32" TV Free',
  },
  {
    id: 'tourist' as PassengerType,
    nameEn: 'Foreign Tourist (विदेशी पर्यटक)',
    nameNe: 'विदेशी पर्यटक',
    badge: 'Tourist Baggage Order',
  },
];

export function calculateAirportBaggageDuty(input: BaggageCustomsInput): BaggageCustomsResult {
  const breakdown: BaggageItemBreakdown[] = [];
  const warnings: string[] = [];
  let totalDutyNpr = 0;
  let hasRiskOfConfiscation = false;

  const isMigrant6Mo = input.passengerType === 'migrant_worker_6mo' || input.passengerType === 'migrant_worker_12mo';
  const isMigrant12Mo = input.passengerType === 'migrant_worker_12mo';

  // 1. Gold Ornaments (गहना)
  const freeGoldGrams = input.gender === 'female' ? 50 : 25;
  let goldOrnamentDuty = 0;
  let goldOrnamentTaxable = 0;
  let goldOrnamentStatus: 'green' | 'yellow' | 'red' = 'green';
  let goldOrnamentNote = '100% duty-free inside personal allowance.';
  let goldOrnamentNoteNe = 'व्यक्तिगत छुट सीमाभित्र पूर्ण रूपमा निःशुल्क।';

  if (input.goldOrnamentsGrams > freeGoldGrams) {
    const excess = input.goldOrnamentsGrams - freeGoldGrams;
    if (excess <= 50) {
      // Up to 50g extra jewelry allowed on customs payment (~NPR 950 per gram)
      goldOrnamentTaxable = excess;
      goldOrnamentDuty = excess * 950;
      goldOrnamentStatus = 'yellow';
      goldOrnamentNote = `Excess ${excess}g taxable at NPR 9,500 per 10 grams.`;
      goldOrnamentNoteNe = `थप ${excess} ग्राममा प्रति १० ग्राम रु ९,५०० का दरले भन्सार लाग्नेछ।`;
    } else {
      // More than 50g excess (Total > 75g male or > 100g female)
      const allowedTaxable = 50;
      const prohibitedExcess = excess - allowedTaxable;
      goldOrnamentTaxable = allowedTaxable;
      goldOrnamentDuty = allowedTaxable * 950;
      goldOrnamentStatus = 'red';
      hasRiskOfConfiscation = true;
      warnings.push(`Warning: Carrying ${input.goldOrnamentsGrams}g of gold jewelry exceeds maximum legal personal baggage limits. The excess ${prohibitedExcess}g may be confiscated or penalized under the Customs Act.`);
      goldOrnamentNote = `Legal duty limit is 50g excess. Remaining ${prohibitedExcess}g is liable to seizure!`;
      goldOrnamentNoteNe = `५० ग्रामभन्दा बढी गहना भन्सार ऐन अनुसार जफत वा जरिवाना हुन सक्छ!`;
    }
  }

  breakdown.push({
    category: 'Gold Jewelry / Ornaments',
    categoryNe: 'सुनका गहना (छड्के, सिक्री, औंठी आदि)',
    declared: `${input.goldOrnamentsGrams} grams`,
    dutyFreeLimit: `${freeGoldGrams} grams (${input.gender})`,
    taxableQuantity: `${goldOrnamentTaxable} grams`,
    dutyPayableNpr: goldOrnamentDuty,
    status: goldOrnamentStatus,
    note: goldOrnamentNote,
    noteNe: goldOrnamentNoteNe,
  });
  totalDutyNpr += goldOrnamentDuty;

  // 2. Raw Gold (काँचो सुन / बिस्कुट / सिक्का)
  let rawGoldDuty = 0;
  let rawGoldTaxable = 0;
  let rawGoldStatus: 'green' | 'yellow' | 'red' = 'green';
  let rawGoldNote = 'Zero raw gold declared.';
  let rawGoldNoteNe = 'काँचो सुन घोषणा गरिएको छैन।';

  if (input.rawGoldGrams > 0) {
    if (input.rawGoldGrams <= 50) {
      rawGoldTaxable = input.rawGoldGrams;
      rawGoldDuty = input.rawGoldGrams * 950; // NPR 9,500 per 10g
      rawGoldStatus = 'yellow';
      rawGoldNote = 'Raw gold has 0g free limit. Taxable at NPR 9,500 per 10g.';
      rawGoldNoteNe = 'काँचो सुनमा कुनै छुट हुँदैन। प्रति १० ग्राम रु ९,५०० भन्सार लाग्छ।';
    } else if (input.rawGoldGrams <= 100) {
      rawGoldTaxable = input.rawGoldGrams;
      // First 50g @ 950, next 50g @ 1050
      rawGoldDuty = 50 * 950 + (input.rawGoldGrams - 50) * 1050;
      rawGoldStatus = 'yellow';
      rawGoldNote = 'First 50g @ Rs 9,500/10g; remaining @ Rs 10,500/10g.';
      rawGoldNoteNe = 'पहिलो ५० ग्राम रु ९,५००/१० ग्राम र बाँकी रु १०,५००/१० ग्राम।';
    } else {
      rawGoldTaxable = 100;
      rawGoldDuty = 50 * 950 + 50 * 1050;
      rawGoldStatus = 'red';
      hasRiskOfConfiscation = true;
      const extraRaw = input.rawGoldGrams - 100;
      warnings.push(`CRITICAL: Bringing more than 100 grams of raw gold (${input.rawGoldGrams}g declared) is strictly illegal under Nepal personal baggage orders and constitutes commercial smuggling.`);
      rawGoldNote = `Maximum 100g raw gold can be cleared. Remaining ${extraRaw}g subject to arrest & seizure.`;
      rawGoldNoteNe = `अधिकतम १०० ग्राम मात्र भन्सार तिरेर छुटाउन मिल्छ। बाँकी ${extraRaw} ग्राम जफत हुनेछ।`;
    }
  }

  breakdown.push({
    category: 'Raw Gold / Bullion / Coins',
    categoryNe: 'काँचो सुन (सिक्का / पाता / बिस्कुट)',
    declared: `${input.rawGoldGrams} grams`,
    dutyFreeLimit: '0 grams (No exemption)',
    taxableQuantity: `${rawGoldTaxable} grams`,
    dutyPayableNpr: rawGoldDuty,
    status: rawGoldStatus,
    note: rawGoldNote,
    noteNe: rawGoldNoteNe,
  });
  totalDutyNpr += rawGoldDuty;

  // 3. Silver Ornaments (चाँदीका गहना)
  const freeSilver = 100;
  let silverDuty = 0;
  let silverTaxable = 0;
  let silverStatus: 'green' | 'yellow' | 'red' = 'green';
  let silverNote = 'Duty free up to 100 grams.';
  let silverNoteNe = '१०० ग्रामसम्म पूर्ण निःशुल्क।';

  if (input.silverOrnamentsGrams > freeSilver) {
    const excess = input.silverOrnamentsGrams - freeSilver;
    if (excess <= 400) {
      silverTaxable = excess;
      silverDuty = Math.round(excess * 10.5); // ~Rs 105 per 10g
      silverStatus = 'yellow';
      silverNote = `Excess ${excess}g taxable at ~NPR 105 per 10 grams.`;
      silverNoteNe = `थप ${excess} ग्राममा प्रति १० ग्राम रु १०५ भन्सार लाग्नेछ।`;
    } else {
      silverTaxable = 400;
      silverDuty = 400 * 10.5;
      silverStatus = 'red';
      hasRiskOfConfiscation = true;
      warnings.push(`Carrying over 500g silver ornaments exceeds passenger baggage allowances.`);
      silverNote = 'Over 500g total silver requires formal commercial import clearance.';
      silverNoteNe = '५०० ग्रामभन्दा बढी चाँदी व्यापारिक पैठारी मानिन्छ।';
    }
  }

  breakdown.push({
    category: 'Silver Ornaments',
    categoryNe: 'चाँदीका गहना तथा भाँडाकुँडा',
    declared: `${input.silverOrnamentsGrams} grams`,
    dutyFreeLimit: '100 grams',
    taxableQuantity: `${silverTaxable} grams`,
    dutyPayableNpr: silverDuty,
    status: silverStatus,
    note: silverNote,
    noteNe: silverNoteNe,
  });
  totalDutyNpr += silverDuty;

  // 4. Mobile Phones (Smartphones / iPhone / Android)
  const freePhoneCount = isMigrant6Mo ? 2 : 1;
  let phoneDuty = 0;
  let phoneTaxable = 0;
  let phoneStatus: 'green' | 'yellow' | 'red' = 'green';
  let phoneNote = isMigrant6Mo ? '2 phones duty-free with valid Foreign Labor Permit (श्रम स्वीकृति).' : '1 personal phone duty-free.';
  let phoneNoteNe = isMigrant6Mo ? 'श्रम स्वीकृति भएका श्रमिकलाई २ वटा फोनसम्म निःशुल्क।' : 'साधारण यात्रुलाई १ वटा व्यक्तिगत फोन निःशुल्क।';

  if (input.smartphonesCount > freePhoneCount) {
    phoneTaxable = input.smartphonesCount - freePhoneCount;
    // Flat MDMS customs duty ~NPR 10,000 per smartphone (Government fixed slab for iPhone / smartphones)
    phoneDuty = phoneTaxable * 10000;
    phoneStatus = 'yellow';
    phoneNote = `${phoneTaxable} extra phone(s) incur flat NPR 10,000 customs tariff + MDMS registration fee.`;
    phoneNoteNe = `थप ${phoneTaxable} वटा फोनमा प्रति फोन रु १०,००० भन्सार तथा MDMS दर्ता शुल्क लाग्नेछ।`;
  }

  breakdown.push({
    category: 'Mobile Phones (Smartphones)',
    categoryNe: 'मोबाइल फोन (स्मार्टफोन / iPhone)',
    declared: `${input.smartphonesCount} phone(s)`,
    dutyFreeLimit: `${freePhoneCount} phone(s)`,
    taxableQuantity: `${phoneTaxable} phone(s)`,
    dutyPayableNpr: phoneDuty,
    status: phoneStatus,
    note: phoneNote,
    noteNe: phoneNoteNe,
  });
  totalDutyNpr += phoneDuty;

  // 5. Laptops & Tablets
  const freeLaptopCount = 1;
  let laptopDuty = 0;
  let laptopTaxable = 0;
  let laptopStatus: 'green' | 'yellow' | 'red' = 'green';
  let laptopNote = '1 laptop and 1 tablet 100% duty-free for all passengers.';
  let laptopNoteNe = '१ थान ल्यापटप र १ थान ट्याब्लेट पूर्ण निःशुल्क।';

  if (input.laptopsCount > freeLaptopCount) {
    laptopTaxable = input.laptopsCount - freeLaptopCount;
    // Estimated 13% VAT + customs ~NPR 8,500 per additional personal laptop
    laptopDuty = laptopTaxable * 8500;
    laptopStatus = 'yellow';
    laptopNote = `${laptopTaxable} additional laptop(s) subject to 13% VAT and customs clearance (~NPR 8,500/unit).`;
    laptopNoteNe = `थप ल्यापटपमा १३% भ्याट तथा भन्सार लाग्नेछ।`;
  }

  breakdown.push({
    category: 'Laptops & Computing Devices',
    categoryNe: 'ल्यापटप तथा ट्याब्लेट',
    declared: `${input.laptopsCount} laptop(s)`,
    dutyFreeLimit: '1 laptop',
    taxableQuantity: `${laptopTaxable} laptop(s)`,
    dutyPayableNpr: laptopDuty,
    status: laptopStatus,
    note: laptopNote,
    noteNe: laptopNoteNe,
  });
  totalDutyNpr += laptopDuty;

  // 6. Television (TV)
  let tvDuty = 0;
  let tvStatus: 'green' | 'yellow' | 'red' = 'green';
  let tvNote = 'No television declared.';
  let tvNoteNe = 'टिभी घोषणा गरिएको छैन।';

  if (input.tvSizeInches > 0) {
    if (isMigrant12Mo && input.tvSizeInches <= 32) {
      tvStatus = 'green';
      tvNote = '1 TV up to 32 inches is 100% duty-free for workers returning after 12+ months on labor permit!';
      tvNoteNe = '१ वर्षभन्दा बढी श्रम स्वीकृति भएका कामदारलाई ३२ इन्चसम्मको टिभी पूर्ण निःशुल्क!';
    } else {
      // Duty based on TV size
      if (input.tvSizeInches <= 32) {
        tvDuty = 4500;
        tvNote = 'General traveler rate for 32" TV: NPR 4,500 customs tariff.';
        tvNoteNe = 'साधारण यात्रुको ३२ इन्च टिभीमा रु ४,५०० भन्सार महसुल।';
      } else if (input.tvSizeInches <= 43) {
        tvDuty = 9500;
        tvNote = '33" - 43" TV tariff: approx NPR 9,500 customs + VAT.';
        tvNoteNe = '३३ देखि ४३ इन्च टिभीमा करिब रु ९,५०० भन्सार।';
      } else if (input.tvSizeInches <= 55) {
        tvDuty = 16500;
        tvNote = '44" - 55" TV tariff: approx NPR 16,500 customs + VAT.';
        tvNoteNe = '४४ देखि ५५ इन्च टिभीमा करिब रु १६,५०० भन्सार।';
      } else {
        tvDuty = 28000;
        tvNote = '56"+ Large TV tariff: approx NPR 28,000 customs + luxury tax.';
        tvNoteNe = '५६ इन्चभन्दा ठूलो टिभीमा करिब रु २८,००० भन्सार।';
      }
      tvStatus = 'yellow';
    }
  }

  breakdown.push({
    category: 'Television (LED / Smart TV)',
    categoryNe: 'टेलिभिजन (LED / Smart TV)',
    declared: input.tvSizeInches > 0 ? `${input.tvSizeInches} inches` : 'None',
    dutyFreeLimit: isMigrant12Mo ? 'Up to 32" (12+ Mo Labor)' : '0" (Taxable)',
    taxableQuantity: input.tvSizeInches > 0 && tvDuty > 0 ? '1 TV' : '0',
    dutyPayableNpr: tvDuty,
    status: tvStatus,
    note: tvNote,
    noteNe: tvNoteNe,
  });
  totalDutyNpr += tvDuty;

  // 7. Alcohol & Liquor (मदिरा)
  let alcoholDuty = 0;
  let alcoholStatus: 'green' | 'yellow' | 'red' = 'green';
  let alcoholNote = '1 liter (1000ml) 100% duty-free for all adult travelers.';
  let alcoholNoteNe = '१ लिटरसम्म मदिरा सबै बालिग यात्रुलाई पूर्ण निःशुल्क।';

  if (input.alcoholLiters > 1) {
    const extraLiters = (input.alcoholLiters - 1).toFixed(1);
    alcoholStatus = 'red';
    hasRiskOfConfiscation = true;
    warnings.push(`PROHIBITED: Under Department of Customs personal baggage rules, carrying more than 1 liter of liquor (${input.alcoholLiters}L declared) is strictly prohibited. The excess ${extraLiters}L will be confiscated at the TIA arrival gate.`);
    alcoholNote = `Excess ${extraLiters}L will be confiscated. Only 1 bottle (1000ml) allowed.`;
    alcoholNoteNe = `१ लिटरभन्दा बढी मदिरा ल्याउन पाइँदैन। बढी भएको मदिरा विमानस्थलमै जफत हुनेछ।`;
  }

  breakdown.push({
    category: 'Alcohol & Liquor',
    categoryNe: 'मदिरा (व्हिस्की / वाइन / भोड्का)',
    declared: `${input.alcoholLiters} Liter(s)`,
    dutyFreeLimit: '1.0 Liter (1 bottle)',
    taxableQuantity: input.alcoholLiters > 1 ? `${(input.alcoholLiters - 1).toFixed(1)} L (Confiscable)` : '0 L',
    dutyPayableNpr: 0,
    status: alcoholStatus,
    note: alcoholNote,
    noteNe: alcoholNoteNe,
  });

  // 8. Cigarettes & Tobacco
  let cigDuty = 0;
  let cigStatus: 'green' | 'yellow' | 'red' = 'green';
  let cigNote = 'Up to 200 sticks (1 carton) duty-free.';
  let cigNoteNe = '२०० खिल्ली (१ कार्टुन) चुरोटसम्म निःशुल्क।';

  if (input.cigaretteSticks > 200) {
    const excess = input.cigaretteSticks - 200;
    cigDuty = Math.round(excess * 8); // ~Rs 8 per stick customs
    cigStatus = 'yellow';
    cigNote = `${excess} excess cigarette sticks taxable at NPR 8/stick.`;
    cigNoteNe = `थप ${excess} खिल्ली चुरोटमा प्रति खिल्ली रु ८ भन्सार लाग्नेछ।`;
  }

  breakdown.push({
    category: 'Cigarettes & Tobacco',
    categoryNe: 'चुरोट तथा सुर्तीजन्य वस्तु',
    declared: `${input.cigaretteSticks} sticks`,
    dutyFreeLimit: '200 sticks (1 carton)',
    taxableQuantity: input.cigaretteSticks > 200 ? `${input.cigaretteSticks - 200} sticks` : '0',
    dutyPayableNpr: cigDuty,
    status: cigStatus,
    note: cigNote,
    noteNe: cigNoteNe,
  });
  totalDutyNpr += cigDuty;

  // 9. Drones
  if (input.hasDrone) {
    hasRiskOfConfiscation = true;
    warnings.push(`DRONE REGULATION: Personal drones cannot be cleared at airport customs without prior written approval from the Civil Aviation Authority of Nepal (CAAN) and the Ministry of Home Affairs. Unapproved drones are retained at TIA customs.`);
  }

  // 10. Cash Currency
  if (input.cashUsd > 5000) {
    warnings.push(`CURRENCY DECLARATION: You declared $${input.cashUsd.toLocaleString()} USD in cash. Nepal Rastra Bank foreign exchange regulations mandate declaring any physical currency exceeding USD 5,000 at the TIA Red Channel.`);
  }

  // Determine overall Channel
  let channel: 'green' | 'red' | 'prohibited' = 'green';
  let channelName = 'Green Channel Clear';
  let channelNameNe = 'ग्रीन च्यानल (भन्सार तिर्नु नपर्ने)';

  if (hasRiskOfConfiscation) {
    channel = 'prohibited';
    channelName = 'Inspection & Red Channel Alert (Risk of Seizure)';
    channelNameNe = 'रातो च्यानल अनिवार्य (जफत वा जरिवाना जोखिम)';
  } else if (totalDutyNpr > 0 || input.cashUsd > 5000) {
    channel = 'red';
    channelName = 'Red Channel (Customs Duty Assessment Required)';
    channelNameNe = 'रेड च्यानल (भन्सार महसुल भुक्तानी आवश्यक)';
  }

  return {
    channel,
    channelName,
    channelNameNe,
    totalDutyNpr,
    hasRiskOfConfiscation,
    warnings,
    breakdown,
  };
}

