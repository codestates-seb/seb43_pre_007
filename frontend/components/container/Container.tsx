import styled from 'styled-components';
import LeftSideBar from '../side_bar/LeftSideBar';

type ContainerProps = {
  children: JSX.Element;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <PagesContainer>
      <div>
        <LeftSideBar width={164} />
      </div>
      <div>{children}</div>
    </PagesContainer>
  );
};

export default Container;

const PagesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px calc((100% - 1270px) / 2);
  > div:first-child {
    width: 13%;
    > .left-side-bar {
      margin-top: 5px;
      position: fixed;
      box-shadow: none;
    }
  }
  > div:last-child {
    width: 87%;
    border-left: 1px solid #cfd8df;
  }
`;
