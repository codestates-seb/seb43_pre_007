import styled, { css } from 'styled-components';
import { InputHTMLAttributes, RefObject } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  paddingLeft: string;
  inputRef?: RefObject<HTMLInputElement>;
}

const Input = ({ inputRef, paddingLeft, ...props }: InputProps) => {
  return <InputContainer ref={inputRef} paddingLeft={paddingLeft} {...props} />;
};

export default Input;

const InputContainer = styled.input<InputProps>`
  border: 1px solid #d1cdcd;
  border-radius: 3px;
  width: 100%;
  font-size: 0.8rem;
  padding: 8px 6px 8px 0px;
  line-height: 14px;
  color: #3d3c3b;
  :focus {
    outline: 1px solid rgba(0, 195, 255, 0.5);
    box-shadow: 0 0 8px 2px rgba(4, 137, 247, 0.555);
  }

  ${({ paddingLeft }) =>
    css`
      padding-left: ${paddingLeft};
    `}
`;
