import "../css/header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getBoardData } from "../services/gravebookServices";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { SignIn } from "./SignIn";

interface IHeaderProps {
  UpdateBoards: Function;
}

export function Header(props: IHeaderProps) {
  const { user } = useContext(AuthContext);
  const [namesearch, setNamesearch] = useState<string>("");
  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const result = data.get("searchBarInput")?.toString() || "";
    getBoardData(namesearch).then((response) =>
      props.UpdateBoards(response.data)
    );
    console.log(namesearch);
  };

  return (
    <div  className="header">
      <Navbar expand="lg">
        <Container  fluid id="container">
        <div className="Gravebook">
            <h3 >Gravebook</h3>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link><Link className="home" to={'/'}>Home</Link></Nav.Link>

              <Nav.Link><Link className="boards" to={'/boards'}>Boards</Link></Nav.Link>

              <Nav.Link  className="welcome">
              <Link className="user-displayName" style={{   textDecoration: 'none'  }} to={`/user/${user?.uid}`}>{user?.displayName}</Link>
              </Nav.Link>
            </Nav>

            <Form className="d-flex" onSubmit={onSubmit}>
              <Form.Control
                type="text"
                name="searchBarInput"
                placeholder="Search name here"
                id="searchBarInput"
                onChange={(e) => setNamesearch(e.target.value)}
              />
              <Button type="submit" variant="outline-success">
                Search
              </Button>
            </Form>
            {/* <Nav.Link href="#" disabled>
              Login
            </Nav.Link>
            <Nav.Link href="#" disabled>
              Sign up
            </Nav.Link> */}
          </Navbar.Collapse>
          <div className="login-signup-buttons">
            <div>
              <SignIn />
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
