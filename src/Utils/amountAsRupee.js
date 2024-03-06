export default function amountAsRupee(amount, decimals = 2){
    return amount.toLocaleString('en-IN', {
        maximumFractionDigits: decimals,
        style: 'currency',
        currency: 'INR'
    });
}