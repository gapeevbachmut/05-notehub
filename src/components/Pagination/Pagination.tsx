// Пагінація
// Бекенд завжди повертає пагіновану колекцію нотатків. Тому потрібно додати до компонента App компонент Pagination, який надає користувачеві можливість перемикатися між сторінками колекції. Реалізуйте компонент Pagination з використанням бібліотеки React Paginate.
// До http-запиту потрібно додати параметри page та perPage. Наприклад:
// GET https://notehub-public.goit.study/api/notes?page=1&perPage=12
// Додайте умову, щоб компонент Pagination рендерився лише в тому випадку, якщо кількість сторінок колекції нотатків більше 1.

import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number; //total page
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({
  pageCount,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) {
    return;
  }
  return (
    <ReactPaginate
      breakLabel="..."
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={onPageChange}
      forcePage={pageCount - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel=">"
      previousLabel="<"
    />
  );
}
