import { FOOTER_NAV, FOOTER_SOCIAL } from '@/constant/constant';
import Link from 'next/link';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <Link href="/">
          <svg width="32" height="37" viewBox="0 0 32 37">
            <path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path>
            <path
              d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z"
              fill="#F48024"
            ></path>
          </svg>
        </Link>
      </div>
      <nav>
        {FOOTER_NAV.map((category, i) => (
          <div key={i}>
            <h5>
              <a>{Object.keys(category)}</a>
            </h5>
            <ul>
              {Object.values(category).map((pages) =>
                pages.map((page) => (
                  <li key={page}>
                    <a>{page}</a>
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </nav>
      <div>
        <ul>
          {FOOTER_SOCIAL.map((list, i) => (
            <li key={i}>{list}</li>
          ))}
        </ul>
        <p>
          Site design / logo © 2023 Stack Exchange Inc; user contributions
          licensed under CC BY-SA. rev 2023.4.14.43390
        </p>
      </div>
    </FooterContainer>
  );
};
export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  color: #e9e5e5;
  align-items: stretch;
  background-color: var(--bg-black);
  padding: 32px calc((100% - 1320px) / 2);
  @media (max-width: 1380px) {
    padding: 32px;
  }
  > div:first-child {
    flex: 0 0 64px;
    @media (max-width: 980px) {
      display: none;
    }
  }
  > nav {
    display: flex;
    flex: 2 1 auto;
    flex-wrap: wrap;
    @media (max-width: 740px) {
      flex-direction: column;
    }
    > div {
      flex: 1 0 auto;
      padding: 0 var(--su12) var(--su24) 0;
    }
    h5 {
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: var(--su12);
      font-size: 0.91rem;
      @media (max-width: 540px) {
        font-size: 0.75rem;
      }
      > a {
        color: #c4c0c0;
      }
    }
    ul {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      @media (max-width: 740px) {
        flex-direction: row;
      }
      li {
        > a {
          color: #919191;
          font-size: 0.8rem;
          line-height: 22px;
          padding: var(--su4) 0;
          cursor: pointer;
          @media (max-width: 740px) {
            margin-right: 8px;
          }
          @media (max-width: 540px) {
            font-size: 0.7rem;
          }
        }
      }
    }
  }
  > div:last-child {
    flex: 1 1 150px;
    display: flex;
    flex-direction: column;
    ul {
      display: flex;
      li {
        font-size: 0.7rem;
        margin-right: 12px;
        a {
          color: #919191;
          cursor: pointer;
        }
      }
    }
    p {
      color: #919191;
      margin-top: auto;
      margin-bottom: var(--su24);
      font-size: 0.7rem;
      @media (max-width: 740px) {
        margin-top: 16px;
      }
    }
  }
`;
