import styled from 'styled-components';
import faviconSprite from '@/public/faviconSprite.png';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { isLoginState, userDataState } from '@/recoil/atom';

// 서비스 목록
const serviceList = [
  {
    name: 'askubuntu',
    domain: '.com',
    link: 'https://askubuntu.com/',
  },
  {
    icon: 'SiAskubuntu',
    name: 'mathoverflow',
    domain: '.net',
    link: 'https://mathoverflow.net/',
  },
  {
    icon: 'SiAskubuntu',
    name: 'serverfault',
    domain: '.com',
    link: 'https://serverfault.com/',
  },
  {
    icon: 'SiAskubuntu',
    name: 'stackapps',
    domain: '.com',
    link: 'https://stackapps.com/',
  },
  {
    icon: 'SiAskubuntu',
    name: 'stackexchange',
    domain: '.com',
    link: 'https://stackexchange.com/',
  },
  {
    icon: 'SiAskubuntu',
    name: 'stackoverflow',
    domain: '.com',
    link: 'https://stackoverflow.com/',
  },
  {
    icon: 'SiAskubuntu',
    name: 'superuser',
    domain: '.com',
    link: 'https://superuser.com/',
  },
];

const Logout = () => {
  const router = useRouter();

  const [, setUserData] = useRecoilState(userDataState);
  const [, setIsLogin] = useRecoilState(isLoginState);

  const logoutsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLogin(false);
    setUserData({
      display_name: '',
      image: '',
      user_id: 0,
    });
    router.push('/');
  };

  return (
    <BasicContainer>
      <div className="container">
        <div className="title">
          Clicking “Log out” will log you out of the following domains on this
          device:
        </div>
        <div className="form-logout">
          <ul className="service-list">
            {serviceList.map((service) => {
              return (
                <li key={service.name}>
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={service.name + ' favicon'}></div>
                    <span>{service.name + service.domain}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="logout-checkbox">
            <input type="checkbox" id="checkAll" />
            <label htmlFor="checkAll">Log out on all devices</label>
          </div>
          <Logoutbuttons>
            <button className="logout-submit" onClick={logoutsubmit}>
              Log out
            </button>
            <button className="logout-cancel" onClick={() => router.push('/')}>
              Cancel
            </button>
          </Logoutbuttons>
          <div className="logout-ex">
            If you’re on a shared computer, remember to log out of your Open ID
            provider (Facebook, Google, Stack Exchange, etc.) as well.
          </div>
        </div>
      </div>
    </BasicContainer>
  );
};

export default Logout;

const BasicContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f1f2f3;
  background-size: cover;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .title {
    width: 100%;
    max-width: 526px;
    font-size: 1.3em;
    margin-bottom: 24px;
    text-align: center;
  }
  .logout-checkbox {
    height: 1.5em;
    margin-bottom: 12px;
    font-size: 12px;
    input {
      margin-right: 4px;
    }
  }
  .logout-ex {
    font-size: 0.75em;
    color: #6a737c;
    margin-top: 32px;
  }

  .form-logout {
    width: 100%;
    max-width: 316px;
    margin: 24px;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
      0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
    background: #ffffff;
    .service-list {
      padding-bottom: 12px;
      border-bottom: 1px solid hsl(210, 8%, 85%);
      margin-bottom: 14px;
      a {
        width: 276px;
        color: hsl(206, 100%, 40%);
        display: flex;
        font-size: 15px;
        span {
          margin: 4px 4px 6px;
        }
        .favicon {
          width: 16px;
          height: 16px;
          margin: 4px;
          background-color: transparent;
          background-image: url(${faviconSprite.src});
          background-size: 16px 7038px;
          background-repeat: no-repeat;
        }
        .askubuntu {
          background-position: 0 -360px;
        }
        .mathoverflow {
          background-position: 0 -4032px;
        }
        .serverfault {
          background-position: 0 -5652px;
        }
        .stackapps {
          background-position: 0 -6084px;
        }
        .stackoverflow {
          background-position: 0 -6138px;
        }
        .superuser {
          background-position: 0 -6282px;
        }
      }
    }
  }

  @media screen and (max-width: 816px) {
    padding: 24px 16px;
    div:first-child {
      width: 100%;
      max-width: 445px;
      font-size: 0.9em;
      margin-bottom: 24px;
    }
    .form-logout {
      max-width: 267px;
    }
  }
  @media screen and (max-width: 641px) {
    padding: 24px 16px;
    // background: blue;
  }
`;

const Logoutbuttons = styled.div`
  display: flex;
  flex-direction: row;

  button {
    width: 5.3em;
    height: 3em;
    margin: 2px;
    font-size: 0.8rem;
  }
  .logout-cancel {
    color: #0a95ff;
    background: #fff;
    border: none;
  }
  .logout-submit {
    background: #0a95ff;
    box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 40%);
    border-radius: 3px;
    color: #fff;
    border: 1px solid transparent;
    &:hover {
      background: #0078d4;
    }
    &:active {
      box-shadow: 0px 0px 0px 4px hsl(205, 46%, 92%);
      border-color: hsl(206, 100%, 40%);
    }
  }
`;
