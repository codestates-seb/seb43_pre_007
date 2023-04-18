import { localState } from '@/function/local_storage/localStorage';
import { atom } from 'recoil';

export const userLogState = atom({
  key: 'userLogState',
  default: true, //true로하고 작업
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
