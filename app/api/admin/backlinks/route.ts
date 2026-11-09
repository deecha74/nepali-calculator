import { NextRequest, NextResponse } from 'next/server';
import {
  AUTHORITY_ARTICLES,
  DATASET_FILES,
  SITE_URL,
  WIKIPEDIA_CITATIONS,
} from '@/lib/seo/backlinkCampaignData';

const DEFAULT_ADMIN_KEY = 'nepalicalc-admin-2083';

function isAuthorized(req: NextRequest): boolean {
  const configuredKey = (process.env.ADMIN_BACKLINK_KEY || DEFAULT_ADMIN_KEY).trim();
  const providedKey = (req.headers.get('x-admin-key') || '').trim();
  return Boolean(providedKey && providedKey === configuredKey);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { authorized: false, error: 'Invalid admin passkey.' },
      { status: 401, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
    );
  }

  return NextResponse.json(
    {
      authorized: true,
      hasDevtoEnv: Boolean(process.env.DEVTO_API_KEY),
      hasGithubEnv: Boolean(process.env.GITHUB_TOKEN),
    },
    { headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
  );
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { authorized: false, error: 'Unauthorized. Invalid admin passkey.' },
      { status: 401, headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
    );
  }

  try {
    const body = await req.json();
    const action = body?.action;

    // 1. Live Wikipedia Citation & Dead-Link API Scanner
    if (action === 'scan_wikipedia') {
      const scanResults = await Promise.all(
        WIKIPEDIA_CITATIONS.map(async (item) => {
          const apiUrl = `https://${item.lang}.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(
            item.title
          )}&prop=wikitext|externallinks&format=json`;
          try {
            const res = await fetch(apiUrl, {
              headers: {
                'User-Agent': 'NepaliCalcResearchBot/1.0 (https://nepalicalc.com; info@nepalicalc.com)',
              },
              cache: 'no-store',
            });
            if (!res.ok) {
              return { id: item.id, scanned: false };
            }
            const data = await res.json();
            const wikitext: string = data?.parse?.wikitext?.['*'] || '';
            const extLinks: string[] = data?.parse?.externallinks || [];

            const deadLinkCount = (
              wikitext.match(/\{\{\s*(dead link|cbignore|broken link)/gi) || []
            ).length;
            const citationNeededCount = (
              wikitext.match(/\{\{\s*(citation needed|cn|fact)/gi) || []
            ).length;
            const outdatedYears = (
              wikitext.match(/201[5-9]|202[0-3]|207[5-9]|2080/g) || []
            ).length;

            return {
              id: item.id,
              scanned: true,
              externalLinksCount: extLinks.length,
              deadLinkCount,
              citationNeededCount,
              outdatedYears,
            };
          } catch {
            return { id: item.id, scanned: false };
          }
        })
      );

      return NextResponse.json({ ok: true, results: scanResults });
    }

    // 2. Publish Safe Draft to Dev.to with canonical_url
    if (action === 'publish_devto') {
      const apiKey = (body?.devtoApiKey || process.env.DEVTO_API_KEY || '').trim();
      if (!apiKey) {
        return NextResponse.json(
          {
            ok: false,
            error:
              'Missing Dev.to API Key. Paste your Dev.to key in the input box or set DEVTO_API_KEY in .env.local.',
          },
          { status: 400 }
        );
      }

      const articleId = body?.articleId || 'art-2-bs-engine';
      const article =
        AUTHORITY_ARTICLES.find((a) => a.id === articleId) || AUTHORITY_ARTICLES[1];

      const res = await fetch('https://dev.to/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify({
          article: {
            title: article.title,
            body_markdown: article.cleanBodyMarkdown,
            published: false,
            canonical_url: article.canonicalUrl,
            tags: article.tags.slice(0, 4),
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: data?.error || JSON.stringify(data) },
          { status: res.status }
        );
      }

      return NextResponse.json({
        ok: true,
        message: 'Draft created safely on Dev.to with canonical_url pointing to NepaliCalc!',
        url: data?.url || 'https://dev.to/dashboard',
      });
    }

    // 3. Publish Public Open-Data Gist on GitHub (DR 96)
    if (action === 'publish_gist') {
      const token = (body?.githubToken || process.env.GITHUB_TOKEN || '').trim();
      if (!token) {
        return NextResponse.json(
          {
            ok: false,
            error:
              'Missing GitHub Personal Access Token. Paste a token (with `gist` scope) in the input box or set GITHUB_TOKEN in .env.local.',
          },
          { status: 400 }
        );
      }

      const filesPayload: Record<string, { content: string }> = {};
      for (const f of DATASET_FILES) {
        filesPayload[f.filename === 'README.md' ? '01-NepaliCalc-Open-Datasets.md' : f.filename] = {
          content: f.content,
        };
      }

      const res = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'User-Agent': 'NepaliCalc-Backlink-Hub',
        },
        body: JSON.stringify({
          description: `Official Nepal Statutory Income Tax (2083 BS) & Customary Land Measurement (Ropani/Bigha) Reference Datasets — Powered by ${SITE_URL}`,
          public: true,
          files: filesPayload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: data?.message || JSON.stringify(data) },
          { status: res.status }
        );
      }

      return NextResponse.json({
        ok: true,
        message: 'Published public Open-Data Gist on DR 96 gist.github.com!',
        url: data?.html_url,
      });
    }

    return NextResponse.json({ ok: false, error: 'Unknown action.' }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

