import json

new_post_code = '''  {
    slug: 'color-blindness-eye-test-rules-nepal-driving-license-guide',
    title: 'Color Blindness & Eye Test Rules for Nepal Driving License: Ishihara Plates, Glasses & Medical Checkup (आँखा जाँच निर्देशिका)',
    titleNep: 'नेपालमा सवारी चालक अनुमतिपत्र आँखा जाँच र कलर ब्लाइन्डनेस नियम: इशहारा टेस्ट, चस्मा र मेडिकल मापदण्ड',
    excerpt: 'Official guide to the Department of Transport Management (DoTM) eye test and color blindness examination in Nepal. Learn how the 12-plate Ishihara test works, visual acuity rules, driving with spectacles, and what happens if you fail at the Yatayat medical counter.',
    excerptNep: 'यातायात व्यवस्था विभागको स्वास्थ्य तथा आँखा परीक्षण मापदण्ड, इशहारा कलर भिजन टेस्ट, चस्मा लगाएर लाइसेन्स लिने नियम र वर्ण अन्धोपन (कलर ब्लाइन्डनेस) सम्बन्धी कानुनी प्रावधान।',
    category: 'Citizen Services',
    publishedDate: '2026-11-13',
    readTime: '7 min read',
    author: {
      name: 'Deepak Chalise',
      role: 'Founder & Software Architect, Chalise Tech',
    },
    toolLink: {
      title: 'Take Free 12-Plate Ishihara Color Blindness Test',
      href: '/license/eye-test',
      iconText: 'Eye',
    },
    keywords: [
      'color blindness eye test nepal driving license',
      'can color blind person get driving license in nepal',
      'dotm eye test rules nepal',
      'ishihara test nepal license',
      'nepal driving license medical checkup eye test',
      'सवारी चालक अनुमतिपत्र आँखा जाँच नियम',
      'नेपालमा कलर ब्लाइन्डनेस र ड्राइभिङ लाइसेन्स',
      'इशहारा कलर भिजन टेस्ट नेपाल',
      'यातायात कार्यालय आँखा परीक्षण',
      'लाइसेन्समा चस्मा लगाउन पाइन्छ कि पाइँदैन',
      'nepal license glasses endorsement',
      'color vision deficiency driving nepal',
      'snellen chart eye test yatayat nepal'
    ],
    content: {
      intro: 'Every driving license applicant in Nepal—whether applying for a Motorcycle (Category A), Scooter (Category K), or Car/Jeep (Category B)—must undergo a mandatory medical examination (स्वास्थ्य तथा आँखा परीक्षण) at the Transport Management Office (यातायात व्यवस्था कार्यालय) before being cleared for the written exam. The most feared part of this medical checkup is the Color Vision & Ishihara Test. Under Section 47 of the Motor Vehicles and Transport Management Act 2049, drivers must clearly differentiate red, amber, and green traffic lights as well as vehicle brake indicators. Here is a comprehensive guide to how the Yatayat eye examination works, the exact Ishihara plates used, rules for wearing prescription glasses, and the legal recourse available if you suspect color vision deficiency.',
      keyTakeaways: [
        'Color vision and visual acuity screening is 100% mandatory for all new license applicants across all provincial Yatayat offices in Nepal.',
        'Transport medical counters use standard 24-plate or 38-plate Ishihara Color Vision booklets; doctors typically test 4 to 6 random plates within 3 seconds each.',
        'Total Red-Green Color Blindness (Protanopia / Deuteranopia) is a statutory disqualification under Section 47(d) of the Motor Vehicles Act 2049 for public road safety.',
        'Wearing prescription spectacles or contact lenses is completely allowed during both the Snellen distance vision chart and Ishihara examinations.',
        'Passing with corrective lenses results in an endorsement condition printed on your driving license: "Must Drive with Corrective Lenses".',
        'Applicants with borderline or mild color vision deficiency can request a formal clinical evaluation at accredited eye hospitals like Tilganga or Nepal Eye Hospital.'
      ],
      sections: [
        {
          heading: '1. What Happens at the Yatayat Medical Counter? (Step-by-Step Procedure)',
          body: 'The medical checkup takes place immediately after biometric registration (photo and fingerprints) or on the morning of your document verification at the Transport Management Office:',
          table: {
            headers: ['Stage', 'Test Performed', 'Equipment Used', 'Passing Criteria in Nepal'],
            rows: [
              ['Stage 1: Fee & Verification', 'Payment of statutory medical fee (Rs. 50 to Rs. 100 depending on province)', 'DoTM applicant token barcode', 'Valid application voucher verified'],
              ['Stage 2: Color Vision Screening', 'Applicant reads numbers embedded within multicolored dot circles', 'Official Ishihara 24/38-plate booklet', 'Must correctly identify at least 5 out of 6 presented plates without hesitation'],
              ['Stage 3: Visual Acuity (Distance)', 'Reading letters or directional "E" symbols from a distance of 6 meters (20 ft)', 'Standard Snellen or Tumbling E Chart', 'At least 6/6 or 6/9 in better eye, and 6/12 in worse eye (with or without glasses)'],
              ['Stage 4: Blood Group Verification', 'Finger-prick blood typing (if not already holding a government donor card)', 'Blood typing reagents', 'Official blood group entry (A+, B+, O+, AB+, etc.) recorded on portal'],
              ['Stage 5: Doctor Clearance', 'Doctor signs the physical medical form and submits digital approval', 'DoTM Electronic Driving License System (EDLMS)', 'Instant status update allowing applicant to sit for Likhit Exam']
            ]
          },
          tip: 'Tip for test day: Ensure you are well-rested. Eye fatigue, smartphone glare right before the test, and dim indoor hallway lighting can cause normal-sighted individuals to hesitate on borderline Ishihara plates.'
        },
        {
          heading: '2. The Ishihara Color Plate Test: How It Works & What Doctors Test',
          body: 'The Ishihara test uses pseudoisochromatic plates composed of dots varying in hue, saturation, and size. Normal trichromats see numbers clearly, whereas individuals with red-green defects see either a different number or nothing at all:',
          table: {
            headers: ['Plate Type', 'Normal Vision Sees', 'Red-Green Deficient Sees', 'Total Color Blind Sees', 'Clinical Purpose'],
            rows: [
              ['Plate 1 (Demonstration)', '12', '12', '12', 'Ensures the candidate understands instructions; visible to all individuals'],
              ['Plate 2 (Screening)', '8', '3', 'Nothing / Indistinct dots', 'Differentiates red-green color deficiency from normal vision'],
              ['Plate 3 (Screening)', '5', '2', 'Nothing', 'High-sensitivity detection of deutan (green) and protan (red) defects'],
              ['Plate 4 (Transformation)', '29', '70', 'Nothing', 'Transformation plate: colors shift perception based on spectral sensitivity'],
              ['Plate 5 (Transformation)', '74', '21', 'Nothing', 'Quickly flags moderate-to-severe red-green deficiency'],
              ['Plate 6 (Vanishing)', '7', 'Nothing / Cannot see', 'Nothing', 'Vanishing plate: only individuals with intact red-green cones perceive digit'],
              ['Plate 7 (Vanishing)', '45', 'Nothing / Cannot see', 'Nothing', 'Confirms absence of red-green spectral discrimination'],
              ['Plate 8 (Diagnostic)', '26 (2 & 6)', 'Protanope sees 6 only; Deuteranope sees 2 only', 'Nothing', 'Classifies whether the defect is red-blindness (Protan) or green-blindness (Deutan)']
            ]
          },
          tip: 'Never attempt to "memorize" Ishihara plate numbers. Transport doctors flip pages at random, show pages backward, or ask you to trace lines with a blunt stylus. Practice with randomized digital simulators to understand your genuine color perception.'
        },
        {
          heading: '3. Legal Provisions Under Nepal Motor Vehicles Act 2049 (Section 47)',
          body: 'Under the Motor Vehicles and Transport Management Act 2049 (सवारी तथा यातायात व्यवस्था ऐन, २०४९), Section 47 specifies physical and medical disqualifications for drivers. Sub-clause (d) states that a driving license shall NOT be granted to anyone who is: "रातको समयमा नदेख्ने (रतौंधी) वा रातो, हरियो तथा पहेँलो रङ्ग छुट्याउन नसक्ने (वर्ण अन्धोपन भएको)" (Night blind or unable to distinguish red, green, and yellow colors).',
          tip: 'Why Nepal law is strict on primary colors: Highway driving in Nepal heavily depends on recognizing red brake lights of vehicles in front, flashing yellow hazard lights on mountain bends, amber directional indicators, and overhead traffic signals at high speeds.'
        },
        {
          heading: '4. Can You Wear Prescription Spectacles or Contact Lenses?',
          body: 'YES, 100% YES! A common myth among applicants is that wearing glasses disqualifies you from getting a driver\'s license. This is entirely false. Nepal\'s transport guidelines explicitly permit corrective spectacles and contact lenses during both the visual acuity and color vision tests.',
          table: {
            headers: ['Vision Condition', 'Permitted at Medical?', 'License Card Endorsement', 'Legal Driving Obligation'],
            rows: [
              ['Myopia (Nearsightedness / चस्मा लगाउने)', 'Permitted (Spectacles or Contact Lenses allowed)', 'Endorsement code "01" (Corrective Lenses)', 'Driver MUST wear glasses whenever operating a motor vehicle'],
              ['Astigmatism / Cylindrical Power', 'Permitted with prescription lenses', 'Endorsement code "01" (Corrective Lenses)', 'Compulsory to wear lenses on the road'],
              ['Mild Color Vision Deficiency (Anomalous Trichromacy)', 'Permitted if applicant reliably identifies red, green & amber lights', 'Standard license issued upon ophthalmologist clearance', 'Defensive driving and heightened signal vigilance recommended'],
              ['Severe Red-Green Dichromacy / Achromatopsia', 'Disqualified under current Section 47(d) rules', 'Application halted at medical counter', 'Advocacy for daylight-restricted private licenses ongoing in Nepal courts']
            ]
          },
          tip: 'Important: If you wear glasses, bring your current prescription pair to the medical checkup and wear them for your official biometric photograph. Driving without glasses when your license carries a "01" corrective lens endorsement is a traffic offense carrying a Rs. 500 fine.'
        },
        {
          heading: '5. What If You Fail the Eye Test at Yatayat? (Legitimate Recourse)',
          body: 'If you fail the Ishihara plate test at the Transport Office medical room, consider these legitimate and lawful options:',
          table: {
            headers: ['Option', 'Action Required', 'Outcome & Legal Precedent'],
            rows: [
              ['1. Request Better Lighting Check', 'Ask the doctor to test you near a natural daylight window', 'Fluorescent glare and shadows frequently cause false failures in borderline candidates'],
              ['2. Hospital Eye Specialist Referral', 'Visit Tilganga Institute of Ophthalmology or Nepal Eye Hospital Tripureshwor', 'Undergo advanced Lantern or Farnsworth D-15 testing to prove practical signal recognition'],
              ['3. Tinted EnChroma / Color-Corrective Lenses', 'Consult an optometrist regarding specialized spectral filter glasses', 'Acceptance depends on Yatayat medical officer discretion and official hospital certificate'],
              ['4. Eye Rest & Repeat Testing', 'Avoid screens for 24 hours, sleep well, and re-sit the medical evaluation', 'Helps candidates whose failure was triggered by acute ocular fatigue or dry eye syndrome']
            ]
          },
          tip: 'If an accredited eye hospital certifies that your visual field and practical signal perception are completely safe for personal vehicle operation, submit the certified hospital report directly to the Chief of the Transport Office (कार्यालय प्रमुख).'
        },
        {
          heading: '6. Test Your Color Vision Now (Free Interactive Tools)',
          body: 'Do not wait until you arrive at the Yatayat medical counter. Screen your color perception and prepare for all stages of your license application using our free interactive simulators:'
        }
      ],
      conclusion: 'The Yatayat eye checkup and color blindness test are designed to protect both you and fellow road users across Nepal. By understanding how the Ishihara booklet works, knowing your rights regarding prescription spectacles, and screening your vision beforehand on our free 12-plate simulator, you can clear the medical counter with total confidence and move one step closer to getting your driver\'s license.'
    }
  },
'''

file_path = r'd:\Others\calculator\lib\blog\posts\citizenServices.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = 'export const citizenServicesPosts: BlogPost[] = ['
if target in content:
    new_content = content.replace(target, target + '\n' + new_post_code)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully added color blindness blog post to citizenServices.ts")
else:
    print("Could not find target in citizenServices.ts")

