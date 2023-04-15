import styled from 'styled-components';

type CardProps = {
  children: JSX.Element | JSX.Element[];
};

const Card = ({ children }: CardProps) => {
  return <CardContainer className='card'>{children}</CardContainer>;
};

export default Card;

const CardContainer = styled.div`
  padding: 24px;
  border: 1px solid var(--border-gray);
  border-radius: 6px;
`;
