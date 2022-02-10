import { Container } from 'react-bootstrap';
import ProductList from '../components/ProductList';

export default function Home() {
  const products = [
    {
      price: 10,
      title: 'testing....',
      description: 'dfasd',
      id: '232',
    },
    {
      price: 15,
      title: 'testing 12....',
      description: 'No desc',
      id: '132',
    },
  ];

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
