import { render, waitFor, cleanup } from '@testing-library/react';

import Home from '../../pages/Home';
import request from '../../utils/request';
import { UserProvider } from '../../contexts/user';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../utils/request');

const products = [
  {
    _id: '1',
    title: 'Test product 1',
    price: 20,
    description: 'test product',
  },
  {
    _id: '2',
    title: 'Test product 2',
    price: 20,
    description: 'test product',
  },
];

describe('Home page', () => {
  const mockAlert = jest.fn();
  window.alert = mockAlert;

  afterEach(() => {
    cleanup();
    request.get.mockClear();
  });

  test('should show "Loading" when fetching products from API', async () => {
    const promise = Promise.resolve({ data: { products: [] } });
    request.get.mockImplementationOnce(() => promise);

    const { getByText } = render(
      <BrowserRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </BrowserRouter>
    );

    expect(getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {});
  });

  test('should show "No product found" when not getting any product from API', async () => {
    const promise = Promise.resolve({ data: { products: [] } });
    request.get.mockImplementationOnce(() => promise);

    const { getByText } = render(
      <BrowserRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getByText(/no product found/i)).toBeInTheDocument();
    });
  });

  test('fetches products from API and displays them', async () => {
    const promise = Promise.resolve({ data: { products } });
    request.get.mockImplementationOnce(() => promise);

    const { getByText } = render(
      <BrowserRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getByText(/all products/i)).toBeInTheDocument();
      products.forEach((product) => {
        const regExText = new RegExp(product.title, 'i');
        expect(getByText(regExText)).toBeInTheDocument();
      });
    });
  });

  test('should call alert function when error occurred', async () => {
    const promise = Promise.reject(new Error('Something went wrong'));
    request.get.mockImplementationOnce(() => promise);

    render(
      <BrowserRouter>
        <UserProvider>
          <Home />
        </UserProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockAlert).toBeCalled();
    });
  });
});
