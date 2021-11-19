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
    // console.log(1,chainListId)


const connectWithMetamask = async () => {
  
  let chainId:number;
  const web3 = new Web3(window.ethereum)
  try {
    await web3.eth.requestAccounts().then(res => {setConnect(res[0])});
    chainId = await web3.eth.getChainId()
    chainListId.forEach((e:any) => {
      if(e.chainId===chainId && chainId==80001) setChainId(e.name);
    });   
  } catch (err) {
    // { code: 4001, message: 'User rejected the request.' }
  }
};


useEffect(() => {
  if(window.ethereum){

    connectWithMetamask();
    window.ethereum.on("accountsChanged",connectWithMetamask)
  }
})


  return (
    <div className="connect-div">
      {connect && <button className="text-2xl m-2 -mr-4 p-2 right-0 text-maticColor  border-maticColor border-4 rounded-3xl scale-75 hover:bg-maticColor hover:text-white transition-all ease-linear duration-100" onClick={connectWithMetamask}>
        {chainId=="" ? "Wrong Network" : chainId}
      </button>}

      <button className="text-white text-2xl m-2 p-3 right-0 bg-maticColor  rounded-3xl scale-75 hover:bg-maticColorHover transition-all ease-linear duration-100" onClick={connectWithMetamask}>
        {connect == "" ? "Connect" : `${connect.substring(0,6)}...${connect.substring(39,42)}`}
      </button>
    </div>
  );
};
