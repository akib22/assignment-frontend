import { Container, Form, Button, Col, Card } from 'react-bootstrap';

export default function SignIn() {
  return (
    <Container>
      <Col className="mx-auto" xs={12} sm={10} md={6} lg={6} xl={4}>
        <Card className="mt-5 p-3">
          <h2 className="text-center mb-3">Sign In</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </Col>
    </Container>
  );
}
