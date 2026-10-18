export interface VehicleModel {
  name: string;
  brand: string;
  capacity: number; // cc for petrol/diesel, Watts for electric bikes, kW for electric cars
  fuelType: 'petrol' | 'electric';
  type: 'bike' | 'car';
}

export const POPULAR_BIKES_NEPAL: VehicleModel[] = [
  // Bajaj
  { name: "Bajaj Pulsar 150", brand: "Bajaj", capacity: 149, fuelType: "petrol", type: "bike" },
  { name: "Bajaj Pulsar 220F", brand: "Bajaj", capacity: 220, fuelType: "petrol", type: "bike" },
  { name: "Bajaj Pulsar NS200", brand: "Bajaj", capacity: 199, fuelType: "petrol", type: "bike" },
  { name: "Bajaj Pulsar N160 / NS160", brand: "Bajaj", capacity: 164, fuelType: "petrol", type: "bike" },
  { name: "Bajaj Pulsar 125", brand: "Bajaj", capacity: 124, fuelType: "petrol", type: "bike" },
  { name: "Bajaj Platina 100 / 110", brand: "Bajaj", capacity: 115, fuelType: "petrol", type: "bike" },
  { name: "Bajaj Dominar 400", brand: "Bajaj", capacity: 373, fuelType: "petrol", type: "bike" },
  { name: "Bajaj Dominar 250", brand: "Bajaj", capacity: 248, fuelType: "petrol", type: "bike" },

  // Yamaha
  { name: "Yamaha FZ-S FI / V3 / V4", brand: "Yamaha", capacity: 149, fuelType: "petrol", type: "bike" },
  { name: "Yamaha MT-15 V2", brand: "Yamaha", capacity: 155, fuelType: "petrol", type: "bike" },
  { name: "Yamaha R15 V3 / V4", brand: "Yamaha", capacity: 155, fuelType: "petrol", type: "bike" },
  { name: "Yamaha RayZR 125 FI (Scooter)", brand: "Yamaha", capacity: 125, fuelType: "petrol", type: "bike" },
  { name: "Yamaha Aerox 155 (Scooter)", brand: "Yamaha", capacity: 155, fuelType: "petrol", type: "bike" },
  { name: "Yamaha FZX 150", brand: "Yamaha", capacity: 149, fuelType: "petrol", type: "bike" },

  // Honda
  { name: "Honda Shine 125", brand: "Honda", capacity: 124, fuelType: "petrol", type: "bike" },
  { name: "Honda Dio (110cc Scooter)", brand: "Honda", capacity: 109, fuelType: "petrol", type: "bike" },
  { name: "Honda Dio 125 (Scooter)", brand: "Honda", capacity: 124, fuelType: "petrol", type: "bike" },
  { name: "Honda Activa 125", brand: "Honda", capacity: 124, fuelType: "petrol", type: "bike" },
  { name: "Honda Hornet 2.0", brand: "Honda", capacity: 184, fuelType: "petrol", type: "bike" },
  { name: "Honda XR 190L / 150L (Dirt)", brand: "Honda", capacity: 184, fuelType: "petrol", type: "bike" },
  { name: "Honda Unicorn 160", brand: "Honda", capacity: 162, fuelType: "petrol", type: "bike" },

  // TVS
  { name: "TVS Apache RTR 160 4V", brand: "TVS", capacity: 159, fuelType: "petrol", type: "bike" },
  { name: "TVS Apache RTR 200 4V", brand: "TVS", capacity: 197, fuelType: "petrol", type: "bike" },
  { name: "TVS NTorq 125 (Scooter)", brand: "TVS", capacity: 124, fuelType: "petrol", type: "bike" },
  { name: "TVS Raider 125", brand: "TVS", capacity: 124, fuelType: "petrol", type: "bike" },
  { name: "TVS Ronin 225", brand: "TVS", capacity: 225, fuelType: "petrol", type: "bike" },
  { name: "TVS Jupiter 110", brand: "TVS", capacity: 109, fuelType: "petrol", type: "bike" },

  // Royal Enfield
  { name: "Royal Enfield Classic 350", brand: "Royal Enfield", capacity: 349, fuelType: "petrol", type: "bike" },
  { name: "Royal Enfield Hunter 350", brand: "Royal Enfield", capacity: 349, fuelType: "petrol", type: "bike" },
  { name: "Royal Enfield Bullet 350", brand: "Royal Enfield", capacity: 349, fuelType: "petrol", type: "bike" },
  { name: "Royal Enfield Meteor 350", brand: "Royal Enfield", capacity: 349, fuelType: "petrol", type: "bike" },
  { name: "Royal Enfield Himalayan 450", brand: "Royal Enfield", capacity: 452, fuelType: "petrol", type: "bike" },
  { name: "Royal Enfield Himalayan 411", brand: "Royal Enfield", capacity: 411, fuelType: "petrol", type: "bike" },

  // Hero
  { name: "Hero Splendor Plus / Xtec", brand: "Hero", capacity: 97, fuelType: "petrol", type: "bike" },
  { name: "Hero HF Deluxe", brand: "Hero", capacity: 97, fuelType: "petrol", type: "bike" },
  { name: "Hero Xpulse 200 4V (Dirt)", brand: "Hero", capacity: 199, fuelType: "petrol", type: "bike" },
  { name: "Hero Glamour 125", brand: "Hero", capacity: 124, fuelType: "petrol", type: "bike" },

  // KTM
  { name: "KTM Duke 200", brand: "KTM", capacity: 199, fuelType: "petrol", type: "bike" },
  { name: "KTM Duke 250", brand: "KTM", capacity: 248, fuelType: "petrol", type: "bike" },
  { name: "KTM Duke 390", brand: "KTM", capacity: 373, fuelType: "petrol", type: "bike" },
  { name: "KTM 250 Adventure", brand: "KTM", capacity: 248, fuelType: "petrol", type: "bike" },
  { name: "KTM 390 Adventure", brand: "KTM", capacity: 373, fuelType: "petrol", type: "bike" },

  // Suzuki
  { name: "Suzuki Gixxer 150", brand: "Suzuki", capacity: 155, fuelType: "petrol", type: "bike" },
  { name: "Suzuki Gixxer 250", brand: "Suzuki", capacity: 249, fuelType: "petrol", type: "bike" },
  { name: "Suzuki Burgman 125 (Scooter)", brand: "Suzuki", capacity: 124, fuelType: "petrol", type: "bike" },
  { name: "Suzuki Access 125", brand: "Suzuki", capacity: 124, fuelType: "petrol", type: "bike" },

  // Crossfire
  { name: "Crossfire GR7 250 (Dirt)", brand: "Crossfire", capacity: 249, fuelType: "petrol", type: "bike" },
  { name: "Crossfire Tracker 250", brand: "Crossfire", capacity: 249, fuelType: "petrol", type: "bike" },

  // Electric Scooters / Bikes in Nepal
  { name: "Yadea G5 / C-Umi (EV)", brand: "Yadea", capacity: 1500, fuelType: "electric", type: "bike" },
  { name: "Segway E100 / E125L (EV)", brand: "Segway", capacity: 1800, fuelType: "electric", type: "bike" },
  { name: "Super Soco TC Max / CPx (EV)", brand: "Super Soco", capacity: 3000, fuelType: "electric", type: "bike" },
  { name: "Pure EV EPluto 7G (EV)", brand: "Pure EV", capacity: 1500, fuelType: "electric", type: "bike" },
];

export const POPULAR_CARS_NEPAL: VehicleModel[] = [
  // Maruti Suzuki
  { name: "Suzuki Alto 800", brand: "Suzuki", capacity: 796, fuelType: "petrol", type: "car" },
  { name: "Suzuki Alto K10", brand: "Suzuki", capacity: 998, fuelType: "petrol", type: "car" },
  { name: "Suzuki Swift", brand: "Suzuki", capacity: 1197, fuelType: "petrol", type: "car" },
  { name: "Suzuki Baleno", brand: "Suzuki", capacity: 1197, fuelType: "petrol", type: "car" },
  { name: "Suzuki Brezza", brand: "Suzuki", capacity: 1462, fuelType: "petrol", type: "car" },
  { name: "Suzuki Grand Vitara", brand: "Suzuki", capacity: 1462, fuelType: "petrol", type: "car" },
  { name: "Suzuki Dzire", brand: "Suzuki", capacity: 1197, fuelType: "petrol", type: "car" },
  { name: "Suzuki Jimny 4x4", brand: "Suzuki", capacity: 1462, fuelType: "petrol", type: "car" },
  { name: "Suzuki Celerio", brand: "Suzuki", capacity: 998, fuelType: "petrol", type: "car" },
  { name: "Suzuki S-Presso", brand: "Suzuki", capacity: 998, fuelType: "petrol", type: "car" },

  // Hyundai
  { name: "Hyundai Grand i10 Nios", brand: "Hyundai", capacity: 1197, fuelType: "petrol", type: "car" },
  { name: "Hyundai Venue", brand: "Hyundai", capacity: 1197, fuelType: "petrol", type: "car" },
  { name: "Hyundai Creta", brand: "Hyundai", capacity: 1497, fuelType: "petrol", type: "car" },
  { name: "Hyundai Exter", brand: "Hyundai", capacity: 1197, fuelType: "petrol", type: "car" },
  { name: "Hyundai Tucson", brand: "Hyundai", capacity: 1999, fuelType: "petrol", type: "car" },
  { name: "Hyundai Ioniq 5 (EV)", brand: "Hyundai", capacity: 125, fuelType: "electric", type: "car" },
  { name: "Hyundai Kona Electric (EV)", brand: "Hyundai", capacity: 100, fuelType: "electric", type: "car" },

  // Tata
  { name: "Tata Tiago", brand: "Tata", capacity: 1199, fuelType: "petrol", type: "car" },
  { name: "Tata Tiago EV", brand: "Tata", capacity: 55, fuelType: "electric", type: "car" },
  { name: "Tata Punch", brand: "Tata", capacity: 1199, fuelType: "petrol", type: "car" },
  { name: "Tata Punch EV", brand: "Tata", capacity: 60, fuelType: "electric", type: "car" },
  { name: "Tata Nexon", brand: "Tata", capacity: 1199, fuelType: "petrol", type: "car" },
  { name: "Tata Nexon EV", brand: "Tata", capacity: 95, fuelType: "electric", type: "car" },
  { name: "Tata Harrier", brand: "Tata", capacity: 1956, fuelType: "petrol", type: "car" },
  { name: "Tata Safari", brand: "Tata", capacity: 1956, fuelType: "petrol", type: "car" },

  // BYD (Electric market leader in Nepal)
  { name: "BYD Atto 3 (EV)", brand: "BYD", capacity: 100, fuelType: "electric", type: "car" },
  { name: "BYD Dolphin (EV)", brand: "BYD", capacity: 70, fuelType: "electric", type: "car" },
  { name: "BYD Seal (EV)", brand: "BYD", capacity: 150, fuelType: "electric", type: "car" },
  { name: "BYD e6 (EV)", brand: "BYD", capacity: 70, fuelType: "electric", type: "car" },

  // MG
  { name: "MG ZS EV", brand: "MG", capacity: 99, fuelType: "electric", type: "car" },
  { name: "MG Comet EV", brand: "MG", capacity: 31, fuelType: "electric", type: "car" },
  { name: "MG 4 EV", brand: "MG", capacity: 99, fuelType: "electric", type: "car" },
  { name: "MG Hector", brand: "MG", capacity: 1451, fuelType: "petrol", type: "car" },

  // Mahindra
  { name: "Mahindra Scorpio-N", brand: "Mahindra", capacity: 2184, fuelType: "petrol", type: "car" },
  { name: "Mahindra Scorpio Classic", brand: "Mahindra", capacity: 2179, fuelType: "petrol", type: "car" },
  { name: "Mahindra Bolero", brand: "Mahindra", capacity: 2523, fuelType: "petrol", type: "car" },
  { name: "Mahindra XUV 700", brand: "Mahindra", capacity: 1999, fuelType: "petrol", type: "car" },
  { name: "Mahindra Thar 4x4", brand: "Mahindra", capacity: 1997, fuelType: "petrol", type: "car" },
  { name: "Mahindra XUV 300 / 3XO", brand: "Mahindra", capacity: 1197, fuelType: "petrol", type: "car" },

  // Kia
  { name: "Kia Sonet", brand: "Kia", capacity: 1197, fuelType: "petrol", type: "car" },
  { name: "Kia Seltos", brand: "Kia", capacity: 1497, fuelType: "petrol", type: "car" },
  { name: "Kia Carens", brand: "Kia", capacity: 1497, fuelType: "petrol", type: "car" },
  { name: "Kia EV6 (EV)", brand: "Kia", capacity: 168, fuelType: "electric", type: "car" },

  // Toyota
  { name: "Toyota Hilux Pickup", brand: "Toyota", capacity: 2755, fuelType: "petrol", type: "car" },
  { name: "Toyota Fortuner", brand: "Toyota", capacity: 2755, fuelType: "petrol", type: "car" },
  { name: "Toyota Raize", brand: "Toyota", capacity: 998, fuelType: "petrol", type: "car" },
  { name: "Toyota Corolla Cross", brand: "Toyota", capacity: 1798, fuelType: "petrol", type: "car" },
];
