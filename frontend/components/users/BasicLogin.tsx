import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import useInput from '@/hooks/useInput';
import axios from 'axios';
import { useRouter } from 'next/router';

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
  //email,password 비어있는지에 대한 상태 (유효성검사 + border 색상 변경)
  const [emptyEmail, setemptyEmail] = useState(false);
  const [emptyPassword, setemptyPassword] = useState(false);
  const [invalidEmail, setinvalidEmail] = useState(false);
  const [invalidPassword, setinvalidPassword] = useState(false);
  const [loginFailed, setloginFailed] = useState(false);

  // useInput 훅을 이용하여 이벤트의 email, password 값으로 설정
  const [{ email, password }, onInputChange, resetInput] = useInput({
    email: '',
    password: '',
  });

  const navi = useRouter();

  useEffect(() => {
    // 로그인 실패시 유효성 검사
    if (loginFailed) {
      // email이 비어있다면 emptyEmail 메세지 출력 + input창 border 색상 빨간색으로 변경
      if (email === '') setemptyEmail(true);
      else setemptyEmail(false);
      // email이 비어있다면 emptyPassword 메세지 출력 + input창 border 색상 빨간색으로 변경
      if (password === '') setemptyPassword(true);
      else setemptyPassword(false);
    }
  }, [loginFailed, email, password]);

  const onSubmit = (e: React.FormEvent) => {
    // email이 "username@domain.com" 형태의 이메일인지 유효성검사
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // 영문 대소문자, 숫자, 특수문자(!, @, #, $, %, ^, &, *) 중에서
    // 최소 1개씩 사용해야 하며, 8자 이상 16자 이하의 문자열인지 유효성 검사
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    // 원래 빈칸 유효성 검사
    // if (email === '') {
    //   setemptyEmail(true);
    // }
    // 유효한 이메일이 아니면 포함되어야 하는 형식 메세지 출력 + border 변경
    if (!emailRegex.test(email)) {
      setemptyEmail(false);
      setinvalidEmail(true);
    }
    // 원래 빈칸 유효성 검사
    // if (password === '') {
    //   setemptyPassword(true);
    // }
    // 유효한 이메일이 아니면 포함되어야 하는 형식 메세지 출력 + border 변경
    if (!passwordRegex.test(password)) {
      setemptyPassword(false);
      setinvalidPassword(true);
    }
    // 이벤트의 기본 동작을 취소하는 메서드
    e.preventDefault();

    // 유효성 검사가 다 통과되면 로그인 요청
    axios
      .post('/login', { email, password })
      // 성공시
      .then((res) => {
        navi.push('/');
        alert('로그인 성공');
        localStorage.setItem('user', JSON.stringify(res.data.accessToken));
        // 로그인 성공하면 입력 폼 초기화
        resetInput();
      })
      // 실패시
      .catch((err) => {
        // 상태코드 401 = 로그인 정보가 없을 시
        if (err.response.status === 400) {
          alert('로그인 정보가 없습니다.');
          setloginFailed(true);
        }
        // 상태코드 503 = 서버 상태가 안 좋을 시
        else if (err.response.status === 503) {
          alert('서버 상태가 안 좋습니다. 잠시 후 다시 시도해 주세요.');
        }
        setloginFailed(true);
      });
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
          border={emptyEmail ? '#DE4F54' : null}
        />
        <p className="empty hide">Email cannot be empty.</p>
      </div>
      <div className="login-password">
        <label htmlFor="password">Password</label>
        <FormInputs
          id="password"
          name="password"
          value={password}
          onChange={onInputChange}
          border={emptyPassword ? '#DE4F54' : null}
        />
        <p className="empty hide">Password cannot be empty.</p>
      </div>
      <div className="login-button">
        <button onClick={onSubmit}>Log in</button>
      </div>
    </FormContainer>
  );
};

export default BasicLogin;
