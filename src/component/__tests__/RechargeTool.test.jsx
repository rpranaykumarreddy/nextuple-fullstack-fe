import {getToken, getUser} from "../../data/store";
import {token, user, walletResponse} from "../../Utils/testData";
import {renderWithRedux} from "../../Utils/testHelper";
import RechargeTool from "../RechargeTool";
import {fireEvent, screen} from "@testing-library/react";
import {rechargeWalletAuthData} from "../../data/hook/useRechargeWallet";

const closeFn = jest.fn();

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));

jest.mock("../../data/store", () => ({
    showMessage: jest.fn(),
    getUser : jest.fn(),
    setWallet: jest.fn(),
    getToken: jest.fn(() => null),
}));

describe("RechargeTool & useRechargeWallet fn()", () => {
    test("should render & success path",()=>{
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(()=> user);
        global.fetch = jest.fn().mockResolvedValueOnce(walletResponse);
        renderWithRedux(<RechargeTool open={true} onClose={closeFn}/>);
        const amount = screen.getByTestId("amount-input").querySelector("input");
        expect(amount).toBeInTheDocument();
        fireEvent.change(amount, {target: {value: 100}});
        const field = screen.getByText("Confirm");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
        expect(global.fetch).toHaveBeenCalledWith(
            rechargeWalletAuthData.link + "?amount=100",
            expect.objectContaining({
                method: rechargeWalletAuthData.method,
                headers: { "Authorization": "Bearer " + token.accessToken }
            }),
        );
    });
    test("should render & sub not exists",()=>{
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(()=> null);
        renderWithRedux(<RechargeTool open={true} onClose={closeFn}/>);
        const amount = screen.getByTestId("amount-input").querySelector("input");
        expect(amount).toBeInTheDocument();
        fireEvent.change(amount, {target: {value: 100}});
        const field = screen.getByText("Confirm");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
    });
    test("should render & response not ok",()=>{
        getToken.mockImplementation(() => token);
        getUser.mockImplementation(()=> user);
        global.fetch = jest.fn().mockResolvedValue({...walletResponse, ok: false});
        renderWithRedux(<RechargeTool open={true} onClose={closeFn}/>);
        const amount = screen.getByTestId("amount-input").querySelector("input");
        expect(amount).toBeInTheDocument();
        fireEvent.change(amount, {target: {value: 100}});
        const field = screen.getByText("Confirm");
        expect(field).toBeInTheDocument();
        fireEvent.click(field);
    });
});