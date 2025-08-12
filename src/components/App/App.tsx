import { useState } from 'react';
import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { fetchNotes, deleteNote } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const updateSearchQuery = useDebouncedCallback(
    (value: string) => setSearchQuery(value),
    500
  );

  // Завантаження нотаток при першому рендері
  const {
    data: notes = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['notes', searchQuery],
    queryFn: () => fetchNotes(searchQuery),
    placeholderData: keepPreviousData, // прибирає блимання екрану - дані відмалюються після запиту
    // enabled: searchQuery !== '',
  });

  // видалення  нотатки

  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
    onError: error => {
      console.error('Помилка при видаленні нотатки', error.message);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Видалити нотатку?')) {
      deleteNoteMutation.mutate(id);
    }
  };
  ///////////////////////////////
  return (
    <>
      <h1>Hello!</h1>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onChange={updateSearchQuery} />
          {/* Пагінація */}
          {/* Кнопка створення нотатки */}
        </header>
        {isLoading && <p>Завантаження нотаток...</p>}
        {isError && <p>Помилка: {error.message}</p>}

        {notes && notes.length > 0 ? (
          <NoteList notes={notes || []} onDelete={handleDelete} />
        ) : (
          // якщо не в процесі завантаження і немає нотаток — показуємо повідомлення
          !isLoading && <p>Немає нотаток. Створи першу нотатку!</p>
        )}
      </div>
    </>
  );
}
