import dateTimeAsString from './dateTimeAsString';

describe('dateTimeAsString function', () => {
    test('formats date and time correctly', () => {
        // Test with a specific date and time
        const date1 = new Date('2023-01-01T12:30:00.000Z');
        expect(dateTimeAsString(date1)).toBe('1 Jan 2023, 06:00 pm');

        // Test with another date and time
        const date2 = new Date('2024-12-25T18:45:00.000Z');
        expect(dateTimeAsString(date2)).toBe('26 Dec 2024, 12:15 am');
    });
});
