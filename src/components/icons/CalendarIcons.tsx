import type { SVGProps } from 'react';

function BaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="tdscal-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function SunriseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M3 17h1m16 0h1M5.6 10.6l.7 .7m12.1 -.7l-.7 .7" />
      <path d="M8 17a4 4 0 1 1 8 0" />
      <path d="M3 21h18" />
      <path d="M12 9v-6l3 3m-6 0l3 -3" />
    </BaseIcon>
  );
}

export function AuspiciousIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </BaseIcon>
  );
}

export function InauspiciousIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M10 10l4 4m0 -4l-4 4" />
    </BaseIcon>
  );
}
