'use client';

import React from 'react';
import { Skeleton, SkeletonBox } from '@/components/ui/Skeleton';

export function RashifalSkeleton() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }} role="status" aria-label="Loading horoscope...">
      {/* Top Banner Skeleton */}
      <section
        style={{
          backgroundColor: '#f7f4ed',
          borderBottom: '1.5px solid #ebe5d8',
          padding: 'clamp(32px, 4vw, 48px) 0 36px',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Skeleton width="220px" height="26px" borderRadius="9999px" variant="parchment" style={{ marginBottom: '14px' }} />
            <Skeleton width="min(440px, 85vw)" height="40px" borderRadius="10px" variant="parchment" style={{ marginBottom: '10px' }} />
            <Skeleton width="min(600px, 95vw)" height="18px" borderRadius="6px" variant="parchment" style={{ marginBottom: '20px' }} />

            {/* 13 Rashi Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
              {Array.from({ length: 13 }).map((_, i) => (
                <Skeleton key={i} width={i === 0 ? '90px' : '78px'} height="30px" borderRadius="4px" variant="parchment" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
        {/* Search Bar */}
        <div style={{ maxWidth: '540px', margin: '0 auto 32px' }}>
          <SkeletonBox height="46px" borderRadius="10px" />
        </div>

        {/* 12 Zodiac Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Header: Icon + Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Skeleton width="48px" height="48px" borderRadius="12px" />
                <div style={{ flex: 1 }}>
                  <Skeleton width="60%" height="20px" borderRadius="4px" style={{ marginBottom: '6px' }} />
                  <Skeleton width="45%" height="13px" borderRadius="4px" />
                </div>
              </div>

              {/* Tags: Lucky Color & Number */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
                <Skeleton width="80px" height="22px" borderRadius="6px" />
                <Skeleton width="60px" height="22px" borderRadius="6px" />
              </div>

              {/* Prediction Text Lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '4px 0' }}>
                <Skeleton width="100%" height="13px" borderRadius="3px" />
                <Skeleton width="95%" height="13px" borderRadius="3px" />
                <Skeleton width="80%" height="13px" borderRadius="3px" />
              </div>

              {/* Bottom Card Footer */}
              <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton width="70px" height="14px" borderRadius="4px" />
                <Skeleton width="28px" height="28px" borderRadius="6px" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RashifalSkeleton;
