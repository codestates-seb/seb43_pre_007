import React, { Dispatch, SetStateAction } from 'react';
import ReactPaginate from 'react-paginate';

type PaginatedItemsProps = {
  items: number[];
  setPage: Dispatch<SetStateAction<number>>;
};

const PaginatedItems = ({ items, setPage }: PaginatedItemsProps) => {
  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        pageCount={items.length}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginatedItems;
