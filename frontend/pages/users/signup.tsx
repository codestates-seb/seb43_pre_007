import { api } from '@/util/api';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import Link from 'next/link';
import useForm from '@/hooks/useForm';
import SosialLogin from '@/components/users/SosialLogin';

type SignUpFormData = {
  email: string;
  password: string;
  displayName: string;
};

type SignUpFormProps = SignUpFormData & {
  onSubmit: (data: SignUpFormData) => void;
};

const SignUp = () => {
  const router = useRouter();

  const signup = useMutation({
    mutationFn: () =>
      api.post('/users', {
        email: data.email,
        password: data.password,
        display_name: data.displayName,
      }),
    onSuccess: () => router.push('/questions'),
  });

  const { data, handleChange, errors, handleSubmit } = useForm<SignUpFormProps>(
    {
      initialValues: {
        email: '',
        password: '',
        displayName: '',
      },
      validations: {
        email: {
          required: {
            value: true,
            message: 'you need to require email',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'The email is not a valid email address.',
          },
        },
        password: {
          required: {
            value: true,
            message: 'you need to require password',
          },
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/,
            message: 'The password is not a valid password.',
          },
        },
        displayName: {
          required: {
            value: true,
            message: 'you need to require displayName',
          },
        },
      },
      onSubmit: handleSignUpSubmit,
    }
  );

  function handleSignUpSubmit() {
    signup.mutate();
  }

  return (
    <BasicContainer onSubmit={handleSubmit}>
      <div className="help-container">
        <h1>Join the Stack Overflow community</h1>
        <ul>
          <li>
            <svg width="26" height="26" className="svg-icon">
              <path
                opacity=".5"
                d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"
              />
              <path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z" />
            </svg>
            Get unstuck — ask a question
          </li>
          <li>
            <svg width="26" height="26" className="svg-icon">
              <path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z" />
              <path
                opacity=".5"
                d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
              />
            </svg>
            Unlock new privileges like voting and commenting
          </li>
          <li>
            <svg width="26" height="26" className="svg-icon mtn2">
              <path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z" />
              <path
                opacity=".5"
                d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"
              />
            </svg>
            Save your favorite questions, answers, watch tags, and more
          </li>
          <li>
            <svg width="26" height="26" className="svg-icon">
              <path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z" />
            </svg>
            Earn reputation and badges
          </li>
        </ul>
        <div>
          Collaborate and share knowledge with a private group for FREE.
        </div>
        <a href="https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up">
          Get Stack Overflow for Teams free for up to 50 users.
        </a>
      </div>
      <div className="form-container">
        <div className="RWDshow">
          Create your Stack Overflow account. It’s free and only takes a minute.
        </div>
        <SosialLogin />
        <FormContainer>
          <div className="display-name">
            <label htmlFor="display-name">Display name</label>
            <FormInputs
              id="display-name"
              name="display_name"
              value={data.displayName}
              onChange={handleChange('displayName')}
              border={errors.displayName && '#DE4F54'}
            />
            {errors.displayName && <p>{errors.displayName}</p>}
          </div>
          <div className="login-email">
            <label>Email</label>
            <FormInputs
              name="email"
              value={data.email}
              onChange={handleChange('email')}
              border={errors.email && '#DE4F54'}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="login-password">
            <label>Password</label>
            <FormInputs
              name="password"
              value={data.password}
              type="password"
              onChange={handleChange('password')}
              border={errors.password && '#DE4F54'}
            />
            {errors.password && <p>{errors.password}</p>}
            <p className="passwordvalid">
              Passwords must contain at least eight characters, including at
              least 1 letter and 1 number.
            </p>
            <label className="checkbox-input">
              <input type="checkbox"></input>
              Opt-in to receive occasional product updates, user research
              invitations, company announcements, and digests.
            </label>
          </div>
          <div className="login-button">
            <button>Log in</button>
          </div>
          <span className="privacy">
            By clicking “Sign up”, you agree to our&nbsp;
            <a
              href="https://stackoverflow.com/legal/terms-of-service/public"
              target="_blank"
              className="-link"
            >
              terms of service
            </a>
            ,
            <a
              href="https://stackoverflow.com/legal/privacy-policy"
              target="_blank"
              className="-link"
            >
              &nbsp;privacy policy
            </a>
            &nbsp;and
            <a
              href="https://stackoverflow.com/legal/cookie-policy"
              target="_blank"
              className="-link"
            >
              &nbsp;cookie policy
            </a>
            <input type="hidden" name="legalLinksShown" value="1" />
          </span>
        </FormContainer>
        <SignUpContainer className="signup-container">
          <div className="signUp margin">
            Already have an account?
            <Link className="blue" href="/users/signup">
              Log in
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

const BasicContainer = styled.form`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f1f2f3;
  padding-top: 120px;

  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .RWDshow {
    font-size: 1.3rem;
    max-width: 421px;
    display: none;
  }
  .help-container {
    width: 100%;
    max-width: 421px;
    font-size: 0.8rem;
    margin: 0px 48px 128px 0px;
    a {
      color: #0074cc;
      &:hover {
        color: #3cacfa;
      }
    }

    ul {
      font-size: 0.9rem;
      li {
        display: flex;
        margin-bottom: 24px;
        .svg-icon {
          fill: hsl(206, 100%, 52%);
          margin-right: 8px;
        }
      }
    }
    h1 {
      font-weight: 400;
      margin-bottom: 32px;
    }
  }

  @media screen and (max-width: 816px) {
    flex-direction: row;
    padding-top: 80px;

    .RWDshow {
      margin: 0px 0px 24px 0px;
      text-align: center;
      max-width: 421px;
      display: block;
    }
    .help-container {
      display: none;
    }
  }

  @media screen and (max-width: 641px) {
    .RWDshow {
      max-width: 268px;
    }
  }
`;
const SignUpContainer = styled.div`
  width: 100%;
  max-width: 316px;
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
const FormContainer = styled.div`
  width: 100%;
  max-width: 316px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;

  margin-bottom: 24px;
  border-radius: 5px;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
  background: #ffffff;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 100%;
    max-width: 268px;
    margin: 6px 0px;
  }
  label {
    font-size: 0.9rem;
    font-weight: 600;
  }
  p {
    margin-top: 5px;
    color: #d03956;
    font-size: 0.7rem;
  }
  .-link {
    word-break: keep-all;
    color: #0074cc;
    &:hover {
      color: #3cacfa;
    }
  }
  p.red {
    color: #d03956;
    font-size: 0.7rem;
  }
  .passwordvalid {
    color: #6a7384;
    margin: 4px 0px;
  }
  .hide {
    display: none;
  }
  .product {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .product-checkbox {
      margin-right: 4px;
    }
  }

  .privacy {
    font-size: 0.7rem;
    margin: 0px;
    > a {
      word-break: keep-all;
    }
  }

  .checkbox-input {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 0.75em;
    font-weight: 400;
    color: var(--black-700);
    cursor: pointer;
    > input {
      margin-right: 4px;
      cursor: pointer;
    }
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
  border: string | undefined;
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

export default SignUp;
