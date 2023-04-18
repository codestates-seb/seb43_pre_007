import { rest } from 'msw';
import { myListArr } from './dummy';

export const handlers = [
  // rest.post('/sampleApi', async (req, res, ctx) => {
  //   const data = await req.json();
  //   return res(ctx.status(200), ctx.json({ result: data }));
  // }),
  rest.post('/users/my_list', async (req, res, ctx) => {
    const data = await req.json();
    const filter = myListArr.find((x) => x.id === data);
    if (!filter) {
      return res(ctx.status(404));
    }
    const { myList } = filter;
    return res(ctx.status(200), ctx.json(myList));
  }),
];
