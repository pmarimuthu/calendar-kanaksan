/**
 * Data contract returned by the panchangam REST API for a single day.
 * Mirrors the JSON produced by the calendar-extractor pipeline
 * (kanaksan.com Tamil daily calendar). Keep this in sync with that source —
 * it is the API the component is built against.
 */

/** A label/value pair carried in both English and Tamil. */
export interface BilingualText {
  en: string;
  ta: string;
}

export interface PanchangamCore {
  tithi: BilingualText;
  nakshatra: BilingualText;
  lagnam: BilingualText;
  /** Not currently rendered by the calendar (kept for API completeness). */
  karanam: BilingualText;
}

export interface Timings {
  sunrise: BilingualText;
}

/** A morning/evening pair of auspicious time ranges (already formatted strings). */
export interface AuspiciousRange {
  morning: BilingualText;
  evening: BilingualText;
}

/** A single inauspicious period's morning/evening window (locale-neutral, digits only). */
export interface InauspiciousWindow {
  morning: string;
  evening: string;
}

export interface InauspiciousTimes {
  rahu: InauspiciousWindow;
  gulikai: InauspiciousWindow;
  emagandam: InauspiciousWindow;
}

export interface PanchangamData {
  /** Gregorian date as "d-m-yyyy", e.g. "1-6-2026". */
  date: string;
  day: BilingualText;
  tamil_month: BilingualText;
  tamil_date: string;
  tamil_year: BilingualText;
  /** Extracted for completeness; not rendered in the frozen layout. */
  islamic_date?: BilingualText;
  paksha: BilingualText;
  panchangam: PanchangamCore;
  timings: Timings;
  auspicious_times: AuspiciousRange;
  gowri_nalla_neram: AuspiciousRange;
  inauspicious_times: InauspiciousTimes;
  soolam: BilingualText;
  pariharam: BilingualText;
  chandrashtamam: BilingualText;
}
