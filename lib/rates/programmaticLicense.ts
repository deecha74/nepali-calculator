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
