import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes, deleteNote } from '../../services/noteService';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';

export default function App() {
  const [searchQuery, setSearchQuery] = useState(''); // значення інпута
  const [currentPage, setCurrentPage] = useState(1); // pagination

  const perPage = 12;

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 500);

  // Завантаження при першому рендері
  const {
    // data: notes = [],
    data,
    isSuccess,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['notes', searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage, perPage),
    placeholderData: keepPreviousData, //  дані відмалюються після запиту
    // enabled: false, // не рендерити одразу
  });

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  // const totalPages = data?.totalPages ?? 0;

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
      <h1>Мої нотатки!</h1>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onChange={updateSearchQuery} />

          {isSuccess && data && data.notes.length > 0 ? (
            <Pagination
              pageCount={data.totalPages}
              onPageChange={handlePageChange}
            />
          ) : (
            !isLoading && (
              <p>Немає нотаток за пошуковим запитом. Створимо першу нотатку?</p>
            )
          )}

          {/* Пагінація */}
          {/* Кнопка створення нотатки */}
          <button className={css.button}>Create note +</button>
        </header>
        {isLoading && <p>Завантаження нотаток...</p>}
        {isError && <p>Помилка: {error.message}</p>}

        {isSuccess && data && data.notes.length > 0 && (
          <NoteList notes={data.notes || []} onDelete={handleDelete} />
        )}
      </div>
    </>
  );
}
