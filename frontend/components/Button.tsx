import React, { ReactNode } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button<ButtonProps>`
  width: 100%;
  margin-left: calc(4px * 1);
  display: inline-block;
  background-color: ${(props) =>
    props.color === 'var(--text-aqua)' ? 'var(--bg-gray)' : 'var(--bg-blue)'};
  font-size: 0.82rem;
  padding: 6.5px 9px;
  border-radius: 4px;
  box-shadow: var(--btn-boxshadow);
  border: var(--btn-border);
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.color === 'var(--text-aqua)' ? '#add3f5' : '#2085cc'};
  }
  > a {
    color: ${(props) => props.color};
  }
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const Button = (props: ButtonProps) => {
  return <ButtonContainer {...props} />;
};
export default Button;
