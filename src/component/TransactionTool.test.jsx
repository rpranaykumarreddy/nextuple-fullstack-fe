import {getToken, getUser, getWallet} from "../data/store";
import {
    checkUsernameAvailableResponse,
    confirmTransactionSuccessResponse,
    InitTransactionResponse,
    token,
    user, wallet,
    walletResponse
} from "../Utils/testData";
import {renderWithRedux} from "../Utils/testHelper";
import TransactionTool from "./TransactionTool";
import {fireEvent, screen, act, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {checkWalletAuthData, confirmTransactionAuthData, initTransactionAuthData} from "../data/hook/useTransactions";

const open = true;
const closeFn = jest.fn();

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));
jest.mock("../data/store", () => ({
    showMessage: jest.fn(),
    getUser: jest.fn(),
    setWallet: jest.fn(),
    getWallet: jest.fn(),
    getToken: jest.fn(() => null),
}));

describe("TransactionTool & useTransactions fn()", () => {
    test("should render & success path", async () => {
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        getWallet.mockImplementation(() => wallet);
        global.fetch = jest.fn()
            .mockResolvedValueOnce(checkUsernameAvailableResponse)
            .mockResolvedValueOnce(InitTransactionResponse)
            .mockResolvedValueOnce(confirmTransactionSuccessResponse);
        const userevent = userEvent;
        renderWithRedux(<TransactionTool open={open} onClose={closeFn}/>);
        const toInput = screen.getByTestId("to-input").querySelector("input");
        expect(toInput).toBeInTheDocument();
            await userevent.type(toInput, "pranay");
            await userevent.tab();
        const amountInput = screen.getByTestId("amount-input").querySelector("input");
        expect(amountInput).toBeInTheDocument();
            await userevent.type(amountInput, "{backspace}");
            await userevent.type(amountInput, "100");
        const field = screen.getByText("Initiate");
        expect(field).toBeInTheDocument();
            await userevent.click(field);

        expect(global.fetch).toHaveBeenNthCalledWith(1,
            checkWalletAuthData.link + "/pranay",
            expect.objectContaining({
                method: checkWalletAuthData.method,
                headers: {
                    "Authorization": "Bearer " + token.accessToken
                }
            }),
        );

        expect(global.fetch).toHaveBeenNthCalledWith(2, initTransactionAuthData.link, {
            method: initTransactionAuthData.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token.tokenType} ${token.accessToken}`
            },
            body: JSON.stringify({to: "pranay", amount: "100"}),
        });

        // expect(await screen.findByText('code-input')).toBeInTheDocument();
        // const codeInput = screen.getByTestId("code-input").querySelector("input");
        // expect(codeInput).toBeInTheDocument();
        // const confirmField = screen.getByText("Confirm");
        // expect(confirmField).toBeInTheDocument();
        // fireEvent.click(confirmField);
        // expect(global.fetch).toHaveBeenNthCalledWith(3,
        //     confirmTransactionAuthData.link+ "/"+ InitTransactionResponse.transactionId, {
        //     method: confirmTransactionAuthData.method,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `${token.tokenType} ${token.accessToken}`
        //     },
        //     body: JSON.stringify({transactionId: "65df744b331f367c7dc950a5", code: "123456"}),
        // });
    });
});