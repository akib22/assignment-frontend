import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import request from '../utils/request';
import ProductList from '../components/ProductList';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { data } = await request.get('/products');
        setProducts(data.products);
      } catch (error) {
        alert('Something went wrong.');
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <h1 className="mt-2 text-center">Loading</h1>;
  }

  return (
    <Container>
      {products.length === 0 ? (
        <h1 className="text-center">No Product Found!</h1>
      ) : (
        <>
          <h2 className="text-center mt-2 mb-3">All Products</h2>
          <ProductList products={products} />
        </>
      )}
    </Container>
  );
}
