export interface RightShareInputs {
  marketPrice: number; // Closing price before book closure (e.g. NPR 450)
  bonusPercent: number; // Bonus share percentage (e.g. 15%)
  rightRatio: number; // Right share ratio (e.g. 1:1 = 1, 1:0.5 = 0.5, 10% = 0.1)
  sharesHeld: number; // Current number of shares held by investor
  faceValue?: number; // Face value per share, default NPR 100
}

export interface RightShareResult {
  marketPrice: number;
  faceValue: number;
  bonusPercent: number;
  rightRatio: number;
  sharesHeld: number;
  
  // Theoretical opening price on NEPSE
  adjustedPrice: number;
  priceDropPercentage: number;
  
  // Bonus details
  bonusSharesReceived: number;
  bonusTaxPayable: number; // 5% of face value = Rs. 5 per bonus share
  
  // Right details
  eligibleRightShares: number;
  rightApplicationAmount: number; // Right shares * face value
  
  // Portfolio changes
  preAdjustmentValue: number;
  postTotalShares: number;
  postAdjustmentValue: number;
}

export function calculateRightShareAdjustment(inputs: RightShareInputs): RightShareResult {
  const { marketPrice, bonusPercent, rightRatio, sharesHeld, faceValue = 100 } = inputs;

  const bonusDecimal = Math.max(0, bonusPercent) / 100;
  const rightDecimal = Math.max(0, rightRatio);

  // NEPSE Formula:
  // Adjusted Price = (Market Price + (Right Ratio * Face Value)) / (1 + Bonus % + Right Ratio)
  const denominator = 1 + bonusDecimal + rightDecimal;
  const numerator = marketPrice + (rightDecimal * faceValue);
  
  const adjustedPrice = denominator > 0 ? Math.round((numerator / denominator) * 100) / 100 : marketPrice;
  const priceDrop = marketPrice > 0 ? ((marketPrice - adjustedPrice) / marketPrice) * 100 : 0;

  // Bonus share metrics
  const bonusSharesReceived = Math.floor(sharesHeld * bonusDecimal);
  // In Nepal, 5% dividend tax on bonus face value (5% of 100 = Rs. 5 per bonus share)
  const bonusTaxPayable = Math.round(bonusSharesReceived * (faceValue * 0.05));

  // Right share metrics
  const eligibleRightShares = Math.floor(sharesHeld * rightDecimal);
  const rightApplicationAmount = eligibleRightShares * faceValue;

  // Portfolio metrics
  const preAdjustmentValue = sharesHeld * marketPrice;
  const postTotalShares = sharesHeld + bonusSharesReceived + eligibleRightShares;
  const postAdjustmentValue = Math.round(postTotalShares * adjustedPrice);

  return {
    marketPrice,
    faceValue,
    bonusPercent,
    rightRatio,
    sharesHeld,
    adjustedPrice,
    priceDropPercentage: Math.round(priceDrop * 100) / 100,
    bonusSharesReceived,
    bonusTaxPayable,
    eligibleRightShares,
    rightApplicationAmount,
    preAdjustmentValue,
    postTotalShares,
    postAdjustmentValue,
  };
}
