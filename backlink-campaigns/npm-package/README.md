# nepalicalc-utils

Zero-dependency JavaScript/TypeScript utility for converting **Nepali Customary Land Measurement Units** (*Ropani, Aana, Paisa, Daam* & *Bigha, Kattha, Dhur* to Square Feet and Square Meters).

Powered by **[NepaliCalc.com — Smart All-in-One Calculators for Nepal](https://nepalicalc.com)**.

## Interactive Web Calculators
* **[Nepal Land Unit Converter (Ropani ⇄ Bigha ⇄ Sq. Ft.)](https://nepalicalc.com/land)**
* **[Nepal Salary & Income Tax Calculator (FY 2082/83 & 2083/84)](https://nepalicalc.com/tax)**
* **[Bikram Sambat Date Converter (BS ⇄ AD) & Live Patro](https://nepalicalc.com/date)**
* **[NRB Live Forex & Remittance Calculator](https://nepalicalc.com/forex)**
* **[NEPSE Share Profit, WACC & Broker Fee Calculator](https://nepalicalc.com/nepse)**

## Installation
```bash
npm install nepalicalc-utils
```

## Quick Usage
```js
const { ropaniToSqFt, sqFtToAllNepalUnits } = require('nepalicalc-utils');

// Convert 0 Ropani, 4 Aana, 2 Paisa, 0 Daam to Square Feet
const sqFt = ropaniToSqFt(0, 4, 2, 0); // 1540.125 sq. ft.

// Convert Square Feet to both Hilly (Ropani) and Terai (Bigha) units
console.log(sqFtToAllNepalUnits(5476));
```
