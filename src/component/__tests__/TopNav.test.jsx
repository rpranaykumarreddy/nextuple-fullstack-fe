import {renderWithRouter} from "../../Utils/testHelper";
import TopNav from "../TopNav";
import {screen, waitFor} from "@testing-library/react";
import {user} from "../../Utils/testData";
describe("TopNav", () => {
    test("should render TopNav component", () => {
        renderWithRouter(<TopNav />);
        const Title = screen.getByText("Infinitum Bank");
        expect(Title).toBeInTheDocument();
    });
    test("should navigate by clicking menu id's", () => {
        const logout = jest.fn();
        renderWithRouter(<TopNav user={user} logout={logout} />);
        const handleOpenNavMenu = screen.getByTestId("handleOpenNavMenu");
        handleOpenNavMenu.click();
        const walletMenu = screen.getByTestId("menu-bar-");
        walletMenu.click();
        expect(window.location.pathname).toBe("/");
        const statementMenu = screen.getByTestId("menu-bar-statement");
        statementMenu.click();
        expect(window.location.pathname).toBe("/statement");
        const cashbackMenu = screen.getByTestId("menu-bar-cashback");
        cashbackMenu.click();
        expect(window.location.pathname).toBe("/cashback");
        const WalletNav = screen.getByTestId("nav-bar-");
        WalletNav.click();
        expect(window.location.pathname).toBe("/");
        const statementNav = screen.getByTestId("nav-bar-statement");
        statementNav.click();
        expect(window.location.pathname).toBe("/statement");
        const cashbackNav = screen.getByTestId("nav-bar-cashback");
        cashbackNav.click();
        expect(window.location.pathname).toBe("/cashback");
    });
    test("should logout by clicking on logout", () => {
        const logout = jest.fn();
        renderWithRouter(<TopNav user={user} logout={logout}/>);
        const handleOpenUserMenu = screen.getByTestId("handleOpenUserMenu");
        handleOpenUserMenu.click();
        const logoutButton = screen.getByTestId("logout");
        logoutButton.click();
        expect(logout).toHaveBeenCalled();
    });
    test("should change color of active page", () => {
        const logout = jest.fn();
        renderWithRouter(<TopNav user={user} logout={logout} />,  "/statement/");
        const walletMenu = screen.getByTestId("nav-bar-statement");
        waitFor(() => {
            expect(walletMenu).toHaveStyle("color: #1976d2");
        });
    })
});