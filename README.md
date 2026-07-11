# @kanaksan/tamil-calendar

> 🗓️ Tamil daily panchangam calendar sheet as a React component — with dark/light mode, 13 languages, live "happening now" highlights, and a pluggable theme system.

<div align="center">

[![npm version](https://img.shields.io/npm/v/@kanaksan/tamil-calendar?color=crimson&label=npm)](https://www.npmjs.com/package/@kanaksan/tamil-calendar)
[![license](https://img.shields.io/npm/l/@kanaksan/tamil-calendar?color=gold)](./LICENSE)
[![react](https://img.shields.io/badge/react-18%20%7C%2019-blue?logo=react)](https://react.dev)
[![Live Demo](https://img.shields.io/badge/demo-calendar.kanaksan.com-orange?logo=vercel)](https://calendar.kanaksan.com)

**[🌐 Live Demo](https://calendar.kanaksan.com) · [✍️ Author](https://author.kanaksan.com) · [📦 npm](https://www.npmjs.com/package/@kanaksan/tamil-calendar)**

</div>

---

## ✨ Features

- 📅 **Daily panchangam sheet** — tithi, nakshatra, lagnam, chandrashtamam, soolam, pariharam
- 🕐 **நல்ல நேரம்** (auspicious) and **தவிர்க்க வேண்டிய நேரம்** (inauspicious) time windows
- ⚡ **"Happening now" highlights** — active windows pulse in gold/red in real time (IST)
- 🌗 **Dark / light mode** — switch at runtime, no remount needed
- 🎨 **Pluggable theme system** — register custom color themes without touching the library
- 🌍 **13 languages** — Tamil, English, Hindi, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati, Punjabi, French, Malay, Sinhala
- 🖼️ **Weekday deity image** — animated gold-border deity image per day of week
- 📡 **Zero-config** — defaults to kanaksan.com data; bring your own REST API when ready
- 🔒 **Isolated i18n** — runs its own i18next instance, never conflicts with your app's setup

---

## 📦 Install

```bash
npm install @kanaksan/tamil-calendar
```

> `react` and `react-dom` (^18.2.0 or ^19.0.0) are peer dependencies — your app supplies them.

---

## 🚀 Quick Start

### Zero config — just works

```tsx
import { TamilCalendar } from '@kanaksan/tamil-calendar';
import '@kanaksan/tamil-calendar/style.css';

export default function App() {
  return <TamilCalendar />;
}
```

Defaults to today's date (IST), dark mode, Tamil language, and fetches data from [calendar.kanaksan.com](https://calendar.kanaksan.com).

---

### With a specific date

```tsx
<TamilCalendar date="2026-03-15" />
```

---

### Light mode + English

```tsx
<TamilCalendar mode="light" locale="en" />
```

---

### With your own REST API

```tsx
<TamilCalendar
  apiUrl="https://api.yoursite.com/panchangam"
  apiKey={import.meta.env.VITE_API_KEY}
  date="2026-06-20"
  mode="dark"
  locale="ta"
/>
```

> When `apiUrl` is provided, the component switches to REST mode automatically. When omitted, it reads pre-generated static JSON from `baseUrl`.

---

### With your own hosted data

```tsx
<TamilCalendar
  baseUrl="https://yoursite.com/json"
  deityImageBaseUrl="https://yoursite.com/deities"
  date="2026-06-20"
/>
```

---

## 🎛️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiUrl` | `string` | — | REST endpoint returning one day's panchangam JSON. When set, switches to live API mode. |
| `apiKey` | `string` | — | Sent as `x-api-key` header. Required when `apiUrl` is set. |
| `baseUrl` | `string` | `https://calendar.kanaksan.com/json` | Root URL for pre-generated dated JSON files. Used when `apiUrl` is not set. |
| `date` | `Date \| string` | today (IST) | Date to display. String format: `"YYYY-MM-DD"`. |
| `mode` | `"dark" \| "light"` | `"dark"` | Colour mode. Switches instantly at runtime. |
| `theme` | `string \| ThemeTokens` | `"default"` | Registered theme name or a literal token object. |
| `locale` | `CalendarLocale` | `"ta"` | UI and data language. See supported locales below. |
| `deityImageBaseUrl` | `string` | `https://calendar.kanaksan.com/deities` | Root URL serving `{weekday}.webp` deity images. Pass `""` to hide. |
| `className` | `string` | — | Extra CSS class on the root element. |

---

## 🌍 Supported Locales

| Code | Language |
|------|----------|
| `ta` | தமிழ் (Tamil) — default |
| `en` | English |
| `hi` | हिन्दी (Hindi) |
| `te` | తెలుగు (Telugu) |
| `kn` | ಕನ್ನಡ (Kannada) |
| `ml` | മലയാളം (Malayalam) |
| `mr` | मराठी (Marathi) |
| `bn` | বাংলা (Bengali) |
| `gu` | ગુજરાતી (Gujarati) |
| `pa` | ਪੰਜਾਬੀ (Punjabi) |
| `fr` | Français (French) |
| `ms` | Bahasa Melayu (Malay) |
| `si` | සිංහල (Sinhala) |

> Tamil (`ta`) shows native Tamil data values. All other locales show English data values with translated labels.

---

## 🎨 Theming

The default theme exactly reproduces the original [kanaksan.com](https://calendar.kanaksan.com) design. Register custom themes at app startup without modifying this package:

```ts
import { registerTheme } from '@kanaksan/tamil-calendar';

registerTheme('festival', {
  light: {
    bg: '#fffaf0',
    page: '#fdf2e0',
    border: 'rgba(0,0,0,.12)',
    text: '#241a00',
    textSecondary: '#6b5430',
    textTertiary: '#9c8762',
    info: '#a8650d',
    success: '#0f6e56',
    danger: '#a32d2d',
    warningBg: '#faeeda',
    warningText: '#854f0b',
  },
  dark: {
    bg: '#1a1200',
    page: '#110d00',
    border: 'rgba(255,255,255,.14)',
    text: '#f5e6c8',
    textSecondary: '#c4a97a',
    textTertiary: '#8a7355',
    info: '#f6c94e',
    success: '#5dcaa5',
    danger: '#f09595',
    warningBg: '#2e1a00',
    warningText: '#fac775',
  },
});
```

```tsx
<TamilCalendar theme="festival" mode="light" />
```

Both `mode` and `theme` re-resolve on every render — flip them from a settings toggle and the calendar re-themes instantly, no remount required.

---

## 🔌 REST API Contract

When using `apiUrl`, the component issues:

```
GET {apiUrl}?date=YYYY-MM-DD
x-api-key: {apiKey}
Accept: application/json
```

Expected response shape:

```json
{
  "date": "1-6-2026",
  "day": { "en": "Monday", "ta": "திங்கள்" },
  "tamil_month": { "en": "Vaikasi", "ta": "வைகாசி" },
  "tamil_date": "18",
  "tamil_year": { "en": "Parabava", "ta": "பராபவ" },
  "paksha": { "en": "Krishna Paksha", "ta": "கிருஷ்ண பட்சம்" },
  "panchangam": {
    "tithi":     { "en": "...", "ta": "..." },
    "nakshatra": { "en": "...", "ta": "..." },
    "lagnam":    { "en": "...", "ta": "..." },
    "karanam":   { "en": "...", "ta": "..." }
  },
  "timings": {
    "sunrise": { "en": "5.52", "ta": "5.52" }
  },
  "auspicious_times": {
    "morning": { "en": "6.30-7.30",  "ta": "6.30-7.30" },
    "evening": { "en": "4.30-5.30",  "ta": "4.30-5.30" }
  },
  "gowri_nalla_neram": {
    "morning": { "en": "9.30-10.30", "ta": "9.30-10.30" },
    "evening": { "en": "7.30-8.30",  "ta": "7.30-8.30" }
  },
  "inauspicious_times": {
    "rahu":      { "morning": "07.30", "evening": "09.00" },
    "gulikai":   { "morning": "01.30", "evening": "03.00" },
    "emagandam": { "morning": "10.30", "evening": "12.00" }
  },
  "soolam":         { "en": "East",          "ta": "கிழக்கு" },
  "pariharam":      { "en": "Thayir (Curd)", "ta": "தயிர்" },
  "chandrashtamam": { "en": "Bharani, Karthigai", "ta": "பரணி, கார்த்திகை" }
}
```

The full TypeScript type is exported as `PanchangamData`.

> `karanam` and `islamic_date` are accepted but not rendered (frozen layout decision).

---

## 🗂️ Project Layout

```
src/
├── components/
│   ├── TamilCalendar/       # Root component
│   ├── SheetHeader/         # Date box + weekday + sunrise
│   ├── AuspiciousTimes/     # நல்ல நேரம் + கௌரி நல்ல நேரம்
│   ├── InauspiciousTimes/   # இராகு காலம், எமகண்டம், குளிகை
│   ├── PanchangamDetails/   # 2×3 details grid
│   ├── DayDeity/            # Weekday deity image
│   └── icons/               # SVG icon components
├── hooks/
│   ├── useCalendarData.ts   # Data fetching + auto mode detection
│   ├── useCalendarI18n.ts   # Isolated i18next instance lifecycle
│   └── useTheme.ts          # Token resolution + CSS variables
├── context/
│   └── ThemeContext.tsx     # Mode + tokens for nested sections
├── themes/
│   ├── types.ts             # ThemeTokens, ThemeDefinition
│   ├── default.ts           # Frozen kanaksan.com design tokens
│   └── index.ts             # Registry: registerTheme, resolveThemeTokens
├── i18n/
│   ├── locales/             # UI label translations (13 languages)
│   └── values/              # Data value dictionaries (nakshatra names etc.)
├── utils/
│   ├── api.ts               # fetchPanchangam, fetchLocalPanchangam
│   ├── dateUtils.ts         # Date parsing and formatting
│   ├── timeWindows.ts       # IST clock, active window detection
│   └── translateValue.ts    # Token-by-token data value localisation
└── types/
    ├── panchangam.ts        # PanchangamData API contract
    └── props.ts             # TamilCalendarProps
```

---

## 🛠️ Local Development

```bash
# Clone and install
git clone https://github.com/kanaksan/tamil-calendar.git
cd calendar-component
npm install

# Run the playground (src/dev/main.tsx)
npm run dev

# Build the library
npm run build

# Build the demo site (dist-site/)
npm run build:site
```

---

## 🔗 Links

| | |
|---|---|
| 🌐 Live demo | [calendar.kanaksan.com](https://calendar.kanaksan.com) |
| ✍️ Author | [author.kanaksan.com](https://author.kanaksan.com) |
| 📦 npm | [@kanaksan/tamil-calendar](https://www.npmjs.com/package/@kanaksan/tamil-calendar) |

---

## 📄 License

MIT © [Mars](https://author.kanaksan.com)