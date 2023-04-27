import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useInput } from '@/hooks/useInput';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { api } from '@/util/api';
import { isLoginState, userDataState } from '@/recoil/atom';
const FormContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 24px;
  margin-bottom: 24px;
  border-radius: 5px;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
  background: #ffffff;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 288px;
  }
  label {
    font-size: 0.8rem;
    font-weight: 600;
  }
  p {
    color: #d03956;
    font-size: 0.7rem;
  }
  .hide {
    display: none;
  }
  .login-email {
    margin-bottom: 10px;
  }
  .login-password {
    margin-bottom: 20px;
  }
  .login-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button {
      width: 100%;
      height: 3em;
      margin: 2px;
      background: #0a95ff;
      box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 40%);
      border-radius: 3px;
      color: #fff;
      font-size: 0.8rem;
      border: 1px solid transparent;
      &:hover {
        background: #0078d4;
      }
      &:active {
        box-shadow: 0px 0px 0px 4px hsl(205, 46%, 92%);
        border-color: hsl(206, 100%, 40%);
      }
    }
  }
`;
interface InvalidInput {
  border: string | null;
}
const FormInputs = styled.input<InvalidInput>`
  width: 100%;
  height: 2.5em;
  margin-top: 5px;
  padding: 8px 9px;
  background-color: #fff;
  color: hsl(210, 8%, 5%);
  font-size: 13px;
  border: 1px solid ${(props) => props.border || 'hsl(210, 8%, 75%)'};
  border-radius: 3px;
  outline: none;
  &:focus {
    box-shadow: 0px 0px 0px 4px hsl(205, 46%, 92%);
    border-color: hsl(206, 100%, 40%);
  }
`;

const BasicLogin = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [userData, setUserData] = useRecoilState(userDataState);
  // 로그인 실패시 안내 문구
  const [loginFailed, setloginFailed] = useState(false);
  // 유효성검사
  //email,password 비어있는지 + 유효성 검사 통과 했는지
  const [emptyEmail, setemptyEmail] = useState(false);
  const [emptyPassword, setemptyPassword] = useState(false);
  const [invalidEmail, setinvalidEmail] = useState(false);
  const [invalidPassword, setinvalidPassword] = useState(false);
  // useInput 훅을 이용하여 이벤트의 email, password 값으로 설정
  const [{ email, password }, onInputChange, resetInput] = useInput({
    email: '',
    password: '',
  });

  // next: navigation 기능
  const router = useRouter();
  // Login 버튼 누르고 나서부터 계속 업데이트
  useEffect(() => {
    // email이 비어있다면 emptyEmail 메세지 출력 + input창 border 색상 빨간색으로 변경
    if (email !== '') setemptyEmail(false);
    // password가 비어있다면 emptyPassword 메세지 출력 + input창 border 색상 빨간색으로 변경
    if (password !== '') setemptyPassword(false);
    if (loginFailed) {
      if (email === '') setemptyEmail(true);
      if (password === '') setemptyPassword(true);
    }
  }, [email, password, loginFailed]);
  // 로그인 눌렀을때
  const onSubmit = async (e: React.FormEvent) => {
    // email이 "username@domain.com" 형태의 이메일인지 유효성검사
    // 영문 대소문자, 숫자, 특수문자(!, @, #, $, %, ^, &, *) 중에서
    // 최소 1개씩 사용해야 하며, 8자 이상 16자 이하의 문자열인지 유효성 검사
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    // 유효성 검사 확인
    let emailcheck = false;
    let passwordcheck = false;

    // 유효한 이메일이 아니면 포함되어야 하는 형식 메세지 출력 + border 변경
    if (email === '') setemptyEmail(true);
    if (emailRegex.test(email)) {
      emailcheck = true;
      setemptyEmail(false);
      setinvalidEmail(true);
    }

    // 유효한 이메일이 아니면 포함되어야 하는 형식 메세지 출력 + border 변경
    if (password === '') setemptyPassword(true);
    if (passwordRegex.test(password)) {
      passwordcheck = true;
      setemptyPassword(false);
      setinvalidPassword(true);
    }
    // 이메일 & 비밀번호 유효성 검사 둘 중 하나라도 통과 못할 시
    if (!emailcheck || !passwordcheck) {
      setloginFailed(true);
    }

    // 이벤트의 기본 동작을 취소하는 메서드
    e.preventDefault();

    // 유효성 검사가 다 통과되면 로그인 요청
    if (emailcheck && passwordcheck) {
      return (
        api
          .post('/users/login', { email, password })
          .then((res) => {
            setUserData(res.data);
            router.push('/');
            localStorage.setItem('accessToken', res.data.access_token);
            localStorage.setItem('refreshToken', res.data.refresh_token);
            setloginFailed(false);
            setIsLogin(true);
            resetInput();
          })
          // 실패시
          .catch((err) => {
            // 상태코드 401 = 서버 데이터 비밀번호와 다를 시
            if (err.response.status === 401) {
              alert('이메일 혹은 비밀번호를 확인해 주세요.');
              setloginFailed(true);
            }
            // 상태코드 503 = 서버 상태가 안 좋을 시
            else if (err.response.status === 503) {
              alert('서버 상태가 안 좋습니다. 잠시 후 다시 시도해 주세요.');
              setloginFailed(true);
            }
          })
      );
    }
  };

  return (
    <FormContainer className="form-container">
      <div className="login-email">
        <label htmlFor="email">Email</label>
        <FormInputs
          id="email"
          name="email"
          value={email}
          onChange={onInputChange}
          border={
            emptyEmail || emptyPassword
              ? '#DE4F54'
              : (!emptyEmail || !emptyPassword) &&
                loginFailed &&
                (!invalidEmail || !invalidPassword)
              ? '#DE4F54'
              : null
          }
        />
        {emptyEmail ? (
          <p className="empty">Email cannot be empty.</p>
        ) : (!emptyEmail || !emptyPassword) &&
          loginFailed &&
          (!invalidEmail || !invalidPassword) ? (
          <p className="valid">The email or password is incorrect.</p>
        ) : null}
      </div>
      <div className="login-password">
        <label htmlFor="password">Password</label>
        <FormInputs
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onInputChange}
          border={emptyPassword ? '#DE4F54' : null}
        />
        {emptyPassword ? (
          <p className="empty">Password cannot be empty.</p>
        ) : null}
      </div>
      <div className="login-button">
        <button onClick={onSubmit}>Log in</button>
      </div>
    </FormContainer>
  );
};

export default BasicLogin;
