import type { ThemeTokens } from '../themes/types';

export type CalendarMode = 'dark' | 'light';
export type CalendarLocale =
  | 'ta' | 'en' | 'hi' | 'te' | 'kn' | 'ml' | 'mr' | 'bn' | 'gu' | 'pa'
  | 'fr' | 'ms' | 'si';

export interface TamilCalendarProps {
  /**
   * REST endpoint returning a single day's PanchangamData as JSON.
   * When provided, the component fetches live data from this URL.
   * When omitted, the component reads pre-generated static JSON files from `baseUrl`.
   */
  apiUrl?: string;
  /** Sent as the `x-api-key` request header. Required when `apiUrl` is provided. */
  apiKey?: string;
  /**
   * Root URL serving the pre-generated dated JSON tree.
   * Defaults to 'https://calendar.kanaksan.com/json'.
   * Only used when `apiUrl` is not provided.
   */
  baseUrl?: string;
  /**
   * The day to fetch/display. Accepts a Date or an ISO-ish "YYYY-MM-DD" string.
   * Defaults to the current date in IST.
   */
  date?: Date | string;
  /** Built-in dark/light mode. Defaults to "dark". */
  mode?: CalendarMode;
  /**
   * Extension point for dynamic theming: either the name of a theme registered
   * via `registerTheme`, or a token object applied ad-hoc. Defaults to the
   * built-in "default" theme matching the original kanaksan.com design.
   */
  theme?: string | ThemeTokens;
  /**
   * UI label language. Defaults to "ta". Data values from the API are
   * bilingual (ta/en) only: "ta" shows Tamil values, every other locale
   * shows English values with localized labels.
   */
  locale?: CalendarLocale;
  /**
   * Root URL serving weekday deity images named `{weekday}.webp`.
   * Defaults to 'https://calendar.kanaksan.com/deities'.
   * Pass an empty string to disable the deity image entirely.
   */
  deityImageBaseUrl?: string;
  /** Extra class name applied to the component's root element. */
  className?: string;
}