/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { GoSearch } from 'react-icons/go';
import Button from '../button/Button';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useOffClick } from '@/hooks/useOffClick';
import LeftSideBar from '../side_bar/LeftSideBar';
import Input from '../input/Input';
import { useInput } from '@/hooks/useInput';
import { useOffResize } from '@/hooks/useOffResize';
import { useRecoilState } from 'recoil';
import { isLoginState, userDataState } from '@/recoil/atom';
import { api } from '@/util/api';
import { DEFAULT_IMG } from '@/constant/constant';

type HeaderContainerProps = {
  leftNav: boolean;
  productsNav: boolean;
  searchNav: boolean;
  rightNav: boolean;
  isLogin: boolean;
};

const Header = () => {
  //좌측 네비를 위한 상태 및 함수
  const [leftNav, setLeftNav] = useState(false);
  const leftNavHandler = () => {
    setProductNav(false);
    setSearchNav(false);
    setLeftNav(!leftNav);
  };

  //products 네비를 위한 상태 및 함수setUserLog
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

  //right 네비를 위한 상태 및 함수
  const [rightNav, setRightNav, rightNavRef] =
    useOffClick<HTMLLIElement>(false);
  const rightNavHandler = () => {
    setRightNav(!rightNav);
  };

  //search input val
  const [form, onChange] = useInput({ searchContent: '' });

  //resize로 인해 off
  useOffResize(740, 'up', setLeftNav);
  useOffResize(740, 'down', setSearchNav);
  useOffResize(350, 'down', setRightNav);

  //유저 데이터
  const [userData, setUserData] = useRecoilState(userDataState);
  //새로고침 유저 대비
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  useEffect(() => {
    api('/auth')
      .then((res) => {
        setUserData(res.data);
        setIsLogin(true);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HeaderContainer
      leftNav={leftNav}
      productsNav={productsNav}
      searchNav={searchNav}
      rightNav={rightNav}
      isLogin={isLogin}
    >
      <div>
        <a className="s-menu-bar" onClick={leftNavHandler}>
          <span></span>
        </a>
        {leftNav && <LeftSideBar width={220} />}
        <Link className="logo" href="/">
          <span>Stack Overflow</span>
        </Link>
        <ol className="s-navigation">
          {!isLogin && (
            <li className="about">
              <a>About</a>
            </li>
          )}
          <li
            ref={productsNavRef}
            className="products"
            onClick={prodeutsNavHandler}
          >
            <a>Products</a>
          </li>
          {!isLogin && (
            <li className="for-teams">
              <a>For Teams</a>
            </li>
          )}
        </ol>
        <div className="products-menu">
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
              <a>
                <span>Talent</span>
                <span>Build your employer brand</span>
              </a>
            </li>
            <li>
              <a>
                <span>Advertising</span>
                <span>Reach developers & technologists worldwide</span>
              </a>
            </li>
            <li>
              <a>
                <span>About the company</span>
              </a>
            </li>
          </ol>
        </div>
        <form action="#">
          <div>
            <Input
              inputRef={searchNavRef}
              type="text"
              placeholder="Search..."
              name="searchContent"
              value={form.searchContent}
              onChange={onChange}
              onClick={onSearchNav}
              paddingLeft="32px"
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
          <ol className="right-ol">
            <li className="nav-search">
              <GoSearch />
            </li>
            {isLogin ? (
              <>
                <li className="user-img">
                  <Link
                    href={`/users/${userData.user_id}/${userData.display_name}`}
                  >
                    <img
                      src={userData.image ? `${userData.image}` : DEFAULT_IMG}
                      alt=""
                    />
                  </Link>
                  <span>1</span>
                </li>
                <li className="right-icons">
                  <a>
                    <svg width="20" height="18" viewBox="0 0 20 18">
                      <path d="M4.63 1h10.56a2 2 0 0 1 1.94 1.35L20 10.79V15a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-4.21l2.78-8.44c.25-.8 1-1.36 1.85-1.35Zm8.28 12 2-2h2.95l-2.44-7.32a1 1 0 0 0-.95-.68H5.35a1 1 0 0 0-.95.68L1.96 11h2.95l2 2h6Z"></path>
                    </svg>
                  </a>
                </li>
                <li className="right-icons">
                  <a>
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <path d="M15 2V1H3v1H0v4c0 1.6 1.4 3 3 3v1c.4 1.5 3 2.6 5 3v2H5s-1 1.5-1 2h10c0-.4-1-2-1-2h-3v-2c2-.4 4.6-1.5 5-3V9c1.6-.2 3-1.4 3-3V2h-3ZM3 7c-.5 0-1-.5-1-1V4h1v3Zm8.4 2.5L9 8 6.6 9.4l1-2.7L5 5h3l1-2.7L10 5h2.8l-2.3 1.8 1 2.7h-.1ZM16 6c0 .5-.5 1-1 1V4h1v2Z"></path>
                    </svg>
                  </a>
                </li>
                <li className="right-icons">
                  <a>
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <path d="M9 1C4.64 1 1 4.64 1 9c0 4.36 3.64 8 8 8 4.36 0 8-3.64 8-8 0-4.36-3.64-8-8-8Zm.81 12.13c-.02.71-.55 1.15-1.24 1.13-.66-.02-1.17-.49-1.15-1.2.02-.72.56-1.18 1.22-1.16.7.03 1.2.51 1.17 1.23ZM11.77 8c-.59.66-1.78 1.09-2.05 1.97a4 4 0 0 0-.09.75c0 .05-.03.16-.18.16H7.88c-.16 0-.18-.1-.18-.15.06-1.35.66-2.2 1.83-2.88.39-.29.7-.75.7-1.24.01-1.24-1.64-1.82-2.35-.72-.21.33-.18.73-.18 1.1H5.75c0-1.97 1.03-3.26 3.03-3.26 1.75 0 3.47.87 3.47 2.83 0 .57-.2 1.05-.48 1.44Z"></path>
                    </svg>
                  </a>
                </li>
                <li
                  className="right-icons"
                  ref={rightNavRef}
                  onClick={rightNavHandler}
                >
                  <a>
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <path d="M15 1H3a2 2 0 0 0-2 2v2h16V3a2 2 0 0 0-2-2ZM1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 0 0 2-2v-2H1v2Zm16-7H1v4h16V6Z"></path>
                    </svg>
                  </a>
                </li>
                <li className="right-nav">
                  <div>
                    <div>
                      <div>
                        <span>CURRENT COMMUNITY</span>
                      </div>
                      <div>
                        <div>
                          <span></span>
                          <span>Stack Overflow</span>
                        </div>
                        <div>
                          <span>help</span>
                          <span>chat</span>
                          <Link href={'/users/logout'}>log out</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button color={'var(--text-aqua)'}>
                    <Link href="/users/login">Log in</Link>
                  </Button>
                </li>
                <li>
                  <Button color={'var(--text-white)'}>
                    <Link href="/users/signup">Sign Up</Link>
                  </Button>
                </li>
              </>
            )}
          </ol>
        </nav>
      </div>
    </HeaderContainer>
  );
};
export default Header;

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
    @media (max-width: 740px) {
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
      @media (max-width: 740px) {
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
      @media (max-width: 740px) {
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
        @media (max-width: 740px) {
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
    @media (max-width: 740px) {
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
      @media (max-width: 740px) {
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
          margin: 4px 0px;
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
    width: ${(props) => (props.isLogin ? '61.7%' : '57.5%')};
    height: 100%;
    padding: 0px calc(8px * 1);
    position: relative;
    > div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

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
        z-index: 101;
        background-color: white;
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
    @media (max-width: 740px) {
      display: none;
    }
  }

  nav {
    .right-ol {
      position: relative;
      @media (max-width: 350px) {
        overflow-x: scroll;
        width: ${(props) =>
          props.isLogin ? 'calc((100vw - 60%))' : 'calc((100vw - 100%))'};
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
        width: ${(props) => (props.isLogin ? '60px' : '50px')};
      }
      display: flex;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap; //부모 요소 내에서 텍스트가 줄 바꿈 유지
        @media (max-width: 350px) {
          margin-bottom: ${(props) => (props.isLogin ? '-10px' : '-1px')};
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
          height: ${(props) => (props.isLogin ? '' : '38px')};
        }
        @media (max-width: 740px) {
          display: flex;
        }
      }
    }
    @media (max-width: 740px) {
      margin-left: auto;
    }

    .user-img {
      padding-left: 12px;
      padding-right: 18px;
      height: 47px;
      cursor: pointer;
      :hover {
        background-color: var(--bg-gray);
      }
      a {
        width: 24px;
        height: 24px;
        img {
          width: 100%;
        }
      }
      span {
        font-size: 0.8rem;
        font-weight: 900;
        padding-left: 4px;
      }
    }

    .right-icons {
      cursor: pointer;
      padding-top: 5px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: 0.65;
      :hover {
        background-color: var(--bg-gray);
        opacity: 1;
      }
    }

    .right-nav {
      display: ${(props) => (props.rightNav ? '' : 'none !important')};
      position: absolute;
      box-shadow: var(--box-shadow);
      left: -86px;
      top: 48px;
      width: 305px;
      background-color: white;
      z-index: 1000;
      font-size: 0.7rem;
      div {
        width: 100%;
      }
      span {
        :hover {
          color: #024fdd;
          cursor: pointer;
        }
      }
      a {
        :hover {
          color: #024fdd;
          cursor: pointer;
        }
      }
      > div {
        height: 100%;
        > div {
          div {
            color: var(--text-blue);
          }
          a {
            color: var(--text-blue);
          }
          > div:first-child {
            padding: 12px 8px;
            font-weight: 900;
            background-color: var(--bg-gray);
          }
          > div:last-child {
            padding: 14px 8px;
            display: flex;
            > div:first-child {
              position: relative;
              > span:first-child {
                display: inline-block;
                width: 16px;
                height: 16px;
                top: -2px;
                position: absolute;
                background-image: url('https://cdn.sstatic.net/Img/favicons-sprite16.png?v=8b2bfd648b55');
                background-size: 16px;
                background-position: 0 -6138px;
              }
              > span:last-child {
                padding-left: 24px;
              }
            }
            > div:last-child {
              display: flex;
              justify-content: end;
              span {
                margin: 0px 4px;
              }
            }
          }
        }
      }
    }
  }
`;
