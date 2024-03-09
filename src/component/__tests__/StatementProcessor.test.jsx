
import {statementData} from "../../Utils/testData";
import StatementProcessor from "../StatementProcessor";
import {renderWithRedux} from "../../Utils/testHelper";
import {fireEvent, screen, waitFor} from "@testing-library/react";
import React from "react";
describe("Statement Processor", () => {
    test("should render & success path", async () => {
        renderWithRedux(<StatementProcessor data={statementData} isLoading={false} />);
        await waitFor(() => {
            screen.getAllByRole('columnheader');
        });
        const amountHeader = screen.getAllByRole('columnheader')[2];
        expect(amountHeader).toBeInTheDocument();
        expect(amountHeader).toHaveAttribute("aria-sort", "none");
        fireEvent.click(amountHeader);
        expect(amountHeader).toHaveAttribute("aria-sort", "ascending");
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
