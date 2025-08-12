// // fetchNotes : має виконувати запит для отримання колекції нотатків із сервера. Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);
// // createNote: має виконувати запит для створення нової нотатки на сервері. Приймає вміст нової нотатки та повертає створену нотатку у відповіді;

///////////////////////////////////////////////////////
import axios from 'axios';
import { type Note } from '../types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (
  search: string
  //page: number
): Promise<Note[]> => {
  const config = {
    params: {
      search, // пошук - ?
      //page, // сторінка
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  };
  const responce = await axios.get<FetchNotesResponse>(
    `https://notehub-public.goit.study/api/notes`,
    config
  );
  console.log(responce.data.notes);

  return responce.data.notes;
};

export async function deleteNote(id: string): Promise<Note> {
  const responce = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return responce.data;
}

//  ( createNote, )

// Створення нової нотатки

// Додайте в хедер застосунку кнопку для створення нової нотатки:

// <button className={css.button}>Create note +</button>

// При натисканні на цю кнопку має відкриватись модальне вікно Modal з формою NoteForm.
