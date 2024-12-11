import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import AddItemModel from "../models/AddItemModel";
import { getAllVetSpecialization } from "./UserService";
import {Col} from "react-bootstrap"

const VetSpecializationSelector = ({value, onChange}) => {
  const [vetSpecialization, setVetSpecialization] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (vetSpecialization) {
      const fetchAllVetSpecialization = async () => {
        try {
          const result = await getAllVetSpecialization();
          setVetSpecialization(result.data);
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchAllVetSpecialization();
    } else {
      setVetSpecialization([]);
    }
  }, []);

  //handle breed change
  const handleVetSpecilization = (e) => {
    if (e.target.value === "add-new-item") {
      setShowModal(true);
    } else {
      onChange(e);
    }
  };

  //handle save new item
  const handleSaveNewItem = (newItem) => {
    if (newItem && !vetSpecialization.includes(newItem)) {
      setVetSpecialization([...vetSpecialization, newItem]);
      onChange({ target: { name: "specialization", value: newItem } });
    }
  };

  return (
    <React.Fragment>
      <Form.Group as={Col} controlId="specialization">
        <Form.Control
          as="select"
          name="specialization"
          value={value}
          required
          onChange={handleVetSpecilization}
        >
          <option value="">select Specialization</option>
          {vetSpecialization.map((specialization,index) => (
            <option key={specialization} value={specialization}>
              {specialization}
            </option>
          ))}
          <option value="add-new-item">Add New</option>
        </Form.Control>
      </Form.Group>
      <AddItemModel
        show={showModal}
        handleClose={() => setShowModal(false)}
        itemLabel={"Specialization"}
        handleSave={handleSaveNewItem}
      />
    </React.Fragment>
  );
};

export default VetSpecializationSelector;
