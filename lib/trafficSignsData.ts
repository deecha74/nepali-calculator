export type SignCategory = 'regulatory' | 'warning' | 'informative';

export interface TrafficSignItem {
  id: string;
  code: string;
  category: SignCategory;
  shape: 'octagon' | 'inverted-triangle' | 'circle-red' | 'circle-blue' | 'triangle-red' | 'square-blue';
  symbolType: string;
  nameEn: string;
  nameNe: string;
  descEn: string;
  descNe: string;
}

export const TRAFFIC_SIGNS_DATA: TrafficSignItem[] = [
  // ==========================================
  // 1. REGULATORY / MANDATORY SIGNS (आदेशात्मक तथा निषेधात्मक)
  // ==========================================
  {
    id: 'stop',
    code: 'R-01',
    category: 'regulatory',
    shape: 'octagon',
    symbolType: 'STOP',
    nameEn: 'Stop',
    nameNe: 'रोक्नुहोस्',
    descEn: 'Come to a complete halt behind the stop line and proceed only when the road is clear.',
    descNe: 'स्टप लाइन अगाडि सवारी पूर्ण रूपमा रोक्नुहोस् र बाटो सुरक्षित भए मात्र अघि बढ्नुहोस्।'
  },
  {
    id: 'give-way',
    code: 'R-02',
    category: 'regulatory',
    shape: 'inverted-triangle',
    symbolType: 'YIELD',
    nameEn: 'Give Way / Yield',
    nameNe: 'बाटो दिनुहोस्',
    descEn: 'Slow down and give priority to vehicles on the main road or roundabout.',
    descNe: 'गति कम गरी मुख्य सडक वा गोलघुम्तीमा रहेका सवारीलाई पहिलो प्राथमिकता दिनुहोस्।'
  },
  {
    id: 'no-entry',
    code: 'R-03',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'NO_ENTRY',
    nameEn: 'No Entry',
    nameNe: 'प्रवेश निषेध',
    descEn: 'Entry is strictly prohibited for all vehicles beyond this sign.',
    descNe: 'यस चिन्हभन्दा अगाडि कुनै पनि सवारी साधन लैजान पूर्ण निषेध गरिएको छ।'
  },
  {
    id: 'one-way-prohibited',
    code: 'R-04',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'NO_STRAIGHT',
    nameEn: 'Straight Ahead Prohibited',
    nameNe: 'सिधा जान निषेध',
    descEn: 'Vehicles are not allowed to proceed straight ahead from this point.',
    descNe: 'यस ठाउँबाट सवारी साधन सिधा अगाडि लैजान मनाही छ।'
  },
  {
    id: 'no-left-turn',
    code: 'R-05',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'NO_LEFT',
    nameEn: 'No Left Turn',
    nameNe: 'बायाँ मोड्न निषेध',
    descEn: 'Turning left at the upcoming intersection is prohibited.',
    descNe: 'आगामी चोक वा मोडमा बायाँ तर्फ सवारी मोड्न निषेध छ।'
  },
  {
    id: 'no-right-turn',
    code: 'R-06',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'NO_RIGHT',
    nameEn: 'No Right Turn',
    nameNe: 'दायाँ मोड्न निषेध',
    descEn: 'Turning right at the upcoming intersection is prohibited.',
    descNe: 'आगामी चोक वा मोडमा दायाँ तर्फ सवारी मोड्न निषेध छ।'
  },
  {
    id: 'no-u-turn',
    code: 'R-07',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'NO_UTURN',
    nameEn: 'No U-Turn',
    nameNe: 'यू-टर्न निषेध',
    descEn: 'Making a 180-degree U-turn on this road section is strictly forbidden.',
    descNe: 'यस सडक खण्डमा सवारी साधन घुमाएर पछाडि फर्काउन (U-Turn) मनाही छ।'
  },
  {
    id: 'no-overtaking',
    code: 'R-08',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'NO_OVERTAKE',
    nameEn: 'No Overtaking',
    nameNe: 'उछिन्न निषेध',
    descEn: 'Do not overtake other moving vehicles in this zone.',
    descNe: 'यस क्षेत्रमा अगाडि गुडिरहेको सवारी साधनलाई उछिन्न (Overtake गर्न) निषेध छ।'
  },
  {
    id: 'no-parking',
    code: 'R-09',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'NO_PARKING',
    nameEn: 'No Parking',
    nameNe: 'पार्किङ निषेध',
    descEn: 'Parking vehicles along this side of the road is prohibited.',
    descNe: 'यस सडकको किनारमा सवारी साधन पार्क गरी राख्न मनाही छ।'
  },
  {
    id: 'no-stopping',
    code: 'R-10',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'NO_STOPPING',
    nameEn: 'No Stopping or Standing',
    nameNe: 'रोक्न र पर्खन निषेध',
    descEn: 'Vehicles may not even stop briefly to pick up or drop off passengers here.',
    descNe: 'यहाँ एकछिन पनि सवारी रोक्न वा यात्रु चढाउन/ओराल्न पूर्ण निषेध छ।'
  },
  {
    id: 'no-horn',
    code: 'R-11',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'NO_HORN',
    nameEn: 'No Horn / Silence Zone',
    nameNe: 'हर्न बजाउन निषेध',
    descEn: 'Using vehicle horns is prohibited (near hospitals, schools, courts, or city silence zones).',
    descNe: 'अस्पताल, विद्यालय वा निषेधित क्षेत्रमा सवारीको हर्न बजाउन सख्त मनाही छ।'
  },
  {
    id: 'speed-limit-40',
    code: 'R-12',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'SPEED_40',
    nameEn: 'Maximum Speed Limit 40 km/h',
    nameNe: 'अधिकतम गति सीमा ४० कि.मि./घण्टा',
    descEn: 'Do not drive faster than 40 kilometers per hour in this zone.',
    descNe: 'यस सडक खण्डमा प्रतिघण्टा ४० किलोमिटरभन्दा बढी गतिमा सवारी हाँक्न पाइँदैन।'
  },
  {
    id: 'speed-limit-60',
    code: 'R-13',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'SPEED_60',
    nameEn: 'Maximum Speed Limit 60 km/h',
    nameNe: 'अधिकतम गति सीमा ६० कि.मि./घण्टा',
    descEn: 'Maximum permissible vehicle speed on this highway segment is 60 km/h.',
    descNe: 'यस राजमार्ग खण्डमा अधिकतम गति सीमा प्रतिघण्टा ६० किलोमिटर तोकिएको छ।'
  },
  {
    id: 'weight-limit-5t',
    code: 'R-14',
    category: 'regulatory',
    shape: 'circle-red',
    symbolType: 'WEIGHT_5T',
    nameEn: 'Weight Limit 5 Tons',
    nameNe: '५ टनभन्दा बढी भार निषेध',
    descEn: 'Vehicles with gross weight exceeding 5 metric tons are prohibited.',
    descNe: 'कुल तौल ५ टनभन्दा बढी भएका मालवाहक वा ठूला सवारी प्रवेश निषेध छ।'
  },
  {
    id: 'keep-left',
    code: 'R-15',
    category: 'regulatory',
    shape: 'circle-blue',
    symbolType: 'KEEP_LEFT',
    nameEn: 'Compulsory Keep Left',
    nameNe: 'अनिवार्य बायाँ च्याप्नुहोस्',
    descEn: 'Mandatory instruction for all drivers to pass on the left side of the island/divider.',
    descNe: 'सवारी चालकले अनिवार्य रूपमा बायाँ लेन वा बायाँ तर्फबाट सवारी चलाउनुपर्ने संकेत।'
  },
  {
    id: 'ahead-only',
    code: 'R-16',
    category: 'regulatory',
    shape: 'circle-blue',
    symbolType: 'AHEAD_ONLY',
    nameEn: 'Compulsory Ahead Only',
    nameNe: 'अनिवार्य सिधा मात्र जानुहोस्',
    descEn: 'Vehicles must proceed straight ahead only; turning left or right is not permitted.',
    descNe: 'सवारी साधन अनिवार्य सिधा मात्र लानुपर्ने, दायाँ वा बायाँ मोड्न नपाइने।'
  },

  // ==========================================
  // 2. WARNING / CAUTIONARY SIGNS (सचेतक तथा चेतावनीमूलक)
  // ==========================================
  {
    id: 'sharp-left-curve',
    code: 'W-01',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'CURVE_LEFT',
    nameEn: 'Sharp Left Curve Ahead',
    nameNe: 'अगाडि बायाँ खतरनाक मोड',
    descEn: 'Road curves sharply to the left ahead. Reduce speed and stay in your lane.',
    descNe: 'अगाडि बाटो बायाँतर्फ तीखो मोडिएको छ। गति कम गरी आफ्नो लेनमा रहनुहोस्।'
  },
  {
    id: 'sharp-right-curve',
    code: 'W-02',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'CURVE_RIGHT',
    nameEn: 'Sharp Right Curve Ahead',
    nameNe: 'अगाडि दायाँ खतरनाक मोड',
    descEn: 'Road bends sharply to the right ahead. Slow down and avoid overtaking.',
    descNe: 'अगाडि बाटो दायाँतर्फ मोडिएको छ। गति घटाउनुहोस् र उछिन्ने प्रयास नगर्नुहोस्।'
  },
  {
    id: 'double-bend',
    code: 'W-03',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'DOUBLE_BEND',
    nameEn: 'Double Winding Bend (Zigzag Road)',
    nameNe: 'अगाडि दोहोरो घुमाउरो बाटो',
    descEn: 'Series of sharp S-shaped bends ahead on hilly or winding terrain.',
    descNe: 'अगाडि लगातार नागबेली वा दोहोरो घुम्तीहरू छन्, सावधानीपूर्वक सवारी चलाउनुहोस्।'
  },
  {
    id: 'crossroad-ahead',
    code: 'W-04',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'CROSSROAD',
    nameEn: 'Crossroad / Four-Way Junction Ahead',
    nameNe: 'अगाडि चौबाटो छ',
    descEn: 'Four-way intersection ahead. Watch for cross traffic from both sides.',
    descNe: 'अगाडि चारैतिरबाट बाटो जोडिने चौबाटो छ, दायाँ-बायाँ हेरेर गति कम गर्नुहोस्।'
  },
  {
    id: 't-junction',
    code: 'W-05',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'T_JUNCTION',
    nameEn: 'T-Junction Ahead',
    nameNe: 'अगाडि टी-जक्सन (तीनकुने चोक)',
    descEn: 'The current road ends at a perpendicular cross street ahead. Prepare to yield and turn.',
    descNe: 'सिधा बाटो टुङ्गिएर दायाँ वा बायाँ मोड्नु पर्ने टी-चोक अगाडि छ।'
  },
  {
    id: 'roundabout-ahead',
    code: 'W-06',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'ROUNDABOUT',
    nameEn: 'Roundabout Ahead',
    nameNe: 'अगाडि गोलघुम्ती छ',
    descEn: 'Circular traffic island ahead. Give right-of-way to vehicles already inside the roundabout.',
    descNe: 'अगाडि गोलघुम्ती छ। घुम्तीभित्र प्रवेश गरिसकेका सवारीलाई पहिलो प्राथमिकता दिनुहोस्।'
  },
  {
    id: 'traffic-signals-ahead',
    code: 'W-07',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'TRAFFIC_LIGHT',
    nameEn: 'Traffic Signals Ahead',
    nameNe: 'अगाडि ट्राफिक बत्ती छ',
    descEn: 'Signal-controlled intersection ahead. Be prepared to stop on yellow or red light.',
    descNe: 'अगाडि ट्राफिक बत्ती भएको चोक छ। बत्तीको संकेत अनुसार रोकिन तयार रहनुहोस्।'
  },
  {
    id: 'pedestrian-crossing',
    code: 'W-08',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'ZEBRA',
    nameEn: 'Pedestrian Zebra Crossing Ahead',
    nameNe: 'अगाडि पैदल यात्रु क्रसिङ छ',
    descEn: 'Slow down and yield to pedestrians crossing the road on the zebra stripes.',
    descNe: 'अगाडि जेब्रा क्रसिङ छ। बाटो काटिरहेका पैदल यात्रुलाई पहिलो प्राथमिकता दिनुहोस्।'
  },
  {
    id: 'school-zone',
    code: 'W-09',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'SCHOOL',
    nameEn: 'Children / School Zone Ahead',
    nameNe: 'अगाडि विद्यालय क्षेत्र छ',
    descEn: 'School or playground nearby. Drive slowly and watch closely for children crossing.',
    descNe: 'नजिकै विद्यालय वा बालबालिका हिँड्ने क्षेत्र छ। गति एकदम कम गरी सवारी चलाउनुहोस्।'
  },
  {
    id: 'narrow-road-ahead',
    code: 'W-10',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'NARROW_ROAD',
    nameEn: 'Road Narrows Ahead',
    nameNe: 'अगाडि साँघुरो बाटो छ',
    descEn: 'The carriageway width decreases ahead. Merge safely and avoid overtaking.',
    descNe: 'अगाडि सडकको चौडाइ घटेर साँघुरो हुँदैछ, उछिन्ने काम नगर्नुहोस्।'
  },
  {
    id: 'narrow-bridge',
    code: 'W-11',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'NARROW_BRIDGE',
    nameEn: 'Narrow Bridge Ahead',
    nameNe: 'अगाडि साँघुरो पुल छ',
    descEn: 'Narrow bridge ahead. Yield to oncoming traffic if the bridge cannot fit two lanes safely.',
    descNe: 'अगाडि साँघुरो पुल छ। विपरीत दिशाबाट आउँदै गरेको सवारीलाई ध्यान दिई पार गर्नुहोस्।'
  },
  {
    id: 'steep-hill-up',
    code: 'W-12',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'STEEP_UP',
    nameEn: 'Steep Ascent (Uphill Grade)',
    nameNe: 'अगाडि ठाडो उकालो बाटो',
    descEn: 'Steep uphill gradient ahead. Shift to a lower gear early and give priority to climbing vehicles.',
    descNe: 'अगाडि ठाडो उकालो छ। समयमै तल्लो गियरमा सवारी राख्नुहोस् र उकालो चढ्ने सवारीलाई बाटो दिनुहोस्।'
  },
  {
    id: 'steep-hill-down',
    code: 'W-13',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'STEEP_DOWN',
    nameEn: 'Steep Descent (Downhill Grade)',
    nameNe: 'अगाडि ठाडो ओरालो बाटो',
    descEn: 'Steep downhill slope ahead. Engage low gear for engine braking; never coast in neutral.',
    descNe: 'अगाडि ठाडो ओरालो छ। न्युट्रलमा नगुडाई कम गियर र इन्जिन ब्रेकिङ प्रयोग गर्नुहोस्।'
  },
  {
    id: 'men-at-work',
    code: 'W-14',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'ROAD_WORK',
    nameEn: 'Road Work Ahead',
    nameNe: 'सडक मर्मत कार्य हुँदैछ',
    descEn: 'Construction workers and machinery on the road ahead. Reduce speed and follow flagmen.',
    descNe: 'अगाडि सडक निर्माण वा मर्मत कार्य भइरहेको छ, बिस्तारै र सावधानीपूर्वक पार गर्नुहोस्।'
  },
  {
    id: 'speed-breaker',
    code: 'W-15',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'BUMP',
    nameEn: 'Speed Breaker / Road Bump Ahead',
    nameNe: 'अगाडि स्पिड ब्रेकर वा उठेको बाटो',
    descEn: 'Speed hump or uneven road surface ahead. Brake gently before reaching the bump.',
    descNe: 'अगाडि गति नियन्त्रक (Speed Breaker) वा खाल्डाखुल्डी छ, गति कम गर्नुहोस्।'
  },
  {
    id: 'falling-rocks',
    code: 'W-16',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'ROCKS',
    nameEn: 'Falling Rocks / Landslide Zone',
    nameNe: 'पहिरो वा ढुङ्गा खस्ने क्षेत्र',
    descEn: 'Prone to rockfalls or landslides on mountain highways. Proceed with caution and do not park.',
    descNe: 'पहाडी सडकमा माथिबाट ढुङ्गा वा पहिरो खस्न सक्ने क्षेत्र। यहाँ सवारी नरोक्नुहोस्।'
  },
  {
    id: 'two-way-traffic',
    code: 'W-17',
    category: 'warning',
    shape: 'triangle-red',
    symbolType: 'TWO_WAY',
    nameEn: 'Two-Way Traffic Ahead',
    nameNe: 'दोहोरो सवारी आगमन',
    descEn: 'One-way divided road transitions into a two-way road with oncoming vehicles.',
    descNe: 'अगाडि बाटोमा दुवै दिशाबाट दोहोरो सवारी साधनहरू गुड्ने जानकारी।'
  },

  // ==========================================
  // 3. INFORMATIVE SIGNS (सूचनामूलक चिन्हहरू)
  // ==========================================
  {
    id: 'parking-zone',
    code: 'I-01',
    category: 'informative',
    shape: 'square-blue',
    symbolType: 'PARKING',
    nameEn: 'Designated Parking Area',
    nameNe: 'पार्किङ गर्ने ठाउँ',
    descEn: 'Authorized public parking zone for vehicles.',
    descNe: 'सवारी साधन सुरक्षित रूपमा पार्क गर्न तोकिएको आधिकारिक स्थान।'
  },
  {
    id: 'hospital-ahead',
    code: 'I-02',
    category: 'informative',
    shape: 'square-blue',
    symbolType: 'HOSPITAL',
    nameEn: 'Hospital Ahead',
    nameNe: 'अस्पताल',
    descEn: 'Medical hospital nearby. Avoid honking and give priority to ambulances.',
    descNe: 'नजिकै अस्पताल छ। हर्न नबजाउनुहोस् र एम्बुलेन्सलाई बाटो छोड्नुहोस्।'
  },
  {
    id: 'first-aid-post',
    code: 'I-03',
    category: 'informative',
    shape: 'square-blue',
    symbolType: 'FIRST_AID',
    nameEn: 'First Aid Station',
    nameNe: 'प्राथमिक उपचार केन्द्र',
    descEn: 'Emergency medical first aid post available nearby.',
    descNe: 'सडक नजिकै आकस्मिक प्राथमिक स्वास्थ्य उपचार केन्द्र उपलब्ध छ।'
  },
  {
    id: 'petrol-pump',
    code: 'I-04',
    category: 'informative',
    shape: 'square-blue',
    symbolType: 'FUEL',
    nameEn: 'Petrol Pump / EV Charging Station',
    nameNe: 'पेट्रोल पम्प / इन्धन केन्द्र',
    descEn: 'Fuel filling and vehicle charging facility ahead.',
    descNe: 'अगाडि सवारीमा इन्धन भर्ने पेट्रोल पम्प वा चार्जिङ स्टेशन छ।'
  },
  {
    id: 'bus-stop',
    code: 'I-05',
    category: 'informative',
    shape: 'square-blue',
    symbolType: 'BUS_STOP',
    nameEn: 'Public Bus Stop',
    nameNe: 'बस बिसौनी',
    descEn: 'Designated pickup and drop-off stop for public passenger buses.',
    descNe: 'सार्वजनिक यात्रुवाहक बसहरू रोकिने र यात्रु चढ्ने/ओर्लने तोकिएको बिसौनी।'
  },
  {
    id: 'workshop-repair',
    code: 'I-06',
    category: 'informative',
    shape: 'square-blue',
    symbolType: 'WORKSHOP',
    nameEn: 'Vehicle Repair Workshop',
    nameNe: 'सवारी मर्मत कारखाना',
    descEn: 'Mechanical service and breakdown repair facility nearby.',
    descNe: 'नजिकै सवारी साधन मर्मत गर्ने वर्कसप उपलब्ध छ।'
  },
  {
    id: 'restaurant-food',
    code: 'I-07',
    category: 'informative',
    shape: 'square-blue',
    symbolType: 'FOOD',
    nameEn: 'Restaurant / Refreshment Area',
    nameNe: 'चमेनागृह / खाना खाने ठाउँ',
    descEn: 'Highway rest stop with food and drinking water.',
    descNe: 'राजमार्ग नजिकै खाजा तथा खाना उपलब्ध हुने रेस्टुरेन्ट।'
  },
  {
    id: 'one-way-street',
    code: 'I-08',
    category: 'informative',
    shape: 'square-blue',
    symbolType: 'ONE_WAY',
    nameEn: 'One-Way Traffic Street',
    nameNe: 'एकतर्फी बाटो',
    descEn: 'Traffic on this road flows strictly in the direction of the arrow.',
    descNe: 'यस सडकमा तीरले देखाएको एकतर्फी दिशामा मात्र सवारी चलाउन पाइन्छ।'
  },
  {
    id: 'dead-end',
    code: 'I-09',
    category: 'informative',
    shape: 'square-blue',
    symbolType: 'DEAD_END',
    nameEn: 'No Through Road (Dead End)',
    nameNe: 'टुङ्गिने बाटो (अगाडि निकास नभएको)',
    descEn: 'This road has no outlet ahead for through vehicles.',
    descNe: 'यो बाटो अगाडि गएर बन्द हुन्छ, अर्को सडकमा निस्कने निकास छैन।'
  }
];

