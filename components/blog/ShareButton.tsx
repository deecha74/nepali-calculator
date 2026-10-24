'use client';

import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import { ShareModal } from '@/components/blog/ShareModal';
import { useLanguage } from '@/components/LanguageContext';

export interface ShareButtonProps {
  title: string;
  url: string;
  excerpt?: string;
  category?: string;
  variant?: 'pill' | 'button';
}

export function ShareButton({
  title,
  url,
  excerpt,
  category,
  variant = 'pill',
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Share article"
        style={
          variant === 'pill'
            ? {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
                transition: 'all 0.15s ease',
              }
            : {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '10px',
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                color: '#0f172a',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }
        }
      >
        <Share2 size={13} color="#003893" />
        <span>{t('Share', 'सेयर')}</span>
      </button>

      <ShareModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        url={url}
        excerpt={excerpt}
        category={category}
      />
    </>
  );
}
