import css from './SearchBox.module.css';
// import toast from 'react-hot-toast';
import { useState } from 'react';

interface SearchBoxProps {
  onChange: (search: string) => void;
}

// onSubmit or onChange
export default function SearchBox({ onChange }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // ????????????

    // if (value.trim() === '') {
    //   toast.error('Будь ласка, введіть запит для пошуку.');
    //   return;
    // }
    ///////////////////////////

    setInputValue(value);
    onChange(value);
  };

  console.log(inputValue);

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={handleChange}
    />
  );
}
