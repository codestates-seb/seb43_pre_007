import SideCard from '@/components/side_card/SideCard';
import styled from 'styled-components';
import Button from '../button/Button';

const RightSideBar = () => {
  return (
    <SideContainer>
      <div>
        <SideCard>
          <div>The Overflow Blog</div>
          <div>
            <ul>
              <li className="included-icon">
                <div>
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path d="m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z"></path>
                  </svg>
                </div>
                <div>
                  Ops teams are pets, not cattle (Ep. 562) sponsored post
                </div>
              </li>
              <li className="included-icon">
                <div>
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path d="m11.1 1.71 1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0ZM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88Z"></path>
                  </svg>
                </div>
                <div>
                  When setting up monitoring, less data is better (Ep. 563)
                </div>
              </li>
            </ul>
          </div>
        </SideCard>
        <SideCard>
          <div>Featured on Meta</div>
          <div>
            <ul>
              <li className="included-icon">
                <div className="favicon stackexchangemeta"></div>
                <div>
                  Improving the copy in the close modal and post notices - 2023
                  edition
                </div>
              </li>
              <li className="included-icon">
                <div className="favicon stackexchangemeta"></div>
                <div>
                  New blog post from our CEO Prashanth: Community is the future
                  of AI
                </div>
              </li>
              <li className="included-icon">
                <div className="favicon stackoverflowmeta"></div>
                <div>Temporary policy: ChatGPT is banned</div>
              </li>
              <li className="included-icon">
                <div className="favicon stackoverflowmeta"></div>
                <div>The [protection] tag is being burninated</div>
              </li>
              <li className="included-icon">
                <div className="favicon stackoverflowmeta"></div>
                <div>
                  Content Discovery initiative April 13 update: Related
                  questions using a...
                </div>
              </li>
              <li className="included-icon">
                <div className="favicon stackoverflowmeta"></div>
                <div>
                  Review our technical responses for the 2023 Developer Survey
                </div>
              </li>
            </ul>
          </div>
        </SideCard>
      </div>
      <div>
        <SideCard textSize={'big'}>
          <div>Custom Filters</div>
          <div>
            <ul>
              <li>
                <a>Create a custom filter</a>
              </li>
            </ul>
          </div>
        </SideCard>
      </div>
      <div>
        <SideCard textSize={'big'}>
          <div>Watched Tags</div>
          <div>
            <ul>
              <li>
                <Button id="upload">upload</Button>
              </li>
            </ul>
          </div>
        </SideCard>
      </div>
      <div>
        <SideCard textSize={'big'}>
          <div>Ignored Tags</div>
          <div>
            <ul>
              <li id="add-tag">
                <Button>Add an ignored tag</Button>
              </li>
            </ul>
          </div>
        </SideCard>
      </div>
      <div>
        <SideCard textSize={'big'}>
          <div>Collectives</div>
          <div>
            <ul>
              <li className="widget">
                <div>
                  <div className="icons window"></div>
                  <div className="widget-title-box">
                    <div>Microsoft Azure</div>
                    <div>6k Members</div>
                  </div>
                  <div>
                    <Button>Join</Button>
                  </div>
                </div>
                <div>
                  On-premises, hybrid, multicloud, or at the edge—build on your
                  terms with best-in-class...
                </div>
              </li>
              <li className="widget">
                <div>
                  <div className="icons wso"></div>
                  <div className="widget-title-box">
                    <div>WSO2</div>
                    <div>4k Members</div>
                  </div>
                  <div>
                    <Button>Join</Button>
                  </div>
                </div>
                <div>
                  WSO2 solutions give enterprises the flexibility to deploy
                  applications and services on-
                </div>
              </li>
              <li className="widget">
                <div>
                  <div className="icons cicd"></div>
                  <div className="widget-title-box">
                    <div>CI/CD</div>
                    <div>3k Members</div>
                  </div>
                  <div>
                    <Button>Join</Button>
                  </div>
                </div>
                <div>
                  A collective where developers focused on continuous
                  integration, delivery, and...
                </div>
              </li>
            </ul>
          </div>
        </SideCard>
      </div>
    </SideContainer>
  );
};

export default RightSideBar;

const SideContainer = styled.div`
  margin-top: 24px;
  margin-left: 20px;
  min-width: 300px;
  max-width: 300px;

  @media (max-width: 980px) {
    display: none;
  }

  > div {
    margin-bottom: 16px;
  }

  > div:first-child {
    > div {
      > div:first-child {
        background-color: #fbf3d5;
      }
      > div:last-child {
        background-color: #fdf7e2;
      }
    }
  }

  > div:first-child {
    > div:first-child {
      border-radius: 0px;
      border-bottom: none;
      box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05),
        0 1px 4px hsla(0, 0%, 0%, 0.05), 0 0px 0px hsla(0, 0%, 0%, 0);
    }
    > div:last-child {
      border-radius: 0px;
    }
  }

  .included-icon {
    display: flex;
    > div:first-child {
      flex-shrink: 0;
      flex-basis: 8.33333333%;
    }
    > div:last-child {
      min-width: 0;
    }

    .favicon {
      width: 16px;
      height: 16px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-size: 16px;
      background-image: url('https://cdn.sstatic.net/Img/favicons-sprite16.png?v=8e1d0590b7cb');
    }

    .stackexchangemeta {
      background-position: 0 -6120px;
    }

    .stackoverflowmeta {
      background-position: 0 -6156px;
    }
  }
  #upload {
    border: none;
    margin-left: 0px;
    width: auto;
    background-color: #e1ecf4;
    color: #3973b3;
  }
  #add-tag {
    display: flex;
    justify-content: center;
    > button {
      padding: 10px;
      margin-left: 0px;
      background-color: #e1ecf4;
      color: #3973b3;
      width: auto;
    }
  }

  .widget {
    button {
      padding: 8px;
      margin-left: 0px;
      background-color: white;
      color: #3973b3;
      width: auto;
    }

    > div:first-child {
      display: flex;
      margin-bottom: 12px;
      margin-right: 10px;

      .icons {
        width: 32px;
        height: 32px;
        background-size: 100%;
        margin-right: 10px;
      }

      .window {
        background-image: url('https://cdn.sstatic.net/Sites/stackoverflow/Img/subcommunities/azure.svg?v=acd37945b78d');
      }

      .wso {
        background-image: url('https://cdn.sstatic.net/Sites/stackoverflow/Img/subcommunities/wso2.svg?v=c0cf1295bad3');
      }

      .cicd {
        background-image: url('https://cdn.sstatic.net/Sites/stackoverflow/Img/subcommunities/ci-cd.svg?v=1f5fecb64403');
      }
    }

    .widget-title-box {
      flex: 1;
    }
  }
`;
