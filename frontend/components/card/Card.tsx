import styled from 'styled-components';

const Card = () => {
  return <CardContainer>카드에요 카드</CardContainer>;
};

export default Card;

const CardContainer = styled.div`
  padding: 24px;
  border: 1px solid var(--border-gray);
  border-radius: 6px;
`;
