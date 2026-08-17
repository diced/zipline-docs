import { getMethodOgColors } from '@/lib/og-theme';
import { cn } from '@/lib/cn';

export function SearchMethodBadge({ method, className }: { method: string; className?: string }) {
  const label = method.toUpperCase();
  const colors = getMethodOgColors(label);

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded px-1.5 py-0.5 font-mono text-[0.6875rem] font-bold tracking-wide',
        className,
      )}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  );
}
