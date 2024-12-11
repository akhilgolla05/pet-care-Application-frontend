import React, { useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { BsPersonFill, BsLockFill } from "react-icons/bs";
import {Link} from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm={6} className="">
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Login</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>UserName</Form.Label>
                 <InputGroup>
                 <InputGroup.Text>
                    <BsPersonFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="email"
                    value={credentials.email}
                    onChange={handleInputChange}
                  />
                 </InputGroup>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                  <InputGroup.Text>
                    <BsLockFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                  />
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <Button
                    variant="outline-primary"
                    type="submit"
                    className="w-100 mt-4"
                  >
                    Login
                  </Button>
                </Form.Group>
              </Form>

              <div className="text-center mt-2">
                Don't have an Account Yet?{" "}
                <Link
                  to={"/register-user"}
                  style={{ textDecoration: "none" }}
                >
                  Registe here
                </Link>{" "}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
