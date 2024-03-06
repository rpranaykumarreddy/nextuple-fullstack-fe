import {renderWithRedux} from "../../Utils/testHelper";
import SnackBarSystem from "../SnackBarSystem";
import {getSnackbar} from "../../data/store";
import {snackbarData} from "../../Utils/testData";
import {act} from "react-dom/test-utils";
import {fireEvent, screen} from "@testing-library/react";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => mockDispatch,
}));
jest.mock("../../data/store", () => ({
    hideMessage: jest.fn(),
    getSnackbar: jest.fn(() => null),
}));

beforeEach(() => {
    jest.clearAllMocks();
});
describe("Snackbar System",()=>{
    test("render & success path",()=>{
        jest.useFakeTimers();
        getSnackbar.mockImplementation(()=>snackbarData);
        renderWithRedux(<SnackBarSystem/>);
        expect(mockDispatch).toHaveBeenCalledTimes(0);
        const snackbar = screen.getByText("test");
        expect(snackbar).toBeInTheDocument();
        act(() => {
            jest.advanceTimersByTime(6000);
        });
        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
});