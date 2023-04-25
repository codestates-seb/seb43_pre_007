import { ReactNode } from 'react';
import styled from 'styled-components';

type SideCardProps = {
  children: ReactNode;
  textSize?: string;
};

const SideCard = ({ textSize, ...props }: SideCardProps) => {
  return <SideCardBox textSize={textSize} {...props} />;
};

export default SideCard;

const SideCardBox = styled.div<SideCardProps>`
  border: 1px solid var(--border-gray);
  border-radius: 6px;
  box-shadow: var(--box-shadow);

  div {
    font-size: 0.78rem;
  }

  > div:first-child {
    padding: 15px 12px;
    font-weight: ${(props) => (props.textSize === 'big' ? '100' : '500')};
    border-bottom: 1px solid var(--border-gray);
    font-size: ${(props) => props.textSize === 'big' && '0.95rem'};
  }

  > div:last-child {
    overflow-wrap: break-word;

    ul {
      padding-bottom: 16px;

      li {
        padding: 14px 12px;
        padding-bottom: 0px;
        line-height: 15px;

        > div:last-child {
          cursor: pointer;
        }

        > a {
          cursor: pointer;
          color: var(--text-blue);
        }
      }
    }
  }
`;
