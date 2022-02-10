import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ item }) {
  const photoUrl = item.photoUrl || `https://picsum.photos/id/96/200/200`;

  return (
    <Col className="mb-3" sm={12} md={6} lg={4} xl={3}>
      <Card>
        <Card.Img className="image" src={`${photoUrl}`} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Subtitle className="mb-1">Price: {item.price}$</Card.Subtitle>

          <Button as={Link} to={`/products/${item.id}`} variant="primary">
            View product
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
