import { Employee } from "../Employees/types";
import { Service } from "../Service/types";

export interface Position {
  id?: number;
  name: string;
  salonId: number;
  Employees?: Employee[];
  Services?: Service[];
}
