import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import request from '../../utils/request';
import products from '../../seed/products';
import { UserProvider } from '../../contexts/user';
import ProductCard from '../../components/ProductCard';

const mockAlert = jest.fn();
window.alert = mockAlert;

jest.mock('../../utils/request');

const wrapper = (state = { user: null, accessToken: null }) => (
  <BrowserRouter>
    <UserProvider initialState={state}>
      <ProductCard product={products[0]}></ProductCard>
    </UserProvider>
  </BrowserRouter>
);

describe('ProductCard', () => {
  it('should render props data', () => {
    const { getByText } = render(wrapper());

    expect(getByText(new RegExp(products[0].title, 'i'))).toBeInTheDocument();
    expect(getByText(/add to wishlist/i)).toBeInTheDocument();
  });

  it("should show the right right button based on user's data", () => {
    const user = { wishlists: [products[0]._id] };
    const { getByText } = render(wrapper({ user, accessToken: 'token' }));
    expect(getByText(/remove from wishlist/i)).toBeInTheDocument();
  });

  it('should "Add to wishlist" button work properly', async () => {
    // mocking API response
    const data = { message: 'successfully added.' };
    request.patch.mockReturnValue({ data });

    const { getByRole, getByText } = render(
      wrapper({ user: { wishlists: [] }, accessToken: '1234' })
    );
    const button = getByRole('button', { name: /add to wishlist/i });
    fireEvent.click(button);

    // checking changes after click event
    await waitFor(() => {
      expect(mockAlert).toBeCalledTimes(1);
      expect(mockAlert).toBeCalledWith(data.message);
      expect(getByText(/remove from wishlist/i)).toBeInTheDocument();
    });
  });

  it('should "Remove to wishlist" button work properly', async () => {
    // mocking API response
    const data = { message: 'successfully removed.' };
    request.mockReturnValue({ data });

    const user = { wishlists: [products[0]._id] };
    const { getByText, getByRole } = render(
      wrapper({ user, accessToken: 'token' })
    );
    const button = getByRole('button', { name: /remove from wishlist/i });
    fireEvent.click(button);

    // checking changes after click event
    await waitFor(() => {
      expect(mockAlert).toBeCalledTimes(1);
      expect(mockAlert).toBeCalledWith(data.message);
      expect(getByText(/add to wishlist/i)).toBeInTheDocument();
    });
  });
});
