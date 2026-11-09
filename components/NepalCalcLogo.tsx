import React from 'react';

interface NepalCalcLogoProps {
  height?: number;
  className?: string;
  strokeColor?: string;
  accentColor?: string;
  showFlag?: boolean;
}

export function NepalCalcLogo({
  height = 36,
  className = '',
}: NepalCalcLogoProps) {
  return (
    <div 
      className={`nepalcalc-logo-container ${className}`}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        textDecoration: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      <img
        src="/nepalicalc-logo.png"
        alt="NepaliCalc"
        height={height}
        style={{
          height: `${height}px`,
          width: 'auto',
          maxWidth: '180px',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}
