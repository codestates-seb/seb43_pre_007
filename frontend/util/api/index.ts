import axios from 'axios';
import { tokenLocalStorage } from '../local_storage/localStorage';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_RESOUCE_URL
    : 'https://ec2-43-201-236-135.ap-northeast-2.compute.amazonaws.com:8080';

const api = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenLocalStorage('accessToken')}`,
  },
});

export { api };
