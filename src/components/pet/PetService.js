import { api } from "../utils/api";

export async function getAllPetTypes() {
  try {
    const result = await api.get("/pets/get-types");
    return result.data;
  } catch (error) {
      throw error;
  }
}

export async function getAllPetColors() {
  try {
    const result = await api.get("/pets/get-pet-colors");
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllPetBreeds(petType) {
  try {
    console.log("Getting breeds for pet type: ", petType);
    const result = await api.get(`/pets/get-pet-breeds?petType=${petType}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}

export const updatePet = async (petId, updatePet)=>{
  try{
    const response =  await api.put(`/pets/pet/${petId}/update`, updatePet);
    return response.data;
  }catch (error) {
    throw error;
  }
}

export const deletePet = async (petId)=>{
  try{
    const response =  await api.delete(`/pets/pet/${petId}/delete`);
    return response.data;
  }catch (error) {
    throw error;
  }
}
