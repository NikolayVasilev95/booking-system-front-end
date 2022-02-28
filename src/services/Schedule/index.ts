import axios, { AxiosResponse } from "axios";
import { queryUrl } from "../helper";
import { CustomResponse } from "../types";
import { Schedule } from "./types";

const baseUrl = "http://localhost:8998/api";

export async function newSchedule(
  schedule: Schedule
): Promise<AxiosResponse<CustomResponse<Schedule>>> {
  return await axios.post<CustomResponse<Schedule>>(`${baseUrl}/schedule`, {
    schedule,
  });
}

export async function updateSchedule(
  schedule: Schedule
): Promise<AxiosResponse<CustomResponse<Schedule>>> {
  return await axios.patch<CustomResponse<Schedule>>(`${baseUrl}/schedule`, {
    schedule,
  });
}

// export async function deleteSchedule(id: string): Promise<Schedule> {
//   try {
//     const { data } = await axios.delete<Schedule>(`${baseUrl}/schedule`, {id});
//     return data;
//   } catch (error) {
//     return error;
//   }
// }

export async function getSchedule(
  id: string
): Promise<AxiosResponse<CustomResponse<Schedule>>> {
  return await axios.get<CustomResponse<Schedule>>(`${baseUrl}/schedule/${id}`);
}

export async function allSchedule(
  query?: any
): Promise<AxiosResponse<CustomResponse<Schedule[]>>> {
  return await axios.get<CustomResponse<Schedule[]>>(
    `${baseUrl}/schedules?${queryUrl(query)}`
  );
}
