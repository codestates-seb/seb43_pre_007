import { atom } from 'recoil';

export const userLogState = atom({
  key: 'userLogState',
  default: true, //true로하고 작업
});

export const myListState = atom({
  key: 'myListState',
  default: [],
});
