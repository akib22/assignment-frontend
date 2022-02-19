import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { UserProvider } from '../contexts/user';

// mocking components
jest.mock('../pages/Home', () => {
  return () => 'Mock Home Component';
});
jest.mock('../pages/SignIn', () => {
  return () => 'Mock SignIn Component';
});
jest.mock('../pages/SignUp', () => {
  return () => 'Mock SignUp Component';
});

const wrapper = () =>
  render(
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  );

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the app properly without any errors', () => {
    wrapper();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Home Component/i)).toBeInTheDocument();
  });

  it('should navigate to the right component', () => {
    wrapper();

    expect(screen.getByText(/Mock Home Component/i)).toBeInTheDocument();

    // navigating to sign-in page
    fireEvent.click(screen.getByText(/sign in/i));
    expect(screen.getByText(/Mock SignIn Component/i)).toBeInTheDocument();

    // navigating to sign-up page
    fireEvent.click(screen.getByText(/sign up/i));
    expect(screen.getByText(/Mock SignUp Component/i)).toBeInTheDocument();

    // navigating to home page
    fireEvent.click(screen.getByText(/products/i));
    expect(screen.getByText(/Mock Home Component/i)).toBeInTheDocument();
  });
});
