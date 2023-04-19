import { rest } from 'msw';
import { signupusers } from './dummy';

export const handlers = [
  rest.get('/login', async (req, res, ctx) => {
    const data = await req.json();
    return res(ctx.status(200), ctx.json({ data }));
  }),

  rest.post('/login', async (req, res, ctx) => {
    const data = await req.json();
    return res(ctx.status(200), ctx.json({ result: data }));
  }),
  rest.post('/signup', async (req, res, ctx) => {
    const data = await req.json();
    const users = signupusers.users.push(data);
    return res(ctx.status(200), ctx.json({ users }));
  }),
];
