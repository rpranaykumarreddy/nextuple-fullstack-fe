import React, {useEffect} from "react";
import {useGetCashback} from "../data/serverHooks";
import {
    Alert,
    Autocomplete,
    Button,
    Card,
    CardContent,
    Stack,
    TextField
} from "@mui/material";
import CashbackProcessor from "../component/CashbackProcessor";

export default function CashbackPage() {
    const [error, isLoading, getCashback, response] = useGetCashback();
    const [data, setData] = React.useState({month: new Date().getMonth()+1, year: new Date().getFullYear()});
    const monthValues = [
        {label: "January", value: 1},
        {label: "February", value: 2},
        {label: "March", value: 3},
        {label: "April", value: 4},
        {label: "May", value: 5},
        {label: "June", value: 6},
        {label: "July", value: 7},
        {label: "August", value: 8},
        {label: "September", value: 9},
        {label: "October", value: 10},
        {label: "November", value: 11},
        {label: "December", value: 12},
    ];
    const yearOptions = [];
    const currentYear = new Date().getFullYear();
    //Need to change to 2024. 2023 only for testing & demonstration
    for (let year = 2023; year <= currentYear; year++) {
        yearOptions.push(String(year));
    }
    const handleYearChange = (event, selectedOption) => {
        setData({...data, year: Number(selectedOption)});
        if(!isLoading)
            getCashback(data.month, Number(selectedOption));
    }
    const handleMonthChange = (event, selectedOption) => {
        setData({...data, month: selectedOption ? Number(selectedOption.value) : null});
        if(!isLoading)
            getCashback(Number(selectedOption.value), data.year);
    }
    useEffect(() => {
        getCashback();
    }, []);
    return (
        <main>
            <Card sx={{
                width: "max-content",
                maxWidth: "90vw",
                flexGrow: 1,
                flexBasis: 0,
                margin: "10px auto 20px",
                padding: '5px',
                textAlign: "center"
            }}>
                <CardContent>
                    <h1>Cashbacks</h1>
                    <Stack flexWrap="wrap"
                           justifyContent="center"
                           alignItems="center"
                           margin="15px 0px"
                           direction={{xs: 'column', sm: 'row'}}
                           spacing={{xs: 2, sm: 3, md: 4}}>
                        <div>
                            <Autocomplete
                                value={monthValues.find(item => item.value === data.month) || null}
                                onChange={handleMonthChange}
                                getOptionLabel={(monthValues) => monthValues.label}
                                options={monthValues}
                                sx={{width: 200}}
                                disableClearable={true}
                                data-testid="month-input"
                                renderInput={(params) => <TextField {...params} label="Month"/>}
                            />
                        </div>
                        <div>
                            <Autocomplete
                                value={String(data.year)}
                                onChange={handleYearChange}
                                getOptionLabel={(yearOptions) => String(yearOptions)}
                                options={yearOptions}
                                sx={{width: 200}}
                                disableClearable={true}
                                data-testid="year-input"
                                renderInput={(params) => <TextField  {...params} label="Year"/>}
                            />
                        </div>
                    </Stack>
                </CardContent>
            </Card>
            {error && <Alert severity="error">{error}</Alert>}
            <br/>
            <CashbackProcessor data={response} isLoading={isLoading}/>
        </main>
    );
}