import React, { useState } from "react";
import ActionButtons from "./ActionButtons";

const VeterinarianActions = ({onDecline, onApprove, isDisabled, appointment}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleActionClick = (actionType) => {
    setIsProcessing(true);
    if (actionType === "Approve") {
      // Call the update function
      onApprove(appointment.id)
      setIsProcessing(false);
      
    } else {
      onDecline(appointment.id)
        .then(() => setIsProcessing(false))
        .catch(() => setIsProcessing(false));
    }
  };
  return (
    <section className="d-flex justify-content-start gap-2 mt-2 mb-2">
      <ActionButtons
        title={"Decline Apppintment"}
        variant={"secondary"}
        onClick={() => handleActionClick("Decline")}
        disabled={isDisabled}
        isProcessing={isProcessing}
      />

      <ActionButtons
        title={"Approve Appointment"}
        variant={"success"}
        onClick={() => handleActionClick("Approve")}
        disabled={isDisabled}
        isProcessing={isProcessing}
      />
    </section>
  );
};

export default VeterinarianActions;
