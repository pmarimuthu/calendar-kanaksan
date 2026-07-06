export { TamilCalendar } from './components/TamilCalendar/TamilCalendar';

export { registerTheme, getRegisteredTheme, listRegisteredThemes, defaultTheme } from './themes';
export type { ThemeTokens, ThemeDefinition } from './themes/types';

export { useThemeContext } from './context/ThemeContext';
export type { ThemeContextValue } from './context/ThemeContext';

export type { TamilCalendarProps, CalendarMode, CalendarLocale, CalendarSource } from './types/props';
export { toLocalJsonPath } from './utils/dateUtils';
export type {
  PanchangamData,
  BilingualText,
  PanchangamCore,
  Timings,
  AuspiciousRange,
  InauspiciousWindow,
  InauspiciousTimes,
} from './types/panchangam';
