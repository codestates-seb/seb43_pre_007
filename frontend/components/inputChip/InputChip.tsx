import styled from 'styled-components';
import { KeyboardEvent, MouseEvent, useRef, useState } from 'react';
import { Chip } from '../chip/Chip';

export type InputChipProps = {
  onChange?: (chips: Array<string>) => void;
  value?: Array<string>;
};

export const InputChip = ({ onChange, value }: InputChipProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [chips, setChips] = useState<string[]>(value || []);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.code) {
      case 'Space':
        if (e.currentTarget.value.trim() === '') return;

        const value = e.currentTarget.value.trim();
        setChips([...chips, value]);
        onChange && onChange([...chips, value]);
        e.currentTarget.value = '';
        break;

      case 'Backspace':
        if (e.currentTarget.value) return;
        if (chips.length === 0) return;

        const values = chips.slice(0, chips.length - 1);
        onChange && onChange(values);
        setChips(values);
        break;
    }
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
          <Chip>
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
