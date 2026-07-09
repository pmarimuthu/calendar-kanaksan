import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { InauspiciousIcon } from '../icons/CalendarIcons';
import { useIstNow, isIstToday, isActiveWindow, formatWindowAmPm } from '../../utils/timeWindows';
import type { PanchangamData } from '../../types/panchangam';

export interface InauspiciousTimesProps {
  data: PanchangamData;
}

/** தவிர்க்க வேண்டிய நேரம் cell — fixed order: இராகு காலம் → எமகண்டம் → குளிகை. */
export function InauspiciousTimes({ data }: InauspiciousTimesProps) {
  const { t } = useTranslation();
  const now = useIstNow();
  const today = isIstToday(data.date, now);

  const rows = [
    { key: 'rahu', label: t('label.rahu'), window: data.inauspicious_times.rahu },
    { key: 'emagandam', label: t('label.emagandam'), window: data.inauspicious_times.emagandam },
    { key: 'gulikai', label: t('label.gulikai'), window: data.inauspicious_times.gulikai },
  ];

  return (
    <section className="tdscal-cell">
      <div className="tdscal-ia-title">
        <InauspiciousIcon />
        {t('section.inauspicious')}
      </div>
      <div className="tdscal-ia-grid">
        {rows.map((row) => (
          <Fragment key={row.key}>
            <span
              className={`tdscal-ia-label${
                today && isActiveWindow(row.window.morning, row.window.evening, now)
                  ? ' tdscal-now-avoid'
                  : ''
              }`}
            >
              {row.label}
            </span>
            <span className="tdscal-ia-time">
              {formatWindowAmPm(row.window.morning, row.window.evening)}
            </span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
