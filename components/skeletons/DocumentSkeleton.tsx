'use client';

import React from 'react';
import { Skeleton, SkeletonBox } from '@/components/ui/Skeleton';

export function DocumentSkeleton() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '20px' }} role="status" aria-label="Loading document library...">
      <div className="container" style={{ paddingBottom: '80px' }}>
        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '24px',
            paddingBottom: '20px',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Skeleton width="190px" height="24px" borderRadius="9999px" />
            </div>
            <Skeleton width="min(480px, 85vw)" height="32px" borderRadius="8px" style={{ marginBottom: '8px' }} />
            <Skeleton width="min(640px, 95vw)" height="18px" borderRadius="6px" />
          </div>

          {/* Saved Documents Button */}
          <Skeleton width="180px" height="38px" borderRadius="9999px" />
        </div>

        {/* Search & Category Filter Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
          <SkeletonBox height="50px" borderRadius="12px" />
          <div style={{ display: 'flex', gap: '8px', overflowX: 'hidden' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} width={i === 0 ? '140px' : '120px'} height="36px" borderRadius="9999px" />
            ))}
          </div>
        </div>

        {/* Document Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '20px',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                padding: '22px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton width="120px" height="22px" borderRadius="6px" />
                <Skeleton width="70px" height="20px" borderRadius="9999px" />
              </div>
              <Skeleton width="90%" height="22px" borderRadius="6px" />
              <Skeleton width="70%" height="16px" borderRadius="4px" />
              <Skeleton width="100%" height="14px" borderRadius="4px" />
              <Skeleton width="85%" height="14px" borderRadius="4px" />
              <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid #f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton width="90px" height="14px" borderRadius="4px" />
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Skeleton width="80px" height="34px" borderRadius="8px" />
                  <Skeleton width="80px" height="34px" borderRadius="8px" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocumentSkeleton;
