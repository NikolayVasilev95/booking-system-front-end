import axios, { AxiosResponse } from "axios";
import { CustomResponse } from "../types";
import { Salon } from "./types";

const baseUrl = "http://localhost:8998/api";

export async function newSalon(
  Salon: Salon
): Promise<AxiosResponse<CustomResponse<Salon>>> {
  return await axios.post<CustomResponse<Salon>>(`${baseUrl}/salon`, {
    salon: Salon,
  });
}

export async function updateSalon(
  Salon: Salon
): Promise<AxiosResponse<CustomResponse<Salon>>> {
  return await axios.patch<CustomResponse<Salon>>(`${baseUrl}/salon`, {
    salon: Salon,
  });
}

export async function deleteSalon(
  id: string
): Promise<AxiosResponse<CustomResponse<string>>> {
  return await axios.delete(`${baseUrl}/salon`, { data: { id } });
}

export async function getSalon(
  id: string
): Promise<AxiosResponse<CustomResponse<Salon>>> {
  return await axios.get<CustomResponse<Salon>>(`${baseUrl}/salon/${id}`);
}

export async function allSalon(
  query?: any
): Promise<AxiosResponse<CustomResponse<Salon[]>>> {
  return await axios.get<CustomResponse<Salon[]>>(
    `${baseUrl}/salons/query${query ? `?${query}` : "/"}`
  );
}
