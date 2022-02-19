import { BrowserRouter } from 'react-router-dom';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import { UserProvider } from '../../contexts/user';
import SignIn from '../../pages/SignIn';
import request from '../../utils/request';

const mockUsedNavigate = jest.fn();
const mockPostMethod = jest.fn();
request.post = mockPostMethod;

jest.mock('../../utils/request');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

const wrapper = () =>
  render(
    <BrowserRouter>
      <UserProvider>
        <SignIn />
      </UserProvider>
    </BrowserRouter>
  );

describe('Signin page', () => {
  afterEach(() => {
    cleanup();
  });

  it('should show the validation message', async () => {
    const { getByLabelText, getByRole, findByText } = wrapper();
    const emailInput = getByLabelText(/email address/i);
    const passwordInput = getByLabelText(/password/i);
    const button = getByRole('button', { name: /submit/i });

    fireEvent.click(button);

    // initial value
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');

    const emailValidationMsg = await findByText(/email is required/i);
    const passwordValidationMsg = await findByText(/password is required/i);

    expect(emailValidationMsg).toBeInTheDocument();
    expect(passwordValidationMsg).toBeInTheDocument();
  });

  it('should signin work properly', async () => {
    const promise = Promise.resolve({
      data: { user: { name: 'test' }, token: '1234' },
    });
    mockPostMethod.mockImplementationOnce(() => promise);

    const { getByLabelText, getByRole } = wrapper();
    const emailInput = getByLabelText(/email address/i);
    const passwordInput = getByLabelText(/password/i);
    const button = getByRole('button', { name: /submit/i });

    const email = 'test@gmail.com';
    const password = '123456';
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    // change value
    expect(emailInput.value).toBe(email);
    expect(passwordInput.value).toBe(password);

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPostMethod).toBeCalledWith('/user/signin', {
        email,
        password,
      });
      expect(mockUsedNavigate).toBeCalledTimes(1);
      expect(mockUsedNavigate).toBeCalledWith('/');
    });
  });
});
