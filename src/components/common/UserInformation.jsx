import React from 'react'

const UserInformation = ({userType, appointment}) => {
  return (
    <div className='mt-2 mb-2' style={{backgroundColor:"whitesmoke"}}>
      <h5>{userType==="VET" ? "Patient" : "Veterinarian"} Information</h5>
      {
        userType === "VET" ? (
            <React.Fragment>
                <p className='text-info'>Appointment Number : {appointment.appointmentNo}</p>
                <p>
                    Name : {appointment.patient.firstName} {appointment.patient.lastName}
                </p>
                <p>Email : {appointment.patient.email}</p>
                <p className='text-primary'>Phone Number : {appointment.patient.phoneNumber}</p>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <p className='text-info'>Appointment Number : {appointment.appointmentNo}</p>
                <p>
                    Name : Dr. {appointment.veterinarian.firstName} {appointment.veterinarian.lastName}
                </p>
                {/* <p>Email : {appointment.veterinarian.email}</p> */}
                <p className='text-info'>Specialization : {appointment.veterinarian.specialization}</p>
                <p className='text-primary'>Phone Number : {appointment.veterinarian.phoneNumber}</p>
            </React.Fragment>
        )
      }
    </div>
  )
}

export default UserInformation
