/**
 * Normalizes the component's `date` prop (Date | "YYYY-MM-DD" string | undefined)
 * into a concrete Date. Defaults to "now" when omitted, per the component contract.
 */
export function normalizeInputDate(date?: Date | string): Date {
  if (!date) return new Date();
  if (date instanceof Date) return date;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid "date" prop: "${date}". Expected a Date or a "YYYY-MM-DD" string.`);
  }
  return parsed;
}

/** Formats a Date as the "YYYY-MM-DD" query value sent to the REST API. */
export function toRequestDateParam(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export interface GregorianParts {
  day: number;
  /** 1-12 */
  month: number;
  year: number;
}

/** Parses the API payload's own "d-m-yyyy" `date` field (a separate format from the request param). */
export function parseApiDate(value: string): GregorianParts {
  const parts = value.split('-').map((part) => Number.parseInt(part, 10));
  const [day, month, year] = parts;
  if (!day || !month || !year || parts.length !== 3) {
    throw new Error(`Unexpected date format in API response: "${value}". Expected "d-m-yyyy".`);
  }
  return { day, month, year };
}

const MONTH_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Builds the relative path for the static JSON files, mirroring the
 * calendar-extractor pipeline's output layout:
 * `{yyyy}/{MM}-{yyyy}/{dd}-{MMM}-{yyyy}.json` e.g. `2026/06-2026/01-Jun-2026.json`.
 */
export function toLocalJsonPath(date: Date): string {
  const yyyy = date.getFullYear();
  const monthIndex = date.getMonth();
  const mm = String(monthIndex + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const mmm = MONTH_ABBR[monthIndex];
  return `${yyyy}/${mm}-${yyyy}/${dd}-${mmm}-${yyyy}.json`;
}
