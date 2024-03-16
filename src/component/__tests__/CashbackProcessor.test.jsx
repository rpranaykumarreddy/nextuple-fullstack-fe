import { cashbackData } from "../../Utils/testData";
import { renderWithRedux } from "../../Utils/testHelper";
import CashbackProcessor from "../CashbackProcessor";
import { screen, waitFor } from "@testing-library/react";

describe("Cashback Processor", () => {
  test("should render & success path", async () => {
    renderWithRedux(
      <CashbackProcessor data={cashbackData} isLoading={false} />
    );
    const amount = screen.getByText("₹1,00,000.00");
    expect(amount).toBeInTheDocument();
    const cashback = screen.getByText("₹34");
    expect(cashback).toBeInTheDocument();
  });
  test("should render & loading path", async () => {
    renderWithRedux(<CashbackProcessor data={cashbackData} isLoading={true} />);
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });
  test("should render & no data path", async () => {
    renderWithRedux(
      <CashbackProcessor
        data={{ ...cashbackData, recharges: [] }}
        isLoading={false}
      />
    );
    const noData = screen.getByText("No Cashbacks");
    expect(noData).toBeInTheDocument();
  });
});
