import { useEffect, useState } from 'react';
import { fetchPanchangam, fetchLocalPanchangam, CalendarApiError } from '../utils/api';
import { normalizeInputDate, toRequestDateParam, toLocalJsonPath } from '../utils/dateUtils';
import type { PanchangamData } from '../types/panchangam';

export type CalendarDataState =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: PanchangamData };

export interface UseCalendarDataOptions {
  apiUrl?: string;
  apiKey?: string;
  baseUrl?: string;
  date?: Date | string;
}

export interface UseCalendarDataResult {
  state: CalendarDataState;
  refetch: () => void;
}

/**
 * Fetches a single day's panchangam data.
 * Auto-detects mode: if `apiUrl` is provided → REST API; otherwise → static JSON files from `baseUrl`.
 * Cancels any in-flight request via AbortController when deps change or component unmounts.
 */
export function useCalendarData({
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

    const request = apiUrl
      ? fetchPanchangam({ apiUrl, apiKey: apiKey ?? '', dateParam, signal: controller.signal })
      : fetchLocalPanchangam({ baseUrl: baseUrl ?? '', localPath, signal: controller.signal });

    request
      .then((data) => setState({ status: 'success', data }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const error = err instanceof Error ? err : new CalendarApiError('Unknown error fetching panchangam data.');
        setState({ status: 'error', error });
      });

    return () => controller.abort();
  }, [apiUrl, apiKey, baseUrl, dateParam, localPath, reloadToken]);

  return { state, refetch: () => setReloadToken((t) => t + 1) };
}