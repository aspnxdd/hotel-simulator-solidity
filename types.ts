export interface IRoom {
  bookedTime: String;
  daysBooked: String;
  nameBooking: String;
  roomNumber: String;
  status: String;
}

export interface IHotel {
  rooms: IRoom[];
  owner: string;
  currentTime: number;
  hotelName: string;
}

export interface IHotelContract {
  hotelContract: string;
  hotel: IHotelInstance;
  availableRooms?: number;
}
export interface IHotelInstance {
  hotelName: string;
  roomNumbers: string;
  hotelOwner: string;
}
