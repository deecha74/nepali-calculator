// DOTM Nepal Driving License Official Question Bank (यातायात व्यवस्था विभाग लिखित परीक्षा प्रश्न संग्रह)
// Comprehensive collection covering Categories A/K (Motorcycle/Scooter) and B (Car/Jeep/Van)

export interface Question {
  id: number;
  questionNep: string;
  questionEng: string;
  category: 'signs' | 'rules' | 'driving' | 'technical' | 'accidents' | 'environment';
  categoryLabelNep: string;
  categoryLabelEng: string;
  optionsNep: string[];
  optionsEng: string[];
  correctIndex: number;
  explanationNep: string;
  explanationEng: string;
  signSymbol?: string;
  signType?: 'prohibitory' | 'warning' | 'informative';
  vehicleCategory?: 'both' | 'bike' | 'car';
}

export const DOTM_CATEGORIES = [
  { id: 'all', nameNep: 'सबै प्रश्नहरू (All)', nameEng: 'All Questions', count: 0 },
  { id: 'signs', nameNep: 'ट्राफिक संकेत (Road Signs)', nameEng: 'Road Signs & Markings', icon: '🛑' },
  { id: 'rules', nameNep: 'ऐन तथा नियम (Traffic Laws)', nameEng: 'Rules & Penalties', icon: '📜' },
  { id: 'driving', nameNep: 'सवारी सञ्चालन (Driving Knowledge)', nameEng: 'Vehicle Operation', icon: '🚗' },
  { id: 'technical', nameNep: 'यान्त्रिक ज्ञान (Mechanical)', nameEng: 'Vehicle Mechanics', icon: '🔧' },
  { id: 'accidents', nameNep: 'दुर्घटना र सुरक्षा (Accidents & Safety)', nameEng: 'Accident & First Aid', icon: '🚑' },
  { id: 'environment', nameNep: 'वातावरण प्रदूषण (Pollution)', nameEng: 'Environmental Pollution', icon: '🌱' },
];

export const ALL_DOTM_QUESTIONS: Question[] = [
  // ==========================================
  // 1. TRAFFIC SIGNS & MARKINGS (ट्राफिक संकेत)
  // ==========================================
  {
    id: 1,
    questionNep: "ट्राफिक संकेतमा रातो बत्ती (Red Light) को अर्थ के हो?",
    questionEng: "What does a red traffic light indicate?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["सवारी अगाडि बढाउने", "सवारी पूर्ण रूपमा रोक्ने", "गति तीव्र गर्ने", "सावधानीपूर्वक अघि बढ्ने"],
    optionsEng: ["Proceed forward", "Stop the vehicle completely", "Speed up", "Proceed cautiously"],
    correctIndex: 1,
    explanationNep: "रातो बत्ती बलेको अवस्थामा सवारी साधन जेब्रा क्रसिङ वा स्टप लाइन अगाडि अनिवार्य रोक्नुपर्छ।",
    explanationEng: "A red traffic signal requires a complete stop behind the stop line or pedestrian crossing.",
    signSymbol: "🔴"
  },
  {
    id: 2,
    questionNep: "ट्राफिक संकेतमा पहेंलो बत्ती (Amber/Yellow Light) बलेमा चालकले के गर्नुपर्छ?",
    questionEng: "What should you do when the traffic light turns yellow/amber?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["झन् गति बढाएर क्रस गर्ने", "सुरक्षित तरिकाले रोकिने तयारी गर्ने", "रिभर्स गर्ने", "दायाँ तर्फ मोड्ने"],
    optionsEng: ["Accelerate to beat the light", "Prepare to stop safely", "Reverse vehicle", "Turn right immediately"],
    correctIndex: 1,
    explanationNep: "पहेंलो बत्तीले रातो बत्ती बल्न लागेको पूर्वसंकेत गर्दछ, त्यसैले रोकिन तयार हुनुपर्छ।",
    explanationEng: "Amber indicates caution that the red light is imminent; stop if it is safe to do so.",
    signSymbol: "🟡"
  },
  {
    id: 3,
    questionNep: "ट्राफिक संकेतमा हरियो बत्ती (Green Light) बलेको अवस्थामा के बुझिन्छ?",
    questionEng: "What does a green traffic signal mean?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["सवारी रोक्ने", "बाटो सुरक्षित भए अघि बढ्ने", "हर्न बजाउने", "पछाडि फर्किने"],
    optionsEng: ["Stop vehicle", "Proceed if intersection is clear", "Honk horn", "Turn back"],
    correctIndex: 1,
    explanationNep: "हरियो बत्तीले बाटो सफा भएमा सिधा जान वा सुरक्षित रूपमा मोडिन अनुमति दिन्छ।",
    explanationEng: "Green authorizes vehicles to proceed through the junction if the way is clear.",
    signSymbol: "🟢"
  },
  {
    id: 4,
    questionNep: "अष्टकोण (Octagon - आठकुने) आकारको रातो ट्राफिक चिन्हले के जनाउँछ?",
    questionEng: "What does an octagonal red road sign indicate?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["गति सीमा", "रोक्नुहोस् (STOP)", "बाटो दिनुहोस् (GIVE WAY)", "नो पार्किङ"],
    optionsEng: ["Speed Limit", "STOP mandatory", "GIVE WAY", "No Parking"],
    correctIndex: 1,
    explanationNep: "आठकुने चिन्ह 'STOP' (रोक्नुहोस्) को लागि अन्तर्राष्ट्रिय मानक अनिवार्य आदेशात्मक चिन्ह हो।",
    explanationEng: "The octagon shape is uniquely reserved worldwide for the mandatory STOP sign.",
    signSymbol: "🛑",
    signType: 'prohibitory'
  },
  {
    id: 5,
    questionNep: "उल्टो त्रिकोण (Inverted Triangle) ट्राफिक चिन्हले के जनाउँछ?",
    questionEng: "What does an inverted triangular road sign indicate?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["बाटो दिनुहोस् (GIVE WAY)", "गाडी रोक्नुहोस्", "अगाडि विद्यालय छ", "एकतर्फी बाटो"],
    optionsEng: ["Give Way / Yield", "Stop vehicle", "School ahead", "One way street"],
    correctIndex: 0,
    explanationNep: "उल्टो त्रिकोणले मुख्य सडक वा गोलघुम्तीमा रहेका सवारी साधनलाई पहिलो प्राथमिकता (बाटो) दिनुपर्ने जनाउँछ।",
    explanationEng: "An upside-down triangle signifies 'Give Way / Yield' to cross traffic.",
    signSymbol: "▽",
    signType: 'warning'
  },
  {
    id: 6,
    questionNep: "गोलाकार (Circle) भित्र रातो किनारा भएका ट्राफिक चिन्हहरूले के संकेत गर्छन्?",
    questionEng: "What do circular signs with red borders signify?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["सूचनात्मक सन्देश", "आदेशात्मक वा निषेधात्मक (नगर्नु पर्ने)", "चेतावनी वा सचेतक", "सुविधा संकेत"],
    optionsEng: ["Informational message", "Mandatory / Prohibitory rules", "Warning of hazard", "Facility markers"],
    correctIndex: 1,
    explanationNep: "रातो घेरा भएका गोलाकार चिन्हहरूले कानुनतः पालना गर्नुपर्ने निषेध (जस्तै: नो इन्ट्री, गति सीमा) बुझाउँछ।",
    explanationEng: "Circular signs with red borders give definitive prohibitions or regulatory orders.",
    signSymbol: "⭕",
    signType: 'prohibitory'
  },
  {
    id: 7,
    questionNep: "त्रिकोणात्मक (Triangle) ट्राफिक चिन्हहरूले के जनाउँछन्?",
    questionEng: "What do triangular road signs generally signify?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["सचेतक वा चेतावनी (Warning / Caution)", "अनिवार्य आदेश", "सूचना तथा जानकारी", "विश्राम स्थल"],
    optionsEng: ["Caution / Warning signs", "Mandatory command", "General information", "Rest area"],
    correctIndex: 0,
    explanationNep: "त्रिकोण आकारका चिन्हहरूले अगाडिको सडकको अवस्था (मोड, उकालो, पुल, जनावर) बारे सचेत गराउँछन्।",
    explanationEng: "Triangular signs warn motorists about hazards and road design ahead.",
    signSymbol: "⚠️",
    signType: 'warning'
  },
  {
    id: 8,
    questionNep: "आयताकार (Rectangle) वा नीलो रङ्गका ट्राफिक चिन्हहरू कुन वर्गमा पर्छन्?",
    questionEng: "What category do rectangular or blue road signs belong to?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["निषेधात्मक", "सूचनात्मक (Informative)", "दण्डात्मक", "सचेतक"],
    optionsEng: ["Prohibitory", "Informative / Guidance", "Punitive", "Hazard warning"],
    correctIndex: 1,
    explanationNep: "आयताकार र नीलो चिन्हहरूले अस्पताल, पेट्रोल पम्प, दिशा र स्थानको सूचना दिन्छन्।",
    explanationEng: "Rectangular blue/green signs provide navigation and facility information.",
    signSymbol: "ℹ️",
    signType: 'informative'
  },
  {
    id: 9,
    questionNep: "रातो वृत्तभित्र हर्नको चित्र कोरेर तेर्सो रातो धर्काले काटेको चिन्हको अर्थ के हो?",
    questionEng: "What does a horn icon crossed with a red slash in a circle indicate?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["हर्न बजाउन अनिवार्य", "हर्न बजाउन निषेध (No Horn)", "साउन्ड बढाउनुहोस्", "रेडियो खोल्नुहोस्"],
    optionsEng: ["Mandatory horn", "No Horn / Honking Prohibited", "Increase sound", "Radio zone"],
    correctIndex: 1,
    explanationNep: "अस्पताल, शिक्षण संस्था र शान्त क्षेत्रमा हर्न बजाउन पूर्ण निषेध गरिएको हुन्छ।",
    explanationEng: "Signifies a strict No Horn zone, commonly deployed near schools and hospitals.",
    signSymbol: "🔕",
    signType: 'prohibitory'
  },
  {
    id: 10,
    questionNep: "सडकको बीचमा कोरिएको दोहोरो निरन्तर सेतो रेखा (Double Solid White Line) ले के संकेत गर्छ?",
    questionEng: "What do double continuous solid white lines in the center of the road mean?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["ओभरटेक गर्न छुट", "रेखा काट्न वा ओभरटेक गर्न पूर्ण निषेध", "जुनसुकै तर्फ मोड्न पाइने", "सवारी रोक्न पाइने"],
    optionsEng: ["Overtaking permitted", "Strictly no overtaking or crossing line", "Turn anywhere", "Parking allowed"],
    correctIndex: 1,
    explanationNep: "दोहोरो निरन्तर रेखालाई पर्खाल समान मानिन्छ; यसलाई काटेर ओभरटेक वा यू-टर्न गर्न पाइँदैन।",
    explanationEng: "Double solid lines act as a barrier: crossing or overtaking across them is strictly prohibited.",
    signSymbol: "║",
    signType: 'prohibitory'
  },
  {
    id: 11,
    questionNep: "सडकको बीचमा रहेको खण्डित सेतो रेखा (Broken White Line) ले के जनाउँछ?",
    questionEng: "What does a broken/dashed white line down the road indicate?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["सडक बन्द छ", "सुरक्षित भएमा लेन परिवर्तन र ओभरटेक गर्न सकिने", "सवारी रोक्नै पर्ने", "एकतर्फी बाटो"],
    optionsEng: ["Road closed", "Lane change & overtaking permitted when safe", "Compulsory stop", "One-way only"],
    correctIndex: 1,
    explanationNep: "खण्डित सेतो रेखाले बाटो सुरक्षित र खाली भएमा ओभरटेक वा लेन बदल्न अनुमति दिन्छ।",
    explanationEng: "A broken white line permits crossing for overtaking or changing lanes if road is clear.",
    signSymbol: "┆"
  },
  {
    id: 12,
    questionNep: "ट्राफिक चिन्हमा 'L' अक्षर लेखिएको सवारी साधन कस्तो सवारी हो?",
    questionEng: "What does the letter 'L' displayed on a vehicle indicate?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["लोड गाडी (Heavy Load)", "सिकारु सवारी साधन (Learner Driver)", "लाइसेन्स प्राप्त सवारी", "विशिष्ट व्यक्तिको गाडी"],
    optionsEng: ["Loaded vehicle", "Learner driver vehicle", "Licensed vehicle", "VIP convoy"],
    correctIndex: 1,
    explanationNep: "सवारी साधन सिक्दै गरेका चालकले सवारीको अगाडि र पछाडि प्रस्ट देखिने गरी 'L' प्लेट राख्नुपर्छ।",
    explanationEng: "'L' designates a Learner driver under training on public roads.",
    signSymbol: "🅻"
  },
  {
    id: 13,
    questionNep: "जेब्रा क्रसिङ (Zebra Crossing) केका लागि प्रयोग गरिन्छ?",
    questionEng: "What is the primary purpose of a zebra crossing on the road?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["गाडी रोकेर पार्किङ गर्न", "पैदलयात्रुले सुरक्षित रूपमा बाटो काट्न", "गाडी तीव्र गतिमा कुदाउन", "हर्न बजाउन"],
    optionsEng: ["Vehicle parking", "Pedestrians to cross the road safely", "Speed acceleration", "Honking area"],
    correctIndex: 1,
    explanationNep: "जेब्रा क्रसिङ पैदलयात्रुलाई बाटो काट्न बनाइएको हो र त्यहाँ पैदलयात्रुको पहिलो हक हुन्छ।",
    explanationEng: "Zebra crossings give pedestrians safe passage with legal right of way.",
    signSymbol: "🦓"
  },
  {
    id: 14,
    questionNep: "झिमझिमाउने पहेंलो बत्ती (Flashing Amber Light) ले के जनाउँछ?",
    questionEng: "What does a flashing yellow/amber light signify at an intersection?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["तीव्र गतिमा जाने", "गति कम गरी दायाँ-बायाँ हेरेर सावधानीपूर्वक पार गर्ने", "सवारी नरोक्ने", "सडक बन्द छ"],
    optionsEng: ["Drive fast", "Slow down, check both sides, and cross cautiously", "Do not stop", "Road is closed"],
    correctIndex: 1,
    explanationNep: "झिम्किने पहेंलो बत्तीले जक्सनमा खतरा रहेकोले गति सुस्त बनाई सतर्कतासाथ पार गर्न सिकाउँछ।",
    explanationEng: "Flashing amber instructs drivers to decelerate and proceed through with high caution.",
    signSymbol: "✨🟡"
  },
  {
    id: 15,
    questionNep: "झिमझिमाउने रातो बत्ती (Flashing Red Light) ले के संकेत गर्छ?",
    questionEng: "What does a flashing red traffic light mean?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["पूर्ण रूपमा रोकेर दायाँ-बायाँ हेरी सुरक्षित भएपछि मात्र जाने", "हर्न बजाएर अघि बढ्ने", "गति बढाउने", "यु-टर्न लिने"],
    optionsEng: ["Come to a complete stop, yield, and proceed only when clear", "Honk and speed up", "Accelerate", "Make U-turn"],
    correctIndex: 0,
    explanationNep: "झिम्किने रातो बत्ती स्टप चिन्ह जस्तै हो: गाडी पूर्ण रोक्ने, बाटो क्लियर भएपछि मात्र अघि बढ्ने।",
    explanationEng: "A flashing red acts like a Stop sign: stop fully, check cross traffic, proceed when clear.",
    signSymbol: "✨🔴"
  },
  {
    id: 16,
    questionNep: "रातो घेराभित्र '५०' (50) लेखिएको ट्राफिक चिन्हको अर्थ के हो?",
    questionEng: "What does a number '50' inside a red circle mean?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["कम्तीमा ५० किमि चलाउनै पर्ने", "अधिकतम गति सीमा प्रतिघण्टा ५० किमि (Speed Limit 50)", "५० मिटर अगाडि बाटो बन्द", "५० नम्बरको गाडी"],
    optionsEng: ["Minimum 50 km/h speed", "Maximum speed limit 50 km/h", "Road closed after 50m", "Vehicle route 50"],
    correctIndex: 1,
    explanationNep: "रातो घेराभित्रको संख्याले उक्त सडक खण्डमा चलाउन पाउने अधिकतम गति सीमा (Max Speed) बुझाउँछ।",
    explanationEng: "Red circle with a number sets the maximum permissible speed limit in km/h.",
    signSymbol: "➄⓪",
    signType: 'prohibitory'
  },
  {
    id: 17,
    questionNep: "रातो घेराभित्र यू-टर्न (U-Turn) को चिन्हलाई रातो धर्काले काटेको भए के बुझिन्छ?",
    questionEng: "What does a U-turn arrow crossed with a red slash indicate?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["यू-टर्न गर्न अनिवार्य", "यू-टर्न गर्न निषेध (U-Turn Prohibited)", "दायाँ मोड्न पाइने", "गति बढाउन पाइने"],
    optionsEng: ["Compulsory U-turn", "U-Turn Prohibited", "Right turn allowed", "Accelerate"],
    correctIndex: 1,
    explanationNep: "उक्त स्थानमा सवारीलाई पछाडि फर्काउन वा यू-टर्न गर्न कानुनतः निषेध गरिएको छ।",
    explanationEng: "Indicates that drivers are legally barred from performing a 180-degree U-turn.",
    signSymbol: "↩️🚫",
    signType: 'prohibitory'
  },
  {
    id: 18,
    questionNep: "नीलो पृष्ठभूमिमा सेतो रङ्गको साइकल कोरेको चिन्हले के जनाउँछ?",
    questionEng: "What does a bicycle icon inside a blue circle indicate?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["साइकल चलाउन निषेध", "साइकल यात्रीका लागि मात्र अनिवार्य लेन (Dedicated Cycle Track)", "साइकल पसल", "मोटरसाइकल लेन"],
    optionsEng: ["Bicycles prohibited", "Compulsory cycle track / dedicated bicycle lane", "Bicycle shop", "Motorcycle path"],
    correctIndex: 1,
    explanationNep: "नीलो पृष्ठभूमिमा रहेका चिन्हहरू सकारात्मक अनिवार्य आदेश हुन्, जसले साइकल लेन जनाउँछ।",
    explanationEng: "Blue round sign denotes a mandatory track exclusively designated for cyclists.",
    signSymbol: "🚲",
    signType: 'informative'
  },

  // ==========================================
  // 2. TRAFFIC LAWS & ACTS (सवारी ऐन तथा नियम)
  // ==========================================
  {
    id: 19,
    questionNep: "नेपालमा मोटरसाइकल वा स्कुटर (वर्ग ‘क’ / ‘ट’) को लाइसेन्स लिन न्यूनतम उमेर कति हुनुपर्छ?",
    questionEng: "What is the minimum age to obtain a motorcycle/scooter driving license in Nepal?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["१६ वर्ष", "१८ वर्ष", "२१ वर्ष", "२५ वर्ष"],
    optionsEng: ["16 years", "18 years", "21 years", "25 years"],
    correctIndex: 0,
    explanationNep: "सवारी तथा यातायात व्यवस्था ऐन २०४९ अनुसार दुईपाङ्ग्रे (वर्ग क) को लागि १६ वर्ष उमेर पुग्नुपर्छ।",
    explanationEng: "Under Nepal Transport Management Act 2049, minimum age for two-wheelers is 16 years."
  },
  {
    id: 20,
    questionNep: "कार, जिप, डेलिभरी भ्यान (वर्ग ‘ख’) को सवारी चालक अनुमतिपत्र प्राप्त गर्न न्यूनतम उमेर कति तोकिएको छ?",
    questionEng: "What is the minimum age required for Category B (Car/Jeep) license in Nepal?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["१६ वर्ष", "१८ वर्ष", "२० वर्ष", "२१ वर्ष"],
    optionsEng: ["16 years", "18 years", "20 years", "21 years"],
    correctIndex: 1,
    explanationNep: "साना चारपाङ्ग्रे हलुका सवारी साधनको चालक अनुमतिपत्र लिन १८ वर्ष उमेर पूरा हुनुपर्छ।",
    explanationEng: "The applicant must be at least 18 years old for light four-wheeler driving licenses."
  },
  {
    id: 21,
    questionNep: "बस, ट्रकजस्ता ठूला र मझौला सार्वजनिक तथा व्यावसायिक सवारी साधनको लाइसेन्स लिन न्यूनतम उमेर कति हुनुपर्छ?",
    questionEng: "What is the minimum age to apply for heavy commercial vehicles (Bus/Truck) in Nepal?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["१८ वर्ष", "२० वर्ष", "२१ वर्ष", "२५ वर्ष"],
    optionsEng: ["18 years", "20 years", "21 years", "25 years"],
    correctIndex: 2,
    explanationNep: "ठूला र मझौला व्यावसायिक सवारी साधन चलाउन कम्तीमा २१ वर्ष उमेर पूरा भएको हुनुपर्दछ।",
    explanationEng: "Heavy vehicle driver licenses require the applicant to be at least 21 years of age."
  },
  {
    id: 22,
    questionNep: "सवारी चलाउँदा चालकसँग अनिवार्य रूपमा साथमा हुनुपर्ने कागजातहरू कुन-कुन हुन्?",
    questionEng: "Which documents must a driver compulsorily carry while driving in Nepal?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["नागरिकता मात्र", "सवारी चालक अनुमतिपत्र (License), ब्लुबुक (सवारी दर्ता किताब) र बीमा", "प्यान कार्ड र फोटो", "राहदानी मात्र"],
    optionsEng: ["Citizenship certificate only", "Driving License, Vehicle Bluebook, and Insurance", "PAN card and photos", "Passport only"],
    correctIndex: 1,
    explanationNep: "सवारी चलाउँदा सक्कल लाइसेन्स, सवारी दर्ता किताब (Bluebook) र तेस्रो पक्ष बीमा अनिवार्य हुनुपर्छ।",
    explanationEng: "Driver must possess valid Driving License, Bluebook with paid tax, and Third Party Insurance."
  },
  {
    id: 23,
    questionNep: "सवारी चालक अनुमतिपत्र (Driving License) को सामान्य नवीकरण अवधि कति वर्षको हुन्छ?",
    questionEng: "What is the standard validity period of a renewed smart driving license in Nepal?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["१ वर्ष", "२ वर्ष", "५ वर्ष", "१० वर्ष"],
    optionsEng: ["1 year", "2 years", "5 years", "10 years"],
    correctIndex: 2,
    explanationNep: "नेपालमा स्मार्ट सवारी चालक अनुमतिपत्र सामान्यतया ५ वर्षको अवधिका लागि जारी र नवीकरण हुन्छ।",
    explanationEng: "Nepal smart driving licenses are valid for a duration of 5 years between renewals."
  },
  {
    id: 24,
    questionNep: "मादक पदार्थ सेवन (मापसे - Drunk Driving) गरी सवारी चलाएमा प्रचलित कानुन अनुसार के हुन्छ?",
    questionEng: "What are the legal consequences of drunk driving (Drink and Drive) in Nepal?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["मौखिक चेतावनी मात्र", "नगद जरिवाना, ट्राफिक सचेतना कक्षा र लाइसेन्समा प्वाल/कारबाही", "केही हुँदैन", "पुरस्कार पाइन्छ"],
    optionsEng: ["Verbal warning only", "Cash fine, mandatory traffic class, and license perforation/penalty", "No consequence", "Reward"],
    correctIndex: 1,
    explanationNep: "मापसे गरी सवारी चलाउनु गम्भीर अपराध हो; यसमा जरिवाना, कक्षा र ५ पटक कटेमा लाइसेन्स ६ महिना निलम्बन हुन्छ।",
    explanationEng: "Drunk driving incurs fines, compulsory safety classes, punch points, and eventual suspension."
  },
  {
    id: 25,
    questionNep: "लाइसेन्समा ट्राफिक प्रहरीले कति पटकसम्म प्वाल पारेमा (कारबाही गरेमा) अनुमतिपत्र निलम्बन हुन सक्छ?",
    questionEng: "After how many punch violations can a driving license be suspended by traffic police?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["२ पटक", "३ पटक", "५ पटक", "१० पटक"],
    optionsEng: ["2 times", "3 times", "5 times", "10 times"],
    correctIndex: 2,
    explanationNep: "नियम उल्लङ्घन गरी ५ पटक प्वाल परेमा उक्त अनुमतिपत्र ६ महिनाका लागि निलम्बन गरिन्छ।",
    explanationEng: "After 5 punch marks for traffic violations, the license is suspended for 6 months."
  },
  {
    id: 26,
    questionNep: "सवारी साधनको ब्लुबुक (सवारी दर्ता किताब) कति अवधिभित्र नवीकरण (कर चुक्ता) गरिसक्नुपर्छ?",
    questionEng: "How often must the vehicle bluebook tax be paid and renewed in Nepal?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["प्रत्येक ६ महिनामा", "प्रत्येक आर्थिक वर्षभित्र (वार्षिक)", "२ वर्षमा", "५ वर्षमा"],
    optionsEng: ["Every 6 months", "Annually within each Fiscal Year", "Every 2 years", "Every 5 years"],
    correctIndex: 1,
    explanationNep: "सवारी साधनको वार्षिक कर प्रत्येक आर्थिक वर्ष सकिनु अगावै यातायात कार्यालय वा अनलाइनबाट चुक्ता गर्नुपर्छ।",
    explanationEng: "Vehicle taxes must be cleared annually every fiscal year before the statutory deadline."
  },
  {
    id: 27,
    questionNep: "अस्पताल र विद्यालय क्षेत्रको कति दूरीभित्र हर्न बजाउन निषेध गरिएको छ?",
    questionEng: "Honking is strictly prohibited in silence zones around hospitals and schools:",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["पूर्ण रूपमा निषेध (No Horn Zone)", "रातिको समयमा मात्र", "दिनको समयमा मात्र", "सवारी धेरै भए बजाउन पाइने"],
    optionsEng: ["Completely prohibited (No Horn Zone)", "Night time only", "Day time only", "Allowed in heavy traffic"],
    correctIndex: 0,
    explanationNep: "अस्पताल र विद्यालय क्षेत्रलाई शान्त क्षेत्र (Silence Zone) तोकिएकाले हर्न बजाउन पूर्ण निषेध छ।",
    explanationEng: "School and healthcare premises are designated 24/7 silence zones where honking is illegal."
  },
  {
    id: 28,
    questionNep: "सवारी चालक अनुमतिपत्रको म्याद सकिएको कति समयसम्म बिना जरिवाना नवीकरण गर्न पाइन्छ?",
    questionEng: "Within what grace period can a driving license be renewed after expiry without late penalty?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["३० दिन (१ महिना)", "९० दिन (३ महिना)", "६ महिना", "१ वर्ष"],
    optionsEng: ["30 days (1 month)", "90 days (3 months)", "6 months", "1 year"],
    correctIndex: 1,
    explanationNep: "लाइसेन्सको म्याद सकिएको ९० दिन (३ महिना) सम्म बिना अतिरिक्त जरिवाना नवीकरण गर्न सकिन्छ।",
    explanationEng: "Under DOTM regulations, a 90-day grace period is provided without late fine."
  },
  {
    id: 29,
    questionNep: "सार्वजनिक यातायातमा ज्येष्ठ नागरिक र अपाङ्गता भएका व्यक्तिका लागि कति सिट आरक्षण गर्नुपर्ने नियम छ?",
    questionEng: "How many seats are reserved for senior citizens and disabled passengers in public buses?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["कम्तीमा २-२ सिट", "१ सिट मात्र", "कुनै आरक्षण हुँदैन", "५० प्रतिशत सिट"],
    optionsEng: ["At least 2 seats each", "1 seat only", "No reservation", "50 percent of seats"],
    correctIndex: 0,
    explanationNep: "यातायात व्यवस्था नियमावली अनुसार महिला, ज्येष्ठ नागरिक र अपाङ्गता भएका व्यक्तिका लागि तोकिएका सिट सुरक्षित राख्नुपर्छ।",
    explanationEng: "Public passenger vehicles must reserve dedicated front seats for seniors and disabled citizens."
  },
  {
    id: 30,
    questionNep: "सवारी दुर्घटना भएमा चालकले सबैभन्दा पहिलो कर्तव्य के पूरा गर्नुपर्छ?",
    questionEng: "What is the first and foremost legal duty of a driver involved in an accident?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["गाडी छोडेर भाग्ने", "घाइतेको तत्काल उद्धार गरी अस्पताल पुर्‍याउने र प्रहरीलाई खबर गर्ने", "बिमा कम्पनीलाई फोन मात्र गर्ने", "भीडसँग झगडा गर्ने"],
    optionsEng: ["Flee the scene", "Render immediate first aid, rush injured to hospital, and notify police", "Call insurer only", "Argue with bystanders"],
    correctIndex: 1,
    explanationNep: "मानवीय ज्यान जोगाउनु पहिलो कर्तव्य हो; घाइतेलाई तुरुन्त अस्पताल लैजाने र नजिकको प्रहरीलाई जानकारी दिनुपर्छ।",
    explanationEng: "Saving life is the highest priority: provide first aid, arrange medical care, and inform police."
  },

  // ==========================================
  // 3. DRIVING OPERATION & SAFETY (सवारी सञ्चालन)
  // ==========================================
  {
    id: 31,
    questionNep: "नेपालमा सामान्यतया अगाडिको सवारीलाई कुन साइडबाट ओभरटेक (Overtake) गर्नुपर्छ?",
    questionEng: "From which side must you normally overtake a vehicle ahead in Nepal?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["बायाँ साइडबाट", "दायाँ साइडबाट", "फुटपाथबाट", "जुनसुकै साइडबाट"],
    optionsEng: ["Left side", "Right side", "Sidewalk", "Either side"],
    correctIndex: 1,
    explanationNep: "नेपालमा सडकको बाँया तर्फबाट गाडी गुड्ने भएकाले ओभरटेक सधैं अगाडिको गाडीको दायाँ तर्फबाट गरिन्छ।",
    explanationEng: "In left-hand traffic systems like Nepal, overtaking must be done from the right side."
  },
  {
    id: 32,
    questionNep: "कुन अवस्थामा अगाडिको सवारीलाई बायाँ तर्फबाट ओभरटेक गर्न छुट दिइन्छ?",
    questionEng: "In which exceptional scenario is it permissible to overtake from the left?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["जतिबेला मन लाग्छ", "अगाडिको गाडीले दायाँ मोड्न इन्डिकेटर बालेर बीचमा बसेको अवस्थामा", "ट्राफिक जाम भएको बेला", "रातिको समयमा"],
    optionsEng: ["Anytime you wish", "When vehicle ahead indicates right turn and is positioned in center", "In heavy traffic jam", "At night"],
    correctIndex: 1,
    explanationNep: "यदि अगाडिको गाडीले दायाँ मोड्ने संकेत गरी बीचमा रोकिएको छ भने सावधानीपूर्वक बायाँबाट जान पाइन्छ।",
    explanationEng: "Left pass is permitted when the vehicle ahead has signaled and positioned for a right turn."
  },
  {
    id: 33,
    questionNep: "अत्यधिक उकालो सडकमा सवारी साधन चलाउँदा कुन गियरको प्रयोग गर्नुपर्छ?",
    questionEng: "Which gear should be engaged when negotiating a steep uphill climb?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["एक नम्बर (१st) गियर", "तीन नम्बर (३rd) गियर", "टप गियर (Top Gear)", "न्यूट्रल (Neutral)"],
    optionsEng: ["First gear (1st)", "Third gear (3rd)", "Top gear", "Neutral gear"],
    correctIndex: 0,
    explanationNep: "उकालोमा इन्जिनलाई अधिकतम तागत (Torque) आवश्यक पर्ने भएकाले १ नम्बर वा तल्लो गियर प्रयोग गरिन्छ।",
    explanationEng: "Low gears (1st) produce maximum pulling torque necessary for climbing steep inclines."
  },
  {
    id: 34,
    questionNep: "लामो तथा ठाडो ओरालोमा सवारी साधन चलाउँदा के गर्न सख्त मनाही छ?",
    questionEng: "What dangerous action must NEVER be done when driving down a steep slope?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["इन्जिन चालु राख्ने", "गियर न्यूट्रल गर्ने वा इन्जिन बन्द गरेर गुड्ने", "इन्जिन ब्रेक प्रयोग गर्ने", "हर्न बजाउने"],
    optionsEng: ["Keeping engine running", "Coasting in neutral or turning off the engine", "Using engine braking", "Honking horn"],
    correctIndex: 1,
    explanationNep: "ओरालोमा न्यूट्रल गर्दा ब्रेक अत्यधिक तातेर फेल हुन सक्छ र स्टेरिङ नियन्त्रण गुम्न सक्छ।",
    explanationEng: "Coasting in neutral overheats brakes leading to brake fade and complete loss of control."
  },
  {
    id: 35,
    questionNep: "मोटरसाइकल वा स्कुटर चलाउँदा चालकले अनिवार्य रूपमा के लगाउनुपर्छ?",
    questionEng: "What safety equipment is legally mandatory for two-wheeler riders in Nepal?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["छालाको ज्याकेट", "गुणस्तरीय हेल्मेट (स्ट्र्याप बाँधिएको)", "कालो चश्मा", "खेलकुदका जुत्ता"],
    optionsEng: ["Leather jacket", "Certified helmet with fastened chin strap", "Dark sunglasses", "Sports shoes"],
    correctIndex: 1,
    explanationNep: "टाउकोको गम्भीर चोटपटकबाट बच्न हेल्मेट अनिवार्य छ र त्यसको फिता (Strap) राम्रोसँग बाँधिएको हुनुपर्छ।",
    explanationEng: "A certified helmet fastened securely is mandatory by law to prevent fatal head trauma."
  },
  {
    id: 36,
    questionNep: "गाडीलाई दायाँ वा बायाँ मोड्नुभन्दा कम्तीमा कति दूरी अगाडि इन्डिकेटर (Side Light) बाल्नुपर्छ?",
    questionEng: "How far before a turn should you turn on your directional indicator light?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["मोड्ने ठ्याक्कै मुखमा", "कम्तीमा ३० मिटर अगाडि", "५ मिटर अगाडि", "मोडिसकेपछि"],
    optionsEng: ["Exactly at the turn vertex", "At least 30 meters ahead", "5 meters ahead", "After turning"],
    correctIndex: 1,
    explanationNep: "पछाडिका सवारी चालकलाई सुरक्षित समय दिन मोड्नुभन्दा कम्तीमा ३० मिटर अगावै इन्डिकेटर दिनुपर्छ।",
    explanationEng: "Signal at least 30 meters prior to inform traffic and ensure safe reaction time."
  },
  {
    id: 37,
    questionNep: "गोलघुम्ती (Roundabout) मा प्रवेश गर्दा कुन तर्फबाट आइरहेका सवारी साधनलाई पहिलो प्राथमिकता (Right of Way) दिनुपर्छ?",
    questionEng: "When approaching a roundabout, who has the primary right of way in Nepal?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["बायाँबाट आउनेलाई", "दायाँबाट गोलघुम्तीभित्र घुमिरहेका सवारी साधनलाई", "हर्न बजाउने गाडीलाई", "ठूला ट्रकलाई मात्र"],
    optionsEng: ["Traffic on the left", "Vehicles already circulating from the right", "Vehicle honking loudly", "Heavy trucks only"],
    correctIndex: 1,
    explanationNep: "नेपालको नियम अनुसार गोलघुम्तीभित्र दायाँबाट गुडिरहेका सवारी साधनलाई बाटो दिएर मात्र प्रवेश गर्नुपर्छ।",
    explanationEng: "Yield to circulating traffic approaching from your right before entering a roundabout."
  },
  {
    id: 38,
    questionNep: "गुडिरहेको दुईपाङ्ग्रे सवारीलाई आकस्मिक रूपमा रोक्नुपरेमा ब्रेक कसरी लगाउनुपर्छ?",
    questionEng: "How should brakes be applied for an emergency stop on a motorcycle/scooter?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["अगाडिको ब्रेक मात्र बेस्सरी थिच्ने", "पछाडिको ब्रेक मात्र च्याप्ने", "दुवै ब्रेकलाई सन्तुलित र एकैपटक थिच्ने", "खुट्टाले भुइँ घिसार्ने"],
    optionsEng: ["Front brake only abruptly", "Rear brake only hard", "Apply both front and rear brakes smoothly together", "Drag feet on road"],
    correctIndex: 2,
    explanationNep: "दुवै ब्रेक एकैसाथ सन्तुलित दबाबमा प्रयोग गर्दा गाडी चिप्लन पाउँदैन र छोटो दूरीमै रोकिन्छ।",
    explanationEng: "Simultaneous, progressive application of both brakes provides optimal stopping power."
  },
  {
    id: 39,
    questionNep: "अगाडिको सवारी साधन र आफ्नो सवारी साधनबीच 'सुरक्षित दूरी' (Safe Following Distance) किन राख्नुपर्छ?",
    questionEng: "Why is maintaining a safe following distance behind the vehicle ahead essential?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["इन्धन बचाउन", "अगाडिको गाडी एक्कासी रोकिँदा ठोक्किनबाट बच्न", "धुलोबाट बच्न", "फोटो खिच्न"],
    optionsEng: ["To save fuel", "To avoid rear-end collision if lead vehicle stops suddenly", "To dodge dust", "To take pictures"],
    correctIndex: 1,
    explanationNep: "अगाडिको सवारी अचानक रोकिँदा सोच्ने र ब्रेक लगाउने पर्याप्त समय (Reaction Distance) पाउन दूरी चाहिन्छ।",
    explanationEng: "Safe distance ensures adequate reaction time and braking distance to prevent tailgating crashes."
  },
  {
    id: 40,
    questionNep: "रातको समयमा विपरित दिशाबाट अर्को गाडी आइरहेको बेला हेडलाइट कुन बिममा राख्नुपर्छ?",
    questionEng: "When an oncoming car approaches at night, what beam should headlights be set to?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["हाई बिम (High Beam)", "लो बिम वा डिपर (Low Beam / Dipper)", "बत्ती नै निभाउने", "हजार्ड लाइट बाल्ने"],
    optionsEng: ["High Beam", "Low Beam / Dipper", "Turn lights completely off", "Hazard flashers"],
    correctIndex: 1,
    explanationNep: "हाई बिमले विपरित चालकको आँखा तिर्मिराएर अन्धो (Glare) बनाउँछ; त्यसैले डिपर वा लो बिम प्रयोग गर्नुपर्छ।",
    explanationEng: "Low beam prevents dazzling oncoming drivers and prevents catastrophic night blindness."
  },
  {
    id: 41,
    questionNep: "सवारी साधनमा चारैतिरका इन्डिकेटर एकैपटक बाल्ने 'हजार्ड लाइट' (Hazard Light) कुन अवस्थामा प्रयोग गरिन्छ?",
    questionEng: "When should the emergency hazard warning flasher lights be switched on?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["सिधा बाटो काट्नका लागि", "गाडी बिग्रिएर सडकमा आकस्मिक रूपमा रोकिँदा वा खतराको अवस्थामा", "ओभरटेक गर्दा", "पानी पर्दा सधैं"],
    optionsEng: ["Crossing straight at intersection", "Vehicle breakdown / emergency road obstruction", "While overtaking", "Whenever it rains"],
    correctIndex: 1,
    explanationNep: "हजार्ड लाइट गाडी बिग्रिएर अन्य सवारीलाई सचेत गराउन मात्र प्रयोग गरिन्छ; सिधा जान बाल्नु गलत अभ्यास हो।",
    explanationEng: "Hazard lights warn other traffic that your vehicle is broken down or poses a stationary hazard."
  },
  {
    id: 42,
    questionNep: "सवारी साधनलाई रिभर्स (Reverse) गर्दा चालकले के कुरामा मुख्य ध्यान दिनुपर्छ?",
    questionEng: "What must a driver verify prior to and during reversing a vehicle?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["एक्सीलेटर पूरा थिच्ने", "रियर भ्यू ऐना र पछाडिको ब्लाइन्ड स्पटमा मानिस वा अवरोध छैन भनी निश्चित गर्ने", "हर्न लगातार बजाउने", "आँखा बन्द गर्ने"],
    optionsEng: ["Press accelerator fully", "Check rear mirrors and blind spots for pedestrians or obstacles", "Honk non-stop", "Close eyes"],
    correctIndex: 1,
    explanationNep: "पछाडिको ऐनामा नदेखिने क्षेत्र (Blind Spot) हुने हुँदा घुमेर हेरी सुरक्षित भएपछि मात्र रिभर्स गर्नुपर्छ।",
    explanationEng: "Check rear mirrors and physically scan blind spots to avoid hitting children or objects."
  },

  // ==========================================
  // 4. TECHNICAL & MECHANICAL KNOWLEDGE (यान्त्रिक ज्ञान)
  // ==========================================
  {
    id: 43,
    questionNep: "सवारी साधनको इन्जिनमा इन्जिन आयल (मोबिल - Engine Oil) राख्नुको मुख्य उद्देश्य के हो?",
    questionEng: "What is the primary function of engine oil (mobil) in motor vehicles?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["इन्धनको बचत बढाउन", "इन्जिनका घुम्ने पार्टपुर्जाहरूबीच घर्षण (Friction) कम गर्न र चिसो राख्न", "गाडीको रङ्ग चम्काउन", "गति दोब्बर बनाउन"],
    optionsEng: ["Save fuel", "Reduce friction between moving metal parts and assist engine cooling", "Shine vehicle paint", "Double the speed"],
    correctIndex: 1,
    explanationNep: "मोबिलले इन्जिन भित्रका पार्टपूर्जा चिल्लो बनाई घिसिनबाट बचाउँछ र तापक्रम नियन्त्रणमा सघाउँछ।",
    explanationEng: "Engine oil lubricates internal moving components, minimizes friction, and carries away heat."
  },
  {
    id: 44,
    questionNep: "गाडीमा 'ABS' (Anti-lock Braking System) को मुख्य काम के हो?",
    questionEng: "What is the primary safety purpose of ABS (Anti-lock Braking System)?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["इन्जिनको गति बढाउने", "कडा ब्रेक लगाउँदा पाङ्ग्रा लक हुन (चिप्लिन) बाट जोगाउने र स्टेरिङ नियन्त्रण कायम राख्ने", "माइलेज बढाउने", "आवाज मधुरो पार्ने"],
    optionsEng: ["Boost engine speed", "Prevent wheels from locking up during hard braking and preserve steering control", "Improve mileage", "Soften horn sound"],
    correctIndex: 1,
    explanationNep: "एबिएसले आपतकालीन ब्रेक लगाउँदा पाङ्ग्रालाई जाम हुन नदिई चिप्लनबाट बचाउँछ र स्टेरिङ घुमाउन दिन्छ।",
    explanationEng: "ABS modulates brake pressure to prevent tire skid, maintaining steerability under panic braking."
  },
  {
    id: 45,
    questionNep: "गाडीको ड्यासबोर्डमा ब्याट्रीको चिन्ह भएको बत्ती (Battery Warning Indicator) लगातार बलेमा के बुझिन्छ?",
    questionEng: "What does an illuminated battery icon on the dashboard signify?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["ब्याट्री एकदम भरिएको छ", "अल्टरनेटर वा चार्जिङ प्रणालीमा खराबी आएको (ब्याट्री चार्ज भइरहेको छैन)", "रेडियो बजेको छ", "इन्धन सकिएको छ"],
    optionsEng: ["Battery fully charged", "Alternator or charging system fault (battery is not charging)", "Radio on", "Fuel empty"],
    correctIndex: 1,
    explanationNep: "यसले सवारी साधनको अल्टरनेटरले ब्याट्रीलाई करेन्ट चार्ज गरिरहेको छैन भन्ने गम्भीर समस्या बुझाउँछ।",
    explanationEng: "Indicates that the charging circuit/alternator has failed and electrical power will quickly deplete."
  },
  {
    id: 46,
    questionNep: "गाडीको इन्जिन ओभरहिट (अत्यधिक तातो - Overheating) हुनुको मुख्य कारण के हुन सक्छ?",
    questionEng: "What is a primary cause of vehicle engine overheating?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["टायरमा हावा कम भएमा", "रेडिएटरमा कुलेन्ट वा पानीको कमी, वा फ्यान नचल्दा", "सिसा फोहोर हुँदा", "बत्ती बलेको हुँदा"],
    optionsEng: ["Low tyre pressure", "Low radiator coolant/water level or cooling fan failure", "Dirty windshield", "Headlight on"],
    correctIndex: 1,
    explanationNep: "रेडिएटरमा कुलेन्टको अभाव वा कुलिङ फ्यान नचलेमा इन्जिनले ताप बाहिर फ्याँक्न सक्दैन र तात्दछ।",
    explanationEng: "Insufficient coolant fluid, radiator blockage, or inoperative cooling fan causes overheating."
  },
  {
    id: 47,
    questionNep: "सवारी साधनमा गियर परिवर्तन (Shift) गर्दा कुन पेडल वा लिभर अनिवार्य थिच्नुपर्छ?",
    questionEng: "Which control must be fully pressed before shifting gears in a manual vehicle?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["एक्सीलेटर", "क्लच (Clutch)", "ह्यान्ड ब्रेक", "हर्न"],
    optionsEng: ["Accelerator", "Clutch", "Handbrake", "Horn"],
    correctIndex: 1,
    explanationNep: "क्लच थिच्दा इन्जिन र गियरबक्सको सम्बन्ध विच्छेद हुन्छ र गियर सजिलै परिवर्तन गर्न सकिन्छ।",
    explanationEng: "Depressing the clutch pedal disconnects the engine from the transmission for smooth gear changes."
  },
  {
    id: 48,
    questionNep: "गुडिरहेको सवारी साधनमा स्टेरिङ अनावश्यक रूपमा काम्नु (Vibrate) को कारण के हुन सक्छ?",
    questionEng: "What commonly causes noticeable steering wheel vibration at highway speeds?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["अगाडिको पाङ्ग्राको ह्विल ब्यालेन्सिङ वा अलाइनमेन्ट नमिल्नु", "इन्धन धेरै हुनु", "रेडियो बज्नु", "सिटबेल्ट खुकुलो हुनु"],
    optionsEng: ["Front wheel unbalance or poor wheel alignment", "Too much fuel", "Radio volume", "Loose seatbelt"],
    correctIndex: 0,
    explanationNep: "पाङ्ग्राको सन्तुलन (Wheel Balancing) नमिलेमा वा टायर खिएमा स्टेरिङमा कम्पन आउँछ।",
    explanationEng: "Unbalanced front wheels or faulty tire alignment generate rotational oscillations through the steering."
  },
  {
    id: 49,
    questionNep: "सवारी साधनमा प्रयोग हुने १२ भोल्टको ब्याट्रीले कस्तो करेन्ट प्रवाह गर्छ?",
    questionEng: "What electrical current type is supplied by a standard 12V automotive battery?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["प्रत्यावर्ती करेन्ट (AC - Alternating Current)", "दिष्ट करेन्ट (DC - Direct Current)", "स्थिर भोल्टेज शून्य", "कुनै पनि होइन"],
    optionsEng: ["Alternating Current (AC)", "Direct Current (DC)", "Zero voltage", "None"],
    correctIndex: 1,
    explanationNep: "सवारी साधनका रासायनिक ब्याट्रीहरूले १२ भोल्टको Direct Current (DC) करेन्ट दिन्छन्।",
    explanationEng: "Automotive storage batteries supply 12V Direct Current (DC) to power the starter and electrical systems."
  },
  {
    id: 50,
    questionNep: "पेट्रोल इन्जिनमा इन्धन र हावाको मिश्रणलाई सल्काउने (Ignite गर्ने) यन्त्र कुन हो?",
    questionEng: "Which component ignites the air-fuel mixture inside a petrol engine cylinder?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["कार्बुरेटर", "स्पार्क प्लग (Spark Plug)", "साइलेन्सर", "डाइनामो"],
    optionsEng: ["Carburetor", "Spark Plug", "Exhaust silencer", "Dynamo"],
    correctIndex: 1,
    explanationNep: "स्पार्क प्लगले विद्युतीय झिल्को (Spark) निकालेर सिलिन्डर भित्रको पेट्रोल र हावा सल्काउँछ।",
    explanationEng: "The spark plug discharges a high-voltage electrical spark to ignite compressed fuel-air vapor."
  },
  {
    id: 51,
    questionNep: "सवारी साधनको टायरमा हावाको प्रेसर (Tire Pressure) कहिले नाप्नु सबैभन्दा सही हुन्छ?",
    questionEng: "When is the most accurate time to check tire pressure with a gauge?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["लामो यात्रा सकेर टायर तात्दा", "सवारी साधन चिसो अवस्थामा हुँदा (यात्रा सुरु गर्नुअघि)", "दिउँसोको चर्को घाममा", "जहिले मन लाग्यो"],
    optionsEng: ["Immediately after long fast driving", "When tires are cold (before driving)", "Under intense midday sun", "Any random time"],
    correctIndex: 1,
    explanationNep: "टायर तातेपछि भित्रको हावा फैलिएर प्रेसर बढी देखाउँछ, त्यसैले चिसो अवस्थामै नाप्नुपर्छ।",
    explanationEng: "Check tire pressures when cold; driving generates heat which causes air expansion and false readings."
  },
  {
    id: 52,
    questionNep: "ड्यासबोर्डमा तेलको क्यान (Oil Can Indicator) को रातो बत्ती बलेमा के गर्नुपर्छ?",
    questionEng: "What must you do if the engine oil pressure warning light illuminates while driving?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["गति बढाएर घर पुग्ने", "तत्काल सुरक्षित ठाउँमा सवारी रोकेर इन्जिन बन्द गर्ने र मोबिलको तह जाँच्ने", "हर्न बजाउने", "वास्ता नगर्ने"],
    optionsEng: ["Speed up to reach home", "Safely pull over immediately, turn off engine, and check oil level", "Honk horn", "Ignore it"],
    correctIndex: 1,
    explanationNep: "यो इन्जिन आयलको प्रेसर गम्भीर रूपमा घटेको संकेत हो; इन्जिन नरोकिए केही मिनेटमै इन्जिन सिज (Seize) हुन्छ।",
    explanationEng: "Pull over and stop immediately: low oil pressure causes catastrophic metal-on-metal engine seizure."
  },

  // ==========================================
  // 5. ACCIDENTS & FIRST AID (दुर्घटना र सुरक्षा)
  // ==========================================
  {
    id: 53,
    questionNep: "सवारी दुर्घटनामा अनिवार्य गरिएको 'तेस्रो पक्ष बीमा' (Third Party Insurance) ले कसको क्षति व्यहोर्छ?",
    questionEng: "Who is indemnified under mandatory Third Party motor insurance?",
    category: 'accidents',
    categoryLabelNep: 'दुर्घटना र सुरक्षा',
    categoryLabelEng: 'Accident & First Aid',
    optionsNep: ["चालकको मात्र", "सवारी धनीको मात्र", "दुर्घटनामा परेका तेस्रो व्यक्ति (पैदलयात्रु वा अन्य सवारी/सम्पत्ति)", "यातायात कार्यालयको"],
    optionsEng: ["Driver only", "Vehicle owner only", "Third party victims (pedestrians, other vehicles/property)", "Government office"],
    correctIndex: 2,
    explanationNep: "तेस्रो पक्ष बीमाले आफ्नो गाडी बाहेक अन्य व्यक्तिलाई पुगेको शारीरिक चोटपटक र सम्पत्तिको क्षतिपूर्ति दिन्छ।",
    explanationEng: "Third party coverage compensates damages and medical claims suffered by external innocent victims."
  },
  {
    id: 54,
    questionNep: "सवारी दुर्घटनामा गम्भीर घाइते भएको व्यक्तिका लागि 'गोल्डेन आवर' (Golden Hour) भन्नाले के बुझिन्छ?",
    questionEng: "What is meant by the 'Golden Hour' following severe vehicular trauma?",
    category: 'accidents',
    categoryLabelNep: 'दुर्घटना र सुरक्षा',
    categoryLabelEng: 'Accident & First Aid',
    optionsNep: ["दुर्घटना भएको पहिलो २४ घण्टा", "दुर्घटनापछिको पहिलो ६० मिनेट (१ घण्टा)", "अस्पताल पुगेपछिको समय", "प्रहरी आएपछिको समय"],
    optionsEng: ["First 24 hours", "The critical first 60 minutes (1 hour) post-accident", "Time after reaching hospital", "Time police arrives"],
    correctIndex: 1,
    explanationNep: "दुर्घटना भएको सुरुवाती १ घण्टाभित्र उचित उपचार पाएमा घाइतेको बाँच्ने सम्भावना अत्यधिक हुन्छ।",
    explanationEng: "The Golden Hour refers to the first 60 minutes when prompt medical treatment most prevents fatalities."
  },
  {
    id: 55,
    questionNep: "दुर्घटनामा घाइते भएको व्यक्तिको अत्यधिक रक्तस्राव (Bleeding) रोक्ने प्राथमिक उपाय के हो?",
    questionEng: "What is the best immediate first aid procedure to arrest severe arterial bleeding?",
    category: 'accidents',
    categoryLabelNep: 'दुर्घटना र सुरक्षा',
    categoryLabelEng: 'Accident & First Aid',
    optionsNep: ["घाउमा पानी खन्याउने", "सफा कपडा वा गजले घाउमा सोझै बलियो दबाब (Direct Pressure) दिने", "घाइतेलाई हिँडाउन लगाउने", "खुट्टा हल्लाउने"],
    optionsEng: ["Pour plain water", "Apply firm direct pressure with clean dressing/cloth", "Make patient walk", "Shake legs"],
    correctIndex: 1,
    explanationNep: "रक्तस्राव भइरहेको ठाउँमा सफा कपडाले प्रत्यक्ष दबाब दिँदा रगत जम्न सघाउँछ र अत्यधिक रगत खेर जान रोकिन्छ।",
    explanationEng: "Firm direct pressure over the wound compresses vessels and stimulates clotting to halt bleeding."
  },
  {
    id: 56,
    questionNep: "दुर्घटनामा परेको घाइतेको ढाड वा घाँटीको हड्डी (Spinal Cord) भाँचिएको शंका लागेमा के गर्नु हुँदैन?",
    questionEng: "What must you strictly AVOID when moving a casualty with suspected spinal/neck injuries?",
    category: 'accidents',
    categoryLabelNep: 'दुर्घटना र सुरक्षा',
    categoryLabelEng: 'Accident & First Aid',
    optionsNep: ["स्थिर राख्ने", "घाँटी र ढाडलाई बटार्ने वा बंग्याउने गरी जथाभावी तान्ने", "एम्बुलेन्स बोलाउने", "श्वासप्रश्वास जाँच्ने"],
    optionsEng: ["Keep immobilized", "Twisting, bending, or roughly pulling the neck and spine", "Calling ambulance", "Checking breathing"],
    correctIndex: 1,
    explanationNep: "घाँटी बटारिएमा मेरुदण्डको नसा चुँडिएर घाइते आजीवन पक्षघात (Paralyzed) हुन वा ज्यान जान सक्छ।",
    explanationEng: "Never bend or twist the head/spine; improper movement can sever the spinal cord causing permanent paralysis."
  },
  {
    id: 57,
    questionNep: "सवारी चलाउँदा चालकको ध्यान भड्किनबाट बच्न के गर्नु हुँदैन?",
    questionEng: "What dangerous driving distraction causes the highest frequency of road accidents?",
    category: 'accidents',
    categoryLabelNep: 'दुर्घटना र सुरक्षा',
    categoryLabelEng: 'Accident & First Aid',
    optionsNep: ["ऐना हेर्ने", "सवारी चलाउँदै मोबाइल फोनमा कुरा गर्ने वा म्यासेज टाइप गर्ने", "दुवै हात स्टेरिङमा राख्ने", "ट्राफिक नियम मान्ने"],
    optionsEng: ["Checking mirrors", "Talking on mobile phone or texting while driving", "Keeping both hands on wheel", "Obeying signs"],
    correctIndex: 1,
    explanationNep: "मोबाइल फोनको प्रयोगले आँखा, हात र मस्तिष्क तीनवटै विचलित भई दुर्घटनाको जोखिम कैयौं गुणा बढ्छ।",
    explanationEng: "Mobile phone usage diverts visual, manual, and cognitive attention, dramatically spiking collision risks."
  },
  {
    id: 58,
    questionNep: "लामो दूरीको राजमार्गमा सवारी चलाउँदा थकान र निद्राबाट बच्न के गर्नुपर्छ?",
    questionEng: "How should highway driver fatigue and drowsiness be effectively managed?",
    category: 'accidents',
    categoryLabelNep: 'दुर्घटना र सुरक्षा',
    categoryLabelEng: 'Accident & First Aid',
    optionsNep: ["अत्यधिक कफी पिएर लगातार कुदाइरहने", "प्रत्येक २ घण्टा वा १५० किमि यात्रा पछि विश्राम लिने", "गति १०० किमि कटाउने", "झ्याल सबै बन्द गर्ने"],
    optionsEng: ["Chain-drink coffee and drive nonstop", "Take a short rest break every 2 hours or ~150 km", "Drive over 100 km/h", "Keep all windows sealed"],
    correctIndex: 1,
    explanationNep: "हरेक दुई घण्टामा छोटो विश्राम लिएर ताजा हावा लिँदा चालकको सतर्कता र प्रतिक्रिया समय ताजा रहन्छ।",
    explanationEng: "Scheduled breaks every 2 hours break highway hypnosis and rejuvenate reflexes and attentiveness."
  },

  // ==========================================
  // 6. ENVIRONMENTAL POLLUTION (वातावरण प्रदूषण)
  // ==========================================
  {
    id: 59,
    questionNep: "सवारी प्रदूषण भन्नाले मुख्यतया केलाई बुझिन्छ?",
    questionEng: "What constitutes the primary component of vehicular environmental pollution?",
    category: 'environment',
    categoryLabelNep: 'वातावरण प्रदूषण',
    categoryLabelEng: 'Environmental Pollution',
    optionsNep: ["इन्जिनमा राखिने मोबिल", "साइलेन्सरबाट निस्कने विषाक्त धुवाँ र ग्यासहरू (CO, HC, NOx)", "गाडीको हर्नको आवाज मात्र", "सवारीको रङ्ग"],
    optionsEng: ["Engine oil inside crankcase", "Harmful toxic exhaust emissions and gases (CO, HC, NOx)", "Horn noise only", "Vehicle paint"],
    correctIndex: 1,
    explanationNep: "पेट्रोल र डिजेल जल्दा निस्कने कार्बन मोनोअक्साइड, हाइड्रोकार्बन र धुवाँले वायुमण्डल प्रदूषित पार्छ।",
    explanationEng: "Incomplete fuel combustion releases carbon monoxide, particulates, and nitrous oxides that foul the air."
  },
  {
    id: 60,
    questionNep: "टु-स्ट्रोक (Two-Stroke) र फोर-स्ट्रोक (Four-Stroke) इन्जिनमध्ये कुनले वातावरण बढी प्रदूषण गर्छ?",
    questionEng: "Which engine type emits significantly greater air pollutants?",
    category: 'environment',
    categoryLabelNep: 'वातावरण प्रदूषण',
    categoryLabelEng: 'Environmental Pollution',
    optionsNep: ["टु-स्ट्रोक (Two-Stroke) इन्जिनले", "फोर-स्ट्रोक (Four-Stroke) इन्जिनले", "दुवैले बराबर गर्छन्", "विद्युतीय मोटरले"],
    optionsEng: ["Two-stroke engine", "Four-stroke engine", "Both equally", "Electric motor"],
    correctIndex: 0,
    explanationNep: "टु-स्ट्रोक इन्जिनमा पेट्रोलसँगै २टी मोबिल पनि बल्ने हुँदा अत्यधिक सेतो/नीलो विषाक्त धुवाँ निस्कन्छ।",
    explanationEng: "Two-stroke engines burn lubricating 2T oil with fuel, resulting in massive particulate and smoke emissions."
  },
  {
    id: 61,
    questionNep: "सवारी साधनबाट निस्कने धुवाँ परीक्षण (Emission Test) पास गरेपछि दिइने स्टिकर कुन हो?",
    questionEng: "Which color sticker is issued in Nepal upon successfully passing vehicle emission testing?",
    category: 'environment',
    categoryLabelNep: 'वातावरण प्रदूषण',
    categoryLabelEng: 'Environmental Pollution',
    optionsNep: ["रातो स्टिकर", "हरियो स्टिकर (Green Sticker)", "पहेंलो स्टिकर", "कालो स्टिकर"],
    optionsEng: ["Red sticker", "Green Sticker", "Yellow sticker", "Black sticker"],
    correctIndex: 1,
    explanationNep: "तोकिएको मापदण्डभित्र धुवाँ निष्कासन भएको प्रमाणित भएपछि विन्डशिल्डमा टाँस्न हरियो स्टिकर दिइन्छ।",
    explanationEng: "Vehicles complying with national tailpipe emission limits receive the coveted Green Sticker."
  },
  {
    id: 62,
    questionNep: "तलका मध्ये शून्य वायु प्रदूषण (Zero Emission) गर्ने सवारी साधन कुन हो?",
    questionEng: "Which of the following vehicles produces zero tailpipe greenhouse emissions?",
    category: 'environment',
    categoryLabelNep: 'वातावरण प्रदूषण',
    categoryLabelEng: 'Environmental Pollution',
    optionsNep: ["डिजेल ट्रक", "विद्युतीय सवारी साधन (Electric Vehicles - EV) वा साइकल", "पुरानो पेट्रोल कार", "टु-स्ट्रोक स्कुटर"],
    optionsEng: ["Diesel lorry", "Electric Vehicle (EV) or Bicycle", "Old petrol car", "Two-stroke scooter"],
    correctIndex: 1,
    explanationNep: "विद्युतीय गाडी र साइकलमा साइलेन्सर पाइप नै नहुने हुँदा धुवाँ र हरितगृह ग्यास उत्सर्जन शून्य हुन्छ।",
    explanationEng: "Battery electric vehicles and bicycles have no tailpipes and emit zero exhaust pollutants."
  },
  {
    id: 63,
    questionNep: "सवारी साधनबाट हुने ध्वनि प्रदूषण (Noise Pollution) नियन्त्रण गर्न के गर्नुपर्छ?",
    questionEng: "How can vehicular noise pollution be minimized by motorists?",
    category: 'environment',
    categoryLabelNep: 'वातावरण प्रदूषण',
    categoryLabelEng: 'Environmental Pollution',
    optionsNep: ["प्रेसर हर्न जडान गर्ने", "अनावश्यक हर्न नबजाउने र साइलेन्सर मोडिफिकेसन नगर्ने", "राति गीत ठूलो पार्ने", "साइलेन्सर फुटाउने"],
    optionsEng: ["Install pressure horns", "Avoid unnecessary honking and refrain from modified exhaust pipes", "Loud music at night", "Remove exhaust muffler"],
    correctIndex: 1,
    explanationNep: "सहरी क्षेत्रमा ध्वनि प्रदूषण घटाउन अनावश्यक हर्न निषेध छ र चर्को आवाज दिने साइलेन्सर गैरकानुनी छ।",
    explanationEng: "Honk only in true hazards and keep factory-approved acoustic silencers in proper working condition."
  },
  {
    id: 64,
    questionNep: "गाडीको साइलेन्सरबाट कालो बाक्लो धुवाँ आउनुको मुख्य कारण के हो?",
    questionEng: "What causes dense black smoke to discharge from a vehicle's tailpipe?",
    category: 'environment',
    categoryLabelNep: 'वातावरण प्रदूषण',
    categoryLabelEng: 'Environmental Pollution',
    optionsNep: ["इन्धनको अपूर्ण दहन (Incomplete Fuel Combustion) वा एयर फिल्टर फोहोर हुनु", "ब्याट्री डिस्चार्ज हुनु", "रेडियो बज्नु", "टायरको हावा कम हुनु"],
    optionsEng: ["Incomplete fuel combustion or choked air filter", "Discharged battery", "Radio playing", "Low tire pressure"],
    correctIndex: 0,
    explanationNep: "इन्जिनमा हावाको कमी भएर पेट्रोल वा डिजेल पूरा नबल्दा कार्बन कणहरू कालो धुवाँ बनेर निस्कन्छन्।",
    explanationEng: "Black smoke indicates an overly rich air-fuel mixture: unburnt raw fuel carbon exiting due to clogged intake."
  },

  // ==========================================
  // ADDITIONAL AUTHENTIC DOTM QUESTIONS (65 - 100)
  // ==========================================
  {
    id: 65,
    questionNep: "एम्बुलेन्स, दमकल र शववाहन जस्ता आकस्मिक सवारी साधन आइपुग्दा चालकले के गर्नुपर्छ?",
    questionEng: "What must drivers immediately do when an emergency vehicle (Ambulance/Fire Engine) approaches with siren?",
    category: 'rules',
    categoryLabelNep: 'ऐन तथा नियम',
    categoryLabelEng: 'Rules & Penalties',
    optionsNep: ["अगाडि कुदेर बाटो छेक्ने", "आफ्नो सवारीलाई बायाँ छेउमा च्यापी तत्काल बाटो खाली गरिदिने", "गति बढाएर प्रतिस्पर्धा गर्ने", "हर्न बजाउने"],
    optionsEng: ["Block their passage", "Pull over safely to the left edge and clear the lane immediately", "Race the emergency vehicle", "Honk back"],
    correctIndex: 1,
    explanationNep: "आकस्मिक सेवाका सवारी साधनलाई जीवन रक्षाका लागि पहिलो प्राथमिकता दिई सडक खाली गरिदिनु कानुनी कर्तव्य हो।",
    explanationEng: "Law mandates pulling over to the left to grant unobstructed passage to emergency siren vehicles."
  },
  {
    id: 66,
    questionNep: "सवारी साधनको गति नाप्ने यन्त्रलाई के भनिन्छ?",
    questionEng: "What dashboard gauge measures the current instantaneous speed of a vehicle?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["ओडोमिटर (Odometer)", "स्पिडोमिटर (Speedometer)", "ट्याकोमिटर (Tachometer)", "थर्मोमिटर"],
    optionsEng: ["Odometer", "Speedometer", "Tachometer", "Thermometer"],
    correctIndex: 1,
    explanationNep: "स्पिडोमिटरले सवारीको हालको गति (किमी प्रति घण्टा) देखाउँछ भने ओडोमिटरले कुल गुडेको दूरी देखाउँछ।",
    explanationEng: "The speedometer displays real-time travelling speed in kilometers per hour."
  },
  {
    id: 67,
    questionNep: "सवारी साधनले हालसम्म पार गरेको कुल दूरी (किलोमिटर) नाप्ने मिटर कुन हो?",
    questionEng: "Which dashboard instrument records the total cumulative distance traveled by a vehicle?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["स्पिडोमिटर", "ओडोमिटर (Odometer)", "अल्टिमिटर", "ब्यारोमिटर"],
    optionsEng: ["Speedometer", "Odometer", "Altimeter", "Barometer"],
    correctIndex: 1,
    explanationNep: "ओडोमिटरले सवारी साधन दर्ता भएदेखि हालसम्म गुडेको कुल किलोमिटर संख्या रेकर्ड गर्दछ।",
    explanationEng: "The odometer logs lifetime cumulative distance covered by the vehicle."
  },
  {
    id: 68,
    questionNep: "पुल, घुम्ती र उकालोको मुखमा ओभरटेक (Overtake) गर्न पाइन्छ कि पाइँदैन?",
    questionEng: "Is overtaking permitted on bridges, blind crests, and sharp blind bends?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["पाइन्छ", "पूर्ण रूपमा पाइँदैन (सख्त निषेध)", "साँझको समयमा पाइन्छ", "गति तीव्र भए पाइन्छ"],
    optionsEng: ["Allowed", "Strictly prohibited", "Allowed at dusk", "Allowed if fast"],
    correctIndex: 1,
    explanationNep: "पुल, घुम्ती र डाँडाको मुखमा अगाडिको सडक नदेखिने (Blind zone) हुँदा ओभरटेक गर्दा सिधा दुर्घटना हुन्छ।",
    explanationEng: "Overtaking on blind curves, crests, and bridges is illegal due to zero forward sight distance."
  },
  {
    id: 69,
    questionNep: "सवारी साधन रोकेर पार्किङ गर्दा सडकमा कुन साइडमा पार्क गर्नुपर्छ?",
    questionEng: "On which side of a two-way roadway should you legally park your vehicle?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["दायाँ साइडमा", "बायाँ किनारामा (फुटपाथ छेउ)", "सडकको बीचमा", "जेब्रा क्रसिङमा"],
    optionsEng: ["Right hand side", "Leftmost curb edge", "Middle of the carriageway", "On zebra crossing"],
    correctIndex: 1,
    explanationNep: "सवारी साधनलाई बायाँ किनारामा अन्य सवारीलाई बाधा नपर्ने गरी सुरक्षित पार्किङ गर्नुपर्छ।",
    explanationEng: "Vehicles must be parked snug against the left road margin in the direction of traffic flow."
  },
  {
    id: 70,
    questionNep: "सार्वजनिक सडकमा सवारी साधन पार्क गर्दा के अनिवार्य अन/चालु गर्नुपर्छ?",
    questionEng: "What is mandatory to engage after parking a manual car on an incline?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["एक्सीलेटर", "ह्यान्डब्रेक (Handbrake / Parking Brake)", "वाइपर", "रेडियो"],
    optionsEng: ["Accelerator", "Handbrake / Parking brake engaged", "Wipers", "Radio"],
    correctIndex: 1,
    explanationNep: "सवारी साधन गुड्न नदिन ह्यान्डब्रेक अनिवार्य रूपमा तान्नुपर्छ र उकालोमा गियर १ मा राख्नुपर्छ।",
    explanationEng: "Engage the parking handbrake firmly to prevent the vehicle from rolling away unintentionally."
  },
  {
    id: 71,
    questionNep: "कुहिरो (Fog) वा हुस्सु लागेको मौसममा सवारी चलाउँदा कुन बत्तीको प्रयोग गर्नुपर्छ?",
    questionEng: "Which lighting configuration is most effective when navigating heavy fog or mist?",
    category: 'driving',
    categoryLabelNep: 'सवारी सञ्चालन',
    categoryLabelEng: 'Vehicle Operation',
    optionsNep: ["हाई बिम (High Beam)", "फग लाइट (Fog Light) र लो बिम", "बत्ती बन्द गर्ने", "इन्डिकेटर मात्र"],
    optionsEng: ["High Beam", "Fog Lights and Low Beam", "No lights", "Indicators only"],
    correctIndex: 1,
    explanationNep: "हाई बिमले हुस्सुमा प्रकाश फर्काएर अगाडि देखिँदैन; त्यसैले सडक सतह देखाउने फग लाइट र लो बिम चाहिन्छ।",
    explanationEng: "Low beams and dedicated yellow/low fog lamps pierce mist without reflecting glare back into the driver's eyes."
  },
  {
    id: 72,
    questionNep: "सवारी साधनको ब्याट्रीमा हाल्ने पानी कस्तो पानी हुनुपर्छ?",
    questionEng: "What specific type of water should be topped up into lead-acid automotive batteries?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["धाराको पानी", "डिस्टिल्ड वाटर (Distilled Water)", "नुनिलो पानी", "उमालेको चिया"],
    optionsEng: ["Tap water", "Distilled Water (Demineralized)", "Saline water", "Boiled tea"],
    correctIndex: 1,
    explanationNep: "धाराको पानीमा खनिज (Minerals) हुने भएकाले ब्याट्रीका प्लेट बिग्रिन्छन्; केवल डिस्टिल्ड पानी प्रयोग गर्नुपर्छ।",
    explanationEng: "Only demineralized distilled water prevents mineral buildup and chemical destruction of lead plates."
  },
  {
    id: 73,
    questionNep: "सवारी चालकले सिटबेल्ट (Seatbelt) किन अनिवार्य लगाउनुपर्छ?",
    questionEng: "Why is wearing a 3-point seatbelt mandatory for front seat occupants?",
    category: 'accidents',
    categoryLabelNep: 'दुर्घटना र सुरक्षा',
    categoryLabelEng: 'Accident & First Aid',
    optionsNep: ["ट्राफिक प्रहरीलाई देखाउन मात्र", "दुर्घटना हुँदा अगाडि ठोक्किन वा गाडीबाट बाहिर उछिट्टिनबाट जोगिन", "स्टाइलका लागि", "निदाउन सजिलो हुन"],
    optionsEng: ["To avoid traffic police fines only", "To prevent slamming into windscreen/steering or ejection during crash", "For styling", "To sleep comfortably"],
    correctIndex: 1,
    explanationNep: "सिटबेल्टले तीव्र धक्कामा शरीरलाई स्थिर राखेर विन्डशिल्ड वा स्टेरिङमा टाउको बजारिनबाट जोगाउँछ।",
    explanationEng: "Seatbelts restrain kinetic inertia, preventing secondary impact against dash or fatal ejection."
  },
  {
    id: 74,
    questionNep: "सवारी साधनको पछाडिको ब्याक लाइट (Reverse Light) को रङ्ग कस्तो हुन्छ?",
    questionEng: "What is the standard regulatory color of vehicle reverse lights?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["रातो (Red)", "सेतो वा हल्का पहेंलो (White)", "हरियो (Green)", "कालो (Black)"],
    optionsEng: ["Red", "White or clear", "Green", "Black"],
    correctIndex: 1,
    explanationNep: "गाडी रिभर्स गियरमा हाल्दा पछाडि उज्यालो पार्न र सचेत गराउन सेतो बत्ती बल्छ।",
    explanationEng: "White reverse lights illuminate the back path and announce reversing intent to trailing traffic."
  },
  {
    id: 75,
    questionNep: "सवारी साधनको ब्रेक लाइट (Brake Light) को रङ्ग कस्तो हुन्छ?",
    questionEng: "What is the universal color of brake stop lights on all motor vehicles?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["रातो (Red)", "पहेंलो (Yellow)", "नीलो (Blue)", "सेतो (White)"],
    optionsEng: ["Red", "Yellow", "Blue", "White"],
    correctIndex: 0,
    explanationNep: "ब्रेक पेडल थिच्दा पछाडिका सवारीलाई रोकिन सचेत गराउन चम्किलो रातो बत्ती बल्दछ।",
    explanationEng: "Brake lamps light up bright red to instantly warn trailing motorists of deceleration."
  },
  {
    id: 76,
    questionNep: "गाडी गुडिरहेको बेला अचानक ब्रेक फेल भएमा सबैभन्दा बुद्धिमानी कार्य के हो?",
    questionEng: "What is the safest emergency procedure if your vehicle experiences total hydraulic brake failure?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["गाडीबाट हाम्फाल्ने", "पटक-पटक ब्रेक पम्प गर्ने, गियरलाई क्रमश: १ मा झार्ने र बिस्तारै ह्यान्डब्रेक तान्ने", "एक्सीलेटर दबाउने", "स्टेरिङ छाडिदिने"],
    optionsEng: ["Jump out of vehicle", "Pump brake pedal repeatedly, downshift sequentially to 1st, and gently apply handbrake", "Step on gas pedal", "Abandon steering wheel"],
    correctIndex: 1,
    explanationNep: "इन्जिन ब्रेकिङ (गियर डाउन) ले गति घटाउँछ र नियन्त्रित ह्यान्डब्रेकले गाडीलाई सुरक्षित रोक्न मद्दत गर्छ।",
    explanationEng: "Downshift rapidly through gears to induce engine braking and gently ease handbrake without locking rear tires."
  },
  {
    id: 77,
    questionNep: "सवारी साधनमा रहेको 'रेडिएटर' (Radiator) को मुख्य काम के हो?",
    questionEng: "What is the primary role of a car's cooling radiator?",
    category: 'technical',
    categoryLabelNep: 'यान्त्रिक ज्ञान',
    categoryLabelEng: 'Vehicle Mechanics',
    optionsNep: ["इन्धन सफा गर्ने", "इन्जिनबाट आएको तातो कुलेन्ट/पानीलाई हावाको मद्दतले चिसो पार्ने", "करेन्ट बनाउने", "हावा भर्ने"],
    optionsEng: ["Filter fuel", "Cool down hot engine coolant fluid through airflow dissipation", "Generate spark", "Inflate tires"],
    correctIndex: 1,
    explanationNep: "रेडिएटरले इन्जिनको अत्यधिक तापलाई कुलेन्टमार्फत बाहिरको वायुमण्डलमा विसर्जन गर्छ।",
    explanationEng: "The radiator circulates hot engine coolant through thin finned tubes to dissipate thermal energy."
  },
  {
    id: 78,
    questionNep: "सडकमा 'NO PARKING' (पार्किङ निषेध) को चिन्ह कस्तो हुन्छ?",
    questionEng: "What visual design represents the standard 'No Parking' road sign?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["नीलो पृष्ठभूमिमा रातो घेरा र एउटा छड्के रातो धर्को भएको चिन्ह", "रातो अक्टागन", "पहेंलो त्रिकोण", "हरियो चौकुने"],
    optionsEng: ["Blue background with red circular border and single diagonal red slash", "Red octagon", "Yellow triangle", "Green square"],
    correctIndex: 0,
    explanationNep: "एउटा छड्के धर्कोले पार्किङ निषेध बुझाउँछ भने दोहोरो क्रस (X) ले रोक्न र पार्किङ दुवै निषेध बुझाउँछ।",
    explanationEng: "A blue disc with red rim and single red slash designates No Parking."
  },
  {
    id: 79,
    questionNep: "सडकमा 'NO STOPPING' (सवारी रोक्न निषेध) को चिन्ह कस्तो हुन्छ?",
    questionEng: "What sign indicates 'No Stopping or Standing' at any time?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["नीलो पृष्ठभूमिमा रातो घेरा र दुईवटा क्रस (X) भएको चिन्ह", "उल्टो त्रिकोण", "सेतो रेखा", "कालो गोला"],
    optionsEng: ["Blue disc with red perimeter and a red cross (X)", "Inverted triangle", "White line", "Black circle"],
    correctIndex: 0,
    explanationNep: "रातो क्रस (X) भएको चिन्हले यात्रु चढाउन वा ओराल्न पनि सवारी क्षणभर रोक्न नपाइने जनाउँछ।",
    explanationEng: "A red cross 'X' over a blue circle indicates absolute clearway: no stopping, waiting, or parking."
  },
  {
    id: 80,
    questionNep: "अगाडि विद्यालय वा बालबालिका छन् भनी सचेत गराउने चिन्हको आकार कस्तो हुन्छ?",
    questionEng: "What shape and iconography alerts drivers to children/schools ahead?",
    category: 'signs',
    categoryLabelNep: 'ट्राफिक संकेत',
    categoryLabelEng: 'Road Signs',
    optionsNep: ["रातो किनारा भएको त्रिकोणभित्र बालबालिका हिँडेको चित्र", "गोलाकार नीलो चिन्ह", "आयताकार कालो चिन्ह", "अष्टकोण चिन्ह"],
    optionsEng: ["Triangular red border containing silhouette of school children", "Round blue sign", "Rectangular black sign", "Octagon sign"],
    correctIndex: 0,
    explanationNep: "त्रिकोणात्मक सचेतक चिन्हले चालकलाई गति कम गरी बालबालिका प्रति सतर्क रहन चेतावनी दिन्छ।",
    explanationEng: "A triangular cautionary sign warns motorists to scrub speed and anticipate kids darting onto roads."
  }
];

// Helper to get random exam questions
export function getRandomExamQuestions(count: number = 20, category?: string): Question[] {
  let pool = [...ALL_DOTM_QUESTIONS];
  
  if (category && category !== 'all') {
    pool = pool.filter(q => q.category === category);
  }

  // Fisher-Yates Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(count, pool.length));
}
