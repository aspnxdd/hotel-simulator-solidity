import { PropsWithChildren, useEffect, useState } from "react";
import { pubkeyState, chainIdState } from "../../Components/states";
import { useRecoilState } from "recoil";
import Web3 from "web3";
import useSWR from "swr";
interface ConnectInfo {
  chainId: string;
}

declare const window: any;

export const Connect = ({ children }: PropsWithChildren<any>) => {
  const [pubkey, setPubkey] = useRecoilState(pubkeyState);
  const [chainId, setChainId] = useRecoilState(chainIdState);

  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  const { data: chainListId, error } = useSWR(
    "https://chainid.network/chains.json",
    fetcher
  );

  const connectWithMetamask = async () => {
    let chainId: number;
    const web3 = new Web3(window.ethereum);
    try {
      await web3.eth.requestAccounts().then((res) => {
        
        setPubkey(res[0]);
        // console.log("pubkey", pubkey);
      });
      chainId = await web3.eth.getChainId();
      chainListId?.forEach((e: any) => {
        if (e.chainId === chainId && chainId == 80001) setChainId(e.name);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      
      connectWithMetamask();
      window.ethereum.on("accountsChanged", connectWithMetamask);
    }
  });

  return (
    <div className="connect-div w-12/12 space-x-6">
      {pubkey && (
        <button
          className="right-0 p-2 m-2 -mr-4 text-2xl transition-all duration-100 ease-linear border-4 md:mr-0 text-maticColor border-maticColor rounded-3xl hover:bg-maticColor hover:text-white"
          onClick={connectWithMetamask}
        >
          {chainId == "" ? "Wrong Network" : chainId}
        </button>
      )}

      <button
        className="right-0 p-3 m-2 text-2xl text-white transition-all duration-100 ease-linear bg-maticColor rounded-3xl hover:bg-maticColorHover"
        onClick={connectWithMetamask}
      >
        {pubkey == ""
          ? "Connect"
          : `${pubkey.substring(0, 6)}...${pubkey.substring(39, 42)}`}
      </button>
    </div>
  );
};
