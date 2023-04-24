import { fireEvent, render, screen } from '@testing-library/react';
import { PerPage } from './PerPage';

describe('<PerPage />', () => {
  const props = {
    current: 10,
    perPageList: [10, 20, 30],
  };

  const handlePageChange = jest.fn();

  beforeEach(() => {
    render(<PerPage {...props} onChangePage={handlePageChange} />);
  });

  test('perPageList 개수 만큼 children 생성', () => {
    const { getByRole } = screen;
    expect(getByRole('list').childElementCount).toBe(3);
  });

  test('현재 값은 props 데이터', () => {
    const { getByText } = screen;
    const currentPageStyle = `color: white; background-color:#f48225;`;

    expect(getByText(10)).toHaveStyle(currentPageStyle);
  });

  test('20 버튼 눌럿을 경우 onChangePage callback 데이터로 반환', () => {
    const { getByText } = screen;

    fireEvent.click(getByText(20));
    expect(handlePageChange).toHaveBeenCalled();
    expect(handlePageChange).toHaveBeenCalledWith(20);
  });
});
