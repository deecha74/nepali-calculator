'use client';

import React from 'react';
import { Skeleton, SkeletonBox } from '@/components/ui/Skeleton';

export function CalculatorSkeleton() {
  return (
    <div
      className="calculator-page-container"
      role="status"
      aria-label="Loading calculator..."
    >
      {/* Real Calculator Header bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '20px',
        }}
      >
        <div>
          {/* 2 Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Skeleton width="180px" height="24px" borderRadius="9999px" />
            <Skeleton width="150px" height="24px" borderRadius="9999px" />
          </div>
          {/* Title */}
          <Skeleton width="min(460px, 85vw)" height="36px" borderRadius="10px" style={{ marginBottom: '8px' }} />
          {/* Subtitle */}
          <Skeleton width="min(620px, 95vw)" height="18px" borderRadius="6px" />
        </div>

        {/* Fiscal Year Selector / Filter Skeleton */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Skeleton width="80px" height="18px" borderRadius="6px" />
          <Skeleton width="140px" height="38px" borderRadius="8px" />
        </div>
      </div>

      {/* Real Calculator 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Segmented Assessment Selector */}
          <div>
            <Skeleton width="150px" height="15px" borderRadius="4px" style={{ marginBottom: '8px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <SkeletonBox height="44px" borderRadius="10px" />
              <SkeletonBox height="44px" borderRadius="10px" />
            </div>
          </div>

          {/* Salary / Primary Input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Skeleton width="180px" height="15px" borderRadius="4px" />
              <div style={{ display: 'flex', gap: '4px' }}>
                <Skeleton width="60px" height="28px" borderRadius="6px" />
                <Skeleton width="60px" height="28px" borderRadius="6px" />
              </div>
            </div>
            <SkeletonBox height="50px" borderRadius="12px" />
          </div>

          {/* Input 2 */}
          <div>
            <Skeleton width="160px" height="15px" borderRadius="4px" style={{ marginBottom: '8px' }} />
            <SkeletonBox height="50px" borderRadius="12px" />
          </div>

          {/* Input 3 */}
          <div>
            <Skeleton width="200px" height="15px" borderRadius="4px" style={{ marginBottom: '8px' }} />
            <SkeletonBox height="50px" borderRadius="12px" />
          </div>

          {/* Deductions / Options Card */}
          <div
            style={{
              padding: '16px 18px',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: '14px',
              backgroundColor: '#f8fafc',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Skeleton width="180px" height="18px" borderRadius="6px" />
              <Skeleton width="24px" height="24px" borderRadius="6px" />
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main Dark Results Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #002266 0%, #003893 50%, #002266 100%)',
              borderRadius: '24px',
              padding: '28px',
              color: '#ffffff',
              boxShadow: '0 12px 30px -4px rgba(0, 56, 147, 0.25)',
            }}
          >
            <Skeleton width="140px" height="14px" borderRadius="4px" variant="blue" style={{ marginBottom: '12px' }} />
            <Skeleton width="65%" height="48px" borderRadius="10px" variant="blue" style={{ marginBottom: '10px' }} />
            <Skeleton width="180px" height="14px" borderRadius="4px" variant="blue" style={{ marginBottom: '24px' }} />

            {/* Sub-rows */}
            <div
              style={{
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton width="110px" height="14px" borderRadius="4px" variant="blue" />
                <Skeleton width="90px" height="14px" borderRadius="4px" variant="blue" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton width="130px" height="14px" borderRadius="4px" variant="blue" />
                <Skeleton width="80px" height="14px" borderRadius="4px" variant="blue" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton width="100px" height="14px" borderRadius="4px" variant="blue" />
                <Skeleton width="70px" height="14px" borderRadius="4px" variant="blue" />
              </div>
            </div>
          </div>

          {/* Quick Tip Pill */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#eff6ff',
              borderRadius: '16px',
              border: '1.5px solid #bfdbfe',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <Skeleton width="36px" height="36px" borderRadius="50%" />
            <div style={{ flex: 1 }}>
              <Skeleton width="80%" height="14px" borderRadius="4px" style={{ marginBottom: '6px' }} />
              <Skeleton width="50%" height="12px" borderRadius="4px" />
            </div>
          </div>
        </div>
      </div>

      {/* Ad Banner Placeholder Skeleton */}
      <div style={{ margin: '36px auto 0', maxWidth: '970px', width: '100%' }}>
        <SkeletonBox height="90px" borderRadius="12px" />
      </div>

      {/* FAQ Accordion Skeleton */}
      <div style={{ maxWidth: '900px', margin: '48px auto 0' }}>
        <Skeleton width="220px" height="28px" borderRadius="8px" style={{ marginBottom: '20px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SkeletonBox height="56px" borderRadius="12px" />
          <SkeletonBox height="56px" borderRadius="12px" />
          <SkeletonBox height="56px" borderRadius="12px" />
        </div>
      </div>
    </div>
  );
}

export default CalculatorSkeleton;
