import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { SideBar } from "../Components/Sidebar/Sidebar";
import { Connect } from "../Components/Connect/Connect";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SideBar />
      <Connect />
      <Component {...pageProps}></Component>
    </>
  );
}

export default MyApp;
