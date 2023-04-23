import styled from 'styled-components';
import { KeyboardEvent, MouseEvent, useRef, useState } from 'react';
import { Chip } from '../chip/Chip';

export type InputChipProps = {
  onChange?: (chips: string[]) => void;
  value?: Array<string>;
};

export const InputChip = (props: InputChipProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [chips, setChips] = useState<string[]>(props.value || []);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Space' || e.currentTarget.value.trim() === '') return;

    setChips([...chips, e.currentTarget.value.trim()]);
    e.currentTarget.value = '';
    props.onChange?.(chips);
  };

  const handleDeleteChip =
    (index: number) => (_: MouseEvent<HTMLDivElement>) => {
      setChips(chips.filter((_, chipIndex) => chipIndex !== index));
    };

  const handleContainerClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <Container onClick={handleContainerClick}>
      {chips.map((chip, index) => (
        <div key={index} className="chip" onClick={handleDeleteChip(index)}>
          <Chip href="">
            {chip}
            <span className="close">x</span>
          </Chip>
        </div>
      ))}
      <input type="text" onKeyUp={handleKeyUp} ref={inputRef} />
    </Container>
  );
};

const Container = styled.div`
  display: felx;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid #d1cdcd;
  border-radius: 3px;
  width: 100%;
  font-size: 0.8rem;
  padding: 8px 6px 8px 8px;
  line-height: 14px;
  color: #3d3c3b;
  gap: 5px;
  overflow: hiiden;
  cursor: pointer;

  input {
    flex-grow: 1;
    display: flex;
    height: 24px;
    border: none;

    &:focus {
      outline: none;
    }
  }

  .chip {
    margin-right: 5px;
  }

  .close {
    margin-left: 5px;
  }

  &:focus-within {
    outline: 1px solid rgba(0, 195, 255, 0.5);
    box-shadow: 0 0 8px 2px rgba(4, 137, 247, 0.555);
  }
`;
