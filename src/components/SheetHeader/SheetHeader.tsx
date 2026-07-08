import { useTranslation } from 'react-i18next';
import { SunriseIcon } from '../icons/CalendarIcons';
import { DayDeity } from '../DayDeity/DayDeity';
import { parseApiDate } from '../../utils/dateUtils';
import { useIstNow, isIstToday, isSunriseActive } from '../../utils/timeWindows';
import type { PanchangamData } from '../../types/panchangam';
import type { CalendarLocale } from '../../types/props';

export interface SheetHeaderProps {
  data: PanchangamData;
  locale: CalendarLocale;
  /** Root URL for weekday deity images; omit to hide the image. */
  deityImageBaseUrl?: string;
}

/** Date box + weekday/Tamil-date/sunrise meta block at the top of the sheet. */
export function SheetHeader({ data, locale, deityImageBaseUrl }: SheetHeaderProps) {
  const { t } = useTranslation();
  const now = useIstNow();
  const sunriseNow = isIstToday(data.date, now) && isSunriseActive(data.timings.sunrise.en, now);
  const { day, month, year } = parseApiDate(data.date);
  const months = t('months', { returnObjects: true }) as string[];
  const monthName = months[month - 1] ?? '';

  return (
    <header className="tdscal-header">
      <div className="tdscal-header-date">
        <div className="tdscal-header-day">{day}</div>
        <div className="tdscal-header-month">
          {monthName} {year}
        </div>
      </div>
      <div className="tdscal-header-meta">
        <div className="tdscal-header-weekday">{data.day[locale]}</div>
        <div className="tdscal-header-tamil">
          {data.tamil_month[locale]} {data.tamil_date} &middot; {data.tamil_year[locale]} {t('label.year')}
        </div>
        <div className={`tdscal-header-sunrise${sunriseNow ? ' tdscal-sunrise-now' : ''}`}>
          <SunriseIcon />
          {t('label.sunrise')} &middot; {data.timings.sunrise[locale]}
        </div>
      </div>
      {deityImageBaseUrl && (
        <DayDeity day={data.day.en} baseUrl={deityImageBaseUrl} alt={data.day[locale]} />
      )}
    </header>
  );
}
