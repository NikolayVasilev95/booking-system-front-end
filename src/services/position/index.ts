import axios, { AxiosResponse } from "axios";
import { CustomResponse } from "../types";
import { Position } from "./types";

const baseUrl = "http://localhost:8998/api";

export async function newPosition(
  position: Position
): Promise<AxiosResponse<CustomResponse<Position>>> {
  return await axios.post<CustomResponse<Position>>(
    `${baseUrl}/position`,
    position
  );
}

export async function updatePosition(
  position: Position
): Promise<AxiosResponse<CustomResponse<Position>>> {
  return await axios.patch<CustomResponse<Position>>(
    `${baseUrl}/position`,
    position
  );
}

// export async function deletePosition(id: string): Promise<Position> {
//   try {
//     const { data } = await axios.delete<Position>(`${baseUrl}/position`, {id});
//     return data;
//   } catch (error) {
//     return error;
//   }
// }

export async function getPosition(
  id: string
): Promise<AxiosResponse<CustomResponse<Position>>> {
  return await axios.get<CustomResponse<Position>>(`${baseUrl}/position/${id}`);
}

export async function allPosition(
  query?: any
): Promise<AxiosResponse<CustomResponse<Position[]>>> {
  return await axios.get<CustomResponse<Position[]>>(
    `${baseUrl}/positions/query${
      query ? `?${Object.keys(query).map((el) => `${el}=${query[el]}`)}` : "/"
    }`
  );
}
