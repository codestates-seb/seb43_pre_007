import { render, screen } from '@testing-library/react';
import { FilterButton } from './FilterButton';
import userEvent from '@testing-library/user-event';

describe('<FilterButton />', () => {
  const handeChnage = jest.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    render(
      <FilterButton
        filters={['흥미', '인기']}
        default="흥미"
        onChange={handeChnage}
      />
    );
  });

  test('렌더링', () => {
    const { getByRole } = screen;
    expect(getByRole('list')).toBeInTheDocument();
  });

  test('filters props에 입력 데이터가 자식 Element로 렌더링 된다.', () => {
    const { getByRole } = screen;
    expect(getByRole('list').childElementCount).toBe(2);
  });

  test('default props로 데이터를 입력하면 기본 값으로 선택된다.', () => {
    const { getByText } = screen;
    expect(getByText(/흥미/)).toHaveStyle('background-color: rgb(228,229,231)');
  });

  test('filter 리스트 중 하나를 클릭하면 onChange로 callback 함수가 실행된다.', async () => {
    const { getByText } = screen;
    await user.click(getByText(/인기/));
    expect(handeChnage).toBeCalledWith('인기');
  });

  test('filter 리스트 중 하나에 마우스를 올렸을 경우 백그라운드 색이 변한다.', async () => {
    const { getByText } = screen;
    await user.hover(getByText(/흥미/));
    expect(getByText(/흥미/)).toHaveStyle('background-color: rgb(228,229,231)');
  });
});
