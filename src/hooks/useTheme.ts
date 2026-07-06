import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { resolveThemeTokens } from '../themes';
import { themeTokensToCssVariables } from '../themes/cssVariables';
import type { CalendarMode } from '../types/props';
import type { ThemeTokens } from '../themes/types';

export interface UseThemeResult {
  mode: CalendarMode;
  tokens: ThemeTokens;
  /** Spread onto the root element so `--tds-*` vars cascade to every section. */
  style: CSSProperties;
}

/**
 * Resolves the active theme tokens for the given mode/theme combination and
 * derives the inline CSS-variable style object for them. Memoized so the
 * style object is stable across re-renders unless mode/theme actually change.
 */
export function useTheme(mode: CalendarMode, theme?: string | ThemeTokens): UseThemeResult {
  const tokens = useMemo(() => resolveThemeTokens(theme, mode), [theme, mode]);
  const style = useMemo(() => themeTokensToCssVariables(tokens), [tokens]);
  return { mode, tokens, style };
}
