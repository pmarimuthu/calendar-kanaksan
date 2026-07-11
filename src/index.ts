
import type { CalendarLocale } from './types/props';

export const SUPPORTED_LOCALES: Array<{ code: CalendarLocale; label: string }> = [
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'fr', label: 'Français (French)' },
  { code: 'ms', label: 'Bahasa Melayu (Malay)' },
  { code: 'si', label: 'සිංහල (Sinhala)' },
];

export { TamilCalendar } from './components/TamilCalendar/TamilCalendar';
export { DayDeity } from './components/DayDeity/DayDeity';
export type { DayDeityProps } from './components/DayDeity/DayDeity';

export { registerTheme, getRegisteredTheme, listRegisteredThemes, defaultTheme } from './themes';
export type { ThemeTokens, ThemeDefinition } from './themes/types';

export { useThemeContext } from './context/ThemeContext';
export type { ThemeContextValue } from './context/ThemeContext';

export type { TamilCalendarProps, CalendarMode, CalendarLocale } from './types/props';
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