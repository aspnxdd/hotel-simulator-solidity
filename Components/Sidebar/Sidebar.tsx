import { PropsWithChildren, ReactElement } from "react";
import { FiBook,FiHome } from "react-icons/fi";
import Link from "next/link"



export const SideBar = ({ children }: PropsWithChildren<any>) => {
  return (
    <div className="fixed z-10 top-0 left-0 h-screen w-20 m-0 flex flex-col bg-primary text-white shadow-lg">
      <SideBarIconA icon={<FiHome size="28"/>} tooltip="Home" href="/"/>
      <SideBarIconA icon={<FiBook size="28" />} tooltip="Book a room!" href="/"/>
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


