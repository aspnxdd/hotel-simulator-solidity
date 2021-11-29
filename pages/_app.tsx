import "../styles/tailwind.css";
import { SideBar } from "Components/Sidebar/Sidebar";
import { Connect } from "Components/Connect/Connect";
import { RecoilRoot } from "recoil";


import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  

  return (
    <>
      <RecoilRoot>
        <SideBar />
        <Connect />
        <Component {...pageProps}></Component>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
