/* eslint-disable @next/next/no-img-element */
import { FilterButton } from '@/components/button/FilterButton';
import Input from '@/components/input/Input';
import { daysFilter } from '@/constant/constant';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { useQuery } from 'react-query';
import styled from 'styled-components';

//경로 https://stackoverflow.com/users
const Users = () => {
  const [pickFilter, setPickFilter] = useState('Reputation');
  const [pickDaysFilter, setPickDaysFilter] = useState(1);
  const [page, setPage] = useState(1);

  const upPage = () => {
    setPage(page + 1);
  };
  const downPage = () => {
    setPage(page - 1);
  };

  const { isLoading, error, data, refetch } = useQuery<
    { data: User[]; total: number },
    Error
  >('users', () =>
    axios(`/users?size=36&page=${page}`).then((res) => res.data)
  );
  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (error) return <p>Error: {error.message}</p>;
  else
    return (
      <>
        <UsersContainer>
          {isLoading && (
            <div className="loading_message">
              <p>Loading...</p>
            </div>
          )}
          {data && (
            <>
              <div>Users</div>
              <div>
                <div>
                  <i>
                    <GoSearch />
                  </i>
                  <Input paddingLeft="28px" placeholder="Filter by user" />
                </div>
                <div>
                  <FilterButton
                    filters={[
                      'Reputation',
                      'New users',
                      'Voters',
                      'Editors',
                      'Moderators',
                    ]}
                    onChange={setPickFilter}
                  />
                </div>
              </div>
              <div>
                <div>
                  {daysFilter.map((category, i) => (
                    <span
                      className={i === pickDaysFilter ? 'focus_span' : ''}
                      onClick={() => setPickDaysFilter(i)}
                      key={category}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                {data.data?.map((user: User) => (
                  <div key={user.id} className="grid-item">
                    <div>
                      <img src={user.user_img} alt="" />
                    </div>
                    <div>
                      <Link href={'/users/21615528/신동민'}>
                        {user.first_name}
                      </Link>
                      <span>{user.last_name}</span>
                      <span>{user.reputation.toLocaleString()}</span>
                    </div>
                    <div>
                      {<a>{user.tags}</a>}
                      {/* <a>git</a>, <a>github</a>, <a>go</a> */}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </UsersContainer>
        {data && (
          <PageContainer>
            <div>weekly / monthly / quarterly reputation leagues</div>
            <div className="pagenation">
              {page > 1 && <span onClick={downPage}>Prev</span>}
              {Array(Math.round(data.total / 36))
                .fill(1)
                .slice(0, 5)
                .map((x, i) => (
                  <span
                    className={i + 1 === page ? 'focus_orange' : ''}
                    key={i}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </span>
                ))}
              <div>...</div>
              <span
                className={28 === page ? 'focus_orange' : ''}
                onClick={() => setPage(28)}
              >
                {Math.round(data.total / 36)}
              </span>
              {page < Math.round(data.total / 36) && (
                <span onClick={upPage}>Next</span>
              )}
            </div>
          </PageContainer>
        )}
      </>
    );
};

export default Users;

const UsersContainer = styled.div`
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
  > div:first-child {
    font-size: 1.5rem;
  }
  > div:nth-child(2) {
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
  > div:nth-child(3) {
    margin-top: 20px;
    margin-bottom: 10px;
    margin-right: 10px;
    > div {
      display: flex;
      justify-content: end;
      flex-wrap: wrap;
      font-size: 0.7rem;
      @media (max-width: 980px) {
        justify-content: start;
      }
      > span {
        height: 30px;
        padding: 0px 10px;
        padding-top: 10px;
        padding-bottom: 16px;
        cursor: pointer;
        :hover {
          border-bottom: 1px solid var(--bg-orange);
        }
      }
      .focus_span {
        border-bottom: 1px solid var(--bg-orange);
      }
    }
  }
  > div:nth-child(4) {
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
    .grid-item {
      padding: 5px 6px 7px 7px;
      div:first-child {
        float: left;
        width: 48px;
        height: 48px;
        img {
          border-radius: 4px;
          width: 100%;
          height: 100%;
        }
      }
      div:nth-child(2) {
        margin-left: 55px;
        width: calc(100% - 64px);
        line-height: 1.3;
        a {
          display: block;
          color: var(--text-blue);
        }
        span {
          font-size: 0.75rem;
          display: block;
        }
        span:nth-child(2) {
          opacity: 0.8;
        }
        span:last-child {
          font-weight: 900;
        }
      }
      div:last-child {
        line-height: 1;
        margin-bottom: 4px;
        margin-left: 55px;
        a {
          cursor: pointer;
          color: var(--text-blue);
          font-size: 0.7rem;
        }
      }
    }
  }
`;

const PageContainer = styled.div`
  padding: 24px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  > div:first-child {
    font-weight: 900;
    cursor: pointer;
    font-size: 0.8rem;
    color: var(--text-blue);
  }
  .pagenation {
    display: flex;
    .focus_orange {
      background-color: var(--bg-orange);
      color: white;
      :hover {
        background-color: var(--bg-orange);
        color: white;
      }
    }
    > div {
      margin: 0px 10px;
      display: flex;
      align-items: end;
      padding-bottom: 7px;
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px 8px;
      height: 27px;
      font-size: 0.9rem;
      border: 1px solid #d8d9da;
      border-radius: 4px;
      margin: 0px 3px;
      cursor: pointer;
      :hover {
        background-color: #cccdce;
      }
    }
  }
`;
