import { AbiItem } from "web3-utils";
import Web3 from "web3";
import ABI from "../../contracts/Master_ABI.json";
import { useEffect } from "react";

declare const window: any;
import { Master } from "../../contracts/contract";
import React from "react";
import { useFormik } from "formik";

// Declare matic mumbai provider
const NODE_URL =
  "https://speedy-nodes-nyc.moralis.io/b10fb33699b38624a55cb2c9/polygon/mumbai";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);

console.log(ABI);

const myContractInstance = new web3.eth.Contract(ABI as AbiItem[], Master);

let pubkey: string[];
const CreateHotel = () => {
  const connectWithMetamask = async () => {
    const web3 = new Web3(window.ethereum);
    try {
      pubkey = await web3.eth.requestAccounts();
    } catch (err) {
      console.error(err);
    }
  };

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

  async function createHotel() {
    const web3 = new Web3(window.ethereum);
    console.log(1, pubkey);
    const transactionParameters = {
      to: Master, // Required except during contract publications.
      from: pubkey[0], // must match user's active address.
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
      .then((e: any) => console.log(15, e));
  }

  useEffect(() => {
    connectWithMetamask();
  }, []);

  return (
    <form
      className="flex flex-col items-center "
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col items-center p-4 xxl-shadow rounded-2xl">
        <label htmlFor="firstName">Hotel Name</label>
        <input
          id="hotelName"
          name="hotelName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.hotelName}
          className="mb-4 text-center border-4 outline-none rounded-2xl border-maticColor"
          placeholder="My Hotel"
          required
        />

        <label htmlFor="roomsNumber">Rooms number </label>
        <input
          id="roomsNumber"
          name="roomsNumber"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.roomsNumber}
          min="1"
          className="text-center border-4 outline-none rounded-2xl border-maticColor"
        />

        <hr className="w-56 mt-4 mb-2 border-t" />
        <button
          className="w-auto p-2 mt-2 font-bold text-white transition-all duration-100 ease-linear bg-indigo-300 rounded-3xl hover:scale-105 hover:bg-indigo-400"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

// Pass the useFormik() hook initial form values and a submit function that will
// be called when the form is submitted

export default CreateHotel;
