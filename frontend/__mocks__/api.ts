import { rest } from 'msw';
import { Users } from './dummy/users';
import { questions } from './dummy/questions';
import { TAGS } from './dummy/tags';

export const handlers = [
  rest.get('/users', (req, res, ctx) => {
    const url = new URL(req.url);
    const size = Number(url.searchParams.get('size'));
    const page = Number(url.searchParams.get('page'));
    const total = Users.length;
    const data = Users.slice((page - 1) * size, page * size);
    return res(ctx.status(200), ctx.json({ data, total }));
  }),

  rest.get('/questions', async (req, res, ctx) => {
    const size = req.url.searchParams.get('perPage') || 10;
    const page = req.url.searchParams.get('page') || 1;
    const filter = req.url.searchParams.get('filter') || 'newest';
    return res(
      ctx.status(200),
      ctx.json(questions(Number(page), Number(size)))
    );
  }),

  rest.get('/tags', (req, res, ctx) => {
    const url = new URL(req.url);
    const size = Number(url.searchParams.get('size'));
    const page = Number(url.searchParams.get('page'));
    const total = TAGS.length;
    const data = TAGS.slice((page - 1) * size, page * size);
    return res(ctx.status(200), ctx.json({ data, total }));
  }),
];
