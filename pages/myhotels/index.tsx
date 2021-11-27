import type { NextPage } from "next";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import Master_ABI from "../../contracts/Master_ABI.json";
import HotelBooking_ABI from "../../contracts/HotelBooking_ABI.json";
import { useState, useEffect } from "react";
import { IHotelContract, IRoom } from "../../types";
import { Master } from "../../contracts/contract";
import { pubkeyState } from "../../Components/states";
import { useRecoilState } from "recoil";
import Next from "next/link";

// Declare matic mumbai provider
const NODE_URL =
  "https://speedy-nodes-nyc.moralis.io/b10fb33699b38624a55cb2c9/polygon/mumbai";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);

// console.log(1, HotelBooking_ABI);

const masterContractInstance = new web3.eth.Contract(
  Master_ABI as AbiItem[],
  Master
);

const Home: NextPage = () => {
  const [hotels, setHotels] = useState<Array<IHotelContract>>([]);
  const [pubkey, setPubkey] = useRecoilState(pubkeyState);
  const [loading, setLoading] = useState(true);

  function getHotels(): void {
    masterContractInstance.methods
      .returnHotels()
      .call()
      .then(async (e: IHotelContract[]) => {
        // filter all the hotels from the account signed
        const myHotels = e.filter((hotel) => hotel.hotel.hotelOwner === pubkey);

        // for each hotel, get the available rooms
        const myRooms: Array<IHotelContract> = await Promise.all(
          myHotels.map(async (hotel) => {
            const hotelContractInstance = new web3.eth.Contract(
              HotelBooking_ABI as AbiItem[],
              hotel.hotelContract
            );
            return {
              ...hotel,
              availableRooms: (
                await hotelContractInstance.methods.hotelStatus().call()
              ).reduce((availableRooms: number, room: IRoom) => {
                if (room.status == "0") return availableRooms + 1;
                else return availableRooms;
              }, 0),
            };
          })
        );
        console.log(myRooms);
        setHotels(myRooms);
        setLoading(false);
      });
  }

  useEffect(() => {
    getHotels();
  }, [pubkey]);

  return (
    <div className="flex flex-wrap flex-col items-center justify-center">
      <h1 className="text-center text-6xl text-black mt-6 loading-text mb-8">
        {loading
          ? "Loading..."
          : hotels.length >= 0
          ? "🟣Your hotels🟣"
          : "You have no hotels"}
      </h1>
      <div className="flex">
        {hotels.map((hotel) => {
          return (
            <Next
              key={hotel.hotelContract}
              href={`hotels/${hotel.hotelContract}-${hotel.hotel.hotelName}`}
            >
              <a className="loading-text">
                <div className="w-64 h-64 flex flex-col rounded-xl border-2 p-4 space-y-4 hover:shadow-xl transition-all duration-200 ease-in-out hover:border-indigo-300">
                  <h1>
                    <b>Name:</b> {hotel.hotel.hotelName}
                  </h1>
                  <h1>
                    <b>Contract:</b> {hotel.hotelContract.substring(0, 6)}...
                    {hotel.hotelContract.substring(39, 42)}
                  </h1>
                  <h1>
                    <b>Available rooms: </b>
                    {hotel.availableRooms}/{hotel.hotel.roomNumbers}
                  </h1>
                </div>
              </a>
            </Next>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
