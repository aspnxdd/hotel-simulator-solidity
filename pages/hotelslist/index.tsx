import type { NextPage } from "next";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import Master_ABI from "../../contracts/Master_ABI.json";
import HotelBooking_ABI from "../../contracts/HotelBooking_ABI.json";
import { useState, useEffect } from "react";
import Link from "next/link";
import { IHotelContract,IRoom } from "../../types";
import { Master } from "../../contracts/contract";

// Declare matic mumbai provider
const NODE_URL =
  "https://speedy-nodes-nyc.moralis.io/b10fb33699b38624a55cb2c9/polygon/mumbai";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);



const myContractInstance = new web3.eth.Contract(Master_ABI as AbiItem[], Master);

const Home: NextPage = () => {
  const [hotels, setHotels] = useState<Array<IHotelContract>>([]);

  function getHotels(): void {
    myContractInstance.methods
      .returnHotels()
      .call()
      .then(async(e: IHotelContract[]) => {

        const data: Array<IHotelContract> = await Promise.all(
          e.map(async (hotel) => {
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

        setHotels(data);
      });
  }

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div className="flex flex-col scale-50 md:scale-100 ml-4 items-center justify-center">
      <table className="table text-sm text-gray-400 border-separate rounded-full mt-6">
        <thead className="text-white bg-maticColor">
          <tr>
            <th className="p-3">Hotel name</th>
            <th className="p-3">Available rooms</th>
            <th className="p-3">Contract address</th>
            <th className="p-3">Link</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => {
            return (
              <tr
                key={hotel.hotelContract}
                className="bg-indigo-200 lg:text-black"
              >
                <td className="p-1 text-center">{hotel.hotel.hotelName}</td>
                <td className="p-1 text-center">{hotel.availableRooms}/{hotel.hotel.roomNumbers}</td>
                <td className="p-1 text-center">{hotel.hotelContract.substring(0, 6)}...
                    {hotel.hotelContract.substring(39, 42)}</td>
                <td className="p-2 text-center">
                  {" "}
                  <Link
                    href={
                      "/hotels/" +
                      hotel.hotelContract +
                      "-" +
                      hotel.hotel.hotelName
                    }
                  >
                    <a className="px-2 py-0.5 bg-white rounded-xl hover:rounded-md hover:bg-maticColor hover:text-white transition-all ease-in-out duration-150">
                      Visit hotel
                    </a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
