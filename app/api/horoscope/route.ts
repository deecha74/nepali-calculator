import { NextRequest, NextResponse } from 'next/server';
import { TODAY_RASHIFAL, RashiItem } from '@/lib/rashifalData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestedSign = (searchParams.get('sign') || 'all').toLowerCase();

  const validSigns = [
    'aries', 'taurus', 'gemini', 'cancer',
    'leo', 'virgo', 'libra', 'scorpio',
    'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  // Helper to fetch single sign from Free Horoscope API
  async function fetchExternalHoroscope(sign: string): Promise<string | null> {
    try {
      const res = await fetch(`https://freehoroscopeapi.com/api/v1/get-horoscope/daily?sign=${sign}`, {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const json = await res.json();
      return json?.data?.horoscope || null;
    } catch (err) {
      return null;
    }
  }

  // If specific sign requested
  if (requestedSign !== 'all' && validSigns.includes(requestedSign)) {
    const fallbackItem = TODAY_RASHIFAL.find((r) => r.id === requestedSign) || TODAY_RASHIFAL[0];
    const liveText = await fetchExternalHoroscope(requestedSign);

    const result = {
      ...fallbackItem,
      livePredictionEng: liveText || fallbackItem.predictionEng,
      isLiveApi: Boolean(liveText),
      apiSource: liveText ? 'Free Horoscope API (Realtime Live)' : 'NepalCalc Vedic Almanac',
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      sign: requestedSign,
      data: result,
    });
  }

  // If all signs requested or fallback
  const results = await Promise.all(
    TODAY_RASHIFAL.map(async (rashi) => {
      let liveText: string | null = null;
      // Fetch for first few or individual when requested
      if (['aries', 'taurus', 'gemini'].includes(rashi.id)) {
        liveText = await fetchExternalHoroscope(rashi.id);
      }
      return {
        ...rashi,
        livePredictionEng: liveText || rashi.predictionEng,
        isLiveApi: Boolean(liveText),
        apiSource: liveText ? 'Free Horoscope API (Realtime Live)' : 'NepalCalc Vedic Almanac',
      };
    })
  );

  return NextResponse.json({
    success: true,
    count: results.length,
    data: results,
    lastUpdated: new Date().toISOString(),
  });
}
