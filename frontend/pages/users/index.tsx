import { FilterButton } from '@/components/button/FilterButton';
import Input from '@/components/input/Input';
import { GoSearch } from 'react-icons/go';
import styled from 'styled-components';

//경로 https://stackoverflow.com/users
const Users = () => {
  return (
    <UsersContainer>
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
            onChange={() => {}}
          />
        </div>
        <div>
          
        </div>
      </div>
    </UsersContainer>
  );
};

export default Users;

const UsersContainer = styled.div`
  padding: 24px;
  > div:first-child {
    font-size: 1.5rem;
  }
  > div:nth-child(2) {
    position: relative;
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    i {
      position: absolute;
      top: 25%;
      left: 0.5%;
      font-size: 1.1rem;
      opacity: 0.6;
    }
    input {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
`;
