//경로 https://stackoverflow.com/users/login?ssrc=head
import styled from 'styled-components';
import SosialLogin from '@/components/users/SosialLogin';
import BasicLogin from '@/components/users/BasicLogin';
import Link from 'next/link';

const BasicContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
  background: #f1f2f3;
  background-size: cover;
  > .container {
    margin-top: 47px;
    max-width: 288px;
  }
  @media screen and (max-width: 816px) {
    padding: 24px 16px;
  }
  @media screen and (max-width: 641px) {
    padding: 24px 16px;
  }
`;

const LogoContainer = styled.div`
  min-width: 37px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 24px 0px;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  text-align: center;
  font-size: 13px;
  div {
    margin: 5px 0px;
  }
  a {
    margin: -3px 4px;
    color: #0074cc;
    svg {
      fill: #0074cc;
      margin: -3px -15px -3px 4px;
    }
  }
  @media screen and (max-width: 641px) {
    svg {
      display: none;
    }
  }
  a:hover {
    color: #3cacfa;
    svg {
      fill: #3cacfa;
    }
  }
`;

const Login = () => {
  return (
    <BasicContainer className="basic-container">
      <div className="container">
        <LogoContainer>
          <svg aria-hidden="true" width="32" height="37" viewBox="0 0 32 37">
            <path
              d="M 26 33 v -9 h 4 v 13 H 0 V 24 h 4 v 9 h 22 Z"
              fill="#c2c3c4"
            />
            <path
              d="m 21.5 0 l -2.7 2 l 9.9 13.3 l 2.7 -2 L 21.5 0 Z M 26 18.4 L 13.3 7.8 l 2.1 -2.5 l 12.7 10.6 l -2.1 2.5 Z M 9.1 15.2 l 15 7 l 1.4 -3 l -15 -7 l -1.4 3 Z m 14 10.79 l 0.68 -2.95 l -16.1 -3.35 L 7 23 l 16.1 2.99 Z M 23 30 H 7 v -3 h 16 v 3 Z"
              fill="#F77F2B"
            />
          </svg>
        </LogoContainer>
        <SosialLogin />
        <BasicLogin />
        <SignUpContainer className="signup-container">
          <div className="signUp margin">
            {`Don't have an account?`}
            <Link className="blue" href="/users/signup">
              Sign up
            </Link>
          </div>
          <div className="employer ">
            Are you an employer?
            <a
              className="blue hover"
              href="https://careers.stackoverflow.com/employer/login "
            >
              Sign up on Talent
              <svg className="blue" width="14" height="14" viewBox="0 0 14 14">
                <path
                  className="icon"
                  d="M5 1H3a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V9h-2v2H3V3h2V1Zm2 0h6v6h-2V4.5L6.5 9 5 7.5 9.5 3H7V1Z"
                ></path>
              </svg>
            </a>
          </div>
        </SignUpContainer>
      </div>
    </BasicContainer>
  );
};

export default Login;
