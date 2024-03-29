import { useState } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import request from '../utils/request';
import { useUser } from '../contexts/user';
import propTypes from '../utils/propTypes';
import { setDataOnLocalStorage } from '../utils/localStorage';

export default function ProductCard({ product }) {
  const [state, dispatch] = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const imageUrl = product.imageUrl || `https://picsum.photos/id/96/200/200`;

  const { user, accessToken } = state;
  const isWishlistProduct = user?.wishlists.includes(product._id) || false;

  // TODO: (Improvement)
  //     1. Make a service class to handle server requests
  async function addToWishlist(productId) {
    try {
      if (!accessToken) {
        return navigate('/signin');
      }
      setLoading(true);
      const { data } = await request.patch(
        '/products/wishlist/add',
        { productId },
        {
          headers: {
            Authorization: `bearer ${state.accessToken}`,
          },
        }
      );

      const newWishlists = [...user.wishlists, productId];
      const userWithNewWishlists = { ...user, wishlists: newWishlists };
      setDataOnLocalStorage('user', userWithNewWishlists);
      dispatch({ type: 'setUser', payload: { user: userWithNewWishlists } });
      dispatch({
        type: 'setWishlists',
        payload: { wishlists: [...state.wishlists, product] },
      });
      alert(data?.message || 'Successfully added');
      setLoading(false);
    } catch (error) {
      alert('Something went wrong.');
      setLoading(false);
    }
  }

  async function removeFromWishlist(productId) {
    try {
      setLoading(true);
      const { data } = await request({
        url: `/products/wishlist/remove`,
        method: 'delete',
        data: { productId },
        headers: { Authorization: `bearer ${state.accessToken}` },
      });

      const newWishlists = user.wishlists.filter((id) => id !== productId);
      const userWithNewWishlists = { ...user, wishlists: newWishlists };
      const wishlists = state.wishlists.filter(
        (item) => item._id !== productId
      );

      setDataOnLocalStorage('user', userWithNewWishlists);
      dispatch({ type: 'setUser', payload: { user: userWithNewWishlists } });
      dispatch({
        type: 'setWishlists',
        payload: { wishlists },
      });
      alert(data?.message || 'Successfully removed.');
      setLoading(false);
    } catch (error) {
      alert('Something went wrong.');
      setLoading(false);
    }
  }

  return (
    <Col
      className="mb-4"
      xs={12}
      sm={6}
      md={6}
      lg={4}
      xl={3}
      data-testid="productCard"
    >
      <Card>
        <Card.Img className="image" src={`${imageUrl}`} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Subtitle className="mb-1">
            Price: {product.price}$
          </Card.Subtitle>

          {isWishlistProduct ? (
            <Button
              variant="danger"
              disabled={loading}
              data-testid="removeFromWishlist"
              onClick={() => removeFromWishlist(product._id)}
            >
              Remove from wishlist
            </Button>
          ) : (
            <Button
              variant="primary"
              disabled={loading}
              data-testid="addToWishlist"
              onClick={() => addToWishlist(product._id)}
            >
              Add to wishlist
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

ProductCard.propTypes = {
  product: propTypes.product,
};
