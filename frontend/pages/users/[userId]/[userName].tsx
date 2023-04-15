/* eslint-disable @next/next/no-img-element */
import Button from '@/components/button/Button';
import MenuItem from '@/components/menu_item/MenuItem';
import styled from 'styled-components';

//경로 https://stackoverflow.com/users/6117017/timbus-calin
const UserDetail = () => {
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
      <div className='detail_nav'>
        <ul>
          <li><MenuItem>Profile</MenuItem></li>
          <li><MenuItem>Profile</MenuItem></li>
          <li><MenuItem>Profile</MenuItem></li>
          <li><MenuItem>Profile</MenuItem></li>
        </ul>
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
      > div {
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
`;
