import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import request from '../utils/request';
import { useUser } from '../contexts/user';
import ProductList from '../components/ProductList';

export default function Wishlist() {
  const navigate = useNavigate();
  const [state] = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchWishlistProducts() {
      try {
        setLoading(true);
        const { data } = await request.get('/products/wishlist', {
          headers: {
            Authorization: `bearer ${state.accessToken}`,
          },
        });
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        alert(error.response.data?.message || 'Something went wrong.');
        navigate('/signin');
      }
    }

    if (state.accessToken) fetchWishlistProducts();
  }, [state.accessToken]);

  if (loading) {
    return <h1 className="mt-2 text-center">Loading</h1>;
  }

  return (
    <Container>
      {products.length === 0 ? (
        <h1 className="mt-2 text-center">No Product Found!</h1>
      ) : (
        <>
          <h2 className="text-center mt-2 mb-3">Your wishlist</h2>
          <ProductList products={products} />
        </>
      )}
    </Container>
  );
}
