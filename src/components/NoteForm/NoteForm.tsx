//  Для керування станом форми, валідації та обробки сабміту слід використовувати бібліотеку Formik.

// Додай валідацію значень полів форми за допомогою Yup:

// заголовок нотатки має мати мінімальну довжину символів 3, максимальну – 50 та бути обовязковим полем;
// контент нотатки має мати максимальну довжину символів 500;
// тег нотатки має бути одним із таких значень: Todo, Work, Personal, Meeting, Shopping, і є обов’язковим полем.

// Компонент NoteForm має створювати DOM-елемент наступної структури:

import css from './NoteForm.module.css';
import { Formik } from 'formik';

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" className={css.input} />
          <span name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <span name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
          <span name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            //   disabled=false
          >
            Create note
          </button>
        </div>
      </form>
    </Formik>
  );
}
