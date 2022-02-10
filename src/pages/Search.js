import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';

import request from '../utils/request';

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('text');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function searchProduct() {
      setLoading(true);
      try {
        const { data } = await request.get(
          `/products/search?title=${searchText}`
        );
        setProducts(data.products);
      } catch (error) {
        alert(error?.data?.message || 'Something went wrong.');
      }
      setLoading(false);
    }

    searchProduct();
  }, [searchText]);

  // TODO: (Improvement)
  //     1. Remove loading text with spinner
  //     2. Use toast instead of alert api
  if (loading) {
    return <h1 className="mt-2 text-center">Loading</h1>;
  }

  return (
    <Container>
      {products.length === 0 ? (
        <h1 className="mt-2 text-center">No Product Found!</h1>
      ) : (
        <>
          <h2 className="text-center mt-2 mb-3">
            Showing result for: {searchText}
          </h2>
          <ProductList products={products} />
        </>
      )}
    </Container>
  );
}
