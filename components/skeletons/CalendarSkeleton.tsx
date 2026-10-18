'use client';

import React from 'react';
import { Skeleton, SkeletonBox } from '@/components/ui/Skeleton';

export function CalendarSkeleton() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '28px 0 48px' }} role="status" aria-label="Loading calendar...">
      <div className="container">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '10px 0 60px' }}>
          <div className="calendar-main-grid">
            {/* Left Column: Calendar Grid Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                padding: 'clamp(16px, 2.5vw, 24px)',
                position: 'relative',
                minWidth: 0,
                width: '100%',
                overflow: 'hidden',
              }}
            >
              {/* Calendar Top Header: Month title + Today button + Prev/Next */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <Skeleton width="190px" height="34px" borderRadius="8px" />
                  <Skeleton width="130px" height="18px" borderRadius="6px" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Skeleton width="64px" height="34px" borderRadius="9999px" />
                  <Skeleton width="36px" height="36px" borderRadius="50%" />
                  <Skeleton width="36px" height="36px" borderRadius="50%" />
                </div>
              </div>

              {/* 7 Days of Week Header */}
              <div className="calendar-cell-grid" style={{ marginBottom: '10px' }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <SkeletonBox key={i} height="32px" borderRadius="8px" />
                ))}
              </div>

              {/* 35 Calendar Day Cells */}
              <div className="calendar-cell-grid">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: '84px',
                      borderRadius: '12px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #f1f5f9',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Skeleton width="22px" height="18px" borderRadius="4px" />
                      <Skeleton width="16px" height="12px" borderRadius="4px" />
                    </div>
                    <Skeleton width="80%" height="11px" borderRadius="4px" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 350px Sidebar Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              {/* Active Day Header */}
              <div>
                <Skeleton width="120px" height="14px" borderRadius="4px" style={{ marginBottom: '8px' }} />
                <Skeleton width="180px" height="32px" borderRadius="8px" style={{ marginBottom: '8px' }} />
                <Skeleton width="140px" height="16px" borderRadius="4px" />
              </div>

              {/* Sunrise / Sunset Box */}
              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fef3c7',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Skeleton width="90px" height="16px" borderRadius="4px" />
                <Skeleton width="90px" height="16px" borderRadius="4px" />
              </div>

              {/* Tithi & Panchanga details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Skeleton width="100%" height="20px" borderRadius="6px" />
                <Skeleton width="100%" height="20px" borderRadius="6px" />
                <Skeleton width="85%" height="20px" borderRadius="6px" />
                <Skeleton width="90%" height="20px" borderRadius="6px" />
              </div>

              {/* Auspicious Muhurat Card */}
              <SkeletonBox height="110px" borderRadius="14px" />

              {/* Action Buttons */}
              <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                <Skeleton width="100%" height="40px" borderRadius="10px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarSkeleton;
