---
title: "How We Built a Zero-Dependency Bikram Sambat (1970–2100 BS) Calendar & Nepal Financial Engine in TypeScript"
canonical_url: "https://nepalicalc.com/date"
tags: ["typescript", "nextjs", "nepal", "webdev"]
published: false
---

# How We Built a Zero-Dependency Bikram Sambat (1970–2100 BS) Calendar & Nepal Financial Engine in TypeScript

Unlike the Gregorian (AD) calendar—which follows deterministic leap-year math (`year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)`)—Nepal's official **Bikram Sambat (BS / वि.सं.)** solar calendar is astronomical.

In Bikram Sambat, a month can have **29, 30, 31, or 32 days** depending on the sun's transit through the zodiac (*Surya Sankranti*). Because there is no simple closed-form formula to predict BS month lengths across centuries, building a fast, client-side date converter and age calculator for Nepal requires a compact lookup matrix paired with a deterministic day-offset accumulator.

Here is an engineering breakdown of how we architected the date conversion and financial calculation engine powering [NepaliCalc.com](https://nepalicalc.com).

---

## 1. The Bikram Sambat Lookup Matrix Architecture

To convert any Bikram Sambat date $(Y_{bs}, M_{bs}, D_{bs})$ between **1970 BS and 2100 BS** into a Gregorian date $(Y_{ad}, M_{ad}, D_{ad})$ in $O(Y)$ time with zero external dependencies:

1. **Anchor Epoch**: We anchor the calendar to a known reference epoch (e.g., **1970 Baisakh 1 BS = April 13, 1913 AD**).
2. **12-Tuple Month Array**: Each BS year maps to a 12-element tuple storing the exact number of days from *Baisakh* (Month 1) to *Chaitra* (Month 12), plus the pre-summed annual total (365 or 366 days).

```typescript
// Example structure from our BS Calendar Engine
export const BS_CALENDAR_DATA: Record<number, number[]> = {
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 366 days
  2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 365 days
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 365 days
};
```

### Calculating Total Days Elapsed
When a user enters a BS date in the [Nepali Date Converter (BS ⇄ AD)](https://nepalicalc.com/date), we compute the exact day delta from the epoch:

```typescript
export function getBsDaysSinceEpoch(bsYear: number, bsMonth: number, bsDay: number): number {
  let totalDays = 0;
  for (let y = 1970; y < bsYear; y++) {
    const months = BS_CALENDAR_DATA[y];
    if (months) {
      totalDays += months.reduce((acc, d) => acc + d, 0);
    }
  }
  const currentYearMonths = BS_CALENDAR_DATA[bsYear];
  for (let m = 0; m < bsMonth - 1; m++) {
    totalDays += currentYearMonths[m];
  }
  totalDays += (bsDay - 1);
  return totalDays;
}
```

Adding `totalDays` in UTC milliseconds to the epoch date yields the exact Gregorian date without timezone drift!

---

## 2. Solving Customary Nepali Land Units (Ropani vs. Bigha)

Nepal uses two parallel customary land measurement systems depending on geography:
- **Hilly Region (Pahad / Kathmandu Valley)**: `1 Ropani = 16 Aana = 64 Paisa = 256 Daam = 5,476 sq. ft.`
- **Terai Region (Madhesh / Plains)**: `1 Bigha = 20 Kattha = 400 Dhur = 72,900 sq. ft.`

Because floating-point conversions directly between *Daam* and *Dhur* can introduce rounding drift on legal property deeds (*Lalpurja*), we normalize all inputs to **Square Feet (`sq. ft.`)** as the single source of truth:

| Customary Unit | Region | Exact Square Feet | Exact Square Meters |
| :--- | :--- | :---: | :---: |
| **1 Bigha (बिघा)** | Terai | 72,900.00 sq. ft. | 6,772.63 m² |
| **1 Kattha (कठ्ठा)** | Terai | 3,645.00 sq. ft. | 338.63 m² |
| **1 Dhur (धुर)** | Terai | 182.25 sq. ft. | 16.93 m² |
| **1 Ropani (रोपनी)** | Hilly | 5,476.00 sq. ft. | 508.74 m² |
| **1 Aana (आना)** | Hilly | 342.25 sq. ft. | 31.79 m² |
| **1 Paisa (पैसा)** | Hilly | 85.5625 sq. ft. | 7.95 m² |
| **1 Daam (दाम)** | Hilly | 21.3906 sq. ft. | 1.99 m² |

You can inspect the live bidirectional unit converter and road-deduction (*Bato Katta*) math at [nepalicalc.com/land](https://nepalicalc.com/land).

---

## 3. 100% Client-Side Privacy for Financial & Legal Tools

Every calculator on [NepaliCalc.com](https://nepalicalc.com)—from [IRD Salary Tax](https://nepalicalc.com/tax) and [NEPSE Share Commission](https://nepalicalc.com/nepse) to [Bilingual Legal Rent & Partnership Deeds](https://nepalicalc.com/documents)—executes 100% in the browser's JavaScript runtime with zero server-side storage of personal salary or property figures.
