'use client';

import React from 'react';

export function CosmicPlanetaryBanner({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '120px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 70% 50%, #151838 0%, #080a1c 65%, #02030a 100%)',
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 4px 16px rgba(0, 0, 0, 0.2)',
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 380 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Planet Saturn Body Gradient */}
          <radialGradient id="saturnBodyGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffd8a8" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>

          {/* Saturn Ring Gradient */}
          <linearGradient id="saturnRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#fde68a" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#d97706" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.3" />
          </linearGradient>

          {/* Cosmic Nebula Glow */}
          <radialGradient id="nebulaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#312e81" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#03040c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Nebula Cloud */}
        <circle cx="280" cy="55" r="85" fill="url(#nebulaGlow)" />
        <circle cx="100" cy="40" r="60" fill="url(#nebulaGlow)" />

        {/* Starfield Particles */}
        <circle cx="24" cy="28" r="1" fill="#ffffff" opacity="0.8" />
        <circle cx="48" cy="72" r="1.2" fill="#ffffff" opacity="0.9" />
        <circle cx="85" cy="20" r="0.8" fill="#ffffff" opacity="0.7" />
        <circle cx="120" cy="85" r="1" fill="#ffffff" opacity="0.85" />
        <circle cx="160" cy="25" r="0.9" fill="#ffffff" opacity="0.6" />
        <circle cx="195" cy="65" r="1.3" fill="#ffffff" opacity="0.9" />
        <circle cx="230" cy="18" r="0.8" fill="#ffffff" opacity="0.75" />
        <circle cx="340" cy="30" r="1.1" fill="#ffffff" opacity="0.8" />
        <circle cx="360" cy="80" r="0.9" fill="#ffffff" opacity="0.7" />
        <circle cx="310" cy="95" r="1.2" fill="#ffffff" opacity="0.85" />
        <circle cx="140" cy="50" r="0.7" fill="#ffffff" opacity="0.5" />

        {/* Small Coral Satellite Planet (Mars/Moon) */}
        <circle cx="125" cy="38" r="4.5" fill="#f87171" />
        <circle cx="123" cy="36" r="1.5" fill="#fca5a5" opacity="0.8" />

        {/* Small Cyan Moon Satellite */}
        <circle cx="330" cy="35" r="3.2" fill="#38bdf8" />
        <circle cx="329" cy="34" r="1" fill="#bae6fd" opacity="0.9" />

        {/* SATURN WITH RINGS (Centered slightly to the right, just like screenshot) */}
        <g transform="translate(265, 54)">
          {/* Back part of ring */}
          <ellipse
            cx="0"
            cy="0"
            rx="56"
            ry="18"
            fill="none"
            stroke="url(#saturnRingGrad)"
            strokeWidth="7"
            transform="rotate(-22)"
            opacity="0.95"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="46"
            ry="14"
            fill="none"
            stroke="#fef08a"
            strokeWidth="1.5"
            transform="rotate(-22)"
            opacity="0.8"
          />

          {/* Planet Sphere */}
          <circle cx="0" cy="0" r="24" fill="url(#saturnBodyGrad)" />
          
          {/* Atmosphere shadow on planet sphere */}
          <path
            d="M 0 -24 A 24 24 0 0 1 0 24 A 12 24 0 0 0 0 -24 Z"
            fill="#03040c"
            opacity="0.4"
            transform="rotate(-22)"
          />

          {/* Front part of ring (overlapping front of planet) */}
          <path
            d="M -52 19 A 56 18 0 0 0 52 -19"
            fill="none"
            stroke="url(#saturnRingGrad)"
            strokeWidth="7"
            transform="rotate(-22)"
          />
          <path
            d="M -43 15 A 46 14 0 0 0 43 -15"
            fill="none"
            stroke="#fef08a"
            strokeWidth="1.5"
            transform="rotate(-22)"
            opacity="0.9"
          />
        </g>
      </svg>
    </div>
  );
}
