import { ReactNode } from 'react';
import { GoEye } from 'react-icons/go';
import Link from 'next/link';
import styled from 'styled-components';

export type ChipProps = {
  href: string;
  watch?: boolean;
  children: ReactNode;
};

export const Chip = ({ href, watch, children }: ChipProps) => {
  return (
    <Container href={href}>
      {watch && (
        <i role="img">
          {' '}
          <GoEye />
        </i>
      )}
      {children}
    </Container>
  );
};

const Container = styled(Link)`
  display: inline-flex;
  padding: 5px 6px;
  width: fit-content;
  height: 24px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  color: #39739d;
  background: #e1ecf4;
  vertical-align: bottom;
  cursor: pointer;

  &:hover {
    background: #d0e3f1;
  }

  & > svg {
    margin-right: 2px;
    width: 14px;
    height: 14px;
  }
`;