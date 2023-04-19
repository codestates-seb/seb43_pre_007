import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { Chip } from './Chip';

describe('<Chip/>', () => {
  test('chip을 클릭하면 라우터가 이동된다.', () => {
    const handleClick = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: handleClick,
    });

    render(<Chip href="/">react</Chip>);
    const chip = screen.getByRole('button');

    fireEvent.click(chip);

    expect(handleClick).toBeCalled();
  });

  test('props로 watch를 사용시 아이콘이 렌더링 된다', () => {
    render(
      <Chip href="/" watch>
        react
      </Chip>
    );

    const container = screen.getByText('react');
    const icon = screen.getByRole('img');

    expect(container).toContainElement(icon);
  });
});
