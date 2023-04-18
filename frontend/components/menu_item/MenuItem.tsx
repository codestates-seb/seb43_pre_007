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
  width: 100%;
  font-size: 0.8rem;
  color: #867f78;
  padding: calc(6px * 1) calc(12px * 1);
  align-items: center;
  border-radius: 1000px;
  display: flex;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  :hover {
    color: black;
    background-color: #ececec;
  }
  @media (max-width: 740px) {
    font-size: 0.7rem;
  }
  color: ${(props) => (props.idx === props.pick ? 'white' : '')};
  background-color: ${(props) =>
    props.idx === props.pick ? 'var(--bg-orange)' : ''};
  :hover {
    color: ${(props) => (props.idx === props.pick ? 'white' : '')};
    background-color: ${(props) => (props.idx === props.pick ? '#db7826' : '')};
  }
`;
