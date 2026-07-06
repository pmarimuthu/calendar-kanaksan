import { useTranslation } from 'react-i18next';

/** Shown while the day's data is being fetched. */
export function LoadingState() {
  const { t } = useTranslation();
  return (
    <div className="tdscal-status" role="status">
      {t('status.loading')}
    </div>
  );
}

export interface ErrorStateProps {
  onRetry: () => void;
}

/** Shown when the REST call fails; offers a retry that re-triggers the fetch. */
export function ErrorState({ onRetry }: ErrorStateProps) {
  const { t } = useTranslation();
  return (
    <div className="tdscal-status tdscal-status-error" role="alert">
      <div>{t('status.error')}</div>
      <button type="button" className="tdscal-retry" onClick={onRetry}>
        {t('status.retry')}
      </button>
    </div>
  );
}
