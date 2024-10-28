import React from "react";
import { Accordion, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import placeholder from "../../assets/images/placeholder.jpg";
import UserImage from "../common/UserImage";

const VeterinarianCard = ({ vet }) => {
  return (
    // in small screen it shows full screen xs={12}, medium half of the screen
    <Col key={vet.id} className="mb-4" xs={12}>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="d-flex align-items-center">
              <Link>
                <UserImage userId={vet.id} userPhoto={vet.photo} placeholder={placeholder}/>
              </Link>
            </div>
            <div className="px-4">
              <Card.Title className="title">
                Dr.{vet.firstName} {vet.lastName}
              </Card.Title>
              <Card.Title>
                <h6>{vet.specialization}</h6>
              </Card.Title>
              <Card.Text className="review rating-stars">Reviews : some stars</Card.Text>
              <Link to={""} className="link">Book Appointment</Link>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <Link to={""} className="link-2">See What People Are Saying About </Link>
              <span className="margin-left-space">Dr.{vet.firstName}</span>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  );
};

export default VeterinarianCard;
