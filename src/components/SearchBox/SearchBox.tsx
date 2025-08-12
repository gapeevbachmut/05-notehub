import css from './SearchBox.module.css';
import { useState } from 'react';

interface SearchBoxProps {
  onChange: (search: string) => void;
}

// onSubmit or onChange
export default function SearchBox({ onChange }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(inputValue);
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
