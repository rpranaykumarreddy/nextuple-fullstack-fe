import {token, user, wallet, walletResponse} from "../../Utils/testData";
import {getToken, getUser, getWallet} from "../../data/store";
import {fireEvent, screen} from "@testing-library/react";
import {getWalletDetailsAuthData} from "../../data/hook/useGetWalletDetails";
import {renderWithRedux, renderWithReduxAndRouter} from "../../Utils/testHelper";
import HomePage from "../HomePage";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

jest.mock("../../data/store", () => ({
    getWallet: jest.fn(),
    setWallet: jest.fn(),
    showMessage: jest.fn(),
    getToken: jest.fn(),
    getUser: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("HomePage & useGetWalletDetails fn()", () => {
    test("should render & success path", async () => {
        getWallet.mockImplementation(() => wallet);
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        global.fetch = jest.fn().mockResolvedValue(walletResponse);
        renderWithReduxAndRouter(<HomePage />);
        const field = screen.getByTestId("refresh");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
        expect(global.fetch).toHaveBeenCalledWith(
            getWalletDetailsAuthData.link,
            expect.objectContaining({
                method: getWalletDetailsAuthData.method,
                headers: { "Authorization": "Bearer " + token.accessToken }
            }),
        );
    });
    test("should render & sub not exists", async () => {
        getWallet.mockImplementation(() => wallet);
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => null);
        renderWithReduxAndRouter(<HomePage />);
        const field = screen.getByTestId("refresh");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
    });
    test("should render & response not ok", async () => {
        getWallet.mockImplementation(() => wallet);
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(() => user);
        global.fetch = jest.fn().mockResolvedValue({...walletResponse, ok: false});
        renderWithReduxAndRouter(<HomePage />);
        const field = screen.getByTestId("refresh");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
    })
});