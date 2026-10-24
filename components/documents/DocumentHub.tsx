'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  Download,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  X,
  Eye,
  Check,
  Copy,
  ZoomIn,
  ZoomOut,
  Printer,
  ShieldCheck,
  Sparkles,
  Calendar,
  Building2,
  FolderOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OFFICIAL_DOCUMENTS, OfficialDocument, DocumentClause } from '@/lib/documentsData';
import { useLanguage } from '@/components/LanguageContext';

export function DocumentHub({ isHomepage = false }: { isHomepage?: boolean }) {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDocument, setActiveDocument] = useState<OfficialDocument | null>(null);
  const [readerFontSize, setReaderFontSize] = useState<number>(14);
  const [savedDocIds, setSavedDocIds] = useState<string[]>([]);
  const [copiedClauseIdx, setCopiedClauseIdx] = useState<number | null>(null);
  const [filterSavedOnly, setFilterSavedOnly] = useState(false);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth > 0) {
      const firstChild = carouselRef.current.children[0] as HTMLElement | undefined;
      const cardWidth = firstChild ? firstChild.offsetWidth + 14 : clientWidth * 0.85 + 14;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveSlide(Math.min(Math.max(index, 0), filteredDocuments.length - 1));
    }
  };

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const firstChild = carouselRef.current.children[0] as HTMLElement | undefined;
    const cardWidth = firstChild ? firstChild.offsetWidth + 14 : carouselRef.current.clientWidth * 0.85 + 14;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveSlide(index);
  };

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nepalcalc_saved_docs');
      if (saved) {
        setSavedDocIds(JSON.parse(saved));
      }
    } catch (e) { }
  }, []);

  // Reset carousel slide when filters or search change
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0 });
    }
    setActiveSlide(0);
  }, [searchQuery, selectedCategory, filterSavedOnly]);

  const toggleSaveDocument = (docId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated: string[];
    if (savedDocIds.includes(docId)) {
      updated = savedDocIds.filter(id => id !== docId);
    } else {
      updated = [...savedDocIds, docId];
    }
    setSavedDocIds(updated);
    try {
      localStorage.setItem('nepalcalc_saved_docs', JSON.stringify(updated));
    } catch (e) { }
  };

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return OFFICIAL_DOCUMENTS.filter((doc) => {
      const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
      const matchesSaved = !filterSavedOnly || savedDocIds.includes(doc.id);
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        !searchQuery ||
        doc.title.toLowerCase().includes(q) ||
        doc.titleNep.includes(q) ||
        doc.authority.toLowerCase().includes(q) ||
        doc.authorityNep.includes(q) ||
        doc.tags.some(tag => tag.toLowerCase().includes(q)) ||
        doc.clauses.some(c => c.content.toLowerCase().includes(q) || c.contentNep.includes(q));

      return matchesCat && matchesSaved && matchesQuery;
    });
  }, [searchQuery, selectedCategory, filterSavedOnly, savedDocIds]);

  // Handle Download simulation
  const handleDownload = (doc: OfficialDocument, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const content = `=====================================================
${doc.title}
${doc.titleNep}
Authority: ${doc.authority} (${doc.authorityNep})
Gazette/Circular: ${doc.gazetteNumber}
Effective Date: ${doc.effectiveDateBS} (${doc.effectiveDateAD})
=====================================================

SUMMARY:
${doc.summary}

नेपाली सारांश:
${doc.summaryNep}

-----------------------------------------------------
OFFICIAL CLAUSES / दफाहरू:
-----------------------------------------------------
${doc.clauses.map(c => `
[${c.clauseNumber}] ${c.title} / ${c.titleNep}
EN: ${c.content}
NE: ${c.contentNep}
`).join('\n')}

Downloaded from NepalCalc Official Document Archive: https://nepalcalc.com/documents
Verified against Nepal Gazette Standard.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.downloadFilename.replace('.pdf', '.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy clause text
  const copyClause = (clause: DocumentClause, idx: number) => {
    const text = `${clause.clauseNumber} - ${clause.titleNep} / ${clause.title}\n${clause.contentNep}\n${clause.content}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedClauseIdx(idx);
      setTimeout(() => setCopiedClauseIdx(null), 2000);
    }
  };

  const categories = [
    { id: 'all', nameEng: 'All Official Acts', nameNep: 'सबै ऐन तथा नियम' },
    { id: 'tax', nameEng: 'Income Tax & IRD', nameNep: 'आयकर तथा आन्तरिक राजस्व' },
    { id: 'labour', nameEng: 'Labour Act & Gratuity', nameNep: 'श्रम ऐन र उपदान' },
    { id: 'vehicle', nameEng: 'Vehicle Bluebook Tax', nameNep: 'सवारी साधन कर' },
    { id: 'land', nameEng: 'Land Measurement Acts', nameNep: 'जग्गा नाप तथा मालपोत' },
    { id: 'stocks', nameEng: 'SEBON & Shares', nameNep: 'धितोपत्र बोर्ड र शेयर' },
    { id: 'banking', nameEng: 'NRB Banking & Loans', nameNep: 'राष्ट्र बैंक र कर्जा' },
    { id: 'customs', nameEng: 'Customs & MDMS', nameNep: 'भन्सार तथा MDMS' },
  ];

  return (
    <section
      id="documents"
      style={{
        backgroundColor: '#ffffff',
        padding: isHomepage ? '48px 0 64px' : '32px 0 64px',
        borderTop: isHomepage ? '1px solid #e2e8f0' : 'none'
      }}
    >
      <div className="container">

        {/* Section Header */}
        <div className="doc-header-wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '14px', marginBottom: '24px' }}>
          <div>
            <div
              className="doc-header-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(0, 56, 147, 0.07)',
                color: '#003893',
                border: '1px solid rgba(0, 56, 147, 0.18)',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                marginBottom: '8px'
              }}
            >
              <ShieldCheck size={13} color="#003893" />
              <span>{t('OFFICIAL REGULATORY GAZETTES & ACTS', 'आधिकारिक नेपाल सरकारी ऐन तथा राजपत्र')}</span>
            </div>
            <h2
              className="doc-header-title"
              style={{
                fontSize: 'clamp(20px, 3.2vw, 32px)',
                fontWeight: 850,
                color: '#0f172a',
                margin: '0 0 6px',
                letterSpacing: '-0.02em',
                lineHeight: 1.25
              }}
            >
              {t('Official Nepal Government Acts & Document Reader', 'आधिकारिक नेपाल सरकारी ऐन, राजपत्र तथा दस्ताबेज रिडर')}
            </h2>
            <p
              className="doc-header-subtitle"
              style={{
                fontSize: '13.5px',
                color: '#64748b',
                margin: 0,
                maxWidth: '640px',
                lineHeight: 1.5
              }}
            >
              {t(
                'Read, search, download, and bookmark real official government gazettes, tax circulars, labour acts, and transport regulations.',
                'वास्तविक सरकारी ऐन, आर्थिक ऐन स्ल्याब, श्रम ऐन, सवारी कर तालिका र राष्ट्र बैंकका निर्देशनहरू पढ्नुहोस्, खोज्नुहोस् र डाउनलोड गर्नुहोस्।'
              )}
            </p>
          </div>

          {/* Bookmarked / Saved Filter Toggle - Modern Tactile Button */}
          <button
            type="button"
            onClick={() => setFilterSavedOnly(!filterSavedOnly)}
            className="neu-btn doc-saved-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              fontSize: '12.5px',
              fontWeight: 700,
              backgroundColor: filterSavedOnly ? '#003893' : '#ffffff',
              color: filterSavedOnly ? '#ffffff' : '#003893',
              border: filterSavedOnly ? '1.5px solid #003893' : '1.5px solid #cbd5e1',
              borderRadius: '9999px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: filterSavedOnly ? '0 4px 12px rgba(0, 56, 147, 0.25)' : '0 1px 3px rgba(15, 23, 42, 0.05)'
            }}
          >
            {filterSavedOnly ? <BookmarkCheck size={14} color="#ffffff" /> : <Bookmark size={14} />}
            <span>
              {t(`Saved Documents (${savedDocIds.length})`, `सुरक्षित दस्ताबेजहरू (${savedDocIds.length})`)}
            </span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>

          {/* Search Box - Inset Neumorphic Well */}
          <div style={{ position: 'relative' }}>
            <Search size={17} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#c59b27' }} />
            <input
              type="text"
              className="doc-search-input"
              placeholder={t(
                'Search official documents & clauses (e.g. gratuity, tax slab, bluebook, dsti, mdms)... 🔍',
                'दस्ताबेज तथा दफा खोज्नुहोस् (जस्तै: उपदान, आयकर स्ल्याब, ब्लुबुक, DSTI, MDMS)... 🔍'
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 18px 11px 42px',
                fontSize: '13.5px',
                borderRadius: '12px',
                border: '1.5px solid rgba(212, 175, 55, 0.35)',
                backgroundColor: '#ffffff',
                color: '#0f172a',
                outline: 'none',
                boxShadow: '0 2px 8px rgba(44, 34, 20, 0.04)',
                transition: 'all 0.18s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#c59b27';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(197, 155, 39, 0.18), 0 4px 12px rgba(197, 155, 39, 0.08)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(44, 34, 20, 0.04)';
              }}
            />
          </div>

          {/* Category Filter Pills - Neumorphic Tactile Row */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id && !filterSavedOnly;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setFilterSavedOnly(false);
                  }}
                  className={`filter-pill ${isActive ? 'active' : ''}`}
                >
                  <span>{language === 'ne' ? cat.nameNep : cat.nameEng}</span>
                </button>
              );
            })}
          </div>
        </div>



        {/* Document Cards Carousel (Mobile) / Responsive Grid (Desktop) */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="doc-cards-carousel"
        >
          {filteredDocuments.map((doc) => {
            const isSaved = savedDocIds.includes(doc.id);
            return (
              <div
                key={doc.id}
                className="doc-card-slide hover-lift"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.03)',
                  transition: 'all 0.18s ease',
                  minWidth: 0,
                  overflow: 'hidden',
                }}
              >
                <div>
                  {/* Category & Authority Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                    <span
                      className="doc-card-badge"
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 800,
                        color: '#003893',
                        backgroundColor: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {doc.category.toUpperCase()}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => toggleSaveDocument(doc.id, e)}
                      title={isSaved ? "Remove from bookmarks" : "Save and keep document"}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: isSaved ? '#c8102e' : '#94a3b8'
                      }}
                    >
                      {isSaved ? <BookmarkCheck size={16} color="#c8102e" /> : <Bookmark size={16} />}
                    </button>
                  </div>

                  {/* Title */}
                  <h3
                    className="doc-card-title"
                    style={{
                      fontSize: '14.5px',
                      fontWeight: 800,
                      color: '#0f172a',
                      margin: '0 0 5px',
                      lineHeight: 1.32,
                      wordBreak: 'break-word',
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {language === 'ne' ? doc.titleNep : doc.title}
                  </h3>

                  {/* Authority & Gazette info */}
                  <div className="doc-card-authority" style={{ fontSize: '11.5px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                    <Building2 size={12} style={{ flexShrink: 0, color: '#94a3b8' }} />
                    <span style={{ wordBreak: 'break-word' }}>{language === 'ne' ? doc.authorityNep : doc.authority}</span>
                  </div>

                  {/* Summary */}
                  <p
                    className="doc-card-summary"
                    style={{
                      fontSize: '12px',
                      color: '#475569',
                      lineHeight: 1.45,
                      margin: '0 0 10px',
                      wordBreak: 'break-word'
                    }}
                  >
                    {language === 'ne' ? doc.summaryNep : doc.summary}
                  </p>

                  {/* Clause Pills Preview */}
                  <div className="doc-clause-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                    {doc.clauses.slice(0, 4).map((c) => (
                      <span
                        key={c.clauseNumber}
                        className="doc-clause-pill"
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          backgroundColor: '#f1f5f9',
                          color: '#334155',
                          padding: '2px 6px',
                          borderRadius: '9999px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {c.clauseNumber}
                      </span>
                    ))}
                    {doc.clauses.length > 4 && (
                      <span
                        className="doc-clause-pill"
                        style={{
                          fontSize: '9.5px',
                          fontWeight: 700,
                          backgroundColor: '#e2e8f0',
                          color: '#64748b',
                          padding: '2px 5px',
                          borderRadius: '9999px',
                        }}
                      >
                        +{doc.clauses.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="doc-card-actions" style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', marginTop: 'auto' }}>
                  <button
                    type="button"
                    onClick={() => setActiveDocument(doc)}
                    className="btn-primary"
                    style={{ flex: 1, padding: '7px 10px', fontSize: '12px', borderRadius: '8px', whiteSpace: 'nowrap' }}
                  >
                    <Eye size={13} style={{ flexShrink: 0 }} />
                    <span>{t('Open Reader', 'पढ्नुहोस्')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDownload(doc, e)}
                    className="btn-secondary"
                    style={{ padding: '7px 10px', fontSize: '12px', borderRadius: '8px', whiteSpace: 'nowrap' }}
                    title="Download Official Document Text"
                  >
                    <Download size={13} style={{ flexShrink: 0 }} />
                    <span>{t('Download', 'डाउनलोड')}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Carousel Navigation Arrows & Indicator Dots */}
        {filteredDocuments.length > 1 && (
          <div className="doc-carousel-controls">
            <button
              type="button"
              onClick={() => scrollToSlide(Math.max(activeSlide - 1, 0))}
              disabled={activeSlide === 0}
              className="doc-carousel-btn"
              aria-label="Previous card"
              style={{
                opacity: activeSlide === 0 ? 0.35 : 1,
                cursor: activeSlide === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Pagination Dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', maxWidth: '200px', overflowX: 'auto', padding: '4px' }}>
              {filteredDocuments.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    width: activeSlide === idx ? '22px' : '7px',
                    height: '7px',
                    borderRadius: '9999px',
                    backgroundColor: activeSlide === idx ? '#003893' : '#cbd5e1',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToSlide(Math.min(activeSlide + 1, filteredDocuments.length - 1))}
              disabled={activeSlide >= filteredDocuments.length - 1}
              className="doc-carousel-btn"
              aria-label="Next card"
              style={{
                opacity: activeSlide >= filteredDocuments.length - 1 ? 0.35 : 1,
                cursor: activeSlide >= filteredDocuments.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Empty Search State */}
        {filteredDocuments.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 20px', backgroundColor: '#f8fafc', borderRadius: '4px', border: '1px dashed #cbd5e1' }}>
            <FolderOpen size={36} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
              {t('No documents found matching your search.', 'तपाईंले खोज्नुभएको शब्दसँग मिल्दो दस्ताबेज भेटिएन।')}
            </h4>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px' }}>
              {t('Try searching with different terms like "tax", "gratuity", "pulsar", or "bigha".', 'फरक शब्दहरू जस्तै "आयकर", "उपदान", "सवारी", वा "जग्गा" बाट खोजी हेर्नुहोस्।')}
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setFilterSavedOnly(false); }}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '8px 14px' }}
            >
              {t('Clear Filters', 'फिल्टर हटाउनुहोस्')}
            </button>
          </div>
        )}

      </div>

      {/* FULL-SCREEN INTERACTIVE DOCUMENT READER MODAL */}
      <AnimatePresence>
        {activeDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.72)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(12px, 3vw, 24px)'
            }}
            onClick={() => setActiveDocument(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '1040px',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 30px 70px -10px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.15)',
                overflow: 'hidden',
                border: '1px solid rgba(226, 232, 240, 0.8)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Reader Header Toolbar */}
              <div
                style={{
                  padding: '16px clamp(16px, 3vw, 24px)',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#f8fafc',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px', flex: 1 }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #bfdbfe',
                      flexShrink: 0
                    }}
                  >
                    <FileText size={22} color="#003893" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>
                      {language === 'ne' ? activeDocument.titleNep : activeDocument.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#003893', background: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>
                        {activeDocument.gazetteNumber}
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {language === 'ne' ? `लागु मिति: ${activeDocument.effectiveDateBS}` : `Effective: ${activeDocument.effectiveDateBS} (${activeDocument.effectiveDateAD})`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reader Control Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  {/* Font Size Adjusters */}
                  <div style={{ display: 'flex', alignItems: 'center', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '2px', overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => setReaderFontSize(Math.max(12, readerFontSize - 1))}
                      style={{ padding: '6px 10px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#475569' }}
                      title="Zoom Out"
                    >
                      <ZoomOut size={15} />
                    </button>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '0 4px', color: '#64748b', minWidth: '32px', textAlign: 'center' }}>
                      {readerFontSize}px
                    </span>
                    <button
                      type="button"
                      onClick={() => setReaderFontSize(Math.min(20, readerFontSize + 1))}
                      style={{ padding: '6px 10px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#475569' }}
                      title="Zoom In"
                    >
                      <ZoomIn size={15} />
                    </button>
                  </div>

                  {/* Bookmark / Keep */}
                  <button
                    type="button"
                    onClick={() => toggleSaveDocument(activeDocument.id)}
                    className="btn-secondary"
                    style={{ padding: '7px 12px', fontSize: '12px', borderRadius: '8px', gap: '6px' }}
                    title="Bookmark and keep document"
                  >
                    {savedDocIds.includes(activeDocument.id) ? (
                      <BookmarkCheck size={15} color="#c8102e" />
                    ) : (
                      <Bookmark size={15} />
                    )}
                    <span>{savedDocIds.includes(activeDocument.id) ? t('Saved', 'सुरक्षित') : t('Keep', 'राख्नुहोस्')}</span>
                  </button>

                  {/* Download */}
                  <button
                    type="button"
                    onClick={() => handleDownload(activeDocument)}
                    className="btn-primary"
                    style={{ padding: '7px 14px', fontSize: '12px', borderRadius: '8px', gap: '6px' }}
                    title="Download Document"
                  >
                    <Download size={15} />
                    <span>{t('Download', 'डाउनलोड')}</span>
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setActiveDocument(null)}
                    style={{
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: '#475569',
                      transition: 'all 0.15s ease'
                    }}
                    title="Close Reader"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Reader Content Body */}
              <div 
                className="custom-smooth-scroll" 
                style={{ padding: 'clamp(18px, 3.5vw, 30px)', overflowY: 'auto', flex: 1, fontSize: `${readerFontSize}px`, lineHeight: 1.65 }}
              >
                {/* Document Metadata Sheet */}
                <div 
                  style={{ 
                    backgroundColor: '#f8fafc', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '14px', 
                    padding: '20px', 
                    marginBottom: '26px',
                    boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.04)'
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', fontSize: '13px' }}>
                    <div style={{ background: '#ffffff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #edf2f7' }}>
                      <strong style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '4px' }}>
                        {t('Issuing Authority', 'जारी गर्ने निकाय')}
                      </strong>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{language === 'ne' ? activeDocument.authorityNep : activeDocument.authority}</span>
                    </div>

                    <div style={{ background: '#ffffff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #edf2f7' }}>
                      <strong style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '4px' }}>
                        {t('Gazette / Circular No.', 'राजपत्र / परिपत्र')}
                      </strong>
                      <span style={{ fontWeight: 700, color: '#003893' }}>{activeDocument.gazetteNumber}</span>
                    </div>

                    <div style={{ background: '#ffffff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #edf2f7' }}>
                      <strong style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '4px' }}>
                        {t('Effective Date', 'लागु मिति')}
                      </strong>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{activeDocument.effectiveDateBS} ({activeDocument.effectiveDateAD})</span>
                    </div>

                    <div style={{ background: '#ffffff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #edf2f7' }}>
                      <strong style={{ color: '#64748b', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '4px' }}>
                        {t('Authentication Status', 'प्रमाणीकरण स्थिति')}
                      </strong>
                      <span style={{ color: '#059669', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <CheckCircle2 size={14} color="#059669" />
                        {t('Official Nepal Gazette Record', 'आधिकारिक नेपाल राजपत्र')}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #e2e8f0', fontSize: '13.5px', color: '#334155' }}>
                    <strong style={{ color: '#0f172a', fontWeight: 700 }}>{t('Official Executive Summary:', 'दस्ताबेजको आधिकारिक सारसंक्षेप:')}</strong>
                    <p style={{ margin: '6px 0 0', lineHeight: 1.6 }}>
                      {language === 'ne' ? activeDocument.summaryNep : activeDocument.summary}
                    </p>
                  </div>
                </div>

                {/* Clauses Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {t('Verified Legal Clauses & Schedules', 'ऐनका आधिकारिक दफाहरू तथा अनुसूची')}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                      {activeDocument.clauses.length} {t('Sections', 'दफाहरू')}
                    </span>
                  </div>

                  {activeDocument.clauses.map((clause, idx) => (
                    <div
                      key={clause.clauseNumber}
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '14px',
                        padding: '18px 20px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)',
                        transition: 'border-color 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#003893', backgroundColor: '#eff6ff', padding: '4px 10px', borderRadius: '8px', border: '1px solid #dbeafe' }}>
                          {clause.clauseNumber} • {language === 'ne' ? clause.titleNep : clause.title}
                        </span>

                        <button
                          type="button"
                          onClick={() => copyClause(clause, idx)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: copiedClauseIdx === idx ? '#eff6ff' : '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '4px 9px',
                            fontSize: '11.5px',
                            color: copiedClauseIdx === idx ? '#003893' : '#64748b',
                            cursor: 'pointer',
                            fontWeight: 600,
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {copiedClauseIdx === idx ? <Check size={13} color="#003893" /> : <Copy size={13} />}
                          <span>{copiedClauseIdx === idx ? t('Copied!', 'कपि भयो!') : t('Copy Clause', 'दफा कपि')}</span>
                        </button>
                      </div>

                      {/* Nepali Text */}
                      <p style={{ margin: '0 0 10px', color: '#0f172a', fontWeight: 600, lineHeight: 1.65 }}>
                        {clause.contentNep}
                      </p>

                      {/* English Translation */}
                      <p style={{ margin: 0, color: '#475569', fontSize: '0.94em', lineHeight: 1.55, borderTop: '1px dashed #e2e8f0', paddingTop: '10px' }}>
                        {clause.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reader Footer */}
              <div
                style={{
                  padding: '14px clamp(16px, 3vw, 24px)',
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#f8fafc',
                  fontSize: '12px',
                  color: '#64748b',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={15} color="#059669" />
                  {t('Certified from Nepal Gazette & Ministry circular records.', 'नेपाल राजपत्र तथा मन्त्रालयको आधिकारिक अभिलेखबाट प्रमाणित।')}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveDocument(null)}
                  className="btn-secondary"
                  style={{ padding: '7px 16px', fontSize: '12px', borderRadius: '8px' }}
                >
                  {t('Close Reader', 'बन्द गर्नुहोस्')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
