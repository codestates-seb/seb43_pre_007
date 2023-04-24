import { rest } from 'msw';
import { signupusers } from './dummy';
import { Users } from './dummy/users';
import { questions } from './dummy/questions';

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
    const userssign = signupusers.push(data);
    return res(ctx.status(200), ctx.json({ userssign }));
  }),
  rest.get('/users', async (req, res, ctx) => {
    const url = new URL(req.url);
    const size = Number(url.searchParams.get('size'));
    const page = Number(url.searchParams.get('page'));
    const total = Users.length;
    const data = Users.slice((page - 1) * size, page * size);
  rest.get('/users', (req, res, ctx) => {
    const size = Number(req.url.searchParams.get('size'));
    const page = Number(req.url.searchParams.get('page'));
    const total = USERS.length;
    const data = USERS.slice((page - 1) * size, page * size);
  
    return res(ctx.status(200), ctx.json({ data, total }));
  }),
  //이미지 임시 테스트
  rest.post('/img', (req, res, ctx) => {
    const data =
      'https://www.gravatar.com/avatar/0555bd0deb416a320a0069abef08078a?s=256&d=identicon&r=PG&f=1';
    return res(ctx.status(200), ctx.json(data));
  }),

  rest.get('/questions', async (req, res, ctx) => {
    const size = req.url.searchParams.get('perPage') || 10;
    const page = req.url.searchParams.get('page') || 1;
    const filter = req.url.searchParams.get('filter') || 'newest';

    console.log(size, page);

    return res(
      ctx.status(200),
      ctx.json(questions(Number(page), Number(size)))
    );
  }),
];
