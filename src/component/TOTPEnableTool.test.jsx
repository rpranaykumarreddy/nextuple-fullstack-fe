import userEvent from "@testing-library/user-event";
import {renderWithRedux} from "../Utils/testHelper";
import TOTPEnableTool from "./TOTPEnableTool";
import {act, fireEvent, screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react";
import {getToken, getUser, getWallet} from "../data/store";
import {QrCodeConfirmResponse, QrCodeResponse, token, user, wallet} from "../Utils/testData";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

jest.mock("../data/store", () => ({
    showMessage: jest.fn(),
    enableTOTP: jest.fn(),
    getToken: jest.fn(() => null),
    getUser: jest.fn(() => null),
    getWallet: jest.fn(() => null),
}));

beforeEach(() => {
    jest.clearAllMocks();
});
describe("TOTPEnableTool & useTOTPEnable fn()", () => {
    test("should render & success path", async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce(QrCodeResponse)
            .mockResolvedValueOnce(QrCodeConfirmResponse);
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        getWallet.mockImplementation(() => wallet);
        renderWithRedux(<TOTPEnableTool/>);
        const field = screen.getByText("Enable TOTP");
        expect(field).toBeInTheDocument();
        await userEvent.click(field);
        await waitFor(() => {
            screen.getByTestId("totp-input")
        })
        const fieldTOTP = screen.getByTestId("totp-input").querySelector("input");
        expect(fieldTOTP).toBeInTheDocument();
        act(() => {
            fireEvent.change(fieldTOTP, {target: {value: "123456"}});
        });
        const fieldConfirm = screen.getByText("Confirm");
        expect(fieldConfirm).toBeInTheDocument();
        fireEvent.click(fieldConfirm);
    });
    test("should render & error of user not logged in", async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce(QrCodeResponse)
            .mockResolvedValueOnce(QrCodeConfirmResponse);
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => null);
        getWallet.mockImplementation(() => wallet);
        renderWithRedux(<TOTPEnableTool/>);
        const field = screen.getByText("Enable TOTP");
        expect(field).toBeInTheDocument();
        await userEvent.click(field);

        await waitFor(() => {
            screen.getByText("Not logged in");
        });
        const codeInput = screen.getByText("Not logged in");
        expect(codeInput).toBeInTheDocument();
    });
    test("should render & error at getInitTOTP, response not ok", async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce({...QrCodeResponse,ok: false, message: "error"})
            .mockResolvedValueOnce(QrCodeConfirmResponse);
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        getWallet.mockImplementation(() => wallet);
        renderWithRedux(<TOTPEnableTool/>);
        const field = screen.getByText("Enable TOTP");
        expect(field).toBeInTheDocument();
        await userEvent.click(field);
    });
    test("should render & error at confirmTOTP, response not ok", async () => {
        global.fetch = jest.fn()
            .mockResolvedValueOnce(QrCodeResponse)
            .mockResolvedValueOnce({...QrCodeConfirmResponse,ok: false, message: "error"});
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        getWallet.mockImplementation(() => wallet);
        renderWithRedux(<TOTPEnableTool/>);
        const field = screen.getByText("Enable TOTP");
        expect(field).toBeInTheDocument();
        await userEvent.click(field);
        await waitFor(() => {
            screen.getByTestId("totp-input")
        })
        const fieldTOTP = screen.getByTestId("totp-input").querySelector("input");
        expect(fieldTOTP).toBeInTheDocument();
        act(() => {
            fireEvent.change(fieldTOTP, {target: {value: "123456"}});
        });
        const fieldConfirm = screen.getByText("Confirm");
        expect(fieldConfirm).toBeInTheDocument();
        fireEvent.click(fieldConfirm);

    });
    test("should render null", async () => {
        getWallet.mockImplementation(() => null);
        renderWithRedux(<TOTPEnableTool/>);
    });
});