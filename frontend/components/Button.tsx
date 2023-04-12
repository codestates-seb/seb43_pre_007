import styled from 'styled-components';

type ButtonContainerProps = {
  checkGray: boolean | undefined;
};

const ButtonContainer = styled.a<ButtonContainerProps>`
  width: 100%;
  margin-left: calc(4px * 1);
  display: inline-block;
  background-color: ${(props) =>
    props.checkGray
      ? 'hsl(205.26315789473688, 44.186046511627865%, 91.56862745098039%)'
      : 'hsl(206, 100%, 52%)'};
  color: ${(props) =>
    props.checkGray
      ? 'hsl(205.38461538461542, 22.608695652173918%, 45.09803921568628%)'
      : 'white'};
  font-size: 0.82rem;
  padding: 6.5px 9px;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 0 hsla(0, 0%, 100%, 0.4);
  border: 1px solid hsl(205, 41%, 63%);
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.checkGray
        ? 'hsl(206.1818181818182, 52.38095238095237%, 79.41176470588236%)'
        : 'hsl(206.12244897959184, 57.6470588235294%, 50%)'};
  }
`;

type ButtonProps = {
  message: string;
  checkGray?: boolean;
};

const Button = ({ message, checkGray }: ButtonProps) => {
  return <ButtonContainer checkGray={checkGray}>{message}</ButtonContainer>;
};
export default Button;
