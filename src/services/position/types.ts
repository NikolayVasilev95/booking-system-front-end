import { Employee } from "../Employees";

export interface Position {
  id?: number;
  name: string;
  Employees?: Employee[];
}
