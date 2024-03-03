import userEvent from "@testing-library/user-event";
import {renderWithRedux} from "../Utils/testHelper";
import TOTPEnableTool from "./TOTPEnableTool";
import {act, fireEvent, screen} from "@testing-library/react";
import {loginAuthData as confirmTOTPData, loginAuthData as getInitTOTPData} from "../data/hook/useLogin";
import {getToken, getUser, getWallet} from "../data/store";
import {QrCodeConfirmResponse, QrCodeResponse, token, user, wallet} from "../Utils/testData";
import {confirmTOTPAuthData, getInitTOTPAuthData} from "../data/hook/useGetInitTOTP";

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
        const userInput = userEvent;
        renderWithRedux(<TOTPEnableTool/>);
        const field = screen.getByText("Enable TOTP");
        expect(field).toBeInTheDocument();
        act(async () => {
            await userInput.click(field);
        });
        // const fieldTOTP = screen.getByTestId("totp-input").querySelector("input");
        // expect(fieldTOTP).toBeInTheDocument();
        // fireEvent.change(fieldTOTP, {target: {value: "123456"}});
        // const fieldConfirm = screen.getByText("Confirm");
        // expect(fieldConfirm).toBeInTheDocument();
        // fireEvent.click(fieldConfirm);
        expect(global.fetch).toHaveBeenNthCalledWith(1,
            getInitTOTPAuthData.link,
            expect.objectContaining({
                method: getInitTOTPAuthData.method,
                headers: {
                    'Authorization': `${token.tokenType} ${token.accessToken}`,
                }
            }),
        );
        // expect(global.fetch).toHaveBeenNthCalledWith(2,
        //     confirmTOTPAuthData.link+ "?code=123456",
        //     expect.objectContaining({
        //         method: getInitTOTPAuthData.method,
        //         headers: {
        //             'Authorization': `${token.tokenType} ${token.accessToken}`,
        //         }
        //     }),
        // );
    });
    test("should render null", async () => {
        getWallet.mockImplementation(() => null);
        renderWithRedux(<TOTPEnableTool/>);
    });
});