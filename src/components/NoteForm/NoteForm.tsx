import css from './NoteForm.module.css';
import { useId } from 'react';
import { Field, Formik, Form, type FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import { type CreateNoteType } from '../../types/note';
import toast from 'react-hot-toast';

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .required('Введіть назву нотатки!')
    .min(3, 'Мінімум три символи!')
    .max(50, 'ДУУУУУЖЕ довга назва! Давайте зробимо її коротшою!'),
  content: Yup.string().required('Зробіть, будь ласка опис нотатки!').max(500),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Оберіть категорію!'),
});

interface NoteFormProps {
  onClose: () => void;
}

const initialFormValues: CreateNoteType = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const fieldId = useId();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Нотатка створена!');
      onClose();
    },
  });

  const handleSubmit = async (
    values: CreateNoteType,
    formikHelpers: FormikHelpers<CreateNoteType>
  ) => {
    mutation.mutate(values);
    // await new Promise(r => setTimeout(r, 1000));
    formikHelpers.resetForm(); //скидання форми
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={NoteSchema}
      onSubmit={handleSubmit}
    >
      {props => {
        return (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor={`${fieldId}-title`}>Title</label>
              <Field
                id={`${fieldId}-title`}
                type="text"
                name="title"
                placeholder="Введіть назву нотатки"
                className={css.input}
              />
              <ErrorMessage
                component="span"
                name="title"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor={`${fieldId}-content`}>Content</label>
              <Field
                as="textarea"
                id={`${fieldId}-content`}
                placeholder="Зробіть опис"
                name="content"
                rows={8}
                className={css.textarea}
              />
              <ErrorMessage
                component="span"
                name="content"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor={`${fieldId}-tag`}>Tag</label>
              <Field
                as="select"
                id={`${fieldId}-tag`}
                name="tag"
                className={css.select}
              >
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage component="span" name="tag" className={css.error} />
            </div>

            <div className={css.actions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={mutation.isPending}
              >
                {props.isSubmitting ? 'Note is creating ...' : 'Create note'}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
