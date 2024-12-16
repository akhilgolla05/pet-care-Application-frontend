import { api } from "../utils/api";

export async function bookAppointment(senderId, recipientId, appointmentRequest) {
    try {
      const result = await api.post(
        `/appointments/book-appointment?senderId=${senderId}&recipientId=${recipientId}`,
        appointmentRequest
      );
        console.log("The result from here :",result);
      return result.data;
    } catch (error) {
      throw error;
    }
  
}

export const updateAppointment = async (appointmentId, appointmentData)=>{
  try{
    const response = 
    await api.put(`appointments/appointment/${appointmentId}/update`, appointmentData);
    return response
  }catch (error) {
    throw error;
  }
}

export const cancelAppointment = async (appointmentId) => {
  try{
    const response = await api.put(`appointments/appointment/${appointmentId}/cancel`)
    return response.data;
  }catch (error) {
    throw error;
  }
}

export const approveAppointment = async (appointmentId) => {
  try{
    const response = await api.put(`appointments/appointment/${appointmentId}/approve`)
    return response.data;
  }catch (error) {
    throw error;
  }
}

export const declineAppointment = async (appointmentId) => {
  try{
    const response = await api.put(`appointments/appointment/${appointmentId}/decline`)
    return response.data;
  }catch (error) {
    throw error;
  }
}

export const getAppointmentById = async (appointmentId) =>{
  try{
    const response = 
    await api.get(`/appointments/appointment/${appointmentId}/fetch/appointment`)
    return response.data;
  }catch(error){
    throw error;
  }
}

export const getAppointmentsSummary = async ()=>{
  try{
    const response = await api.get("/appointments/summary/appointments-summary");
    return response.data;
  }catch(error){
    throw error;
  }
}

/*   `/appointments/book-appointment/${senderId}/${recipientId}` */