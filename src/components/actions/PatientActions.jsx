import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import AppointmentUpdateModal from "../models/AppointmentUpdateModal";

const PatientActions = ({ onCancel, onUpdate, isDisabled, appointment }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAppointmentUpdateModal, setShowAppointmentUpdateModal] =
    useState(false);

  const handleCloseModal = ()=>{
    setShowAppointmentUpdateModal(false);
  }

  const handleActionClick = (actionType) => {
    setIsProcessing(true);
    try {
      if (actionType === "Update") {
        setShowAppointmentUpdateModal(true);
        // onUpdate()
        //   .then(() => setIsProcessing(false))
        //   .catch(() => {
        //     setIsProcessing(false);
        //   });
        
      } else {
        onCancel(appointment.id);
        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error)
    } 
  };

  const handleUpdateAppointment = async(updatedAppointment)=>{

    setIsProcessing(true);
    try{
        await onUpdate(updatedAppointment);
        handleCloseModal()
        setIsProcessing(false);
    }catch (error) {
        console.error(error)
    }
  }

  return (
    <React.Fragment>
    <section className="d-flex justify-content-start gap-2 mt-2 mb-2">
      <ActionButtons
        title={"Cancel Apppintment"}
        variant={"danger"}
        onClick={() => onCancel(appointment.id)}
        disabled={isDisabled}
        isProcessing={isProcessing}
      />

      <ActionButtons
        title={"Update Appointment"}
        variant={"warning"}
        onClick={() => handleActionClick("Update")}
        disabled={isDisabled}
        isProcessing={isProcessing}
      />
    </section>
    {
      showAppointmentUpdateModal && 
      <AppointmentUpdateModal
      appointment={appointment}
      show={showAppointmentUpdateModal} 
      handleClose={handleCloseModal}
      handleUpdate={handleUpdateAppointment}
      />
    }
    </React.Fragment>
  );
};

export default PatientActions;
