import { useState } from 'react';
import { Plus } from 'lucide-react';

type TodoInputProps = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
      <button
        type="submit"
        className="flex items-center gap-2 rounded-xl bg-brand px-4 py-3 font-medium text-white shadow-sm transition hover:bg-brand-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!text.trim()}
      >
        <Plus className="h-5 w-5" />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
}
