import { useState } from 'react';
import styled from 'styled-components';

type MenuItemProps = {
  active: boolean;
  onClick: () => void;
};

const MenuItem = ({ children }: { children: JSX.Element }) => {
  const [active, setActive] = useState(false);
  const activeHandler = () => {
    setActive(!active);
  };
  return (
    <MenuItemContainer active={active} onClick={activeHandler}>
      {children}
    </MenuItemContainer>
  );
};
export default MenuItem;

const MenuItemContainer = styled.a<MenuItemProps>`
  color: ${(props) => (props.active ? 'white' : '')};
  background-color: ${(props) => (props.active ? 'var(--bg-orange)' : '')};
  :hover {
    color: ${(props) => (props.active ? 'white' : '')};
    background-color: ${(props) => (props.active ? '#db7826' : '')};
  }
`;
