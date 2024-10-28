import { api } from "../utils/api"
export const getVeterinarians = async ()=>{

  try{
      const result = await api.get("/veterinarians/get-all-veterinarians");
      //console.log(result)
      return result.data;
  }catch (error){
    throw error;
  }

}

export async function findAvailableVeterinarians(searchParams) {
  try {
    const queryParams = new URLSearchParams(searchParams);

    const result = await api.get(
      `/veterinarians/search-veterinarian?${queryParams}`
    );
    //console.log(result)
    return result.data;
  } catch (error) {
    throw error;
  }
}