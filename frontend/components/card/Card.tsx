import { ReactNode } from 'react';
import styled from 'styled-components';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const Card = (props: CardProps) => {
  return <CardContainer className="card" {...props} />;
};

export default Card;

const CardContainer = styled.div`
  padding: 24px;
  border: 1px solid var(--border-gray);
  border-radius: 6px;
`;
