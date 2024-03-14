export default function dateAsString(date){
    console.log(date);
    return new Date(date).toLocaleString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    )
};
export function sortDate(a, b)  {
    return new Date(a).getTime() - new Date(b).getTime();
}