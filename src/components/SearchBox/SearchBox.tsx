import css from './SearchBox.module.css';
import { useState } from 'react';

interface SearchBoxProps {
  onChange: (search: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

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
