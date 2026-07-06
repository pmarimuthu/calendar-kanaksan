import type { CSSProperties } from 'react';
import type { ThemeTokens } from './types';

/** Maps a token set onto the `--tds-*` custom properties the stylesheets read. */
export function themeTokensToCssVariables(tokens: ThemeTokens): CSSProperties {
  return {
    '--tds-bg': tokens.bg,
    '--tds-page': tokens.page,
    '--tds-border': tokens.border,
    '--tds-text': tokens.text,
    '--tds-text-secondary': tokens.textSecondary,
    '--tds-text-tertiary': tokens.textTertiary,
    '--tds-info': tokens.info,
    '--tds-success': tokens.success,
    '--tds-danger': tokens.danger,
    '--tds-warning-bg': tokens.warningBg,
    '--tds-warning-text': tokens.warningText,
  } as CSSProperties;
}
