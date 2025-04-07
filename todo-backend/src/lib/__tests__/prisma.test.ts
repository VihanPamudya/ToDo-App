import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';

describe('prisma.ts', () => {
    const ORIGINAL_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...ORIGINAL_ENV };
    });

    afterEach(() => {
        process.env = ORIGINAL_ENV;
    });

    it('should throw an error if no DATABASE_URL or TEST_DATABASE_URL is set', () => {
        delete process.env.DATABASE_URL;
        delete process.env.TEST_DATABASE_URL;
        process.env.NODE_ENV = 'production';

        expect(() => {
            require('../prisma');
        }).toThrowError('Missing database URL');
    });

    it('should not throw if DATABASE_URL is set', () => {
        process.env.DATABASE_URL = 'mysql://root:root@localhost:3306/todo';
        expect(() => {
            require('../prisma');
        }).not.toThrow();
    });

    it('should use TEST_DATABASE_URL in test mode', () => {
        process.env.NODE_ENV = 'test';
        process.env.TEST_DATABASE_URL = 'mysql://todo_test_user:todo_test_password@localhost:3306/todo_app_test';

        expect(() => {
            require('../prisma');
        }).not.toThrow();
    });
});
