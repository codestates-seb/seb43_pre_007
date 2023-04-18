import { render, screen } from '@testing-library/react';
import { Chip } from './Chip';

describe('<Chip/>', () => {
  beforeEach(() => {});

  test('required props로 받아 렌더링 되고, Link 태그를 사용한다.', () => {
    render(<Chip href="/">react</Chip>);
    const ins: HTMLAnchorElement = screen.getByText('react');

    expect(ins.tagName).toBe('A');
    expect(ins.href).not.toBeNull();
    expect(ins).toBeInTheDocument();
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
