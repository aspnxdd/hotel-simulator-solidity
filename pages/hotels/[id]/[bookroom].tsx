import type { NextPage } from "next";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import ABI from "../../../contracts/HotelBooking_ABI.json";
import { IRoom } from "../../../types";
import { Contract } from "web3-eth-contract";
import { useRouter } from "next/router";
import Link from "next/link";
import { pubkeyState } from "Components/states";
import { useRecoilState } from "recoil";
declare const window: any;

// Declare matic mumbai provider
const NODE_URL =
  "https://speedy-nodes-nyc.moralis.io/b10fb33699b38624a55cb2c9/polygon/mumbai";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);

const Home: NextPage = () => {
  const router = useRouter();
  const [days, setDays] = useState<number>(1);
  const [rooms, setRooms] = useState<Array<IRoom>>([]);
  const [owner, setOwner] = useState<string>("");
  const [myContractInstance, setMyContractInstance] = useState<Contract | null>(
    null
  );
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [pubkey, setPubkey] = useRecoilState(pubkeyState);
  const [loader, setLoader] = useState<boolean>(false);
  const [succesfulBooked, setSuccesfulBooked] = useState<string | null>(null);

  function getHotel(id: string[] | string) {
    if (Array.isArray(id)) return;
    const idSpread: string[] = id.split("-");
    const [_contractAddress, ..._hotelName] = idSpread;
    setContractAddress(_contractAddress);
  }

  useEffect(() => {
    if (router.query.id) {
      console.log(2);
      getHotel(router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (!contractAddress) return;
    setMyContractInstance(
      new web3.eth.Contract(ABI as AbiItem[], contractAddress)
    );
    checkHotelStatus();
    getOwner();
  }, [contractAddress]);

  useEffect(() => {
    checkHotelStatus();
    getOwner();
  }, [myContractInstance]);

  function checkHotelStatus(): void {
    if (myContractInstance) {
      myContractInstance.methods
        .hotelStatus()
        .call()
        .then((e: Array<IRoom>) => {
          console.log(22, e);
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
  }

  function getOwner(): void {
    if (myContractInstance) {
      myContractInstance.methods
        .owner()
        .call()
        .then((e: string) => {
          setOwner(e);
        });
    }
  }

  async function bookRoom() {
    if (myContractInstance && contractAddress && window) {
      setLoader(true);
      setSuccesfulBooked("");
      console.log(pubkey);
      const web3 = new Web3(window.ethereum);
      const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: pubkey, // must match user's active address.
        value: String(1e17 * days), // wei
        data: myContractInstance.methods.bookRoom(days).encodeABI(),
      };

      await web3.eth
        .sendTransaction(transactionParameters)
        .then((e: any) => {
          setLoader(false);
          setSuccesfulBooked(e.transactionHash);
          console.log(15, e);
        })
        .catch((err) => {
          if (err.code === 4001) setLoader(false);
        });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      Free rooms:{" "}
      <div className="flex flex-row flex-wrap items-center md:mx-72 mx-2 ">
        {rooms.map((e) => {
          if (e.status == "0")
            return (
              <h6
                className="bg-indigo-200 m-2 rounded-full w-8 h-8 flex justify-center items-center pb-0.5 cursor-default"
                key={Number(e.roomNumber)}
              >
                {e.roomNumber}
              </h6>
            );
        })}
      </div>
      <Form owner={owner} days={days} setDays={setDays} />
      <button
        className="w-auto p-2 mt-2 font-bold text-white transition-all duration-100 ease-linear bg-indigo-300 rounded-3xl hover:scale-105 hover:bg-indigo-400"
        onClick={bookRoom}
      >
        Book now
      </button>
      {loader && <div className="lds-hourglass w-auto mt-2"></div>}
      {succesfulBooked && (
        <h1 className="mt-4">
          Successfully booked. Check tx:{" "}
          <Link href={`https://mumbai.polygonscan.com/tx/${succesfulBooked}`}>
            <a className="text-maticColor">{succesfulBooked}</a>
          </Link>
        </h1>
      )}
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
  <div className="flex flex-col justify-center h-56 pl-4 mt-8 border-0 border-indigo-300 border-solid rounded-md w-96 place-items-start xxl-shadow">
    <div className="text-xl font-bold">Hotel owner</div>

    <div className="text-sm text-maticColor">{`${owner.substring(
      0,
      6
    )}...${owner.substring(39, 42)}`}</div>
    <div className="flex my-1 -ml-4 border-b-2 border-solid w-96"></div>
    <div className="flex items-center space-x-2">
      <div>Booking price: 0.1 </div>
      <img
        src="../../static/polygon-matic-logo.svg"
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
      <p className="text-xl font-bold text-gray-700">{days}</p>

      <button
        className="rounded-full flex justify-center items-center shadow-xl hover:scale-110 transition-all ease-linear duration-100 text-center 
    p-0 font-bold text-2xl bg-indigo-200 text-white border-indigo-200 border-solid border-2 h-8 w-8 m-4 pb-0.5 "
        onClick={() => setDays(days + 1)}
      >
        +{" "}
      </button>
    </div>
    <div className="flex mt-2 -ml-4 border-b-2 border-solid w-96"></div>
    <div className="flex items-center mt-6 space-x-40 font-bold">
      <div className="text-left "> Total Price: </div>
      <div className="flex pl-6 space-x-2 text-xl text-right text-maticColor ">
        <div>{Math.round((1 / 10) * days * 1000) / 1000}</div>
        <img
          src="../../static/polygon-matic-logo.svg"
          alt="matic"
          className="w-6 scale-90"
        />
      </div>
    </div>
  </div>
);
