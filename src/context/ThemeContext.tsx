import { createContext, useContext } from 'react';
import type { CalendarMode } from '../types/props';
import type { ThemeTokens } from '../themes/types';

export interface ThemeContextValue {
  mode: CalendarMode;
  tokens: ThemeTokens;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeContextProvider = ThemeContext.Provider;

/** Lets any nested section read the resolved mode/tokens without prop drilling. */
export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useThemeContext must be used within <TamilCalendar />');
  }
  return ctx;
}
