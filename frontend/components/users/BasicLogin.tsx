import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import { useInput } from '@/hooks/useInput';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';
import { userLogState } from '@/recoil/atom';
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
  const [loginFailed, setloginFailed] = useState(false);
  // 유효성검사
  const [invalidEmail, setinvalidEmail] = useState(false);
  const [invalidPassword, setinvalidPassword] = useState(false);
  const [invalidcheck, setinvalidcheck] = useState(false);

  const [userLog, setUserLog] = useRecoilState(userLogState);
  // useInput 훅을 이용하여 이벤트의 email, password 값으로 설정
  const [{ email, password }, onInputChange, resetInput] = useInput({
    email: '',
    password: '',
  });
  // next navigation 기능
  const navi = useRouter();

  useEffect(() => {
    // 로그인 실패시 유효성 검사
    // if (loginFailed) {
    // email이 비어있다면 emptyEmail 메세지 출력 + input창 border 색상 빨간색으로 변경
    // console.log('눌림');
    if (email === '') setemptyEmail(false);
    // else if (email === '') setemptyEmail(true);
    // else setemptyEmail(false);
    // email이 비어있다면 emptyPassword 메세지 출력 + input창 border 색상 빨간색으로 변경
    if (password === '') setemptyPassword(false);
  }, [email, password]);

  const onSubmit = async (e: React.FormEvent) => {
    // email이 "username@domain.com" 형태의 이메일인지 유효성검사
    // 영문 대소문자, 숫자, 특수문자(!, @, #, $, %, ^, &, *) 중에서
    // 최소 1개씩 사용해야 하며, 8자 이상 16자 이하의 문자열인지 유효성 검사
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    // 유효한 이메일이 아니면 포함되어야 하는 형식 메세지 출력 + border 변경
    if (email === '') setemptyEmail(true);
    if (!emailRegex.test(email)) {
      setemptyEmail(false);
      setinvalidEmail(true);
      console.log('이메일 유효성', emailRegex.test(email));
    }

    // 유효한 이메일이 아니면 포함되어야 하는 형식 메세지 출력 + border 변경
    if (password === '') setemptyPassword(true);
    if (!passwordRegex.test(password)) {
      setemptyPassword(false);
      setinvalidPassword(true);
      console.log('비밀번호 유효성', passwordRegex.test(password));
    }
    // 이메일 & 비밀번호 유효성 검사 통과 시
    if (invalidEmail && invalidPassword) {
      setinvalidcheck(true);
      console.log('유효성검사', invalidcheck);
    }

    // 이벤트의 기본 동작을 취소하는 메서드
    e.preventDefault();

    // 유효성 검사가 다 통과되면 로그인 요청
    if (invalidcheck) {
      return (
        axios
          .post('/users/login', { email, password })
          // 성공시
          .then((res) => {
            console.log(res);
            navi.push('/questions');
            alert('로그인 성공');
            // 로컬스토리에 토큰 저장
            localStorage.setItem('user', JSON.stringify(res.data.accessToken));
            // 로그인 성공하면 입력 폼 초기화
            setloginFailed(false);
            setUserLog(true);
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
          border={emptyEmail || invalidcheck ? '#DE4F54' : null}
        />
        {emptyEmail ? <p className="empty">Email cannot be empty.</p> : null}
        {invalidcheck ? (
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
