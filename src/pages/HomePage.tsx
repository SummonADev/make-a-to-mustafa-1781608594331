import { useMemo, useState } from 'react';
import { CheckCircle2, ListTodo } from 'lucide-react';
import TodoInput from '@/components/TodoInput';
import TodoItem from '@/components/TodoItem';
import FilterBar from '@/components/FilterBar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { uid } from '@/lib/utils';
import type { Todo, TodoFilter } from '@/types';

export default function HomePage() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<TodoFilter>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uid(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - remaining;

  return (
    <div className="min-h-full bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12 sm:py-16">
        <header className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
            <ListTodo className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Todos
            </h1>
            <p className="text-sm text-slate-500">Stay organized — saved locally in your browser.</p>
          </div>
        </header>

        <TodoInput onAdd={addTodo} />

        {todos.length > 0 ? (
          <>
            <FilterBar
              filter={filter}
              onChange={setFilter}
              remaining={remaining}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />

            <ul className="flex flex-col gap-2">
              {filtered.length === 0 ? (
                <li className="rounded-xl border border-dashed border-slate-300 bg-white/60 px-4 py-8 text-center text-slate-500">
                  No {filter} tasks.
                </li>
              ) : (
                filtered.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))
              )}
            </ul>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center">
            <CheckCircle2 className="h-10 w-10 text-brand/70" />
            <h2 className="text-lg font-semibold text-slate-800">All clear!</h2>
            <p className="max-w-sm text-sm text-slate-500">
              You don&apos;t have any todos yet. Add your first task above to get started.
            </p>
          </div>
        )}

        <footer className="pt-6 text-center text-xs text-slate-400">
          Tip: double-click a task to edit it.
        </footer>
      </div>
    </div>
  );
}
