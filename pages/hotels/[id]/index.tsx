import type { NextPage } from "next";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import ABI from "contracts/HotelBooking_ABI.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Rooms } from "Components/Rooms/Rooms";
import { IRoom } from "types";
import { Contract } from "web3-eth-contract";
import Link from "next/link";
declare const window: any;

// Declare matic mumbai provider
const NODE_URL =
  "https://speedy-nodes-nyc.moralis.io/b10fb33699b38624a55cb2c9/polygon/mumbai";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);

const Hotel: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [myContractInstance, setMyContractInstance] = useState<Contract | null>(
    null
  );
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [timeStamp, setTimeStamp] = useState<number>(0);
  const [rooms, setRooms] = useState<Array<IRoom>>([]);
  const [owner, setOwner] = useState<string>("");
  const [hotelName, setHotelName] = useState<string>("");

  function getHotel(id: string[] | string) {
    if (Array.isArray(id)) return;
    const idSpread: string[] = id.split("-");
    const [_contractAddress, ..._hotelName] = idSpread;
    setContractAddress(_contractAddress);
    setHotelName(_hotelName.join("-"));
  }
  useEffect(() => {
    if (router.query.id) {
      getHotel(router.query.id);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (!contractAddress) return;
    setMyContractInstance(
      new web3.eth.Contract(ABI as AbiItem[], contractAddress)
    );
  }, [contractAddress]);

  async function getTimeStamp() {
    const blockNumber: number = await web3.eth.getBlockNumber();
    const timeStamp = (await web3.eth.getBlock(blockNumber)).timestamp;
    return Number(timeStamp);
  }

  const connectWithMetamask = async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (err) {
      console.error(err);
    }
  };
  connectWithMetamask();

  function checkHotelStatus(): void {
    if (myContractInstance) {
      myContractInstance.methods
        .hotelStatus()
        .call()
        .then((e: Array<IRoom>) => {
          getTimeStamp().then((a) => {
            setTimeStamp(a);
          });
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

  useEffect(() => {
    checkHotelStatus();
    getOwner();
  }, [myContractInstance]);

  return (
    <div className="flex flex-col items-center justify-center w-[100vw]">
      <Link href="/hotels/[id]/[bookroom]" as={`/hotels/${id}/bookroom`}>
        <a className="p-2 transition-all duration-100 ease-linear rounded-xl bg-maticColorHover hover:scale-105">
          Book a room
        </a>
      </Link>
      <Rooms
        rooms={rooms}
        hotelName={hotelName}
        owner={owner}
        currentTime={timeStamp}
      />
    </div>
  );
};

export default Hotel;
