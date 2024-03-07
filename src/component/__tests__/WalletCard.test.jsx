import {fireEvent, render, screen} from "@testing-library/react";
import WalletCard from "../WalletCard";
import {wallet} from "../../Utils/testData";
import {renderWithRouter} from "../../Utils/testHelper";
jest.mock("../TOTPEnableTool", ()=> () => {});

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
        renderWithRouter(<WalletCard data={wallet}/>);
        const card = screen.getByText("TOTP Enabled");
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