import { toNepaliDigits } from '@/lib/nepaliDate';
import { numberToNepaliWords } from '@/lib/rates/numberToWords';
import type { RowValues, Values } from './types';

export const BLANK = '……………………';

/** Value of a plain field, or a blank line when empty */
export function g(v: Values, k: string): string {
  const x = v[k];
  return typeof x === 'string' && x.trim() ? x.trim() : BLANK;
}

export function rows(v: Values, k: string): RowValues[] {
  const x = v[k];
  return Array.isArray(x) ? x : [];
}

export function r(row: RowValues, k: string): string {
  return row[k]?.trim() ? row[k].trim() : BLANK;
}

export const nd = (x: number | string) => toNepaliDigits(x);

/** 12,34,567 in Devanagari digits */
export function fmt(n: number): string {
  return toNepaliDigits(n.toLocaleString('en-IN'));
}

export function num(v: Values, k: string): number {
  const x = v[k];
  const n = typeof x === 'string' ? parseFloat(x.replace(/,/g, '')) : NaN;
  return Number.isFinite(n) ? n : 0;
}

/** "रु. १२,०००।- (अक्षरेपी बाह्र हजार रुपैयाँ मात्र)" */
export function money(n: number): string {
  if (!n) return `रु. ${BLANK}`;
  return `रु. ${fmt(n)}।- (अक्षरेपी ${numberToNepaliWords(n)})`;
}

export function dateNe(s: string): string {
  return s?.trim() ? nd(s.trim()) : BLANK;
}
