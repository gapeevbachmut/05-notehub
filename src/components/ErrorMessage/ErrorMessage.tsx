import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <p className={css.text}>Сталася помилка, спробуйте будь ласка ще раз...</p>
  );
}
