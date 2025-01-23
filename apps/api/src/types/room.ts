export interface IRooms {
  price: number;
  pricediscount: number;
  capacity: number;
  description: string;
  type: string;
}

export interface GetRoomsParams {
  sortBy?: 'name' | 'price';
  sortOrder?: 'asc' | 'desc';
  propertyName?: string;
  category?: string;
  location?: string;
  page?: number;
  take?: number;
  startDate?: Date;
  endDate?: Date;
  minPrice: number;
  maxPrice: number;
}
