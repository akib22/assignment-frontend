import { render, screen } from '@testing-library/react';
import App from './App';

test('renders assignment backend', () => {
  render(<App />);
  const linkElement = screen.getByText(/assignment backend/i);
  expect(linkElement).toBeInTheDocument();
});
