import { UserData } from '@/types/types';
import { atom } from 'recoil';

export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
});

export const userDataState = atom<UserData>({
  key: 'userDataState',
  default: {
    access_token: '',
    display_name: '',
    image: '',
    refresh_token: '',
    user_id: 0,
  },
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
