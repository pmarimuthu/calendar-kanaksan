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

/**
 * Renders the kanaksan.com Tamil daily panchangam sheet, fed by a REST API.
 *
 * - `mode` ("dark" default | "light") and `theme` (a registered theme name,
 *   or a literal token object) can both change at runtime — the component
 *   just re-resolves CSS variables, no remount needed.
 * - `locale` ("ta" default | "en") switches static section/label text;
 *   the underlying data is always bilingual and rendered per `locale` too.
 */
export function TamilCalendar({
  source = 'rest',
  apiUrl,
  apiKey,
  baseUrl,
  date,
  mode = 'dark',
  theme,
  locale = 'ta',
  deityImageBaseUrl,
  className,
}: TamilCalendarProps) {
  const i18nInstance = useCalendarI18n(locale);
  const { tokens, style } = useTheme(mode, theme);
  const { state, refetch } = useCalendarData({ source, apiUrl, apiKey, baseUrl, date });

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
