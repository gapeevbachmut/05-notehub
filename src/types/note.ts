// {
//   "notes": [
//     {
//       "id": "65ca67e7ae7f10c88b598384",
//       "title": "Sample Note",
//       "content": "This is a sample note content.",
//       "createdAt": "2022-01-01T00:00:00Z",
//       "updatedAt": "2022-01-01T00:00:00Z",
//       "tag": "Todo"
//     }
//   ],
//   "totalPages": 5
// }
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

// для створення - свариться на id  !!!!!!!!!!!!!!!!
export interface CreateNoteType {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}
