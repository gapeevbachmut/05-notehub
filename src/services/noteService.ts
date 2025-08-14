import axios from 'axios';
import { type Note } from '../types/note';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number
): Promise<NotesResponse> => {
  const config = {
    params: {
      search, // пошук - ?
      page, // сторінка
      perPage, // кількість на сторінці
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  };
  const responce = await axios.get<NotesResponse>(
    `https://notehub-public.goit.study/api/notes`,
    config
  );
  console.log(responce.data.notes);

  return responce.data;
};

//  видалення

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

//  додавання

export const createNote = async (noteData: Note): Promise<Note> => {
  const responce = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    noteData,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return responce.data;
};
