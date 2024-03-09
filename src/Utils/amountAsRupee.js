export default function amountAsRupee(amount, decimals = 2){
    return amount.toLocaleString('en-IN', {
        maximumFractionDigits: decimals,
        style: 'currency',
        currency: 'INR'
    });
}
export function sortAmount(a, b)  {
    let a1 = Number(a.replaceAll(",", "").replace("₹", ""));
    let b1 = Number(b.replaceAll(",", "").replace("₹", ""));
    return a1 - b1;
}