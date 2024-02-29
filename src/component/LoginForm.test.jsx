import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import LoginForm from './LoginForm';
import * as hooks from '../data/serverHooks';
import store from '../data/store';
jest.mock('../data/serverHooks');

describe('LoginForm', () => {
    let mockSetData;
    let mockLogin;
    let mockFlipLogin;

    beforeEach(() => {
        mockSetData = jest.fn();
        mockLogin = jest.fn();
        hooks.useLogin.mockReturnValue([
            { username: '', password: '' },
            mockSetData,
            null,
            false,
            mockLogin,
        ]);
        mockFlipLogin = jest.fn();
    });

    test('render Login Form', () => {
         render(
            <Provider store={store}>
                <LoginForm flipLogin={mockFlipLogin} />
            </Provider>
        );
         expect(screen.getByText('Login to Banking')).toBeInTheDocument();
    });


    test('show an error message', async () => {
        hooks.useLogin.mockReturnValue([
            { username: '', password: '' },
            mockSetData,
            'Login error',
            false,
            mockLogin,
        ]);
        render(
            <Provider store={store}>
                <LoginForm flipLogin={mockFlipLogin} />
            </Provider>
        );
        expect(screen.getByText('Login error')).toBeInTheDocument();
    });

    test('disable the login button', () => {
        hooks.useLogin.mockReturnValue([
            { username: '', password: '' },
            mockSetData,
            null,
            true,
            mockLogin,
        ]);
        render(
            <Provider store={store}>
                <LoginForm flipLogin={mockFlipLogin} />
            </Provider>
        );
        expect(screen.getByText('Log In User')).toBeDisabled();
    });

    test('call the flipLogin function', () => {
        render(
            <Provider store={store}>
                <LoginForm flipLogin={mockFlipLogin} />
            </Provider>
        );
        fireEvent.click(screen.getByText('Register'));
        expect(mockFlipLogin).toHaveBeenCalled();
    });

    test('call setData on email type', () => {
         render(
            <Provider store={store}>
                <LoginForm flipLogin={mockFlipLogin} />
            </Provider>
        );

        const field = screen.getByTestId('email-input').querySelector('input');
        expect(field).toBeInTheDocument()

        fireEvent.change(field , {target: { value: 'pranay'}});
        expect(mockSetData).toHaveBeenCalledWith({username: 'pranay', password: ''});
    });

    test('call setData on password type', () => {
         render(
            <Provider store={store}>
                <LoginForm flipLogin={mockFlipLogin} />
            </Provider>
        );

        const field = screen.getByTestId('password-input').querySelector('input');
        expect(field).toBeInTheDocument()

        fireEvent.change(field , {target: { value: 'ABCD1234'}});
        expect(mockSetData).toHaveBeenCalledWith({username: '', password: 'ABCD1234'});
    });
});

