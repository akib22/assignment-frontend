import { Card, Button, Col } from 'react-bootstrap';
import propTypes from '../utils/propTypes';

export default function ProductCard({ product }) {
  const photoUrl = product.photoUrl || `https://picsum.photos/id/96/200/200`;

  return (
    <Col className="mb-3" sm={12} md={6} lg={4} xl={3}>
      <Card>
        <Card.Img className="image" src={`${photoUrl}`} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Subtitle className="mb-1">
            Price: {product.price}$
          </Card.Subtitle>

          <Button variant="primary">Add to wishlist</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

ProductCard.propTypes = {
  product: propTypes.product,
};
