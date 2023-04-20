import { addCommaToNumber } from './addCommaToNum';

describe('addCommaToNumber 함수 체크', () => {
  test('1000 => 1,000', () => {
    expect(addCommaToNumber(1000)).toEqual('1,000');
  });

  test('100 => 100', () => {
    expect(addCommaToNumber(100)).toEqual('100');
  });

  test('1000000 => 1,000,000', () => {
    expect(addCommaToNumber(1000000)).toEqual('1,000,000');
  });

  test('123456678919 => 123,456,678,919', () => {
    expect(addCommaToNumber(123456678919)).toEqual('123,456,678,919');
  });

  test('-1 => -1', () => {
    expect(addCommaToNumber(-1)).toEqual('-1');
  });

  test('-1000 => -1,000', () => {
    expect(addCommaToNumber(-1000)).toEqual('-1,000');
  });

  test('-1234512343 => -1,234,512,343', () => {
    expect(addCommaToNumber(-1234512343)).toEqual('-1,234,512,343');
  });

  test('0 => 0', () => {
    expect(addCommaToNumber(0)).toEqual('0');
  });

  test('-0 => 0', () => {
    expect(addCommaToNumber(-0)).toEqual('0');
  });
});
