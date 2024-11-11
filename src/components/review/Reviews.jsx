import React from "react";
import { UserType } from "../utils/utilities";
import UserImage from "../common/UserImage";
import RatingStars from "../rating/RatingStars";
import placeholder from "../../assets/images/placeholder.jpg";

const Reviews = ({ review, userType }) => {
  const displayName =
    userType === UserType.PATIENT
      ? `You rated Dr. ${review.vetName}`
      : `Reviewed by: ${review.reviewerName}`;

  return (
    <div className='mb-4'>
      <div className='d-flex align-item-center me-5'>
      
        {userType === UserType.VET ? (
          <UserImage
            userId={review.reviewerId}
            userPhoto={review.reviewerImage}
            placeholder={placeholder}
          />
        ) : (                  
          <UserImage
            userId={review.vetId}
            userPhoto={review.vetImage}
          />
        )}

        <div>
          <div>
            <h5 className='title ms-3'>
              <RatingStars rating={review.stars} />
            </h5>
          </div>
          <div className='mt-4'>
            <p className='review-text ms-4'>{review.feedback}</p>
          </div>
          <div>
            <p className="ms-4">{displayName}</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Reviews;
