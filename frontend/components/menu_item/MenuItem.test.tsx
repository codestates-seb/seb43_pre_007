import { render } from '@testing-library/react';
import MenuItem from './MenuItem';

describe('<MenuItem>', () => {
  it('텍스트 체크', () => {
    const { getByText } = render(
      <MenuItem>
        <>Menu item text</>
      </MenuItem>
    );
    expect(getByText('Menu item text')).toBeInTheDocument();
  });
});
