import type { CalendarLocale } from '../types/props';

/** The API's data values exist in exactly two scripts. */
export type DataLocale = 'ta' | 'en';

/**
 * Maps a UI locale to the script used for data values: Tamil UI shows Tamil
 * data; every other language shows English data (the API is bilingual only).
 */
export function dataLocale(locale: CalendarLocale): DataLocale {
  return locale === 'ta' ? 'ta' : 'en';
}
