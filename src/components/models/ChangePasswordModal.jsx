import React, { useState } from "react";
import { eyeOff, eyeOn } from "react-icons-kit/feather";
import UseMessageAlerts from "../hook/UseMessageAlerts";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import Icon from "react-icons-kit";
import { changeUserPassword } from "../user/UserService";
import AlertMessage from "../common/AlertMessage";
const ChangePasswordModal = ({userId,show,handleClose}) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShowPassword = (e) => {
    if (type === "password") {
      setType("text");
      setIcon(eyeOn);
    } else {
      setType("password");
      setIcon(eyeOff);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await changeUserPassword(
        userId,
        password.currentPassword,
        password.newPassword,
        password.confirmNewPassword
      );
      setSuccessMessage(response.message);
      handleReset();
      setShowSuccessAlert(true);
    } catch (error) {
      console.log(error.response?.data?.message)
      setErrorMessage(error.response?.data?.message);
      setShowErrorAlert(true);
    }
  };

  const handleReset = () => {
    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showErrorAlert && (
          <AlertMessage type={"danger"} message={errorMessage} />
        )}

        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMessage} />
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="currentPassword">
            <Form.Label>Current Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={type}
                name="currentPassword"
                value={password.currentPassword}
                onChange={handleInputChange}
              />
              <InputGroup.Text onClick={handleShowPassword}>
                <Icon icon={icon} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="newPassword" className="mb-2">
            <Form.Label>New Password : </Form.Label>
            <Form.Control
              type={type}
              name="newPassword"
              value={password.newPassword}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="confirmNewPassword">
            <Form.Label>Confirm New Password : </Form.Label>
            <Form.Control
              type={type}
              name="confirmNewPassword"
              value={password.confirmNewPassword}
              onChange={handleInputChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-center mt-4">
            <div className="mx-2">
              <Button variant="secondary" size="sm" type="submit">
                Change Password
              </Button>
            </div>
            <div className="mx-2 mb-4">
              <Button variant="danger" size="sm">
                Reset
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
