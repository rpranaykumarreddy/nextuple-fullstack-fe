import amountAsRupee from "../amountAsRupee";

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
});