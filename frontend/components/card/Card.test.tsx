import { render } from '@testing-library/react';
import Card from './Card';

describe('Card 컴포넌트', () => {
  it('children이 정상적으로 렌더링되는지 확인한다', () => {
    const text = '카드 내용입니다.';
    const { getByText } = render(
      <Card>
        <>{text}</>
      </Card>
    );
    const cardText = getByText(text);
    expect(cardText).toBeInTheDocument();
  });

  it('CardContainer 스타일링이 제대로 되어 있는지 확인한다', () => {
    const { container } = render(
      <Card>
        <>카드 내용입니다.</>
      </Card>
    );
    const cardContainer = container.firstChild;
    expect(cardContainer).toHaveStyle(`
      padding: 24px;
      border: 1px solid var(--border-gray);
      border-radius: 6px;
    `);
  });
});
