export interface IRoom {
  daysBooked: String;
  nameBooking: String;
  roomNumber: String;
  status: String;
  bookedTime: String;
}

export interface IHotel {
  rooms: IRoom[];
  owner: string;
  currentTime: number
}
