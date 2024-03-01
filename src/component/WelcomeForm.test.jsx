
import WelcomeForm from "./WelcomeForm";
import { renderWithRedux } from "../Utils/testHelper";
import {clearStatement, clearToken, clearUser, clearWallet,getToken ,showMessage} from "../data/store";
import {  fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../data/store';

beforeEach(() => {
  jest.clearAllMocks();
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('../data/store', () => ({
    clearStatement: jest.fn(),
    clearToken: jest.fn(), 
    clearUser: jest.fn(),
     clearWallet: jest.fn(),
     getToken : jest.fn(()=>{
      return "Pranay-token"
     }),
     showMessage: jest.fn()
  }));

describe('Welcome form & logout fn()', () => {
    test('should render & exit', () => {
      getToken.mockImplementation(
        ()=>"Pranay-token"
      )
        renderWithRedux(<WelcomeForm user={{sub:"pranay"}}/>);

        const field = screen.getByTestId('logout-button');
        expect(field).toBeInTheDocument()

        fireEvent.click(field)
        expect(mockDispatch).toHaveBeenCalledTimes(5);
        expect(mockDispatch).toHaveBeenCalledWith(clearStatement());
        expect(mockDispatch).toHaveBeenCalledWith(clearToken());
        expect(mockDispatch).toHaveBeenCalledWith(clearUser());
        expect(mockDispatch).toHaveBeenCalledWith(clearWallet());
        expect(mockDispatch).toHaveBeenCalledWith(showMessage());
    });
});