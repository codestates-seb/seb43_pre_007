/* eslint-disable @next/next/no-img-element */
import { MdOutlineStars } from 'react-icons/md';
import Button from '../button/Button';
import { IoEarthSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import { PUBLIC_LI } from '@/constant/constant';

type LeftSideBarProps = {
  width: number;
};

const LeftSideBar = ({ width }: LeftSideBarProps) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <SideBarContainer width={width} className="left-side-bar">
      <div>
        <nav>
          <ol className="nav-links">
            <li
              className={
                currentPath === '/' ? 'nav-main focus-link' : 'nav-main'
              }
            >
              <Link href="/">Home</Link>
            </li>
            <li>
              <ol>
                <li className="nav-main">PUBLIC</li>
                {PUBLIC_LI.map((li) => (
                  <li
                    key={li}
                    className={
                      currentPath.includes(`/${li.toLowerCase()}`)
                        ? 'nav-serve focus-link'
                        : 'nav-serve'
                    }
                  >
                    <Link
                      href={li === 'Companies' ? '' : `/${li.toLowerCase()}`}
                    >
                      {li === 'Questions' && <IoEarthSharp />}
                      {li}
                    </Link>
                  </li>
                ))}
                <li className="nav-main">COLLECTIVES</li>
                <li
                  className={
                    currentPath.includes('/collectives')
                      ? 'nav-serve focus-link'
                      : 'nav-serve'
                  }
                >
                  <a className="collect-link">
                    <MdOutlineStars />
                    Explore Collectives
                  </a>
                </li>
              </ol>
            </li>
            <li>
              <div className="nav-main">TEAMS</div>
              <div className="teams-message">
                <strong>
                  Stack Overflow for Teams <span>– Start</span>
                </strong>{' '}
                <span>collaborating and sharing organizational knowledge.</span>
                <img
                  src="https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e"
                  alt="for-teams"
                />
                <Button>
                  <a>Create a free Team</a>
                </Button>
                <a>Why Teams?</a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div>Looking for your Teams?</div>
    </SideBarContainer>
  );
};
export default LeftSideBar;

const SideBarContainer = styled.div<LeftSideBarProps>`
  width: ${(props) => `${props.width}px`};
  display: block;
  top: 47px;
  z-index: 999;
  position: absolute;
  text-align: left;
  padding-top: 24px;
  background-color: white;
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

  .focus-link {
    background-color: var(--bg-gray);
    font-weight: 900;
    opacity: 1;
    border-right: 3px solid #ff7300;
  }

  .collect-link {
    > svg {
      color: #ff7300;
    }
  }

  .teams-message {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    font-size: 0.8rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 16px;
    overflow-wrap: break-word;
    border-top: 1px solid #dfdfdf;
    border-left: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    span {
      opacity: 0.7;
    }
    > strong {
      font-weight: 900;
      span {
        font-weight: normal;
      }
    }
    > img {
      margin: 0px calc((100% - 130px) / 2);
      width: 130px;
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
  > div:last-child {
    background-color: #f0f8ff;
    width: 99%;
    margin: 2px 0px;
    border-radius: 8px;
    padding: 10px 8px;
    font-size: 0.7rem;
    color: var(--text-blue);
  }
`;
