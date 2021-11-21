import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-700 drop-shadow-2xl text-center">
        Hotel simulator
      </h1>

      <hr className="w-4/12 mt-4 mb-2 border-t" />
      <h1 className="text-base italic text-gray-400 drop-shadow-2xl -ml-24">
        Built on the Matic (Polygon) testnet (Mumbai)
      </h1>
      <div className="flex items-center justify-center animation-box-left">
        <div className="border-2 rounded-2xl border-maticColor w-64 h-44 m-3 p-4 ">
          <h1 className="font-bold mb-2">Become an hotel owner now!</h1>
          Add your hotel and book your rooms through Smart contracts on the
          Polygon Testnet.
        </div>
        <div className="border-2 rounded-2xl border-maticColor w-64 h-44 m-3 p-4 ">
          <h1 className="font-bold mb-2">Check every hotel state</h1>
          Through smart contracts you can check every hotel availability.
        </div>
      </div>
      <p className="w-2/4 mt-14">
        Welcome to the Hotel Simulator built on the polygon testnet blockchain.
        This website puts forth in the adoption of smart contracts in the
        traditional business like an hotel. in order to interact with this dapp
        (decentralized app) you must have installed Metamask and set up the
        polygon testnet (mumbai) in it.
      </p>
      <p className="w-2/4 mt-10">
        It tries to simulate an hotel booking portal for mutliple hotel owners,
        in which they can create an instance of the smart contract that sets up
        an hotel with its most basic features such as its name and the number of
        rooms it has.
      </p>
      <p className="w-2/4 mt-10">
        Every hotel owner receives the price of the booked room(s) right when a
        room is booked. When a new hotel is created, I receive a fee as being
        the owner of this portal.
      </p>
    </div>
  );
};

export default Home;
