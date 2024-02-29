import React from 'react';
import { render } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<NotFoundPage />);
    expect(getByText('No such page exists!')).toBeInTheDocument();
  });
});
