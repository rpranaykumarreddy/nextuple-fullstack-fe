import { getToken, getUser, getWallet } from "../../data/store";
import {
  checkUsernameAvailableResponse,
  confirmTransactionSuccessResponse,
  InitTransactionObject,
  cancelTransactionResponse,
  confirmTransactionTimeoutResponse,
  InitTransactionResponse,
  token,
  user,
  wallet,
  walletResponse,
} from "../../Utils/testData";
import TransactionTimeoutProgress from "../TransactionTimeoutProgress";

import { renderWithRedux } from "../../Utils/testHelper";
import TransactionTool from "../TransactionTool";
import { fireEvent, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  cancelTransactionAuthData,
  checkWalletAuthData,
  confirmTransactionAuthData,
  initTransactionAuthData,
} from "../../data/hook/useTransactions";
import React from "react";

jest.mock("../TransactionTimeoutProgress", () => ({
  __esModule: true,
  default: jest.fn(() => {
    return (
      <div data-testid="TransactionTimeoutProgress">
        TransactionTimeoutProgress
      </div>
    );
  }),
}));

const open = true;
const closeFn = jest.fn();

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));
jest.mock("../../data/store", () => ({
  showMessage: jest.fn(),
  getUser: jest.fn(),
  setWallet: jest.fn(),
  getWallet: jest.fn(),
  getToken: jest.fn(() => null),
}));

describe("TransactionTool & useTransactions fn()", () => {
  test("should render & success path", async () => {
    jest.setTimeout(10000);
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    getWallet.mockImplementation(() => wallet);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(checkUsernameAvailableResponse)
      .mockResolvedValueOnce(InitTransactionResponse)
      .mockResolvedValueOnce(confirmTransactionSuccessResponse);
    renderWithRedux(<TransactionTool open={open} onClose={closeFn} />);
    const toInput = screen.getByTestId("to-input").querySelector("input");
    expect(toInput).toBeInTheDocument();
    await userEvent.type(toInput, "pranay");
    await userEvent.tab();
    const amountInput = screen
      .getByTestId("amount-input")
      .querySelector("input");
    expect(amountInput).toBeInTheDocument();
    await userEvent.type(amountInput, "{backspace}");
    await userEvent.type(amountInput, "100");
    const field = screen.getByText("Initiate");
    expect(field).toBeInTheDocument();
    await userEvent.click(field);
    await waitFor(() => {
      screen.getByTestId("code-input");
    });
    const codeInput = screen.getByTestId("code-input").querySelector("input");
    expect(codeInput).toBeInTheDocument();
    await userEvent.type(codeInput, "123456");
    const confirmField = screen.getByText("Confirm");
    expect(confirmField).toBeInTheDocument();
    await userEvent.click(confirmField);

    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      checkWalletAuthData.link + "/pranay",
      expect.objectContaining({
        method: checkWalletAuthData.method,
        headers: {
          Authorization: "Bearer " + token.accessToken,
        },
      })
    );

    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      initTransactionAuthData.link,
      {
        method: initTransactionAuthData.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token.tokenType} ${token.accessToken}`,
        },
        body: JSON.stringify({ to: "pranay", amount: 100 }),
      }
    );

    expect(global.fetch).toHaveBeenNthCalledWith(
      3,
      confirmTransactionAuthData.link +
        "/" +
        InitTransactionObject.transactionId +
        "?code=123456",
      {
        method: confirmTransactionAuthData.method,
        headers: {
          Authorization: `${token.tokenType} ${token.accessToken}`,
        },
      }
    );
  });
  test("should render & success path for cancel", async () => {
    jest.setTimeout(15000);
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    getWallet.mockImplementation(() => wallet);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(checkUsernameAvailableResponse)
      .mockResolvedValueOnce(InitTransactionResponse)
      .mockResolvedValueOnce(cancelTransactionResponse);
    renderWithRedux(<TransactionTool open={open} onClose={closeFn} />);
    const toInput = screen.getByTestId("to-input").querySelector("input");
    expect(toInput).toBeInTheDocument();
    await userEvent.type(toInput, "pranay");
    await userEvent.tab();
    const amountInput = screen
      .getByTestId("amount-input")
      .querySelector("input");
    expect(amountInput).toBeInTheDocument();
    await userEvent.type(amountInput, "{backspace}");
    await userEvent.type(amountInput, "100");
    const field = screen.getByText("Initiate");
    expect(field).toBeInTheDocument();
    await userEvent.click(field);
    await waitFor(() => {
      screen.getByTestId("code-input");
    });
    const codeInput = screen.getByTestId("code-input").querySelector("input");
    expect(codeInput).toBeInTheDocument();
    await userEvent.type(codeInput, "123456");
    const confirmField = screen.getByText("Cancel");
    expect(confirmField).toBeInTheDocument();
    await userEvent.click(confirmField);

    expect(global.fetch).toHaveBeenNthCalledWith(
      3,
      cancelTransactionAuthData.link +
        "/" +
        InitTransactionObject.transactionId,
      {
        method: cancelTransactionAuthData.method,
        headers: {
          Authorization: `${token.tokenType} ${token.accessToken}`,
        },
      }
    );
  });
  test("should render & success path for close", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    getWallet.mockImplementation(() => wallet);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(checkUsernameAvailableResponse)
      .mockResolvedValueOnce(InitTransactionResponse)
      .mockResolvedValueOnce(cancelTransactionResponse);
    renderWithRedux(<TransactionTool open={open} onClose={closeFn} />);
    const field = screen.getByText("Close");
    expect(field).toBeInTheDocument();
    await userEvent.click(field);
    expect(closeFn).toHaveBeenCalledTimes(1);
  });
  test("should render & fail at check Wallet trim part", async () => {
    jest.setTimeout(10000);
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    getWallet.mockImplementation(() => wallet);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(checkUsernameAvailableResponse)
      .mockResolvedValueOnce(InitTransactionResponse)
      .mockResolvedValueOnce(confirmTransactionSuccessResponse);
    renderWithRedux(<TransactionTool open={open} onClose={closeFn} />);
    const toInput = screen.getByTestId("to-input").querySelector("input");
    expect(toInput).toBeInTheDocument();
    await userEvent.type(toInput, "  ");
    await userEvent.tab();
    await waitFor(() => {
      screen.getByText("Receiver's username cannot be empty");
    });
    expect(
      screen.getByText("Receiver's username cannot be empty")
    ).toBeInTheDocument();
  });
  test("should render & fail at check Wallet response not ok", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    getWallet.mockImplementation(() => wallet);
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: () => {
        return { message: "Error" };
      },
    });
    renderWithRedux(<TransactionTool open={open} onClose={closeFn} />);
    const toInput = screen.getByTestId("to-input").querySelector("input");
    expect(toInput).toBeInTheDocument();
    await userEvent.type(toInput, "pranay");
    await userEvent.tab();
    await waitFor(() => {
      screen.getByText("Error");
    });
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
  test("should render & fail at initTransaction user not found", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => null);
    getWallet.mockImplementation(() => wallet);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(checkUsernameAvailableResponse)
      .mockResolvedValueOnce(InitTransactionResponse);
    renderWithRedux(<TransactionTool open={open} onClose={closeFn} />);
    const toInput = screen.getByTestId("to-input").querySelector("input");
    expect(toInput).toBeInTheDocument();
    await userEvent.type(toInput, "pranay");
    await userEvent.tab();
    const amountInput = screen
      .getByTestId("amount-input")
      .querySelector("input");
    expect(amountInput).toBeInTheDocument();
    await userEvent.type(amountInput, "{backspace}");
    await userEvent.type(amountInput, "100");
    const field = screen.getByText("Initiate");
    expect(field).toBeInTheDocument();
    await userEvent.click(field);
    await waitFor(() => {
      screen.getByText("Not logged in");
    });
    const codeInput = screen.getByText("Not logged in");
    expect(codeInput).toBeInTheDocument();
  });
  test("should render & fail at initTransaction response not ok", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    getWallet.mockImplementation(() => wallet);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(checkUsernameAvailableResponse)
      .mockResolvedValueOnce({
        ok: false,
        json: () => {
          return { message: "Error" };
        },
      });
    renderWithRedux(<TransactionTool open={open} onClose={closeFn} />);
    const toInput = screen.getByTestId("to-input").querySelector("input");
    expect(toInput).toBeInTheDocument();
    await userEvent.type(toInput, "pranay");
    await userEvent.tab();
    const amountInput = screen
      .getByTestId("amount-input")
      .querySelector("input");
    expect(amountInput).toBeInTheDocument();
    await userEvent.type(amountInput, "{backspace}");
    await userEvent.type(amountInput, "100");
    const field = screen.getByText("Initiate");
    expect(field).toBeInTheDocument();
    await userEvent.click(field);
    await waitFor(() => {
      screen.getByText("Error");
    });
    const codeInput = screen.getByText("Error");
    expect(codeInput).toBeInTheDocument();
  });
  test("should render & fail at confirmTransaction response not ok", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    getWallet.mockImplementation(() => wallet);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(checkUsernameAvailableResponse)
      .mockResolvedValueOnce(InitTransactionResponse)
      .mockResolvedValueOnce({
        ok: false,
        json: () => {
          return { message: "Error" };
        },
      });
    renderWithRedux(<TransactionTool open={open} onClose={closeFn} />);
    const toInput = screen.getByTestId("to-input").querySelector("input");
    expect(toInput).toBeInTheDocument();
    await userEvent.type(toInput, "pranay");
    await userEvent.tab();
    const amountInput = screen
      .getByTestId("amount-input")
      .querySelector("input");
    expect(amountInput).toBeInTheDocument();
    await userEvent.type(amountInput, "{backspace}");
    await userEvent.type(amountInput, "100");
    const field = screen.getByText("Initiate");
    expect(field).toBeInTheDocument();
    await userEvent.click(field);
    await waitFor(() => {
      screen.getByTestId("code-input");
    });
    const codeInput = screen.getByTestId("code-input").querySelector("input");
    expect(codeInput).toBeInTheDocument();
    await userEvent.type(codeInput, "123456");
    const confirmField = screen.getByText("Confirm");
    expect(confirmField).toBeInTheDocument();
    await userEvent.click(confirmField);
    await waitFor(() => {
      screen.getByText("Error");
    });
    const codeInputError = screen.getByText("Error");
    expect(codeInputError).toBeInTheDocument();
  });
  test("should render & fail at confirmTransaction response not ok with TIMEOUT", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    getWallet.mockImplementation(() => wallet);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(checkUsernameAvailableResponse)
      .mockResolvedValueOnce(InitTransactionResponse)
      .mockResolvedValueOnce(confirmTransactionTimeoutResponse);
    renderWithRedux(<TransactionTool open={open} onClose={closeFn} />);
    const toInput = screen.getByTestId("to-input").querySelector("input");
    expect(toInput).toBeInTheDocument();
    await userEvent.type(toInput, "pranay");
    await userEvent.tab();
    const amountInput = screen
      .getByTestId("amount-input")
      .querySelector("input");
    expect(amountInput).toBeInTheDocument();
    await userEvent.type(amountInput, "{backspace}");
    await userEvent.type(amountInput, "100");
    const field = screen.getByText("Initiate");
    expect(field).toBeInTheDocument();
    await userEvent.click(field);
    await waitFor(() => {
      screen.getByTestId("code-input");
    });
    const codeInput = screen.getByTestId("code-input").querySelector("input");
    expect(codeInput).toBeInTheDocument();
    await userEvent.type(codeInput, "123456");
    const confirmField = screen.getByText("Confirm");
    expect(confirmField).toBeInTheDocument();
    await userEvent.click(confirmField);
  });
  test("should render & fail at automatic timeout", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    getWallet.mockImplementation(() => wallet);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(checkUsernameAvailableResponse)
      .mockResolvedValueOnce(InitTransactionResponse)
      .mockResolvedValueOnce(confirmTransactionTimeoutResponse);
    TransactionTimeoutProgress.mockImplementation(({ created, onTimeout }) => {
      return (
        <>
          {" "}
          <p data-testid="TransactionTimeoutProgress">{created}</p>
          <button onClick={onTimeout} data-testid="TimoeutButton">
            Timeout
          </button>
        </>
      );
    });
    renderWithRedux(<TransactionTool open={open} onClose={closeFn} />);
    const toInput = screen.getByTestId("to-input").querySelector("input");
    expect(toInput).toBeInTheDocument();
    await userEvent.type(toInput, "pranay");
    await userEvent.tab();
    const amountInput = screen
      .getByTestId("amount-input")
      .querySelector("input");
    expect(amountInput).toBeInTheDocument();
    await userEvent.type(amountInput, "{backspace}");
    await userEvent.type(amountInput, "100");
    const field = screen.getByText("Initiate");
    expect(field).toBeInTheDocument();
    await userEvent.click(field);
    await waitFor(() => {
      screen.getByTestId("code-input");
    });
    const codeInput = screen.getByTestId("code-input").querySelector("input");
    expect(codeInput).toBeInTheDocument();
    const TimeoutField = screen.getByTestId("TimoeutButton");
    expect(TimeoutField).toBeInTheDocument();
    await userEvent.click(TimeoutField);

    expect(global.fetch).toHaveBeenNthCalledWith(
      3,
      cancelTransactionAuthData.link +
        "/" +
        InitTransactionObject.transactionId,
      {
        method: cancelTransactionAuthData.method,
        headers: {
          Authorization: `${token.tokenType} ${token.accessToken}`,
        },
      }
    );
  });
  test("should render & fail at cancelTransaction response not ok", async () => {
    getToken.mockImplementation(() => token);
    getUser.mockImplementation(() => user);
    getWallet.mockImplementation(() => wallet);
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(checkUsernameAvailableResponse)
      .mockResolvedValueOnce(InitTransactionResponse)
      .mockResolvedValueOnce({
        ok: false,
        json: () => {
          return { message: "Error" };
        },
      });
    renderWithRedux(<TransactionTool open={open} onClose={closeFn} />);
    const toInput = screen.getByTestId("to-input").querySelector("input");
    expect(toInput).toBeInTheDocument();
    await userEvent.type(toInput, "pranay");
    await userEvent.tab();
    const amountInput = screen
      .getByTestId("amount-input")
      .querySelector("input");
    expect(amountInput).toBeInTheDocument();
    await userEvent.type(amountInput, "{backspace}");
    await userEvent.type(amountInput, "100");
    const field = screen.getByText("Initiate");
    expect(field).toBeInTheDocument();
    await userEvent.click(field);
    await waitFor(() => {
      screen.getByTestId("code-input");
    });
    const codeInput = screen.getByTestId("code-input").querySelector("input");
    expect(codeInput).toBeInTheDocument();
    await userEvent.type(codeInput, "123456");
    const confirmField = screen.getByText("Cancel");
    expect(confirmField).toBeInTheDocument();
    await userEvent.click(confirmField);
    await waitFor(() => {
      screen.getByText("Error");
    });
    const codeInputError = screen.getByText("Error");
    expect(codeInputError).toBeInTheDocument();
  });
});
