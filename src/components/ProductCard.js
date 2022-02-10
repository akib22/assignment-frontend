import { Card, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import request from '../utils/request';
import { useUser } from '../contexts/user';
import propTypes from '../utils/propTypes';
import { setDataOnLocalStorage } from '../utils/localStorage';
import axios from 'axios';

export default function ProductCard({ product }) {
  const [state, dispatch] = useUser();
  const navigate = useNavigate();
  const photoUrl = product.photoUrl || `https://picsum.photos/id/96/200/200`;

  const { user, accessToken } = state;
  const isWishlistProduct = user?.wishlists.includes(product._id) || false;

  // TODO: (Improvement)
  //     1. Extract wishlist from user object
  //     2. Make a service class to handle server requests
  async function addToWishlist(productId) {
    try {
      if (!accessToken) {
        return navigate('/signin');
      }

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
      alert(data?.message || 'Successfully added');
    } catch (error) {
      alert('Something went wrong.');
    }
  }

  async function removeFromWishlist(productId) {
    try {
      const { data } = await axios({
        url: `${process.env.REACT_APP_BASE_URL}products/wishlist/remove`,
        method: 'delete',
        data: { productId },
        headers: { Authorization: `bearer ${state.accessToken}` },
      });

      const newWishlists = user.wishlists.filter((id) => id !== productId);
      const userWithNewWishlists = { ...user, wishlists: newWishlists };
      setDataOnLocalStorage('user', userWithNewWishlists);
      dispatch({ type: 'setUser', payload: { user: userWithNewWishlists } });
      alert(data?.message || 'Successfully removed.');
    } catch (error) {
      alert('Something went wrong.');
    }
  }

  return (
    <Col className="mb-4" sm={12} md={6} lg={4} xl={3}>
      <Card>
        <Card.Img className="image" src={`${photoUrl}`} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Subtitle className="mb-1">
            Price: {product.price}$
          </Card.Subtitle>

          {isWishlistProduct ? (
            <Button
              variant="danger"
              onClick={() => removeFromWishlist(product._id)}
            >
              Remove from wishlist
            </Button>
          ) : (
            <Button
              variant="primary"
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
