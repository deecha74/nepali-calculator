'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxMountainBackground() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Majestic parallax depth: distant Himalayan range moves upward slower than foreground scroll
  const y = useTransform(scrollY, [0, 3000], [0, -220]);
  const scale = useTransform(scrollY, [0, 3000], [1.02, 1.12]);
  const opacity = useTransform(scrollY, [0, 1200, 2600], [0.62, 0.48, 0.38]);

  // For detail pages, do not render the mountain image background - keep it pure crisp white
  const isHome = pathname === '/';

  React.useEffect(() => {
    if (!isHome) {
      document.body.classList.add('detail-page');
      document.body.style.backgroundColor = '#ffffff';
    } else {
      document.body.classList.remove('detail-page');
      document.body.style.backgroundColor = 'var(--bg-primary)';
    }
    return () => {
      document.body.classList.remove('detail-page');
    };
  }, [isHome]);

  if (!isHome) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Mountain Range Panorama with Parallax Transform */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-80px',
          left: 0,
          right: 0,
          bottom: '-80px',
          y,
          scale,
          backgroundImage: 'url(/himalayan-mountains-parallax.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat',
          opacity,
          filter: 'contrast(1.08) saturate(1.15)',
          willChange: 'transform',
        }}
      />

      {/* Atmospheric Fog & Contrast Tint Overlay (softens background so white cards pop) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(180deg, 
              rgba(248, 250, 252, 0.38) 0%, 
              rgba(248, 250, 252, 0.58) 25%, 
              rgba(248, 250, 252, 0.78) 55%, 
              rgba(248, 250, 252, 0.92) 100%
            )
          `,
        }}
      />

      {/* Subtle Himalayan Sunrise Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 80% 40% at 50% 0%, rgba(245, 158, 11, 0.08), transparent 75%),
            radial-gradient(ellipse 60% 30% at 95% 30%, rgba(0, 56, 147, 0.05), transparent 70%)
          `,
        }}
      />
    </div>
  );
}
