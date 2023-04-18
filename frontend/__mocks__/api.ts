import { rest } from 'msw';
import { Users } from './dummy/users';

export const handlers = [
  rest.get('/users/:size/:page', async (req, res, ctx) => {
    const { size, page } = req.params;
    const data = Users.slice(
      (Number(page) - 1) * Number(size),
      Number(page) * Number(size)
    );
    return res(ctx.status(200), ctx.json(data));
  }),
];

// page 1 36 , page2 36 page 3 36
