import { useState } from 'react';
import {
  Container,
  InputGroup,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useUser } from '../contexts/user';
import { clearDataFromLocalStorage } from '../utils/localStorage';

export default function Header() {
  const [state, dispatch] = useUser();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  function handleSearch() {
    setSearchText('');
    return navigate(`/search?text=${searchText}`);
  }

  function signOut() {
    dispatch({ type: 'reset' });
    clearDataFromLocalStorage();
    navigate('/signin');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Akib's Book Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <InputGroup className="mx-lg-auto" style={{ width: '400px' }}>
            <FormControl
              value={searchText}
              onChange={({ target }) => setSearchText(target.value)}
              placeholder="Search product by title"
              aria-label="Search product by title"
              aria-describedby="basic-addon2"
            />
            <Button
              onClick={handleSearch}
              disabled={searchText.length < 3}
              variant="light"
              id="button-addon2"
            >
              Search
            </Button>
          </InputGroup>
          <Nav activeKey="/signup">
            <Nav.Link as={Link} to="/">
              Products
            </Nav.Link>
            {state.user ? (
              <>
                <NavDropdown
                  title={state.user.name}
                  id="collasible-nav-dropdown"
                  data-testid="userDropdown"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/wishlist"
                    data-testid="wishlist-link"
                  >
                    Wishlists
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={signOut}>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/signin" data-testid="signIn-link">
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
