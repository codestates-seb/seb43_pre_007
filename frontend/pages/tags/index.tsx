import { FilterButton } from '@/components/button/FilterButton';
import Card from '@/components/card/Card';
import Input from '@/components/input/Input';
import Pagenation from '@/components/pagenation/Pagenation';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { useQuery } from 'react-query';
import styled from 'styled-components';

//경로 https://stackoverflow.com/tags
const Tags = () => {
  const [pickFilter, setPickFilter] = useState('Reputation');
  const router = useRouter();
  const pageNum = new URLSearchParams(router.asPath).get('page');
  const [page, setPage] = useState(Number(pageNum) || 1);
  const { isLoading, error, data, refetch } = useQuery<
    { data: Tags[]; total: number },
    Error
  >('tags', () => axios(`/tags?size=36&page=${page}`).then((res) => res.data));
  useEffect(() => {
    refetch();
    router.push({
      pathname: router.pathname,
      query: { size: 36, page: page },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refetch]);

  if (error) return <p>Error: {error.message}</p>;

  return (
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
          <Card key={tag.name}>
            <div className="tag_name">
              <a>{tag.name}</a>
            </div>
            <div className="tag_info">{tag.info}</div>
            <div className="tag_count">{`${tag.count} questions`}</div>
          </Card>
        ))}
      </div>
      <div className="pagenation_box">
        <Pagenation
          initialPage={page}
          onPageChange={setPage}
          pageSize={data ? Math.round(data.total / 36) : 0}
        />
      </div>
    </TagsContainer>
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
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      overflow: hidden;
      white-space: nowrap; /* 줄 바꿈 없이 한 줄에 표시합니다 */
      text-overflow: ellipsis; /* 잘린 부분을 ...으로 표시합니다 */
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
        width: 100%;
        font-size: 0.75rem;
        margin-bottom: 20px;
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
