export interface IReservationById {
  id: string;
  price: number;
  startDate: string;
  endDate: string;
  method: string;
  paymentProof: string;
  paymentLink: string | null;
  statusRes: string;
  createdAt: string;
  updatedAt: string;
  user_Id: number;
  room_Id: string;
  user: { username: string; phone: string; email: string };
  room: {
    price: number;
    capacity: number;
    type: string;
    pricediscount: number;
    property: {
      id: string;
      name: string;
      category: string;
      location: string;
      thumbnail: string;
    };
  };
}
