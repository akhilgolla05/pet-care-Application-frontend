import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const AddItemModel = ({ show, handleClose, handleSave, itemLabel }) => {
  const [itemValue, setItemValue] = useState("");

  const handleSaveItem = () => {
    handleSave(itemValue);
    setItemValue("");
    handleClose();
    };
    
    const handleInputChange = (e) => {
        setItemValue(e.target.value);
    };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New {itemLabel}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{itemLabel} Name </Form.Label>
            <Form.Control
              type='text'
              placeholder={`Enter ${itemLabel} name`}
              value={itemValue}
              onChange={handleInputChange}/>
          </Form.Group>
        </Form>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleSaveItem}>
            Add
          </Button>
          <Button variant='danger' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default AddItemModel;
