import { rest } from 'msw';
import { signupusers } from './dummy';
import { Users } from './dummy/users';

export const handlers = [
  rest.get('/login', async (req, res, ctx) => {
    const data = req.json();
    return res(ctx.status(200), ctx.json({ data }));
  }),

  rest.post('/login', async (req, res, ctx) => {
    const data = req.json();
    return res(ctx.status(200), ctx.json({ result: data }));
  }),
  rest.post('/signup', async (req, res, ctx) => {
    const data = req.json();
    const users = signupusers.push(data);
    return res(ctx.status(200), ctx.json({ users }));
  }),
  rest.get('/users', async (req, res, ctx) => {
    const url = new URL(req.url);
    const size = Number(url.searchParams.get('size'));
    const page = Number(url.searchParams.get('page'));
    const total = Users.length;
    const data = Users.slice((page - 1) * size, page * size);
    return res(ctx.status(200), ctx.json({ data, total }));
  }),
];
