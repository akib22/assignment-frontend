import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from '../../contexts/user';
import Header from '../../components/Header';

jest.mock('axios');

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
});
