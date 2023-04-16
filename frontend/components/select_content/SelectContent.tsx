import styled from 'styled-components';

type SelectContentProps = {
  pickCategory: number;
  selectPickCategory: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: string[];
  sub: string;
};

const SelectContent = ({
  pickCategory,
  selectPickCategory,
  categories,
  sub,
}: SelectContentProps) => {
  return (
    <SelectContainer>
      <div>Navigation</div>
      <div>View all {sub.toLowerCase()} pages</div>
      <select
        className="focus_blue"
        onChange={selectPickCategory}
        value={pickCategory}
      >
        {categories[0] === 'Summary' ? (
          categories.map((category, i) => (
            <option key={`${category}+${i}`} value={i}>
              {category}
            </option>
          ))
        ) : (
          <>
            {categories.slice(0, 2).map((category, i) => (
              <option key={`${category}+${i}`} value={i}>
                {category}
              </option>
            ))}
            {categories.length > 2 && (
              <optgroup label="My lists">
                {categories.slice(2).map((category, i) => (
                  <option key={`${category}+${i}`} value={i + 2}>
                    {category}
                  </option>
                ))}
              </optgroup>
            )}
          </>
        )}
      </select>
    </SelectContainer>
  );
};

export default SelectContent;

const SelectContainer = styled.div`
  width: 100%;
  margin: 20px 0px;
  > div {
    margin-bottom: 8px;
  }

  > div:first-child {
    font-weight: 900;
    font-size: 0.8rem;
  }
  > div:nth-child(2) {
    font-size: 0.7rem;
  }

  @media (min-width: 980px) {
    display: none;
  }
  > select {
    width: 100%;
    padding: 7.8px 32px 7.8px 9.1px;
    border: 1px solid var(--border-gray);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHAW4SlLS2rKFXiStNT36W_CCwgcgKiKXXOGHZViUtLg6gz9gKSNAtZeHaC8LoBRc-xFk&usqp=CAU');
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: 97% 50%;
  }
`;
