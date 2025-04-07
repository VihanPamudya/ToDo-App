beforeAll(async () => {
    console.log('Setting up tests...');
});

afterAll(async () => {
    console.log('Cleaning up after tests...');
});

describe('Global Setup Tests', () => {
    it('should run setup and teardown correctly', () => {
        expect(true).toBe(true);
    });
});
