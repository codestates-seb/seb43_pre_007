/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { GoSearch } from 'react-icons/go';
import { IoEarthSharp } from 'react-icons/io5';
import { MdOutlineStars } from 'react-icons/md';
import Button from './Button';
import { useRecoilState } from 'recoil';
import { leftNavState } from '@/recoil/atom';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useOffClick } from '@/hooks/useOffClick';

type HeaderContainerProps = {
  leftNav: boolean;
  productsNav: boolean;
  searchNav: boolean;
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
  box-shadow: var(--box-shadow);

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
    > span {
      width: 16px;
      height: 2px;
      background-color: ${(props) =>
        props.leftNav ? '' : 'var(--bg-left-nav)'};
      ::before {
        position: absolute;
        content: '';
        background-color: var(--bg-left-nav);
        width: 16px;
        height: 2px;
        left: 10;
        top: ${(props) => (props.leftNav ? '24px' : '18px')};
        transition-duration: 0.1s;
        transform: ${(props) => (props.leftNav ? 'rotate(45deg)' : '')};
      }
      ::after {
        position: absolute;
        content: '';
        background-color: var(--bg-left-nav);
        width: 16px;
        height: 2px;
        left: 10;
        top: ${(props) => (props.leftNav ? '24px' : '28px')};
        transition-duration: 0.1s;
        transform: ${(props) => (props.leftNav ? 'rotate(-45deg)' : '')};
      }
    }
  }

  .s-menu {
    width: 240px;
    display: ${(props) => (props.leftNav ? 'block' : 'none')};
    top: 47px;
    z-index: 999;
    position: absolute;
    text-align: left;
    padding-top: 24px;
    box-shadow: var(--box-shadow);
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
      margin: 2px 0px;
    }
    .nav-serve {
      padding: 8px 28px;
      font-size: 0.8rem;
      opacity: 0.6;
      margin: 1px 0px;
      display: flex;
      position: relative;
      cursor: pointer;
      :hover {
        opacity: 1;
      }
      svg {
        position: absolute;
        left: 6px;
        bottom: 6px;
        font-size: 1.2rem;
      }
    }
    .collect-link {
      > svg {
        color: #ff7300;
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
    .about,
    .for-teams {
      @media (max-width: 980px) {
        display: none;
      }
    }
    .products {
      > a {
        color: ${(props) => (props.productsNav ? 'white' : '')};
        background-color: ${(props) =>
          props.productsNav ? 'var(--bg-orange)' : ''};
        :hover {
          color: ${(props) => (props.productsNav ? 'white' : '')};
          background-color: ${(props) => (props.productsNav ? '#db7826' : '')};
        }
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
    width: 210px;
    height: 260px;
    position: absolute;
    border-radius: 4px;
    margin: 0px;
    z-index: 1000;
    transform: translate(158px, 154px);
    box-shadow: var(--box-shadow);
    background-color: white;
    display: ${(props) => (props.productsNav ? 'flex' : 'none')};
    @media (max-width: 980px) {
      transform: translate(98px, 154px);
    }
    @media (max-width: 640px) {
      transform: translate(37px, 154px);
      width: 178px;
    }
    > div {
      position: absolute;
      left: 100px;
      width: 12px;
      height: 12px;
      background-color: white;
      top: -7px;
      border-top: 1px solid var(--thin-white-border-color);
      border-left: 1px solid var(--thin-white-border-color);
      transform: rotate(45deg);
      @media (max-width: 640px) {
        left: 85px;
      }
    }
    li {
      width: 100%;
      padding: 6px 12px;
      z-index: 1000;
      font-size: 0.8rem;
      a {
        display: flex;
        flex-direction: column;
        span:last-child {
          font-size: 0.7rem;
          opacity: 0.6;
        }
      }
      :hover {
        background-color: #d6d6d6;
      }
    }
    li:last-child {
      border-top: 1px solid var(--thin-white-border-color);
      > a {
        margin-top: 3px;
        span {
          font-size: 0.8rem;
          :hover {
            opacity: 1;
          }
        }
      }
      :hover {
        background-color: white;
      }
    }
  }

  form {
    width: 57.5%;
    height: 100%;
    padding: 0px calc(8px * 1);
    position: relative;
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
      > .search-nav {
        display: ${(props) => (props.searchNav ? '' : 'none')};
        box-shadow: var(--box-shadow);
        position: absolute;
        width: 97.5%;
        top: 54px;
        height: 180px;
        z-index: 101;
        > div:first-child {
          position: absolute;
          width: 16px;
          height: 16px;
          z-index: 100;
          background-color: white;
          top: -10px;
          left: 50%;
          border-top: 1px solid var(--thin-white-border-color);
          border-left: 1px solid var(--thin-white-border-color);
          transform: rotate(45deg);
        }
        > div:last-child {
          > div:first-child {
            width: 100%;
            display: flex;
            font-size: 0.85rem;
            padding: 12px;
            margin-right: 4px;
            border-bottom: 1px solid var(--thin-white-border-color);
            > div {
              width: 50%;
              > div {
                opacity: 0.8;
                span:first-child {
                  font-weight: 900;
                  margin-right: 4px;
                }
                margin-bottom: 12px;
                display: flex;
                @media (max-width: 880px) {
                  flex-direction: column;
                }
              }
              > div:last-child {
                margin-bottom: 0px;
              }
            }
          }
          > div:last-child {
            height: 100%;
            padding: 8px;
            display: flex;
            justify-content: space-between;
            > div:last-child {
              font-size: 0.7rem;
              padding: 8px;
              color: var(--bg-blue);
            }
          }
        }
      }
    }
    @media (max-width: 640px) {
      display: none;
    }
  }

  nav {
    .right-ol {
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
    @media (max-width: 640px) {
      margin-left: auto;
    }

    .teams-message {
      width: 240px;
      display: flex;
      flex-direction: column;
      padding: 10px 10px;
      font-size: 0.7rem;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow-wrap: break-word;
      border-top: 1px solid #dfdfdf;
      > img {
        width: 130px;
        margin: 8px 50px;
      }
      button {
        background-color: var(--bg-orange);
        border: 1px solid var(--bg-orange);
        padding: 5.5px;
        > a {
          font-size: 0.68rem;
          color: white;
        }
      }
      > a {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 6px 0px;
        font-size: 0.7rem;
        opacity: 0.7;
      }
    }
  }
`;

const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  //좌측 네비를 위한 상태 및 함수
  const publicLi = ['Questions', 'Tags', 'Users', 'Companies'];
  const [leftNav, setLeftNav] = useRecoilState(leftNavState);
  const leftNavHandler = () => {
    setProductNav(false);
    setSearchNav(false);
    setLeftNav(!leftNav);
  };

  //화면 크기에 따라 nav들 off
  const offNav = () => {
    if (window.innerWidth > 640) {
      setLeftNav(false);
      setSearchNav(false);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', offNav);
  }, []);

  //products 네비를 위한 상태 및 함수
  const [productsNav, setProductNav, productsNavRef] =
    useOffClick<HTMLLIElement>(false);
  const prodeutsNavHandler = () => {
    setProductNav(!productsNav);
  };

  //search 네비를 위한 상태 및 함수
  const [searchNav, setSearchNav, searchNavRef] =
    useOffClick<HTMLInputElement>(false);
  const onSearchNav = () => {
    setSearchNav(true);
  };

  return (
    <HeaderContainer
      leftNav={leftNav}
      productsNav={productsNav}
      searchNav={searchNav}
    >
      <div>
        <a className="s-menu-bar" onClick={leftNavHandler}>
          {/* 왼쪽 네비 버튼 */}
          <span></span>
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
                        <a href={`/${li.toLowerCase()}`}>
                          {li === 'Questions' && <IoEarthSharp />}
                          {li}
                        </a>
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
                      <a href="/collectives" className="collect-link">
                        <MdOutlineStars />
                        Explore Collectives
                      </a>
                    </li>
                  </ol>
                </li>
                <li>
                  <div className="nav-main">TEAMS</div>
                  <div className="teams-message">
                    <strong>Stack Overflow for Teams – Start</strong>
                    collaborating and sharing organizational knowledge.
                    <img
                      src="https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e"
                      alt="for-teams"
                    />
                    <Button>
                      <a href="#">Create a free Team</a>
                    </Button>
                    <a href="#">Why Teams?</a>
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
          <li
            ref={productsNavRef}
            className="products"
            onClick={prodeutsNavHandler}
          >
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
            <li>
              <Link href="/questions">
                <span>Stack Overflow</span>
                <span>Public questions & answers</span>
              </Link>
            </li>
            <li>
              <Link href="/questions">
                <span>Stack Overflow for Teams</span>
                <span>
                  Where developers & technologists share private knowledge with
                  coworkers
                </span>
              </Link>
            </li>
            <li>
              <a href="#">
                <span>Talent</span>
                <span>Build your employer brand</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Advertising</span>
                <span>Reach developers & technologists worldwide</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>About the company</span>
              </a>
            </li>
          </ol>
        </div>
        <form action="#">
          <div>
            <input
              type="text"
              placeholder="Search..."
              ref={searchNavRef}
              onClick={onSearchNav}
            />
            <GoSearch />
            <div className="search-nav">
              <div></div>
              <div>
                <div>
                  <div>
                    <div>
                      <span>[tag]</span>
                      <span>search within a tag</span>
                    </div>
                    <div>
                      <span>user:1234</span>
                      <span>search by author</span>
                    </div>
                    <div>
                      <span>&quot;words here&quot;</span>
                      <span>exact phrase</span>
                    </div>
                    <div>
                      <span>collective:&quot;Name&quot;</span>
                      <span>collective content</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <span>answers:0</span>
                      <span>unanswered questions</span>
                    </div>
                    <div>
                      <span>score:3</span>
                      <span>posts with a 3+ score</span>
                    </div>
                    <div>
                      <span>is:question</span>
                      <span>type of post</span>
                    </div>
                    <div>
                      <span>isaccepted:yes</span>
                      <span>search within status</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <Button color={'var(--text-aqua)'}>
                      <Link href="/questions/ask">Ask a question</Link>
                    </Button>
                  </div>
                  <div>Search help</div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <nav>
          {/* 네비바 */}
          <ol className="right-ol">
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
