import { PropsWithChildren, ReactElement,useEffect,useState } from "react";
interface ConnectInfo {
    chainId: string;
  }


declare const window: any;

export const Connect = ({ children }: PropsWithChildren<any>) => {
  let currentAccount: string | null = null;
    const [connect, setConnect] = useState<string>("")
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
    try {
      const pubkey:string = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    console.log(pubkey)
     
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
    }
  };
//   connectWithMetamask();

  return (
    <button className="text-white text-2xl m-2 p-3 right-0 bg-maticColor absolute rounded-3xl scale-75 hover:bg-maticColorHover transition-all ease-linear duration-100" onClick={connectWithMetamask}>
      Connect
    </button>
  );
};
