import { useTranslation } from 'react-i18next';
import type { PanchangamData } from '../../types/panchangam';
import type { CalendarLocale } from '../../types/props';
import { dataLocale } from '../../utils/dataLocale';
import { translateValue } from '../../utils/translateValue';

export interface PanchangamDetailsProps {
  data: PanchangamData;
  locale: CalendarLocale;
}

/** Bottom 2x3 details grid — frozen order: திதி, நட்சத்திரம், லக்னம், சந்திராஷ்டமம், சூலம், பரிகாரம். */
export function PanchangamDetails({ data, locale }: PanchangamDetailsProps) {
  const { t } = useTranslation();
  const dl = dataLocale(locale);
  const tv = (v: string) => translateValue(v, locale);

  const items = [
    { key: 'tithi', label: t('label.tithi'), value: tv(data.panchangam.tithi[dl]) },
    { key: 'nakshatra', label: t('label.nakshatra'), value: tv(data.panchangam.nakshatra[dl]) },
    { key: 'lagnam', label: t('label.lagnam'), value: tv(data.panchangam.lagnam[dl]) },
    { key: 'chandrashtamam', label: t('label.chandrashtamam'), value: tv(data.chandrashtamam[dl]) },
    { key: 'soolam', label: t('label.soolam'), value: tv(data.soolam[dl]) },
    { key: 'pariharam', label: t('label.pariharam'), value: tv(data.pariharam[dl]) },
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
