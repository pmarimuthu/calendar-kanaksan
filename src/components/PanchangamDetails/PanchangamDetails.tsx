import { useTranslation } from 'react-i18next';
import type { PanchangamData } from '../../types/panchangam';
import type { CalendarLocale } from '../../types/props';

export interface PanchangamDetailsProps {
  data: PanchangamData;
  locale: CalendarLocale;
}

/** Bottom 2x3 details grid — frozen order: திதி, நட்சத்திரம், லக்னம், சந்திராஷ்டமம், சூலம், பரிகாரம். */
export function PanchangamDetails({ data, locale }: PanchangamDetailsProps) {
  const { t } = useTranslation();

  const items = [
    { key: 'tithi', label: t('label.tithi'), value: data.panchangam.tithi[locale] },
    { key: 'nakshatra', label: t('label.nakshatra'), value: data.panchangam.nakshatra[locale] },
    { key: 'lagnam', label: t('label.lagnam'), value: data.panchangam.lagnam[locale] },
    { key: 'chandrashtamam', label: t('label.chandrashtamam'), value: data.chandrashtamam[locale] },
    { key: 'soolam', label: t('label.soolam'), value: data.soolam[locale] },
    { key: 'pariharam', label: t('label.pariharam'), value: data.pariharam[locale] },
  ];

  return (
    <section className="tdscal-pd">
      {items.map((item) => (
        <div className="tdscal-pd-item" key={item.key}>
          <div className="tdscal-pd-label">{item.label}</div>
          <div className="tdscal-pd-value">{item.value}</div>
        </div>
      ))}
    </section>
  );
}
