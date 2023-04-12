import styled from 'styled-components';
import { GoSearch } from 'react-icons/go';
import { RxHamburgerMenu } from 'react-icons/rx';
import Button from './Button';
import { useRecoilState } from 'recoil';
import { leftNavState } from '@/recoil/atom';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type HeaderContainerProps = {
  leftNav: boolean;
};

const HeaderContainer = styled.header<HeaderContainerProps>`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 3px solid #f48225;
  height: 50px;
  z-index: 100;
  min-width: auto;
  background-color: hsl(210, 8%, 97.5%);
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  > div {
    height: 100%;
    width: 100%;
    display: flex;
    margin: 0 calc((100% - 1280px) / 2);
    align-items: center;
    @media (max-width: 1285px) {
      margin: 0;
      padding-right: 10px;
    }
  }
  .s-menu-bar {
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 47px;
    :hover {
      background-color: #ececec;
    }
    padding: 0px 16px;
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 640px) {
      display: flex;
    }
  }
  .s-menu {
    width: 240px;
    height: 500px;
    display: ${(props) => (props.leftNav ? 'block' : 'none')};
    top: 47px;
    z-index: 999;
    position: absolute;
    text-align: left;
    padding-top: 24px;
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
      0 2px 8px hsla(0, 0%, 0%, 0.05);
    ol {
      display: flex;
      flex-direction: column;
      width: 100%;
      li {
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 100%;
      }
    }
    .nav-main {
      padding: 8px 10px;
      font-size: 0.73rem;
      opacity: 0.6;
    }
    .nav-serve {
      padding: 8px 20px;
      font-size: 0.8rem;
      opacity: 0.6;
      cursor: pointer;
      :hover {
        opacity: 1;
      }
    }
  }
  .logo {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 calc(8px * 1);
    :hover {
      background-color: #ececec;
    }
    span {
      margin-left: 0;
      display: inline-block;
      text-indent: -9999em;
      width: 150px;
      height: 30px;
      margin-top: -4px;
      background-position: 0 -500px;
      background-image: url('https://cdn.sstatic.net/Img/unified/sprites.svg?v=fcc0ea44ba27');
      @media (max-width: 640px) {
        width: 25px;
      }
    }
  }
  .s-navigation {
    display: flex;
    list-style: none;
    margin: 0;
    > .about,
    .for-teams {
      @media (max-width: 980px) {
        display: none;
      }
    }
    li {
      border: 0;
      font: inherit;
      font-size: 100%;
      vertical-align: baseline;
      white-space: nowrap;
      @media (max-width: 640px) {
        margin-top: -6px;
      }
      a {
        font-size: 0.8rem;
        color: #867f78;
        padding: calc(6px * 1) calc(12px * 1);
        align-items: center;
        border-radius: 1000px;
        display: flex;
        position: relative;
        vertical-align: middle;
        cursor: pointer;
        :hover {
          color: black;
          background-color: #ececec;
        }
        @media (max-width: 640px) {
          font-size: 0.7rem;
        }
      }
    }
  }
  .products-menu {
  }
  form {
    width: 57.5%;
    height: 100%;
    padding: 0px calc(8px * 1);
    > div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      input {
        border: 1px solid #d1cdcd;
        border-radius: 3px;
        width: 100%;
        font-size: 0.8rem;
        padding: 8px 6px 8px 32px;
        line-height: 14px;
        color: #3d3c3b;
        :focus {
          outline: 1px solid rgba(0, 195, 255, 0.5);
          box-shadow: 0 0 8px 2px rgba(4, 137, 247, 0.555);
        }
      }
      svg {
        position: absolute;
        margin: 8px;
        font-size: 1.1rem;
        opacity: 0.5;
      }
    }
    @media (max-width: 640px) {
      display: none;
    }
  }
  nav {
    ol {
      @media (max-width: 350px) {
        overflow-x: scroll;
        width: calc((100vw - 100%));
        ::-webkit-scrollbar {
          width: 1px;
          height: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #c7c4c4;
          border-radius: 50px;
        }
      }
      @media (max-width: 220px) {
        width: 50px;
      }
      display: flex;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap; //부모 요소 내에서 텍스트가 줄 바꿈 유지
        @media (max-width: 350px) {
          margin-bottom: -1px;
        }
      }
    }
    @media (max-width: 640px) {
      margin-left: auto;
    }
    .nav-search {
      display: none;
      cursor: pointer;
      height: 47px;
      padding: 0px 10px;
      font-size: 1.15rem;
      opacity: 0.7;
      :hover {
        background-color: #ececec;
      }
      @media (max-width: 350px) {
        height: 38px;
      }
      @media (max-width: 640px) {
        display: flex;
      }
    }
  }
`;

const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  //좌측 네비를 위한 상태 및 함수
  const [leftNav, setLeftNav] = useRecoilState(leftNavState);
  const leftNavHandler = () => {
    setLeftNav(!leftNav);
  };
  const offLeftNav = () => {
    if (window.innerWidth > 640) {
      setLeftNav(false);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', offLeftNav);
  }, []);

  const publicLi = ['Questions', 'Tags', 'Users', 'Companies'];

  return (
    <HeaderContainer leftNav={leftNav}>
      <div>
        {/* 반응형으로 생기는 것들인듯 */}
        <a className="s-menu-bar" onClick={leftNavHandler}>
          <RxHamburgerMenu />
        </a>
        <div className="s-menu">
          <div>
            <nav>
              <ol className="nav-links">
                <li
                  className={
                    currentPath === '/' ? 'nav-main focus-link' : 'nav-main'
                  }
                >
                  <a href="/">Home</a>
                </li>
                <li>
                  <ol>
                    <li className="nav-main">PUBLIC</li>
                    {publicLi.map((li) => (
                      <li
                        key={li}
                        className={
                          currentPath === `/${li.toLowerCase()}`
                            ? 'nav-serve focus-link'
                            : 'nav-serve'
                        }
                      >
                        <a href={`/${li.toLowerCase()}`}>{li}</a>
                      </li>
                    ))}
                    <li className="nav-main">COLLECTIVES</li>
                    <li
                      className={
                        currentPath === '/collectives'
                          ? 'nav-serve focus-link'
                          : 'nav-serve'
                      }
                    >
                      <a href="/collectives">Explore Collectives</a>
                    </li>
                  </ol>
                </li>
                <li>
                  <div className="nav-main">TEAMS</div>
                  <div>
                    {/* <strong>Stack Overflow for Teams</strong>– Start
                    collaborating and sharing organizational knowledge. */}
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <Link className="logo" href="/">
          <span>Stack Overflow</span>
        </Link>
        <ol className="s-navigation">
          <li className="about">
            <a>About</a>
          </li>
          <li>
            <a>Products</a>
          </li>
          <li className="for-teams">
            <a>For Teams</a>
          </li>
        </ol>
        <div className="products-menu">
          {/* products 버튼 누르면 나오는 div*/}
          <div></div>
          <ol>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ol>
        </div>
        <form action="#">
          <div>
            <input type="text" placeholder="Search..." />
            <GoSearch />
            <div>
              <div></div>
              <div></div>
              <span></span>
              <div></div>
              <div></div>
            </div>
          </div>
        </form>
        <nav>
          {/* 네비바 */}
          <ol>
            <li></li>
            <li className="nav-search">
              <GoSearch />
            </li>
            <li>
              <Button color={'var(--text-aqua)'}>
                <Link href="/users/login">Login</Link>
              </Button>
            </li>
            <li>
              <Button color={'var(--text-white)'}>
                <Link href="/users/signup">Sign Up</Link>
              </Button>
            </li>
          </ol>
        </nav>
      </div>
    </HeaderContainer>
  );
};
export default Header;
