import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { 
  Clock, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  BookOpen, 
  Calculator,
  User,
  ShieldCheck,
  Tag,
  ReceiptText,
  Landmark,
  Coins,
  Compass,
  Zap
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '@/lib/blog/posts';
import { constructMetadata, SITE_CONFIG } from '@/lib/seo/metadata';
import { ShareButton } from '@/components/blog/ShareButton';
import { BlogStickyToolCta } from '@/components/blog/BlogStickyToolCta';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found | Nepali Calc Blog',
    };
  }

  return constructMetadata({
    title: `${post.title} | Nepali Calc Guide`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.shortName,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  };

  return (
    <article style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Header Banner */}
      <div 
        style={{ 
          background: 'radial-gradient(circle at 50% 0%, #f0f7ff 0%, #ffffff 85%)',
          padding: 'clamp(36px, 4vw, 56px) 20px 32px',
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
          
          {/* Breadcrumb Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b', marginBottom: '18px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/blog" style={{ color: '#64748b', textDecoration: 'none' }}>Blog</Link>
            <span>/</span>
            <span style={{ color: '#003893', fontWeight: 700 }}>{post.category}</span>
          </nav>

          {/* Category & Read Time Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span 
              style={{ 
                fontSize: '11.5px', 
                fontWeight: 800, 
                padding: '3px 12px', 
                borderRadius: '9999px', 
                backgroundColor: '#eff6ff', 
                color: '#1d4ed8', 
                border: '1px solid #bfdbfe',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              {post.category}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: '#64748b' }}>
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', color: '#64748b' }}>
              <Calendar size={14} />
              <span>{post.publishedDate}</span>
            </div>

            <ShareButton
              title={post.title}
              url={`https://nepalicalc.com/blog/${post.slug}`}
              excerpt={post.excerpt}
              category={post.category}
            />
          </div>

          {/* Main Title */}
          <h1 style={{ fontSize: 'clamp(26px, 3.8vw, 38px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.25, margin: '0 0 20px' }}>
            {post.title}
          </h1>

          {/* Author Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: '#003893', 
                color: '#ffffff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '15px'
              }}
            >
              DC
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{post.author.name}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{post.author.role}</div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Compact Interactive Tool Action CTA that sticks to bottom on scroll */}
        <BlogStickyToolCta 
          toolTitle={post.toolLink.title} 
          toolHref={post.toolLink.href} 
          category={post.category} 
        />

        {/* Intro */}
        <p style={{ fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '32px' }}>
          {post.content.intro}
        </p>

        {/* Key Takeaways Callout Card */}
        <div 
          style={{ 
            backgroundColor: '#f8fafc', 
            border: '1.5px solid #cbd5e1', 
            borderRadius: '16px', 
            padding: '24px', 
            marginBottom: '40px' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 900, color: '#0f172a', marginBottom: '14px' }}>
            <Sparkles size={18} color="#d97706" />
            <span>Key Takeaways & Summary</span>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {post.content.keyTakeaways.map((point, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#334155', lineHeight: 1.6 }}>
                <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dynamic Sections */}
        {post.content.sections.map((section, idx) => (
          <section key={idx} style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginBottom: '14px', lineHeight: 1.3 }}>
              {section.heading}
            </h2>

            <p style={{ fontSize: '15.5px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' }}>
              {section.body}
            </p>

            {/* Optional Table */}
            {section.table && (
              <div className="guide-table-wrapper" style={{ overflowX: 'auto', margin: '20px 0', border: '1px solid #e2e8f0', borderRadius: '12px', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', minWidth: '460px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
                      {section.table.headers.map((h, i) => (
                        <th key={i} style={{ padding: '12px 16px', fontWeight: 800, color: '#0f172a' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: rIdx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} style={{ padding: '12px 16px', color: '#334155', fontWeight: cIdx === 0 ? 700 : 500 }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tip Alert */}
            {section.tip && (
              <div 
                style={{ 
                  backgroundColor: '#fef3c7', 
                  borderLeft: '4px solid #d97706', 
                  padding: '14px 18px', 
                  borderRadius: '0 10px 10px 0', 
                  margin: '20px 0',
                  fontSize: '13.5px',
                  color: '#92400e',
                  lineHeight: 1.6
                }}
              >
                <strong>💡 Pro Tip: </strong>{section.tip}
              </div>
            )}
          </section>
        ))}

        {/* Conclusion */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '28px', marginTop: '36px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
            Final Thoughts
          </h3>
          <p style={{ fontSize: '15.5px', color: '#334155', lineHeight: 1.8, marginBottom: '24px' }}>
            {post.content.conclusion}
          </p>
        </div>

        {/* Return to Tool Action */}
        <div 
          style={{ 
            backgroundColor: '#f8fafc', 
            border: '1.5px solid #e2e8f0', 
            borderRadius: '16px', 
            padding: '24px', 
            textAlign: 'center', 
            marginTop: '32px' 
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
            Ready to calculate your exact numbers?
          </h3>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 auto 16px', maxWidth: '480px' }}>
            Apply the formulas and laws outlined in this guide directly using our precision calculators.
          </p>
          <Link
            href={post.toolLink.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#003893',
              color: '#ffffff',
              padding: '11px 22px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0, 56, 147, 0.25)'
            }}
          >
            <span>Open {post.toolLink.title}</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>

      {/* Related Guides Section - Modernized */}
      <section 
        id="related-guides"
        style={{ 
          background: 'radial-gradient(circle at 50% 0%, #f0f7ff 0%, #f8fafc 100%)', 
          padding: '64px 20px', 
          borderTop: '1px solid #e2e8f0' 
        }}
      >
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: 800, color: '#003893', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                <BookOpen size={14} />
                <span>Knowledge Base • Official Nepal Guides</span>
              </div>
              <h3 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                Related Financial & Calculator Guides
              </h3>
            </div>

            <Link 
              href="/blog" 
              style={{ 
                fontSize: '13px', 
                fontWeight: 800, 
                color: '#003893', 
                backgroundColor: '#ffffff',
                border: '1.5px solid #cbd5e1',
                padding: '9px 18px',
                borderRadius: '9999px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Explore All Guides</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '24px' }}>
            {relatedPosts.map((rPost) => {
              const getCategoryDesign = (cat: string) => {
                switch (cat) {
                  case 'Tax & Law':
                    return {
                      gradient: 'linear-gradient(135deg, #881337 0%, #be123c 50%, #f43f5e 100%)',
                      accentColor: '#be123c',
                      Icon: ReceiptText,
                    };
                  case 'Banking & Loans':
                    return {
                      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%)',
                      accentColor: '#1e40af',
                      Icon: Landmark,
                    };
                  case 'Gold & Wealth':
                    return {
                      gradient: 'linear-gradient(135deg, #78350f 0%, #b45309 45%, #d97706 80%, #f59e0b 100%)',
                      accentColor: '#b45309',
                      Icon: Coins,
                    };
                  case 'Land & Real Estate':
                    return {
                      gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)',
                      accentColor: '#047857',
                      Icon: Compass,
                    };
                  case 'Citizen Services':
                    return {
                      gradient: 'linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)',
                      accentColor: '#4338ca',
                      Icon: ShieldCheck,
                    };
                  case 'Utilities & Daily':
                    return {
                      gradient: 'linear-gradient(135deg, #0f172a 0%, #0e7490 55%, #06b6d4 100%)',
                      accentColor: '#0e7490',
                      Icon: Zap,
                    };
                  default:
                    return {
                      gradient: 'linear-gradient(135deg, #003893 0%, #2563eb 100%)',
                      accentColor: '#003893',
                      Icon: BookOpen,
                    };
                }
              };

              const design = getCategoryDesign(rPost.category);
              const IconComp = design.Icon;

              return (
                <Link 
                  key={rPost.slug} 
                  href={`/blog/${rPost.slug}`} 
                  style={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '20px', 
                    overflow: 'hidden',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 18px -2px rgba(15, 23, 42, 0.05)',
                    transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative'
                  }}
                  className="hover-lift"
                >
                  {/* Card Mini Header Banner */}
                  <div 
                    style={{ 
                      height: '80px', 
                      background: design.gradient, 
                      position: 'relative', 
                      overflow: 'hidden',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div 
                      style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px)',
                        backgroundSize: '12px 12px' 
                      }} 
                    />

                    {/* Watermark Icon */}
                    <IconComp 
                      size={80} 
                      style={{ 
                        position: 'absolute', 
                        right: '-8px', 
                        bottom: '-16px', 
                        opacity: 0.2, 
                        color: '#ffffff',
                        transform: 'rotate(-10deg)',
                        pointerEvents: 'none'
                      }} 
                    />

                    {/* Category Pill */}
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: 800, 
                        color: '#ffffff', 
                        backgroundColor: 'rgba(255, 255, 255, 0.22)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        zIndex: 2
                      }}
                    >
                      <IconComp size={12} />
                      <span>{rPost.category}</span>
                    </span>

                    {/* Reading Time */}
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        color: '#ffffff', 
                        backgroundColor: 'rgba(0, 0, 0, 0.24)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        zIndex: 2,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Clock size={11} />
                      <span>{rPost.readTime}</span>
                    </span>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '20px 20px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 
                      style={{ 
                        fontSize: '16.5px', 
                        fontWeight: 800, 
                        color: '#0f172a', 
                        lineHeight: 1.4, 
                        margin: '0 0 6px',
                        letterSpacing: '-0.01em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {rPost.title}
                    </h4>

                    <p 
                      style={{ 
                        fontSize: '13px', 
                        color: '#475569', 
                        lineHeight: 1.55, 
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flex: 1
                      }}
                    >
                      {rPost.excerpt}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div 
                    style={{ 
                      padding: '12px 20px 14px', 
                      background: '#fafafa', 
                      borderTop: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <div 
                      style={{ 
                        fontSize: '12.5px', 
                        fontWeight: 800, 
                        color: design.accentColor, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px' 
                      }}
                    >
                      <span>Read Guide</span>
                      <div 
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          borderRadius: '50%', 
                          backgroundColor: `${design.accentColor}15`, 
                          color: design.accentColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

    </article>
  );
}
