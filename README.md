# @kanaksan/tamil-calendar

React component that renders the kanaksan.com Tamil daily panchangam sheet
(date header, நல்ல நேரம் / தவிர்க்க வேண்டிய நேரம், and the 6-field details
grid), backed by a REST API you provide. Dark/light mode plus a pluggable
theme system are built in.

## Install

```bash
npm install @kanaksan/tamil-calendar
```

`react` and `react-dom` (^18.2.0 or ^19.0.0) are peer dependencies — the
consuming app supplies them. `i18next` / `react-i18next` are bundled
dependencies of this package and run on an isolated instance, so they won't
collide with any i18next setup the host app already has.

## Usage

```tsx
import { TamilCalendar } from '@kanaksan/tamil-calendar';
import '@kanaksan/tamil-calendar/style.css';

function App() {
  return (
    <TamilCalendar
      apiUrl="https://api.kanaksan.com/panchangam"
      apiKey={import.meta.env.VITE_PANCHANGAM_API_KEY}
      date="2026-06-20"   // optional — defaults to today
      mode="dark"         // optional — defaults to "dark"
      locale="ta"         // optional — defaults to "ta"
    />
  );
}
```

## Props

| Prop      | Type                              | Default      | Notes |
|-----------|-----------------------------------|--------------|-------|
| `apiUrl`  | `string`                          | required     | Endpoint returning one day's panchangam JSON. |
| `apiKey`  | `string`                          | required     | Sent as the `x-api-key` request header. |
| `date`    | `Date \| string`                  | current date | String form is `"YYYY-MM-DD"`. |
| `mode`    | `"dark" \| "light"`               | `"dark"`     | Selects the light/dark token pair of the active theme. |
| `theme`   | `string \| ThemeTokens`           | `"default"`  | A registered theme's name, or a literal token object. See Theming below. |
| `locale`  | `"ta" \| "en"`                    | `"ta"`       | Language for static section/field labels. |
| `className` | `string`                        | —            | Extra class on the root element. |

## REST API contract

The component issues:

```
GET {apiUrl}?date=YYYY-MM-DD
x-api-key: {apiKey}
Accept: application/json
```

and expects a JSON body shaped like:

```json
{
  "date": "1-6-2026",
  "day": { "en": "Monday", "ta": "திங்கள்" },
  "tamil_month": { "en": "Vaikasi", "ta": "வைகாசி" },
  "tamil_date": "18",
  "tamil_year": { "en": "Parabava", "ta": "பராபவ" },
  "paksha": { "en": "Krishna Paksha", "ta": "கிருஷ்ண பட்சம்" },
  "panchangam": {
    "tithi": { "en": "...", "ta": "..." },
    "nakshatra": { "en": "...", "ta": "..." },
    "lagnam": { "en": "...", "ta": "..." },
    "karanam": { "en": "...", "ta": "..." }
  },
  "timings": { "sunrise": { "en": "5.52", "ta": "5.52" } },
  "auspicious_times": {
    "morning": { "en": "6.30-7.30", "ta": "6.30-7.30" },
    "evening": { "en": "4.30-5.30", "ta": "4.30-5.30" }
  },
  "gowri_nalla_neram": {
    "morning": { "en": "9.30-10.30", "ta": "9.30-10.30" },
    "evening": { "en": "7.30-8.30", "ta": "7.30-8.30" }
  },
  "inauspicious_times": {
    "rahu": { "morning": "07.30", "evening": "09.00" },
    "gulikai": { "morning": "01.30", "evening": "03.00" },
    "emagandam": { "morning": "10.30", "evening": "12.00" }
  },
  "soolam": { "en": "East", "ta": "கிழக்கு" },
  "pariharam": { "en": "Thayir (Curd)", "ta": "தயிர்" },
  "chandrashtamam": { "en": "Bharani, Karthigai", "ta": "பரணி, கார்த்திகை" }
}
```

This is exactly the JSON shape produced by the `calendar-extractor` pipeline.
The full type is exported as `PanchangamData`. `karanam` and `islamic_date`
are accepted but intentionally not rendered (frozen layout decision).

## Theming

The "default" theme reproduces the original design's exact colors. To add
more themes (light/dark token pairs) without touching this package:

```ts
import { registerTheme } from '@kanaksan/tamil-calendar';

registerTheme('festival', {
  light: { bg: '#fffaf0', page: '#fdf2e0', border: 'rgba(0,0,0,.12)', text: '#241a00',
           textSecondary: '#6b5430', textTertiary: '#9c8762', info: '#a8650d',
           success: '#0f6e56', danger: '#a32d2d', warningBg: '#faeeda', warningText: '#854f0b' },
  dark:  { /* ... */ },
});
```

```tsx
<TamilCalendar apiUrl={url} apiKey={key} theme="festival" mode="light" />
```

`mode` and `theme` are read on every render, so a consumer can flip either
one (e.g. from a settings toggle) and the calendar re-themes instantly — no
remount required.

## Local development against this repo

This package has no published registry entry yet. To consume it from the
sibling test app (`calendar-component-test`) before publishing:

```bash
cd calendar-component
npm install
npm run build
npm pack            # produces kanaksan-tamil-calendar-0.1.0.tgz

cd ../calendar-component-test
npm install ../calendar-component/kanaksan-tamil-calendar-0.1.0.tgz
```

(`npm install file:../calendar-component` also works and tracks the source
directory directly, which is more convenient while iterating — re-run
`npm run build` in this package after each change and reinstall.)

## Project layout

```
src/
  components/   TamilCalendar (root) + one folder per section
                (SheetHeader, AuspiciousTimes, InauspiciousTimes,
                PanchangamDetails, CalendarStatus, icons)
  hooks/        useCalendarData, useCalendarI18n, useTheme
  context/      ThemeContext (mode + resolved tokens, for nested sections)
  themes/       token types, the frozen default theme, the theme registry
  i18n/         isolated i18next instance + ta/en resources
  utils/        api.ts (fetch), dateUtils.ts (date parsing/formatting)
  types/        PanchangamData (API contract), component props
```
