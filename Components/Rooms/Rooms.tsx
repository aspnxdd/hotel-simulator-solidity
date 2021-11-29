import React from "react";
import { IHotel } from "../../types";

const empty = "";

export const Rooms = ({ rooms, owner, currentTime, hotelName }: IHotel) => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center my-3">
      <h1 className="mt-1 text-3xl">
        Owner: {owner.substring(0, 6)}...{owner.substring(39, 42)}
      </h1>
      <div
        className="max-w-[60rem] flex mb-8 flex-wrap justify-center
       items-center rounded-3xl shadow-2xl mx-4 bg-maticColor pb-5"
      >
        <h1 className="text-7xl m-4">🌟{hotelName}🌟</h1>
        <div className="hotel-rooms">
          {rooms.map((room) => {
            return (
              <div
                className={
                  room.status == "0"
                    ? "room bg-white"
                    : "room bg-maticColorHover"
                }
                key={Number(room.roomNumber)}
              >
                <h4 className="absolute top-0 right-4 flex w-8 h-8 items-center justify-center rounded-full mt-4 bg-indigo-300">
                  {room.roomNumber}{" "}
                </h4>
                <h5 className="text-base mb-8 absolute bottom-16 left-4">
                  {room.status == "0" ? "Free" : "Occupied by:"}
                </h5>
                {room.status == "1" && (
                  <h6 className="absolute bottom-12 left-4 flex text-xl font-bold items-center rounded-3xl p-2 bg-indigo-300">
                    {room.nameBooking.substring(0, 6)}...
                    {room.nameBooking.substring(39, 42)}
                  </h6>
                )}

                <h5 className="absolute b-0 left-4 flex h-8 items-center">
                  {room.status == "0"
                    ? empty
                    : `Days booked:  ${room.daysBooked}`}
                </h5>

                <h5 className="absolute b-0 right-4 flex h-8 items-center">
                  {room.status == "0"
                    ? empty
                    : "Time: " +
                      Math.ceil(
                        (Number(
                          Number(room.daysBooked) * 24 * 3600 -
                            (currentTime - Number(room.bookedTime))
                        ) /
                          3600) *
                          10
                      ) /
                        10 +
                      " h"}{" "}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// export default Rooms;
