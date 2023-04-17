import { dateFull, parseDate } from './date';

let sypMock: jest.SpyInstance;

beforeEach(() => {
  const DateReal = global.Date;
  const mockDate = new Date('2023-04-11T17:19:50');

  sypMock = jest.spyOn(global, 'Date').mockImplementation((date) => {
    if (!date) return mockDate;
    else return new DateReal(date);
  });
});

afterEach(() => {
  sypMock.mockRestore();
});

describe('dateFull', () => {
  test('밀리초 없는 경우', () => {
    const result = dateFull('2023-04-01T17:19:50');
    expect(result).toEqual('Apr 1, 2023 at 17:19');
  });

  test('밀리초 있는 경우', () => {
    const result = dateFull('2023-12-11T17:19:50.26007');
    expect(result).toEqual('Dec 11, 2023 at 17:19');
  });
});

describe('parseDate', () => {
  test('simple format, 1년 차이날 경우', () => {
    expect(parseDate('2022-03-11T17:19:50.26007')).toEqual('1 year ago');
  });

  test('simple format, 1년이상 차이날 경우', () => {
    expect(parseDate('2021-03-11T17:19:50.26007')).toEqual('2 years ago');
  });

  test('simple format, 1달 차이날 경우', () => {
    expect(parseDate('2023-03-11T17:19:50.26007')).toEqual('1 month ago');
  });

  test('simple format, 2달 이상 차이날 경우', () => {
    expect(parseDate('2023-01-11T17:19:50.26007')).toEqual('2 months ago');
  });

  test('simple format, 2일 이상 차이날 경우', () => {
    expect(parseDate('2023-04-05T10:20:30Z')).toEqual('5 days ago');
  });

  test('simple format, 1일 차이날 경우', () => {
    expect(parseDate('2023-04-10T17:19:50')).toEqual('yesterday');
  });

  test('simple format, 1년이상 차이날 경우', () => {
    expect(parseDate('2022-03-11T17:19:50.26007', true)).toEqual(
      'Mar 11, 2022 at 17:19'
    );
  });

  test('simple format, 1일 차이날 경우', () => {
    expect(parseDate('2023-04-10T17:19:50', true)).toEqual('yesterday');
  });

  test('simple format, 1일 이하 차이날 경우', () => {
    expect(parseDate('2023-04-11T10:19:50', true)).toEqual('today');
  });
});
