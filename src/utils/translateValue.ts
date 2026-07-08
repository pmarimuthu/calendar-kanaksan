/**
 * Data-value localization. The API's value strings are English/Tamil-Latin
 * with many spelling variants (OCR noise: "Asubathi/Asupathi/Aswathi",
 * "Simha/Simma/Simba"...). Each locale ships a dictionary mapping every
 * known variant token to its native rendering; unknown tokens, numbers,
 * times and punctuation pass through unchanged, so a missed variant can
 * never break rendering.
 *
 * The "month" domain exists because tokens like "Chithirai"/"Karthigai" are
 * both Tamil months AND nakshatras — the tamil_month field must resolve to
 * the month sense.
 */
import type { CalendarLocale } from '../types/props';
import hi from '../i18n/values/hi.json';
import te from '../i18n/values/te.json';
import kn from '../i18n/values/kn.json';
import ml from '../i18n/values/ml.json';
import mr from '../i18n/values/mr.json';
import bn from '../i18n/values/bn.json';
import gu from '../i18n/values/gu.json';
import pa from '../i18n/values/pa.json';
import fr from '../i18n/values/fr.json';
import ms from '../i18n/values/ms.json';
import si from '../i18n/values/si.json';

export type ValueDomain = 'general' | 'month';
type ValueDict = Record<ValueDomain, Record<string, string>>;

const DICTS: Partial<Record<CalendarLocale, ValueDict>> = {
  hi, te, kn, ml, mr, bn, gu, pa, fr, ms, si,
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const regexCache = new Map<string, RegExp>();

function tokenRegex(locale: string, domain: ValueDomain, dict: Record<string, string>): RegExp {
  const cacheKey = `${locale}:${domain}`;
  let re = regexCache.get(cacheKey);
  if (!re) {
    const alternatives = Object.keys(dict)
      .sort((a, b) => b.length - a.length) // longest match wins
      .map(escapeRegExp)
      .join('|');
    re = new RegExp(`(?<![A-Za-z])(?:${alternatives})(?![A-Za-z])`, 'gi');
    regexCache.set(cacheKey, re);
  }
  re.lastIndex = 0;
  return re;
}

/**
 * Translates the word tokens of an API value string into `locale`'s script,
 * preserving numbers, times, punctuation and unknown tokens. Returns the
 * input unchanged for "ta" and "en" (the API is natively bilingual).
 */
export function translateValue(
  value: string,
  locale: CalendarLocale,
  domain: ValueDomain = 'general',
): string {
  if (!value || locale === 'ta' || locale === 'en') return value;
  const dicts = DICTS[locale];
  if (!dicts) return value;
  const dict = dicts[domain];
  const translated = value.replace(tokenRegex(locale, domain, dict), (match) => {
    return dict[match.toLowerCase()] ?? match;
  });
  // Values like "Vadakku (North)" translate both tokens to the same word —
  // collapse "X (X)" into "X".
  return translated.replace(/([^\s(][^()]*?)\s*\(\s*\1\s*\)/g, '$1');
}
