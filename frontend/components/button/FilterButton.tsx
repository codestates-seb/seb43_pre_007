import { MouseEvent } from 'react';
import styled from 'styled-components';

export type FilterButtonProps = {
  default?: string;
  fontSize?: string;
  filters: Array<string>;
  onChange: (filterText: string) => void;
};

export const FilterButton = (props: FilterButtonProps) => {
  const handleFilterChange = (e: MouseEvent<HTMLLIElement>) => {
    const text = e.currentTarget.textContent;

    if (text) props.onChange(text);
  };

  return (
    <Container>
      {props.filters.map((filter) => (
        <Filter
          key={filter}
          setFilter={props.default}
          onClick={handleFilterChange}
        >
          {filter}
        </Filter>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  width: fit-content;
  border: 1px solid rgb(159, 166, 173);
  border-radius: 3px;
  list-style: none;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
`;

const Filter = styled.li<{
  setFilter: string | undefined;
  fontSize?: string;
  children: string;
}>`
  padding: 10.5px;
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}` : '13px')};
  background-color: ${({ setFilter, children }) =>
    setFilter === children && 'rgb(228,229,231)'};

  &:hover {
    background-color: ${({ setFilter, children }) =>
      setFilter === children ? 'rgb(228,229,231)' : 'rgb(248, 249, 249)'};
  }
`;
