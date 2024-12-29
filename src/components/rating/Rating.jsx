import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import { addReview } from "../review/ReviewService";
import { useParams } from "react-router-dom";
import UseMessageAlerts from "../hook/UseMessageAlerts";

const Rating = ({ veterinarianId, onReviewSubmit }) => {
  const [hover, setHover] = useState(null);
  const [stars, setStars] = useState(null);
  const [feedback, setFeedback] = useState("");

  const {
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
    showSuccessAlert,
    showErrorAlert,
    setShowSuccessAlert,
    setShowErrorAlert,
  } = UseMessageAlerts();

  const reviewerId = 4;

  //  const{veterinarianId} = useParams()

   const handleRatingChange = (value) => {  
    setStars(value);  
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewInfo = {
      stars: stars,
      feedback: feedback,
    };

    try {
      console.log("The riview info", reviewInfo);
      const response = await addReview(veterinarianId, reviewerId, reviewInfo);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
      if (onReviewSubmit) {
        onReviewSubmit();
      }
    } catch (error) {
      if (error.status == 401) {
        setErrorMessage("You must be logged in to Submit a Review.");
        setShowErrorAlert(true);
      } else {
        setErrorMessage(error.message);
        setShowErrorAlert(true);
      }
    }
  };

  return (
    <React.Fragment>
      {showErrorAlert && (
        <AlertMessage type={"danger"} message={errorMessage} />
      )}

      {showSuccessAlert && (
        <AlertMessage type={"success"} message={successMessage} />
      )}

      <Form onSubmit={handleSubmit}>
        <h3>Rate this doctor :</h3>
        <div className='mb-2'>
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <Form.Label key={index} className='me-2'>
                <Form.Control
                  type='radio'
                  name='rating'
                  value={ratingValue}
                  onChange={() => handleRatingChange(ratingValue)}
                  checked={stars === ratingValue}
                />
                <FaStar
                  size={20}
                  className='star'
                  color={
                    ratingValue <= (hover || stars) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </Form.Label>
            );
          })}
        </div>
        <Form.Group controlId='feedback'>
          <Form.Control
            as='textarea'
            row={4}
            value={feedback}
            required
            onChange={handleFeedbackChange}
            placeholder='Leave a feedback message'
          />
        </Form.Group>

        <div className='mt-2'>
          <Button type='submit' variant='outline-primary'>
            Submit review
          </Button>
        </div>
        <p>
          You have rated this doctor with{" "}
          <span style={{ color: "orange" }}>{stars} stars</span>
        </p>
      </Form>
    </React.Fragment>
  );
};

export default Rating;
