
import {statementData} from "../../Utils/testData";
import StatementProcessor from "../StatementProcessor";
import {renderWithRedux} from "../../Utils/testHelper";
import { screen} from "@testing-library/react";
import React from "react";
describe("Statement Processor", () => {
    test("should render & success path", async () => {
        renderWithRedux(<StatementProcessor data={statementData} isLoading={false} />);
    });
    test("should render & loading path", async () => {
        renderWithRedux(<StatementProcessor data={null} isLoading={true} />);
        const loading = screen.getByText("Loading...");
        expect(loading).toBeInTheDocument();
    });
    test("should render & no data path", async () => {
        renderWithRedux(<StatementProcessor data={{...statementData, credits:[], debits: [], recharges:[]}} isLoading={false} />);
        const noData = screen.getByText("No Transactions in this period");
    });
});
