import type { ThemeDefinition } from './types';

/**
 * The original kanaksan.com Tamil daily sheet design — frozen per project
 * decision (see template.html / tamil-daily-sheet-preview.html). Do not
 * change these values without explicit sign-off; register a new named
 * theme instead (see `registerTheme` in `./index.ts`).
 */
export const defaultTheme: ThemeDefinition = {
  light: {
    bg: '#ffffff',
    page: '#f4f3ee',
    border: 'rgba(0, 0, 0, 0.12)',
    text: '#1d1d1b',
    textSecondary: '#5f5e5a',
    textTertiary: '#8a8a85',
    info: '#185fa5',
    success: '#0f6e56',
    danger: '#a32d2d',
    warningBg: '#faeeda',
    warningText: '#854f0b',
  },
  dark: {
    bg: '#2b2a28',
    page: '#1a1917',
    border: 'rgba(255, 255, 255, 0.14)',
    text: '#ededeb',
    textSecondary: '#b4b2a9',
    textTertiary: '#8a8985',
    info: '#85b7eb',
    success: '#5dcaa5',
    danger: '#f09595',
    warningBg: '#412402',
    warningText: '#fac775',
  },
};
