import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number; //total page
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
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
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel=">"
      previousLabel="<"
    />
  );
}
