import { PropsWithChildren, ReactElement,useEffect,useState } from "react";
import Web3 from "web3";
import useSWR from "swr"
interface ConnectInfo {
    chainId: string;
  }


declare const window: any;

export const Connect = ({ children }: PropsWithChildren<any>) => {
  let currentAccount: string | null = null;
  const fetcher = (url:any) => fetch(url).then((res) => res.json());

    const [connect, setConnect] = useState<string>("")
    const [chainId, setChainId] = useState<string>("")
    const { data: chainListId, error } = useSWR('https://chainid.network/chains.json', fetcher)
    console.log(1,chainListId)

  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
      console.log("x");
      // Do any other work!
    }
  }
//   useEffect(() => {
//     if(connect)
//   }, [connect])

const connectWithMetamask = async () => {
  let pubkey:string[];
  let chainId:number;
  const web3 = new Web3(window.ethereum)
  try {
    pubkey = await web3.eth.requestAccounts();
    chainId = await web3.eth.getChainId()
    chainListId.forEach((e:any) => {
      if(e.chainId===chainId && chainId==80001) setChainId(e.name);
    });

    

    setConnect(pubkey[0])
  } catch (err) {
    // { code: 4001, message: 'User rejected the request.' }
  }
};
connectWithMetamask();
//   connectWithMetamask();

  return (
    <div className="flex space-x-56">

    <button className="text-2xl m-2 mr-36 p-2 right-0 text-maticColor absolute border-maticColor border-4 rounded-3xl scale-75 hover:bg-maticColor hover:text-white transition-all ease-linear duration-100" onClick={connectWithMetamask}>
      {chainId=="" ? "Wrong Network" : chainId}
    </button>

    <button className="text-white text-2xl m-2 p-3 right-0 bg-maticColor absolute rounded-3xl scale-75 hover:bg-maticColorHover transition-all ease-linear duration-100" onClick={connectWithMetamask}>
      {connect == "" ? "Connect" : `${connect.substring(0,6)}...${connect.substring(39,42)}`}
    </button>
    </div>
  );
};
