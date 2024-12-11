import React, { useEffect, useState } from "react";
import UseMessageAlerts from "../hook/UseMessageAlerts";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "./UserService";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import ProcessSpinner from "../common/ProcessSpinner";
import AlertMessage from "../common/AlertMessage";
import { Link } from "react-router-dom";
import VetSpecializationSelector from "./VetSpecializationSelector";

const UserUpdate = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { userId } = useParams();

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

  useEffect(() => {
    setIsProcessing(true);
    const getUserData = async () => {
      try {
        const response = await getUserById(userId);
        setUser(response.data);
        setIsProcessing(false);
      } catch (error) {
        setErrorMessage(error.message);
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
        setIsProcessing(false);
      }
    };
    getUserData();
  }, [userId]);

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const haneleUserUpdate = async (e) => {
    e.preventDefault();
    const updatedUserData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
      specialization: user.specialization,
    };

    try {
      setIsProcessing(true);
      const response = await updateUser(updatedUserData, userId);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const navigate = useNavigate();
  const handleCancelEdit = () => {
    navigate(`/user-dashboard/${userId}/my-dashboard`);
  };
  return (
    <Container md={6} className="mt-5 d-flex justify-content-center">
      <Col md={7}>
        <Form onSubmit={haneleUserUpdate}>
          <Card className="shadow mb-5">
            <Card.Header className="text-center">
              Update User Information
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
                      onChange={handleUserInputChange}
                      required
                    />
                  </Col>
                  <Col xs={6} className="mb-2 mb-sm-0">
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      placeholder="Last Name"
                      onChange={handleUserInputChange}
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
                    onChange={handleUserInputChange}
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
                      onChange={handleUserInputChange}
                      placeholder="Enter Email"
                      disabled
                    />
                  </Col>
                  <Col sm={6} className="mb-2 mb-sm-0">
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleUserInputChange}
                      placeholder="Enter Phone Number"
                      required
                    />
                  </Col>
                </Row>
              </fieldset>

              <Form.Group as={Row} controlId="user-type" className="mb-3">
                <Col>
                  <Form.Label column sm={2}>
                    User Type
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="userType"
                    value={user.userType}
                    onChange={handleUserInputChange}
                    disabled
                  >
                    <option value="">Select User Type</option>
                    <option value="VET">Veterinarian</option>
                    <option value="PATIENT">Patient</option>
                  </Form.Control>
                </Col>
              </Form.Group>

              {user.userType === "VET" && (
                <Form.Group className="mb-2">
                  <Row>
                    <Col>
                      <Form.Label>Specialization</Form.Label>
                      <VetSpecializationSelector
                        value={user.specialization}
                        onChange={handleUserInputChange}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              )}
            
              {showErrorAlert && (
                <AlertMessage type="danger" message={errorMessage} />
              )}
              {showSuccessAlert && (
                <AlertMessage type="success" message={successMessage} />
              )}

              <div className="d-flex justify-content-center mb-3 mt-3">
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
                    "Update"
                  )}
                </Button>

                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={handleCancelEdit}
                >
                  Back to Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Form>
      </Col>
    </Container>
  );
};

export default UserUpdate;
