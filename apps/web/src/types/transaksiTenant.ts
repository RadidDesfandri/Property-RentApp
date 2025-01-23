export enum Status {
  PENDING,
  CANCEL,
  CONFIRMATION,
  PAID,
}
export interface ITransaction {
  name: String;
  property: String;
  room: String;
  createdAt: String;
  status: String;
  id: String;
}

export interface User {
  username: string;
}

export interface Property {
  name: string;
}

export interface Room {
  type: string;
  tenant_Id: number;
  property: Property;
}

export interface IReservationList {
  createdAt: string;
  id: string;
  statusRes: String;
  startDate: string;
  endDate: string;
  user: User;
  room: Room;
}
