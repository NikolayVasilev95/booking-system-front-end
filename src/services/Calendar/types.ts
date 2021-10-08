import { Schedule } from "../Schedule/types";

export interface Calendar {
  id?: number;
  name: string;
  Schedules: Schedule[];
}
