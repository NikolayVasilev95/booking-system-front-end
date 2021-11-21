import axios, { AxiosResponse } from "axios";
import { CustomResponse } from "../types";
import { Employee } from "./types";

const baseUrl = "http://localhost:8998/api";

export async function newEmployee(
  Employee: Employee
): Promise<AxiosResponse<CustomResponse<Employee>>> {
  return await axios.post<CustomResponse<Employee>>(`${baseUrl}/employee`, {
    employee: Employee,
  });
}

export async function updateEmployee(
  Employee: Employee
): Promise<AxiosResponse<CustomResponse<Employee>>> {
  return await axios.patch<CustomResponse<Employee>>(`${baseUrl}/employee`, {
    employee: Employee,
  });
}

export async function deleteEmployee(
  id: string
): Promise<AxiosResponse<CustomResponse<string>>> {
  return await axios.delete(`${baseUrl}/employee`, { data: { id } });
}

export async function getEmployee(
  id: string
): Promise<AxiosResponse<CustomResponse<Employee>>> {
  return await axios.get<CustomResponse<Employee>>(`${baseUrl}/employee/${id}`);
}

export async function allEmployee(
  query?: any
): Promise<AxiosResponse<CustomResponse<Employee[]>>> {
  return await axios.get<CustomResponse<Employee[]>>(
    `${baseUrl}/employees/query${
      query ? `?${Object.keys(query).map((el) => `${el}=${query[el]}`)}` : "/"
    }`
  );
}
