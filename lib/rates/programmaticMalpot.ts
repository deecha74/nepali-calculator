export interface ProgrammaticMalpot {
  slug: string;
  locationOrType: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  keywords: string[];
  registrationFeeRate: string;
  localGovServiceFee: string;
  femaleRebatePercent: string;
  cgtRate: string;
  headlineAnswer: string;
  faqs: { question: string; answer: string }[];
}

export const PROGRAMMATIC_MALPOT_SCENARIOS: ProgrammaticMalpot[] = [
  {
    slug: "land-registration-tax-kathmandu-valley",
    locationOrType: "Kathmandu Valley (Metropolitan)",
    title: "Land Registration Tax in Kathmandu Valley (काठमाडौँ जग्गा पास खर्च) — Malpot Rate",
    shortTitle: "Kathmandu Valley Land Pass Fee",
    metaDescription: "Calculate Malpot land registration deed pass fee in Kathmandu Valley (KMC). 5% registration fee, 0.5% local service tax, female 25% rebate, and CGT rules.",
    keywords: ["land registration tax kathmandu valley", "malpot fee kathmandu", "jagga pass kharcha kathmandu", "kathmandu land registration rate", "dilli bazar malpot rate"],
    registrationFeeRate: "5.0% of Taxable Valuation",
    localGovServiceFee: "0.5% Local Infrastructure Tax",
    femaleRebatePercent: "25% Exemption on Registration Fee",
    cgtRate: "5% (Held > 5 Yrs) or 7.5% (Held < 5 Yrs)",
    headlineAnswer: "Registering a land deed (राजीनामा पास) in Kathmandu Metropolitan City incurs a 5.0% registration fee on the deed valuation (or government minimum valuation, whichever is higher), plus a 0.5% local government fee (total 5.5%). If registered under a woman's name, an instant 25% discount applies to the registration fee (net 3.75% + 0.5% = 4.25%).",
    faqs: [
      {
        question: "Is land tax calculated on the transaction price or government rate in Kathmandu?",
        answer: "Under Department of Land Management and Archive (DoLMA) directives, land deed registration tax is calculated on the HIGHER amount between the official government minimum valuation (सरकारी न्यूनतम मूल्याङ्कन) and the declared transaction deed price.",
      },
      {
        question: "Who pays the Capital Gains Tax (CGT) at Malpot?",
        answer: "Capital Gains Tax (पूँजीगत लाभकर) is the legal responsibility of the SELLER. For individual sellers, CGT is 5% of net profit if owned for more than 5 years, or 7.5% if owned for less than 5 years. Residential houses owned for over 10 years are exempt up to statutory limits.",
      },
    ],
  },
  {
    slug: "land-registration-tax-lalitpur",
    locationOrType: "Lalitpur Metropolitan City (ललितपुर महानगरपालिका)",
    title: "Land Registration Tax in Lalitpur (ललितपुर जग्गा पास दस्तुर) — Malpot Rates",
    shortTitle: "Lalitpur Land Pass Fee",
    metaDescription: "Check Malpot deed registration fees for Lalitpur Metropolitan City (Lagankhel). Base 5% registration fee, 25% female concession, and Capital Gains Tax rates.",
    keywords: ["land registration tax lalitpur", "lagankhel malpot pass fee", "lalitpur jagga pass kharcha", "land tax lalitpur metropolitan"],
    registrationFeeRate: "5.0% Registration Fee",
    localGovServiceFee: "0.5% Local Service Fee",
    femaleRebatePercent: "25% Exemption for Female Ownership",
    cgtRate: "5% (>5 yrs) / 7.5% (<5 yrs)",
    headlineAnswer: "In Lalitpur Metropolitan City, land deed registration requires 5.0% registration tax plus 0.5% local service fee (total 5.5%). Female buyers receive a 25% concession on the registration fee, bringing the effective registration tax down to 3.75%.",
    faqs: [
      {
        question: "Which Land Revenue Office handles Lalitpur property registration?",
        answer: "Land deeds in Lalitpur are registered at the Lagankhel Land Revenue Office (मालपोत कार्यालय लगनखेल) or Gotikhel branch depending on municipality ward jurisdictions.",
      },
    ],
  },
  {
    slug: "land-registration-tax-bhaktapur",
    locationOrType: "Bhaktapur District (भक्तपुर जिल्ला)",
    title: "Land Registration Tax in Bhaktapur (भक्तपुर जग्गा रजिष्ट्रेसन शुल्क)",
    shortTitle: "Bhaktapur Land Pass Fee",
    metaDescription: "Calculate Malpot land registration fees in Bhaktapur, Madhyapur Thimi, Suryabinayak, and Changunarayan. Valuation rules and 25% female rebate.",
    keywords: ["land registration tax bhaktapur", "bhaktapur malpot pass fee", "suryabinayak jagga pass tax", "thimi land registration fee"],
    registrationFeeRate: "4.5% to 5.0% (Municipality depending)",
    localGovServiceFee: "0.5% Local Surcharge",
    femaleRebatePercent: "25% Female Ownership Rebate",
    cgtRate: "5% or 7.5% on Capital Gain",
    headlineAnswer: "Land registration across Bhaktapur district ranges from 4.5% in standard municipalities (Changunarayan, Suryabinayak, Madhyapur Thimi) to 5.0% in core municipal zones, plus a 0.5% local service levy.",
    faqs: [
      {
        question: "Does the 25% female rebate apply across all Bhaktapur municipalities?",
        answer: "Yes, the 25% registration fee concession for female land ownership is mandated nationwide by the Federal Finance Act and applied uniformly by DoLMA offices.",
      },
    ],
  },
  {
    slug: "land-registration-charges-terai-municipalities",
    locationOrType: "Terai Municipalities (तराई नगरपालिका)",
    title: "Land Registration Charges in Terai Municipalities (तराई जग्गा पास खर्च)",
    shortTitle: "Terai Land Registration Fee",
    metaDescription: "Malpot pass charges and deed transfer fees in Terai urban municipalities (Chitwan, Butwal, Biratnagar, Birgunj, Nepalgunj). 4.5% registration tax.",
    keywords: ["land registration charges terai municipalities", "terai jagga pass kharcha", "chitwan malpot pass rate", "biratnagar land registration fee"],
    registrationFeeRate: "4.5% of Registered Valuation",
    localGovServiceFee: "0.5% Local Municipality Charge",
    femaleRebatePercent: "25% Rebate (up to 35% in designated districts)",
    cgtRate: "5% (Over 5 Years) / 7.5% (Under 5 Years)",
    headlineAnswer: "For Terai urban municipalities (including Bharatpur, Biratnagar, Butwal, Birgunj, and Dhangadhi), standard deed pass registration tax is 4.5% plus a 0.5% local government fee. Female property registrants pay 3.375% registration fee after a 25% statutory rebate.",
    faqs: [
      {
        question: "How is Terai agricultural land (Bigha-Kattha-Dhur) valued for registration?",
        answer: "Land Revenue Offices in Terai classify land into road-access commercial (बाटो भएको), residential plotting, and agricultural (खेत/नम्बरि जग्गा) with specific minimum rate tables per Kattha or Bigha updated annually.",
      },
    ],
  },
  {
    slug: "land-registration-charges-rural-municipality-nepal",
    locationOrType: "Rural Municipalities (गाउँपालिका)",
    title: "Land Registration Charges in Rural Municipalities (गाउँपालिका जग्गा पास दस्तुर)",
    shortTitle: "Rural Municipality Land Pass Fee",
    metaDescription: "Calculate land deed pass fee in rural municipalities (गाउँपालिका) of Nepal. 2.0% lowest registration rate, 25% female ownership discount, and exemptions.",
    keywords: ["land registration charges rural municipality nepal", "gaunpalika jagga pass d宽stur", "rural land tax nepal", "malpot gaunpalika pass rate"],
    registrationFeeRate: "2.0% Registration Fee",
    localGovServiceFee: "0.5% Local Surcharge",
    femaleRebatePercent: "25% to 50% Concession",
    cgtRate: "5% or 7.5% (Exempt if below capital gains threshold)",
    headlineAnswer: "In designated Rural Municipalities (गाउँपालिका) across Nepal, land deed registration tax is capped at just 2.0% of the property valuation, making rural property transfers the most affordable in the country.",
    faqs: [
      {
        question: "Are rural agricultural inheritance transfers taxed in Nepal?",
        answer: "Family ancestral inheritance (अंशबन्डा) in rural municipalities incurs minimal symbolic registration fees (often NPR 500 to 1,000) rather than commercial percentage deed rates.",
      },
    ],
  },
  {
    slug: "capital-gains-tax-on-land-sale-nepal",
    locationOrType: "Capital Gains Tax (पूँजीगत लाभकर)",
    title: "Capital Gains Tax on Land Sale in Nepal (जग्गा बिक्री पूँजीगत लाभकर) — 5% vs 7.5%",
    shortTitle: "Land Capital Gains Tax (CGT)",
    metaDescription: "Calculate Capital Gains Tax (CGT) on real estate and land sales in Nepal. 5% tax for ownership over 5 years vs 7.5% under 5 years, allowable deductions, and exemptions.",
    keywords: ["capital gains tax on land sale nepal", "cgt on property sale nepal", "jagga bikri punjigat labhkar", "land cgt 5 percent 7.5 percent nepal"],
    registrationFeeRate: "Seller's Responsibility (Separate from Buyer's Pass Fee)",
    localGovServiceFee: "None (Direct IRD Inland Revenue Deposit)",
    femaleRebatePercent: "Not Applicable to CGT",
    cgtRate: "5.0% (Holding > 5 Years) | 7.5% (Holding ≤ 5 Years) | 1.5% Corporate",
    headlineAnswer: "Capital Gains Tax on real estate in Nepal is 5.0% of net capital profit if the property was owned for more than 5 years, and 7.5% if owned for 5 years or less. Profit is calculated as Sale Consideration minus (Original Purchase Price + Registered Development Costs).",
    faqs: [
      {
        question: "Is primary residence exempt from Capital Gains Tax in Nepal?",
        answer: "Yes, under the Income Tax Act 2058, if an individual sells a private residential house and land that has been continuously owned and resided in for at least 10 years, and the sale price is up to NPR 1 Crore, the capital gain is 100% exempt from CGT.",
      },
    ],
  },
  {
    slug: "female-ownership-land-rebate-nepal",
    locationOrType: "Female Property Rebate (महिला जग्गा रजिस्ट्रेसन छुट)",
    title: "Female Ownership Land Registration Rebate in Nepal (महिलाको नाममा जग्गा पास छुट)",
    shortTitle: "Female Land Pass Rebate",
    metaDescription: "How much discount do women get for land registration in Nepal? Understand the 25% to 50% registration fee exemption under the Finance Act.",
    keywords: ["female ownership land rebate nepal", "mahila ko nam ma jagga pass chut", "women property registration discount nepal", "25 percent female rebate land"],
    registrationFeeRate: "25% Flat Concession across Metros & Municipalities",
    localGovServiceFee: "0.5% (Unchanged)",
    femaleRebatePercent: "25% Standard (Up to 50% for single women / backward regions)",
    cgtRate: "Standard 5% or 7.5% on Sale",
    headlineAnswer: "To promote female asset ownership, Nepal's Finance Act provides a mandatory 25% discount on the land registration fee when a property is registered solely or jointly in a woman's name. In Karnali and remote districts, this rebate reaches up to 50%.",
    faqs: [
      {
        question: "Can a husband and wife register land jointly to get the female discount?",
        answer: "Yes, joint ownership deeds (संयुक्त दर्ता) between husband and wife are eligible for the 25% registration fee discount at all Land Revenue Offices in Nepal.",
      },
    ],
  },
  {
    slug: "property-transfer-tax-blood-relation-nepal",
    locationOrType: "Blood-Relation Deed Transfer (अंशबन्डा / बकसपत्र)",
    title: "Property Transfer Tax for Blood Relations in Nepal (अंशबन्डा र बकसपत्र पास खर्च)",
    shortTitle: "Blood Relation Transfer Tax",
    metaDescription: "Calculate Malpot registration fees for transferring land between close blood relations in Nepal. Bakaspatra (बकसपत्र), Chhodpatra (छोडपत्र), and Anshabanda rates.",
    keywords: ["property transfer tax blood relation nepal", "bakaspatra registration fee nepal", "anshabanda malpot fee", "land gift tax nepal family"],
    registrationFeeRate: "0.5% to 1.5% (Nominal family transfer rates)",
    localGovServiceFee: "Nominal local administrative fee",
    femaleRebatePercent: "Applicable on eligible deed categories",
    cgtRate: "Exempt for direct ancestral inheritance / partition",
    headlineAnswer: "Transferring land among immediate family members (parents, children, spouses) through Bakaspatra (बकसपत्र / Gift Deed) or Anshabanda (अंशबन्डा / Ancestral Partition) incurs heavily subsidized rates of just 0.5% to 1.5% registration fee, rather than the 5% commercial sales rate.",
    faqs: [
      {
        question: "What legal documents are required to prove blood relation at Malpot?",
        answer: "You must present an official Relationship Verification Certificate (नाता प्रमाणित प्रमाणपत्र) issued by your local Ward Office, along with Citizenship certificates and land title deed (लालपुर्जा).",
      },
    ],
  },
];

