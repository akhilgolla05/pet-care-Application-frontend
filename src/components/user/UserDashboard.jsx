import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserProfile from "./UserProfile";
import UseMessageAlerts from "../hook/UseMessageAlerts";
import { deleteUser, getUserById } from "./UserService";
import { deleteUserPhoto } from "../models/ImageUploaderService";
import AlertMessage from "../common/AlertMessage";
import Reviews from "../review/Reviews";
import UserAppointments from "../appointment/UserAppointments.Jsx";
import CustomPieChart from "../charts/CustomPieChart";
import { formatAppointmentStatus } from "../utils/utilities";
import NoDataAvailable from "../common/NoDataAvailable";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]); 

  const [activeKey, setActiveKey] = useState(() => {
    const storedActiveKey = localStorage.getItem("activeKey");
    return storedActiveKey ? storedActiveKey : "profile";
  });

  const { userId } = useParams();

  const {
    errorMessage,
    setErrorMessage,
    showErrorAlert,
    setShowErrorAlert,
    successMessage,
    setSuccessMessage,
    showSuccessAlert,
    setShowSuccessAlert,
  } = UseMessageAlerts();

  useEffect(() => {
    const getUSer = async () => {
      try {
        const response = await getUserById(userId);
        setUser(response.data);
        setAppointments(response.data.appointments);
      } catch (e) {
        setErrorMessage(e.response.data.message);
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
      }
    };
    getUSer();
  }, [userId]);


  useEffect(() => {
    if (user && user.appointments) {
      const statusCounts = user.appointments.reduce((acc, appointment) => {
        const formattedStatus = formatAppointmentStatus(appointment.status);
        if (!acc[formattedStatus]) {
          acc[formattedStatus] = {
            name: formattedStatus,
            value: 1,
          };
        } else {
          acc[formattedStatus].value += 1;
        }
        return acc;
      }, {});

      const transformedData = Object.values(statusCounts);
      setAppointmentData(transformedData);
      setAppointments(user.appointments);
      console.log("Here is the transform data: ", transformedData);
    }
  }, [user]);

  const handleRemovePhoto = async () => {
    try {
      const response = await deleteUserPhoto(user.photoId, user.id);
      setSuccessMessage(response.message);
      window.location.reload();
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUser(userId);
      setSuccessMessage(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorAlert(true);
    }
  };

  const handleTabSelect = (key) => {
    setActiveKey(key);
    localStorage.setItem("activeKey", key);
  };

  return (
    <Container className="mt-2 user-dashboard">
      {showErrorAlert && <AlertMessage type="danger" message={errorMessage} />}
      {showSuccessAlert && (
        <AlertMessage type="success" message={successMessage} />
      )}
      <Tabs
        className="mb-2"
        justify
        activeKey={activeKey}
        onSelect={handleTabSelect}
      >
        <Tab eventKey="profile" title={<h3>Profile</h3>}>
          {user && (
            <UserProfile
              user={user}
              handleRemovePhoto={handleRemovePhoto}
              handleDeleteAccount={handleDeleteAccount}
            />
          )}
        </Tab>
        <Tab eventKey="status" title={<h3>Appointments Overview</h3>}>
          <Row>
            <Col>
            {appointmentData && appointmentData.length > 0 ? (
                <CustomPieChart data={appointmentData} />
              ) : (
                <NoDataAvailable dataType={"appointment data"} />
              )}
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="appointments" title={<h3>Appointment Details</h3>}>
          <Row>
            <Col>
            {user && (
                <React.Fragment>
                  {appointments && appointments.length > 0 ? (
                    <UserAppointments user={user} appointments={appointments} />
                  ) : (
                    <NoDataAvailable dataType={"appointment data"} />
                  )}
                </React.Fragment>
              )}
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="reviews" title={<h3>Reviews</h3>}>
        <Container className='d-flex justify-content-center align-items-center'>
            <Card className='mt-5 mb-4 review-card'>
              <h4 className='text-center mb-2'>Your Reviews</h4>
              <hr />
              <Row>
                <Col>
                  {user && user.reviews && user.reviews.length > 0 ? (
                    user.reviews.map((review, index) => (
                      <Review key={index} review={review} />
                    ))
                  ) : (
                    <NoDataAvailable dataType={"review data"} />
                  )}
                </Col>
              </Row>
            </Card>
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserDashboard;
