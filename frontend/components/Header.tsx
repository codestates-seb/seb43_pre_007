import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 3px solid #f48225;
  height: 50px;
  z-index: 100;
  min-width: auto;
  background-color: hsl(210, 8%, 97.5%);
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  > div {
    height: 100%;
    width: 100%;
    display: flex;
    margin: 0 calc((100% - 1100px) / 2);
    align-items: center;
    @media (max-width: 1100px) {
      margin: 0;
    }
  }
  .logo {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 calc(8px * 1);
    :hover {
      background-color: #ececec;
    }
    span {
      margin-left: 0;
      display: inline-block;
      text-indent: -9999em;
      width: 150px;
      height: 30px;
      margin-top: -4px;
      background-position: 0 -500px;
      background-image: url('https://cdn.sstatic.net/Img/unified/sprites.svg?v=fcc0ea44ba27');
    }
  }
  .s-navigation {
    display: flex;
    list-style: none;
    margin: 0;
    li {
      border: 0;
      font: inherit;
      font-size: 100%;
      vertical-align: baseline;
      a {
        font-size: 0.8rem;
        color: #867f78;
        padding: calc(6px * 1) calc(12px * 1);
        align-items: center;
        border-radius: 1000px;
        display: flex;
        position: relative;
        vertical-align: middle;
        :hover {
          color: black;
          background-color: #ececec;
        }
      }
    }
  }
  form {
    width: 65%;
    height: 100%;
    padding: 0px calc(8px * 1);
    > div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      input {
        border: 1px solid #d1cdcd;
        border-radius: 3px;
        width: 100%;
        padding: 6px 6px 6px 24px;
        line-height: 14px;
        color: #3d3c3b;
        :focus {
          outline: 1px solid rgba(0, 195, 255, 0.5);
          box-shadow: 0 0 8px 2px rgba(4, 137, 247, 0.555);
        }
      }
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <div>
        {/* 반응형으로 생기는 것들인듯 */}
        <a href="#"></a>
        <div>
          <div></div>
        </div>
        <a className="logo" href="/">
          <span>Stack Overflow</span>
        </a>
        <ol className="s-navigation">
          {/* products 버튼 */}
          <li>
            <a href="#">Products</a>
          </li>
        </ol>
        <div>
          {/* products 버튼 누르면 나오는 div*/}
          <div></div>
          <ol>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ol>
        </div>
        <form action="#">
          {/* 검색창 */}
          <div>
            <input type="text" />
            <img src="#" alt="#" />
            <div>
              <div></div>
              <div></div>
              <span></span>
              <div></div>
              <div></div>
            </div>
          </div>
        </form>
        <nav>
          {/* 네비바 */}
          <ol>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <div>
              <div>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
            <li></li>
            <li></li>
          </ol>
        </nav>
      </div>
    </HeaderContainer>
  );
};
export default Header;
