import { Container, Form, Button, Col, Card } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';

export default function SignIn() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSignIn = (data) => {
    // TODO: call api to sign a user
    reset();
  };

  return (
    <Container>
      <Col className="mx-auto" xs={12} sm={10} md={6} lg={6} xl={4}>
        <Card className="mt-5 p-3">
          <h2 className="text-center mb-3">Sign In</h2>
          <Form onSubmit={handleSubmit(onSignIn)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Controller
                control={control}
                name="email"
                rules={{ required: 'Email is required.' }}
                defaultValue=""
                render={({ field }) => {
                  return (
                    <Form.Control
                      onChange={field.onChange}
                      value={field.value}
                      ref={field.ref}
                      isInvalid={errors.email}
                      type="email"
                      placeholder="Enter email"
                    />
                  );
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Controller
                control={control}
                name="password"
                rules={{ required: 'Password is required.', minLength: 6 }}
                defaultValue=""
                render={({ field }) => {
                  return (
                    <Form.Control
                      onChange={field.onChange}
                      value={field.value}
                      ref={field.ref}
                      isInvalid={errors.password}
                      type="password"
                      placeholder="Enter password"
                    />
                  );
                }}
              />
              {errors?.password?.type === 'required' && (
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              )}
              {errors?.password?.type === 'minLength' && (
                <Form.Control.Feedback type="invalid">
                  Password should be 6 characters.
                </Form.Control.Feedback>
              )}
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
