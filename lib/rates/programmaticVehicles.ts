export interface ProgrammaticVehicleTax {
  slug: string;
  name: string;
  vehicleType: 'bike' | 'car';
  fuelType: 'petrol' | 'electric';
  capacity: number;
  title: string;
  metaDescription: string;
  keywords: string[];
}

export const PROGRAMMATIC_VEHICLE_TAXES: ProgrammaticVehicleTax[] = [
  {
    slug: "pulsar-150-tax",
    name: "Bajaj Pulsar 150",
    vehicleType: "bike",
    fuelType: "petrol",
    capacity: 149,
    title: "Bajaj Pulsar 150 Bluebook Tax in Nepal — Annual Road Tax & Fines",
    metaDescription: "Check annual road tax for Bajaj Pulsar 150 (149cc) in Bagmati Province and Nepal. Road tax is NPR 4,500/year plus renewal fee and third-party insurance.",
    keywords: ["pulsar 150 tax nepal", "bajaj pulsar 150 bluebook tax", "pulsar 150 road tax bagmati"],
  },
  {
    slug: "pulsar-220-tax",
    name: "Bajaj Pulsar 220F",
    vehicleType: "bike",
    fuelType: "petrol",
    capacity: 220,
    title: "Bajaj Pulsar 220F Road Tax in Nepal — Bluebook Renewal Rate",
    metaDescription: "Annual road tax for Bajaj Pulsar 220F (220cc) in Nepal is NPR 6,000/year (161cc-250cc slab). Calculate late fines and 3rd party insurance instantly.",
    keywords: ["pulsar 220 tax nepal", "pulsar 220f road tax", "pulsar 220 renewal fine nepal"],
  },
  {
    slug: "pulsar-ns200-tax",
    name: "Bajaj Pulsar NS200",
    vehicleType: "bike",
    fuelType: "petrol",
    capacity: 199,
    title: "Bajaj Pulsar NS200 Road Tax in Nepal — Bluebook Renewal Rate",
    metaDescription: "Annual road tax for Bajaj Pulsar NS200 (199.5cc) in Bagmati Province is NPR 6,000 per year. Instant calculation with late fine brackets.",
    keywords: ["pulsar ns200 tax nepal", "ns 200 bluebook renewal nepal", "ns200 road tax bagmati"],
  },
  {
    slug: "royal-enfield-classic-350-tax",
    name: "Royal Enfield Classic 350",
    vehicleType: "bike",
    fuelType: "petrol",
    capacity: 349,
    title: "Royal Enfield Classic 350 Tax in Nepal — Bluebook Annual Road Tax",
    metaDescription: "Annual road tax for Royal Enfield Classic 350 (349cc) in Nepal is NPR 11,000 per year (251cc-400cc bracket). Calculate total renewal payable.",
    keywords: ["bullet 350 tax nepal", "classic 350 bluebook tax nepal", "royal enfield road tax nepal"],
  },
  {
    slug: "yamaha-mt-15-tax",
    name: "Yamaha MT-15 V2",
    vehicleType: "bike",
    fuelType: "petrol",
    capacity: 155,
    title: "Yamaha MT-15 Road Tax in Nepal — Bluebook Renewal Rate",
    metaDescription: "Annual road tax for Yamaha MT-15 (155cc) in Nepal is NPR 4,500/year (126cc-160cc bracket). Calculate late fines and insurance cost.",
    keywords: ["mt 15 tax nepal", "yamaha mt-15 road tax bagmati", "mt 15 bluebook renewal fine"],
  },
  {
    slug: "honda-shine-125-tax",
    name: "Honda Shine 125",
    vehicleType: "bike",
    fuelType: "petrol",
    capacity: 124,
    title: "Honda Shine 125 Road Tax in Nepal — Bluebook Renewal Rate",
    metaDescription: "Annual road tax for Honda Shine 125 (124cc) in Nepal is NPR 3,000/year (up to 125cc bracket). Calculate total Yatayat renewal cost.",
    keywords: ["honda shine tax nepal", "honda shine 125 road tax", "shine bike bluebook renewal"],
  },
  {
    slug: "tvs-ntorq-tax",
    name: "TVS NTorq 125",
    vehicleType: "bike",
    fuelType: "petrol",
    capacity: 124,
    title: "TVS NTorq 125 Scooter Road Tax in Nepal — Bluebook Renewal",
    metaDescription: "Annual road tax for TVS NTorq 125 scooter in Bagmati Province is NPR 3,000 per year. Calculate late penalty fines and renewal fees.",
    keywords: ["ntorq tax nepal", "tvs ntorq bluebook renewal tax", "ntorq 125 road tax bagmati"],
  },
  {
    slug: "suzuki-swift-tax",
    name: "Suzuki Swift",
    vehicleType: "car",
    fuelType: "petrol",
    capacity: 1197,
    title: "Suzuki Swift Car Tax in Nepal — Bluebook Renewal Rate",
    metaDescription: "Annual road tax for Suzuki Swift (1197cc) in Nepal is NPR 25,000/year (1001cc-1500cc bracket). Calculate late renewal penalties and insurance.",
    keywords: ["suzuki swift tax nepal", "swift car road tax nepal", "swift car bluebook renewal"],
  },
  {
    slug: "hyundai-creta-tax",
    name: "Hyundai Creta",
    vehicleType: "car",
    fuelType: "petrol",
    capacity: 1497,
    title: "Hyundai Creta Car Tax in Nepal — Bluebook Road Tax",
    metaDescription: "Annual road tax for Hyundai Creta (1497cc) in Nepal is NPR 25,000 per year. Calculate full renewal fees and third-party insurance.",
    keywords: ["creta tax nepal", "hyundai creta road tax nepal", "creta bluebook renewal"],
  },
  {
    slug: "byd-atto-3-ev-tax",
    name: "BYD Atto 3 (EV)",
    vehicleType: "car",
    fuelType: "electric",
    capacity: 100,
    title: "BYD Atto 3 Electric Car Tax in Nepal — EV Road Tax Rate",
    metaDescription: "Annual road tax for BYD Atto 3 EV (100kW motor) in Nepal is NPR 15,000/year (51kW-100kW bracket). Low government road tax for electric cars.",
    keywords: ["byd atto 3 tax nepal", "electric car tax nepal", "byd ev road tax bagmati"],
  },
  {
    slug: "mahindra-scorpio-tax",
    name: "Mahindra Scorpio",
    vehicleType: "car",
    fuelType: "petrol",
    capacity: 2184,
    title: "Mahindra Scorpio Road Tax in Nepal — Annual Bluebook Rate",
    metaDescription: "Annual road tax for Mahindra Scorpio (2184cc) in Nepal is NPR 37,000/year (2001cc-2500cc bracket). Calculate late fines and insurance.",
    keywords: ["scorpio tax nepal", "mahindra scorpio road tax nepal", "scorpio bluebook fine"],
  },
];
