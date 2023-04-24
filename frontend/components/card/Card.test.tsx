import { render, screen } from '@testing-library/react';
import Card from './Card';
import styles from '@/styles/App.module.css';

describe('Card 컴포넌트', () => {
  beforeEach(() => {
    const text = '카드';
    render(<Card>{text}</Card>);
  });

  test('카드 스타일 체크', () => {
    const { getByText } = screen;
    const borderGray = styles['--border-gray'];
    expect(getByText(/카드/)).toHaveStyle(`
    border: 1px solid ${borderGray};
    border-radius: 6px;
    padding: 24px;
  `);
  });

  // test('카드 스타일 체크', () => {
  //   const { getByText } = screen;
  //   const borderGray = styles['--border-gray'];
  //   expect(getByText(/카드/)).toHaveStyle(`
  //     border: 1px solid ${borderGray};
  //     border-radius: 6px;
  //     padding: 24px;
  //   `);
  // });

  // test('카드 스타일 체크', () => {
  //   const { getByText } = screen;
  //   expect(getByText(/카드/)).toHaveStyle(`
  //   border: 1px solid var\(--border-gray\);
  //   border-radius: 6px;
  //   padding: 24px;
  // `);
});
