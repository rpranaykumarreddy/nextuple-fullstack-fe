import { renderWithRouter } from "../../Utils/testHelper";
import { screen, waitFor, act } from "@testing-library/react";
import TransactionTimeoutProgress from "../TransactionTimeoutProgress";
import { InitTransactionObject } from "../../Utils/testData";

jest.useFakeTimers();
describe("TransactionTimeoutProgress", () => {
  test("Should render & logout", () => {
    const oneMinute = Date.now() + 60000;
    const time = new Date(oneMinute).toISOString();
    const mockTimeout = jest.fn();
    renderWithRouter(
      <TransactionTimeoutProgress expire={time} onTimeout={mockTimeout} />
    );
    // jest.runAllTimers();
    act(() => {
      jest.advanceTimersByTime(60000);
    });
    expect(mockTimeout).toHaveBeenCalledTimes(1);
  });
});
