export type IReviewList = {
  id: number;
  reservation_Id: string;
  room_Id: string;
  user: {
    username: string;
    avatar: string;
  };
  room: {
    property: {
      name: string;
    };
  };
  ratings: string;
  feedBack: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export interface IGetReviewReservation {
  id: number;
  content: string;
  ratings: string;
  createdAt: string;
  updatedAt: string;
  feedBack: string | null;
  user_Id: number;
  room_Id: string;
  reservation_Id: string;
}

export interface IGetReviewsUser {
  id: number;
  content: string;
  ratings: string;
  createdAt: string;
  updatedAt: string;
  feedBack: string;
  user_Id: number;
  room_Id: string;
  reservation_Id: string;
  room: {
    property: {
      name: string;
      thumbnail: string;
      location: string;
      tenant: {
        username: string;
        avatar: string;
      };
    };
    type: string;
  };
  reservation: {
    startDate: string;
    endDate: string;
  };
}
