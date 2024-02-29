import React from 'react';
import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './Nav';

describe('Nav', () => {
    test('should render Nav component', () => {
        render(
            <BrowserRouter>
                <Nav/>
            </BrowserRouter>
        );
        const accountLink = screen.getByText('Account');
        const homeLink = screen.getByText('Home');
        const statementLink = screen.getByText('Statement');
        expect(accountLink).toBeInTheDocument();
        expect(homeLink).toBeInTheDocument();
        expect(statementLink).toBeInTheDocument();
    });
    test('should navigate to account page when clicked on account link', () => {
        render(
            <BrowserRouter>
                <Nav/>
            </BrowserRouter>
        );
        const accountLink = screen.getByText('Account');
        accountLink.click();
        expect(window.location.pathname).toBe('/user');
    });
    test('should navigate to home page when clicked on home link', () => {
        render(
            <BrowserRouter>
                <Nav/>
            </BrowserRouter>
        );
        const homeLink = screen.getByText('Home');
        homeLink.click();
        expect(window.location.pathname).toBe('/');
    });
    test('should navigate to statement page when clicked on statement link', () => {
        render(
            <BrowserRouter>
                <Nav/>
            </BrowserRouter>
        );
        const statementLink = screen.getByText('Statement');
        statementLink.click();
        expect(window.location.pathname).toBe('/statement');
    });
});