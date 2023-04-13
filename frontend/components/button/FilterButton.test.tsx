import { fireEvent, render, screen } from '@testing-library/react';
import { FilterButton } from './FilterButton';

describe('<FilterButton />', () => {
  const handeChnage = jest.fn();

  beforeEach(() => {
    render(
      <FilterButton
        filters={['흥미', '인기']}
        default="흥미"
        onChange={handeChnage}
      />
    );
  });

  test('render', () => {
    const { getByRole } = screen;
    expect(getByRole('list')).toBeInTheDocument();
  });

  test('render children', () => {
    const { getByRole } = screen;
    expect(getByRole('list').childElementCount).toBe(2);
  });

  test('set default props', () => {
    const { getByText } = screen;
    expect(getByText(/흥미/)).toHaveStyle('background-color: rgb(228,229,231)');
  });

  test('click filter', () => {
    const { getByText } = screen;
    fireEvent.click(getByText(/인기/));
    expect(handeChnage).toBeCalledWith('인기');
  });
});
