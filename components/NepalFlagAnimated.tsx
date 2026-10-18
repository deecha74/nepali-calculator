'use client';

import React from 'react';

interface NepalFlagAnimatedProps {
  size?: number;
  isWatermark?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function NepalFlagAnimated({ 
  size = 28, 
  isWatermark = false,
  style = {},
  className = ''
}: NepalFlagAnimatedProps) {
  const width = size;
  const height = Math.round(size * 1.22);

  if (isWatermark) {
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          animation: 'nepalFlagWatermarkFloat 6s ease-in-out infinite',
          ...style,
        }}
      >
        <svg
          width={size}
          height={height}
          viewBox="0 0 100 122"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blue Outer Border */}
          <path
            d="M 6 4 L 92 56 L 42 56 L 92 118 L 6 118 Z"
            fill="#003893"
            stroke="#003893"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Crimson Red Field */}
          <path
            d="M 11 9 L 81 52 L 36 52 L 83 112 L 11 112 Z"
            fill="#c8102e"
          />
          {/* White Moon (Upper Triangle) */}
          <g fill="#ffffff">
            <path d="M 24 33 A 10 10 0 0 0 40 33 A 11 11 0 1 1 24 33 Z" />
            <circle cx="32" cy="35" r="3.2" />
          </g>
          {/* White 12-Rayed Sun (Lower Triangle) */}
          <g fill="#ffffff" transform="translate(35, 84)">
            <circle cx="0" cy="0" r="5" />
            {/* Rays */}
            <path d="M 0 -10 L 2 -6 L -2 -6 Z M 0 10 L 2 6 L -2 6 Z M -10 0 L -6 2 L -6 -2 Z M 10 0 L 6 2 L 6 -2 Z M -7 -7 L -4.5 -2.5 L -2.5 -4.5 Z M 7 7 L 4.5 2.5 L 2.5 4.5 Z M -7 7 L -2.5 4.5 L -4.5 2.5 Z M 7 -7 L 2.5 -4.5 L 4.5 -2.5 Z" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '400px',
        ...style,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 122"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transformOrigin: 'left center',
          animation: 'nepalFlagFlutter 3.2s ease-in-out infinite',
        }}
      >
        <defs>
          <linearGradient id="flagShineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Flag Pole Edge / String Accent */}
        <line x1="6" y1="2" x2="6" y2="120" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />

        {/* Outer Deep Blue Border Shape */}
        <path
          d="M 6 4 L 92 56 L 42 56 L 92 118 L 6 118 Z"
          fill="#003893"
          stroke="#003893"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Inner Crimson Red Field */}
        <path
          d="M 11 9 L 81 52 L 36 52 L 83 112 L 11 112 Z"
          fill="#c8102e"
        />

        {/* Dynamic Light/Wave Shading Overlay */}
        <path
          d="M 11 9 L 81 52 L 36 52 L 83 112 L 11 112 Z"
          fill="url(#flagShineGrad)"
          style={{ mixBlendMode: 'overlay' }}
        />

        {/* White Moon & Crescent (Upper Pennant) */}
        <g fill="#ffffff">
          <path d="M 24 33 A 10 10 0 0 0 40 33 A 11 11 0 1 1 24 33 Z" />
          <circle cx="32" cy="35" r="3.2" />
        </g>

        {/* White 12-Rayed Sun (Lower Pennant) */}
        <g fill="#ffffff" transform="translate(35, 84)">
          <circle cx="0" cy="0" r="5" />
          <path d="M 0 -10 L 2 -6 L -2 -6 Z M 0 10 L 2 6 L -2 6 Z M -10 0 L -6 2 L -6 -2 Z M 10 0 L 6 2 L 6 -2 Z M -7 -7 L -4.5 -2.5 L -2.5 -4.5 Z M 7 7 L 4.5 2.5 L 2.5 4.5 Z M -7 7 L -2.5 4.5 L -4.5 2.5 Z M 7 -7 L 2.5 -4.5 L 4.5 -2.5 Z" />
        </g>
      </svg>
    </div>
  );
}
