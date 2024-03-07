import {cashbackData} from "../../Utils/testData";
import {renderWithRedux} from "../../Utils/testHelper";
import CashbackProcessor from "../CashbackProcessor";
import { screen} from "@testing-library/react";

describe("Cashback Processor", () => {
    test("should render & success path", async () => {
        renderWithRedux(<CashbackProcessor data={cashbackData} isLoading={false} />);
        const amount = screen.getByText("₹1,202.00");
        expect(amount).toBeInTheDocument();
        const cashback = screen.getByText("₹11.00");
        expect(cashback).toBeInTheDocument();
    });
    test("should render & loading path", async () => {
        renderWithRedux(<CashbackProcessor data={null} isLoading={true} />);
        const loading = screen.getByText("Loading...");
        expect(loading).toBeInTheDocument();
    });
    test("should render & no data path", async () => {
        renderWithRedux(<CashbackProcessor data={{...cashbackData, recharges:[]}} isLoading={false} />);
        const noData = screen.getByText("No Cashback in this period");
    });
});