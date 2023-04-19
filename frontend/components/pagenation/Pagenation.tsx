import React, { Dispatch, SetStateAction } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

type PagenationProps = {
  items: number[];
  setPage: Dispatch<SetStateAction<number>>;
};

const Pagenation = ({ items, setPage }: PagenationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  return (
    <PagenationContainer>
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
    </PagenationContainer>
  );
};

export default Pagenation;

const PagenationContainer = styled.div`
  display: flex;
  .selected > a {
    background-color: var(--bg-orange);
    color: white;
    :hover {
      background-color: var(--bg-orange);
      color: white;
    }
  }
  > ul {
    display: flex;
  }
  > div {
    margin: 0px 10px;
    display: flex;
    align-items: end;
    padding-bottom: 7px;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 8px;
    height: 27px;
    font-size: 0.9rem;
    border: 1px solid #d8d9da;
    border-radius: 4px;
    margin: 0px 3px;
    cursor: pointer;
    :hover {
      background-color: #cccdce;
    }
  }
`;
