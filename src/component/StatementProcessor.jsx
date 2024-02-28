
import React, {useEffect, useState} from "react";
import dateAsString from "../Utils/dateAsString";
import StatementCard from "./StatementCard";

export default function StatementProcessor({data,isLoading, ...props}) {
    const [totalData, setTotalData] = useState([]);
    useEffect(() => {
        if(data===undefined || data==null) return;
        const totalData = [...data.credits, ...data.debits, ...data.recharges];
        totalData.sort((a,b) => new Date(b.created) - new Date(a.created));
        setTotalData(totalData);
    },[data]);

    if(isLoading) return <p>Loading...</p>;
    if(data===undefined || data==null) return <p>No statement data exist</p>;

    return (
        <>
            <p>last Updated: {dateAsString(data.responseTime)}</p>
            <p>Wallet Balance: {data.wallet.balance}</p>
            <p>Wallet last updated: {dateAsString(data.wallet.updated)}</p>
            <div style={{display:"flex", flexDirection:"row", alignItems:"space-evenly", flexWrap:"wrap", justifyContent:"center", padding:"20px 20px"}}>
            {totalData.map((item) => {
                return <StatementCard key={item.id} data={item}/>
            })}
            </div>
        </>
    )
}
