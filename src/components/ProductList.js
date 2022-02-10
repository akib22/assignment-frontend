import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';
import propTypes from '../utils/propTypes';

export default function ProductList({ products }) {
  return (
    <Row>
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </Row>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(propTypes.product),
};
