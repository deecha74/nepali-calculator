import React from 'react';
import siteConfig from '@/config/site.json';

interface NepalCalcLogoProps {
  height?: number;
  className?: string;
  strokeColor?: string;
  accentColor?: string;
  showFlag?: boolean;
}

export function NepalCalcLogo({
  height = 32,
  className = '',
  strokeColor = siteConfig.logo.textColor,
  accentColor = siteConfig.logo.accentColor,
  showFlag = siteConfig.logo.showFlag,
}: NepalCalcLogoProps) {
  // Compute proportional font size based on height
  const fontSize = Math.max(18, Math.round(height * 0.72));

  return (
    <div 
      className={`nepalcalc-logo-container ${className}`}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '8px',
        textDecoration: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      {showFlag && (
        <img 
          src="/nepal-flag.svg" 
          alt="Nepal Flag" 
          style={{ 
            height: `${Math.round(height * 0.72)}px`, 
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            flexShrink: 0,
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.12))',
          }} 
        />
      )}
      
      <span
        style={{
          fontFamily: "var(--font-sans), 'Outfit', 'Inter', -apple-system, sans-serif",
          fontSize: `${fontSize}px`,
          fontWeight: 900,
          color: strokeColor,
          letterSpacing: '-0.035em',
          display: 'inline-flex',
          alignItems: 'baseline',
          whiteSpace: 'nowrap',
        }}
      >
        <span>{siteConfig.logo.text}</span>
        <span
          style={{
            color: accentColor,
            marginLeft: '1px',
            fontSize: `${Math.round(fontSize * 1.15)}px`,
            lineHeight: 0,
            display: 'inline-block',
            fontWeight: 900,
          }}
        >
          {siteConfig.logo.accentDot}
        </span>
      </span>
    </div>
  );
}
