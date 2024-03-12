import { Repository } from 'typeorm';

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
}));

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
};