import { AnchorHTMLAttributes } from 'react';
import styled from 'styled-components';

interface MenuItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  idx: number;
  pick: number;
}

const MenuItem = ({ idx, pick, ...props }: MenuItemProps) => {
  return <MenuItemContainer idx={idx} pick={pick} {...props} />;
};
export default MenuItem;

const MenuItemContainer = styled.a<MenuItemProps>`
  color: ${(props) => (props.idx === props.pick ? 'white' : '')};
  background-color: ${(props) =>
    props.idx === props.pick ? 'var(--bg-orange)' : ''};
  :hover {
    color: ${(props) => (props.idx === props.pick ? 'white' : '')};
    background-color: ${(props) => (props.idx === props.pick ? '#db7826' : '')};
  }
`;
