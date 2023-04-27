import styled from 'styled-components';
import LeftSideBar from '../side_bar/LeftSideBar';

type ContainerProps = {
  children: JSX.Element;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <PagesContainer>
        <div>
          <LeftSideBar width={164} />
        </div>
        <div>{children}</div>
      </PagesContainer>
    </>
  );
};
export default Container;

const PagesContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 50px calc((100% - 1270px) / 2);
  padding-bottom: 0px;
  > div:first-child {
    min-width: 164px;
    > .left-side-bar {
      margin-top: 5.5px;
      position: sticky;
      z-index: 0;
      box-shadow: none;
      margin-bottom: 20px;
    }
    @media (max-width: 740px) {
      display: none;
    }
  }
  > div:last-child {
    width: 87%;
    border-left: 1px solid var(--border-gray);
    @media (max-width: 740px) {
      width: 100%;
    }
  }
`;
