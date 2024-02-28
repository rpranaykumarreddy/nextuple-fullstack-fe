import dateAsString from './dateAsString';

describe('dateAsString function', () => {
    test('formats date correctly', () => {
        // Test with a specific date
        const date1 = new Date('2023-01-01T00:00:00.000Z');
        expect(dateAsString(date1)).toBe('1 Jan 2023');

        // Test with another date
        const date2 = new Date('2024-12-25T00:00:00.000Z');
        expect(dateAsString(date2)).toBe('25 Dec 2024');
    });
});
