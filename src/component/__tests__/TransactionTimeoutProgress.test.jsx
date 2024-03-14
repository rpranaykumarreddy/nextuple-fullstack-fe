import { renderWithRouter } from "../../Utils/testHelper";
import { screen, waitFor, act } from "@testing-library/react";
import TransactionTimeoutProgress from "../TransactionTimeoutProgress";
import { InitTransactionObject } from "../../Utils/testData";

jest.useFakeTimers();
describe("TransactionTimeoutProgress", () => {
  test("Should render & logout", () => {
    const time = new Date().toISOString();
    const mockTimeout = jest.fn();
    renderWithRouter(
      <TransactionTimeoutProgress created={time} onTimeout={mockTimeout} />
    );
    // jest.runAllTimers();
    act(() => {
      jest.advanceTimersByTime(60000);
    });
    expect(mockTimeout).toHaveBeenCalledTimes(1);
  });
});
