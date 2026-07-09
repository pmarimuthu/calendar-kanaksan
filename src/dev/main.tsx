import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { TamilCalendar } from '../index';
import type { CalendarLocale, CalendarMode } from '../index';

import dayjs from 'dayjs';

import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Select,
  ThemeProvider,
  Tooltip,
  Typography,
  createTheme,
} from '@mui/material';

import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { PulseBadge } from './pulse/PulseBadge';

const CALENDAR_CONFIG = {
  minDate: dayjs('2026-01-01'),
  maxDate: dayjs('2026-08-31'),
  defaultDate: '2026-07-08',
  defaultLocale: 'ta' as const,
  defaultMode: 'dark' as const,
};

const INDIAN_LANGUAGES: Array<{ code: CalendarLocale; label: string }> = [
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
];

const OTHER_LANGUAGES: Array<{ code: CalendarLocale; label: string }> = [
  { code: 'fr', label: 'Français (French)' },
  { code: 'ms', label: 'Bahasa Melayu (Malay)' },
  { code: 'si', label: 'සිංහල (Sinhala)' },
];

const APP_TITLE: Record<CalendarLocale, string> = {
  ta: 'தினசரி நாட்காட்டி',
  en: 'Daily Calendar',
  hi: 'दैनिक कैलेंडर',
  te: 'రోజువారీ క్యాలెండర్',
  kn: 'ದೈನಂದಿನ ಕ್ಯಾಲೆಂಡರ್',
  ml: 'ദൈനംദിന കലണ്ടർ',
  mr: 'दैनिक दिनदर्शिका',
  bn: 'দৈনিক পঞ্জিকা',
  gu: 'દૈનિક કેલેન્ડર',
  pa: 'ਰੋਜ਼ਾਨਾ ਕੈਲੰਡਰ',
  fr: 'Calendrier quotidien',
  ms: 'Kalendar Harian',
  si: 'දෛනික දින දර්ශනය',
};

function Playground() {
  const [mode, setMode] = useState<CalendarMode>(
    CALENDAR_CONFIG.defaultMode
  );

  const [locale, setLocale] = useState<CalendarLocale>(
    CALENDAR_CONFIG.defaultLocale
  );

  const [date, setDate] = useState(() => {
    const today = dayjs();
    const inRange =
      !today.isBefore(CALENDAR_CONFIG.minDate, 'day') &&
      !today.isAfter(CALENDAR_CONFIG.maxDate, 'day');
    return (inRange ? today : CALENDAR_CONFIG.maxDate).format('YYYY-MM-DD');
  });

  const dark = mode === 'dark';

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        shape: {
          borderRadius: 14,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            py: 4,
            px: 2,
          }}
        >
          {/* Calendar Container */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 760,
              mx: 'auto',
            }}
          >
            {/* Title */}
            <Typography
              variant="h5"
              component="h1"
              sx={{ textAlign: 'center', fontWeight: 600, mb: 2 }}
            >
              {APP_TITLE[locale]}
            </Typography>

            {/* Toolbar */}
            <Paper
              elevation={3}
              sx={{
                mb: 2,
                p: 1.5,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              {/* Date */}
              <DatePicker
                value={dayjs(date)}
                minDate={CALENDAR_CONFIG.minDate}
                maxDate={CALENDAR_CONFIG.maxDate}
                format="DD MMM YYYY"
                onChange={(value) => {
                  if (value) {
                    setDate(value.format('YYYY-MM-DD'));
                  }
                }}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: {
                      width: { xs: '100%', sm: 190 },
                    },
                  },
                }}
              />

              {/* Language */}
              <Select
                size="small"
                value={locale}
                onChange={(event) =>
                  setLocale(event.target.value as CalendarLocale)
                }
                startAdornment={
                  <LanguageIcon fontSize="small" sx={{ mr: 1 }} />
                }
                sx={{ width: { xs: 'calc(100% - 52px)', sm: 175 }, height: 40 }}
                MenuProps={{ slotProps: { paper: { sx: { maxHeight: 360 } } } }}
              >
                {INDIAN_LANGUAGES.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </MenuItem>
                ))}
                <Divider />
                {OTHER_LANGUAGES.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>

              {/* Theme */}
              <Tooltip title="Toggle Theme">
                <IconButton
                  color="primary"
                  onClick={() =>
                    setMode(dark ? 'light' : 'dark')
                  }
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    width: 40,
                    height: 40,
                  }}
                >
                  {dark ? (
                    <LightModeIcon />
                  ) : (
                    <DarkModeIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Paper>

            {/* Calendar */}
            <Paper
              elevation={3}
              sx={{
                p: 2,
              }}
            >
              <TamilCalendar
                source="local"
                deityImageBaseUrl="/deities"
                baseUrl="/json"
                date={date}
                mode={mode}
                locale={locale}
              />
            </Paper>

            {/* pulse-kanaksan visitor stats */}
            <PulseBadge />
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Playground />
  </StrictMode>
);