/**
 * "Active now" detection for panchangam time windows. All calendar times are
 * IST (Asia/Kolkata); the viewer's own timezone is normalised away so the
 * highlight is correct anywhere in the world.
 *
 * Parsing rules (times carry no AM/PM markers):
 * - Auspicious ranges ("7.45-8.45"): morning slots are AM (12 = noon, 1–5
 *   defensively PM); evening slots are PM.
 * - Inauspicious windows come as separate start/end times ("01.30"/"03.00")
 *   spanning the daytime: hours 6–11 are AM, 12 is noon, 1–5 are PM.
 * - If an end resolves before its start, it is pushed 12h forward (ranges
 *   that cross noon, e.g. "11.45-12.45").
 */
import { useEffect, useState } from 'react';

const IST_OFFSET_MIN = 330; // UTC+5:30

/** Current wall-clock time in IST, independent of the viewer's timezone. */
export function istNow(): Date {
  const d = new Date();
  return new Date(d.getTime() + (d.getTimezoneOffset() + IST_OFFSET_MIN) * 60000);
}

/** True when the sheet's "d-m-yyyy" date is today in IST. */
export function isIstToday(apiDate: string, now: Date = istNow()): boolean {
  const [d, m, y] = apiDate.split('-').map(Number);
  return d === now.getDate() && m === now.getMonth() + 1 && y === now.getFullYear();
}

type Slot = 'morning' | 'evening';

function toMinutes(hRaw: number, min: number, slot: Slot): number {
  let h = hRaw;
  if (slot === 'morning') {
    if (hRaw >= 1 && hRaw <= 5) h = hRaw + 12; // defensive: early-afternoon listed as morning
  } else {
    if (hRaw !== 12) h = hRaw + 12; // evening slots are PM; 12 stays noon
  }
  return h * 60 + min;
}

const RANGE_RE = /^(\d{1,2})[.:](\d{2})\s*-\s*(\d{1,2})[.:](\d{2})$/;
const TIME_RE = /^(\d{1,2})[.:](\d{2})$/;

/** True when `now` falls inside an auspicious range string like "7.45-8.45". */
export function isActiveRange(range: string, slot: Slot, now: Date): boolean {
  const m = RANGE_RE.exec(range.trim());
  if (!m) return false; // handles "------------" and malformed values
  const start = toMinutes(Number(m[1]), Number(m[2]), slot);
  let end = toMinutes(Number(m[3]), Number(m[4]), slot);
  if (end <= start) end += 12 * 60; // crosses noon
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= start && cur < end;
}

/** Daytime rule for inauspicious start/end times: 6–11 AM, 12 noon, 1–5 PM. */
function daytimeMinutes(time: string): number | null {
  const m = TIME_RE.exec(time.trim());
  if (!m) return null;
  const hRaw = Number(m[1]);
  const h = hRaw >= 1 && hRaw <= 5 ? hRaw + 12 : hRaw;
  return h * 60 + Number(m[2]);
}

/** True when `now` falls inside an inauspicious window given as start/end times. */
export function isActiveWindow(start: string, end: string, now: Date): boolean {
  const s = daytimeMinutes(start);
  let e = daytimeMinutes(end);
  if (s === null || e === null) return false;
  if (e <= s) e += 12 * 60;
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= s && cur < e;
}

/**
 * True when `now` is within the sunrise window: `beforeMin` minutes before
 * the given sunrise time (always AM, e.g. "5.58") until `afterMin` after.
 */
export function isSunriseActive(
  sunrise: string,
  now: Date,
  beforeMin = 10,
  afterMin = 5,
): boolean {
  const m = TIME_RE.exec(sunrise.trim());
  if (!m) return false;
  const t = Number(m[1]) * 60 + Number(m[2]);
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= t - beforeMin && cur < t + afterMin;
}

/** IST clock that re-renders the consumer every `refreshMs` (default 30s). */
export function useIstNow(refreshMs = 30000): Date {
  const [now, setNow] = useState<Date>(() => istNow());
  useEffect(() => {
    const id = setInterval(() => setNow(istNow()), refreshMs);
    return () => clearInterval(id);
  }, [refreshMs]);
  return now;
}
