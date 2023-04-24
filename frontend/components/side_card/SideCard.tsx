import { ReactNode } from 'react';
import styled from 'styled-components';

type SideCardProps = {
  children: ReactNode;
};

const SideCard = (props: SideCardProps) => {
  return <SideCardBox {...props} />;
};

export default SideCard;

const SideCardBox = styled.div`
  padding-bottom: 10px;
  border: 1px solid var(--border-gray);
  border-radius: 6px;
  div {
    font-size: 0.78rem;
  }

  > div:first-child {
    padding: 15px 12px;
    font-weight: 500;
    border-bottom: 1px solid var(--border-gray);
  }

  > div:last-child {
    margin: 12px 0px;
    padding: 0px 12px;
    div {
      overflow-wrap: break-word;
    }
  }
`;
