import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card 컴포넌트', () => {
  beforeEach(() => {
    const text = '카드';
    render(
      <Card>
        <>{text}</>
      </Card>
    );
  });

  test('렌더링', () => {
    const { getByText } = screen;
    expect(getByText(/카드/)).toBeInTheDocument();
  });

  test('카드 스타일 체크', () => {
    const { getByText } = screen;
    expect(getByText(/카드/)).toHaveStyle(`
      border: 1px solid #cfd8df;
      border-radius: 6px;
      padding: 24px;
    `);
  });
});
