import Head from 'next/head';
import { useRouter } from 'next/router';
import { QuestionItem } from '@/components/questionItem/QuestionItem';
import { FilterButton } from '@/components/button/FilterButton';
import { addCommaToNumber } from '@/util/addCommaToNum';
import { useQuery } from 'react-query';
import { ResQuestion } from '@/util/api/questions';
import { PerPage } from '@/components/perPage/PerPage';
import { api } from '@/util/api';
import styled from 'styled-components';
import Pagenation from '@/components/pagenation/Pagenation';
import Button from '@/components/button/Button';
import { objToQuery } from '@/util/objectToQuery';
import {
  INIT_FILTER,
  QUESTION_FILTER_LIST,
  QUESTION_PER_PAGE_LIST,
} from '@/constant/constant';
import { Skeleton } from '@/components/skeleton/Skeleton';
import SideCard from '@/components/side_card/SideCard';

const Questions = () => {
  const { push, query, isReady } = useRouter();
  const { page, perPage, filter } = query;

  const { isLoading, data } = useQuery(
    ['questions', query],
    () =>
      api
        .get<ResQuestion>(`/questions${objToQuery(query)}`)
        .then((res) => res.data),
    { enabled: isReady }
  );

  const handlePagefilter = (filter: { [key: string]: string | number }) => {
    const setQuery = { ...query, ...filter };

    if ('perPage' in filter) setQuery['page'] = INIT_FILTER.PAGE;

    push({
      pathname: '/questions',
      query: setQuery,
    });
  };

  const handleWriteClick = () => {
    push('/questions/ask');
  };

  return (
    <>
      <Head>
        <title>
          {isReady && filter ? `${filter} - Stack Overflow` : `Stack Overflow`}
        </title>
      </Head>
      <Container>
        <div>
          <QuestionHeader>
            <div>
              <h1>All Questions</h1>
              <CustomButton onClick={handleWriteClick}>
                Ask Question
              </CustomButton>
            </div>
            <div>
              <div className="question_cnt">
                {addCommaToNumber(data?.page_info?.total_elements || 0)}{' '}
                questions
              </div>
              <FilterButton
                default={filter?.toString() || INIT_FILTER.FILTER}
                onChange={(filter) => handlePagefilter({ filter })}
                filters={QUESTION_FILTER_LIST}
              />
            </div>
          </QuestionHeader>
          {!isLoading && data?.data?.length ? (
            <QuestionList>
              {data?.data?.map(({ question, user }) => {
                return (
                  <QuestionItem
                    id={question.question_id}
                    title={question.title}
                    body={question.body}
                    isVote={question.vote.is_vote}
                    isScore={question.vote.score}
                    answerCount={question.answer_count}
                    creationData={question.creation_date}
                    userName={user.display_name}
                    key={question.question_id}
                    tags={question.tags.map((tag) => ({
                      id: tag.tag_id,
                      name: tag.name,
                    }))}
                  />
                );
              })}
            </QuestionList>
          ) : (
            <SkeletonContainer>
              <div>
                <Skeleton width={`100px`} height={'20px'} />
                <Skeleton width={`100px`} height={'20px'} />
                <Skeleton width={`100px`} height={'20px'} />
              </div>
              <div>
                <Skeleton width={`100%`} height={'20px'} />
                <Skeleton width={`100%`} height={'20px'} />
                <Skeleton width={`100%`} height={'20px'} />
              </div>
            </SkeletonContainer>
          )}
          <QuestionFooter>
            <Pagenation
              initialPage={Number(page) || INIT_FILTER.PAGE}
              pageSize={Number(data?.page_info?.total_pages) - 1 || 0}
              onPageChange={(page) => handlePagefilter({ page })}
            />
            <PerPage
              current={Number(perPage) || INIT_FILTER.PER_PAGE}
              perPageList={QUESTION_PER_PAGE_LIST}
              onChangePage={(perPage) => handlePagefilter({ perPage })}
            />
          </QuestionFooter>
        </div>
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
                      Improving the copy in the close modal and post notices -
                      2023 edition
                    </div>
                  </li>
                  <li className="included-icon">
                    <div className="favicon stackexchangemeta"></div>
                    <div>
                      New blog post from our CEO Prashanth: Community is the
                      future of AI
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
                      Review our technical responses for the 2023 Developer
                      Survey
                    </div>
                  </li>
                </ul>
              </div>
            </SideCard>
          </div>
          <div>
            <SideCard textSize={'sm'}>
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
            <SideCard textSize={'sm'}>
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
            <SideCard textSize={'sm'}>
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
            <SideCard textSize={'sm'}>
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
                      On-premises, hybrid, multicloud, or at the edge—build on
                      your terms with best-in-class...
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
      </Container>
    </>
  );
};

export default Questions;

const SideContainer = styled.div`
  margin-top: 24px;
  margin-left: 20px;
  width: 300px;

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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  font-family: 'Roboto';
`;

const QuestionHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px 0 16px;

  h1 {
    color: #232629;
    font-size: 25px;
  }

  .question_cnt {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 20px;
    }

    .question_cnt {
      font-size: 15px;
    }
  }
`;

const CustomButton = styled(Button)`
  width: 100px;
  height: 37px;
  color: white;
`;

const QuestionList = styled.ul`
  border-top: 1px solid #d6d9dc;
  border-bottom: 1px solid #d6d9dc;
`;

const QuestionFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 70px 0 20px;
  padding: 0 24px 24px 24px;
  gap: 10px;

  @media (max-width: 640px) {
    margin: 70px 0 0 0;
  }
`;

const SkeletonContainer = styled.div`
  padding: 16px 16px 0 16px;
  width: 100%;
  display: flex;
  gap: 10px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &:last-child {
      width: 100%;
    }
  }
`;
