import { render, fireEvent } from '@testing-library/react';
import MenuItem from './MenuItem';

test('<MenuItem/>', () => {
  const { getByText } = render(
    <MenuItem idx={1} pick={2}>
      Menu item
    </MenuItem>
  );

  const menuItem = getByText('Menu item');
  expect(menuItem).toHaveStyle('color: ""');
  expect(menuItem).toHaveStyle('background-color: ""');

  fireEvent.click(menuItem);
  expect(menuItem).toHaveStyle('color: "white"');
  expect(menuItem).toHaveStyle('background-color: "#f78b34"');
});