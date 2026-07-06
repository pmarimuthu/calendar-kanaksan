import type { PanchangamData } from '../types/panchangam';

export class CalendarApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'CalendarApiError';
    this.status = status;
  }
}

export interface FetchPanchangamOptions {
  apiUrl: string;
  apiKey: string;
  /** "YYYY-MM-DD" */
  dateParam: string;
  signal?: AbortSignal;
}

function withDateParam(apiUrl: string, dateParam: string): string {
  const separator = apiUrl.includes('?') ? '&' : '?';
  return `${apiUrl}${separator}date=${encodeURIComponent(dateParam)}`;
}

/**
 * GETs `${apiUrl}?date=YYYY-MM-DD` with the API key sent as the `x-api-key`
 * header. This is the request convention the component is built against —
 * front it with a proxy/adapter if your backend uses a different contract.
 */
export async function fetchPanchangam({
  apiUrl,
  apiKey,
  dateParam,
  signal,
}: FetchPanchangamOptions): Promise<PanchangamData> {
  let response: Response;
  try {
    response = await fetch(withDateParam(apiUrl, dateParam), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-api-key': apiKey,
      },
      signal,
    });
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') {
      throw cause;
    }
    throw new CalendarApiError('Network error while fetching panchangam data.');
  }

  if (!response.ok) {
    throw new CalendarApiError(
      `Panchangam API request failed with status ${response.status}.`,
      response.status,
    );
  }

  return (await response.json()) as PanchangamData;
}

export interface FetchLocalPanchangamOptions {
  /** Root URL the dated JSON tree is served from, e.g. "/json" or "http://localhost:5500/json". */
  baseUrl: string;
  /** Relative path, e.g. "2026/06-2026/01-Jun-2026.json" (see `toLocalJsonPath`). */
  localPath: string;
  signal?: AbortSignal;
}

function joinUrl(baseUrl: string, localPath: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${localPath.replace(/^\/+/, '')}`;
}

/**
 * Reads a pre-generated JSON file over plain HTTP, for use before the REST
 * API is live. `baseUrl` must point at something serving the
 * `calendar.kanaksan.com/json/...` tree statically (e.g. a dev static server
 * or a copy under the consuming app's `public/`) — browsers cannot read a
 * `C:\...` filesystem path directly.
 */
export async function fetchLocalPanchangam({
  baseUrl,
  localPath,
  signal,
}: FetchLocalPanchangamOptions): Promise<PanchangamData> {
  let response: Response;
  try {
    response = await fetch(joinUrl(baseUrl, localPath), {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal,
    });
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') {
      throw cause;
    }
    throw new CalendarApiError(`Network error while reading local panchangam JSON "${localPath}".`);
  }

  if (!response.ok) {
    throw new CalendarApiError(
      `Local panchangam JSON "${localPath}" request failed with status ${response.status}.`,
      response.status,
    );
  }

  return (await response.json()) as PanchangamData;
}
