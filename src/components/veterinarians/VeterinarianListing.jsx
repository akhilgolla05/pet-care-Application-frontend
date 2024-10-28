import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VeterinarianCard from "./VeterinarianCard";
import { getVeterinarians } from "./VeterinarianService";
import SearchVeterinarian from "./SearchVeterinarian";
import UseMessageAlerts from "../hook/UseMessageAlerts";

const VeterinarianListing = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [allVeterinarians, setAllVeterinarians] = useState([]);
  //const [errorMessage, setErrorMessage] = useState("");
  const { errorMessage, setErrorMessage, showErrorAlert, setShowErrorAlert } =
    UseMessageAlerts();

  useEffect(() => {
    getVeterinarians()
      .then((data) => {
        setVeterinarians(data.data);
        setAllVeterinarians(data.data);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setShowErrorAlert(true);
      });
  }, []);

  if (veterinarians.length == 0) {
    return <p>No Veterinarian Available at this time!</p>;
  }

  const handleSearchResult = (veterinarians) => {
    if (veterinarians === null) {
      setVeterinarians(allVeterinarians);
      setShowErrorAlert(false);
    } else if (Array.isArray(veterinarians) && veterinarians.length > 0) {
      setVeterinarians(veterinarians);
    } else {
      setVeterinarians([]);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <h6 className="text-center mb-4 mt-4">Meet Our Veterinarians</h6>
      </Row>
      <Row className="justify-content-center">
        <Col md={4}>
          <SearchVeterinarian onSearchResult={handleSearchResult} />
        </Col>
        <Col md={7}>
          {veterinarians.map((vet, index) => (
            <VeterinarianCard key={index} vet={vet} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default VeterinarianListing;
