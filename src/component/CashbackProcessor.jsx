import React, {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import amountAsRupee from "../Utils/amountAsRupee";
import dateTimeAsString from "../Utils/dateTimeAsString";
import {Card} from "@mui/material";

export default function CashbackProcessor({data, isLoading}) {
    const [totalData, setTotalData] = useState([]);
    useEffect(() => {
        if (data === undefined || data == null) return;
        const totalData = data.recharges;
        totalData.sort((a, b) => new Date(b.created) - new Date(a.created));
        setTotalData(totalData);
    }, [data]);

    if (isLoading) return <p>Loading...</p>;
    if (data === undefined || data == null) return null;
    console.log("statement data", data);

    const columns = [
        {field: 'cashback', headerName: 'Cashback', flex: 1},
        {field: 'amount', headerName: 'Amount', flex: 1},
        {field: 'createdAt', headerName: 'DateTime', flex: 1},];

    const rows = totalData.map((transaction) => {
        return {
            id: transaction.id,
            cashback: amountAsRupee(transaction.cashback),
            amount: amountAsRupee(transaction.amount),
            createdAt: dateTimeAsString(transaction.created)
        }
    });
    return (<>
        {totalData.length === 0 ? <p>No Cashback in this period</p>
            : <Card sx={{
                width: '95vw',
                padding: 1,
                margin: "auto",
                display: 'flex',
                flexDirection: 'row',
                height: 'fit-content',
                alignContent: 'center',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                '@media (max-width: 900px)': {
                    flexWrap: 'wrap'
                },
            }}>
                <div style={{width: '100%'}}>
                    <DataGrid
                        sx={{
                            margin: 1, borderRadius: 1,
                        }}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 10},
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </div>
            </Card>}
    </>)
}
