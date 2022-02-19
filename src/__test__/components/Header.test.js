import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from '../../contexts/user';
import Header from '../../components/Header';

const mockUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

const wrapper = (state = { user: null, accessToken: null }) =>
  render(
    <BrowserRouter>
      <UserProvider initialState={state}>
        <Header />
      </UserProvider>
    </BrowserRouter>
  );

describe('Component -> Header', () => {
  afterEach(() => {
    cleanup();
  });

  test('should show signup and signin button when user not signed in', async () => {
    wrapper();
    const signInText = screen.getByText(/sign in/i);
    const signUpText = screen.getByText(/sign up/i);

    expect(signInText).toBeInTheDocument();
    expect(signUpText).toBeInTheDocument();
  });

  test('should show username when user signed in', async () => {
    const state = { user: { name: 'test user' }, accessToken: '1234' };
    wrapper(state);
    const userName = screen.getByText(new RegExp(state.user.name, 'i'));

    expect(userName).toBeInTheDocument();
  });

  test('should search work properly', async () => {
    wrapper();

    const searchText = 'test';
    const searchInput = screen.getByRole('textbox', {
      name: /search product by title/i,
    });
    const searchButton = screen.getByRole('button', { name: /search/i });

    // input length less than 3, button will be disabled
    expect(searchButton).toBeDisabled();

    fireEvent.change(searchInput, { target: { value: searchText } });
    expect(searchButton).not.toBeDisabled();

    fireEvent.click(searchButton);
    expect(mockUsedNavigate).toBeCalledTimes(1);
    expect(mockUsedNavigate).toBeCalledWith(`/search?text=${searchText}`);
  });
});
