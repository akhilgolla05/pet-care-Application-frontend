import React, { useEffect, useState } from "react";
import { Accordion, Alert, Button, Col, Container, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import PetsTable from "../pet/PetsTable";
import { formatAppointmentStatus, UserType } from "../utils/utilities";
import useColorMapping from "../hook/ColorMapping";
import PatientActions from "../actions/PatientActions";
import VeterinarianActions from "../actions/VeterinarianActions";
import UseMessageAlerts from "../hook/UseMessageAlerts";
import {
  approveAppointment,
  cancelAppointment,
  declineAppointment,
  getAppointmentById,
  updateAppointment,
} from "./AppointmentService";
import AlertMessage from "../common/AlertMessage";
import UserInformation from "../common/UserInformation";
import { Link, useParams } from "react-router-dom";
import AppointmentFilter from "./AppointmentFilter";
import Paginator from "../common/Paginator";

const UserAppointments = ({ user, appointments: initialAppointments }) => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const { recepientId } = useParams();

  const [ selectedStatus, setSelectedStatus ] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [apppointmentsPerPage, setAppointmentsPerPage] = useState(4);

  const {
    successMessage,
    setSuccessMessage,
    showSuccessAlert,
    setShowSuccessAlert,
    errorMessage,
    setErrorMessage,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMessageAlerts();

  //update pets information
  const handlePetUpdate = async (updatedAppointmentId) => {
    try{
      await fetchAppointment(updatedAppointmentId);
    }catch(error){
      console.error(error);
    }
  };

  const fetchAppointment = async (appointmentId) =>{
    try{
      const response = await getAppointmentById(appointmentId);
      const updatedAppointment = response.data;
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === updatedAppointment.id
            ? updatedAppointment
            : appointment
        )
      );
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAppointment()
  },[])


  //for vets
  //1. Approve Appointment
  const handleApproveAppointment = async (appointmentId) => {
    try {
      const response = await approveAppointment(appointmentId);
      console.log("Approve : 1 ", response);
      setSuccessMessage(response.message);
      showSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
  };
  //2. Decline Appointment
  const handleDeclineAppointment = async (appointmentId) => {
    try {
      const response = await declineAppointment(appointmentId);
      setSuccessMessage(response.message);
      showSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  //for patients
  //1. Cancel Appointment
  const handleCancelAppointment = async (id) => {
    try {
      const response = await cancelAppointment(id);
      setSuccessMessage(response.message);
      showSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowErrorAlert(true);
    }
  };
  //2. Update Appointment
  const handleUpdateAppointment = async (updatedAppointment) => {
    try {
      const result = await updateAppointment(
        updatedAppointment.id,
        updatedAppointment
      );
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === updatedAppointment.id
            ? updatedAppointment
            : appointment
        )
      );
      console.log("The Result from Update : " + result);
      setSuccessMessage(result.message);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onSelectStatus = (status) => {
    setSelectedStatus(status);
  };

  const handleClearFilter = () => {
    setSelectedStatus("all");
  };

  const statuses = Array.from(
    new Set(appointments.map((appointment) => appointment.status))
  );

  useEffect(() => {
    let filter = appointments;
    if (selectedStatus && selectedStatus !== "all") {
      filter = appointments.filter(
        (appointment) => appointment.status === selectedStatus
      );
    }
    setFilteredAppointments(filter);
  }, [selectedStatus, appointments]);


  //pagination
  const indexOfLastVet = currentPage * apppointmentsPerPage;
  const indexOfFirstVet = indexOfLastVet - apppointmentsPerPage;

  const currentAppointments = appointments.slice(indexOfFirstVet,indexOfLastVet );

  const colors = useColorMapping();
  return (
    <Container className="p-5">
      {showSuccessAlert && (
        <AlertMessage type="success" message={successMessage} />
      )}

      {showErrorAlert && <AlertMessage type="danger" message={errorMessage} />}

      <AppointmentFilter
        onClearFilters={handleClearFilter}
        statuses={statuses}
        onSelectStatus={onSelectStatus}
      />

      <Accordion className="mt-4 mb-5">
        {currentAppointments.map((appointment, index) => {
          const formattedStatus = formatAppointmentStatus(appointment.status);
          const statusColor = colors[formattedStatus] || colors["default"];
          const isWaitingForApporoval =
            formattedStatus === "waiting-for-approval";
          const isApproved = formattedStatus === "approved";

          return (
            <Accordion.Item eventKey={index} key={index} className="mb-2">
              <Accordion.Header>
                <div>
                  <div className="mb-2">Date : {appointment.date}</div>
                  <div style={{ color: statusColor }}>
                    Status : {formattedStatus}
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col md={4} className="mt-2">
                    <p>
                      Appointment Number :{" "}
                      <span className="text-info">
                        {appointment.appointmentNo}
                      </span>{" "}
                    </p>

                    <ReactDatePicker
                      selected={
                        appointment.date && appointment.time
                          ? new Date(`${appointment.date}T${appointment.time}`)
                          : null
                      }
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="Select Time" // Updated caption
                      dateFormat="MMMM d, yyyy h:mm aa" // Fixed minute placeholder
                      inline
                    />
                    <p>
                      Time :
                      <span className="text-info"> {appointment.time}</span>{" "}
                      <p>Reason : {appointment.reason}</p>
                    </p>
                  </Col>

                  <Col md={8} className="mt-2">
                    <h4>Pets</h4>
                    <PetsTable
                      pets={appointment.pets}
                      appointmentId={appointment.id}
                      handlePetUpdate={handlePetUpdate}
                      isEditable={isWaitingForApporoval}
                      isPatient={user.userType === UserType.PATIENT}
                    />
                  </Col>

                  {isApproved && (
                    <UserInformation
                      userType={user.userType}
                      appointment={appointment}
                    />
                  )}
                </Row>

                {
                  showErrorAlert && <AlertMessage type={"danger"} message={errorMessage}/>
                }
                {
                  showSuccessAlert && <AlertMessage type={"success"} message={successMessage}/>
                }

                {user.userType === "PATIENT" && (
                  <Link to={`/book-appointment/${recepientId}/new-appointment`}>
                    Book New Appointment
                  </Link>
                )}

                <div>
                  <div>
                    {user.userType === "PATIENT" && (
                      <PatientActions
                        onCancel={handleCancelAppointment}
                        onUpdate={handleUpdateAppointment}
                        isDisabled={!isWaitingForApporoval}
                        appointment={appointment}
                      />
                    )}
                  </div>
                  <div>
                    {user.userType === "VET" && (
                      <VeterinarianActions
                        onApprove={handleApproveAppointment}
                        onDecline={handleDeclineAppointment}
                        isDisabled={!isWaitingForApporoval}
                        appointment={appointment}
                      />
                    )}
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>

      <Paginator itemsPerPage={apppointmentsPerPage}
      totalItems={filteredAppointments.length}
      currentPage={currentPage}
      paginate={setCurrentPage}/>
    </Container>
  );
};

export default UserAppointments;
