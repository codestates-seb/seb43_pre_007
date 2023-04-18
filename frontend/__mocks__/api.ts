import { rest } from 'msw';
import { users } from './dummy/users';

export const handlers = [
  // rest.post('/sampleApi', async (req, res, ctx) => {
  //   const data = await req.json();
  //   return res(ctx.status(200), ctx.json({ result: data }));
  // }),
  rest.get('/users', async (req, res, ctx) => {
    const { size, page } = req.params;
    const data = users.slice(Number(page) * 1, Number(size));
    return res(ctx.status(200), ctx.json({ result: data }));
  }),
];

// page 1 36 , page2 36 page 3 36