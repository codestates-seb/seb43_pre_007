import '@testing-library/jest-dom/extend-expect';

const { server } = require('./__mocks__/server');

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));
