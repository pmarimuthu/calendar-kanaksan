import { useEffect, useRef } from 'react';
import { createCalendarI18n } from '../i18n';
import type { CalendarLocale } from '../types/props';

/**
 * Owns the lifecycle of this component's isolated i18next instance.
 * Created once per mount; kept in sync with the `locale` prop afterwards
 * via `changeLanguage` rather than being recreated on every render.
 */
export function useCalendarI18n(locale: CalendarLocale) {
  const instanceRef = useRef(createCalendarI18n(locale));

  useEffect(() => {
    if (instanceRef.current.language !== locale) {
      void instanceRef.current.changeLanguage(locale);
    }
  }, [locale]);

  return instanceRef.current;
}
