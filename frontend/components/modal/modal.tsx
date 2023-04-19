import {
  modalNameState,
  modalState,
  modalValState,
  myListState,
  pickCategoryState,
} from '@/recoil/atom';
import { useRecoilState } from 'recoil';
import styled, { css, keyframes } from 'styled-components';
import Input from '../input/Input';
import Button from '../button/Button';
import { useEffect, useRef } from 'react';
import {
  deleteLocalStorage,
  editLocalStorage,
  getLocalStorage,
  setLocalStorage,
  updateLocalStorage,
} from '@/util/local_storage/localStorage';

const Modal = () => {
  //모달 상태 및 함수
  const [modalName] = useRecoilState(modalNameState);
  const [modal, setModal] = useRecoilState(modalState);
  const modalRef = useRef<HTMLDivElement>(null);
  const offModal = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as Element;
    if (
      modalRef.current?.contains(targetElement) &&
      targetElement.closest('.modal-content')
    ) {
      return;
    }
    e.preventDefault();
    setModalVal('');
    setModal(false);
  };
  const cancleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalVal('');
    setModal(false);
  };
  //모달 값
  const [modalVal, setModalVal] = useRecoilState(modalValState);
  const changeModalVal = (e: {
    target: { value: string | ((currVal: string) => string) };
  }) => {
    setModalVal(e.target.value);
  };
  //리스트
  const [myList, setMyList] = useRecoilState(myListState);
  //추가하기
  const addMyList = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMyList([...myList, modalVal]);
    setModal(false);
    if (getLocalStorage('myList')) {
      updateLocalStorage('myList', modalVal);
    } else {
      setLocalStorage('myList', modalVal);
    }
    setModalVal('');
  };
  //선택된 카테고리 관련
  const [pickCategory, setPickCategory] = useRecoilState(pickCategoryState);
  useEffect(() => {
    pickCategory > 1 && setModalVal(myList[pickCategory - 2]);
  }, [myList, setModalVal, pickCategory]);
  //수정하기
  const editList = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newList = [...myList];
    const selectedIndex = pickCategory - 2;
    newList[selectedIndex] = modalVal;
    setMyList(newList);
    setModal(false);
    editLocalStorage('myList', selectedIndex, modalVal);
  };
  //삭제하기
  const deleteList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const selectedIndex = pickCategory - 2;
    setMyList([
      ...myList.slice(0, selectedIndex),
      ...myList.slice(selectedIndex + 1),
    ]);
    setModal(false);
    setPickCategory(0);
    deleteLocalStorage('myList', selectedIndex);
  };
  return (
    <ModalContainer modal={modal} onClick={offModal} ref={modalRef}>
      <div className="modal-content">
        <form onSubmit={modalName === 'Edit list' ? editList : addMyList}>
          <h1>{modalName}</h1>
          <div>
            <Input
              onChange={changeModalVal}
              value={modalVal}
              paddingLeft={'6px'}
              placeholder="Enter list name"
              maxLength={30}
            />
          </div>
          <div>
            <div>
              <Button color="var(--text-white)">
                <a>Save</a>
              </Button>
              <button onClick={cancleModal}>Cancel</button>
            </div>
            <div>
              {modalName === 'Edit list' && (
                <button onClick={deleteList}>Delete list</button>
              )}
            </div>
          </div>
          <button onClick={cancleModal}>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41Z"></path>
            </svg>
          </button>
        </form>
      </div>
    </ModalContainer>
  );
};

export default Modal;

const zoomIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

type ModalContainerProps = {
  modal: boolean;
};
const ModalContainer = styled.div<ModalContainerProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: ${({ modal }) => (modal ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  > div {
    position: relative;
    width: 328px;
    height: 20%;
    border-radius: 8px;
    z-index: 2;
    background: white;
    padding: 24px;
    opacity: 1;
    ${({ modal }) =>
      modal &&
      css`
        animation: ${zoomIn} 0.2s ease-in-out;
      `};
    @media (max-width: 740px) {
      width: 268px;
    }
    form {
      h1 {
        font-size: 1.5rem;
        font-weight: 900;
      }
      > div:nth-child(2) {
        margin-top: 20px;
      }
      > div:nth-child(3) {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        > div:first-child {
          > button {
            padding: 8px;
          }
          > button:first-child {
            margin: 0;
            margin-right: 4px;
            width: auto;
          }
          > button:last-child {
            border: none;
            background-color: white;
            color: var(--text-blue);
            cursor: pointer;
            :hover {
              background-color: rgb(234, 249, 255);
            }
          }
        }
        > div:last-child {
          button {
            padding: 8px;
            cursor: pointer;
            border: 1px solid var(--text-red);
            border-radius: 6px;
            color: var(--text-red);
            background-color: white;
          }
        }
      }
      > button {
        border: none;
        cursor: pointer;
        background-color: white;
        top: var(--su8);
        right: var(--su8);
        position: absolute;
        padding: 2px;
        border-radius: 4px;
        :hover {
          background-color: rgb(236, 236, 236);
        }
      }
    }
  }
`;
