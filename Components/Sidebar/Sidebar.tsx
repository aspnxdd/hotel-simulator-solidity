import { PropsWithChildren, ReactElement } from "react";
import { FiBook,FiHome } from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import Link from "next/link"



export const SideBar = ({ children }: PropsWithChildren<any>) => {
  return (
    <div className="fixed top-0 left-0 z-10 flex flex-col w-20 h-screen m-0 text-white shadow-lg bg-primary">
      <SideBarIconA icon={<FiHome size="28"/>} tooltip="Home" href="/"/>
      <SideBarIconA icon={<BsBuilding size="28" />} tooltip="Create your own hotel" href="/createHotel"/>
      <SideBarIconA icon={<FiBook size="28" />} tooltip="Book a room!" href="/bookRoom"/>
    </div>
  );
};

const SideBarIconA = ({ icon, tooltip, href }: { icon: ReactElement,tooltip?:string, href:string }) => (
  <div className="sidebar-icon group">
      <Link href={href}>
    <a>

      {icon}
      
    </a>
      </Link>
      <span className="sidebar-tooltip group-hover:scale-100">
          {tooltip}
      </span>
      </div>
);


