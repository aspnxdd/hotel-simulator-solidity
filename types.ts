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
  currentTime: number;
  hotelName: string;
}

export interface IHotelContract {
  hotelContract:string;
  hotel: IHotelInstance;

}
export interface IHotelInstance{
  hotelName:string;
  roomNumbers: string;
}