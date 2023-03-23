import "../css/header.css";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { signInWithGoogle, signOut } from '../firebaseconfig';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

export function Header() {
  const { user } = useContext(AuthContext)
  return (
    <div className="header">
      {/* <div>
        <Link to="/boards">Boards</Link>
        <Link to="/">Home</Link>
        <button>Boards</button>
      </div> */}
      {/* <div>
        <label>Search</label>
        <input type="text"></input>
        <button>search</button>
      </div> */}
      
      <Navbar bg="light" expand="lg">
      <Container fluid>
       
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
          
            <Nav.Link href="/boards">Boards</Nav.Link>
           

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav.Link href="#" disabled>
              Login
            </Nav.Link>
            <Nav.Link href="#" disabled>
              Sign up
            </Nav.Link>
        </Navbar.Collapse>
        {/* <div className="login-signup-buttons">
        <div>
          {
            user ? 
            <div>
              <p>welcome {user.displayName}</p>
              <button onClick={signOut}>Sign Out</button>
            </div>  :
            <div>
              <button onClick={signInWithGoogle}>Sign in With Google</button>
            </div>
          }
        </div>
      </div> */}
      </Container>
    </Navbar>
    </div>
  );
}
