import type { ThemeTokens } from '../themes/types';

export type CalendarMode = 'dark' | 'light';
export type CalendarLocale = 'ta' | 'en';
/**
 * "rest" — fetch from `apiUrl` (the eventual REST API, with `apiKey`).
 * "local" — read pre-generated JSON files under `baseUrl`, following the
 * calendar-extractor pipeline's `{yyyy}/{MM}-{yyyy}/{dd}-{MMM}-{yyyy}.json`
 * layout. Stopgap until the REST API is live; switch back by changing this
 * one prop.
 */
export type CalendarSource = 'rest' | 'local';

export interface TamilCalendarProps {
  /** Data source. Defaults to "rest". */
  source?: CalendarSource;
  /** REST endpoint that returns a single day's PanchangamData as JSON. Required when `source` is "rest". */
  apiUrl?: string;
  /** Sent as the `x-api-key` request header. Required when `source` is "rest". */
  apiKey?: string;
  /** Root URL the dated JSON tree is served from. Required when `source` is "local". */
  baseUrl?: string;
  /**
   * The day to fetch/display. Accepts a Date or an ISO-ish "YYYY-MM-DD" string.
   * Defaults to the current system date.
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
  /** UI label language. Defaults to "ta". Field data itself is always bilingual. */
  locale?: CalendarLocale;
  /**
   * Root URL serving weekday deity images named `{weekday}.webp` (lowercase
   * english weekday, e.g. `/deities/sunday.webp`). When omitted, no deity
   * image is rendered.
   */
  deityImageBaseUrl?: string;
  /** Extra class name applied to the component's root element. */
  className?: string;
}
