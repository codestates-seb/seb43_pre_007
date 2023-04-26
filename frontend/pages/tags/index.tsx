import styled from 'styled-components';
import Card from '@/components/card/Card';
import Input from '@/components/input/Input';
import Pagenation from '@/components/pagenation/Pagenation';
import { FilterButton } from '@/components/button/FilterButton';
import { api } from '@/util/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { useQuery, useQueryClient } from 'react-query';
import { PageInfo, Tags } from '@/types/types';

//경로 https://stackoverflow.com/tags
const Tags = () => {
  const [, setPickFilter] = useState('Reputation');
  const router = useRouter();
  const pageNum = new URLSearchParams(router.asPath).get('page');
  const [page, setPage] = useState(Number(pageNum) || 1);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && page < data.page_info.total_pages) {
      const nextPage = page + 1;
      queryClient.prefetchQuery(['tags', nextPage], () =>
        api(`/tags?size=36&page=${nextPage}`).then((res) => res.data)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, queryClient]);

  const { isLoading, error, data, refetch } = useQuery<
    { data: Tags[]; page_info: PageInfo },
    Error
  >(['tags', page], () =>
    api(`/tags?size=36&page=${page}`).then((res) => res.data)
  );
  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: { size: 36, page: page },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refetch]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <TagsContainer>
        <div className="title">Tags</div>
        <p className="title_sub">
          A tag is a keyword or label that categorizes your question with other,
          similar questions. Using the right tags makes it easier for others to
          find and answer your question.
        </p>
        <a>Show all tag synonyms</a>
        <div className="sub">
          <div>
            <i>
              <GoSearch />
            </i>
            <Input paddingLeft="28px" placeholder="Filter by tag name" />
          </div>
          <div>
            <FilterButton
              filters={['Reputation', 'Name', 'New']}
              onChange={setPickFilter}
            />
          </div>
        </div>
        {isLoading && (
          <div className="loading_message">
            <p>Loading...</p>
          </div>
        )}
        <div className="content">
          {data?.data.map((tag) => (
            <Card key={tag.tag_id}>
              <div className="tag_name">
                <a>{tag.name}</a>
              </div>
              <div className="tag_info">
                {tag.info}
                {tag.info}
                {tag.info}
                {tag.info}
                {tag.info}
              </div>
              <div className="tag_count">{`${tag.question_amount} questions`}</div>
            </Card>
          ))}
        </div>
      </TagsContainer>
      <PageBox className="pagenation_box">
        <Pagenation
          initialPage={page}
          onPageChange={setPage}
          pageSize={data ? data.page_info.total_pages : 0}
        />
      </PageBox>
    </>
  );
};

export default Tags;

const TagsContainer = styled.div`
  padding: 24px;
  min-height: 60vh;
  .loading_message {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    > p {
      font-size: 1.5rem;
    }
  }
  > .title {
    font-size: 1.5rem;
  }
  > .title_sub {
    margin: 16px 0px;
    font-size: 0.93rem;
    max-width: calc(calc(97rem / 12) * 6);
    line-height: 20px;
  }
  > a {
    font-size: 0.8rem;
    color: var(--text-blue);
  }
  > .sub {
    position: relative;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 980px) {
      flex-direction: column;
    }
    i {
      position: relative;
      font-size: 1.1rem;
      opacity: 0.6;
      @media (max-width: 980px) {
      }
      > svg {
        position: absolute;
        top: 25%;
        left: 8px;
      }
    }
    input {
      padding-top: 10px;
      padding-bottom: 10px;
      @media (max-width: 980px) {
        width: 47%;
        min-width: 250px;
        margin-bottom: 12px;
      }
      @media (max-width: 320px) {
        min-width: 100%;
      }
    }
    > div:nth-child(2) {
      ul {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
  > .content {
    margin-top: 12px;
    padding-top: 10px;
    display: grid;
    grid-row-gap: 30px;
    grid-column-gap: 10px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    @media (max-width: 1264px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (max-width: 980px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 640px) {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    > .card {
      padding: 12px;
      display: flex;
      flex-direction: column;
      .tag_name {
        display: flex;
        justify-content: space-between;
        font-size: 0.7rem;
        margin-bottom: 16px;
        > a {
          background-color: aliceblue;
          padding: 6px 4.8px;
          color: #3077b6;
          border-radius: 4px;
        }
      }
      .tag_info {
        font-size: 0.75rem;
        margin-bottom: 20px;
        word-break: break-word;
        margin-bottom: var(--su12);
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .tag_count {
        width: 100%;
        font-size: 0.7rem;
        margin-bottom: 6px;
        opacity: 0.6;
      }
    }
  }
  .pagenation_box {
    display: flex;
    width: 100%;
    justify-content: end;
    margin: 30px 0px;
  }
`;

const PageBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin: 30px 0px;
  padding: 24px;
`;
