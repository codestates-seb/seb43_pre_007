import { objToQuery } from './objectToQuery';

describe('objToQuery 함수 체크', () => {
  test(`{ a: 1, b: '2' } => '?a=1&b=2'`, () => {
    const obj = { a: 1, b: '2' };
    expect(objToQuery(obj)).toEqual('?a=1&b=2');
  });

  test(`{ page: 30, perPage: 300 } => '?a=1&b=2'`, () => {
    const obj = { page: 30, perPage: '300' };
    expect(objToQuery(obj)).toEqual('?page=30&perPage=300');
  });

  test(`{ page: 30, perPage: ['300', 10] } => '?page=30&perPage=300,10'`, () => {
    const obj = { page: 30, perPage: ['300', 10] };
    expect(objToQuery(obj)).toEqual('?page=30&perPage=300,10');
  });

  test(`{ page: firstPage, perPage: 10 } => '?page=30&perPage=300,10'`, () => {
    const obj = { page: 'firstPage', perPage: 10 };
    expect(objToQuery(obj)).toEqual('?page=firstPage&perPage=10');
  });
});
