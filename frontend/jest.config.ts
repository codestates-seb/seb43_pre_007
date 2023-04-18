import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(css|less)$': 'jest-transform-css',
  },
};

const setJsetConfig = async () => ({
  ...(await createJestConfig(customJestConfig)()),
});

export default setJsetConfig;
