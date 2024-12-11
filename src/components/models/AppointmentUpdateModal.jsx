import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

const AppointmentUpdateModal = ({
  show,
  handleClose,
  appointment,
  handleUpdate,
}) => {
  const [appointmentDate, setAppointmentDate] = useState(
    new Date(appointment?.date)
  );

  const [appointmentTime, setAppointmentTime] = useState(
    new Date(`${appointment?.date}T${appointment?.time}`)
  );

  const [reason, setReason] = useState(appointment?.reason);

  const handleSubmit = () => {
    const updateAppointment = {
      ...appointment,
      appointmentDate: appointmentDate.toISOString().split("T")[0],
      appointmentTime: appointmentTime.toTimeString().split(" ")[0].substring(0, 5),
      reason:reason
    };
    handleUpdate(updateAppointment);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Appointment</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <FormGroup controlId="appointmentDate">
            <Form.Label className="me-2">Date</Form.Label>
            <DatePicker
              selected={appointmentDate}
              onChange={(date) => setAppointmentDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </FormGroup>

          <FormGroup controlId="appointmentTime" className="mt-4">
            <Form.Label className="me-2">Time</Form.Label>
            <DatePicker
              selected={appointmentTime}
              onChange={(time) => setAppointmentTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="HH:mm"
              className="form-control"
              placeholderText="Select Time"
              required
            />
          </FormGroup>

          <FormGroup controlId="reason" className="mt-2">
            <Form.Label className="me-2">Reason</Form.Label>
            <FormControl
              as={"textarea"}
              rows={3}
              placeholder="Enter Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </FormGroup>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">
          Close
        </Button>
        <Button onClick={handleSubmit} variant="info">
          Save Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AppointmentUpdateModal;
