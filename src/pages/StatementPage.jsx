import React, {useEffect} from "react";
import {useGetStatement} from "../data/serverHooks";
import {
    Alert,
    Autocomplete,
    Avatar,
    Button, ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Stack,
    TextField
} from "@mui/material";
import StatementProcessor from "../component/StatementProcessor";
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from "@mui/material/IconButton";

export default function StatementPage() {
    const [data, setData, error, isLoading, getStatement, response] = useGetStatement();
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
    }
    const handleMonthChange = (event, selectedOption) => {
        setData({...data, month: Number(selectedOption.value)});
    }
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
                    <h1>Statement</h1>
                    <Stack flexWrap="wrap"
                           justifyContent="center"
                           alignItems="center"
                           margin="15px 0px"
                           direction={{xs: 'column', sm: 'row'}}
                           spacing={{xs: 2, sm: 3, md: 4}}>
                        <div>
                            <Autocomplete
                                value={monthValues.find(item => item.value === data.month)}
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
                                renderInput={(params) => <TextField {...params} label="Year"/>}
                            />
                        </div>
                    </Stack>
                    <div>
                        <Button variant="contained" onClick={getStatement} data-testid="refresh"
                                disabled={isLoading}>
                            Get Statement
                        </Button>
                    </div>
                </CardContent>
            </Card>
            {error && <Alert severity="error">{error}</Alert>}
            <br/>
            <StatementProcessor data={response} isLoading={isLoading}/>
        </main>
    );
}