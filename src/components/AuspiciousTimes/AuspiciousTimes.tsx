import { useTranslation } from 'react-i18next';
import { AuspiciousIcon } from '../icons/CalendarIcons';
import { useIstNow, isIstToday, isActiveRange, formatRangeAmPm } from '../../utils/timeWindows';
import { dataLocale } from '../../utils/dataLocale';
import type { PanchangamData } from '../../types/panchangam';
import type { CalendarLocale } from '../../types/props';

export interface AuspiciousTimesProps {
  data: PanchangamData;
  locale: CalendarLocale;
}

/** நல்ல நேரம் cell: stacked நல்ல நேரம் + கௌரி நல்ல நேரம், each with morning/evening times. */
export function AuspiciousTimes({ data, locale }: AuspiciousTimesProps) {
  const { t } = useTranslation();
  const dl = dataLocale(locale);
  const now = useIstNow();
  const today = isIstToday(data.date, now);

  const isActive = (item: { morning: { en: string }; evening: { en: string } }) =>
    today &&
    (isActiveRange(item.morning.en, 'morning', now) ||
      isActiveRange(item.evening.en, 'evening', now));

  const nallaActive = isActive(data.auspicious_times);
  const gowriActive = isActive(data.gowri_nalla_neram);

  const renderRange = (raw: string, slot: 'morning' | 'evening') => {
    if (/^-+$/.test(raw.trim())) {
      // keep column alignment but show nothing
      return <span className="tdscal-blank">{raw}</span>;
    }
    return <span>{formatRangeAmPm(raw, slot)}</span>;
  };

  return (
    <section className="tdscal-cell">
      <div className="tdscal-au-title">
        <AuspiciousIcon />
        {t('section.auspicious')}
      </div>

      <div className="tdscal-au-item">
        <div className={`tdscal-au-label${nallaActive ? ' tdscal-now-good' : ''}`}>{t('label.nallaNeram')}</div>
        <div className="tdscal-au-times">
          {renderRange(data.auspicious_times.morning[dl], 'morning')}
          {renderRange(data.auspicious_times.evening[dl], 'evening')}
        </div>
      </div>

      <div className="tdscal-au-item">
        <div className={`tdscal-au-label${gowriActive ? ' tdscal-now-good' : ''}`}>{t('label.gowriNallaNeram')}</div>
        <div className="tdscal-au-times">
          {renderRange(data.gowri_nalla_neram.morning[dl], 'morning')}
          {renderRange(data.gowri_nalla_neram.evening[dl], 'evening')}
        </div>
      </div>
    </section>
  );
}
