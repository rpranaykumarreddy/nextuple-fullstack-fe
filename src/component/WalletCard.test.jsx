import {render,screen} from "@testing-library/react";
import WalletCard from "./WalletCard";
import {wallet} from "../Utils/testData";
jest.mock("./TOTPEnableTool", ()=> () => {});

jest.mock("./WalletOpsTools", () => () => {});

describe('WalletCard', () => {
    test('renders the wallet card with null', () => {
        render(<WalletCard data={null}/>);
    });
    test('renders the wallet card with data', () => {
        render(<WalletCard data={wallet}/>);
        const card = screen.getByText("TOTP Enabled");
        expect(card).toBeInTheDocument();
    });
});