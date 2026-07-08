import { useState } from 'react';

export interface DayDeityProps {
  /** English weekday name, e.g. "Saturday" (use `data.day.en` from the API). */
  day: string;
  /**
   * Root URL serving `{weekday}.webp` images (lowercase english weekday,
   * e.g. `${baseUrl}/saturday.webp`). The demo site hosts them at "/deities".
   */
  baseUrl: string;
  /** Accessible alt text; defaults to the weekday name. */
  alt?: string;
}

/**
 * Deity-of-the-day image shown at the right edge of the sheet header.
 * Renders nothing if the image fails to load, so a missing file degrades
 * gracefully. Swap images by replacing the files under `baseUrl` — no code
 * change needed.
 */
export function DayDeity({ day, baseUrl, alt }: DayDeityProps) {
  const [failed, setFailed] = useState(false);
  const key = day.trim().toLowerCase();
  if (!key || failed) return null;

  const src = `${baseUrl.replace(/\/+$/, '')}/${key}.webp`;
  return (
    <div className="tdscal-deity">
      <img
        className="tdscal-deity-img"
        src={src}
        alt={alt ?? day}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
