import { Employee } from "../Employees";
import { Service } from "../Service/types";

export interface Position {
  id?: number;
  name: string;
  Employees?: Employee[];
  Services?: Service[];
}
