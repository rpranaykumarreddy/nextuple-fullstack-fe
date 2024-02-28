export default function dateAsString(date){
    return new Date(date).toLocaleString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    )
};