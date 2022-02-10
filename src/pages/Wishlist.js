import { Container } from 'react-bootstrap';

import ProductList from '../components/ProductList';
import products from '../seed/products';

export default function Wishlist() {
  return (
    <Container>
      {products.length === 0 ? (
        <h1 className="text-center">No Product Found!</h1>
      ) : (
        <>
          <h2 className="text-center mt-2 mb-3">Your wishlist</h2>
          <ProductList products={products} />
        </>
      )}
    </Container>
  );
}
