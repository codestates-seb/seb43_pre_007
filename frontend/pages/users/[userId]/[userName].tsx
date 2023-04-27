/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Button from '@/components/button/Button';
import { FilterButton } from '@/components/button/FilterButton';
import Card from '@/components/card/Card';
import MenuItem from '@/components/menu_item/MenuItem';
import SelectContent from '@/components/select_content/SelectContent';
import {
  DEFAULT_IMG2,
  DETAIL_ACTIVITY_CONTENT,
  DETAIL_NAV,
  USER_EDIT_INPUT,
  USER_EDIT_LINKS,
  USER_EDIT_LINKS_ICON,
} from '@/constant/constant';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { pickCategoryState, pickState, userDataState } from '@/recoil/atom';
import { useEffect, useRef, useState } from 'react';
import { api } from '@/util/api';
import Input from '@/components/input/Input';
import dynamic from 'next/dynamic';
import { useInput } from '@/hooks/useInput';
import { useRouter } from 'next/router';

const MarkDownEditor = dynamic(
  () =>
    import('@/components/markDownEditor/MarkDownEditor').then(
      (res) => res.MarkDownEditor
    ),
  {
    ssr: false,
  }
);

const UserDetail = () => {
  const [userData] = useRecoilState(userDataState);
  const [pick, setPick] = useRecoilState(pickState);
  const pickHandler = (idx: number) => {
    setPick(idx);
    setPickCategory(0);
  };
  const [pickCategory, setPickCategory] = useRecoilState(pickCategoryState);
  const pickCategoryHandler = (idx: number) => {
    setPickCategory(idx);
  };
  const selectPickCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPickCategory(Number(e.target.value));
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
          <div>{userData.display_name}</div>
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
              <span onClick={() => pickHandler(3)}>Edit profile</span>
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
          {DETAIL_NAV.map((category, i) => (
            <li key={category}>
              <MenuItem onClick={() => pickHandler(i)} idx={i} pick={pick}>
                {category}
              </MenuItem>
            </li>
          ))}
        </ul>
      </div>
      {pick === 0 && <ProfileContent />}
      {pick === 1 && (
        <ActiveContent
          pickCategory={pickCategory}
          pickCategoryHandler={pickCategoryHandler}
          selectPickCategory={selectPickCategory}
          pick={pick}
        />
      )}
      {pick === 3 && <EditContent />}
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
`;

//========================Profile 컨텐츠========================

const ProfileContent = () => {
  return (
    <ProfileContentContainer>
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
    </ProfileContentContainer>
  );
};

const ProfileContentContainer = styled.div`
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
  }
`;

//========================Active 컨텐츠========================

type ActiveProps = {
  pickCategoryHandler: (i: number) => void;
  pickCategory: number;
  selectPickCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  pick: number;
};

const ActiveContent = ({
  pickCategoryHandler,
  pickCategory,
  selectPickCategory,
  pick,
}: ActiveProps) => {
  const detailActivity = Object.keys(DETAIL_ACTIVITY_CONTENT);
  return (
    <ActiveContentContainer pickCategory={pickCategory}>
      <div>
        <ul>
          {detailActivity.map((category, i) => (
            <li key={category}>
              <MenuItem
                onClick={() => pickCategoryHandler(i)}
                pick={pickCategory}
                idx={i}
              >
                {category}
              </MenuItem>
            </li>
          ))}
        </ul>
      </div>
      <SelectContent
        selectPickCategory={selectPickCategory}
        pickCategory={pickCategory}
        categories={detailActivity}
        sub={DETAIL_NAV[pick]}
      />
      <div>
        {pickCategory === 0 && (
          <div className="summary">
            <div>{detailActivity[0]}</div>
            <div>
              <Card>
                <div>
                  <div>
                    <svg width="48" height="48" viewBox="0 0 48 48">
                      <path
                        d="M32 9a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h25a1 1 0 0 1 1 1Zm4.25 1.6a1 1 0 0 1 .92-.6H41a1 1 0 1 1 0 2h-3.18l-4.9 11.4a1 1 0 0 1-.92.6h-7.38l-2.73 5.45A1 1 0 0 1 21 30h-6.51l-4.07 9.4a1 1 0 0 1-1.84-.8l4.34-10a1 1 0 0 1 .91-.6h6.55l2.73-5.45A1 1 0 0 1 24 22h7.34l4.9-11.4ZM42 16a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2Zm-24 5a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h11a1 1 0 0 1 1 1Zm24 1a1 1 0 1 0 0-2h-4a1 1 0 1 0 0 2h4Zm1 11a1 1 0 0 1-1 1H17a1 1 0 1 1 0-2h25a1 1 0 0 1 1 1ZM8 28a1 1 0 1 0 0-2H6a1 1 0 1 0 0 2h2Z"
                        opacity=".2"
                      ></path>
                      <path d="M36.17 8a1 1 0 0 0-.92.6L30.35 20H23a1 1 0 0 0-.9.55L19.39 26h-6.55a1 1 0 0 0-.9.58L6.1 39.08a1 1 0 0 0 1.82.84L13.47 28H20a1 1 0 0 0 .9-.55L23.61 22H31a1 1 0 0 0 .92-.6l4.9-11.4H42a1 1 0 1 0 0-2h-5.83ZM27 16a1 1 0 1 0 0-2H6a1 1 0 1 0 0 2h21Zm16 11a1 1 0 0 1-1 1H28a1 1 0 1 1 0-2h14a1 1 0 0 1 1 1Zm-1 13a1 1 0 1 0 0-2H14a1 1 0 1 0 0 2h28Z"></path>
                    </svg>
                  </div>
                  <h2>Reputation is how the community thanks you</h2>
                  <p>
                    When users upvote your helpful posts, you&apos;ll earn
                    reputation and unlock new privileges.
                  </p>
                  <p className="link_content">
                    Learn more about <a>reputation</a> and <a>privileges</a>
                  </p>
                </div>
              </Card>
              <Card>
                <div>
                  <div>
                    <svg width="48" height="48" viewBox="0 0 48 48">
                      <path
                        d="M14 6a1 1 0 0 1 1-1h20a1 1 0 1 1 0 2H15a1 1 0 0 1-1-1ZM7 21c0-1.1.9-2 2-2h35a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V21Zm27 23a1 1 0 1 0 0-2H14a1 1 0 1 0 0 2h20Z"
                        opacity=".2"
                      ></path>
                      <path d="M8 11a1 1 0 0 1 1-1h31a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm0 13a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4a3 3 0 0 1 3-3h36a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V18Zm3-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h36a1 1 0 0 0 1-1V18a1 1 0 0 0-1-1H6Zm34 22a1 1 0 1 0 0-2H9a1 1 0 1 0 0 2h31Z"></path>
                    </svg>
                  </div>
                  <h2>Earn badges for helpful actions</h2>
                  <p>
                    Badges are bits of digital flair that you get when you
                    participate in especially helpful ways.
                  </p>
                  <Button color={'var(--text-white)'}>
                    <a>Take the Tour and earn your first badge</a>
                  </Button>
                </div>
              </Card>
              <Card>
                <div>
                  <div>
                    <svg width="48" height="48" viewBox="0 0 48 48">
                      <path
                        d="M39.5 12a.5.5 0 0 1-.5-.5.5.5 0 0 0-.5-.5h-6.1c-.77 0-1.4.63-1.4 1.4v6.2c0 .77.63 1.4 1.4 1.4H38a1 1 0 0 1 1 1 1 1 0 0 0 1 1h3.6c.77 0 1.4-.63 1.4-1.4v-7.2c0-.77-.63-1.4-1.4-1.4h-4.1Z"
                        opacity=".2"
                      ></path>
                      <path d="M15.03 5.84c-2.17 0-3.66.42-4.44 1.59-.37.55-.5 1.17-.55 1.73-.05.44-.04.93-.04 1.39v1.8c0 .4.2.7.38.89.18.17.38.29.54.37.34.15.75.25 1.15.32.83.15 1.9.22 2.93.22 1.03 0 2.1-.07 2.93-.22.4-.07.81-.17 1.15-.32.16-.08.36-.2.54-.37.18-.19.38-.49.38-.9V10.5c0-.44 0-.9-.03-1.32a3.68 3.68 0 0 0-.52-1.73c-.76-1.18-2.25-1.6-4.42-1.6ZM12 10.5c0-.45 0-.82.03-1.15.04-.4.12-.65.22-.81.18-.26.7-.7 2.78-.7s2.58.44 2.74.69c.1.15.18.4.21.8.03.32.02.66.02 1.07v1.47l-.43.1c-.67.12-1.6.18-2.57.18a15.59 15.59 0 0 1-3-.28V10.5ZM11 21a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1Zm4.03-19c-3.82 0-6.2 1.12-7.57 3-1.31 1.8-1.51 4.08-1.51 6v3.94A4.45 4.45 0 0 0 2 19.5v11C2 32.02 3.13 34 5.47 34c.58 0 1.09-.12 1.53-.33V44a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V32h2v12a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V23.3l2.87 2.74 1.97 1.86.16.14V44a1 1 0 1 0 2 0V28.79h.1c.8 0 1.65-.28 2.27-.9.62-.64.88-1.52.88-2.32 0-.79-.26-1.66-.87-2.3L30 20.78V19h6c0 1.1.9 2 2 2h3a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3h-3.09c-.2-.58-.76-1-1.41-1H30v-.17a3 3 0 1 0-2 0v10.83l-1.24-1.32h-.01l-.34-.36c-.48-.49-.93-.95-1.36-1.3-.3-.25-.64-.47-1.02-.63V11c0-1.9-.18-4.2-1.47-6-1.35-1.88-3.71-3-7.53-3Zm-7.08 9c0-1.86.21-3.57 1.13-4.83C9.94 5 11.6 4 15.03 4s5.06.99 5.9 2.17c.9 1.25 1.1 2.96 1.1 4.83v4.41c-.35.11-.9.22-1.64.32a46.7 46.7 0 0 1-5.4.28c-1.99 0-3.95-.1-5.4-.28a9.4 9.4 0 0 1-1.64-.32V11ZM12 39.34a3.4 3.4 0 0 0-3 0V36h3v3.34Zm-3 3.31c0-.98.71-1.65 1.5-1.65s1.5.67 1.5 1.65V43H9v-.35Zm9 .35v-.35c0-.98.71-1.65 1.5-1.65s1.5.67 1.5 1.65V43h-3Zm1.5-4a3.4 3.4 0 0 0-1.5.34V36h3v3.34a3.4 3.4 0 0 0-1.5-.34ZM9 34v-8h12v8h-3v-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3H9Zm-2-3.5c0 .69-.56 1.5-1.53 1.5C4.53 32 4 31.23 4 30.5V29h3v1.5ZM7 27H4v-7.5c0-.88.32-1.51.8-1.93a3 3 0 0 1 1.67-.69l.08.06c.24.17.52.29.78.37.53.17 1.23.3 2 .4 1.57.2 3.62.3 5.66.3 2.03 0 4.09-.1 5.65-.3.78-.1 1.48-.23 2.01-.4.25-.08.52-.19.75-.35l.4.27c.32.27.66.62 1.13 1.1v.01l.38.39L28 21.56v.92l-1.45 1.44-3.64-3.46c-.25-.24-.55-.46-.91-.46a1 1 0 0 0-1 1v3H9v-3a1 1 0 1 0-2 0v6Zm23-.22v-3.1l.93.98h.01c.17.18.31.51.31.91s-.14.73-.3.91a1.19 1.19 0 0 1-.95.3ZM29 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm1 13v-7h6v7h-6Zm8 2v-8h3a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-3Z"></path>
                    </svg>
                  </div>
                  <h2>Measure your impact</h2>
                  <p>
                    Your posts and helpful actions here help hundreds or
                    thousands of people searching for help.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
        {detailActivity.slice(1, 5).map(
          (category, i) =>
            (pickCategory === i + 1 || pickCategory === 0) && (
              <div className="sub_content" key={category}>
                <div>
                  <div>{category}</div>
                  <div>
                    {(category === 'Answers' || category === 'Questions') && (
                      <FilterButton
                        filters={['Score', 'Activity', 'Newest']}
                        onChange={() => {}}
                      />
                    )}
                  </div>
                </div>
                <Card>
                  <div>{DETAIL_ACTIVITY_CONTENT[category]}</div>
                </Card>
              </div>
            )
        )}
        {detailActivity.slice(5).map(
          (category, i) =>
            (pickCategory === 0 || pickCategory === i + 5) && (
              <div className="sub_content sub_bottom" key={category}>
                <div>
                  <div>{category}</div>
                  <div>
                    {(category === 'Following' || category === 'Bounties') && (
                      <FilterButton
                        filters={['Score', 'Activity', 'Newest']}
                        onChange={() => {}}
                      />
                    )}
                  </div>
                </div>
                <Card>
                  <div>{DETAIL_ACTIVITY_CONTENT[category]}</div>
                </Card>
              </div>
            )
        )}
      </div>
    </ActiveContentContainer>
  );
};

type ActiveContentContainerProps = {
  pickCategory: number;
};

const ActiveContentContainer = styled.div<ActiveContentContainerProps>`
  display: flex;
  margin-top: 20px;
  @media (max-width: 980px) {
    flex-direction: column;
  }
  > div:first-child {
    min-width: 117px;
    margin-right: 16px;
    padding-right: 10px;
    @media (max-width: 980px) {
      display: none;
    }
    > ul {
      li {
        margin-bottom: 2px;
        a {
          font-size: 0.82rem;
        }
      }
    }
  }
  > div:last-child {
    width: 88%;
    min-height: 40vh;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 980px) {
      width: 100%;
    }
    > div:not(:first-child) {
      margin-top: 24px;
    }
    .summary {
      width: 100%;
      > div:first-child {
        font-size: 1.3rem;
      }
      > div:last-child {
        display: flex;
        margin-top: 12px;
        @media (max-width: 980px) {
          display: flex;
          flex-direction: column;
        }
        > div {
          @media (max-width: 980px) {
            flex-basis: 0;
            width: 100%;
            margin: 8px 0px;
          }
        }
        > div:first-child {
          flex-basis: calc(25% - var(--su16));
        }
        > div:nth-child(2) {
          flex-basis: calc(16.6% - var(--su16));
          button {
            padding: 10px;
            margin-bottom: 44px;
          }
        }
        > div:nth-child(3) {
          flex-basis: calc(8.3% - var(--su16));
        }
      }
      .card {
        margin-right: 16px;
        flex-grow: 1;
        padding: 23px;
        > div {
          display: flex;
          flex-direction: column;
          text-align: center;
          > div:first-child {
            opacity: 0.4;
          }
          h2 {
            font-size: 0.95rem;
            margin: 10px 0px;
            text-align: center;
          }
          p {
            font-size: 0.7rem;
            margin-bottom: 30px;
            opacity: 0.7;
            line-height: 16px;
          }
          .link_content {
            font-size: 0.8rem;
            opacity: 0.98;
            > a {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
    }
    .sub_content {
      display: flex;
      width: ${(props) => (props.pickCategory === 0 ? '48%' : '100%')};
      margin: 10px 0px;
      flex-direction: column;
      margin-right: 18.31px;
      @media (max-width: 1286px) {
        width: 100%;
      }
      @media (max-width: 980px) {
        margin-right: 0px;
      }
      > div:first-child {
        font-size: 1.3rem;
        display: flex;
        justify-content: space-between;
        > div:last-child {
          li {
            padding: 8px;
            font-size: 0.7rem;
            opacity: 0.8;
          }
        }
      }
      > .card {
        text-align: center;
        margin-top: 12px;
        opacity: 0.7;
        width: 100%;
        font-size: 0.8rem;
        a {
          cursor: pointer;
          color: var(--text-blue);
        }
      }
    }
    .sub_bottom {
      width: 100%;
    }
  }
`;

//=======================Edit 컨텐츠=======================

const EditContent = () => {
  const router = useRouter();
  const [userData] = useRecoilState(userDataState);
  const [form, onChange] = useInput<{ [key: string]: string }>({
    display_name: '',
    location: '',
    about_me: '',
  });
  const submitEvent = () => {
    api
      .post(`/users/${userData.user_id}/edit`, { ...form, image_url: img })
      .then(() => {
        router.push('/');
      })
      .catch(() => alert('잠시 후에 다시 시도해주세요.'));
  };
  const cancelEvent = () => {
    router.push('/');
  };

  const target = useRef<HTMLInputElement>(null);
  const uploadClick = () => {
    if (target.current) target.current.click();
  };
  const [img, setImg] = useState('');
  useEffect(() => {
    if (userData.image) {
      return setImg(userData.image);
    }
    setImg(DEFAULT_IMG2);
  }, []);

  const saveImgFile = () => {
    if (!target.current?.files) return;
    const file = target.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    //서버 유무에 따라 추가 작업 결정
    reader.onloadend = () => {
      const formData = new FormData();
      formData.append('file', file);
      api
        .post('/upload', formData, {
          headers: {
            'Content-Type': `multipart/form-data`,
          },
        })
        .then((res) => setImg(res.data))
        .catch(() => {
          alert('사진 등록에 실패하였습니다.');
        });
    };
  };

  const inputLabel = Object.keys(USER_EDIT_INPUT);
  const linkLabel = Object.keys(USER_EDIT_LINKS);

  return (
    <EditContentContainer>
      <div className="title">Edit your profile</div>
      <form>
        <div className="form_title">Public information</div>
        <div className="form_content">
          <div className="img_content">
            <div>Profile Image</div>
            <div className="img_box">
              <img src={img} alt="profile" />
              <div className="img_change" onClick={uploadClick}>
                Change picture
              </div>
              <input
                ref={target}
                onChange={saveImgFile}
                type="file"
                accept="image/*"
              ></input>
            </div>
          </div>
          {inputLabel.map((label) => (
            <div
              className={
                label === 'about_me' ? 'input_box text_editor' : 'input_box'
              }
              key={label}
            >
              <label htmlFor={label}>{USER_EDIT_INPUT[label]}</label>
              {label === 'about_me' ? (
                <MarkDownEditor />
              ) : (
                <Input
                  id={label}
                  name={label}
                  value={form[label]}
                  onChange={onChange}
                  placeholder={label === 'title' ? 'No title has been set' : ''}
                  paddingLeft="10px"
                />
              )}
            </div>
          ))}
        </div>
        <div className="form_title">Links</div>
        <div className="form_content links">
          {linkLabel.map((label, i) => (
            <div key={label}>
              <label htmlFor={label}>{USER_EDIT_LINKS[label]}</label>
              <Input id={label} name={label} paddingLeft="30px" />
              <div className={`link_icon`}>{USER_EDIT_LINKS_ICON[i]}</div>
            </div>
          ))}
        </div>
        <div className="form_title">Private information</div>
        <div className="form_content">
          <div className="full_name_box">
            <label htmlFor={'full_name'}>Full name</label>
            <Input id={'full_name'} name={'full_name'} paddingLeft="10px" />
          </div>
        </div>
        <div className="submit_box">
          <Button onClick={submitEvent} color="var(--text-white)">
            <a>Save profile</a>
          </Button>
          <button onClick={cancelEvent}>
            <a>Cancel</a>
          </button>
        </div>
      </form>
    </EditContentContainer>
  );
};

const EditContentContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  padding: 30px calc((100% - 800px) / 2);
  width: 100%;
  .title {
    width: 100%;
    font-size: 1.5rem;
    padding-bottom: 24px;
    border-bottom: 1px solid #dcdfdd;
  }
  form {
    width: 100%;
    .form_title {
      margin-top: 36px;
      font-size: 1.25rem;
      width: 100%;
      padding: 10px 0px;
    }
    .form_content {
      padding: 12px;
      border-radius: 6px;
      border: 1px solid #dcdfdd;
    }
    .input_box {
      width: 60%;
      margin: 18px 8px;
      input {
        margin-top: 6px;
      }
    }
    .img_content {
      margin: 12px 8px;
      font-size: 0.9rem;
      font-weight: 600;
      .img_box {
        margin-top: 8px;
        position: relative;
        padding: 0px;
        width: 164px;
        height: 164px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
        input {
          display: none;
        }
      }
      .img_change {
        font-weight: normal;
        font-size: 0.8rem;
        position: absolute;
        top: 127px;
        width: 164px;
        height: 23.5%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        background-color: #363636;
        border-radius: 0px 0px 4px 4px;
        color: white;
        cursor: pointer;
        :hover {
          background-color: #1d1c1c;
        }
      }
    }
    .text_editor {
      margin: 0px;
      padding: 0px 8px;
      width: 100%;
      > div {
        margin-top: 8px;
      }
      .cm-null {
        background: none !important;
      }
    }
    .links {
      display: flex;
      @media (max-width: 800px) {
        flex-direction: column;
      }
      > div {
        flex: 1;
        margin: 20px 10px;
        position: relative;
        > label {
          font-size: 0.9rem;
          font-weight: 500;
        }
        > input {
          margin-top: 4px;
        }
      }
      .link_icon {
        position: absolute;
        top: 50%;
        left: 8px;
        opacity: 0.6;
      }
    }
  }
  .full_name_box {
    padding: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    input {
      margin-top: 4px;
      width: 50%;
      @media (max-width: 800px) {
        width: 100%;
      }
    }
  }
  .submit_box {
    margin: 60px 0px;
    display: flex;
    button {
      width: auto;
      padding: 10.4px;
      cursor: pointer;
    }
    > button:last-child {
      margin-left: 10px;
      border: none;
      background-color: white;
      :hover {
        background-color: #cfeeff75;
      }
      > a {
        color: var(--text-blue);
      }
    }
  }
`;
