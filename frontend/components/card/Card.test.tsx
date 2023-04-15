import { render } from '@testing-library/react';
import Card from './Card';

describe('<Card />', () => {
  it('CardContainer 스타일링 체크', () => {
    const { container } = render(<Card />);
    const cardContainer = container.firstChild;
    expect(cardContainer).toHaveStyle(`
      padding: 24px;
      border: 1px solid var(--border-gray);
      border-radius: 6px;
    `);
  });
});
