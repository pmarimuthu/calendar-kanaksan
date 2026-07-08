import { useTranslation } from 'react-i18next';
import { AuspiciousIcon } from '../icons/CalendarIcons';
import { useIstNow, isIstToday, isActiveRange } from '../../utils/timeWindows';
import type { PanchangamData } from '../../types/panchangam';
import type { CalendarLocale } from '../../types/props';

export interface AuspiciousTimesProps {
  data: PanchangamData;
  locale: CalendarLocale;
}

/** நல்ல நேரம் cell: stacked நல்ல நேரம் + கௌரி நல்ல நேரம், each with morning/evening times. */
export function AuspiciousTimes({ data, locale }: AuspiciousTimesProps) {
  const { t } = useTranslation();
  const now = useIstNow();
  const today = isIstToday(data.date, now);

  const isActive = (item: { morning: { en: string }; evening: { en: string } }) =>
    today &&
    (isActiveRange(item.morning.en, 'morning', now) ||
      isActiveRange(item.evening.en, 'evening', now));

  const nallaActive = isActive(data.auspicious_times);
  const gowriActive = isActive(data.gowri_nalla_neram);

  return (
    <section className="tdscal-cell">
      <div className="tdscal-au-title">
        <AuspiciousIcon />
        {t('section.auspicious')}
      </div>

      <div className="tdscal-au-item">
        <div className={`tdscal-au-label${nallaActive ? ' tdscal-now-good' : ''}`}>{t('label.nallaNeram')}</div>
        <div className="tdscal-au-times">
          <span>{data.auspicious_times.morning[locale]}</span>
          <span>{data.auspicious_times.evening[locale]}</span>
        </div>
      </div>

      <div className="tdscal-au-item">
        <div className={`tdscal-au-label${gowriActive ? ' tdscal-now-good' : ''}`}>{t('label.gowriNallaNeram')}</div>
        <div className="tdscal-au-times">
          <span>{data.gowri_nalla_neram.morning[locale]}</span>
          <span>{data.gowri_nalla_neram.evening[locale]}</span>
        </div>
      </div>
    </section>
  );
}
