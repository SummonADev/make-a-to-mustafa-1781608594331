import clsx from 'clsx';
import type { TodoFilter } from '@/types';

type FilterBarProps = {
  filter: TodoFilter;
  onChange: (filter: TodoFilter) => void;
  remaining: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { key: TodoFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  onChange,
  remaining,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
      <span>
        <strong className="text-slate-800">{remaining}</strong> item{remaining === 1 ? '' : 's'} left
      </span>

      <div className="flex items-center gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => onChange(f.key)}
            className={clsx(
              'rounded-md px-3 py-1 transition',
              filter === f.key
                ? 'bg-brand text-white'
                : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="rounded-md px-3 py-1 text-slate-500 transition hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-slate-500"
      >
        Clear completed
      </button>
    </div>
  );
}
