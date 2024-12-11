import React, { useEffect } from "react";
import { useState } from "react";
import { getUserById } from "../user/UserService";
import UseMessageAlerts from "../hook/UseMessageAlerts";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import { updateUserPhoto, uploadUserPhoto } from "./ImageUploaderService";

const ImageUploaderModal = ({ userId, show, handleClose }) => {
  //1. get the user
  //2. check if user is already uploaded an image
  //3. if user uploaded an image, update the image
  //4. otherwise, upload new photo
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getUser = async () => {
    try {
      const response = await getUserById(userId);
      setSuccessMessage(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  const handleImageUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);

      if (user && user.photo) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = async () => {
          const fileBytes = new Uint8Array(e.target.result);
          const response = await updateUserPhoto(user.photoId, fileBytes);
          setSuccessMessage(response.data);
          window.location.reload();
          setShowSuccessAlert(true);
        };
      } else {
        const response = await uploadUserPhoto(userId, file);
        setSuccessMessage(response.data);
        window.location.reload();
        setShowSuccessAlert(true);
      }
    } catch (error) {
      //console.log(error);
      setErrorMessage(error.response?.data?.message);
      setShowErrorAlert(true);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload a Photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showErrorAlert && (
          <AlertMessage type={"danger"} message={errorMessage} />
        )}
        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMessage} />
        )}
        <Form>
          <h6>select the photo you would like to display on your profile</h6>
          <InputGroup>
            <Form.Control type="file" onChange={handleFileChange}/>
              <Button variant="secondary" onClick={handleImageUpload}>
                Upload
              </Button>
          </InputGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ImageUploaderModal;
