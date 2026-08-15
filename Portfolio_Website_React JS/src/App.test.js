import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the hero heading with the site owner name', () => {
  const { getByText } = render(<App />);
  const heading = getByText(/Reece Lardy/i);
  expect(heading).toBeInTheDocument();
});
