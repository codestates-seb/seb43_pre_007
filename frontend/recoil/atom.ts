import { getLocalStorage, localState } from '@/util/local_storage/localStorage';
import { atom } from 'recoil';

export const userIdState = atom<number>({
  key: 'userIdState',
  default: Number(getLocalStorage('userId')) || 0,
});

export const userImgState = atom({
  key: 'userImgState',
  default: '',
});
export const userNameState = atom({
  key: 'userNameState',
  default: '',
});

export const myListState = atom<string[]>({
  key: 'myListState',
  default: localState('myList', []),
});

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const modalNameState = atom({
  key: 'modalNameState',
  default: '',
});

export const modalValState = atom({
  key: 'modalValState',
  default: '',
});

export const pickState = atom({
  key: 'pickState',
  default: 0,
});

export const pickCategoryState = atom({
  key: 'pickCategoryState',
  default: 0,
});

export const editorValState = atom({
  key: 'editorValState',
  default: '',
});
