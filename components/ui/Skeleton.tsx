'use client';

import React from 'react';

export interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  circle?: boolean;
  count?: number;
  baseColor?: string;
  highlightColor?: string;
  inline?: boolean;
  variant?: 'light' | 'dark' | 'blue' | 'parchment';
}

export function Skeleton({
  className = '',
  style,
  width = '100%',
  height = '16px',
  borderRadius = '8px',
  circle = false,
  count = 1,
  baseColor,
  inline = false,
  variant,
}: SkeletonProps) {
  // Determine variant automatically if baseColor is passed
  let resolvedVariant = variant || 'light';
  if (!variant && baseColor) {
    if (baseColor.includes('334155') || baseColor.includes('1e293b') || baseColor.includes('0f172a')) {
      resolvedVariant = 'dark';
    } else if (baseColor.includes('f7f4ed') || baseColor.includes('ede7d8') || baseColor.includes('fdfbf7')) {
      resolvedVariant = 'parchment';
    } else if (baseColor.includes('003893') || baseColor.includes('002266')) {
      resolvedVariant = 'blue';
    }
  }

  const shimmerClass =
    resolvedVariant === 'dark'
      ? 'skeleton-shimmer-dark'
      : resolvedVariant === 'blue'
      ? 'skeleton-shimmer-blue'
      : resolvedVariant === 'parchment'
      ? 'skeleton-shimmer-parchment'
      : 'skeleton-shimmer';

  const w = typeof width === 'number' ? `${width}px` : width;
  const h = typeof height === 'number' ? `${height}px` : height;
  const br = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

  const items = Array.from({ length: count });

  if (count === 1) {
    return (
      <div
        className={`${shimmerClass} ${className}`}
        style={{
          width: circle ? h : w,
          height: h,
          borderRadius: circle ? '50%' : br,
          display: inline ? 'inline-block' : 'block',
          flexShrink: 0,
          ...style,
        }}
        role="status"
        aria-label="Loading..."
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((_, idx) => (
        <div
          key={idx}
          className={`${shimmerClass} ${className}`}
          style={{
            width: circle ? h : w,
            height: h,
            borderRadius: circle ? '50%' : br,
            display: inline ? 'inline-block' : 'block',
            flexShrink: 0,
            ...style,
          }}
          role="status"
          aria-label="Loading..."
        />
      ))}
    </div>
  );
}

export function SkeletonBox({
  width = '100%',
  height = '40px',
  borderRadius = '10px',
  className = '',
  style,
  variant = 'light',
}: {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'light' | 'dark' | 'blue' | 'parchment';
}) {
  const shimmerClass =
    variant === 'dark'
      ? 'skeleton-shimmer-dark'
      : variant === 'blue'
      ? 'skeleton-shimmer-blue'
      : variant === 'parchment'
      ? 'skeleton-shimmer-parchment'
      : 'skeleton-shimmer';

  const w = typeof width === 'number' ? `${width}px` : width;
  const h = typeof height === 'number' ? `${height}px` : height;
  const br = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

  return (
    <div
      className={`${shimmerClass} ${className}`}
      style={{
        width: w,
        height: h,
        borderRadius: br,
        flexShrink: 0,
        ...style,
      }}
      role="status"
      aria-label="Loading content..."
    />
  );
}

export default Skeleton;
