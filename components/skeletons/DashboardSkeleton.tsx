'use client';

import React from 'react';
import { Skeleton, SkeletonBox } from '@/components/ui/Skeleton';

export function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading homepage...">
      {/* 1. NepalPatroHero Skeleton */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(40px, 5.5vw, 64px) 0 clamp(40px, 5.5vw, 60px)',
          minHeight: '480px',
          backgroundColor: '#0a1526',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '36px',
              alignItems: 'center',
            }}
          >
            {/* Left Heritage Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Skeleton width="180px" height="28px" borderRadius="9999px" variant="blue" />
              <Skeleton width="min(480px, 90vw)" height="48px" borderRadius="10px" variant="blue" />
              <Skeleton width="min(360px, 75vw)" height="20px" borderRadius="6px" variant="blue" />
              <Skeleton width="220px" height="22px" borderRadius="6px" variant="blue" />
              <Skeleton width="min(320px, 70vw)" height="18px" borderRadius="6px" variant="blue" />

              {/* Weather & Event Pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                <Skeleton width="280px" height="38px" borderRadius="9999px" />
                <Skeleton width="340px" height="38px" borderRadius="9999px" />
              </div>
            </div>

            {/* Right Parchment Calendar Card */}
            <div
              style={{
                backgroundColor: '#fdfbf7',
                borderRadius: '20px',
                border: '1.5px solid #d4af37',
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Tab Switcher */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <Skeleton width="130px" height="32px" borderRadius="8px" variant="parchment" />
                <Skeleton width="140px" height="32px" borderRadius="8px" variant="parchment" />
              </div>

              {/* Calendar Days Header */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <SkeletonBox key={i} height="28px" borderRadius="6px" variant="parchment" />
                ))}
              </div>

              {/* 35 Calendar Cells */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
                {Array.from({ length: 35 }).map((_, i) => (
                  <SkeletonBox key={i} height="40px" borderRadius="8px" variant="parchment" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dashain & Upcoming Events Section Skeleton */}
      <section style={{ padding: 'clamp(28px, 4vw, 44px) 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Left Card: Dashain Hub */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '18px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <SkeletonBox height="150px" borderRadius="0px" />
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SkeletonBox key={i} height="80px" borderRadius="8px" />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <Skeleton width="60%" height="40px" borderRadius="10px" />
                  <Skeleton width="40%" height="40px" borderRadius="10px" />
                </div>
              </div>
            </div>

            {/* Right Card: Upcoming Holidays */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '18px',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton width="180px" height="24px" borderRadius="6px" />
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Skeleton width="60px" height="26px" borderRadius="9999px" />
                  <Skeleton width="90px" height="26px" borderRadius="9999px" />
                </div>
              </div>

              {/* 5 Event Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonBox key={i} height="58px" borderRadius="10px" />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                <Skeleton width="60%" height="40px" borderRadius="10px" />
                <Skeleton width="40%" height="40px" borderRadius="10px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Tools Section Skeleton */}
      <section style={{ padding: '0 0 48px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Skeleton width="220px" height="28px" borderRadius="8px" />
            <Skeleton width="90px" height="18px" borderRadius="6px" />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  padding: '18px',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <Skeleton width="44px" height="44px" borderRadius="12px" />
                <div style={{ flex: 1 }}>
                  <Skeleton width="75%" height="16px" borderRadius="4px" style={{ marginBottom: '6px' }} />
                  <Skeleton width="50%" height="12px" borderRadius="4px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardSkeleton;
