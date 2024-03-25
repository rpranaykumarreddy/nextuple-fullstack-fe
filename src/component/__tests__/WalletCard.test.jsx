import {fireEvent, render, screen} from "@testing-library/react";
import WalletCard from "../WalletCard";
import {wallet, walletNoTOTP} from "../../Utils/testData";
import {renderWithRouter} from "../../Utils/testHelper";
import TopNav from "../TopNav";
import TOTPDisableTool from "../TOTPDisableTool";
import TOTPEnableTool from "../TOTPEnableTool";
jest.mock("../TOTPEnableTool", ()=> () => {});
jest.mock("../TOTPDisableTool", () => ({
    __esModule: true,
    default: jest.fn(() => {
        return <p>TOTP Enabled</p>;
    }),
}));
jest.mock("../TOTPEnableTool", () => ({
    __esModule: true,
    default: jest.fn(() => {
        return <p>TOTP Disabled</p>;
    }),
}));
jest.mock("../WalletOpsTools", () => () => {});
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate
}));

describe('WalletCard', () => {
    test('renders the wallet card with null', () => {
        renderWithRouter(<WalletCard data={null}/>);
    });
    test('renders the wallet card with data', () => {
        TOTPDisableTool.mockImplementation(() => {
            return (
                <p>TOTP Enabled</p>
            );
        });
        renderWithRouter(<WalletCard data={wallet}/>);
        const card = screen.getByText("TOTP Enabled");
        expect(card).toBeInTheDocument();
    });
    test('renders the wallet card with data no TOTP', () => {
        TOTPEnableTool.mockImplementation(() => {
            return (
                <p>TOTP Disabled</p>
            );
        });
        renderWithRouter(<WalletCard data={walletNoTOTP}/>);
        const card = screen.getByText("TOTP Disabled");
        expect(card).toBeInTheDocument();
    });
    test("clicking on Statement button", () => {
        renderWithRouter(<WalletCard data={wallet}/>);
        const button = screen.getByText("Statement");
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(mockNavigate).toBeCalledWith("/statement");
    });
    test("clicking on Cashback button", () => {
        renderWithRouter(<WalletCard data={wallet}/>);
        const button = screen.getByText("Cashback");
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(mockNavigate).toBeCalledWith("/cashback");
    });
});