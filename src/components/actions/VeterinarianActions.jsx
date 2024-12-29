import React, { useState } from "react";
import ActionButtons from "./ActionButtons";
import ProcessSpinner from "../common/ProcessSpinner";

const VeterinarianActions = ({onDecline, onApprove, isDisabled, appointment}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingAction, setProcessingAction] = useState(null);

  const handleActionClick = (actionType) => {
    setIsProcessing(true);
    if (actionType === "Approve") {
      // Call the update function
      onApprove(appointment.id)
      setIsProcessing(false);
      setProcessingAction("Approve");
      
    } else {
      onDecline(appointment.id)
        .then(() => {
          setIsProcessing(false)
          setProcessingAction("Decline");
        })
        .catch(() => setIsProcessing(false));
    }
  };
  return (
    <section className="d-flex justify-content-start gap-2 mt-2 mb-2">
      <ActionButtons
        title={isProcessing && setProcessingAction==="Decline" ? (<ProcessSpinner message="Declining..."/>) :("Decline Appointment")}
        variant={"secondary"}
        onClick={() => handleActionClick("Decline")}
        disabled={isDisabled}
        isProcessing={isProcessing}
      />

      <ActionButtons
        title={isProcessing && setProcessingAction === "Approve" ? (<ProcessSpinner message="Approving..."/>) :("Approve Appointment")}
        variant={"success"}
        onClick={() => handleActionClick("Approve")}
        disabled={isDisabled}
        isProcessing={isProcessing}
      />
    </section>
  );
};

export default VeterinarianActions;
