import styled from 'styled-components';
import LeftSideBar from '../side_bar/LeftSideBar';
import Modal from '../modal/modal';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { pickCategoryState, pickState } from '@/recoil/atom';

type ContainerProps = {
  children: JSX.Element;
};

const Container = ({ children }: ContainerProps) => {
  const pickCategory = useRecoilValue(pickCategoryState);
  //body 높이
  const pick = useRecoilValue(pickState);
  const [bodyHeight, setBodyHeight] = useState(0);
  useEffect(() => {
    setBodyHeight(document.body.clientHeight);
  }, [pick, pickCategory]);
  //Y스크롤
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <Modal />
      <PagesContainer
        scrollY={scrollY}
        scroll={bodyHeight - scrollY}
        pickCategory={pickCategory}
      >
        <div>
          <LeftSideBar width={164} />
        </div>
        <div>{children}</div>
      </PagesContainer>
    </>
  );
};

export default Container;

type PagesContainerProps = {
  scroll: number;
  scrollY: number;
  pickCategory: number;
};

const PagesContainer = styled.div<PagesContainerProps>`
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
      position: ${(props) =>
        props.scroll < 1000 || props.pickCategory !== 0 ? '' : 'fixed'};
      top: ${(props) => (props.scroll < 1000 ? `${props.scrollY}px` : '')};
      z-index: 0;
      box-shadow: none;
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
