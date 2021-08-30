import axios, { AxiosResponse } from "axios";
import { Salon } from "./types";

const baseUrl = "http://localhost:8998/api";

export async function newSalon(Salon: Salon): Promise<AxiosResponse<Salon>> {
  return await axios.post<Salon>(`${baseUrl}/salon`, Salon);
}

export async function updateSalon(Salon: Salon): Promise<AxiosResponse<Salon>> {
  return await axios.patch<Salon>(`${baseUrl}/salon`, Salon);
}

// export async function deleteSalon(id: string): Promise<Salon> {
//   try {
//     const { data } = await axios.delete<Salon>(`${baseUrl}/salon`, {id});
//     return data;
//   } catch (error) {
//     return error;
//   }
// }

export async function getSalon(id: string): Promise<AxiosResponse<Salon>> {
  return await axios.get<Salon>(`${baseUrl}/salon/${id}`);
}

export async function allSalon(query?: any): Promise<AxiosResponse<Salon[]>> {
  return await axios.get<Salon[]>(
    `${baseUrl}/salons/query${query ? `?${query}` : "/"}`
  );
}
