'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

interface BlogStickyToolCtaProps {
  toolTitle: string;
  toolHref: string;
  category?: string;
}

export function BlogStickyToolCta({ toolTitle, toolHref, category }: BlogStickyToolCtaProps) {
  const { language, t } = useLanguage();
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const topAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!topAnchorRef.current) return;
      const rect = topAnchorRef.current.getBoundingClientRect();
      
      // When the top inline card has scrolled above the viewport (e.g. -20px)
      const scrolledPast = rect.bottom < 50;
      setIsScrolledPast(scrolledPast);

      // Check if we are near the end of the article (Related Guides / Footer)
      const relatedSection = document.getElementById('related-guides');
      if (relatedSection) {
        const relatedRect = relatedSection.getBoundingClientRect();
        // If related guides section is approaching the bottom of the viewport
        setIsNearFooter(relatedRect.top < window.innerHeight - 40);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (dismissed) {
    return (
      <div ref={topAnchorRef} style={{ marginBottom: '28px' }}>
        {/* Render standard compact static card if dismissed from sticky */}
        <div className="blog-tool-cta-compact">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <div className="blog-tool-cta-icon-box">
              <Calculator size={16} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span className="blog-tool-cta-title">{toolTitle}</span>
                <span className="blog-tool-cta-badge">{t('Free • FY 2083/84', 'निःशुल्क • २०८३/८४')}</span>
              </div>
            </div>
          </div>
          <Link href={toolHref} className="blog-tool-cta-btn">
            <span>{t('Launch Calculator', 'क्याल्कुलेटर खोल्नुहोस्')}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    );
  }

  // Active state: whether it should be floating at the bottom (scrolled past top & not at footer)
  const isFloating = isScrolledPast && !isNearFooter;

  return (
    <>
      {/* Top Anchor & In-Flow Compact Card */}
      <div ref={topAnchorRef} style={{ marginBottom: '28px' }}>
        <div 
          className="blog-tool-cta-compact"
          style={{
            visibility: isFloating ? 'hidden' : 'visible',
            height: isFloating ? '54px' : 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
            <div className="blog-tool-cta-icon-box">
              <Calculator size={16} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="blog-tool-cta-title">{toolTitle}</span>
                <span className="blog-tool-cta-badge">{t('Free Tool • FY 2083/84', 'निःशुल्क • आ.व. २०८३/८४')}</span>
              </div>
            </div>
          </div>

          <Link href={toolHref} className="blog-tool-cta-btn">
            <span>{t('Launch Calculator', 'क्याल्कुलेटर खोल्नुहोस्')}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Floating Bottom Sticky Bar on Scroll with Less Height Card */}
      {isFloating && (
        <aside
          aria-label="Interactive Calculator Shortcut"
          className="blog-tool-sticky-bottom"
          style={{
            position: 'fixed',
            bottom: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(820px, calc(100% - 32px))',
            zIndex: 90,
            animation: 'slideUpSticky 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <div className="blog-tool-cta-compact is-sticky-capsule">
            {/* Left Content */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
              <div className="blog-tool-cta-icon-box pulse-glow">
                <Calculator size={15} />
              </div>
              
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="blog-tool-cta-title truncate-text">{toolTitle}</span>
                  <span className="blog-tool-cta-badge hide-mobile">{t('Free Tool', 'निःशुल्क')}</span>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <Link href={toolHref} className="blog-tool-cta-btn">
                <span>{t('Launch', 'खोल्नुहोस्')}</span>
                <ArrowRight size={12} />
              </Link>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="blog-tool-cta-dismiss-btn"
                title={t('Close bar', 'बन्द गर्नुहोस्')}
                aria-label="Dismiss sticky calculator bar"
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
