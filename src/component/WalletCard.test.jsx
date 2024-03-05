import {render,screen} from "@testing-library/react";
import WalletCard from "./WalletCard";
import {wallet} from "../Utils/testData";
import {renderWithRouter} from "../Utils/testHelper";
jest.mock("./TOTPEnableTool", ()=> () => {});

jest.mock("./WalletOpsTools", () => () => {});

describe('WalletCard', () => {
    test('renders the wallet card with null', () => {
        renderWithRouter(<WalletCard data={null}/>);
    });
    test('renders the wallet card with data', () => {
        renderWithRouter(<WalletCard data={wallet}/>);
        const card = screen.getByText("TOTP Enabled");
        expect(card).toBeInTheDocument();
    });
});