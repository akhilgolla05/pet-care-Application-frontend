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

