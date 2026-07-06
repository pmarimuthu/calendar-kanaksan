/** Flat token set — one per `--tds-*` CSS variable used by the calendar's stylesheets. */
export interface ThemeTokens {
  bg: string;
  page: string;
  border: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  info: string;
  success: string;
  danger: string;
  warningBg: string;
  warningText: string;
}

/** A theme is a light/dark pair of token sets, selected via the `mode` prop. */
export interface ThemeDefinition {
  light: ThemeTokens;
  dark: ThemeTokens;
}
