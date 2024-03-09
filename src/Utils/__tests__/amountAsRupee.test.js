import amountAsRupee, {sortAmount} from "../amountAsRupee";

describe('amountAsRupee', () => {
    test('should return ₹0.00 for 0', () => {
        expect(amountAsRupee(0)).toBe('₹0.00');
    })
    test('should return ₹1.00 for 1', () => {
        expect(amountAsRupee(1)).toBe('₹1.00');
    })
    test('should return ₹1,00,00,00,000.67 for 1000000000.66666666', () => {
        expect(amountAsRupee(1000000000.66666666)).toBe('₹1,00,00,00,000.67');
    })
    test('should sort ₹10,000.00 and ₹10.00', () => {
        let a = '₹10,000.00';
        let b = '₹10.00';
        expect(sortAmount(a, b)).toBeGreaterThan(0);
    });
    test('should sort', () => {
        const a9999 = '₹9,999';
        const a999 = '₹999.9';
        const a99 = '₹99.99';
        const a9 = '₹9.999';
        const a0 = '₹0.9999';
        expect([a9999, a999, a99, a9, a0].sort(sortAmount)).toEqual([a0, a9, a99, a999, a9999]);
    });
});