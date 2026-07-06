import { StrictMode, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { TamilCalendar } from '../index';
import type { CalendarLocale, CalendarMode } from '../index';

import dayjs from 'dayjs';

import {
  Box,
  CssBaseline,
  IconButton,
  Paper,
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

const CALENDAR_CONFIG = {
  minDate: dayjs('2026-01-01'),
  maxDate: dayjs('2026-08-31'),
  defaultDate: '2026-06-20',
  defaultLocale: 'ta' as const,
  defaultMode: 'dark' as const,
};

function Playground() {
  const [mode, setMode] = useState<CalendarMode>(
    CALENDAR_CONFIG.defaultMode
  );

  const [locale, setLocale] = useState<CalendarLocale>(
    CALENDAR_CONFIG.defaultLocale
  );

  const [date, setDate] = useState(
    CALENDAR_CONFIG.defaultDate
  );
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
            {/* Toolbar */}
            <Paper
              elevation={3}
              sx={{
                mb: 2,
                p: 1.5,
                display: 'flex',
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
                      width: 190,
                    },
                  },
                }}
              />

              {/* Language */}
              <Tooltip title="Change Language">
                <Paper
                  variant="outlined"
                  sx={{
                    height: 40,
                    px: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() =>
                    setLocale(locale === 'ta' ? 'en' : 'ta')
                  }
                >
                  <LanguageIcon
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      minWidth: 60,
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    {locale === 'ta' ? 'தமிழ்' : 'English'}
                  </Typography>
                </Paper>
              </Tooltip>

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
                baseUrl="/json"
                date={date}
                mode={mode}
                locale={locale}
              />
            </Paper>
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