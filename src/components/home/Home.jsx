import React from "react";
import d5 from "../../assets/images/d5.jpg";
import vett from '../../assets/images/vett.jpg'
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="home-container mt-5">
      <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Img
              variant="top"
              src={d5}
              alt="About Us"
              className="hero-image"
            />
            <Card.Body>
              <h2 className="text-info">Who We Are</h2>
              <Card.Title>Comprehensive Care for Your Furry Friend</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
                asperiores! Omnis voluptatum soluta quis quae unde iste eius,
                quos sunt illum iusto doloribus. Doloremque, laboriosam? Officia
                explicabo sit repellendus rerum qui quaerat possimus ullam,
                reprehenderit quia. Dignissimos quod eveniet cumque!
              </Card.Text>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptas error consectetur rerum, incidunt neque ratione quia
                magnam necessitatibus, voluptatem nemo accusantium nesciunt.
                Dolores laboriosam voluptas, nesciunt sint asperiores expedita
                ratione odio in? Est nihil earum voluptates soluta ullam dicta
                voluptatibus deleniti facere impedit commodi quae distinctio,
                sequi dignissimos eos perspiciatis.
              </Card.Text>
              <Button variant="outline-info">Meet Our Vaterinarinas</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Img
              variant="top"
              src={vett}
              alt="About Us"
              className="hero-image"
            />
            <Card.Body>
              <h2 className="text-info">Our Services</h2>
              <Card.Title>What we do </Card.Title>
              {/* variant="flush" */}
              <ListGroup className="services-list">
                <ListGroup.Item>Veternary Check-ups</ListGroup.Item>
                <ListGroup.Item>Dental Care</ListGroup.Item>
                <ListGroup.Item>Emergency Surgery</ListGroup.Item>
                <ListGroup.Item>Spraying and Neutering</ListGroup.Item>
                <ListGroup.Item>And Many more...</ListGroup.Item>
              </ListGroup>
              <Card.Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
                dolorem!
              </Card.Text>
              <Button variant="outline-info">Meet Our Veterinarians</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="card mb-5">
        <h4>
          What People say About us{" "}
          <span className="text-info">Universal PetCare </span>veterinarians
        </h4>
        <hr />
        <p className="text-center">Here, We are going to sliding veterinarians across</p>
      </div>
    </Container>
  );
};

export default Home;
