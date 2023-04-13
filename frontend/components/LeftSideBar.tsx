/* eslint-disable @next/next/no-img-element */
import { MdOutlineStars } from 'react-icons/md';
import Button from './Button';
import { IoEarthSharp } from 'react-icons/io5';
import { useRouter } from 'next/router';
import styled from 'styled-components';

type LeftSideBarProps = {
  leftNav: boolean;
  width: number;
};

const LeftSideBar = ({ leftNav, width }: LeftSideBarProps) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const publicLi = ['Questions', 'Tags', 'Users', 'Companies'];
  return (
    <SideBar leftNav={leftNav} width={width}>
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
    </SideBar>
  );
};
export default LeftSideBar;

const SideBar = styled.div<LeftSideBarProps>`
  width: ${(props) => `${props.width}px`};
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

  .teams-message {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    font-size: 0.7rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    border-top: 1px solid #dfdfdf;
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
`;
