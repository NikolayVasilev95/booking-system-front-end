import axios, { AxiosResponse } from "axios";
import { CustomResponse } from "../types";
import { Calendar } from "./types";

const baseUrl = "http://localhost:8998/api";

export async function newCalendar(
  Calendar: Calendar
): Promise<AxiosResponse<CustomResponse<Calendar>>> {
  return await axios.post<CustomResponse<Calendar>>(
    `${baseUrl}/calendar`,
    Calendar
  );
}

export async function updateCalendar(
  Calendar: Calendar
): Promise<AxiosResponse<CustomResponse<Calendar>>> {
  return await axios.patch<CustomResponse<Calendar>>(
    `${baseUrl}/calendar`,
    Calendar
  );
}

// export async function deleteCalendar(id: string): Promise<Calendar> {
//   try {
//     const { data } = await axios.delete<Calendar>(`${baseUrl}/calendar`, {id});
//     return data;
//   } catch (error) {
//     return error;
//   }
// }

export async function getCalendar(
  id: string
): Promise<AxiosResponse<CustomResponse<Calendar>>> {
  return await axios.get<CustomResponse<Calendar>>(`${baseUrl}/calendar/${id}`);
}

export async function allCalendar(
  query?: any
): Promise<AxiosResponse<CustomResponse<Calendar[]>>> {
  return await axios.get<CustomResponse<Calendar[]>>(
    `${baseUrl}/calendars/query${
      query ? `?${Object.keys(query).map((el) => `${el}=${query[el]}`)}` : "/"
    }`
  );
}
