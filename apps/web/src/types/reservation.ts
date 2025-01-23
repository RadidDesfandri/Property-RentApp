export interface IReservation {
  price: number;
  startDate: Date;
  endDate: Date;
}
export interface Property {
  id: number;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  tenant_Id: number;
}

export interface Room {
  id: number;
  type: string;
  price: number;
  capacity: number;
  description: string;
  facility: string;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
  property_Id: number;
  tenant_Id: number;
  property: Property;
}

export interface Booking {
  id: string;
  price: number;
  startDate: string;
  endDate: string;
  paymentProof: string;
  paymentLink: string;
  statusRes: string;
  createdAt: string;
  updatedAt: string;
  user_Id: number;
  room_Id: number;
  room: Room;
}

export interface DataResponse {
  data: Booking[];
}

export interface ICreateReservation {
  guest: number;
  total: number;
  startDate: Date;
  endDate: Date;
  room_id: string;
}
