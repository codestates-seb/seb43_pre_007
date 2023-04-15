/* eslint-disable @next/next/no-img-element */
import Button from '@/components/button/Button';
import Card from '@/components/card/Card';
import MenuItem from '@/components/menu_item/MenuItem';
import { detailNav } from '@/constant/constant';
import { useState } from 'react';
import styled from 'styled-components';

//경로 https://stackoverflow.com/users/6117017/timbus-calin
const UserDetail = () => {
  const [pick, setPick] = useState(0);
  const pickHandler = (idx: number) => {
    setPick(idx);
  };
  return (
    <UsersDetailContainer>
      <div className="profile">
        <div>
          <img
            src="https://www.gravatar.com/avatar/fa28bb5d084ba33bf405fbd8b3b1349b?s=256&d=identicon&r=PG&f=y&so-version=2"
            alt="profile"
          />
        </div>
        <div>
          <div>신동민</div>
          <div>
            <div>
              <div>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M9 4.5a1.5 1.5 0 0 0 1.28-2.27L9 0 7.72 2.23c-.14.22-.22.48-.22.77 0 .83.68 1.5 1.5 1.5Zm3.45 7.5-.8-.81-.81.8c-.98.98-2.69.98-3.67 0l-.8-.8-.82.8c-.49.49-1.14.76-1.83.76-.55 0-1.3-.17-1.72-.46V15c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-2.7c-.42.28-1.17.45-1.72.45-.69 0-1.34-.27-1.83-.76Zm1.3-5H10V5H8v2H4.25C3 7 2 8 2 9.25v.9c0 .81.91 1.47 1.72 1.47.39 0 .77-.14 1.03-.42l1.61-1.6 1.6 1.6a1.5 1.5 0 0 0 2.08 0l1.6-1.6 1.6 1.6c.28.28.64.43 1.03.43.81 0 1.73-.67 1.73-1.48v-.9C16 8.01 15 7 13.75 7Z"></path>
                </svg>
              </div>
              <div>Member for 5 days</div>
            </div>
            <div>
              <div>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M9 17c-4.36 0-8-3.64-8-8 0-4.36 3.64-8 8-8 4.36 0 8 3.64 8 8 0 4.36-3.64 8-8 8Zm0-2c3.27 0 6-2.73 6-6s-2.73-6-6-6-6 2.73-6 6 2.73 6 6 6ZM8 5h1.01L9 9.36l3.22 2.1-.6.93L8 10V5Z"></path>
                </svg>
              </div>
              <div>Last seen this week</div>
            </div>
            <div>
              <div>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M14 2h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h1V0h2v2h6V0h2v2ZM3 6v9h12V6H3Zm2 2h2v2H5V8Zm0 3h2v2H5v-2Zm3 0h2v2H8v-2Zm3 0h2v2h-2v-2Zm0-3h2v2h-2V8ZM8 8h2v2H8V8Z"></path>
                </svg>
              </div>
              <div>Visited 5 days, 5 consecutive</div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <Button>
              <span>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="m13.68 2.15 2.17 2.17c.2.2.2.51 0 .71L14.5 6.39l-2.88-2.88 1.35-1.36c.2-.2.51-.2.71 0ZM2 13.13l8.5-8.5 2.88 2.88-8.5 8.5H2v-2.88Z"></path>
                </svg>
              </span>
              <span>Edit profile</span>
            </Button>
          </div>
          <div>
            <Button>
              <span>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path
                    d="M3 4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2H3Z"
                    fill="#8FD8F7"
                  ></path>
                  <path
                    d="M15 11H3c0 1.1.9 2 2 2h5v3l3-3a2 2 0 0 0 2-2Z"
                    fill="#155397"
                  ></path>
                  <path fill="#46A2D9" d="M3 5h12v2H3z"></path>
                  <path fill="#2D6DB5" d="M3 8h12v2H3z"></path>
                </svg>
              </span>
              <span>Network profile</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="detail_nav">
        <ul>
          {detailNav.map((category, i) => (
            <li key={category}>
              <MenuItem onClick={() => pickHandler(i)} idx={i} pick={pick}>
                {category}
              </MenuItem>
            </li>
          ))}
        </ul>
      </div>
      <div className="profile_content">
        <div>
          <div className="stats">
            <div>Stats</div>
            <Card>
              <div>
                <div>1</div>
                <div>reputation</div>
              </div>
              <div>
                <div>0</div>
                <div>reached</div>
              </div>
              <div>
                <div>0</div>
                <div>answers</div>
              </div>
              <div>
                <div>0</div>
                <div>questions</div>
              </div>
            </Card>
          </div>
          <div className="communities">
            <div>
              <div>Communities</div>
              <div>Edit</div>
            </div>
            <Card>
              <div>
                <div className="flow_icon"></div>
                <a>Stack Overflow</a>
              </div>
              <div>
                <a>1</a>
              </div>
            </Card>
          </div>
        </div>
        <div className="right-content">
          <div>
            <div className="right-category">About</div>
            <Card>
              <div>
                Your about me section is currently blank. Would you
                <p /> like to add one? <a>Edit profile</a>
              </div>
            </Card>
          </div>
          <div>
            <div className="right-category">Badges</div>
            <Card>
              <div>
                You have not earned any <a>badges.</a>
              </div>
            </Card>
          </div>
          <div>
            <div className="right-category">Posts</div>
            <Card>
              <div className="posts_img">
                <svg width="196" height="196" viewBox="0 0 196 196">
                  <path
                    d="M35 177.5c-19.5-9-29.35-26.54-26-82 3.35-55.46 14.8-66.9 32.5-73 17.7-6.1 86.22-21.95 120 5.5s37.46 52.67 23 96.5c-14.46 43.84-22.26 63.24-60 61-11.4-.68-22.3-.85-32.5-1.02-23.56-.38-43.4-.7-57-6.98ZM33 42v26a7 7 0 0 0 7 7h113a7 7 0 0 0 7-7V42a7 7 0 0 0-7-7H40a7 7 0 0 0-7 7Zm7 39a7 7 0 0 0-7 7v27a7 7 0 0 0 7 7h113a7 7 0 0 0 7-7V88a7 7 0 0 0-7-7H40Z"
                    opacity=".07"
                  ></path>
                  <path
                    d="M42 48a4 4 0 0 1 4-4h112a7 7 0 0 1 7 7v23a7 7 0 0 1-7 7H49a7 7 0 0 1-7-7V48Zm0 47a4 4 0 0 1 4-4h112a7 7 0 0 1 7 7v22a7 7 0 0 1-7 7H49a7 7 0 0 1-7-7V95Zm-1 36h3.19a2 2 0 1 1 0 4H40a3 3 0 0 0-3 3v4.44a2 2 0 1 1-4 0V138a7 7 0 0 1 7-7h1Zm11.65 2c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.38a2 2 0 1 1 0 4H92.3a2 2 0 0 1-2-2Zm18.84 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2H153a7 7 0 0 1 7 7v4.44a2 2 0 1 1-4 0v-4.58a3 3 0 0 0-3-2.86h-4.19a2 2 0 0 1-2-2ZM35 151.56a2 2 0 0 1 2 2v4.51a3 3 0 0 0 3 2.93h4.19a2 2 0 1 1 0 4h-4.35a7 7 0 0 1-6.84-7v-4.44c0-1.1.9-2 2-2Zm123 0a2 2 0 0 1 2 2v4.74a7 7 0 0 1-7 6.69h-4.19a2 2 0 1 1 0-4h4.33a3 3 0 0 0 2.86-3v-4.43c0-1.1.9-2 2-2ZM52.65 163c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 1 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.38a2 2 0 1 1 0 4H92.3a2 2 0 0 1-2-2Zm18.84 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2Zm18.83 0c0-1.1.9-2 2-2h8.37a2 2 0 0 1 0 4h-8.37a2 2 0 0 1-2-2Z"
                    opacity=".2"
                  ></path>
                  <path d="M124.48 14.24 120.25 10 116 14.24l4.24 4.25 4.25-4.25ZM52 58a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm12-4c0-1.1.9-2 2-2h80a2 2 0 1 1 0 4H66a2 2 0 0 1-2-2ZM33 42a7 7 0 0 1 7-7h113a7 7 0 0 1 7 7v26a7 7 0 0 1-7 7H40a7 7 0 0 1-7-7V42Zm7-3a3 3 0 0 0-3 3v26a3 3 0 0 0 3 3h113a3 3 0 0 0 3-3V42a3 3 0 0 0-3-3H40Zm16 62a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm10-2a2 2 0 1 0 0 4h80a2 2 0 1 0 0-4H66ZM40 81a7 7 0 0 0-7 7v27a7 7 0 0 0 7 7h113a7 7 0 0 0 7-7V88a7 7 0 0 0-7-7H40Zm-3 7a3 3 0 0 1 3-3h113a3 3 0 0 1 3 3v27a3 3 0 0 1-3 3H40a3 3 0 0 1-3-3V88Zm150.97 54.49L179.5 134l-8.49 8.49 8.49 8.48 8.48-8.48Zm-8.48 2.82-2.83-2.82 2.83-2.83 2.82 2.83-2.82 2.82ZM8 97a2 2 0 0 1 2 2v4h4a2 2 0 1 1 0 4h-4v4a2 2 0 1 1-4 0v-4H2a2 2 0 1 1 0-4h4v-4c0-1.1.9-2 2-2Z"></path>
                </svg>
              </div>
              <div>
                Just getting started? Try answering a question!
                <p className="double_p" />
                Your most helpful questions, answers and tags will appear here.
                Start by <p />
                <a>answering a question or selecting tags</a> that match topics
                you’re <p />
                interested in.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </UsersDetailContainer>
  );
};
export default UserDetail;

const UsersDetailContainer = styled.div`
  padding: 24px;

  > .profile {
    display: flex;
    position: relative;
    @media (max-width: 980px) {
      flex-direction: column;
    }
    > div:first-child {
      margin: 8px;
      img {
        border-radius: 6px;
        width: 128px;
        @media (max-width: 980px) {
          width: 96px;
        }
        @media (max-width: 740px) {
          width: 64px;
        }
      }
    }
    > div:nth-child(2) {
      margin: auto 0px;
      margin-left: 8px;
      > div:first-child {
        font-size: 2rem;
      }
      > div:last-child {
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        margin-top: 18px;
        opacity: 0.73;
        @media (max-width: 740px) {
          font-size: 0.7rem;
        }
        @media (max-width: 540px) {
          flex-direction: column;
          align-items: start;
        }
        div {
          display: flex;
          align-items: center;
          vertical-align: middle;
          @media (max-width: 540px) {
            margin: 2px 0px;
          }
          > svg {
            opacity: 0.55;
          }
        }
        > div {
          div:last-child {
            margin-left: 3px;
            margin-right: 8px;
          }
        }
      }
    }
    > div:last-child {
      margin-right: 16px;
      display: flex;
      position: absolute;
      right: 0;
      @media (max-width: 320px) {
        flex-direction: column;
      }
      > div {
        margin: 4px 0px;
        margin-left: 6px;
        button {
          display: flex;
          align-items: center;
          padding: 8px;
          background-color: white;
          color: #7b838d;
          border-color: #9098a1;
          > span:last-child {
            margin-left: 4px;
          }
        }
      }
    }
  }

  > .detail_nav {
    > ul {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
    }
  }

  > .profile_content {
    display: flex;
    width: 100%;
    @media (max-width: 980px) {
      flex-direction: column;
    }
    > div:first-child {
      width: 23%;
      @media (max-width: 980px) {
        width: 100%;
      }
      > div {
        margin: 20px 0px;
      }
    }
    > div:last-child {
      width: 77%;
      @media (max-width: 980px) {
        width: 100%;
      }
      > div {
        margin: 20px 0px;
      }
    }

    .stats {
      > div:first-child {
        font-size: 1.3rem;
        margin-bottom: 12px;
      }
      > div:last-child {
        display: flex;
        flex-wrap: wrap;
        > div:nth-child(3),
        div:nth-child(4) {
          margin-top: 20px;
        }
        > div {
          width: 50%;
          > div:last-child {
            margin-top: 4px;
            opacity: 0.7;
            font-size: 0.8rem;
          }
        }
      }
    }

    .communities {
      > div:first-child {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.3rem;
        margin-bottom: 12px;
        > div:last-child {
          font-size: 0.8rem;
          opacity: 0.7;
        }
      }
      > div:last-child {
        display: flex;
        font-size: 0.8rem;
        justify-content: space-between;
        a {
          color: #0051ff;
          cursor: pointer;
        }
        > div:first-child {
          position: relative;
          padding: 0px 5px;
        }
        .flow_icon {
          left: -12px;
          top: -2px;
        }
      }
    }

    .right-content {
      margin: 0px 20px;
      @media (max-width: 980px) {
        margin: 0px;
      }
      > div {
        > .right-category {
          font-size: 1.3rem;
          margin-bottom: 12px;
        }
        > .card {
          padding: 35px;
          background-color: #faf9f9;
          > div {
            line-height: 18px;
            text-align: center;
            font-size: 0.8rem;
            opacity: 0.8;
            > a {
              color: #0051ff;
              cursor: pointer;
            }
          }
        }
      }

      .posts_img {
        margin-top: 12px;
        margin-bottom: 20px;
      }

      .double_p {
        margin-bottom: 1rem;
      }
    }
  }
`;
