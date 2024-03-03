
import WalletOpsTools from "./WalletOpsTools";
import {fireEvent, render, screen} from "@testing-library/react";
import RechargeTool from "./RechargeTool";
import TransactionTool from "./TransactionTool";

jest.mock("./RechargeTool", () => ({
    __esModule: true,
    default: jest.fn(() => {
        return <p data-testid="RecTool">Rec</p>;
    }),
}));
jest.mock("./TransactionTool", () => ({
    __esModule: true,
    default: jest.fn(() => {
        return <p data-testid="TransTool">Trans</p>;
    }),
}));
beforeEach(() => {
    jest.clearAllMocks();
});

describe("WalletOpsTools",()=> {
    test("should render & test transfer",()=>{
        TransactionTool.mockImplementation(({open, onClose}) => {
            return <div>
                <p data-testid="TransTool">Trans</p>
                {open && <button onClick={onClose} data-testid="TransTool-but">TransClose</button>}
            </div>
        });
        render(<WalletOpsTools/>);
        const transferButton = screen.getByText("Transfer");
        expect(transferButton).toBeInTheDocument();
        const transModel = screen.getByTestId("TransTool");
        expect(transModel).toBeInTheDocument();
        fireEvent.click(transferButton);
        const closeButton = screen.getByTestId("TransTool-but");
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(closeButton).not.toBeInTheDocument();
    });
    test("should render &  test transfer",()=>{
        RechargeTool.mockImplementation(({open, onClose}) => {
            return <div>
                <p data-testid="RecTool">Rec</p>
                {open && <button onClick={onClose} data-testid="RecTool-but">RecClose</button>}
            </div>
        });
        render(<WalletOpsTools/>);
        const rechargeButton = screen.getByText("Recharge");
        expect(rechargeButton).toBeInTheDocument();
        const recModel = screen.getByTestId("RecTool");
        expect(recModel).toBeInTheDocument();
        fireEvent.click(rechargeButton);
        const closeButton = screen.getByTestId("RecTool-but");
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);
        expect(closeButton).not.toBeInTheDocument();
    });
});