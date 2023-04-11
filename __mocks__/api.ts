import { rest } from 'msw';

export const handlers = [
  rest.post('/sampleApi', async (req, res, ctx) => {
    const data = await req.json();

    return res(ctx.status(200), ctx.json({ result: data }));
  }),
];
