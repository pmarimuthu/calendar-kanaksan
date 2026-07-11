import { I18nextProvider } from 'react-i18next';
import { useCalendarData } from '../../hooks/useCalendarData';
import { useCalendarI18n } from '../../hooks/useCalendarI18n';
import { useTheme } from '../../hooks/useTheme';
import { ThemeContextProvider } from '../../context/ThemeContext';
import { SheetHeader } from '../SheetHeader/SheetHeader';
import { AuspiciousTimes } from '../AuspiciousTimes/AuspiciousTimes';
import { InauspiciousTimes } from '../InauspiciousTimes/InauspiciousTimes';
import { PanchangamDetails } from '../PanchangamDetails/PanchangamDetails';
import { LoadingState, ErrorState } from '../CalendarStatus/CalendarStatus';
import type { TamilCalendarProps } from '../../types/props';
import '../../styles/calendar.css';

const DEFAULT_BASE_URL = 'https://calendar.kanaksan.com/json';
const DEFAULT_DEITY_URL = 'https://calendar.kanaksan.com/deities';

/**
 * Renders the kanaksan.com Tamil daily panchangam sheet.
 *
 * Data source is auto-detected:
 * - `apiUrl` provided → fetches from REST API using `apiKey`
 * - `apiUrl` omitted  → reads static JSON files from `baseUrl`
 *                       (defaults to https://calendar.kanaksan.com/json)
 *
 * `mode`, `theme`, and `locale` can all change at runtime — no remount needed.
 */
export function TamilCalendar({
  apiUrl,
  apiKey,
  baseUrl = DEFAULT_BASE_URL,
  date,
  mode = 'dark',
  theme,
  locale = 'ta',
  deityImageBaseUrl = DEFAULT_DEITY_URL,
  className,
}: TamilCalendarProps) {
  const i18nInstance = useCalendarI18n(locale);
  const { tokens, style } = useTheme(mode, theme);
  const { state, refetch } = useCalendarData({ apiUrl, apiKey, baseUrl, date });

  const rootClassName = ['tdscal-root', `tdscal-mode-${mode}`, className].filter(Boolean).join(' ');

  return (
    <I18nextProvider i18n={i18nInstance}>
      <ThemeContextProvider value={{ mode, tokens }}>
        <div className={rootClassName} style={style}>
          {state.status === 'loading' && <LoadingState />}
          {state.status === 'error' && <ErrorState onRetry={refetch} />}
          {state.status === 'success' && (
            <div className="tdscal-card">
              <SheetHeader data={state.data} locale={locale} deityImageBaseUrl={deityImageBaseUrl} />
              <div className="tdscal-row">
                <AuspiciousTimes data={state.data} locale={locale} />
                <InauspiciousTimes data={state.data} />
              </div>
              <PanchangamDetails data={state.data} locale={locale} />
            </div>
          )}
        </div>
      </ThemeContextProvider>
    </I18nextProvider>
  );
}