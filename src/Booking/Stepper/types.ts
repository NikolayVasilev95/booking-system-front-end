export interface Services {
  id?: number;
  name: string;
  description: string;
  price: string;
}
export interface Schedules {
  id?: number;
  name: string;
}
export interface Positions {
  id?: number;
  name: string;
  serviceId: string;
}
export interface Employees {
  id?: number;
  name: string;
  positionId: string;
}
