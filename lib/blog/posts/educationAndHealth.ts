import { BlogPost } from '../types';

export const educationAndHealthPosts: BlogPost[] = [
  {
    slug: 'tu-ku-pokhara-university-cgpa-to-percentage-calculation',
    title: 'University CGPA to Percentage in Nepal: TU IOE, FoM, KU & Pokhara University Guide',
    titleNep: 'नेपालका विश्वविद्यालयमा CGPA बाट प्रतिशत (Percentage) कसरी निकाल्ने? (TU, KU र PU सूत्र)',
    excerpt: 'Official credit-hour weighted CGPA calculation formulas, 4.0 grading scales, distinction cutoffs, and CGPA-to-percentage conversion rules for Tribhuvan University (IOE/BBA/BIM/CSIT), Kathmandu University, and Pokhara University.',
    excerptNep: 'त्रिभुवन विश्वविद्यालय (IOE/BBA/BCA/CSIT), काठमाडौँ विश्वविद्यालय र पोखरा विश्वविद्यालयमा सेमेस्टर SGPA बाट कुल CGPA र प्रतिशत निकाल्ने आधिकारिक तरिका।',
    category: 'Citizen Services',
    publishedDate: '2026-10-30',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate University CGPA & Target SGPA',
      href: '/cgpa',
      iconText: 'GraduationCap',
    },
    keywords: [
      'cgpa calculator nepal',
      'tu cgpa to percentage converter',
      'engineering gpa calculator tu ioe',
      'pokhara university cgpa to percentage',
      'kathmandu university grading system',
    ],
    content: {
      intro: 'In Nepali universities—including Tribhuvan University (TU IOE, Faculty of Management BBA/BIM/BCA, and IOST BSc CSIT), Kathmandu University (KU), Pokhara University (PU), and Purbanchal University (PoU)—Cumulative Grade Point Average (CGPA) is calculated as a credit-weighted average across all completed semesters: CGPA = Σ(Semester Credit Hours × SGPA) ÷ Σ(Total Credit Hours). On the standard 4.0 grading scale, converting CGPA to an equivalent percentage multiplies your CGPA by 25 (Percentage = CGPA × 25), where a 3.60 CGPA equals 90.0%.',
      keyTakeaways: [
        'Weighted Formula: Never average your semester SGPAs with a simple arithmetic mean if semesters have different credit hours; always weight each SGPA by its credit hours.',
        'Standard 4.0 Percentage Conversion: For TU FoM (BBA/BIM/BCA/MBS), KU, and PoU 4.0 scales, Equivalent Percentage = CGPA × 25.',
        'Minimum Graduation Threshold: Students must maintain a minimum cumulative CGPA of 2.00 (C Grade average) to qualify for degree conferral.',
        'Distinction / Dean’s List Cutoffs: Pokhara University and TU Engineering/Science award Distinction at 3.60+ CGPA, while TU Faculty of Management requires 3.70+ CGPA.'
      ],
      sections: [
        {
          heading: '1. Official Grading Scale & Division Thresholds Across Nepal Universities',
          body: 'While all major Nepali universities operate on a 4.00 maximum grade point scale, division classifications and minimum passing grades vary slightly by faculty:',
          table: {
            headers: ['University / Faculty', 'Max Scale', 'Minimum Pass CGPA', 'First Division Cutoff', 'Distinction / Honours Cutoff'],
            rows: [
              ['Tribhuvan University (IOE / BSc CSIT)', '4.00', '2.00 CGPA', '3.00 CGPA', '3.60 CGPA'],
              ['TU Faculty of Management (BBA / BIM / BCA)', '4.00', '2.00 CGPA', '3.30 CGPA', '3.70 CGPA'],
              ['Kathmandu University (KU — BE / BSc / BBA)', '4.00', '2.00 CGPA', '3.00 CGPA', '3.50 – 3.60 CGPA'],
              ['Pokhara University (PU — BE / BBA / BCIS)', '4.00', '2.00 CGPA', '3.00 CGPA', '3.60 CGPA (Dean’s List ≥ 3.70)'],
              ['Purbanchal University (PoU — BE / BIT)', '4.00', '2.00 CGPA', '3.00 CGPA', '3.60 CGPA'],
            ]
          },
          tip: 'Use our Graduation Target CGPA Predictor at /cgpa to calculate the exact SGPA you must score in your remaining semesters to reach 3.60+ Distinction.'
        },
        {
          heading: '2. Worked Example: 4-Semester Credit-Weighted CGPA Calculation',
          body: 'Suppose a BSc CSIT or Engineering student completes 4 semesters with the following credits and SGPAs: Sem 1 (20 credits, 3.45 SGPA = 69.0 points), Sem 2 (21 credits, 3.62 SGPA = 76.02 points), Sem 3 (22 credits, 3.55 SGPA = 78.10 points), and Sem 4 (21 credits, 3.70 SGPA = 77.70 points). Total Credits = 84; Total Grade Points = 300.82. Exact CGPA = 300.82 ÷ 84 = 3.58 CGPA (Equivalent to 89.52%). To graduate with a 3.65 CGPA after 8 semesters, the student needs an average of 3.72 SGPA across the final 4 semesters.',
        }
      ],
      conclusion: 'Tracking your credit-weighted CGPA and target semester grades early helps you secure Dean’s List honours and Loksewa/foreign university scholarship eligibility. Calculate your exact CGPA and target GPA using our University CGPA Calculator.'
    }
  },
  {
    slug: 'nepali-pregnancy-due-date-calculation-aama-surakshya-guide',
    title: 'Nepali Pregnancy Due Date Calculator (BS & AD): Trimesters & Aama Surakshya Incentives',
    titleNep: 'नेपाली प्रसूति मिति (Due Date) कसरी पत्ता लगाउने? गर्भावस्थाका त्रैमासिक र आमा सुरक्षा भत्ता',
    excerpt: 'Calculate your baby’s exact delivery due date in Bikram Sambat (वि.सं.) and English (AD) calendars using Naegele’s Rule, track 40-week trimester milestones, and claim Nepal Government Aama Surakshya cash incentives.',
    excerptNep: 'अन्तिम महिनावारीको मिति (LMP) बाट बच्चा जन्मने अनुमानित नेपाली मिति (वि.सं.), ४० हप्ताको विकासक्रम र नेपाल सरकारको आमा सुरक्षा कार्यक्रम अन्तर्गत पाइने यातायात तथा जाँच भत्ता।',
    category: 'Citizen Services',
    publishedDate: '2026-10-30',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Pregnancy Due Date in BS & AD',
      href: '/pregnancy-due-date',
      iconText: 'Heart',
    },
    keywords: [
      'pregnancy due date calculator nepal',
      'nepali pregnancy calculator bs',
      'prasuti miti kasari nikalne',
      'aama surakshya programme nepal incentive',
    ],
    content: {
      intro: 'Under clinical obstetrical standards (Naegele’s Rule), a full-term human pregnancy lasts 280 days (40 weeks) from the first day of a woman’s Last Menstrual Period (LMP), adjusted by plus or minus the number of days her average cycle deviates from a standard 28-day cycle. In Nepal, converting this 280-day gestational timeline into the Bikram Sambat (BS) calendar allows expectant parents to plan hospital delivery dates and complete the Ministry of Health and Population’s mandatory Antenatal Care (ANC) checkups under the Aama Surakshya Programme.',
      keyTakeaways: [
        'Exact Formula: Estimated Delivery Date (EDD) = First Day of LMP + 280 Days + (Average Cycle Length - 28 Days).',
        '3 Trimester Stages: 1st Trimester spans Weeks 1–12, 2nd Trimester spans Weeks 13–26, and 3rd Trimester spans Weeks 27–40.',
        'Nepal Government ANC Cash Incentive: Mothers completing protocol ANC checkups in the 4th, 6th, 8th, and 9th months receive NPR 800 upon institutional delivery.',
        'Free Institutional Delivery & Transport Allowance: Delivering at a listed public health facility grants free normal/C-section delivery plus NPR 1,000 (Terai), NPR 2,000 (Hills), or NPR 3,000 (Mountains) transport allowance.'
      ],
      sections: [
        {
          heading: '1. Trimester Milestones & Mandatory Nepal Government ANC Schedule',
          body: 'The Family Welfare Division under the Department of Health Services (DoHS) recommends 8 ANC contacts (and mandates at least 4 protocol visits in months 4, 6, 8, and 9) along with Iron-Folic Acid, Calcium, and Td vaccination:',
          table: {
            headers: ['Pregnancy Stage', 'Gestational Weeks', 'Key Fetal & Maternal Checkups in Nepal', 'Aama Surakshya Protocol'],
            rows: [
              ['1st Trimester (पहिलो त्रैमासिक)', 'Weeks 1 – 12', 'Dating Ultrasound (USG), Folic Acid, Blood Group & VDRL/HIV test', '1st ANC Contact (<12 Weeks)'],
              ['2nd Trimester (दोस्रो त्रैमासिक)', 'Weeks 13 – 26', 'Anomaly Scan (18–22 wks), Iron + Calcium tablets, Td Vaccine', 'Protocol Visits at Month 4 & Month 6'],
              ['3rd Trimester (तेस्रो त्रैमासिक)', 'Weeks 27 – 40', 'Fetal growth & position scan, BP/Sugar check, hospital bag prep', 'Protocol Visits at Month 8 & Month 9'],
            ]
          },
          tip: 'Enter your LMP date in our Nepali Pregnancy Due Date Calculator at /pregnancy-due-date to get your exact Bikram Sambat (वि.सं.) and English delivery dates.'
        },
        {
          heading: '2. Nepal Aama Surakshya Programme Cash Allowance by Region',
          body: 'To reduce maternal and neonatal mortality, the Government of Nepal provides 100% free delivery services (normal delivery, complicated delivery, and Caesarean section) at listed public and community hospitals, plus direct cash incentives upon discharge: Terai districts receive NPR 1,000 transport + NPR 800 ANC = NPR 1,800; Hill districts receive NPR 2,000 transport + NPR 800 ANC = NPR 2,800; and Mountain districts receive NPR 3,000 transport + NPR 800 ANC = NPR 3,800.',
        }
      ],
      conclusion: 'Knowing your Bikram Sambat delivery date and following the 4th, 6th, 8th, and 9th month ANC schedule ensures a safe motherhood journey. Check your exact due date and current pregnancy week using our Nepali Pregnancy Due Date Calculator.'
    }
  },
  {
    slug: 'nepali-diet-dal-bhat-calories-bmr-water-intake-guide',
    title: 'Calories in Nepali Dal-Bhat: Daily BMR, TDEE & Water Intake Guide for Nepal',
    titleNep: 'नेपाली दाल-भातमा कति क्यालोरी हुन्छ? दैनिक BMR, तौल घटाउने क्यालोरी र पानीको हिसाब',
    excerpt: 'Detailed nutritional breakdown of traditional Nepali foods (Dal-Bhat-Tarkari, Roti, Dhido, Selroti, Chiya), clinical Mifflin-St Jeor BMR/TDEE formulas, and daily water intake requirements.',
    excerptNep: 'एक थाल नेपाली दाल-भात-तरकारी, रोटी, ढिँडो र चियामा कति क्यालोरी हुन्छ? शरीरको उचाइ र तौल अनुसार दैनिक चाहिने क्यालोरी (TDEE) र पानीको मात्रा निकाल्ने वैज्ञानिक सूत्र।',
    category: 'Citizen Services',
    publishedDate: '2026-10-30',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Daily Calories, BMR & Water Intake',
      href: '/calorie-calculator',
      iconText: 'Flame',
    },
    keywords: [
      'dal bhat calories nepal',
      'calorie calculator nepal',
      'bmr calculator nepal',
      'water intake per kg body weight',
      'nepali food calorie chart',
    ],
    content: {
      intro: 'A standard home-cooked plate of Nepali Dal-Bhat-Tarkari (containing 200g cooked steamed rice, 150ml lentil dal, 150g seasonal vegetable curry, and pickle) provides approximately 620 to 680 kilocalories (kcal), while a restaurant or festive thali with chicken/mutton curry and 1 tablespoon of ghee reaches 850 to 1,050 kcal. To maintain or lose weight on a traditional Nepali diet, your daily caloric intake must align with your Total Daily Energy Expenditure (TDEE), calculated by multiplying your Mifflin-St Jeor Basal Metabolic Rate (BMR) by your physical activity factor.',
      keyTakeaways: [
        'Mifflin-St Jeor BMR Formula: Men = (10 × weight kg) + (6.25 × height cm) - (5 × age) + 5; Women = (10 × weight kg) + (6.25 × height cm) - (5 × age) - 161.',
        'Weight Loss Deficit Rule: Consuming 500 kcal below your daily maintenance TDEE creates a 3,500 kcal weekly deficit, burning approximately 0.5 kg of body fat per week.',
        'Dal-Bhat Portion Control: Replacing half of your white rice portion with cucumber/carrot salad and thick lentil dal cuts 180 kcal per meal while boosting protein and fiber.',
        'Daily Hydration Formula: Drink 35 ml of water per kilogram of body weight daily (e.g., 2.45 Liters/day for a 70 kg adult).'
      ],
      sections: [
        {
          heading: '1. Calorie & Protein Reference Chart of Everyday Nepali Foods',
          body: 'Use this portion reference table to track daily meals without giving up traditional Nepali home cooking:',
          table: {
            headers: ['Nepali Food Item & Serving Size', 'Calories (kcal)', 'Protein (g)', 'Carbs (g)', 'Fat (g)'],
            rows: [
              ['Standard Veg Dal-Bhat-Tarkari (1 Medium Plate)', '650 kcal', '16g', '115g', '12g'],
              ['Chicken Dal-Bhat Thali with Ghee (1 Full Plate)', '920 kcal', '38g', '120g', '28g'],
              ['Whole Wheat Sukha Roti (2 Medium Rotis) + Tarkari', '340 kcal', '10g', '56g', '7g'],
              ['Buckwheat / Millet Dhido (1 Bowl) + Local Chicken Soup', '520 kcal', '32g', '68g', '11g'],
              ['Steamed Chicken Momo (1 Plate — 10 Pieces)', '460 kcal', '24g', '52g', '16g'],
              ['Nepali Milk Tea / Dudh Chiya with 2 tsp Sugar (1 Cup)', '110 kcal', '3g', '16g', '3.5g'],
            ]
          },
          tip: 'Drinking 3 cups of sugary Dudh Chiya with biscuits adds over 500 hidden calories per day—enough to stall fat loss completely.'
        }
      ],
      conclusion: 'You do not need an expensive Western diet to achieve fitness goals in Nepal. Calculate your exact BMR, TDEE maintenance calories, and daily water requirement using our free Calorie & BMR Calculator.'
    }
  },
  {
    slug: 'neb-see-plus-two-gpa-percentage-calculation-guide',
    title: 'NEB SEE & Class 12 GPA Calculation Guide: Grade Points, NG & Percentage Conversion',
    titleNep: 'एसईई (SEE) र कक्षा १२ को GPA तथा प्रतिशत निकाल्ने आधिकारिक निर्देशिका',
    excerpt: 'Complete guide to National Examinations Board (NEB) letter grading system: Grade Point Average (GPA) formulas, Non-Graded (NG) 35% pass marks, credit hours, and percentage conversions.',
    excerptNep: 'राष्ट्रिय परीक्षा बोर्ड (NEB) को नयाँ लेटर ग्रेडिङ निर्देशिका अनुसार ग्रेड प्वाइन्ट औसत (GPA) निकाल्ने तरिका, न्यूनतम ३५% पास मार्क र प्रतिशत रूपान्तरण।',
    category: 'Citizen Services',
    publishedDate: '2026-09-02',
    readTime: '6 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate SEE & +2 (NEB) GPA',
      href: '/gpa',
      iconText: 'GraduationCap',
    },
    keywords: ['gpa calculator nepal', 'see gpa to percentage', 'neb class 12 gpa calculation', 'letter grading system nepal ng'],
    content: {
      intro: 'The National Examinations Board (NEB) evaluates secondary education students across Nepal using a standardized Letter Grading Directive. From the Secondary Education Examination (SEE / Class 10) through Higher Secondary (Class 11 and 12), computing weighted Grade Point Averages (GPA) requires understanding credit hours, practical internal marks, and Non-Graded (NG) thresholds.',
      keyTakeaways: [
        'Students must score a minimum of 35% in theoretical board examinations to obtain a grade; scores below 35% receive Non-Graded (NG).',
        'Theoretical components (75 marks) and practical internal assessments (25 marks) are graded separately.',
        'GPA is calculated as the sum of (Grade Points * Credit Hours) divided by the total sum of credit hours.',
        'Official conversion to percentage multiplies final GPA by 25 for approximate academic equivalency.'
      ],
      sections: [
        {
          heading: 'NEB Letter Grading Scale and Grade Point Hierarchy',
          body: 'The letter grading directive maps percentage performance to eight distinct grade intervals:',
          table: {
            headers: ['Score Range (%)', 'Letter Grade', 'Grade Point', 'Performance Description'],
            rows: [
              ['90% to 100%', 'A+', '4.0', 'Outstanding'],
              ['80% to below 90%', 'A', '3.6', 'Excellent'],
              ['70% to below 80%', 'B+', '3.2', 'Very Good'],
              ['60% to below 70%', 'B', '2.8', 'Good'],
              ['50% to below 60%', 'C+', '2.4', 'Satisfactory'],
              ['40% to below 50%', 'C', '2.0', 'Acceptable'],
              ['35% to below 40%', 'D', '1.6', 'Basic Pass'],
              ['Below 35%', 'NG (Non-Graded)', '0.0', 'Requires Retake Examination'],
            ]
          },
          tip: 'Receiving NG in up to two theoretical subjects allows students to appear in the immediate supplementary chance examinations conducted within 45 days.'
        },
        {
          heading: 'Credit Hour Weighted GPA Formula',
          body: 'Rather than averaging grades equally, NEB weights subjects by statutory credit hours (typically 4.0 for core academic courses and 3.0 for electives). To calculate cumulative GPA: multiply each subjects earned grade point by its credit weight, sum all weighted products, and divide by total registered credit hours.',
        }
      ],
      conclusion: 'Understanding the grading directive helps students plan college admissions and scholarships accurately. Compute your academic standing using our NEB SEE and Plus Two GPA Calculator.'
    }
  },
  {
    slug: 'tu-college-75-percent-attendance-bunk-calculator-rules',
    title: 'TU & College 75% Attendance Rules in Nepal: Class Bunk Limits & Eligibility',
    titleNep: 'त्रिभुवन विश्वविद्यालय (TU) ७५% हाजिरी नियम: कति दिन कक्षा छोड्न पाइन्छ?',
    excerpt: 'Detailed analysis of Tribhuvan University, Kathmandu University, and Pokhara University mandatory 75% attendance regulations: exam eligibility rules and maximum allowed class cuts.',
    excerptNep: 'त्रिवि तथा अन्य विश्वविद्यालयको परीक्षा फाराम भर्न चाहिने ७५% अनिवार्य हाजिरी, कति पिरियड बंक गर्दा परीक्षा दिन पाइन्छ र उपस्थिति हिसाबको नियम।',
    category: 'Citizen Services',
    publishedDate: '2026-08-30',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate 75% Attendance & Bunk Allowance',
      href: '/university-attendance',
      iconText: 'CheckCircle2',
    },
    keywords: ['tu attendance calculator', 'bunk calculator nepal 75 percent', 'tribhuvan university attendance rule', 'college attendance eligibility calculator'],
    content: {
      intro: 'Higher education institutions in Nepal, including Tribhuvan University (TU), Kathmandu University (KU), Pokhara University (PU), and Purbanchal University (PU), enforce a strict 75% mandatory attendance policy under their respective Academic Regulations. Students falling below this threshold are disqualified from submitting semester or annual board examination forms.',
      keyTakeaways: [
        'Students must attend at least 75% of delivered classroom lectures in each registered course.',
        'Maximum permissible absenteeism (bunk limit) is strictly 25% of total scheduled class sessions.',
        'Medical excuses certified by approved hospitals grant conditional waivers of up to 5% subject to Dean approval.',
        'Attendance tracking resets at the start of each new academic semester or academic year.'
      ],
      sections: [
        {
          heading: 'Classroom Attendance vs. Bunk Allowance Math',
          body: 'The 75% rule establishes clear mathematical limits based on course lecture credits:',
          table: {
            headers: ['Total Scheduled Lectures in Semester', 'Minimum Required Attendance (75%)', 'Maximum Permissible Bunks (25%)'],
            rows: [
              ['40 Lectures', '30 Classes Attended', '10 Classes Permitted'],
              ['60 Lectures', '45 Classes Attended', '15 Classes Permitted'],
              ['80 Lectures', '60 Classes Attended', '20 Classes Permitted'],
              ['100 Lectures', '75 Classes Attended', '25 Classes Permitted'],
            ]
          },
          tip: 'If your current attendance drops below 75%, our calculator computes how many consecutive classes you must attend to restore eligibility.'
        },
        {
          heading: 'Consecutive Attendance Recovery Formula',
          body: 'When your attendance falls to 60%, simply attending one class does not raise your score to 75%. Because the denominator (total classes held) expands with each new session, restoring eligibility requires attending consecutive lectures without interruption until the mathematical ratio crosses 0.75.',
        }
      ],
      conclusion: 'Tracking classroom attendance throughout the semester prevents last-minute examination disqualifications. Check your current percentage and safe bunk allowances using our University Attendance Calculator.'
    }
  },
  {
    slug: 'loksewa-typing-test-wpm-accuracy-rules-nepali-unicode',
    title: 'Loksewa Typing Speed Test: Nepali Unicode WPM, Accuracy & Deduction Rules',
    titleNep: 'लोकसेवा आयोग कम्प्युटर टाइपिङ परीक्षा: नेपाली युनिकोड WPM र शुद्धता नियम',
    excerpt: 'Complete preparation guide for Public Service Commission (Loksewa Aayog) practical typing tests: Words Per Minute (WPM) benchmarks, backspace deductions, and Nepali Unicode Romanized vs Traditional layouts.',
    excerptNep: 'कम्प्युटर अपरेटर तथा सहायक पदका लागि ५ मिनेटको टाइपिङ परीक्षा, प्रतिमिनेट शब्द (WPM) निकाल्ने सरकारी सूत्र र त्रुटि कटाउने नियम।',
    category: 'Citizen Services',
    publishedDate: '2026-08-27',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Practice Loksewa Typing Speed Test',
      href: '/typing-test',
      iconText: 'Keyboard',
    },
    keywords: ['loksewa typing test nepal', 'nepali unicode typing test wpm', 'computer operator typing speed nepal', 'loksewa typing error deduction'],
    content: {
      intro: 'Competitive examinations for administrative posts, including Computer Operator, Data Entry Assistant, and Nayab Subba, feature a mandatory practical computer skill test administered by the Public Service Commission (Loksewa Aayog). Candidates must demonstrate typing speed and accuracy in English and Nepali Unicode within strict 5-minute timed sessions.',
      keyTakeaways: [
        'Candidates type a standardized printed text sheet for exactly 5 minutes.',
        'Nepali typing speed benchmark is typically 20 to 25 Words Per Minute (WPM) with at least 85% accuracy.',
        'English typing speed benchmark is 30 to 35 Words Per Minute (WPM).',
        'Official scoring formula: Net Words Per Minute = (Gross Words Typed - Penalty Errors) / 5 Minutes.'
      ],
      sections: [
        {
          heading: 'Loksewa Net Typing Speed Scoring Formula',
          body: 'Examiners count 5 keystrokes as one standardized word while deducting marks for errors:',
          table: {
            headers: ['Typing Metric', 'Measurement Basis', 'Statutory Formula'],
            rows: [
              ['Gross Characters', 'Total keystrokes logged', 'All correct and incorrect inputs'],
              ['Gross Words', 'Character normalization', 'Gross Characters / 5'],
              ['Penalty Deductions', 'Typographical errors', 'Missing punctuation, incorrect vowels, dropped halanta'],
              ['Net Speed (WPM)', 'Final qualifying score', '(Gross Words - Error Penalty) / 5 Minutes'],
            ]
          },
          tip: 'Practice using Nepali Unicode Traditional layout if aiming for judicial service court typist examinations.'
        },
        {
          heading: 'Nepali Unicode Romanized vs. Traditional Keyboards',
          body: 'Loksewa examination halls install standardized Government of Nepal Nepali Unicode keyboards. Candidates can select between Unicode Romanized (phonetic mapping matching English QWERTY keys) or Unicode Traditional (following the legacy typewriter Preeti key assignments).',
        }
      ],
      conclusion: 'Daily practice under timed exam conditions builds the muscle memory necessary to clear government skill tests. Benchmark your typing speed and accuracy with our Loksewa Typing Test Simulator.'
    }
  },
  {
    slug: 'bmi-standards-for-south-asian-nepali-body-types',
    title: 'BMI Standards for Nepali & South Asian Body Types: WHO Cutoffs & Health Risk',
    titleNep: 'नेपाली तथा दक्षिण एसियालीका लागि बिएमआई (BMI) मापदण्ड र स्वास्थ्य जोखिम',
    excerpt: 'Detailed health guide to World Health Organization (WHO) revised Body Mass Index (BMI) cutoffs for South Asian populations: lower obesity thresholds (25 vs 30) and visceral fat risks.',
    excerptNep: 'विश्व स्वास्थ्य संगठन (WHO) द्वारा दक्षिण एसियालीका लागि तोकिएको विशेष बिएमआई कट-अफ (२३ मा अधिक तौल, २५ मा मोटोपना) र आदर्श तौल हिसाब।',
    category: 'Citizen Services',
    publishedDate: '2026-08-24',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Your South Asian Adjusted BMI',
      href: '/bmi',
      iconText: 'Activity',
    },
    keywords: ['bmi calculator nepal', 'who south asian bmi cutoff', 'ideal weight calculator nepal', 'body mass index categories'],
    content: {
      intro: 'Body Mass Index (BMI) evaluates body weight relative to height, serving as a screening metric for metabolic health. The World Health Organization (WHO) established revised BMI classifications specifically for South Asian populations, because individuals of Nepali and Indian heritage develop diabetes and hypertension at significantly lower body mass levels.',
      keyTakeaways: [
        'International standard BMI considers 25 to 29.9 as overweight and 30+ as obese.',
        'WHO South Asian modified guidelines classify BMI 23 to 24.9 as overweight and 25+ as obese.',
        'South Asian body types tend to carry higher visceral abdominal fat percentages at lower overall body weights.',
        'Standard metric formula: BMI = Weight in Kilograms / (Height in Meters squared).'
      ],
      sections: [
        {
          heading: 'WHO International vs. South Asian BMI Thresholds',
          body: 'Comparing standard global cutoffs with South Asian specific health risk tiers:',
          table: {
            headers: ['Weight Classification', 'Global Standard BMI', 'WHO South Asian Revised Cutoff', 'Cardiovascular Risk Profile'],
            rows: [
              ['Underweight', 'Below 18.5', 'Below 18.5', 'Nutritional deficiency risk'],
              ['Normal Weight', '18.5 - 24.9', '18.5 - 22.9', 'Low chronic health risk'],
              ['Overweight', '25.0 - 29.9', '23.0 - 24.9', 'Elevated cardiovascular risk'],
              ['Obesity Class I', '30.0 - 34.9', '25.0 - 29.9', 'High diabetes and blood pressure risk'],
              ['Obesity Class II', '35.0 and Above', '30.0 and Above', 'Severe metabolic complication risk'],
            ]
          },
          tip: 'Waist circumference exceeding 90 cm (35 inches) for men or 80 cm (32 inches) for women signals elevated abdominal risk regardless of overall BMI.'
        },
        {
          heading: 'Calculating Ideal Body Weight',
          body: 'To determine your target healthy weight in kilograms: multiply the square of your height in meters by the target midpoint BMI of 21.0. For a person measuring 1.70 meters (5 feet 7 inches), ideal healthy weight equals 1.70 * 1.70 * 21.0 = approximately 60.7 kilograms.',
        }
      ],
      conclusion: 'Tracking weight using demographic metrics protects against lifestyle diseases. Check your South Asian adjusted health status using our BMI Calculator.'
    }
  },
  {
    slug: 'blood-donation-intervals-eligibility-standards-nepal',
    title: 'Blood Donation in Nepal: 90-Day Intervals, Eligibility Rules & Red Cross Standards',
    titleNep: 'नेपालमा रक्तदान निर्देशिका: ९० दिने अन्तराल, योग्यता र रेडक्रस मापदण्ड',
    excerpt: 'Comprehensive guide to blood donation eligibility standards set by Nepal Red Cross Society (NRCS): minimum hemoglobin levels, donation recovery intervals, and donor screening criteria.',
    excerptNep: 'नेपाल रेडक्रस सोसाइटीको मापदण्ड अनुसार रक्तदान गर्न चाहिने न्यूनतम तौल (४५ केजी), हेमोग्लोबिन, ९० दिने अन्तराल र रगत समूह मिल्ने नियम।',
    category: 'Citizen Services',
    publishedDate: '2026-08-21',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Check Blood Donation Eligibility & Dates',
      href: '/blood-donation',
      iconText: 'Heart',
    },
    keywords: ['blood donation calculator nepal', 'blood donation interval nepal red cross', 'who can donate blood nepal', 'blood group compatibility chart'],
    content: {
      intro: 'Voluntary blood donation coordinated through the Central Blood Transfusion Service (CBTS) of the Nepal Red Cross Society (NRCS) supplies life-saving blood components across hospitals in Nepal. Strict donor screening criteria safeguard donor wellness while ensuring transfusion safety for recipient patients.',
      keyTakeaways: [
        'Male donors can donate whole blood every 90 days (3 months); female donors should wait 120 days (4 months).',
        'Donors must be between 18 and 65 years of age with a minimum body weight of 45 kilograms.',
        'Hemoglobin concentration must be at least 12.5 g/dL for both men and women.',
        'Standard single donation collects 350 ml or 450 ml of whole blood, depending on donor body weight.'
      ],
      sections: [
        {
          heading: 'Donor Eligibility Screening Criteria',
          body: 'Nepal Red Cross Society checks physiological parameters prior to donation:',
          table: {
            headers: ['Health Parameter', 'Acceptable Range', 'Rationale'],
            rows: [
              ['Age', '18 to 65 Years', 'Ensures adult physiological development and safe cardiac recovery'],
              ['Minimum Body Weight', 'At least 45 kg (99 lbs)', 'Restricts volume collected to under 13% of total blood volume'],
              ['Hemoglobin Level', 'At least 12.5 g/dL', 'Prevents post-donation iron deficiency anemia'],
              ['Blood Pressure', 'Systolic 100-140 / Diastolic 60-90', 'Ensures stable hemodynamic balance during collection'],
              ['Pulse Rate', '60 to 100 beats per minute', 'Confirms normal cardiac rhythm'],
            ]
          },
          tip: 'Drink at least 500 ml of clean drinking water and consume a light meal 2 to 3 hours before arriving at the donation station.'
        },
        {
          heading: 'Temporary Deferral Conditions',
          body: 'Individuals must postpone donation after specific life events: wait 6 months following minor surgery or ear piercing; wait 12 months following major surgery, blood transfusion, or tattoo application; and wait 7 days following completion of antibiotic medications.',
        }
      ],
      conclusion: 'Donating blood on scheduled calendar intervals helps maintain national hospital supplies safely. Calculate your next eligible donation date using our Blood Donation Eligibility Calculator.'
    }
  },
  {
    slug: 'nepal-momo-calories-nutrition-breakdown-buff-chicken-veg',
    title: 'How Many Calories Are in a Plate of Momo? Buff, Chicken, Veg & Jhol Nutrition',
    titleNep: 'एक प्लेट मःममा कति क्यालोरी हुन्छ? बफ, चिकेन, भेज र झोल मःम पोषण',
    excerpt: 'Detailed nutritional breakdown of Nepali momos: calorie counts, protein grams, fat content, dipping sauce (Achar) sodium, and health guidance for fitness enthusiasts.',
    excerptNep: '१० वटा मःमको प्लेटमा हुने क्यालोरी (बफ ३५०, चिकेन ३००, भेज २४० क्यालोरी), प्रोटिनको मात्रा, मैदा र तेलले स्वास्थ्यमा पार्ने असर।',
    category: 'Citizen Services',
    publishedDate: '2026-08-18',
    readTime: '5 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Calculate Plate Calories for Buff, Chicken & Veg Momo',
      href: '/momo-calorie',
      iconText: 'Utensils',
    },
    keywords: ['momo calorie calculator', 'calories in 1 plate buff momo', 'chicken momo protein facts nepal', 'healthy momo gym diet'],
    content: {
      intro: 'Momo represents the most beloved culinary dish across Nepal, consumed daily in homes, street stalls, and fine dining restaurants. For individuals tracking caloric intake, fitness nutrition, or weight management, understanding the nutritional profile of steamed, fried, and soup (Jhol) momo varieties enables informed dietary choices.',
      keyTakeaways: [
        'A standard plate of 10 steamed chicken momos contains approximately 300 to 340 calories.',
        'A plate of 10 steamed buff momos contains approximately 340 to 390 calories due to richer fat content.',
        'Deep-frying momos (C-Momo or Kothey) adds 150 to 200 surplus calories from absorbed cooking oil.',
        'Traditional tomato, sesame, and soybean Achar contributes an additional 50 to 80 calories and notable sodium.'
      ],
      sections: [
        {
          heading: 'Caloric & Macronutrient Breakdown per Plate (10 Pieces)',
          body: 'Laboratory nutritional estimates based on standard recipe proportions:',
          table: {
            headers: ['Momo Variety (Plate of 10)', 'Calories (kcal)', 'Protein (g)', 'Carbohydrates (g)', 'Total Fat (g)'],
            rows: [
              ['Steamed Chicken Momo', '310 kcal', '18 g', '38 g', '9 g'],
              ['Steamed Buff Momo', '360 kcal', '22 g', '38 g', '14 g'],
              ['Steamed Veg (Paneer/Cabbage)', '260 kcal', '8 g', '42 g', '7 g'],
              ['Fried Buff / Chicken Momo', '520 kcal', '20 g', '44 g', '29 g'],
              ['Jhol Momo (Soup Added)', '390 kcal', '19 g', '46 g', '14 g'],
              ['C-Momo (Chilli Sauce Added)', '560 kcal', '21 g', '56 g', '28 g'],
            ]
          },
          tip: 'Choosing steamed chicken momos with extra sesame achar provides clean lean protein while keeping trans-fat consumption low.'
        },
        {
          heading: 'Balancing Momo within a Healthy Diet',
          body: 'The dough wrapper made from refined white wheat flour (Maida) contributes predominantly fast-digesting carbohydrates. To optimize nutritional balance, combine steamed lean meat momos with vegetable salads and avoid excessive sodium-heavy soy dipping sauces.',
        }
      ],
      conclusion: 'Enjoying traditional cuisine while meeting fitness milestones requires nutritional awareness. Calculate your meal calories and macronutrients using our Nepal Momo Calorie Calculator.'
    }
  }
];
