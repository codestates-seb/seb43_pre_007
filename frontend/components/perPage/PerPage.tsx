import styled from 'styled-components';

export type PerPageProps = {
  current: number;
  perPageList: Array<number>;
  onChangePage: (page: number) => void;
};

export const PerPage = (props: PerPageProps) => {
  const handlePerPageClick = (page: number) => {
    props.onChangePage(page);
  };

  return (
    <Container>
      <ul>
        {props.perPageList.map((page, i) => (
          <PageNumber
            key={i}
            current={props.current}
            onClick={() => handlePerPageClick(page)}
          >
            {page}
          </PageNumber>
        ))}
      </ul>
      <p>per page</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;

  ul {
    display: flex;
    gap: 4px;
  }
`;

const PageNumber = styled.li<{ children: number; current: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d6d9dc;
  border-radius: 3px;
  width: 32px;
  height: 27px;
  cursor: pointer;

  color: ${({ current, children }) =>
    current == children ? 'white' : '#3b4045'};

  background-color: ${({ current, children }) =>
    current == children ? '#f48225' : 'while'};
`;
