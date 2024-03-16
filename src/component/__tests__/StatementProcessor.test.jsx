import { statementData } from "../../Utils/testData";
import StatementProcessor from "../StatementProcessor";
import { renderWithRedux } from "../../Utils/testHelper";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
describe("Statement Processor", () => {
  test("should render & success path", async () => {
    renderWithRedux(
      <StatementProcessor data={statementData} isLoading={false} />
    );
    await waitFor(() => {
      screen.getAllByRole("columnheader");
    });
    const amountHeader = screen.getAllByRole("columnheader")[2];
    expect(amountHeader).toBeInTheDocument();
  });
  test("should render & loading path", async () => {
    renderWithRedux(
      <StatementProcessor data={statementData} isLoading={true} />
    );
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });
  test("should render & no data path", async () => {
    renderWithRedux(
      <StatementProcessor
        data={{ ...statementData, statements: [] }}
        isLoading={false}
      />
    );
    const noData = screen.getByText("No Transactions");
    expect(noData).toBeInTheDocument();
  });
});
