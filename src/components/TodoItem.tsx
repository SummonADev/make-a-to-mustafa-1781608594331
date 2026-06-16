import { useState } from 'react';
import { Check, Trash2, Pencil, X, Save } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>(todo.text);

  const startEdit = () => {
    setDraft(todo.text);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  const saveEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      onDelete(todo.id);
      return;
    }
    onEdit(todo.id, trimmed);
    setEditing(false);
  };

  return (
    <li className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm transition hover:border-slate-300">
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        className={clsx(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition',
          todo.completed
            ? 'border-brand bg-brand text-white'
            : 'border-slate-300 bg-white text-transparent hover:border-brand'
        )}
      >
        <Check className="h-4 w-4" />
      </button>

      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
          className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          className={clsx(
            'flex-1 cursor-pointer select-none text-slate-800 transition',
            todo.completed && 'text-slate-400 line-through'
          )}
        >
          {todo.text}
        </span>
      )}

      <div className="flex items-center gap-1">
        {editing ? (
          <>
            <button
              type="button"
              onClick={saveEdit}
              className="rounded-md p-2 text-emerald-600 transition hover:bg-emerald-50"
              aria-label="Save"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100"
              aria-label="Cancel"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={startEdit}
              className="rounded-md p-2 text-slate-500 opacity-0 transition hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
              aria-label="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="rounded-md p-2 text-rose-500 opacity-0 transition hover:bg-rose-50 group-hover:opacity-100"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
