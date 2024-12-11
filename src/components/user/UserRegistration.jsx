import React, { useState } from "react";
import UseMessageAlerts from "../hook/UseMessageAlerts";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card
} from "react-bootstrap";
import ProcessSpinner from "../common/ProcessSpinner";
import AlertMessage from "../common/AlertMessage";
import {Link} from "react-router-dom";
import VetSpecializationSelector from "./VetSpecializationSelector";
import { registerUser } from "./UserService";

const UserRegistration = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    phoneNumber: "",
    userType: "",
    specialization: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const {
    errorMessage,
    setErrorMessage,
    showErrorAlert,
    setShowErrorAlert,
    successMessage,
    setSuccessMessage,
    showSuccessAlert,
    setShowSuccessAlert,
  } = UseMessageAlerts();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const response = await registerUser(user);
      console.log(response);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
      setIsProcessing(false);
      handleReset();
    } catch (error) {
        
      setShowErrorAlert(true);
      setErrorMessage(error.response?.data.message);
      setShowErrorAlert(true);
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      phoneNumber: "",
      userType: "",
      specialization: "",
    });
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Card className="shadow mb-5">
              <Card.Header className="text-center">
                User Registration Form
              </Card.Header>
              <Card.Body>
                <fieldset>
                  <legend>Full Name</legend>
                  <Row>
                    <Col xs={6} className="mb-2 mb-sm-0">
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        placeholder="First Name"
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col xs={6} className="mb-2 mb-sm-0">
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                </fieldset>

                <Form.Group as={Row} controlId="gender" className="mb-3">
                  <Col>
                    <Form.Label column sm={2}>
                      Gender
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="gender"
                      value={user.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Other</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                <fieldset>
                  <legend>Contact Information</legend>
                  <Row>
                    <Col sm={6} className="mb-2 mb-sm-0">
                      <Form.Control
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        required
                      />
                    </Col>
                    <Col sm={6} className="mb-2 mb-sm-0">
                      <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Phone Number"
                        required
                      />
                    </Col>
                  </Row>
                </fieldset>

                <Form.Group as={Row} controlId="password" className="mb-3">
                  <Col>
                    <Form.Label column sm={2}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="user-type" className="mb-3">
                  <Col>
                    <Form.Label column sm={2}>
                      User Type
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="userType"
                      value={user.userType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select User Type</option>
                      <option value="VET">Veterinarian</option>
                      <option value="PATIENT">Patient</option>
                    </Form.Control>
                  </Col>
                </Form.Group>

                {user.userType === "VET" && (
                  <Form.Group>
                    <Row>
                      <Col>
                      <Form.Label>
                        Specialization
                      </Form.Label>
                        <VetSpecializationSelector value={user.specialization} onChange={handleInputChange}/>
                      </Col>
                    </Row>
                  </Form.Group>
                )}

                <div className="d-flex justify-content-center mb-3">
                  <Button
                    type="submit"
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <ProcessSpinner message="processing..." />
                    ) : (
                      "Register"
                    )}
                  </Button>

                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </div>

                {showErrorAlert && (
                  <AlertMessage type="danger" message={errorMessage} />
                )}
                {showSuccessAlert && (
                  <AlertMessage type="success" message={successMessage} />
                )}

                <div className="text-center">
                  Registered Already ?{" "}
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    Login here
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserRegistration;
