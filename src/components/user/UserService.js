import { api } from "../utils/api";

export const getUserById = async (userId)=>{

    try{
        const result = await api.get(`/users/user/${userId}`);
        return result.data
    }catch(error){
        throw error;
    }

}

export const getAllVetSpecialization = async ()=>{
    try{
        const result = await api.get(`/veterinarians/specializations`);
        return result.data
    }catch(error){
        throw error;
    }
}

export const registerUser = async (user)=>{
    try{
        const result = await api.post(`/users/register`,user);
        return result.data
    }catch(error){
        throw error;
    }
}

export const changeUserPassword = async (userId, currentPassword, newPassword, confirmNewPassword)=>{

    const requestData = {currentPassword,newPassword,confirmNewPassword}
    try{
        const response = api.put(`/users/user/${userId}/change-password`, requestData)
        return response.data
    }catch(error){
        throw error;
    }

}

export const updateUser = async(updatedUserData, userId)=>{
    try{
        const response = await api.put(`/users/user/${userId}/update`,updatedUserData)
        return response.data
    }catch(error){
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try{
        const result = await api.delete(`/users/user/${userId}/delete`)
        return result.data
    }catch(error){
        throw error;
    }
}

export const countVeterinarians = async () => {
    try{
        const response = await api.get("/users/count/veterinarians")
        return response.data;
    }catch(error){
        throw error;
    }
}

export const countPatients = async () => {
    try{
        const response = await api.get("/users/count/patients")
        return response.data;
    }catch(error){
        throw error;
    }
}

export const countUsers= async () => {
    try{
        const response = await api.get("/users/count/users")
        return response.data;
    }catch(error){
        throw error;
    }
}

export const countAppointments= async () => {
    try{
        const response = await api.get("/appointments/count/appointments")
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getAggregateUsersByMonthAndType= async () => {
    try{
        const response = await api.get("/users/aggregated-users")
        return response.data;
    }catch(error){
        throw error;
    }
}

export const getAggregatedAccountsByAccountStatus = async ()=>{
    try{
        const response = await api.get("/users/account/aggregated-by-status");
        return response.data;
    }catch(error){
        throw error;
    }
}

export const aggregateVetBySpecialization = async () => {
    try {
      const response = await api.get("/veterinarians/vet/get-by-specialization");
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  /* This function disables a user account */
export async function lockUserAccount(userId) {
    try {
      const result = await api.put(`/users/account/${userId}/lock-user-account`);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  
  /* This function disables a user account */
  export async function unLockUserAccount(userId) {
    try {
      const result = await api.put(
        `/users/account/${userId}/unLock-user-account`
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  }



