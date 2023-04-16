import { render, fireEvent } from '@testing-library/react';
import SelectContent from './SelectContent';

describe('SelectContent', () => {
  const categories = ['Cate1', 'Cate2', 'Cate3'];
  const sub = '서브';

  test('랜더링 테스트', () => {
    const { getByText } = render(
      <SelectContent
        pickCategory={0}
        selectPickCategory={() => {}}
        categories={categories}
        sub={sub}
      />
    );
    expect(getByText('Navigation')).toBeInTheDocument();
    expect(getByText('Cate1')).toBeInTheDocument();
    expect(getByText('Cate2')).toBeInTheDocument();
    expect(getByText('Cate3')).toBeInTheDocument();
  });

  test('select 함수 작동 체크', () => {
    const selectPickCategory = jest.fn();
    const { getByDisplayValue } = render(
      <SelectContent
        pickCategory={0}
        selectPickCategory={selectPickCategory}
        categories={categories}
        sub={sub}
      />
    );
    fireEvent.change(getByDisplayValue('Cate1'), { target: { value: '1' } });
    expect(selectPickCategory).toHaveBeenCalledTimes(1);
  });
});
