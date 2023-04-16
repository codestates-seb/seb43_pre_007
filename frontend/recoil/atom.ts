import { atom } from 'recoil';

export const userLogState = atom({
  key: 'userLogState',
  default: true, //true로하고 작업
});

export const myListState = atom<string[]>({
  key: 'myListState',
  default: [],
});

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const modalValState = atom({
  key: 'modalValState',
  default: '',
});
