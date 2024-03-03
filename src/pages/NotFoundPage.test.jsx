import React from 'react';
import {render, screen} from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage component', () => {
  test('renders correctly', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('No such page exists!')).toBeInTheDocument();
  });
});
