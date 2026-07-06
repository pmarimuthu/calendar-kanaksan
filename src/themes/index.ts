import { defaultTheme } from './default';
import type { ThemeDefinition, ThemeTokens } from './types';
import type { CalendarMode } from '../types/props';

const registry = new Map<string, ThemeDefinition>([['default', defaultTheme]]);

/**
 * Registers a named theme (light + dark token pair) so consumers can later
 * select it via `<TamilCalendar theme="myTheme" />`. Intended to be called
 * once, at app startup, before the component renders. This is the extension
 * point for dynamic theme switching beyond the built-in dark/light mode.
 */
export function registerTheme(name: string, definition: ThemeDefinition): void {
  registry.set(name, definition);
}

export function getRegisteredTheme(name: string): ThemeDefinition | undefined {
  return registry.get(name);
}

export function listRegisteredThemes(): string[] {
  return Array.from(registry.keys());
}

/**
 * Resolves the effective token set for the given `theme` + `mode` combination.
 * `theme` may be: a registered theme's name, a literal token object (applied
 * as-is, overriding mode), or undefined (falls back to the built-in default).
 */
export function resolveThemeTokens(
  theme: string | ThemeTokens | undefined,
  mode: CalendarMode,
): ThemeTokens {
  if (theme && typeof theme === 'object') {
    return theme;
  }
  const definition = registry.get(theme ?? 'default') ?? defaultTheme;
  return definition[mode];
}

export { defaultTheme };
export type { ThemeDefinition, ThemeTokens };
