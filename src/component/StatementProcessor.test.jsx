
import {statementData} from "../Utils/testData";
import StatementProcessor from "./StatementProcessor";
import {renderWithRedux} from "../Utils/testHelper";
import { screen} from "@testing-library/react";
import React from "react";
describe("Statement Processor", () => {
    test("should render & success path", async () => {
        renderWithRedux(<StatementProcessor data={statementData} isLoading={false} />);
        const lastUpdated = screen.getByText("last Updated: 2 Mar 2024");
        expect(lastUpdated).toBeInTheDocument();
        const walletBalance = screen.getByText("Wallet Balance: 342941.30000000075");
        expect(walletBalance).toBeInTheDocument();
        const walletUpdated = screen.getByText("Wallet last updated: 1 Mar 2024");
        expect(walletUpdated).toBeInTheDocument();
    });
    test("should render & loading path", async () => {
        renderWithRedux(<StatementProcessor data={null} isLoading={true} />);
        const loading = screen.getByText("Loading...");
        expect(loading).toBeInTheDocument();
    });
    test("should render & no data path", async () => {
        renderWithRedux(<StatementProcessor data={null} isLoading={false} />);
        const noData = screen.getByText("No statement data exist");
        expect(noData).toBeInTheDocument();
    });
});
