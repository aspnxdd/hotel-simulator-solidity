import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center overflow-x-hidden">
      <h1 className=" text-4xl font-bold text-center text-indigo-400 drop-shadow-2xl md:text-6xl">
        Hotel simulator
      </h1>

      <hr className="w-11/12 mt-4 mb-2 border-t md:w-4/12" />
      <h1 className="ml-4 text-base italic text-gray-400 drop-shadow-2xl md:-ml-24">
        Built on the Matic (Polygon) testnet (Mumbai)
      </h1>
      <div className="flex items-center justify-center space-x-32 animation-box-left md:w-auto">
        <Link href="/createHotel">
          <a>
            <div className="rounded-2xl  w-[18rem] h-44 m-3 p-4 border-gray-200 border-[1px] hover:shadow-lg hover:border-opacity-0 transition-all duration-300 ease-in-out">
              <h1 className="mb-2 font-bold">Become an hotel owner now!</h1>
              <hr className="border-[1px] border-maticColor mb-2" />
              Add your hotel and book your rooms through Smart contracts on the
              Polygon Testnet.
            </div>
          </a>
        </Link>
        <Link href="/hotelslist">
          <a>
            <div className="rounded-2xl  w-[18rem] h-44 m-3 p-4 border-gray-200 border-[1px] hover:shadow-lg hover:border-opacity-0 transition-all duration-300 ease-in-out">
              <h1 className="mb-2 font-bold">Check every hotel status</h1>
              <hr className="border-[1px] border-maticColor mb-2" />
              Through smart contracts you can check every hotel availability.
            </div>
          </a>
        </Link>
      </div>
      <p className="w-3/4 mt-14 md:w-2/4 md:ml-0">
        Welcome to the Hotel Simulator built on the polygon testnet blockchain.
        This website puts forth in the adoption of smart contracts in the
        traditional business like an hotel. in order to interact with this dapp
        (decentralized app) you must have installed Metamask and set up the
        polygon testnet (mumbai) in it.
      </p>
      <p className="w-3/4  mt-14 md:w-2/4 md:ml-0">
        It tries to simulate an hotel booking portal for mutliple hotel owners,
        in which they can create an instance of the smart contract that sets up
        an hotel with its most basic features such as its name and the number of
        rooms it has.
      </p>
      <p className="w-3/4  mt-14 md:w-2/4 md:ml-0">
        Every hotel owner receives the price of the booked room(s) right when a
        room is booked. When a new hotel is created, I receive a fee as being
        the owner of this portal.
      </p>
    </div>
  );
};

export default Home;
