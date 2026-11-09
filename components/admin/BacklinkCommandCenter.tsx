'use client';

import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Search,
  Sparkles,
  FileText,
  MessageSquare,
  Globe,
  Database,
  Send,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import {
  AUTHORITY_ARTICLES,
  COMMUNITY_POSTS,
  DATASET_FILES,
  HIGH_DR_PLATFORMS,
  NEPAL_SEARCH_DORKS,
  WIKIPEDIA_CITATIONS,
} from '@/lib/seo/backlinkCampaignData';

type TabKey = 'checklist' | 'articles' | 'community' | 'wikipedia' | 'datasets';

interface WikiScanStat {
  id: string;
  scanned: boolean;
  externalLinksCount?: number;
  deadLinkCount?: number;
  citationNeededCount?: number;
  outdatedYears?: number;
}

const STORAGE_KEY_AUTH = 'nc_admin_backlink_key_v1';
const STORAGE_KEY_DONE = 'nc_admin_backlink_done_v1';

export default function BacklinkCommandCenter() {
  const [passkey, setPasskey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [hasDevtoEnv, setHasDevtoEnv] = useState(false);
  const [hasGithubEnv, setHasGithubEnv] = useState(false);

  const [activeTab, setActiveTab] = useState<TabKey>('checklist');
  const [selectedArticleId, setSelectedArticleId] = useState<string>(AUTHORITY_ARTICLES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});

  const [devtoApiKeyInput, setDevtoApiKeyInput] = useState('');
  const [devtoStatus, setDevtoStatus] = useState<{
    loading: boolean;
    msg: string;
    url?: string;
    isError?: boolean;
  }>({
    loading: false,
    msg: '',
  });

  const [githubTokenInput, setGithubTokenInput] = useState('');
  const [gistStatus, setGistStatus] = useState<{
    loading: boolean;
    msg: string;
    url?: string;
    isError?: boolean;
  }>({
    loading: false,
    msg: '',
  });

  const [wikiScanning, setWikiScanning] = useState(false);
  const [wikiStats, setWikiStats] = useState<Record<string, WikiScanStat>>({});

  // Live Terminal Command Runner State
  const [cmdStatus, setCmdStatus] = useState<{
    loading: boolean;
    command: string;
    output: string;
    isError?: boolean;
  }>({
    loading: false,
    command: '',
    output: '',
  });
  const [npmTokenInput, setNpmTokenInput] = useState('');
  const [showNpmTokenBox, setShowNpmTokenBox] = useState(false);

  async function handleRunEngine(subcommand: 'all' | 'publish') {
    setCmdStatus({
      loading: true,
      command: `node scripts/backlink-engine.js ${subcommand}`,
      output: `Running "node scripts/backlink-engine.js ${subcommand}" on server... please wait (~5-10s)...`,
    });
    try {
      const res = await fetch('/api/admin/backlinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': passkey.trim(),
        },
        body: JSON.stringify({ action: 'run_engine', subcommand }),
      });
      const data = await res.json();
      setCmdStatus({
        loading: false,
        command: data.command || `node scripts/backlink-engine.js ${subcommand}`,
        output: data.output || data.error || 'Finished.',
        isError: !res.ok || !data.ok,
      });
    } catch (err: unknown) {
      setCmdStatus({
        loading: false,
        command: `node scripts/backlink-engine.js ${subcommand}`,
        output: err instanceof Error ? err.message : 'Failed to execute command.',
        isError: true,
      });
    }
  }

  async function handleRunNpmPublish() {
    setCmdStatus({
      loading: true,
      command: 'cd backlink-campaigns/npm-package && npm publish --access public',
      output: 'Running npm publish on server...',
    });
    try {
      const res = await fetch('/api/admin/backlinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': passkey.trim(),
        },
        body: JSON.stringify({
          action: 'publish_npm',
          npmToken: npmTokenInput.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setShowNpmTokenBox(true);
      }
      setCmdStatus({
        loading: false,
        command: data.command || 'npm publish --access public',
        output: [data.error, data.output].filter(Boolean).join('\n\n'),
        isError: !res.ok || !data.ok,
      });
    } catch (err: unknown) {
      setCmdStatus({
        loading: false,
        command: 'npm publish --access public',
        output: err instanceof Error ? err.message : 'Failed to execute npm publish.',
        isError: true,
      });
    }
  }

  useEffect(() => {
    try {
      const savedDone = localStorage.getItem(STORAGE_KEY_DONE);
      if (savedDone) {
        setCompletedIds(JSON.parse(savedDone));
      }
      const savedKey = localStorage.getItem(STORAGE_KEY_AUTH);
      if (savedKey) {
        setPasskey(savedKey);
        verifyPasskey(savedKey, true);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  async function verifyPasskey(keyToVerify: string, silent = false) {
    if (!keyToVerify.trim()) return;
    if (!silent) {
      setAuthLoading(true);
      setAuthError('');
    }
    try {
      const res = await fetch('/api/admin/backlinks', {
        method: 'GET',
        headers: { 'x-admin-key': keyToVerify.trim() },
      });
      const data = await res.json();
      if (res.ok && data.authorized) {
        setIsUnlocked(true);
        setHasDevtoEnv(Boolean(data.hasDevtoEnv));
        setHasGithubEnv(Boolean(data.hasGithubEnv));
        localStorage.setItem(STORAGE_KEY_AUTH, keyToVerify.trim());
      } else {
        if (!silent) setAuthError(data.error || 'Invalid Admin Passkey');
        localStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch {
      if (!silent) setAuthError('Failed to verify passkey with server.');
    } finally {
      if (!silent) setAuthLoading(false);
    }
  }

  function handleLock() {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    setIsUnlocked(false);
    setPasskey('');
  }

  function toggleCompleted(id: string) {
    setCompletedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY_DONE, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }

  function copyText(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2200);
  }

  function downloadFile(
    filename: string,
    content: string,
    mimeType = 'text/plain;charset=utf-8;'
  ) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function handlePublishDevto(articleId: string) {
    setDevtoStatus({ loading: true, msg: 'Publishing safe Draft with canonical_url to Dev.to...' });
    try {
      const res = await fetch('/api/admin/backlinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': passkey.trim(),
        },
        body: JSON.stringify({
          action: 'publish_devto',
          articleId,
          devtoApiKey: devtoApiKeyInput.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setDevtoStatus({ loading: false, msg: data.message, url: data.url, isError: false });
      } else {
        setDevtoStatus({
          loading: false,
          msg: data.error || 'Failed to publish to Dev.to',
          isError: true,
        });
      }
    } catch (err: unknown) {
      setDevtoStatus({
        loading: false,
        msg: err instanceof Error ? err.message : 'Network error',
        isError: true,
      });
    }
  }

  async function handlePublishGist() {
    setGistStatus({ loading: true, msg: 'Publishing Nepal Open Datasets to DR 96 GitHub Gist...' });
    try {
      const res = await fetch('/api/admin/backlinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': passkey.trim(),
        },
        body: JSON.stringify({
          action: 'publish_gist',
          githubToken: githubTokenInput.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setGistStatus({ loading: false, msg: data.message, url: data.url, isError: false });
      } else {
        setGistStatus({
          loading: false,
          msg: data.error || 'Failed to publish GitHub Gist',
          isError: true,
        });
      }
    } catch (err: unknown) {
      setGistStatus({
        loading: false,
        msg: err instanceof Error ? err.message : 'Network error',
        isError: true,
      });
    }
  }

  async function handleScanWikipedia() {
    setWikiScanning(true);
    try {
      const res = await fetch('/api/admin/backlinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': passkey.trim(),
        },
        body: JSON.stringify({ action: 'scan_wikipedia' }),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.results)) {
        const map: Record<string, WikiScanStat> = {};
        for (const r of data.results) {
          map[r.id] = r;
        }
        setWikiStats(map);
      }
    } catch {
      // ignore
    } finally {
      setWikiScanning(false);
    }
  }

  const selectedArticle =
    AUTHORITY_ARTICLES.find((a) => a.id === selectedArticleId) || AUTHORITY_ARTICLES[0];
  const completedCount = Object.values(completedIds).filter(Boolean).length;

  const btnPrimaryStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    backgroundColor: '#0b2b5c',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(11, 43, 92, 0.18)',
  };

  const btnSecondaryStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    border: '1.5px solid #cbd5e1',
    borderRadius: '10px',
    padding: '9px 14px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    textDecoration: 'none',
  };

  // ============================================================================
  // LOCK SCREEN (IF NOT UNLOCKED)
  // ============================================================================
  if (!isUnlocked) {
    return (
      <div
        style={{
          minHeight: '78vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          background: 'radial-gradient(circle at 50% 0%, #eff6ff 0%, #f8fafc 80%)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '460px',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)',
            padding: '36px 32px',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0b2b5c 0%, #1d4ed8 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              boxShadow: '0 8px 20px rgba(11, 43, 92, 0.25)',
            }}
          >
            <Lock size={24} />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '999px',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              fontSize: '11.5px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '10px',
            }}
          >
            <ShieldCheck size={13} color="#059669" />
            <span>Restricted Admin Route • Noindex</span>
          </div>

          <h1
            style={{
              fontSize: '24px',
              fontWeight: 900,
              color: '#0f172a',
              margin: '0 0 8px',
              lineHeight: 1.25,
            }}
          >
            Private SEO & Backlink Command Center
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#64748b',
              lineHeight: 1.6,
              margin: '0 0 24px',
            }}
          >
            This workspace is hidden from search engines and restricted to NepaliCalc administrators. Enter your passkey to unlock all articles, datasets, and 1-click publishers.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              verifyPasskey(passkey);
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#334155',
                  marginBottom: '8px',
                }}
              >
                Admin Passkey
              </label>
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}

                autoFocus
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '14px',
                  color: '#0f172a',
                  backgroundColor: '#f8fafc',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {authError && (
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}
              >
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              style={{
                ...btnPrimaryStyle,
                width: '100%',
                padding: '13px 20px',
                fontSize: '14px',
                borderRadius: '12px',
                opacity: authLoading ? 0.65 : 1,
              }}
            >
              <Unlock size={16} />
              <span>{authLoading ? 'Verifying Passkey...' : 'Unlock Command Center'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ============================================================================
  // UNLOCKED DASHBOARD
  // ============================================================================
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '32px 20px 80px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0b2b5c 0%, #1e3a8a 100%)',
            borderRadius: '22px',
            padding: '28px 32px',
            color: '#ffffff',
            marginBottom: '24px',
            boxShadow: '0 12px 32px rgba(11, 43, 92, 0.18)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div style={{ maxWidth: '780px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(16, 185, 129, 0.22)',
                  border: '1px solid rgba(16, 185, 129, 0.45)',
                  color: '#a7f3d0',
                  fontSize: '12px',
                  fontWeight: 800,
                }}
              >
                <ShieldCheck size={14} />
                <span>Private Admin Mode (noindex, nofollow)</span>
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.14)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 800,
                }}
              >
                <CheckCircle2 size={14} />
                <span>
                  {completedCount} / {HIGH_DR_PLATFORMS.length} Platforms Submitted
                </span>
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 900, margin: '0 0 8px', color: '#ffffff' }}>
              NepaliCalc High-Authority Backlink Command Center
            </h1>
            <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
              1-click copy pre-written authority articles, Reddit/Quora cheat sheets, and Wikipedia citations, download CERN/Kaggle open datasets, or auto-publish drafts directly from your browser.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleRunEngine('all')}
              disabled={cmdStatus.loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                backgroundColor: '#10b981',
                border: 'none',
                color: '#ffffff',
                padding: '10px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              <RefreshCw size={14} />
              <span>
                {cmdStatus.loading && cmdStatus.command.includes('all')
                  ? 'Running Engine...'
                  : '⚡ Run backlink-engine.js all'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleRunEngine('publish')}
              disabled={cmdStatus.loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                backgroundColor: '#f59e0b',
                border: 'none',
                color: '#0f172a',
                padding: '10px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
              }}
            >
              <Send size={14} />
              <span>
                {cmdStatus.loading && cmdStatus.command.includes('publish')
                  ? 'Publishing...'
                  : '🚀 Run backlink-engine.js publish'}
              </span>
            </button>

            <button
              onClick={handleLock}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.28)',
                color: '#ffffff',
                padding: '10px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Lock size={14} />
              <span>Lock Session</span>
            </button>
          </div>
        </div>

        {/* Live Terminal Output Panel (Displays when any command is executed from UI) */}
        {(cmdStatus.loading || cmdStatus.output) && (
          <div
            style={{
              backgroundColor: '#0f172a',
              borderRadius: '18px',
              border: `1.5px solid ${cmdStatus.isError ? '#ef4444' : '#334155'}`,
              padding: '18px 22px',
              marginBottom: '24px',
              color: '#f8fafc',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: '6px',
                    backgroundColor: cmdStatus.loading
                      ? '#2563eb'
                      : cmdStatus.isError
                        ? '#dc2626'
                        : '#059669',
                    color: '#ffffff',
                    fontSize: '11.5px',
                    fontWeight: 800,
                  }}
                >
                  {cmdStatus.loading ? 'RUNNING' : cmdStatus.isError ? 'ACTION NEEDED' : 'SUCCESS'}
                </span>
                <code style={{ fontSize: '13px', color: '#93c5fd', fontWeight: 700 }}>
                  $ {cmdStatus.command}
                </code>
              </div>

              <button
                type="button"
                onClick={() => setCmdStatus({ loading: false, command: '', output: '' })}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#cbd5e1',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Close Output ✕
              </button>
            </div>

            {showNpmTokenBox && cmdStatus.command.includes('npm publish') && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '12px',
                  padding: '12px',
                  backgroundColor: '#1e293b',
                  borderRadius: '10px',
                }}
              >
                <input
                  type="password"
                  value={npmTokenInput}
                  onChange={(e) => setNpmTokenInput(e.target.value)}
                  placeholder="Paste NPM Automation Token (from npmjs.com -> Access Tokens -> Generate Token)"
                  style={{
                    flex: '1 1 320px',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #475569',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    fontSize: '12.5px',
                  }}
                />
                <button
                  type="button"
                  onClick={handleRunNpmPublish}
                  style={{
                    ...btnPrimaryStyle,
                    backgroundColor: '#10b981',
                  }}
                >
                  <Send size={14} />
                  <span>Retry npm publish with Token</span>
                </button>
              </div>
            )}

            <pre
              style={{
                margin: 0,
                fontSize: '12.5px',
                lineHeight: 1.6,
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                maxHeight: '280px',
                overflowY: 'auto',
                color: '#e2e8f0',
              }}
            >
              {cmdStatus.output}
            </pre>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            backgroundColor: '#ffffff',
            padding: '10px',
            borderRadius: '16px',
            border: '1.5px solid #e2e8f0',
            marginBottom: '24px',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
          }}
        >
          {[
            { id: 'checklist', label: '1. High-DR Checklist (DR 58–98)', Icon: Sparkles },
            { id: 'articles', label: '2. Authority Articles & Dev.to (5)', Icon: FileText },
            { id: 'community', label: '3. Reddit & Quora Pack', Icon: MessageSquare },
            { id: 'wikipedia', label: '4. Wikipedia Citations (DR 98)', Icon: Globe },
            { id: 'datasets', label: '5. Datasets (Zenodo/Kaggle/Gist)', Icon: Database },
          ].map((tab) => {
            const TabIcon = tab.Icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: active ? 'none' : '1px solid transparent',
                  backgroundColor: active ? '#0b2b5c' : 'transparent',
                  color: active ? '#ffffff' : '#334155',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <TabIcon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ==================================================================== */}
        {/* TAB 1: HIGH-DR CHECKLIST & NEPAL SEARCH DORKS */}
        {/* ==================================================================== */}
        {activeTab === 'checklist' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1.5px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div style={{ padding: '22px 24px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
                  How to Use This Page (3 Simple Steps Per Row):
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: '#334155', fontWeight: 700 }}>
                  <span style={{ backgroundColor: '#eff6ff', color: '#0b2b5c', padding: '5px 12px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                    Step 1: Click &quot;1. Copy Content / Download&quot; on any row below
                  </span>
                  <span style={{ backgroundColor: '#eff6ff', color: '#0b2b5c', padding: '5px 12px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                    Step 2: Click &quot;2. Open Submit Page ↗&quot; and paste/upload it
                  </span>
                  <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '5px 12px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                    Step 3: Tick the checkbox on the left when done ✓
                  </span>
                </div>
              </div>

              <div>
                {HIGH_DR_PLATFORMS.map((p, idx) => {
                  const isDone = Boolean(completedIds[p.id]);

                  const handleQuickAction = () => {
                    if (p.id === 'zenodo-cern' || p.id === 'kaggle-datasets' || p.id === 'huggingface-datasets') {
                      DATASET_FILES.forEach((f) => downloadFile(f.filename, f.content, f.mimeType));
                      copyText('https://nepalicalc.com', `quick-${p.id}`);
                    } else if (p.id === 'npm-registry') {
                      copyText('cd backlink-campaigns/npm-package && npm login && npm publish', `quick-${p.id}`);
                    } else if (p.id === 'github-repo') {
                      setActiveTab('datasets');
                    } else if (p.id === 'devto-article') {
                      copyText(AUTHORITY_ARTICLES[1].markdownWithFrontmatter, `quick-${p.id}`);
                    } else if (p.id === 'medium-import' || p.id === 'bizmandu-merolagani') {
                      copyText(AUTHORITY_ARTICLES[0].cleanBodyMarkdown, `quick-${p.id}`);
                    } else if (p.id === 'linkedin-article') {
                      copyText(AUTHORITY_ARTICLES[3].cleanBodyMarkdown, `quick-${p.id}`);
                    } else if (p.id === 'techlekh-nepal') {
                      copyText(AUTHORITY_ARTICLES[4].cleanBodyMarkdown, `quick-${p.id}`);
                    } else {
                      copyText(
                        'NepaliCalc.com — 70+ Free Financial, Salary Tax (FY 2083/84), Land (Ropani/Bigha), Bikram Sambat Date & Legal Document Calculators for Nepal. Website: https://nepalicalc.com',
                        `quick-${p.id}`
                      );
                    }
                  };

                  const quickButtonLabel =
                    p.id === 'zenodo-cern' || p.id === 'kaggle-datasets' || p.id === 'huggingface-datasets'
                      ? '1. Download CSVs'
                      : p.id === 'npm-registry'
                        ? '1. Copy Terminal Cmd'
                        : p.id === 'github-repo'
                          ? '1. Go to 1-Click Gist'
                          : p.id === 'devto-article' || p.id === 'medium-import' || p.id === 'linkedin-article' || p.id === 'techlekh-nepal' || p.id === 'bizmandu-merolagani'
                            ? '1. Copy Full Article'
                            : '1. Copy Description';

                  return (
                    <div
                      key={p.id}
                      style={{
                        padding: '18px 24px',
                        borderBottom: idx === HIGH_DR_PLATFORMS.length - 1 ? 'none' : '1px solid #f1f5f9',
                        backgroundColor: isDone ? '#f0fdf4' : '#ffffff',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: '1 1 480px' }}>
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggleCompleted(p.id)}
                          style={{
                            width: '20px',
                            height: '20px',
                            marginTop: '3px',
                            accentColor: '#0b2b5c',
                            cursor: 'pointer',
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span
                              style={{
                                fontSize: '15.5px',
                                fontWeight: 800,
                                color: isDone ? '#64748b' : '#0f172a',
                                textDecoration: isDone ? 'line-through' : 'none',
                              }}
                            >
                              {p.name}
                            </span>
                            <span
                              style={{
                                padding: '2px 8px',
                                borderRadius: '6px',
                                backgroundColor: '#0b2b5c',
                                color: '#ffffff',
                                fontSize: '11.5px',
                                fontWeight: 800,
                              }}
                            >
                              DR {p.dr}
                            </span>
                            <span
                              style={{
                                padding: '2px 8px',
                                borderRadius: '6px',
                                backgroundColor: '#dcfce7',
                                color: '#166534',
                                fontSize: '11.5px',
                                fontWeight: 700,
                              }}
                            >
                              {p.linkType}
                            </span>
                            <span
                              style={{
                                padding: '2px 8px',
                                borderRadius: '6px',
                                backgroundColor: '#f1f5f9',
                                color: '#475569',
                                fontSize: '11.5px',
                                fontWeight: 600,
                              }}
                            >
                              ⏱ {p.effort}
                            </span>
                          </div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>
                            {p.tier}
                          </div>
                          <div style={{ fontSize: '13.5px', color: '#334155', lineHeight: 1.5 }}>
                            {p.action}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                        {p.id === 'npm-registry' && (
                          <button
                            type="button"
                            onClick={handleRunNpmPublish}
                            disabled={cmdStatus.loading}
                            style={{
                              ...btnPrimaryStyle,
                              backgroundColor: '#059669',
                            }}
                          >
                            <Send size={14} />
                            <span>⚡ Run npm publish</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={handleQuickAction}
                          style={btnSecondaryStyle}
                        >
                          <Copy size={14} />
                          <span>
                            {copiedId === `quick-${p.id}` ? '✅ Copied!' : quickButtonLabel}
                          </span>
                        </button>

                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={btnPrimaryStyle}
                        >
                          <span>2. Open Submit Page</span>
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nepal Niche Outreach Search Dorks */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1.5px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div style={{ padding: '22px 24px', borderBottom: '1px solid #e2e8f0' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>
                  Nepal Niche Outreach Search Dorks (Find Outdated `.np` & `.edu.np` Websites)
                </h2>
                <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
                  Click &quot;Search Google&quot; to find Nepali blogs, CA firms, and colleges with outdated tables, then copy the email pitch.
                </p>
              </div>

              <div>
                {NEPAL_SEARCH_DORKS.map((d, idx) => (
                  <div
                    key={d.id}
                    style={{
                      padding: '20px 24px',
                      borderBottom: idx === NEPAL_SEARCH_DORKS.length - 1 ? 'none' : '1px solid #f1f5f9',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        marginBottom: '10px',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                          {d.category}
                        </div>
                        <code
                          style={{
                            fontSize: '12px',
                            backgroundColor: '#f1f5f9',
                            color: '#334155',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            display: 'inline-block',
                          }}
                        >
                          {d.query}
                        </code>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button
                          onClick={() => copyText(d.outreachPitch, d.id)}
                          style={btnSecondaryStyle}
                        >
                          <Copy size={14} />
                          <span>{copiedId === d.id ? 'Copied Pitch!' : 'Copy Email Pitch'}</span>
                        </button>
                        <a
                          href={d.googleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={btnPrimaryStyle}
                        >
                          <Search size={14} />
                          <span>Search Google</span>
                        </a>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        fontSize: '13px',
                        color: '#334155',
                        lineHeight: 1.55,
                      }}
                    >
                      <strong style={{ color: '#0f172a' }}>Outreach Pitch: </strong>
                      {d.outreachPitch}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: 5 AUTHORITY ARTICLES & DEV.TO PUBLISHER */}
        {/* ==================================================================== */}
        {activeTab === 'articles' && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              alignItems: 'flex-start',
            }}
          >
            {/* Left Selector + Dev.to Publisher */}
            <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1.5px solid #e2e8f0',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#64748b',
                    marginBottom: '4px',
                  }}
                >
                  Select Authority Article (5 Ready)
                </div>

                {AUTHORITY_ARTICLES.map((art, idx) => {
                  const isSelected = selectedArticle.id === art.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => setSelectedArticleId(art.id)}
                      style={{
                        textAlign: 'left',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: isSelected ? '2px solid #0b2b5c' : '1.5px solid #e2e8f0',
                        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0b2b5c', marginBottom: '4px' }}>
                        Article #{idx + 1} • {art.platformTarget.split('&')[0]}
                      </div>
                      <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', lineHeight: 1.4 }}>
                        {art.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 1-Click Dev.to Auto-Publisher Card */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1.5px solid #e2e8f0',
                  padding: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    🚀 1-Click Publish Draft to Dev.to (DR 91)
                  </h3>
                  {hasDevtoEnv && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        padding: '2px 8px',
                        borderRadius: '999px',
                      }}
                    >
                      .env Ready
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, margin: '0 0 12px' }}>
                  Uploads the selected article to your Dev.to account as a Draft with{' '}
                  <code style={{ backgroundColor: '#f1f5f9', padding: '2px 5px', borderRadius: '4px' }}>
                    canonical_url: {selectedArticle.canonicalUrl}
                  </code>
                  .
                </p>

                {!hasDevtoEnv && (
                  <input
                    type="password"
                    value={devtoApiKeyInput}
                    onChange={(e) => setDevtoApiKeyInput(e.target.value)}
                    placeholder="Paste Dev.to API Key (dev.to/settings/extensions)"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '13px',
                      marginBottom: '10px',
                      boxSizing: 'border-box',
                    }}
                  />
                )}

                <button
                  onClick={() => handlePublishDevto(selectedArticle.id)}
                  disabled={devtoStatus.loading}
                  style={{ ...btnPrimaryStyle, width: '100%' }}
                >
                  <Send size={14} />
                  <span>
                    {devtoStatus.loading ? 'Publishing to Dev.to...' : 'Auto-Publish Draft to Dev.to'}
                  </span>
                </button>

                {devtoStatus.msg && (
                  <div
                    style={{
                      marginTop: '12px',
                      padding: '12px',
                      borderRadius: '10px',
                      backgroundColor: devtoStatus.isError ? '#fef2f2' : '#f0fdf4',
                      border: `1px solid ${devtoStatus.isError ? '#fecaca' : '#bbf7d0'}`,
                      color: devtoStatus.isError ? '#b91c1c' : '#166534',
                      fontSize: '12.5px',
                      fontWeight: 600,
                    }}
                  >
                    {devtoStatus.msg}{' '}
                    {devtoStatus.url && (
                      <a
                        href={devtoStatus.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'inherit', fontWeight: 800, textDecoration: 'underline', marginLeft: '6px' }}
                      >
                        Open Dev.to Draft ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Article Preview & Copy Bar */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1.5px solid #e2e8f0',
                padding: '24px',
                flex: '2 1 560px',
                minWidth: 0,
              }}
            >
              <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '18px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#eff6ff',
                      color: '#0b2b5c',
                      fontSize: '12px',
                      fontWeight: 800,
                    }}
                  >
                    Target: {selectedArticle.platformTarget}
                  </span>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#f1f5f9',
                      color: '#334155',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    Canonical: {selectedArticle.canonicalUrl}
                  </span>
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px', lineHeight: 1.3 }}>
                  {selectedArticle.title}
                </h2>
                <p style={{ fontSize: '13.5px', color: '#475569', margin: '0 0 16px', lineHeight: 1.55 }}>
                  {selectedArticle.summary}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button
                    onClick={() =>
                      copyText(selectedArticle.cleanBodyMarkdown, `body-${selectedArticle.id}`)
                    }
                    style={btnPrimaryStyle}
                  >
                    <Copy size={14} />
                    <span>
                      {copiedId === `body-${selectedArticle.id}`
                        ? 'Copied Clean Article!'
                        : 'Copy Article (Medium / LinkedIn / Substack)'}
                    </span>
                  </button>

                  <button
                    onClick={() => copyText(selectedArticle.title, `title-${selectedArticle.id}`)}
                    style={btnSecondaryStyle}
                  >
                    <Copy size={14} />
                    <span>
                      {copiedId === `title-${selectedArticle.id}` ? 'Copied Title!' : 'Copy Title'}
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      copyText(
                        selectedArticle.markdownWithFrontmatter,
                        `front-${selectedArticle.id}`
                      )
                    }
                    style={btnSecondaryStyle}
                  >
                    <Copy size={14} />
                    <span>
                      {copiedId === `front-${selectedArticle.id}`
                        ? 'Copied Frontmatter!'
                        : 'Copy with Frontmatter (Dev.to)'}
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      downloadFile(
                        selectedArticle.filename,
                        selectedArticle.markdownWithFrontmatter,
                        'text/markdown;charset=utf-8;'
                      )
                    }
                    style={btnSecondaryStyle}
                  >
                    <Download size={14} />
                    <span>Download .md</span>
                  </button>
                </div>
              </div>

              <pre
                style={{
                  backgroundColor: '#0f172a',
                  color: '#f8fafc',
                  padding: '20px',
                  borderRadius: '14px',
                  fontSize: '12.5px',
                  lineHeight: 1.65,
                  maxHeight: '520px',
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                  margin: 0,
                }}
              >
                {selectedArticle.markdownWithFrontmatter}
              </pre>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: REDDIT & QUORA PACK */}
        {/* ==================================================================== */}
        {activeTab === 'community' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                backgroundColor: '#fffbeb',
                border: '1.5px solid #fde68a',
                borderRadius: '16px',
                padding: '16px 20px',
                fontSize: '13.5px',
                color: '#92400e',
                lineHeight: 1.55,
              }}
            >
              <strong>🛡️ White-Hat Community Rule:</strong> Post the complete helpful table/answer directly inside Reddit or Quora so readers get full value without clicking, with the natural calculator reference at the bottom.
            </div>

            {COMMUNITY_POSTS.map((post) => (
              <div
                key={post.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: '1.5px solid #e2e8f0',
                  padding: '24px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '14px',
                  }}
                >
                  <div>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '6px',
                        backgroundColor: '#0b2b5c',
                        color: '#ffffff',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        marginRight: '8px',
                      }}
                    >
                      {post.platform}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#334155' }}>
                      {post.communityName}
                    </span>
                    <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', margin: '8px 0 0' }}>
                      {post.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <button
                      onClick={() => copyText(post.title, `ctitle-${post.id}`)}
                      style={btnSecondaryStyle}
                    >
                      <Copy size={14} />
                      <span>{copiedId === `ctitle-${post.id}` ? 'Copied Title!' : 'Copy Title'}</span>
                    </button>
                    <button
                      onClick={() => copyText(post.bodyMarkdown, `cbody-${post.id}`)}
                      style={btnPrimaryStyle}
                    >
                      <Copy size={14} />
                      <span>{copiedId === `cbody-${post.id}` ? 'Copied Answer!' : 'Copy Full Post'}</span>
                    </button>
                    <a
                      href={post.submitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={btnSecondaryStyle}
                    >
                      <span>Open {post.communityName}</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <pre
                  style={{
                    backgroundColor: '#0f172a',
                    color: '#f8fafc',
                    padding: '18px',
                    borderRadius: '14px',
                    fontSize: '12.5px',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    margin: 0,
                  }}
                >
                  {post.bodyMarkdown}
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: WIKIPEDIA CITATIONS (DR 98) */}
        {/* ==================================================================== */}
        {activeTab === 'wikipedia' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1.5px solid #e2e8f0',
                padding: '22px 24px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}
            >
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>
                  English & Nepali Wikipedia Citation Opportunities (DR 98)
                </h2>
                <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
                  Update an outdated figure on Wikipedia, then paste the ready-made{' '}
                  <code style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                    &lt;ref&gt;
                  </code>{' '}
                  citation snippet below.
                </p>
              </div>

              <button
                onClick={handleScanWikipedia}
                disabled={wikiScanning}
                style={btnPrimaryStyle}
              >
                <RefreshCw size={14} />
                <span>
                  {wikiScanning ? 'Scanning Live Wikipedia API...' : 'Scan Live Wikipedia API Now'}
                </span>
              </button>
            </div>

            {WIKIPEDIA_CITATIONS.map((w) => {
              const stat = wikiStats[w.id];
              return (
                <div
                  key={w.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    border: '1.5px solid #e2e8f0',
                    padding: '20px 24px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#0f172a',
                            color: '#ffffff',
                            fontSize: '11px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                          }}
                        >
                          {w.lang}.wikipedia.org
                        </span>
                        <strong style={{ fontSize: '16px', color: '#0f172a' }}>{w.title}</strong>
                      </div>
                      <div style={{ fontSize: '13px', color: '#475569' }}>{w.topic}</div>
                      {stat?.scanned && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0b2b5c', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>
                            External Links: {stat.externalLinksCount}
                          </span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#92400e', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '6px' }}>
                            Outdated Year Mentions: {stat.outdatedYears}
                          </span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#166534', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '6px' }}>
                            Citation/Dead Tags: {(stat.citationNeededCount || 0) + (stat.deadLinkCount || 0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      <button
                        onClick={() => copyText(w.citeWebSnippet, `wref-${w.id}`)}
                        style={btnPrimaryStyle}
                      >
                        <Copy size={14} />
                        <span>
                          {copiedId === `wref-${w.id}`
                            ? 'Copied <ref> Citation!'
                            : 'Copy <ref>{{cite web}}</ref>'}
                        </span>
                      </button>
                      <button
                        onClick={() => copyText(w.externalLinkSnippet, `wext-${w.id}`)}
                        style={btnSecondaryStyle}
                      >
                        <Copy size={14} />
                        <span>
                          {copiedId === `wext-${w.id}` ? 'Copied Bullet!' : 'Copy External Link'}
                        </span>
                      </button>
                      <a
                        href={w.editUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={btnSecondaryStyle}
                      >
                        <span>Edit on Wikipedia</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                  <pre
                    style={{
                      backgroundColor: '#0f172a',
                      color: '#f8fafc',
                      padding: '14px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      overflowX: 'auto',
                      margin: 0,
                    }}
                  >
                    {w.citeWebSnippet}
                  </pre>
                </div>
              );
            })}
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: ACADEMIC OPEN DATASETS & GITHUB GIST */}
        {/* ==================================================================== */}
        {activeTab === 'datasets' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 1-Click GitHub Gist Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1.5px solid #e2e8f0',
                padding: '24px',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
                🚀 1-Click Auto-Publish Open Datasets to GitHub Gist (DR 96)
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 16px' }}>
                Publishes all Nepal Land & Income Tax reference tables to a public GitHub Gist linking back to{' '}
                <code style={{ backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                  https://nepalicalc.com
                </code>
                .
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {!hasGithubEnv && (
                  <input
                    type="password"
                    value={githubTokenInput}
                    onChange={(e) => setGithubTokenInput(e.target.value)}
                    placeholder="Paste GitHub Token with `gist` scope (github.com/settings/tokens)"
                    style={{
                      flex: '1 1 320px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '13px',
                    }}
                  />
                )}
                <button
                  onClick={handlePublishGist}
                  disabled={gistStatus.loading}
                  style={btnPrimaryStyle}
                >
                  <Send size={14} />
                  <span>
                    {gistStatus.loading ? 'Publishing Gist...' : 'Publish Public GitHub Gist Now'}
                  </span>
                </button>
              </div>

              {gistStatus.msg && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    borderRadius: '10px',
                    backgroundColor: gistStatus.isError ? '#fef2f2' : '#f0fdf4',
                    border: `1px solid ${gistStatus.isError ? '#fecaca' : '#bbf7d0'}`,
                    color: gistStatus.isError ? '#b91c1c' : '#166534',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  {gistStatus.msg}{' '}
                  {gistStatus.url && (
                    <a
                      href={gistStatus.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', fontWeight: 800, textDecoration: 'underline', marginLeft: '6px' }}
                    >
                      View Live GitHub Gist ↗
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Downloadable Dataset Cards */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1.5px solid #e2e8f0',
                padding: '24px',
              }}
            >
              <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
                Download Dataset Files for Zenodo (CERN DR 91) & Kaggle (DR 90)
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: '0 0 20px' }}>
                Download these 4 files straight from your browser and drag-and-drop them into Zenodo.org or Kaggle Datasets.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '16px',
                }}
              >
                {DATASET_FILES.map((file) => (
                  <div
                    key={file.filename}
                    style={{
                      padding: '18px',
                      borderRadius: '14px',
                      border: '1.5px solid #e2e8f0',
                      backgroundColor: '#f8fafc',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 800, color: '#0b2b5c', marginBottom: '6px' }}>
                        {file.filename}
                      </div>
                      <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                        {file.description}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => downloadFile(file.filename, file.content, file.mimeType)}
                        style={btnPrimaryStyle}
                      >
                        <Download size={14} />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => copyText(file.content, `ds-${file.filename}`)}
                        style={btnSecondaryStyle}
                      >
                        <Copy size={14} />
                        <span>{copiedId === `ds-${file.filename}` ? 'Copied!' : 'Copy Raw'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
