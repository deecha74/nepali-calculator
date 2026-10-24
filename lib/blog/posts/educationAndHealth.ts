import { BlogPost } from '../types';

export const educationAndHealthPosts: BlogPost[] = [
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
