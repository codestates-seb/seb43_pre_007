import styled from 'styled-components';

import { Skeleton } from '../skeleton/Skeleton';

export const MarkDownEiditorSkeleton = () => {
  return (
    <Container>
      <Skeleton width={'100%'} height={'20px'} />
      <Skeleton width={'100%'} height={'10px'} />
      <Content>
        <Skeleton width={'20px'} height={'100px'} />
        <div className="value">
          <Skeleton width={'100%'} height={'100px'} />
        </div>
      </Content>
      <Skeleton width={'100%'} height={'20px'} />
      <Skeleton width={'100%'} height={'40px'} />
      <Skeleton width={'100%'} height={'20px'} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  .value {
    width: 100%;
    display: flex;
    flex-shrink: 2;
  }
`;
