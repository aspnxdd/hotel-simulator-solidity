import React, { useState } from "react";
import { Hotel, Room, Address, Owner,Label } from "./RoomsElements";
import {IRoom, IHotel } from "../../types"

const empty:string = ""

export const Rooms = ({ rooms, owner, currentTime }: IHotel) => {
  return (
    <div className="flex flex-col align-middle">
      <Owner>Owner: {owner}</Owner>
      <Hotel>
        {rooms.map((room) => {
          return (
            <Room key={Number(room.roomNumber)}>
              <Label marginBottom="1rem">{room.status=="0" ? "Free" : "Occupied by:" }</Label>
               <Label marginBottom="0rem">{room.status=="0" ? empty : room.nameBooking}</Label>
               
               <Label marginBottom="2rem">{room.status=="0" ? empty : `Days booked:  ${room.daysBooked}`}</Label>
               <Label marginBottom="-0.9rem">Room number: {room.roomNumber}</Label> 
               <Label marginBottom="-2rem">{room.status=="0" ? empty : "Time: "+  Math.ceil(Number(Number(room.daysBooked)*24*3600-(currentTime - Number(room.bookedTime)))/3600*10)/10  + " hours remaining"} </Label> 
            </Room>
          );
        })}
      </Hotel>
    </div>
  );
};

// export default Rooms;
