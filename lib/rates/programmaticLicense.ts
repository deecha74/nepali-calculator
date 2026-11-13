export interface ProgrammaticLicenseCategory {
  slug: string;
  categoryCode: string;
  vehicleNameEn: string;
  vehicleNameNe: string;
  totalQuestions: number;
  marksPerQuestion: number;
  totalMarks: number;
  passMarks: number;
  correctNeededToPass: number;
  durationMinutes: number;
  minimumAge: number;
  medicalFee: number;
  examFee: number;
  trialPointsPassing: number;
  titleEn: string;
  titleNe: string;
  metaDescEn: string;
  metaDescNe: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
}

export interface ProgrammaticLicenseTopic {
  slug: string;
  topicId: 'rules' | 'signs' | 'driving' | 'technical' | 'accidents' | 'environment';
  topicNameEn: string;
  topicNameNe: string;
  questionCount: number;
  bikeQuestionsWeight: string;
  carQuestionsWeight: string;
  summaryEn: string;
  summaryNe: string;
  titleEn: string;
  titleNe: string;
  metaDescEn: string;
  metaDescNe: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
}

export interface ProgrammaticTrialGuide {
  slug: string;
  vehicleType: 'bike' | 'car';
  titleEn: string;
  titleNe: string;
  subtitleEn: string;
  subtitleNe: string;
  metaDescEn: string;
  metaDescNe: string;
  passingScore: number;
  totalScore: number;
  criteria: {
    taskEn: string;
    taskNe: string;
    maxPoints: number;
    faultDeductionEn: string;
    faultDeductionNe: string;
    isImmediateFail: boolean;
  }[];
  keywords: string[];
  faqs: { question: string; answer: string }[];
}

export const PROGRAMMATIC_LICENSE_CATEGORIES: ProgrammaticLicenseCategory[] = [
  {
    slug: 'bike-category-a',
    categoryCode: 'A',
    vehicleNameEn: 'Motorcycle / Bike (Category A)',
    vehicleNameNe: 'मोटरसाइकल (वर्ग क)',
    totalQuestions: 20,
    marksPerQuestion: 5,
    totalMarks: 100,
    passMarks: 60,
    correctNeededToPass: 12,
    durationMinutes: 30,
    minimumAge: 16,
    medicalFee: 150,
    examFee: 500,
    trialPointsPassing: 70,
    titleEn: 'Category A Bike License Written Exam Nepal 2083 — 20 Qs Mock Test & Rules',
    titleNe: 'वर्ग क मोटरसाइकल लाइसेन्स लिखित परीक्षा २०८३ — २० प्रश्न नमुना अभ्यास',
    metaDescEn: 'Prepare for Nepal Motorcycle (Category A) driving license written exam with 20 official questions, 60% passing mark, fee details, and practical 70-point trial rules.',
    metaDescNe: 'नेपाल मोटरसाइकल (वर्ग क) सवारी चालक अनुमतिपत्र लिखित परीक्षा तयारी। २० वटा प्रश्न, ६० उत्तीर्णांक र ट्रायल नियमको जानकारी।',
    keywords: [
      'bike license exam nepal',
      'category a motorcycle license nepal',
      'bike likhit exam 20 questions',
      'bike license trial rules nepal',
      'motorcycle license pass mark nepal',
      'वर्ग क मोटरसाइकल लाइसेन्स',
      'बाइक लाइसेन्स लिखित परीक्षा'
    ],
    faqs: [
      {
        question: 'How many questions are asked in the Nepal Bike (Category A) written exam?',
        answer: 'There are 20 objective multiple-choice questions worth 5 marks each (total 100 marks). You need at least 12 correct answers (60 marks) to pass within 30 minutes.'
      },
      {
        question: 'What is the minimum age requirement for a motorcycle driving license in Nepal?',
        answer: 'Applicants must be at least 16 years of age with a valid Nepali citizenship certificate to apply for Category A (Motorcycle).'
      },
      {
        question: 'What is the passing score in the motorcycle practical trial?',
        answer: 'Under the 70-point trial system introduced by DoTM, you must score at least 70 points out of 100 on the practical trial course (8-figure, narrow plank, speed breaker, ramp/uphill, and traffic lights).'
      }
    ]
  },
  {
    slug: 'scooter-category-k',
    categoryCode: 'K',
    vehicleNameEn: 'Scooter & Moped (Category K)',
    vehicleNameNe: 'स्कुटर तथा मोपेड (वर्ग ट)',
    totalQuestions: 20,
    marksPerQuestion: 5,
    totalMarks: 100,
    passMarks: 60,
    correctNeededToPass: 12,
    durationMinutes: 30,
    minimumAge: 16,
    medicalFee: 150,
    examFee: 500,
    trialPointsPassing: 70,
    titleEn: 'Category K Scooter License Likhit Exam Nepal 2083 — Questions & Trial Guide',
    titleNe: 'वर्ग ट स्कुटर लाइसेन्स लिखित परीक्षा २०८३ — प्रश्नोत्तर र ट्रायल नियम',
    metaDescEn: 'Complete preparation guide for Category K (Scooter) driving license in Nepal. Practice 20 official DoTM questions, check 60% passing criteria, and 70-point trial rules.',
    metaDescNe: 'नेपालमा वर्ग ट (स्कुटर) लाइसेन्स लिखित परीक्षा तयारी। आधिकारिक २० प्रश्न, ६०% उत्तीर्णांक र ट्रायल निर्देशिका।',
    keywords: [
      'scooter license nepal',
      'category k license nepal',
      'scooter likhit exam questions',
      'scooter trial 70 marks nepal',
      'skutar license pass mark',
      'स्कुटर लाइसेन्स लिखित परीक्षा',
      'वर्ग ट लाइसेन्स तयारी'
    ],
    faqs: [
      {
        question: 'Is the written exam syllabus for Scooter different from Bike?',
        answer: 'No. Category K (Scooter) and Category A (Motorcycle) share the exact same 500-question DoTM question bank and 20-question (5 marks/Q) exam format.'
      },
      {
        question: 'Can I ride a motorcycle if I hold a Category K Scooter license?',
        answer: 'No. Category K permits you to ride scooters and mopeds only. If you wish to ride a geared motorcycle, you must apply for Category A or add Category A via trial.'
      }
    ]
  },
  {
    slug: 'car-category-b',
    categoryCode: 'B',
    vehicleNameEn: 'Car, Jeep & Delivery Van (Category B)',
    vehicleNameNe: 'कार, जिप तथा डेलिभरी भ्यान (वर्ग ख)',
    totalQuestions: 25,
    marksPerQuestion: 4,
    totalMarks: 100,
    passMarks: 60,
    correctNeededToPass: 15,
    durationMinutes: 30,
    minimumAge: 18,
    medicalFee: 150,
    examFee: 500,
    trialPointsPassing: 70,
    titleEn: 'Category B Car License Likhit Exam Nepal 2083 — 25 Qs Mock Test & Passing Rules',
    titleNe: 'वर्ग ख कार लाइसेन्स लिखित परीक्षा २०८३ — २५ प्रश्न नमुना अभ्यास र नियम',
    metaDescEn: 'Prepare for Nepal Car, Jeep & Van (Category B) driving license written exam with 25 official questions, 60% passing mark (15 correct), and 70-point trial checklist.',
    metaDescNe: 'नेपालमा वर्ग ख (कार, जिप) लाइसेन्स लिखित परीक्षा तयारी। २५ वटा प्रश्न, ६० उत्तीर्णांक (१५ वटा सही) र ७० अंक ट्रायल नियम।',
    keywords: [
      'car license exam nepal',
      'category b car license likhit',
      'car likhit 25 questions nepal',
      'car driving license trial 70 marks',
      'car license pass mark nepal',
      'कार लाइसेन्स लिखित परीक्षा',
      'वर्ग ख कार सवारी चालक अनुमतिपत्र'
    ],
    faqs: [
      {
        question: 'How many questions are in the Car (Category B) written exam in Nepal?',
        answer: 'The Category B written test consists of 25 multiple-choice questions worth 4 marks each (100 total). You must get at least 15 correct answers (60 marks) within 30 minutes.'
      },
      {
        question: 'What is the minimum age requirement for a Car driving license in Nepal?',
        answer: 'Applicants must be at least 18 years of age with a valid Nepali citizenship certificate to apply for Category B (Car, Jeep, Delivery Van).'
      },
      {
        question: 'How does the 70-point trial work for Car in Nepal?',
        answer: 'You are graded on 8-figure driving, garage/T-parking, hill stop and start (ramp), speed breaker, and traffic light obedience. You can deduct up to 30 marks for minor errors and still pass with 70+ points.'
      }
    ]
  }
];

export const PROGRAMMATIC_LICENSE_TOPICS: ProgrammaticLicenseTopic[] = [
  {
    slug: 'traffic-rules-and-regulations',
    topicId: 'rules',
    topicNameEn: 'Traffic Laws, Motor Vehicle Act & Rules',
    topicNameNe: 'सवारी ऐन तथा नियम सम्बन्धी ज्ञान',
    questionCount: 100,
    bikeQuestionsWeight: '4 to 5 Questions (20 to 25 Marks)',
    carQuestionsWeight: '5 to 6 Questions (20 to 24 Marks)',
    summaryEn: 'Covers Nepal Motor Vehicles and Transport Management Act 2049, driving without license penalties, ownership transfer (Namsari) rules, road tax, and right of way.',
    summaryNe: 'सवारी तथा यातायात व्यवस्था ऐन २०४९, जरिवाना, नामसारी, ब्लुबुक नविकरण र सडक प्राथमिकता नियम सम्बन्धी प्रश्नहरू।',
    titleEn: 'Traffic Rules & Penalties Questions Nepal Driving License (सवारी ऐन नियम)',
    titleNe: 'सवारी ऐन तथा नियम सम्बन्धी प्रश्नोत्तर — नेपाल सवारी चालक अनुमतिपत्र',
    metaDescEn: 'Practice official DoTM questions on Nepal traffic rules, fines, vehicle act 2049, and licensing regulations with bilingual explanations.',
    metaDescNe: 'नेपाल सवारी ऐन, नियम, जरिवाना र लाइसेन्स कानुन सम्बन्धी यातायात व्यवस्था विभागका आधिकारिक प्रश्नोत्तरहरू।',
    keywords: [
      'traffic rules questions nepal',
      'nepal vehicle act 2049 questions',
      'driving license traffic law question bank',
      'dotm traffic rules mcq nepal',
      'सवारी ऐन तथा नियम सम्बन्धी प्रश्न',
      'ट्राफिक नियम लाइसेन्स प्रश्न'
    ],
    faqs: [
      {
        question: 'Within how many days must ownership transfer (Namsari) be done after buying a vehicle in Nepal?',
        answer: 'Ownership transfer (सवारी नामसारी) must be registered at the Transport Management Office within 35 days of purchase.'
      },
      {
        question: 'What is the fine for driving without a valid driving license in Nepal?',
        answer: 'Under the Motor Vehicles and Transport Management Act, driving without a license carries a fine of Rs 500 to Rs 1,500 for the first offense, with increasing penalties and vehicle impoundment for repeat offenses.'
      }
    ]
  },
  {
    slug: 'traffic-signs-and-signals',
    topicId: 'signs',
    topicNameEn: 'Road Signs, Signals & Pavement Markings',
    topicNameNe: 'सडक संकेत तथा ट्राफिक चिन्ह सम्बन्धी ज्ञान',
    questionCount: 100,
    bikeQuestionsWeight: '4 to 5 Questions (20 to 25 Marks)',
    carQuestionsWeight: '5 to 6 Questions (20 to 24 Marks)',
    summaryEn: 'Comprehensive guide to mandatory circular signs, warning triangular signs, rectangular guide signs, traffic light sequences, and road surface markings.',
    summaryNe: 'अनिवार्य गोलाकार चिन्ह, चेतावनीमूलक त्रिकोणात्मक चिन्ह, सूचनामूलक आयताकार चिन्ह, ट्राफिक बत्ती र सडक रेखांकनहरू।',
    titleEn: 'Traffic Signs & Road Signals Questions Nepal (ट्राफिक चिन्ह प्रश्नोत्तर)',
    titleNe: 'सडक संकेत तथा ट्राफिक चिन्ह सम्बन्धी प्रश्नोत्तर — लाइसेन्स परीक्षा तयारी',
    metaDescEn: 'Master all official Nepal traffic signs and signals for the driving license written exam with high-resolution diagrams, meanings, and test mode.',
    metaDescNe: 'ट्राफिक चिन्ह, सडक संकेत र बत्ती सम्बन्धी यातायात विभागका आधिकारिक प्रश्नहरू चित्र र अर्थसहित अध्ययन गर्नुहोस्।',
    keywords: [
      'traffic signs questions nepal',
      'dotm road signs nepal license',
      'nepal driving license signs question bank',
      'traffic signals exam nepal',
      'ट्राफिक चिन्ह लाइसेन्स प्रश्नोत्तर',
      'सडक संकेत नेपाल'
    ],
    faqs: [
      {
        question: 'What does a red circular border traffic sign indicate in Nepal?',
        answer: 'A red circular border indicates a mandatory/regulatory prohibition sign (e.g. No Entry, No Right Turn, Speed Limit), which drivers must legally obey.'
      },
      {
        question: 'What does a solid double yellow/white center line on the road mean?',
        answer: 'A solid double center line means overtaking or crossing the line is strictly prohibited for vehicles traveling in both directions.'
      }
    ]
  },
  {
    slug: 'vehicle-technical-knowledge',
    topicId: 'technical',
    topicNameEn: 'Vehicle Technical, Mechanical & Operational Knowledge',
    topicNameNe: 'सवारी साधनको प्राविधिक तथा यान्त्रिक ज्ञान',
    questionCount: 80,
    bikeQuestionsWeight: '3 to 4 Questions (15 to 20 Marks)',
    carQuestionsWeight: '4 to 5 Questions (16 to 20 Marks)',
    summaryEn: 'Details on engine components, clutch, brake systems, tire pressure, coolant, battery maintenance, dashboard warning lights, and emergency repairs.',
    summaryNe: 'इन्जिन, क्लच, ब्रेक, टायर प्रेसर, कुलेन्ट, ब्याट्री र ड्यासबोर्ड इन्डिकेटर बत्ती सम्बन्धी प्राविधिक प्रश्नहरू।',
    titleEn: 'Vehicle Mechanical & Technical Knowledge Questions Nepal License',
    titleNe: 'सवारी साधनको प्राविधिक तथा यान्त्रिक ज्ञान — लाइसेन्स प्रश्न बैंक',
    metaDescEn: 'Practice official DoTM mechanical and technical questions on engines, brakes, tires, and maintenance for Nepal driving license preparation.',
    metaDescNe: 'सवारी साधनको इन्जिन, ब्रेक, टायर, कुलेन्ट र मर्मत सम्बन्धी प्राविधिक प्रश्नहरू नेपाली र अंग्रेजीमा।',
    keywords: [
      'vehicle mechanical questions nepal license',
      'dotm technical knowledge questions',
      'car engine questions nepal driving license',
      'bike mechanics likhit questions',
      'सवारी प्राविधिक ज्ञान प्रश्न',
      'इन्जिन र ब्रेक सम्बन्धी प्रश्न'
    ],
    faqs: [
      {
        question: 'What happens when engine coolant level becomes critically low?',
        answer: 'Low coolant causes the engine to overheat rapidly, which can result in cylinder head distortion, gasket blown, and catastrophic engine seizure.'
      },
      {
        question: 'How often should motor vehicle engine oil and tire pressure be checked?',
        answer: 'Tire pressure should be checked weekly, and engine oil level should be checked at least once every 1 to 2 weeks before cold start.'
      }
    ]
  },
  {
    slug: 'safe-driving-principles',
    topicId: 'driving',
    topicNameEn: 'Principles of Safe Driving & Road Etiquette',
    topicNameNe: 'सवारी चलाउने सैद्धान्तिक तथा व्यावहारिक ज्ञान',
    questionCount: 80,
    bikeQuestionsWeight: '3 to 4 Questions (15 to 20 Marks)',
    carQuestionsWeight: '4 Questions (16 Marks)',
    summaryEn: 'Safe following distances (2-second rule), overtaking on slopes, night driving, driving in heavy rain and fog, hill climbing, and roundabouts.',
    summaryNe: 'सुरक्षित दूरी, ओभरटेक गर्ने नियम, राति र कुहिरोमा गाडी चलाउने विधि, उकालो-ओरालो र राउन्डअबाउट नियम।',
    titleEn: 'Safe Driving Principles Questions Nepal License (सुरक्षित ड्राइभिङ ज्ञान)',
    titleNe: 'सवारी चलाउने सैद्धान्तिक तथा व्यावहारिक ज्ञान — लाइसेन्स प्रश्नोत्तर',
    metaDescEn: 'Learn essential defensive driving techniques, overtaking rules, speed management, and adverse weather safety for the DoTM written test.',
    metaDescNe: 'सुरक्षित सवारी सञ्चालन, ओभरटेकिङ नियम, रात्रिकालीन ड्राइभिङ र मौसम सम्बन्धी आधिकारिक प्रश्नोत्तरहरू।',
    keywords: [
      'safe driving principles nepal license',
      'defensive driving questions nepal',
      'overtaking rules likhit exam',
      'driving etiquette nepal questions',
      'सुरक्षित सवारी चलाउने ज्ञान',
      'ड्राइभिङ सिद्धान्त प्रश्न'
    ],
    faqs: [
      {
        question: 'Which side should you overtake a moving vehicle from in Nepal?',
        answer: 'In Nepal (left-hand traffic system), you must always overtake a moving vehicle from its right side after signaling, never from the left shoulder.'
      },
      {
        question: 'What is the safe following distance rule in normal dry weather conditions?',
        answer: 'The standard guideline is the 2-second rule behind the preceding vehicle, which increases to 4 seconds during rain or foggy conditions.'
      }
    ]
  },
  {
    slug: 'accident-awareness-first-aid',
    topicId: 'accidents',
    topicNameEn: 'Accident Prevention, Awareness & First Aid',
    topicNameNe: 'दुर्घटना सचेतना तथा प्राथमिक उपचार सम्बन्धी ज्ञान',
    questionCount: 70,
    bikeQuestionsWeight: '2 to 3 Questions (10 to 15 Marks)',
    carQuestionsWeight: '3 Questions (12 Marks)',
    summaryEn: 'Emergency procedures during road accidents, notifying Nepal Police (100) and Traffic Police (103), emergency first aid, CPR basics, and safe passenger rescue.',
    summaryNe: 'सडक दुर्घटनामा गर्नुपर्ने काम, १०० र १०३ मा सम्पर्क, प्राथमिक उपचार र घाइतेको उद्धार सम्बन्धी प्रश्नहरू।',
    titleEn: 'Accident Awareness & First Aid Questions Nepal License (दुर्घटना सचेतना)',
    titleNe: 'दुर्घटना सचेतना तथा प्राथमिक उपचार सम्बन्धी प्रश्नोत्तर — नेपाल लाइसेन्स',
    metaDescEn: 'Prepare for accident awareness, highway emergency protocol, emergency phone numbers, and first-aid questions for Nepal driving license.',
    metaDescNe: 'सडक दुर्घटना, उद्धार, १००/१०३ प्रहरी सम्पर्क र प्राथमिक उपचार सम्बन्धी यातायात विभागका आधिकारिक प्रश्नहरू।',
    keywords: [
      'accident awareness questions nepal',
      'first aid driving license questions nepal',
      'traffic police 103 accident emergency',
      'dotm accident questions bank',
      'दुर्घटना सचेतना प्रश्नोत्तर',
      'प्राथमिक उपचार लाइसेन्स'
    ],
    faqs: [
      {
        question: 'What emergency numbers should be called immediately following a road accident in Nepal?',
        answer: 'Dial 100 for Nepal Police, 103 for Nepal Traffic Police, and 102 for emergency ambulance services.'
      },
      {
        question: 'What is the primary rule of first aid when attending an unconscious injured victim?',
        answer: 'Check the ABCs: Airway (clear the respiratory passage), Breathing (check airflow), and Circulation (check pulse and control severe bleeding).'
      }
    ]
  },
  {
    slug: 'environmental-pollution-awareness',
    topicId: 'environment',
    topicNameEn: 'Environmental Pollution, Vehicle Emissions & Fuel Economy',
    topicNameNe: 'वातावरण प्रदूषण तथा इन्धन बचत सम्बन्धी ज्ञान',
    questionCount: 70,
    bikeQuestionsWeight: '2 to 3 Questions (10 to 15 Marks)',
    carQuestionsWeight: '2 to 3 Questions (8 to 12 Marks)',
    summaryEn: 'Vehicle emission standards in Nepal (Nepal Vehicle Mass Emission Standard / Euro III), green sticker rules, noise pollution, catalytic converter, and eco-driving.',
    summaryNe: 'हरियो स्टिकर नियम, सवारी प्रदूषण जाँच, ध्वनी प्रदूषण, क्याटालिटिक कन्भर्टर र इन्धन बचाउने विधि।',
    titleEn: 'Environmental Pollution & Emission Questions Nepal Driving License',
    titleNe: 'वातावरण प्रदूषण तथा सवारी उत्सर्जन सम्बन्धी प्रश्नोत्तर — लाइसेन्स तयारी',
    metaDescEn: 'Study official DoTM questions on green stickers, vehicle emission testing, sound pollution, and fuel efficiency for Nepal driving license test.',
    metaDescNe: 'हरियो स्टिकर, सवारी धुवाँ जाँच, प्रदूषण नियन्त्रण र इन्धन बचत सम्बन्धी यातायात विभागका प्रश्नोत्तरहरू।',
    keywords: [
      'environmental pollution questions nepal license',
      'vehicle emission test nepal green sticker',
      'sound pollution horn rules nepal questions',
      'dotm environment mcq nepal',
      'वातावरण प्रदूषण लाइसेन्स प्रश्न',
      'हरियो स्टिकर सवारी जाँच'
    ],
    faqs: [
      {
        question: 'What does a green emission sticker on a vehicle windshield signify in Nepal?',
        answer: 'A green sticker signifies that the vehicle has successfully passed the mandatory government tailpipe emission test within permissible limits.'
      },
      {
        question: 'Is unnecessary horn blowing allowed in Kathmandu Valley and other urban centers?',
        answer: 'No. Unnecessary horn blowing is strictly prohibited under the No-Horn rule in Kathmandu Valley and major cities, punishable by traffic fines.'
      }
    ]
  }
];

export const PROGRAMMATIC_TRIAL_GUIDES: ProgrammaticTrialGuide[] = [
  {
    slug: 'bike-70-mark-trial-system',
    vehicleType: 'bike',
    titleEn: 'Nepal Bike 70-Point Practical Trial Test Rules & Score Calculator (मोटरसाइकल ७० अंक प्रणाली)',
    titleNe: 'मोटरसाइकल ७० अंक प्रयोगात्मक परीक्षा (ट्रायल) नियम र अंक तालिका',
    subtitleEn: 'Detailed points breakdown for 8-figure, narrow plank, speed breaker, ramp/uphill, and traffic lights with interactive pass/fail simulator.',
    subtitleNe: '८ (आठ) आकार, साँघुरो फल्याक, स्पिड ब्रेकर, उकालो-ओरालो र ट्राफिक बत्तीको अंक गणना।',
    metaDescEn: 'Learn the official DoTM 70-mark motorcycle trial exam rules in Nepal. See allowed mistakes, point deductions, and immediate disqualification criteria.',
    metaDescNe: 'नेपालमा मोटरसाइकल ७० अंक ट्रायल परीक्षाका नियमहरू, गल्तीमा काटिने अंक र पास हुने सरल तरिकाहरू।',
    passingScore: 70,
    totalScore: 100,
    criteria: [
      {
        taskEn: '8-Figure Maneuver (घुमाउरो ८ आकार)',
        taskNe: '८ आकारको घुमाउरो ट्रयाक',
        maxPoints: 20,
        faultDeductionEn: '-5 marks for touching boundary line once (crossing line or second touch = fail)',
        faultDeductionNe: 'एक पटक घेरा छोएमा ५ अंक काटिने (घेरा काटेमा वा दोस्रो पटक छोएमा फेल)',
        isImmediateFail: false
      },
      {
        taskEn: 'Narrow Wooden Plank (साँघुरो फल्याक)',
        taskNe: 'साँघुरो फल्याक पार गर्ने',
        maxPoints: 10,
        faultDeductionEn: 'Wheels leaving plank or foot touching ground = immediate fail (10 marks deducted)',
        faultDeductionNe: 'फल्याकबाट तल झरेमा वा खुट्टा टेकेमा तत्काल फेल (१० अंक काटिने)',
        isImmediateFail: true
      },
      {
        taskEn: 'Traffic Light Obedience (ट्राफिक संकेत बत्ती)',
        taskNe: 'ट्राफिक लाइट पालना',
        maxPoints: 15,
        faultDeductionEn: '-15 marks for crossing stop line on red signal',
        faultDeductionNe: 'रातो बत्तीमा रोकिएन भने १५ अंक काटिने',
        isImmediateFail: false
      },
      {
        taskEn: 'Speed Breaker / Bumps (उबडखाबड/स्पिड ब्रेकर)',
        taskNe: 'उबडखाबड पार गर्ने',
        maxPoints: 15,
        faultDeductionEn: '-5 marks for engine shutoff once; -5 marks for one foot touch',
        faultDeductionNe: 'एक पटक सवारी रोकिएमा ५ अंक र एक पटक खुट्टा टेकेमा ५ अंक काटिने',
        isImmediateFail: false
      },
      {
        taskEn: 'Ramp / Uphill & Downhill Stop (उकालो-ओरालो)',
        taskNe: 'उकालोमा रोकेर उठाउने',
        maxPoints: 20,
        faultDeductionEn: 'Rolling back more than 6 inches or line cross = fail; engine stop once = -5 marks',
        faultDeductionNe: '६ इन्चभन्दा बढी पछाडि सरेमा फेल; एक पटक इन्जिन बन्द भएमा ५ अंक काटिने',
        isImmediateFail: false
      },
      {
        taskEn: 'Side Indicator & Mirror Check (साइड लाइट र ऐना)',
        taskNe: 'मोड्दा साइड इन्डिकेटर बाल्ने',
        maxPoints: 10,
        faultDeductionEn: '-10 marks for failure to operate side indicator before turns',
        faultDeductionNe: 'मोड्दा साइड लाइट नबालेमा १० अंक काटिने',
        isImmediateFail: false
      },
      {
        taskEn: 'Garage / Parking Test (ग्यारेज/पार्किङ)',
        taskNe: 'सवारी ठीक ठाउँमा पार्किङ गर्ने',
        maxPoints: 10,
        faultDeductionEn: '-10 marks for improper parking or boundary touch',
        faultDeductionNe: 'पार्किङ ठीकसँग नगरेमा वा घेरा छोएमा १० अंक काटिने',
        isImmediateFail: false
      }
    ],
    keywords: [
      'bike trial 70 marks nepal',
      'motorcycle 70 point trial rules',
      'nepal bike trial pass marks',
      'narrow plank bike trial nepal',
      'bike trial 8 figure rules',
      'मोटरसाइकल ७० अंक ट्रायल नियम',
      'बाइक ट्रायल पास अंक'
    ],
    faqs: [
      {
        question: 'How many times can you touch your foot down in the Bike 70-point trial?',
        answer: 'You are permitted to touch your foot once during the 8-figure maneuver (deducts 5 points). However, touching your foot on the narrow plank causes immediate failure.'
      },
      {
        question: 'What is the minimum passing score in the motorcycle trial?',
        answer: 'You must score at least 70 points out of 100 to pass the trial test and be eligible to receive your Nepal driving license.'
      }
    ]
  },
  {
    slug: 'car-70-point-system',
    vehicleType: 'car',
    titleEn: 'Nepal Car 70-Point Practical Trial Test Rules & Score Calculator (कार ७० अंक प्रणाली)',
    titleNe: 'कार ७० अंक प्रयोगात्मक परीक्षा (ट्रायल) नियम र अंक तालिका',
    subtitleEn: 'Complete evaluation rubric for car 8-figure, T-parking/garage, ramp hill start, and traffic light obedience.',
    subtitleNe: 'कारको घुमाउरो ८, ग्यारेज टी-पार्किङ, उकालो-ओरालो र ट्राफिक बत्तीको अंक गणना।',
    metaDescEn: 'Complete guide to the Category B (Car/Jeep) 70-mark driving license practical trial in Nepal with scoring rules and deduction guidelines.',
    metaDescNe: 'नेपालमा कार (वर्ग ख) ७० अंक ट्रायल परीक्षाका नियमहरू, अंक तालिका र गल्तीमा काटिने अंकको विवरण।',
    passingScore: 70,
    totalScore: 100,
    criteria: [
      {
        taskEn: '8-Figure Driving (घुमाउरो ८ आकार)',
        taskNe: '८ आकारको घुमाउरो ट्रयाक',
        maxPoints: 20,
        faultDeductionEn: '-5 marks for touching boundary line once (crossing line = fail)',
        faultDeductionNe: 'एक पटक घेरा छोएमा ५ अंक काटिने (घेरा नाघेमा फेल)',
        isImmediateFail: false
      },
      {
        taskEn: 'T-Parking / Garage Reverse (टी-पार्किङ र ब्याक)',
        taskNe: 'ग्यारेज तथा टी-पार्किङ',
        maxPoints: 20,
        faultDeductionEn: '-10 marks for one forward adjustment; touching pole/wall = fail',
        faultDeductionNe: 'एक पटक अगाडि बढाएमा १० अंक काटिने; पोल वा भित्ता छोएमा फेल',
        isImmediateFail: false
      },
      {
        taskEn: 'Traffic Light Obedience (ट्राफिक बत्ती पालना)',
        taskNe: 'ट्राफिक बत्तीको पालना',
        maxPoints: 15,
        faultDeductionEn: '-15 marks for failing to stop at red traffic signal',
        faultDeductionNe: 'रातो बत्तीमा नरोकिएमा १५ अंक काटिने',
        isImmediateFail: false
      },
      {
        taskEn: 'Ramp / Uphill Stop & Start (उकालो-ओरालो)',
        taskNe: 'उकालोमा रोकेर उठाउने',
        maxPoints: 20,
        faultDeductionEn: 'Rolling back more than 6 inches = fail; engine stall once = -5 marks',
        faultDeductionNe: '६ इन्चभन्दा बढी पछाडि सरेमा फेल; एक पटक गाडी बन्द भएमा ५ अंक काटिने',
        isImmediateFail: false
      },
      {
        taskEn: 'Speed Breaker / Bumps (उबडखाबड)',
        taskNe: 'उबडखाबड पार गर्ने',
        maxPoints: 10,
        faultDeductionEn: '-5 marks if engine stops once while crossing',
        faultDeductionNe: 'पार गर्दा एक पटक गाडी बन्द भएमा ५ अंक काटिने',
        isImmediateFail: false
      },
      {
        taskEn: 'Seatbelt, Mirrors & Indicators (सिटबेल्ट र साइड लाइट)',
        taskNe: 'सिटबेल्ट, साइड लाइट र ऐना',
        maxPoints: 15,
        faultDeductionEn: '-5 marks for no seatbelt; -10 marks for no indicator before turning',
        faultDeductionNe: 'सिटबेल्ट नबाँधेमा ५ अंक; साइड लाइट नबालेमा १० अंक काटिने',
        isImmediateFail: false
      }
    ],
    keywords: [
      'car trial 70 marks nepal',
      'car 70 point trial rules',
      't parking car trial nepal',
      'car ramp uphill trial nepal',
      'category b car trial pass marks',
      'कार ७० अंक ट्रायल नियम',
      'कार ट्रायल पास अंक'
    ],
    faqs: [
      {
        question: 'What is the passing mark for the Car practical trial in Nepal?',
        answer: 'You must score at least 70 marks out of 100 on the practical test to pass.'
      },
      {
        question: 'What happens if you touch a pole or cone during T-parking in the Car trial?',
        answer: 'Touching a pole, boundary curb, or boundary line during the garage T-parking test results in immediate disqualification.'
      }
    ]
  }
];


export interface ProgrammaticLongtailGuide {
  slug: string;
  category: 'exam-rules' | 'trial-tips' | 'medical-vision' | 'fees-status';
  titleEn: string;
  titleNe: string;
  shortSnippetEn: string;
  shortSnippetNe: string;
  metaDescEn: string;
  metaDescNe: string;
  keyTakeaway: string;
  bulletPointsEn: string[];
  bulletPointsNe: string[];
  relatedToolPath: string;
  relatedToolLabelEn: string;
  relatedToolLabelNe: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
}

export const PROGRAMMATIC_LONGTAIL_GUIDES: ProgrammaticLongtailGuide[] = [
  {
    slug: 'is-there-negative-marking-in-likhit-exam-nepal',
    category: 'exam-rules',
    titleEn: 'Is There Negative Marking in Nepal Driving License Likhit Exam?',
    titleNe: 'नेपाल सवारी चालक लिखित परीक्षामा नेगेटिभ मार्किङ हुन्छ कि हुँदैन?',
    shortSnippetEn: 'No, there is strictly NO negative marking in the Nepal DoTM driving license written examination. You should attempt all questions.',
    shortSnippetNe: 'छैन, यातायात व्यवस्था विभागको लिखित परीक्षामा कुनै पनि नेगेटिभ मार्किङ (ऋणात्मक अंक) हुँदैन। सबै प्रश्न हल गर्नुहोस्।',
    metaDescEn: 'Find out whether negative marking exists in Nepal driving license likhit exam. Learn official scoring rules, passing criteria (60/100), and tips.',
    metaDescNe: 'नेपाल सवारी चालक अनुमतिपत्र लिखित परीक्षामा नेगेटिभ मार्किङ सम्बन्धी आधिकारिक नियम र ६० उत्तीर्णांकको जानकारी।',
    keyTakeaway: 'Zero penalty for wrong answers. Attempt all 20 questions for Bike (or 25 for Car).',
    bulletPointsEn: [
      'Every correct answer earns 5 marks for Bike (Cat A/K) or 4 marks for Car (Cat B).',
      'Incorrect or unanswered questions simply receive 0 marks — no deduction from your score.',
      'Passing threshold is 60 marks (12 correct for Bike, 15 correct for Car).',
      'Even if you are unsure of an answer, always make an educated guess!'
    ],
    bulletPointsNe: [
      'मोटरसाइकल (क/ट) का लागि प्रत्येक सही उत्तरमा ५ अंक र कार (ख) का लागि ४ अंक पाइन्छ।',
      'गलत उत्तर दिएमा कुनै अंक काटिँदैन (० अंक मात्र हुन्छ)।',
      'पास हुन ६० अंक चाहिन्छ (बाइकमा १२ वटा, कारमा १५ वटा सही हुनुपर्छ)।',
      'उत्तर थाहा नभए पनि अनुमान लगाएर सबै प्रश्नमा चिन्ह लगाउनुहोस्।'
    ],
    relatedToolPath: '/license/mock-test',
    relatedToolLabelEn: 'Practice Realistic Mock Test Online',
    relatedToolLabelNe: 'नमुना लिखित परीक्षा अभ्यास गर्नुहोस्',
    keywords: [
      'is there negative marking in license likhit exam nepal',
      'likhit exam negative marking nepal',
      'nepal driving license pass mark negative marking',
      'लिखित परीक्षामा नेगेटिभ मार्किङ हुन्छ कि हुँदैन',
      'सवारी चालक अनुमतिपत्र नेगेटिभ अंक'
    ],
    faqs: [
      {
        question: 'Does selecting a wrong option deduct points from other correct answers?',
        answer: 'No. Incorrect answers do not reduce your earned points. Marks are solely added for correct selections.'
      },
      {
        question: 'Should I leave any question blank in the DoTM exam?',
        answer: 'Never leave questions blank. Since there is no negative marking, guessing gives you a 25% to 50% chance of gaining 4-5 free marks.'
      }
    ]
  },
  {
    slug: 'how-many-retrials-allowed-nepal-license',
    category: 'exam-rules',
    titleEn: 'How Many Retrials Are Allowed for Driving License in Nepal?',
    titleNe: 'नेपालमा लाइसेन्स ट्रायल फेल भएपछि कति पटक रिट्रायल दिन पाइन्छ?',
    shortSnippetEn: 'You are allowed up to 3 practical trial attempts within an 18-month validity period from the date of your written exam pass.',
    shortSnippetNe: 'लिखित परीक्षा पास भएको मितिले १८ महिनाभित्र तपाईंले जम्मा ३ पटकसम्म प्रयोगात्मक परीक्षा (ट्रायल) दिन पाउनुहुन्छ।',
    metaDescEn: 'Complete guide to driving license retrial rules in Nepal. Know cooling days (10 days), retrial fees, and what to do if you fail trial 3 times.',
    metaDescNe: 'नेपालमा सवारी चालक अनुमतिपत्र रिट्रायल दिने नियम, लाग्ने दस्तुर र १८ महिने म्याद सम्बन्धी सम्पूर्ण जानकारी।',
    keyTakeaway: '3 total trial attempts within 18 months without retaking the written exam.',
    bulletPointsEn: [
      'Attempt 1 is included with your initial application.',
      'If you fail attempt 1, you can give Retrial 1 (Attempt 2) after paying the government retrial fee (Rs 500).',
      'If you fail attempt 2, you can give Retrial 2 (Attempt 3).',
      'If you fail all 3 attempts, you must wait until the 18-month validity expires and submit a fresh application.'
    ],
    bulletPointsNe: [
      'पहिलो प्रयास मुख्य फारामसँगै समावेश हुन्छ।',
      'पहिलो पटक फेल भएमा १० दिनपछि रु ५०० रसिद काटेर दोस्रो प्रयास दिन सकिन्छ।',
      'दोस्रो पटक पनि फेल भएमा पुनः तेस्रो प्रयास दिन पाइन्छ।',
      'तीनवटै प्रयास असफल भएमा १८ महिनापछि मात्र नयाँ फाराम भरेर सुरुबाट परीक्षा दिनुपर्छ।'
    ],
    relatedToolPath: '/license/trial',
    relatedToolLabelEn: 'View 70-Point Trial Scoring Rules',
    relatedToolLabelNe: '७० अंक ट्रायल नियम हेर्नुहोस्',
    keywords: [
      'how many retrials allowed driving license nepal',
      'nepal driving license trial fail rules',
      'retrial fee nepal license',
      'लाइसेन्स ट्रायल फेल भएपछि के गर्ने',
      'रिट्रायल दिने नियम नेपाल'
    ],
    faqs: [
      {
        question: 'Do I need to pass the written (Likhit) exam again if I fail the trial?',
        answer: 'No. Your written exam pass status remains valid for 18 months, covering all 3 trial attempts.'
      },
      {
        question: 'How long do I have to wait before applying for a retrial?',
        answer: 'You can typically pay the retrial fee and schedule your next trial after 10 working days from your failed attempt.'
      }
    ]
  },
  {
    slug: 'bike-trial-8-shape-rules-deductions',
    category: 'trial-tips',
    titleEn: 'Bike Trial 8-Shape Rules & Marks Deduction in Nepal (८ आकार नियम)',
    titleNe: 'मोटरसाइकल ट्रायलमा ८ (आठ) आकारको नियम र अंक कट्टा विवरण',
    shortSnippetEn: 'The 8-figure maneuver carries 20 marks. Touching the outer yellow border line once deducts 5 marks; crossing it or second touch causes failure.',
    shortSnippetNe: '८ आकारको ट्रयाक २० अंकको हुन्छ। एक पटक घेरा छोएमा ५ अंक काटिन्छ तर घेरा नाघेमा वा दोस्रो पटक छोएमा फेल हुन्छ।',
    metaDescEn: 'Master the 8-shape maneuver in Nepal motorcycle driving trial. Learn speed control, foot touch rules, indicator signaling, and line touch deductions.',
    metaDescNe: 'नेपालमा बाइक ट्रायलको ८ आकार सहजै पास गर्ने तरिका, गियर र क्लच नियन्त्रण तथा अंक नकाटिने उपायहरू।',
    keyTakeaway: 'Maintain 1st gear with gentle clutch slip; look 2-3 meters ahead, not down at the front tire.',
    bulletPointsEn: [
      'Total value: 20 points.',
      'Touching the yellow line once: -5 points deduction (allowed).',
      'Crossing the yellow line or touching it twice: Immediate failure.',
      'Putting your foot down once: -5 points deduction (allowed).',
      'Putting your foot down twice: Immediate failure.',
      'Must turn on right indicator before entering the 8 track.'
    ],
    bulletPointsNe: [
      'कुल अंकभार: २० अंक।',
      'एक पटक पहेंलो घेरा छोएमा: ५ अंक काटिन्छ (पास हुन सकिन्छ)।',
      'घेरा बाहिर टायर गएमा वा दुई पटक छोएमा: तत्काल फेल।',
      'एक पटक खुट्टा भुइँमा टेकेमा: ५ अंक काटिन्छ।',
      'दुई पटक खुट्टा टेकेमा: तत्काल फेल।',
      '८ मा प्रवेश गर्नुअघि दायाँ साइड इन्डिकेटर बत्ती बाल्नुपर्छ।'
    ],
    relatedToolPath: '/license/trial/bike-70-mark-trial-system',
    relatedToolLabelEn: 'Open Bike 70-Point Trial Calculator',
    relatedToolLabelNe: 'बाइक ७० अंक ट्रायल क्यालकुलेटर खोल्नुहोस्',
    keywords: [
      'bike trial 8 shape rules nepal',
      '8 shape marks deduction nepal',
      'how to pass 8 in bike trial nepal',
      '८ आकार बाइक ट्रायल नियम',
      'आठ आकारमा कति अंक काटिन्छ'
    ],
    faqs: [
      {
        question: 'Can I touch my foot down once in the 8-figure test?',
        answer: 'Yes. Touching your foot once is permitted and deducts 5 marks from your 20-point total, leaving you with 15 marks.'
      },
      {
        question: 'Which gear should I use in the 8 shape?',
        answer: 'Always keep your motorcycle in 1st gear and control your speed using slight clutch friction (half-clutch) and soft rear brake.'
      }
    ]
  },
  {
    slug: 'narrow-plank-falyak-bike-trial-tips',
    category: 'trial-tips',
    titleEn: 'How to Pass Narrow Plank (Falyak) in Bike Trial Nepal (साँघुरो फल्याक)',
    titleNe: 'नेपालमा बाइक ट्रायलको साँघुरो फल्याक पार गर्ने सजिलो उपाय',
    shortSnippetEn: 'The narrow plank carries 10 points and has zero tolerance for error: touching your foot or slipping off results in immediate disqualification.',
    shortSnippetNe: 'साँघुरो फल्याक १० अंकको हुन्छ र यसमा खुट्टा टेकेमा वा फल्याकबाट तल झरेमा तत्काल फेल (Disqualify) हुन्छ।',
    metaDescEn: 'Proven balance and throttle tips to successfully cross the narrow wooden plank (falyak) in Nepal driving license motorcycle trial.',
    metaDescNe: 'मोटरसाइकल ट्रायलमा फल्याकबाट नलडी सिधा पार गर्ने क्लच र सन्तुलन सम्बन्धी महत्वपूर्ण सुझावहरू।',
    keyTakeaway: 'Align your bike straight BEFORE mounting the plank; keep steady throttle and look at the far end of the plank.',
    bulletPointsEn: [
      'Total value: 10 points (all or nothing test).',
      'Slipping off the plank: Immediate Fail.',
      'Putting foot on the ground on the plank: Immediate Fail.',
      'Do not look down directly at your front tire — look at the exit ramp.',
      'Enter the plank with enough forward momentum; do not brake abruptly on the plank.'
    ],
    bulletPointsNe: [
      'कुल अंकभार: १० अंक (गल्ती भएमा तत्काल फेल)।',
      'फल्याकबाट पाङ्ग्रा तल झरेमा: तत्काल फेल।',
      'फल्याकमा खुट्टा टेकेमा: तत्काल फेल।',
      'अगाडिको टायर नहेरी फल्याकको अन्तिम बिन्दुमा नजर राख्नुहोस्।',
      'फल्याकमा चढ्नुअघि नै बाइकलाई सिधा पार्नुहोस् र ब्रेक नहान्नुहोस्।'
    ],
    relatedToolPath: '/license/trial/bike-70-mark-trial-system',
    relatedToolLabelEn: 'Practice Motorcycle Trial Checklist',
    relatedToolLabelNe: 'मोटरसाइकल ट्रायल चेकलिस्ट हेर्नुहोस्',
    keywords: [
      'narrow plank bike trial nepal',
      'falyak bike trial tips nepal',
      'how to pass narrow plank license trial',
      'साँघुरो फल्याक बाइक ट्रायल',
      'फल्याक पार गर्ने तरिका'
    ],
    faqs: [
      {
        question: 'Is touching the foot allowed on the narrow plank under the 70-point rule?',
        answer: 'No. Unlike the 8-figure, the narrow plank is a zero-fault obstacle. Touching your foot or leaving the plank is an immediate fail.'
      }
    ]
  },
  {
    slug: 'car-t-parking-trial-tips-nepal',
    category: 'trial-tips',
    titleEn: 'Car T-Parking (Garage Reverse) Tips for Nepal Driving Trial (टी-पार्किङ)',
    titleNe: 'कार ट्रायलमा टी-पार्किङ (ग्यारेज ब्याक) गर्ने सही विधि र नियम',
    shortSnippetEn: 'Car garage T-parking carries 20 points. One forward adjustment is allowed with a 10-point deduction; touching any pole causes immediate failure.',
    shortSnippetNe: 'कारको टी-पार्किङ २० अंकको हुन्छ। एक पटक गाडी अगाडि सारेमा १० अंक काटिन्छ तर पोल वा छेउ छोएमा फेल हुन्छ।',
    metaDescEn: 'Step-by-step mirror reference points and steering guide for passing the Car T-parking (garage reverse) trial in Nepal without hitting poles.',
    metaDescNe: 'नेपालमा कार ट्रायलको टी-पार्किङ (ग्यारेज) ऐना हेरेर पोल नठोक्किई सजिलै पास गर्ने तरिका र नियम।',
    keyTakeaway: 'Use your side mirrors to maintain equal distance on both sides; stop smoothly before the rear boundary line.',
    bulletPointsEn: [
      'Total value: 20 points.',
      'One forward adjustment while reversing: -10 points deduction.',
      'Touching any vertical pole or boundary line: Immediate Fail.',
      'Remember to turn on hazard lights or look in rearview mirror before reversing.',
      'Keep your steering wheels straight once the car aligns with the garage stall.'
    ],
    bulletPointsNe: [
      'कुल अंकभार: २० अंक।',
      'ब्याक गर्दा एक पटक अगाडि सारेमा: १० अंक काटिन्छ।',
      'कुनै पनि पोल वा रेखा छोएमा: तत्काल फेल।',
      'गाडी ग्यारेज भित्र सिधा भएपछि स्टेयरिङ सिधा पार्नुहोस्।',
      'पछाडिको रेखाभन्दा अगाडि नै रोक्नुहोस्, रेखा ननाघ्नुहोस्।'
    ],
    relatedToolPath: '/license/trial/car-70-mark-trial-system',
    relatedToolLabelEn: 'Open Car 70-Point Trial Simulator',
    relatedToolLabelNe: 'कार ७० अंक ट्रायल सिमुलेटर खोल्नुहोस्',
    keywords: [
      'car t parking trial tips nepal',
      'garage parking car trial nepal',
      'how to pass t parking in license trial nepal',
      'कार टी पार्किङ नियम',
      'ग्यारेज ब्याक कार ट्रायल'
    ],
    faqs: [
      {
        question: 'Are you allowed to pull forward if you enter the garage crooked?',
        answer: 'Yes, you are allowed one forward correction, but it will deduct 10 points from your 20-point garage score.'
      }
    ]
  },
  {
    slug: 'uphill-ramp-car-trial-technique',
    category: 'trial-tips',
    titleEn: 'Uphill Ramp Stop & Start Technique for Nepal Car Trial (उकालो-ओरालो)',
    titleNe: 'नेपालमा कार ट्रायलको उकालो (र्‍याम्प) मा रोकेर उठाउने सही तरिका',
    shortSnippetEn: 'The ramp test carries 20 points. You must stop between yellow lines, engage the handbrake, and pull forward without rolling back more than 6 inches.',
    shortSnippetNe: 'उकालो र्‍याम्प २० अंकको हुन्छ। पहेंलो रेखाभित्र गाडी रोकेर ६ इन्चभन्दा बढी पछाडि नसारी उठाउनुपर्छ।',
    metaDescEn: 'Master the handbrake-clutch bite point method for uphill ramp stop and start in Nepal Category B driving license practical exam.',
    metaDescNe: 'उकालोमा गाडी पछाडि नसारी हाफ-क्लच र ह्यान्डब्रेकको मद्दतले उठाउने प्राविधिक विधि र अंक कट्टा विवरण।',
    keyTakeaway: 'Hold handbrake firmly -> find clutch bite point (feel engine shudder) -> gentle accelerator tap -> release handbrake smoothly.',
    bulletPointsEn: [
      'Total value: 20 points.',
      'Vehicle rolling back more than 6 inches: Immediate Fail.',
      'Engine stall once: -5 points deduction (allowed).',
      'Stopping outside the designated yellow lines: Immediate Fail.',
      'Do not rush handbrake release until you feel the vehicle trying to pull forward.'
    ],
    bulletPointsNe: [
      'कुल अंकभार: २० अंक।',
      'गाडी ६ इन्चभन्दा बढी पछाडि सरेमा: तत्काल फेल।',
      'एक पटक इन्जिन बन्द भएमा: ५ अंक काटिन्छ।',
      'तोकिएको पहेंलो रेखा बाहिर रोकिएमा: तत्काल फेल।',
      'क्लचको बाइटिङ पोइन्ट (गाडी अगाडि तान्न खोज्ने) नभेटेसम्म ह्यान्डब्रेक नछोड्नुहोस्।'
    ],
    relatedToolPath: '/license/trial/car-70-mark-trial-system',
    relatedToolLabelEn: 'Check Car Practical Evaluation Rubric',
    relatedToolLabelNe: 'कार प्रयोगात्मक परीक्षा अंक तालिका हेर्नुहोस्',
    keywords: [
      'uphill ramp car trial nepal',
      'car ramp stop and start license trial',
      'how to pass ramp in car trial nepal',
      'उकालोमा कार उठाउने तरिका',
      'र्‍याम्प कार ट्रायल नियम'
    ],
    faqs: [
      {
        question: 'What happens if the car engine stalls once on the ramp?',
        answer: 'If the engine shuts off once but the vehicle does not roll backward beyond 6 inches, you lose 5 marks and can restart to proceed.'
      }
    ]
  },
  {
    slug: 'color-blindness-eye-test-rules-nepal-license',
    category: 'medical-vision',
    titleEn: 'Color Blindness & Eye Test Rules for Nepal Driving License (आँखा जाँच)',
    titleNe: 'नेपालमा सवारी चालक अनुमतिपत्र आँखा जाँच र कलर ब्लाइन्डनेस नियम',
    shortSnippetEn: 'DoTM medical checkup requires reading Ishihara 12-plate color charts. Total red-green color blindness is disqualified for public road safety.',
    shortSnippetNe: 'यातायात कार्यालयमा १२ वटा इशहारा रङ प्लेटहरू पढ्नुपर्छ। रातो र हरियो रङ नदेख्नेलाई अनुमतिपत्र दिन मिल्दैन।',
    metaDescEn: 'Official rules on Ishihara color vision tests and visual acuity (6/6 vision with spectacles) for driving license applicants in Nepal.',
    metaDescNe: 'लाइसेन्स मेडिकल टेस्टमा आँखा रङ परीक्षण (इशहारा प्लेट), चस्मा प्रयोग र दृष्टिशक्ति सम्बन्धी आधिकारिक नियम।',
    keyTakeaway: 'Wearing corrective glasses is 100% permitted. If you use glasses, bring them to the biometric checkup.',
    bulletPointsEn: [
      'Applicants must pass the standard Ishihara 12-plate color perception test.',
      'Must distinguish red, amber, and green traffic signals clearly.',
      'Wearing prescription spectacles or contact lenses is completely allowed for the visual acuity (Snellen) test.',
      'If you wear glasses during the medical, your driving license will carry an endorsement: Must drive with corrective lenses.'
    ],
    bulletPointsNe: [
      'इशहारा १२-प्लेट रङ परीक्षण पास गर्नुपर्छ।',
      'रातो, पहेंलो र हरियो ट्राफिक बत्ती स्पष्ट छुट्याउन सक्नुपर्छ।',
      'चस्मा वा कन्ट्याक्ट लेन्स लगाएर आँखा जाँच गराउन पाइन्छ।',
      'चस्मा लगाएर पास भएमा लाइसेन्स कार्डमा चस्मा लगाउनुपर्ने उल्लेख गरिन्छ।'
    ],
    relatedToolPath: '/license/eye-test',
    relatedToolLabelEn: 'Take 12-Plate Ishihara Eye Test Now',
    relatedToolLabelNe: '१२-प्लेट इशहारा आँखा जाँच गर्नुहोस्',
    keywords: [
      'color blindness eye test nepal license',
      'ishihara test nepal driving license',
      'can color blind get license in nepal',
      'आँखा रङ परीक्षण लाइसेन्स नेपाल',
      'कलर ब्लाइन्डनेस लाइसेन्स नियम'
    ],
    faqs: [
      {
        question: 'Can I wear glasses during the driving license eye test in Nepal?',
        answer: 'Yes. You are fully allowed to wear prescription glasses or contact lenses during the eye examination.'
      },
      {
        question: 'What is the minimum visual acuity required?',
        answer: 'Visual acuity must be at least 6/6 or 6/9 with or without corrective lenses in both eyes.'
      }
    ]
  },
  {
    slug: 'driving-license-medical-test-requirements-nepal',
    category: 'medical-vision',
    titleEn: 'What is Checked in Nepal Driving License Medical Test? (मेडिकल जाँच)',
    titleNe: 'लाइसेन्सको मेडिकल टेस्टमा के के परीक्षण गरिन्छ? सम्पूर्ण जानकारी',
    shortSnippetEn: 'The on-site medical checkup costs Rs 150 and tests: 1) Eye Vision (6/6), 2) Color Vision (Ishihara), 3) Hearing, and 4) Blood Group confirmation.',
    shortSnippetNe: 'यातायात कार्यालयमा रु १५० तिरेर आँखाको दृष्टिशक्ति, कलर ब्लाइन्डनेस, श्रवणशक्ति (कान) र रगत समूह (Blood Group) जाँचिन्छ।',
    metaDescEn: 'Everything tested during the Nepal driving license medical examination: eye chart, Ishihara plates, blood grouping, hearing test, and fees.',
    metaDescNe: 'सवारी चालक अनुमतिपत्र मेडिकल जाँचमा सोधिने कुरा, आवश्यक कागजात र रु १५० शुल्कको सम्पूर्ण विवरण।',
    keyTakeaway: 'The medical test takes less than 5 minutes and is conducted directly inside the Yatayat Karyalaya premises on biometric day.',
    bulletPointsEn: [
      'Eye Vision Test: Reading distant letters on the Snellen chart (both eyes tested individually).',
      'Color Vision Test: Identifying numbers embedded inside colored dot patterns (Ishihara plates).',
      'Blood Group Verification: Original blood group card or laboratory report confirmation.',
      'Hearing & Physical Reflexes: Checking hearing ability and general motor mobility.',
      'Fee: Exactly Rs 150 (paid at the medical counter).'
    ],
    bulletPointsNe: [
      'आँखा जाँच: टाढाको स्नेलेन चार्टमा अक्षरहरू पढ्ने।',
      'कलर भिजन: थोप्लाहरूभित्र लुकेका अंकहरू पढ्ने (इशहारा परीक्षण)।',
      'रगत समूह: ब्लड ग्रुप कार्ड वा ल्याब रिपोर्ट रुजु गर्ने।',
      'कानको सुन्ने क्षमता र सामान्य शारीरिक तन्दुरुस्ती।',
      'शुल्क: रु १५० (मेडिकल काउन्टरमा बुझाउने)।'
    ],
    relatedToolPath: '/license/eye-test',
    relatedToolLabelEn: 'Simulate Eye Test Before Visiting Office',
    relatedToolLabelNe: 'कार्यालय जानुअघि आँखा जाँच अभ्यास गर्नुहोस्',
    keywords: [
      'driving license medical test nepal',
      'what is checked in license medical test nepal',
      'nepal license medical fee',
      'लाइसेन्स मेडिकल टेस्टमा के के जाँच्छ',
      'सवारी चालक अनुमतिपत्र मेडिकल शुल्क'
    ],
    faqs: [
      {
        question: 'Do I need to fast before the driving license medical test?',
        answer: 'No. No fasting is required because they only verify your blood group and external senses (eyes and ears).'
      }
    ]
  },
  {
    slug: 'driving-license-total-cost-fees-breakdown-nepal',
    category: 'fees-status',
    titleEn: 'Total Cost to Get a Driving License in Nepal (Bike & Car Fee Breakdown)',
    titleNe: 'नेपालमा बाइक र कारको लाइसेन्स निकाल्न कुल कति खर्च लाग्छ? शुल्क विवरण',
    shortSnippetEn: 'Total official government expense ranges from Rs 2,150 to Rs 3,500 (Medical Rs 150, Exam Rs 500, Card Issuance Rs 1,500/2,500, plus bike/car rental).',
    shortSnippetNe: 'सरकारी शुल्क जम्मा रु २,१५० देखि रु ३,५०० सम्म लाग्छ (मेडिकल रु १५०, परीक्षा रु ५००, कार्ड शुल्क रु १५००/२५०० र गाडी भाडा)।',
    metaDescEn: 'Comprehensive official fee breakdown for Category A (Bike) and Category B (Car) driving licenses in Nepal from online form to smart card collection.',
    metaDescNe: 'नेपालमा नयाँ लाइसेन्स निकाल्दा लाग्ने सबै सरकारी दस्तुर, ट्रायल भाडा र कार्ड शुल्कको पूर्ण विवरण।',
    keyTakeaway: 'Total official cost: ~Rs 2,350 for Bike; ~Rs 3,650 for Car (excluding private driving school training).',
    bulletPointsEn: [
      'Medical Checkup Fee: Rs 150.',
      'Written & Trial Application Fee: Rs 500.',
      'Practical Trial Vehicle Rental (at trial center): Rs 200 - Rs 500.',
      'Smart License Card Issuance Fee (paid after passing trial): Rs 1,500 for Bike (Cat A) / Rs 2,500 for Car (Cat B).',
      'Retrial Fee (if failed first attempt): Rs 500 per attempt.'
    ],
    bulletPointsNe: [
      'मेडिकल जाँच शुल्क: रु १५०।',
      'लिखित तथा प्रयोगात्मक परीक्षा दस्तुर: रु ५००।',
      'ट्रायल सेन्टरमा गाडी भाडा: रु २०० देखि रु ५०० सम्म।',
      'ट्रायल पास भएपछि स्मार्ट कार्ड दस्तुर: बाइकको रु १,५०० / कारको रु २,५००।',
      'रिट्रायल दिनुपरेमा (फेल भएमा): प्रति पटक रु ५००।'
    ],
    relatedToolPath: '/license/mock-test',
    relatedToolLabelEn: 'Practice Free Online Likhit Exam',
    relatedToolLabelNe: 'निःशुल्क अनलाइन परीक्षा अभ्यास गर्नुहोस्',
    keywords: [
      'total cost of driving license in nepal',
      'bike license total fee nepal',
      'car license expenses nepal',
      'लाइसेन्स निकाल्न कति खर्च लाग्छ',
      'सवारी चालक अनुमतिपत्र सरकारी शुल्क'
    ],
    faqs: [
      {
        question: 'When do I have to pay the Rs 1,500 or Rs 2,500 smart card fee?',
        answer: 'You only pay the card issuance fee AFTER you successfully pass the practical trial test.'
      }
    ]
  },
  {
    slug: 'smart-license-card-print-check-sms',
    category: 'fees-status',
    titleEn: 'How to Check If Smart Driving License is Printed in Nepal (SMS 33001)',
    titleNe: 'स्मार्ट लाइसेन्स कार्ड प्रिन्ट भयो कि भएन SMS बाट कसरी चेक गर्ने?',
    shortSnippetEn: 'Send SMS: Type LC [Applicant-ID] and send to 33001. You will receive an immediate SMS confirmation stating whether your card is printed.',
    shortSnippetNe: 'मोबाइल म्यासेजमा गएर LC दर्ता-नम्बर लेखेर ३३००१ मा एसएमएस पठाउनुहोस्। कार्ड प्रिन्ट भए/नभएको तत्काल थाहा हुन्छ।',
    metaDescEn: 'Instant guide on checking your Nepal smart driving license chip card printing status via mobile SMS 33001 and DoTM online portal.',
    metaDescNe: 'नेपालमा स्मार्ट लाइसेन्स कार्ड प्रिन्टिङ स्टाटस ३३००१ मा एसएमएस गरेर चेक गर्ने सजिलो तरिका।',
    keyTakeaway: 'Text LC [Your-Application-ID] to 33001 from any NTC or Ncell mobile.',
    bulletPointsEn: [
      'Open SMS messaging app on your phone.',
      'Type LC followed by a space and your Applicant ID (e.g. LC 01234567).',
      'Send the message to 33001 (works on NTC and Ncell).',
      'Standard SMS charges apply (Rs 2.50 to Rs 3.00).',
      'If printed, visit your respective Yatayat office with your trial pass voucher and citizenship.'
    ],
    bulletPointsNe: [
      'मोबाइलको म्यासेज एप खोल्नुहोस्।',
      'LC टाइप गरी स्पेस दिएर आफ्नो दर्ता नम्बर (Applicant ID) लेख्नुहोस् (उदा: LC 01234567)।',
      '३३००१ मा एसएमएस पठाउनुहोस् (NTC र Ncell दुवैमा चल्छ)।',
      'प्रिन्ट भइसकेको सन्देश आएमा रसिद र नागरिकता लिएर सम्बन्धित यातायात कार्यालय जानुहोस्।'
    ],
    relatedToolPath: '/license/result',
    relatedToolLabelEn: 'Open License Result & Noticeboard Checker',
    relatedToolLabelNe: 'नतिजा तथा SMS जाँच टुल खोल्नुहोस्',
    keywords: [
      'check smart driving license print status nepal',
      'smart license print check sms 33001',
      'how to check if license is printed nepal',
      'लाइसेन्स कार्ड प्रिन्ट भयो कि भएन चेक गर्ने',
      'स्मार्ट लाइसेन्स प्रिन्ट चेक एसएमएस'
    ],
    faqs: [
      {
        question: 'Where can I find my Applicant ID?',
        answer: 'Your Applicant ID is printed at the top-left of your DoTM trial pass payment voucher / receipt.'
      },
      {
        question: 'Can I drive with the trial pass voucher before the smart card is printed?',
        answer: 'Yes! The official bank voucher (रसिद) stamped by the Yatayat office serves as a fully valid legal temporary driving permit across Nepal.'
      }
    ]
  }
];
