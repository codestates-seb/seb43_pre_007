import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_RESOUCE_URL
    : 'http://localhost:3000';

const api = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
