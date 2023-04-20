import { FilterButton } from '@/components/button/FilterButton';
import Card from '@/components/card/Card';
import Input from '@/components/input/Input';
import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import styled from 'styled-components';

//경로 https://stackoverflow.com/tags
const Tags = () => {
  const [pickFilter, setPickFilter] = useState('Reputation');
  return (
    <TagsContainer>
      <div className="title">Users</div>
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
      <div className="content">
        <Card>
          <div>태그</div>
          <div>본문</div>
          <div>
            <div>ques</div>
            <div>week</div>
          </div>
        </Card>
      </div>
    </TagsContainer>
  );
};

export default Tags;

const TagsContainer = styled.div`
  padding: 24px;
  min-height: 60vh;
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
  }
`;
