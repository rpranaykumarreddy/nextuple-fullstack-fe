import dateAsString, {sortDate} from '../dateAsString';

describe('dateAsString function', () => {
    test('formats date correctly', () => {
        const date1 = new Date('2023-01-01T00:00:00.000Z');
        expect(dateAsString(date1)).toBe('1 Jan 2023');
        const date2 = new Date('2024-12-25T00:00:00.000Z');
        expect(dateAsString(date2)).toBe('25 Dec 2024');
    });
    test('sortDate function for 2 dates', () => {
        const date1 = dateAsString('2024-03-02T17:14:15.83');
        const date2 = dateAsString('2024-03-01T17:14:15.83');
        console.log(date1, date2, sortDate(date1, date2));
        expect(sortDate(date1, date2)).toBeGreaterThan(0);
    });
    test('sortDate function', () => {
        const March1 = dateAsString('2023-03-01T00:00:00.000Z');
        const March2 = dateAsString('2023-03-02T00:00:00.000Z');
        const March20 = dateAsString('2023-03-20T00:00:00.000Z');
        const March15 = dateAsString('2023-03-15T00:00:00.000Z');
        expect([March2, March20, March15, March1].sort(sortDate)).toEqual([March1, March2, March15, March20]);
    })
});
