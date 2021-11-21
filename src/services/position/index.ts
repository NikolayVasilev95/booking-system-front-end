import axios, { AxiosResponse } from "axios";
import { CustomResponse } from "../types";
import { Position } from "./types";

const baseUrl = "http://localhost:8998/api";

export async function newPosition(
  Position: Position
): Promise<AxiosResponse<CustomResponse<Position>>> {
  console.log(Position);

  return await axios.post<CustomResponse<Position>>(`${baseUrl}/position`, {
    position: Position,
  });
}

export async function updatePosition(
  Position: Position
): Promise<AxiosResponse<CustomResponse<Position>>> {
  return await axios.patch<CustomResponse<Position>>(`${baseUrl}/position`, {
    position: Position,
  });
}

export async function deletePosition(
  id: string
): Promise<AxiosResponse<CustomResponse<string>>> {
  return await axios.delete(`${baseUrl}/position`, { data: { id } });
}

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
