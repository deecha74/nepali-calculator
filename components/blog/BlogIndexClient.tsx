'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Share2,
  ArrowRight,
  BookOpen,
  ReceiptText,
  Landmark,
  Coins,
  Compass,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '@/lib/blog/posts';
import { useLanguage } from '@/components/LanguageContext';
import { ShareModal } from '@/components/blog/ShareModal';

export function BlogIndexClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSharePost, setActiveSharePost] = useState<BlogPost | null>(null);
  const { language, t } = useLanguage();

  const handleOpenShare = (e: React.MouseEvent, post: BlogPost) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSharePost(post);
  };

  const categories = [
    { key: 'All', en: 'All', ne: 'सबै' },
    { key: 'Tax & Law', en: 'Tax & Law', ne: 'कर तथा ऐन' },
    { key: 'Banking & Loans', en: 'Banking & Loans', ne: 'बैंकिङ तथा ऋण' },
    { key: 'Gold & Wealth', en: 'Gold & Wealth', ne: 'सुन, चाँदी र सम्पत्ति' },
    { key: 'Land & Real Estate', en: 'Land & Real Estate', ne: 'जग्गा तथा नापी' },
    { key: 'Citizen Services', en: 'Citizen Services', ne: 'नागरिक सेवा' },
    { key: 'Utilities & Daily', en: 'Utilities & Daily', ne: 'दैनिक तथा युटिलिटी' },
  ];

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.titleNep.includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getCategoryConfig = (cat: string) => {
    switch (cat) {
      case 'Tax & Law':
        return {
          gradient: 'linear-gradient(135deg, #881337 0%, #be123c 45%, #f43f5e 100%)',
          accentColor: '#be123c',
          borderAccent: '#e11d48',
          tagBg: '#ffe4e6',
          tagText: '#9f1239',
          Icon: ReceiptText,
          labelNe: 'कर तथा ऐन नियम',
        };
      case 'Banking & Loans':
        return {
          gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%)',
          accentColor: '#1e40af',
          borderAccent: '#2563eb',
          tagBg: '#dbeafe',
          tagText: '#1e40af',
          Icon: Landmark,
          labelNe: 'बैंकिङ तथा ऋण',
        };
      case 'Gold & Wealth':
        return {
          gradient: 'linear-gradient(135deg, #78350f 0%, #b45309 45%, #d97706 80%, #f59e0b 100%)',
          accentColor: '#b45309',
          borderAccent: '#d97706',
          tagBg: '#fef3c7',
          tagText: '#92400e',
          Icon: Coins,
          labelNe: 'सुन, चाँदी र सम्पत्ति',
        };
      case 'Land & Real Estate':
        return {
          gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)',
          accentColor: '#047857',
          borderAccent: '#10b981',
          tagBg: '#d1fae5',
          tagText: '#065f46',
          Icon: Compass,
          labelNe: 'जग्गा तथा नापी',
        };
      case 'Citizen Services':
        return {
          gradient: 'linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)',
          accentColor: '#4338ca',
          borderAccent: '#6366f1',
          tagBg: '#e0e7ff',
          tagText: '#3730a3',
          Icon: ShieldCheck,
          labelNe: 'नागरिक सेवा',
        };
      case 'Utilities & Daily':
        return {
          gradient: 'linear-gradient(135deg, #0f172a 0%, #0e7490 55%, #06b6d4 100%)',
          accentColor: '#0e7490',
          borderAccent: '#06b6d4',
          tagBg: '#cffafe',
          tagText: '#155e75',
          Icon: Zap,
          labelNe: 'दैनिक तथा युटिलिटी',
        };
      default:
        return {
          gradient: 'linear-gradient(135deg, #003893 0%, #2563eb 100%)',
          accentColor: '#003893',
          borderAccent: '#003893',
          tagBg: '#e0f2fe',
          tagText: '#0369a1',
          Icon: BookOpen,
          labelNe: 'निर्देशिका',
        };
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Blog Hub Hero */}
      <section
        style={{
          background: 'radial-gradient(circle at 50% 0%, #f0f7ff 0%, #ffffff 80%)',
          padding: 'clamp(40px, 5.5vw, 68px) 20px 40px',
          borderBottom: '1px solid #e2e8f0',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '840px', margin: '0 auto' }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', backgroundColor: '#e0f2fe', border: '1px solid #bae6fd', color: '#003893', fontSize: '12px', fontWeight: 800, marginBottom: '16px' }}>
            <BookOpen size={14} />
            <span>{t('Nepali Calc Learning & Knowledge Hub', 'नेपाली क्याल्क ज्ञान तथा निर्देशिका पोर्टल')}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em', lineHeight: 1.25, marginBottom: '14px' }}>
            {t('Official Calculator Guides & Financial Rules of Nepal', 'नेपालका आधिकारिक क्यालकुलेटर निर्देशिका र वित्तीय नियमहरू')}
          </h1>



          {/* Search Bar */}
          <div style={{ maxWidth: '540px', margin: '0 auto', position: 'relative' }}>
            <Search size={18} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder={t('Search guides (e.g., Tax 2083, Gold Jarti, Ropani, Bluebook...)', 'लेख तथा निर्देशिका खोज्नुहोस् (आयकर, सुन, जग्गा, ब्लुबुक...)')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 18px 14px 46px',
                fontSize: '14.5px',
                borderRadius: '16px',
                border: '1.5px solid #cbd5e1',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
                outline: 'none',
                color: '#0f172a',
                fontFamily: 'var(--font-sans)',
              }}
            />
          </div>

        </div>
      </section>

      {/* Category Pills Filter Bar */}
      <section style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', backgroundColor: '#fafafa', position: 'sticky', top: '70px', zIndex: 10 }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              const label = language === 'ne' ? cat.ne : cat.en;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    border: '1.5px solid',
                    borderColor: isActive ? '#003893' : '#e2e8f0',
                    backgroundColor: isActive ? '#003893' : '#ffffff',
                    color: isActive ? '#ffffff' : '#475569',
                    boxShadow: isActive ? '0 3px 12px rgba(0, 56, 147, 0.25)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ padding: '44px 20px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>

          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
              <p style={{ fontSize: '16px', fontWeight: 700 }}>{t('No articles match your search criteria.', 'खोजिएका कुनै पनि लेखहरू भेटिएनन्।')}</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                style={{ marginTop: '12px', padding: '8px 18px', backgroundColor: '#003893', color: '#ffffff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700 }}
              >
                {t('Reset Filters', 'सबै देखाउनुहोस्')}
              </button>
            </div>
          ) : (
            <div className="blog-articles-grid">
              {filteredPosts.map((post) => {
                const config = getCategoryConfig(post.category);
                const WatermarkIcon = config.Icon;

                return (
                  <article key={post.slug} className="blog-guide-card">
                    {/* Catchy Gradient Visual Banner */}
                    <div
                      className="blog-card-header"
                      style={{ background: config.gradient }}
                    >
                      <div className="blog-card-pattern" />

                      {/* Watermarked Icon */}
                      <WatermarkIcon size={96} className="blog-card-watermark-icon" />

                      {/* Glassmorphic Category Badge */}
                      <div className="blog-card-badge">
                        <WatermarkIcon size={13} />
                        <span>{language === 'ne' ? config.labelNe : post.category}</span>
                      </div>

                      {/* Glassmorphic Share Button Pill */}
                      <button
                        type="button"
                        onClick={(e) => handleOpenShare(e, post)}
                        className="blog-card-share-btn"
                        title={t('Share this guide', 'यो निर्देशिका सेयर गर्नुहोस्')}
                        aria-label="Share guide"
                      >
                        <Share2 size={12} />
                        <span>{t('Share', 'सेयर')}</span>
                      </button>
                    </div>

                    {/* Card Content Body strictly in selected language */}
                    <div className="blog-card-body">
                      {/* Title */}
                      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                        <h2 className="blog-card-title">
                          {language === 'ne' ? post.titleNep : post.title}
                        </h2>
                      </Link>

                      {/* Excerpt */}
                      <p className="blog-card-excerpt">
                        {language === 'ne' ? post.excerptNep : post.excerpt}
                      </p>
                    </div>

                    {/* Footer with Read Action */}
                    <div className="blog-card-footer" style={{ justifyContent: 'flex-end' }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="blog-card-read-link"
                        style={{ color: config.accentColor }}
                      >
                        <span style={{ fontWeight: 800 }}>{t('Read Full Guide', 'विस्तृत पढ्नुहोस्')}</span>
                        <div
                          className="blog-read-arrow-circle"
                          style={{
                            backgroundColor: `${config.accentColor}15`,
                            color: config.accentColor
                          }}
                        >
                          <ArrowRight size={13} />
                        </div>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Reusable Share Modal */}
      {activeSharePost && (
        <ShareModal
          isOpen={!!activeSharePost}
          onClose={() => setActiveSharePost(null)}
          title={language === 'ne' ? activeSharePost.titleNep : activeSharePost.title}
          url={typeof window !== 'undefined' ? `${window.location.origin}/blog/${activeSharePost.slug}` : `https://nepalicalc.com/blog/${activeSharePost.slug}`}
          excerpt={language === 'ne' ? activeSharePost.excerptNep : activeSharePost.excerpt}
          category={activeSharePost.category}
        />
      )}

    </div>
  );
}

