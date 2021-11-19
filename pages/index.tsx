import type { NextPage } from "next";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import ABI from "../contracts/Master_ABI.json";
import { useState, useEffect } from "react";
import { Rooms } from "../Components/Rooms/Rooms";
import { IHotelContract, IHotelInstance } from "../types";
declare const window: any;
import { Master } from "../contracts/contract";
import { Hotel } from "../Components/Rooms/RoomsElements";
import { json } from "stream/consumers";
// Declare matic mumbai provider
const NODE_URL =
  "https://speedy-nodes-nyc.moralis.io/b10fb33699b38624a55cb2c9/polygon/mumbai";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);

console.log(ABI);

const myContractInstance = new web3.eth.Contract(ABI as AbiItem[], Master);
let pubkey: string[];

const Home: NextPage = () => {
  const [hotels, setHotels] = useState<Array<IHotelContract>>([]);

  const connectWithMetamask = async () => {
    try {
      pubkey = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (err) {}
  };
  

  function getHotels(): void {
    myContractInstance.methods
      .returnHotels()
      .call()
      .then((e: IHotelContract[]) => {
        setHotels(e);
      });
  }

  useEffect(() => {
    connectWithMetamask();
    getHotels();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <table className="table text-sm text-gray-400 border-separate rounded-full">
        <thead className="text-white bg-maticColor">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Number of rooms</th>
            <th className="p-3">Contract address</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => {
            return (
              <>
                <tr className="bg-indigo-200 lg:text-black">
                  <td className="p-1 text-center">{hotel.hotel.hotelName}</td>
                  <td className="p-1 text-center">{hotel.hotel.roomNumbers}</td>
                  <td className="p-1 text-center">{hotel.hotelContract}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
