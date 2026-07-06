import i18next, { type i18n as I18nInstance } from 'i18next';
import ta from './locales/ta/translation.json';
import en from './locales/en/translation.json';
import type { CalendarLocale } from '../types/props';

const resources = {
  ta: { translation: ta },
  en: { translation: en },
} as const;

/**
 * Creates a standalone i18next instance scoped to this component.
 * Deliberately does NOT touch the global i18next default export, so the
 * library can't collide with (or be reconfigured by) a host app's own
 * i18next setup. Resources are bundled, so init resolves synchronously.
 */
export function createCalendarI18n(locale: CalendarLocale = 'ta'): I18nInstance {
  const instance = i18next.createInstance();
  // Resources are bundled (no backend/language-detector plugin), so init()
  // resolves on the current tick: t() is safe to call right after this
  // returns, with no flash of untranslated keys on first render.
  void instance.init({
    lng: locale,
    fallbackLng: 'ta',
    resources,
    interpolation: { escapeValue: false },
    returnObjects: true,
    nsSeparator: false,
  });
  return instance;
}

export type { CalendarLocale };
