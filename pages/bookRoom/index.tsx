import type { NextPage } from "next";
import { AbiItem } from "web3-utils";
import Web3 from "web3";

import { useState, useEffect } from "react";

declare const window: any;

// Declare matic mumbai provider
const NODE_URL =
  "https://speedy-nodes-nyc.moralis.io/b10fb33699b38624a55cb2c9/polygon/mumbai";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);







const contractAddress: string = "0xb03bc58c6e44a0E67800e87E0FE403a185bCf308";

const myContractInstance = new web3.eth.Contract(
  ABI as AbiItem[],
  contractAddress
);

const Home: NextPage = () => {

  const [owner, setOwner] = useState<string>("");
  let pubkey: string[];

  const connectWithMetamask = async () => {
    try {
      pubkey = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log(pubkey[0]);
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
    }
  };
  connectWithMetamask();

  function checkHotelStatus(): void {
    myContractInstance.methods
      .hotelStatus()
      .call()
      .then(e: any =>{console.log(e)})
        
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
    const transactionParameters = {
      nonce: "0x00", // ignored by MetaMask
      // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
      // gas: '0x2710', // customizable by user during MetaMask confirmation.
      to: contractAddress, // Required except during contract publications.
      from: pubkey[0], // must match user's active address.
      value: "2", // wei

      // chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    const _txHash = await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
      .then((txHash: any) => console.log(txHash))
      .catch((error: any) => console.log(error));
  }
  useEffect(() => {
    checkHotelStatus();
    getOwner();
    
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <button className="bg-green-100" onClick={checkHotelStatus}>Update hotel status</button>
      <button className="bg-green-100" onClick={bookRoom}>Book 1 room</button>
      <Rooms rooms={rooms} owner={owner} />
    </div>
  );
};

export default Home;

