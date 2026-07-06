import { useEffect, useState } from 'react';
import { getFingerprint } from './fingerprint';
import {
  recordVisit,
  subscribeStats,
  subscribePageStats,
  subscribeAllPages,
  type ProjectStats,
  type PageStats,
  type VisitContext,
} from './pulse';

export interface UsePulseOptions {
  projectId: string;
  pageKey?: string | null;
  context?: VisitContext;
}

export interface UsePulseResult {
  stats: ProjectStats | null;
  pageStats: PageStats | null;
  allPages: PageStats[];
  loading: boolean;
  error: Error | null;
}

// Module-level so a visit is recorded once per page load — also guards
// against React StrictMode double-invoking effects in development.
let visitRecorded: Promise<void> | null = null;

/**
 * React port of the pulse-kanaksan Vue `usePulse` composable.
 * Records a visit on mount and subscribes to live project/page counters.
 */
export function usePulse({ projectId, pageKey = null, context }: UsePulseOptions): UsePulseResult {
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [pageStats, setPageStats] = useState<PageStats | null>(null);
  const [allPages, setAllPages] = useState<PageStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubs: Array<() => void> = [];
    let cancelled = false;

    void (async () => {
      try {
        if (!visitRecorded) {
          visitRecorded = (async () => {
            const fingerprintId = await getFingerprint();
            await recordVisit(projectId, pageKey, { ...context, fingerprintId });
          })();
        }
        await visitRecorded;
        if (cancelled) return;

        unsubs.push(
          subscribeStats(projectId, (data) => {
            setStats(data);
            setLoading(false);
          }),
        );

        if (pageKey) {
          unsubs.push(subscribePageStats(projectId, pageKey, setPageStats));
        }

        unsubs.push(subscribeAllPages(projectId, setAllPages));
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e : new Error(String(e)));
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      unsubs.forEach((fn) => fn());
    };
    // context is metadata only; excluded to avoid re-running on object identity.
  }, [projectId, pageKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return { stats, pageStats, allPages, loading, error };
}
