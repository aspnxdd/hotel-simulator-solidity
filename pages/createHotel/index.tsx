import { AbiItem } from "web3-utils";
import Web3 from "web3";
import ABI from "contracts/Master_ABI.json";
import { useState } from "react";
import Link from "next/link";
declare const window: any;
import { Master } from "contracts/contract";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { pubkeyState,chainIdState } from "Components/states";
import { useRecoilState } from "recoil";
import ReactTooltip from "react-tooltip";
import Image from "next/image"
import maticLogo  from "public/static/matic-logo.svg"

// Declare matic mumbai provider
const NODE_URL =
  "https://speedy-nodes-nyc.moralis.io/b10fb33699b38624a55cb2c9/polygon/mumbai";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);

console.log(ABI);

const myContractInstance = new web3.eth.Contract(ABI as AbiItem[], Master);

const CreateHotel = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false); // Need this for the react-tooltip

  const [successfulCreation, setSuccessfulCreation] = useState<string | null>(
    null
  );
  const [pubkey, setPubkey] = useRecoilState(pubkeyState);
  const [chainId, setChainId] = useRecoilState(chainIdState);

  const formik = useFormik({
    initialValues: {
      hotelName: "",
      roomsNumber: 9,
    },
    onSubmit: () => {
      if (formik.values.roomsNumber < 1) return;
      createHotel();
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);
  async function createHotel() {
    if(!chainId) return alert("Wrong network!")
    const web3 = new Web3(window.ethereum);
    setLoader(true);
    setSuccessfulCreation(null);
    console.log(1, pubkey);
    const transactionParameters = {
      to: Master, // Required except during contract publications.
      from: pubkey, // must match user's active address.
      value: String(1e17), // wei
      data: myContractInstance.methods
        .createHotel(
          String(formik.values.hotelName),
          Number(formik.values.roomsNumber)
        )
        .encodeABI(),
    };

    await web3.eth
      .sendTransaction(transactionParameters)
      .then((e: any) => {
        setLoader(false);
        setSuccessfulCreation(e.transactionHash);
        console.log(15, e);
      })
      .catch((err) => {
        if (err.code === 4001) setLoader(false);
      });
  }

  return (
    <form
      className="flex flex-col items-center h-auto justify-center"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col p-4 xxl-shadow rounded-2xl min-w-max w-80 scale-90 bg-gray-200">
        <div className="flex justify-between">
          <h1 className="items-start font-bold text-2xl">Create my hotel</h1>

          <h1
            data-tip="You can create your own hotel by executing an Smart Contract 
          that will instantiate an Hotel contract on your call, which returns the hotel's contract address."
            className="text-right font-bold text-indigo-600 border-indigo-300 text-lg border-2 rounded-full 
            px-[0.6rem] cursor-pointer hover:border-indigo-500 transition-all ease-in-out duration-300"
          >
            ?
          </h1>
          {isMounted && (
            <ReactTooltip
              place="right"
              effect="solid"
              className="info-span"
              offset={{ top: 6, right:20 }}
            />
          )}
        </div>

        <hr className="w-80 mt-4 mb-2 border-t bg-white" />
        <label htmlFor="firstName">Hotel Name</label>
        <input
          id="hotelName"
          name="hotelName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.hotelName}
          className="mb-4 text-center border-4 outline-none rounded-2xl border-maticColor "
          placeholder="My Hotel"
          required
        />

        <label htmlFor="roomsNumber">Number of rooms </label>
        <input
          id="roomsNumber"
          name="roomsNumber"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.roomsNumber}
          min="1"
          pattern="\d*"
          className="text-center border-4 max-w-sm outline-none rounded-2xl border-maticColor "
        />

        <hr className="w-80 mt-4 mb-2 border-t" />
        <div className="flex justify-between">
          <div>Price: </div>
          <span className="flex flex-row scale-125 font-bold items-center">
            <p className="mr-2 text-gray-700">0.1{" "}</p>
            <Image
              src={maticLogo}
              alt="matic"
              width={20}
              
             
            />
          </span>
        </div>
        <button
          className="max-w-sm p-2 mt-2 font-bold text-white transition-all duration-100 ease-linear bg-indigo-400 
          rounded-3xl hover:scale-105 hover:bg-indigo-500"
          type="submit"
        >
          Submit
        </button>
      </div>
      {loader && <div className="lds-hourglass w-auto mt-2"></div>}
      {successfulCreation && (
        <h1 className="mt-4">
          Successfully created. Check tx:{" "}
          <Link
            href={`https://mumbai.polygonscan.com/tx/${successfulCreation}`}
          >
            <a className="text-maticColor">{successfulCreation}</a>
          </Link>
        </h1>
      )}
    </form>
  );
};

// Pass the useFormik() hook initial form values and a submit function that will
// be called when the form is submitted

export default CreateHotel;
