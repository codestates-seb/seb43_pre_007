import { atom } from 'recoil';

export const leftNavState = atom({
  key: 'leftNavState',
  default: false,
});

export const productsNavState = atom({
  key: 'productsNavState',
  default: false,
});
