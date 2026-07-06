import { useEffect, useState } from 'react';
import { fetchPanchangam, fetchLocalPanchangam, CalendarApiError } from '../utils/api';
import { normalizeInputDate, toRequestDateParam, toLocalJsonPath } from '../utils/dateUtils';
import type { PanchangamData } from '../types/panchangam';
import type { CalendarSource } from '../types/props';

export type CalendarDataState =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: PanchangamData };

export interface UseCalendarDataOptions {
  source?: CalendarSource;
  apiUrl?: string;
  apiKey?: string;
  baseUrl?: string;
  date?: Date | string;
}

export interface UseCalendarDataResult {
  state: CalendarDataState;
  /** Re-runs the fetch for the current source/apiUrl/apiKey/baseUrl/date — wired to retry UI. */
  refetch: () => void;
}

/**
 * Fetches a single day's panchangam data and keeps it in sync with
 * source/apiUrl/apiKey/baseUrl/date. Cancels any in-flight request (via
 * AbortController) when those change or the component unmounts, so a slow
 * earlier request can never clobber a newer one.
 */
export function useCalendarData({
  source = 'rest',
  apiUrl,
  apiKey,
  baseUrl,
  date,
}: UseCalendarDataOptions): UseCalendarDataResult {
  const normalizedDate = normalizeInputDate(date);
  const dateParam = toRequestDateParam(normalizedDate);
  const localPath = toLocalJsonPath(normalizedDate);
  const [state, setState] = useState<CalendarDataState>({ status: 'loading' });
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });

    const request =
      source === 'local'
        ? fetchLocalPanchangam({ baseUrl: baseUrl ?? '', localPath, signal: controller.signal })
        : fetchPanchangam({ apiUrl: apiUrl ?? '', apiKey: apiKey ?? '', dateParam, signal: controller.signal });

    request
      .then((data) => setState({ status: 'success', data }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const error = err instanceof Error ? err : new CalendarApiError('Unknown error fetching panchangam data.');
        setState({ status: 'error', error });
      });

    return () => controller.abort();
  }, [source, apiUrl, apiKey, baseUrl, dateParam, localPath, reloadToken]);

  return { state, refetch: () => setReloadToken((t) => t + 1) };
}
