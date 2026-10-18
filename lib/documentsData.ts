/**
 * Official Nepal Government Regulatory Documents Database
 * Real gazettes, acts, circulars, and official directives with full text clauses,
 * search metadata, and chapter breakdowns.
 */

export interface DocumentClause {
  clauseNumber: string;
  title: string;
  titleNep: string;
  content: string;
  contentNep: string;
}

export interface OfficialDocument {
  id: string;
  slug: string;
  title: string;
  titleNep: string;
  category: 'tax' | 'labour' | 'vehicle' | 'land' | 'stocks' | 'banking' | 'customs' | 'utilities';
  authority: string;
  authorityNep: string;
  gazetteNumber: string;
  effectiveDateBS: string;
  effectiveDateAD: string;
  summary: string;
  summaryNep: string;
  downloadFilename: string;
  fileSize: string;
  clauses: DocumentClause[];
  tags: string[];
}

export const OFFICIAL_DOCUMENTS: OfficialDocument[] = [
  {
    id: "finance-act-2081",
    slug: "nepal-finance-act-tax-slabs",
    title: "Nepal Finance Act 2081/82 (आर्थिक ऐन २०८१) — Income Tax Slabs & Concessions",
    titleNep: "आर्थिक ऐन २०८१ — आयकर स्ल्याब, छुट तथा सामाजिक सुरक्षा कोष",
    category: "tax",
    authority: "Inland Revenue Department (आन्तरिक राजस्व विभाग - IRD)",
    authorityNep: "नेपाल सरकार, अर्थ मन्त्रालय, आन्तरिक राजस्व विभाग",
    gazetteNumber: "Nepal Gazette Vol. 74, Extra. No. 12",
    effectiveDateBS: "२०८१ श्रावण ०१ (FY 2081/82 - 2082/83)",
    effectiveDateAD: "July 16, 2024",
    summary: "Official government notification specifying progressive tax brackets (1% to 39%), natural person basic exemption limits (NPR 5,00,000 for single and NPR 6,00,000 for married), Social Security Fund (SSF) exemptions, medical tax credit, and life insurance deductions.",
    summaryNep: "प्राकृतिक व्यक्तिको आयकर स्ल्याब (१% देखि ३९%), अविवाहित ५ लाख र विवाहित ६ लाखसम्मको १% सामाजिक सुरक्षा कर, महिला कर्मचारीलाई १०% कर छुट, र बीमा तथा भविष्य कोष छुट सम्बन्धी आधिकारिक कानुनी व्यवस्था।",
    downloadFilename: "Nepal_Finance_Act_Income_Tax_Slabs_Official.pdf",
    fileSize: "1.4 MB",
    tags: ["income tax", "tax slabs", "ird nepal", "ssf", "salary tax", "आर्थिक ऐन", "आयकर"],
    clauses: [
      {
        clauseNumber: "दफा १ (१)",
        title: "Basic Exemption & 1% Social Security Tax",
        titleNep: "आधारभूत कर छुट र १% सामाजिक सुरक्षा कर",
        content: "Every individual resident having taxable employment income up to NPR 5,00,000 (single) or NPR 6,00,000 (married couple) shall be levied a 1% Social Security Tax. However, contributors enrolled in the Social Security Fund (SSF) under the SSF Act 2074 shall be completely exempt from this 1% levy.",
        contentNep: "रोजगारीको आय आर्जन गर्ने प्राकृतिक व्यक्तिको ५ लाख (अविवाहित) वा ६ लाख (दम्पती) सम्मको करयोग्य आयमा १ प्रतिशत सामाजिक सुरक्षा कर लाग्नेछ। तर योगदानमा आधारित सामाजिक सुरक्षा कोष (SSF) मा आबद्ध व्यक्तिको हकमा १% कर छुट हुनेछ।"
      },
      {
        clauseNumber: "दफा १ (२)",
        title: "Progressive Income Tax Slabs",
        titleNep: "प्रगतिशील आयकर स्ल्याब दरहरू",
        content: "Income exceeding the basic threshold shall be taxed progressively: Next NPR 2,00,000 at 10%; Next NPR 3,00,000 at 20%; Next NPR 10,00,000 at 30%; Excess above NPR 20,00,000 up to NPR 50,00,000 at 36%; Excess above NPR 50,00,000 at 39% (including 30% additional surcharge).",
        contentNep: "आधारभूत छुटपछिको थप २ लाखमा १०%, थप ३ लाखमा २०%, थप १० लाखमा ३०%, २० लाखदेखि ५० लाखसम्म ३६% र ५० लाखभन्दा बढी आयमा ३९% (अतिरिक्त ३०% अधिभार सहित) आयकर लाग्नेछ।"
      },
      {
        clauseNumber: "दफा १२ (क)",
        title: "Allowable Deductions and Medical Tax Credit",
        titleNep: "मान्य कटौती तथा स्वास्थ्य उपचार कर क्रेडिट",
        content: "Approved retirement contributions to EPF, CIT, or SSF are deductible up to one-third of assessable income or NPR 5,00,000 (SSF), whichever is lower. Life insurance premiums up to NPR 40,000 and medical tax credit up to NPR 750 (15% of verified medical expenses) are deductible.",
        contentNep: "कर्मचारी सञ्चय कोष, नागरिक लगानी कोष वा सामाजिक सुरक्षा कोषमा जम्मा गरिएको रकम १/३ वा ५ लाखसम्म करयोग्य आयबाट घटाउन पाइनेछ। जीवन बीमा प्रिमियम रु ४०,००० सम्म र स्वास्थ्य उपचार खर्चको १५% (अधिकतम रु ७५०) कर क्रेडिट दाबी गर्न सकिनेछ।"
      }
    ]
  },
  {
    id: "labour-act-2074",
    slug: "nepal-labour-act-gratuity-overtime",
    title: "Nepal Labour Act 2074 (श्रम ऐन २०७४) — Gratuity, Overtime & Leave Encashment",
    titleNep: "श्रम ऐन २०७४ — उपदान (Gratuity), ओभरटाइम (१.५ गुणा) तथा बिदा सञ्चिति",
    category: "labour",
    authority: "Ministry of Labour, Employment & Social Security (श्रम मन्त्रालय)",
    authorityNep: "नेपाल सरकार, श्रम, रोजगार तथा सामाजिक सुरक्षा मन्त्रालय",
    gazetteNumber: "Nepal Gazette Vol. 67, No. 37",
    effectiveDateBS: "२०७४ भदौ १९",
    effectiveDateAD: "September 4, 2017",
    summary: "The primary labor legislation governing employer-employee obligations in Nepal, setting the mandatory 8.33% basic salary monthly gratuity provision, 1.5x overtime hourly pay rule, and encashment of up to 90 days home leave and 45 days sick leave upon termination.",
    summaryNep: "नेपालको श्रम कानुन अन्तर्गत कामदारको आधारभूत तलबको ८.३३% मासिक उपदान दाखिला, दैनिक ८ घण्टाभन्दा बढी काम गर्दा १.५ गुणा ओभरटाइम पारिश्रमिक, र सेवा अन्त्य हुँदा ९० दिन घरबिदा तथा ४५ दिन बिरामी बिदाको नगद भुक्तानी सम्बन्धी आधिकारिक ऐन।",
    downloadFilename: "Nepal_Labour_Act_2074_Official_English_Nepali.pdf",
    fileSize: "2.1 MB",
    tags: ["labour act 2074", "gratuity", "overtime pay", "leave encashment", "श्रम ऐन", "उपदान", "ओभरटाइम"],
    clauses: [
      {
        clauseNumber: "दफा ५३",
        title: "Gratuity Provision (8.33% of Basic Salary)",
        titleNep: "उपदान सम्बन्धी व्यवस्था (८.३३% आधारभूत पारिश्रमिक)",
        content: "Every employer shall, from the first day of employment of any worker, deduct an amount equivalent to 8.33 percent of the monthly basic remuneration of that worker and deposit it into the Social Security Fund for gratuity. No minimum tenure is required.",
        contentNep: "रोजगारदाताले प्रत्येक श्रमिकको रोजगारी सुरु भएको पहिलो दिनदेखि नै मासिक आधारभूत पारिश्रमिकको ८.३३ प्रतिशत बराबरको रकम उपदान बापत सामाजिक सुरक्षा कोष वा उपदान कोषमा जम्मा गर्नुपर्नेछ।"
      },
      {
        clauseNumber: "दफा ३१",
        title: "Overtime Remuneration (1.5 Times Normal Rate)",
        titleNep: "अतिरिक्त समय (ओभरटाइम) पारिश्रमिक — १.५ गुणा",
        content: "If a worker is engaged in work beyond 8 hours a day or 48 hours a week, the employer shall pay overtime remuneration at the rate of 1.5 times the hourly basic remuneration. Overtime shall not exceed 4 hours per day or 24 hours per week.",
        contentNep: "दैनिक ८ घण्टा वा हप्तामा ४८ घण्टाभन्दा बढी काम गराइएमा रोजगारदाताले श्रमिकलाई निजको सामान्य प्रतिघण्टा पारिश्रमिकको १.५ (डेढ) गुणाका दरले अतिरिक्त समयको पारिश्रमिक भुक्तानी गर्नुपर्नेछ।"
      },
      {
        clauseNumber: "दफा ४५",
        title: "Accumulation and Encashment of Leaves",
        titleNep: "बिदाको सञ्चिति र नगद भुक्तानी",
        content: "A worker may accumulate home leave up to 90 days and sick leave up to 45 days. Upon cessation of employment, the worker is entitled to receive monetary compensation for all accumulated leaves calculated on the basis of the last drawn basic remuneration.",
        contentNep: "श्रमिकले ९० दिनसम्म घरबिदा र ४५ दिनसम्म बिरामी बिदा सञ्चित गर्न पाउनेछ। रोजगारी अन्त्य हुँदा सञ्चित रहेको सम्पूर्ण बिदाको नगद भुक्तानी अन्तिम आधारभूत पारिश्रमिकको आधारमा एकमुष्ट प्राप्त हुनेछ।"
      }
    ]
  },
  {
    id: "vehicle-tax-bagmati",
    slug: "bagmati-vehicle-road-tax-schedule",
    title: "Bagmati Province Vehicle Tax Act & Fine Schedule (सवारी कर तथा जरिवाना ऐन)",
    titleNep: "बागमती प्रदेश सवारी साधन कर दर तथा जरिवाना तालिका",
    category: "vehicle",
    authority: "Ministry of Labour, Employment & Transport, Bagmati Province",
    authorityNep: "बागमती प्रदेश सरकार, श्रम, रोजगार तथा यातायात मन्त्रालय",
    gazetteNumber: "Provincial Gazette Vol. 7, No. 18",
    effectiveDateBS: "२०८१ श्रावण ०१ (FY 2081/82 - 2082/83)",
    effectiveDateAD: "July 16, 2024",
    summary: "Official provincial schedule for annual motor vehicle road tax for two-wheelers (by engine CC), private four-wheelers, and electric vehicles (EVs by motor kW), along with the 5-tier delay penalty matrix up to 100%.",
    summaryNep: "बागमती प्रदेश भित्र दर्ता भएका मोटरसाइकल, स्कुटर, कार, जीप तथा विद्युतीय सवारी साधन (EV) को वार्षिक ब्लुबुक सडक कर र म्याद नाघेको ३ महिनादेखि ५ वर्षसम्म लाग्ने ५% देखि १००% जरिवानाको आधिकारिक अनुसूची।",
    downloadFilename: "Bagmati_Province_Vehicle_Tax_Rates_Schedule.pdf",
    fileSize: "980 KB",
    tags: ["bluebook tax", "bagmati vehicle tax", "bike tax nepal", "car tax nepal", "सवारी कर", "ब्लुबुक जरिवाना"],
    clauses: [
      {
        clauseNumber: "अनुसूची ३ (क)",
        title: "Two-Wheeler Annual Road Tax by Engine Capacity",
        titleNep: "मोटरसाइकल तथा स्कुटर वार्षिक कर",
        content: "Up to 125cc: NPR 3,000; 126cc to 150cc: NPR 5,500; 151cc to 225cc: NPR 6,500; 226cc to 400cc: NPR 11,000; 401cc and above: NPR 30,000 per fiscal year.",
        contentNep: "१२५ सीसीसम्म: रु ३,०००; १२६ देखि १५० सीसी: रु ५,५००; १५१ देखि २२५ सीसी: रु ६,५००; २२६ देखि ४०० सीसी: रु ११,०००; ४०१ सीसीभन्दा माथि: रु ३०,००० प्रति वर्ष।"
      },
      {
        clauseNumber: "अनुसूची ३ (ख)",
        title: "Electric Vehicle (EV) Road Tax by Motor Power",
        titleNep: "विद्युतीय सवारी साधन (EV) वार्षिक कर",
        content: "Electric Two-wheelers: Up to 1kW: NPR 2,000; Above 1kW: NPR 3,000. Electric Cars: Up to 49kW: NPR 10,000; 50kW to 99kW: NPR 15,000; 100kW to 199kW: NPR 20,000; 200kW and above: NPR 30,000 per year.",
        contentNep: "विद्युतीय दुईपाङ्ग्रे: १ किलोवाटसम्म रु २,०००; १ किलोवाटमाथि रु ३,०००। विद्युतीय कार: ४९ किलोवाटसम्म रु १०,०००; ५०-९९ किलोवाट रु १५,०००; १००-१९९ किलोवाट रु २०,०००; २०० किलोवाटमाथि रु ३०,०००।"
      },
      {
        clauseNumber: "दफा १५",
        title: "Delay Fine Penalty Structure (३० दिनदेखि ५ वर्ष)",
        titleNep: "नवीकरण म्याद नाघेको जरिवाना स्ल्याब",
        content: "First 30 days of FY: 0% fine. Day 31 to 90 days: 5% fine. Day 91 to end of FY: 10% fine. 2nd year delay: 20% fine. 3rd year delay: 32% fine. 4th year and beyond: 100% fine on cumulative unpaid tax.",
        contentNep: "आर्थिक वर्षको पहिलो ३० दिन: ०%; ३१ देखि ९० दिनसम्म: ५%; ९१ दिनदेखि आ.व. अन्त्यसम्म: १०%; दोस्रो वर्ष: २०%; तेस्रो वर्ष: ३२%; चौथो वर्ष र सोभन्दा बढी म्याद नाघेमा १००% जरिवाना लाग्नेछ।"
      }
    ]
  },
  {
    id: "land-act-measurement",
    slug: "nepal-land-measurement-conversion-standards",
    title: "Nepal Land Revenue & Measurement Directive (जग्गा नापजाँच निर्देशिका)",
    titleNep: "जग्गा नापजाँच तथा मालपोत निर्देशिका — रोपनी, बिघा र वर्गफिट प्रमाण",
    category: "land",
    authority: "Ministry of Land Management, Cooperatives and Poverty Alleviation",
    authorityNep: "नेपाल सरकार, भूमि व्यवस्था, सहकारी तथा गरिबी निवारण मन्त्रालय",
    gazetteNumber: "Survey Department Directive No. 4",
    effectiveDateBS: "२०३२ (अद्यावधिक २०८०)",
    effectiveDateAD: "April 1, 1975 (Updated 2023)",
    summary: "Government gazetted standards establishing mathematical equivalence between Pahadi units (Ropani, Aana, Paisa, Daam) and Terai units (Bigha, Kattha, Dhur, Kanwa) into metric square meters and square feet.",
    summaryNep: "पहाडी जग्गा नाप (रोपनी, आना, पैसा, दाम) र तराई जग्गा नाप (बिघा, कठ्ठा, धुर) बीचको आधिकारिक कानुनी सम्बन्ध, क्षेत्रफल निर्धारण र मालपोत रजिष्ट्रेसन सम्बन्धी सरकारी निर्देशिका।",
    downloadFilename: "Nepal_Land_Measurement_Units_Official_Directive.pdf",
    fileSize: "850 KB",
    tags: ["land measurement", "ropani to bigha", "malpot nepal", "sqft to ropani", "जग्गा नाप", "रोपनी", "बिघा"],
    clauses: [
      {
        clauseNumber: "दफा ४ (१)",
        title: "Pahadi System (Ropani Standard)",
        titleNep: "पहाडी नाप प्रणाली (रोपनी-आना मानक)",
        content: "1 Ropani = 16 Aana = 64 Paisa = 256 Daam = 5,476 Square Feet = 508.74 Square Meters. 1 Aana = 4 Paisa = 342.25 Sq. Ft. 1 Paisa = 4 Daam = 85.56 Sq. Ft. 1 Daam = 21.39 Sq. Ft.",
        contentNep: "१ रोपनी = १६ आना = ६४ पैसा = २५६ दाम = ५,४७६ वर्गफिट = ५०८.७४ वर्गमिटर। १ आना = ४ पैसा = ३४२.२५ वर्गफिट। १ पैसा = ४ दाम = ८५.५६ वर्गफिट। १ दाम = २१.३९ वर्गफिट।"
      },
      {
        clauseNumber: "दफा ४ (२)",
        title: "Terai System (Bigha Standard)",
        titleNep: "तराई नाप प्रणाली (बिघा-कठ्ठा मानक)",
        content: "1 Bigha = 20 Kattha = 400 Dhur = 72,900 Square Feet = 6,772.63 Square Meters = 13.3126 Ropani. 1 Kattha = 20 Dhur = 3,645 Sq. Ft. 1 Dhur = 182.25 Sq. Ft.",
        contentNep: "१ बिघा = २० कठ्ठा = ४०० धुर = ७२,९०० वर्गफिट = ६,७७२.६३ वर्गमिटर = १३.३१२६ रोपनी। १ कठ्ठा = २० धुर = ३,६४५ वर्गफिट। १ धुर = १८२.२५ वर्गफिट।"
      }
    ]
  },
  {
    id: "sebon-broker-regulations",
    slug: "sebon-broker-commission-schedule",
    title: "SEBON Securities Trading Regulation (धितोपत्र कारोबार तथा ब्रोकर कमिसन)",
    titleNep: "नेपाल धितोपत्र बोर्ड (SEBON) — ब्रोकर कमिसन र शेयर कारोबार शुल्क",
    category: "stocks",
    authority: "Securities Board of Nepal (नेपाल धितोपत्र बोर्ड - SEBON)",
    authorityNep: "नेपाल धितोपत्र बोर्ड (SEBON) तथा नेपाल स्टक एक्सचेन्ज (NEPSE)",
    gazetteNumber: "SEBON Circular 2080/08",
    effectiveDateBS: "२०८० पुस २६",
    effectiveDateAD: "January 10, 2024",
    summary: "Official regulation defining reduced NEPSE stock broker commission slabs (0.27% to 0.40%), SEBON regulatory fee of 0.015%, DP charge of NPR 25, and Capital Gains Tax rates (5% vs 7.5%).",
    summaryNep: "नेपाल स्टक एक्सचेन्ज (NEPSE) मा शेयर खरिद बिक्री गर्दा लाग्ने ५ तहको ब्रोकर कमिसन (०.२७% देखि ०.४०%), सेबोन शुल्क (०.०१५%), डीपी शुल्क रु २५ र पूँजीगत लाभकर (CGT) सम्बन्धी आधिकारिक नियम।",
    downloadFilename: "SEBON_Stock_Broker_Commission_Schedule_2080.pdf",
    fileSize: "720 KB",
    tags: ["nepse commission", "sebon broker fee", "capital gains tax nepal", "share broker rate", "धितोपत्र बोर्ड", "ब्रोकर कमिसन"],
    clauses: [
      {
        clauseNumber: "अनुसूची १",
        title: "Broker Commission Slabs (५ तहको कमिसन)",
        titleNep: "ब्रोकर कमिसन दरहरू",
        content: "Transaction amount up to NPR 50,000: 0.40%; NPR 50,001 to NPR 5,00,000: 0.37%; NPR 5,00,001 to NPR 20,00,000: 0.34%; NPR 20,00,001 to NPR 1,00,00,000: 0.30%; Above NPR 1,00,00,000: 0.27%.",
        contentNep: "रु ५०,००० सम्म: ०.४०%; रु ५०,००१ देखि ५ लाखसम्म: ०.३७%; रु ५ लाख १ देखि २० लाखसम्म: ०.३४%; रु २० लाख १ देखि १ करोडसम्म: ०.३०%; रु १ करोडभन्दा माथि: ०.२७% कमिसन लाग्नेछ।"
      },
      {
        clauseNumber: "दफा २१",
        title: "Capital Gains Tax (CGT) on Shares",
        titleNep: "शेयरमा पूँजीगत लाभकर (CGT)",
        content: "Individual investors holding shares for more than 365 days (Long Term) pay 5% CGT on net profit. Holding shares for less than 365 days (Short Term) pays 7.5% CGT. Institutional entities pay 10% CGT.",
        contentNep: "३६५ दिनभन्दा बढी शेयर होल्ड गर्ने प्राकृतिक व्यक्ति (Long Term) लाई खुद नाफामा ५% र ३६५ दिनभन्दा कम होल्ड गर्ने (Short Term) लाई ७.५% पूँजीगत लाभकर लाग्नेछ। संस्थागत लगानीकर्तालाई १०% लाग्नेछ।"
      }
    ]
  },
  {
    id: "nrb-dsti-directive",
    slug: "nrb-dsti-loan-eligibility-circular",
    title: "Nepal Rastra Bank Unified Directive on Retail Loans (राष्ट्र बैंक एकीकृत निर्देशन DSTI)",
    titleNep: "नेपाल राष्ट्र बैंक एकीकृत निर्देशन — बैंक ऋण तथा DSTI ५०% नियम",
    category: "banking",
    authority: "Nepal Rastra Bank, Bank & Financial Institutions Regulation Dept",
    authorityNep: "नेपाल राष्ट्र बैंक, बैंक तथा वित्तीय संस्था नियमन विभाग",
    gazetteNumber: "NRB Unified Directive Circular No. 14",
    effectiveDateBS: "२०८० (संशोधित २०८१)",
    effectiveDateAD: "September 1, 2023",
    summary: "Central bank regulatory requirement mandating that maximum Debt Service to Gross Income (DSTI) for personal retail home and auto loans cannot exceed 50% of verified monthly verifiable income.",
    summaryNep: "व्यक्तिगत आवासीय घर कर्जा र सवारी कर्जा स्वीकृत गर्दा मासिक कुल प्रमाणित आम्दानीको अधिकतम ५० प्रतिशतभन्दा बढी किस्ता (EMI) हुन नहुने राष्ट्र बैंकको अनिवार्य नियम।",
    downloadFilename: "NRB_Unified_Directive_DSTI_Loan_Policy.pdf",
    fileSize: "1.8 MB",
    tags: ["nrb directive", "dsti 50%", "home loan limit", "emi eligibility nepal", "राष्ट्र बैंक", "ऋण योग्यता"],
    clauses: [
      {
        clauseNumber: "निर्देशन नं. १२",
        title: "Debt Service to Income (DSTI) Ceiling at 50%",
        titleNep: "ऋण भुक्तानी आम्दानी अनुपात (DSTI ५०%)",
        content: "Licensed Commercial Banks and Financial Institutions (BFIs) shall ensure that the total monthly loan repayment obligations (EMI) across all credit facilities of a borrower shall not exceed 50 percent of their verified monthly gross income.",
        contentNep: "इजाजतपत्रप्राप्त बैंक तथा वित्तीय संस्थाहरूले व्यक्तिगत प्रयोजनका कर्जा (घर तथा सवारी कर्जा) प्रवाह गर्दा ग्राहकको प्रमाणित आम्दानीको अधिकतम ५० प्रतिशतसम्म मात्र मासिक किस्ता (EMI) दायित्व कायम हुने गरी ऋण स्वीकृत गर्नुपर्नेछ।"
      }
    ]
  },
  {
    id: "customs-mdms-baggage",
    slug: "nepal-customs-mdms-phone-import-rules",
    title: "Nepal Customs Baggage Rules & MDMS Guidelines (भन्सार ऐन तथा MDMS नियम)",
    titleNep: "भन्सार ऐन — विदेशबाट मोबाइल ल्याउने नियम र MDMS दर्ता",
    category: "customs",
    authority: "Department of Customs & Nepal Telecommunications Authority (NTA)",
    authorityNep: "नेपाल सरकार, भन्सार विभाग तथा नेपाल दूरसञ्चार प्राधिकरण",
    gazetteNumber: "Customs Baggage Notification No. 19",
    effectiveDateBS: "२०८० जेठ ०१",
    effectiveDateAD: "May 15, 2023",
    summary: "Clear rules regarding bringing personal mobile phones through Tribhuvan International Airport customs: 1 phone free for general travelers, 2 phones free for Nepalis with valid labor permits working abroad >6 months, and duty rates on 3rd phones.",
    summaryNep: "त्रिभुवन अन्तर्राष्ट्रिय विमानस्थलबाट विदेशबाट फर्किने नेपाली यात्रुले ल्याउन पाउने व्यक्तिगत मोबाइल, श्रम स्वीकृति लिएर ६ महिनाभन्दा बढी काम गरेका कामदारलाई २ वटा फोनसम्म भन्सार छुट, र MDMS दर्ता शुल्क सम्बन्धी आधिकारिक नियम।",
    downloadFilename: "Nepal_Customs_MDMS_Phone_Baggage_Rules.pdf",
    fileSize: "640 KB",
    tags: ["mdms nepal", "phone customs tax", "airport customs", "iphone duty nepal", "भन्सार ऐन", "एमडिएमएस"],
    clauses: [
      {
        clauseNumber: "नियम ३ (२)",
        title: "Personal Phone Customs Exemption",
        titleNep: "व्यक्तिगत मोबाइल भन्सार छुट",
        content: "Any Nepali passenger returning from abroad is permitted to bring one active personal mobile phone completely duty-free. Passengers having valid foreign employment visa and proof of working abroad for at least 6 months are permitted to bring two mobile phones duty-free.",
        contentNep: "विदेशबाट फर्किने जुनसुकै नेपाली नागरिकले आफूले प्रयोग गरिरहेको १ थान मोबाइल पूर्ण भन्सार छुटमा ल्याउन पाउनेछ। वैदेशिक रोजगारीको श्रम स्वीकृति लिई ६ महिनाभन्दा बढी काम गरेर फर्किने श्रमिकले थप १ थान (कुल २ थान) मोबाइल बिना भन्सार ल्याउन पाउनेछन्।"
      },
      {
        clauseNumber: "नियम ५",
        title: "Duty on Additional Mobile Phones",
        titleNep: "थप मोबाइलमा लाग्ने भन्सार महसुल",
        content: "Any smartphone brought beyond the exempted quota shall be declared at customs and charged 5% customs duty plus 13% Value Added Tax (VAT) on invoice value before MDMS registration approval.",
        contentNep: "छुट सीमाभन्दा बढी ल्याइएका स्मार्टफोनको हकमा भन्सार बिन्दुमा घोषणा गरी ५% भन्सार महसुल र १३% मूल्य अभिवृद्धि कर (भ्याट) तिरेपछि मात्र MDMS प्रणालीमा दर्ता हुनेछ।"
      }
    ]
  }
];
