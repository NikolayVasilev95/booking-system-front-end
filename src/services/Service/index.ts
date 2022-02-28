import axios, { AxiosResponse } from "axios";
import { CustomResponse } from "../types";
import { Service } from "./types";

const baseUrl = "http://localhost:8998/api";

export async function newService(
  service: Service
): Promise<AxiosResponse<CustomResponse<Service>>> {
  return await axios.post<CustomResponse<Service>>(
    `${baseUrl}/service`,
    service
  );
}

export async function updateService(
  position: Service
): Promise<AxiosResponse<CustomResponse<Service>>> {
  return await axios.patch<CustomResponse<Service>>(
    `${baseUrl}/service`,
    position
  );
}

// export async function deletePosition(id: string): Promise<Position> {
//   try {
//     const { data } = await axios.delete<Position>(`${baseUrl}/service`, {id});
//     return data;
//   } catch (error) {
//     return error;
//   }
// }

export async function getService(
  id: string
): Promise<AxiosResponse<CustomResponse<Service>>> {
  return await axios.get<CustomResponse<Service>>(`${baseUrl}/service/${id}`);
}

export async function allService(
  query?: any
): Promise<AxiosResponse<CustomResponse<Service[]>>> {
  return await axios.get<CustomResponse<Service[]>>(
    `${baseUrl}/services${
      query ? `?${Object.keys(query).map((el) => `${el}=${query[el]}`)}` : "/"
    }`
  );
}
