import type { NextPage } from "next";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import { contractAddress } from "../../contracts/contract";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import ABI from "../../contracts/ABI.json";
import { IRoom } from "../../types";
declare const window: any;

// Declare matic mumbai provider
const NODE_URL =
  "https://speedy-nodes-nyc.moralis.io/b10fb33699b38624a55cb2c9/polygon/mumbai";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);

const myContractInstance = new web3.eth.Contract(
  ABI as AbiItem[],
  contractAddress
);

const Home: NextPage = () => {
  const [days, setDays] = useState<number>(1);
  const [rooms, setRooms] = useState<Array<IRoom>>([]);
  const [owner, setOwner] = useState<string>("");

  let pubkey: string[];

  const connectWithMetamask = async () => {
    const web3 = new Web3(window.ethereum);
    try {
      pubkey = await web3.eth.requestAccounts();

      console.log(12, pubkey[0]);
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
    }
  };

  connectWithMetamask();

  function checkHotelStatus(): void {
    myContractInstance.methods
      .hotelStatus()
      .call()
      .then((e: Array<IRoom>) => {
        setRooms(
          e.map(
            ({ daysBooked, nameBooking, roomNumber, status, bookedTime }) => {
              return {
                daysBooked,
                nameBooking,
                roomNumber,
                status,
                bookedTime,
              };
            }
          )
        );
      });
  }

  function getOwner(): void {
    myContractInstance.methods
      .owner()
      .call()
      .then((e: string) => {
        setOwner(e);
      });
  }

  async function bookRoom() {
    const web3 = new Web3(window.ethereum);
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: pubkey[0], // must match user's active address.
      value: String(1e17 * days), // wei
      data: myContractInstance.methods.bookRoom(owner, days).encodeABI(),
    };

    await web3.eth
      .sendTransaction(transactionParameters)
      .then((e: any) => console.log(15, e));
  }

  useEffect(() => {
    checkHotelStatus();
    getOwner();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row mt-6 items-center">
        Free rooms:{" "}
        {rooms.map((e) => {
          if (e.status == "0")
            return (
              <h6
                className="bg-indigo-200 mx-2.5 rounded-full w-8 h-8 flex justify-center items-center pb-0.5 cursor-default"
                key={Number(e.roomNumber)}
              >
                {e.roomNumber}
              </h6>
            );
        })}
      </div>
      <Form owner={owner} days={days} setDays={setDays} />
      <button
        className="bg-indigo-300 rounded-3xl w-auto p-2 text-white font-bold mt-2 hover:scale-105 hover:bg-indigo-400 transition-all ease-linear duration-100"
        onClick={bookRoom}
      >
        Book now
      </button>
    </div>
  );
};

export default Home;

const Form = ({
  days,
  setDays,
  owner,
}: {
  days: number;
  setDays: Dispatch<SetStateAction<number>>;
  owner: string;
}) => (
  <div className="w-96 h-56 rounded-md  border-indigo-300 border-solid border-0 mt-8 flex flex-col place-items-start pl-4 justify-center xxl-shadow">
    <div className="text-xl font-bold">Hotel owner</div>

    <div className="text-sm text-maticColor">{`${owner.substring(0,6)}...${owner.substring(39,42)}`}</div>
    <div className="flex border-b-2 border-solid w-96 -ml-4 my-1"></div>
    <div className="flex space-x-2 items-center">
      <div>Booking price: 0.1 </div>
      <img
        src="./static/polygon-matic-logo.svg"
        alt="matic"
        className="w-4 scale-90"
      />{" "}
      <div>/day</div>
    </div>
    <div className="flex items-center">
      <p className="text-gray-600">Days booked</p>

      <button
        className="rounded-full flex justify-center items-center shadow-xl hover:scale-110 transition-all ease-linear duration-100 text-center 
    p-0 font-bold text-2xl bg-indigo-200 text-white border-indigo-200 border-solid border-2 h-8 w-8 pb-1.5 m-4 "
        onClick={() => {
          if (days > 1) setDays(days - 1);
        }}
      >
        -{" "}
      </button>
      <p className="text-gray-700 font-bold text-xl">{days}</p>

      <button
        className="rounded-full flex justify-center items-center shadow-xl hover:scale-110 transition-all ease-linear duration-100 text-center 
    p-0 font-bold text-2xl bg-indigo-200 text-white border-indigo-200 border-solid border-2 h-8 w-8 m-4 pb-0.5 "
        onClick={() => setDays(days + 1)}
      >
        +{" "}
      </button>
    </div>
    <div className="flex border-b-2 border-solid w-96 -ml-4 mt-2"></div>
    <div className="flex  font-bold mt-6 space-x-40 items-center">
      <div className=" text-left"> Total Price: </div>
      <div className="text-maticColor text-xl text-right pl-6  flex space-x-2 ">
        <div>{Math.round(1/10 * days * 1000) / 1000}</div>
        <img
          src="./static/polygon-matic-logo.svg"
          alt="matic"
          className="w-6 scale-90"
        />
      </div>
    </div>
  </div>
);
