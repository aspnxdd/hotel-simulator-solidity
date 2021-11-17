import React from "react";
import { Hotel, Room, Owner,Label,RoomNumber,DaysBooked,Address,Time } from "./RoomsElements";
import {IHotel } from "../../types"

const empty:string = ""

export const Rooms = ({ rooms, owner, currentTime }: IHotel) => {
  return (
    <div className="flex flex-col align-middle">
      <Owner>Owner: {owner.substring(0,6)}...{owner.substring(39,42)}</Owner>
      <Hotel>
        {rooms.map((room) => {
          return (
            <Room status={room.status} key={Number(room.roomNumber)} >
              <RoomNumber>{room.roomNumber} </RoomNumber>
              <Label marginBottom="1rem">{room.status=="0" ? "Free" : "Occupied by:" }</Label>
               { room.status=="1" && <Address >{room.nameBooking.substring(0,6)}...{room.nameBooking.substring(39,42)}</Address>}
               
               <DaysBooked >{room.status=="0" ? empty : `Days booked:  ${room.daysBooked}`}</DaysBooked>
               
               <Time>{room.status=="0" ? empty : "Time: "+  Math.ceil(Number(Number(room.daysBooked)*24*3600-(currentTime - Number(room.bookedTime)))/3600*10)/10  + " h"} </Time> 
            </Room>
          );
        })}
      </Hotel>
    </div>
  );
};



// export default Rooms;
