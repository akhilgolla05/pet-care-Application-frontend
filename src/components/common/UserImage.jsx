import React, { Fragment } from 'react'
import { Card } from 'react-bootstrap'
//import placeholder from "../../assets/images/placeholder.jpg";

const UserImage = ({userId,userPhoto,placeholder,alt="User Photo"}) => {
  return (
    <Fragment>
      {userPhoto ? (
                  <Card.Img
                    src={`data:image/png;base64, ${userPhoto}`}
                    className="user-image"
                    alt={alt}
                  />
                ) : (
                  <Card.Img
                    src={placeholder}
                    className="user-image"
                    alt={alt}
                  />
                )}
    </Fragment>
  )
}

export default UserImage
