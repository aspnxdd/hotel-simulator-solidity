import { PropsWithChildren, ReactElement } from "react";
import { FiBook,FiHome,FiInfo } from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import Link from "next/link"
import { useEffect } from "react";

import { useRouter } from 'next/router'



export const SideBar = ({ children }: PropsWithChildren<any>) => {
  const router = useRouter();
  const { id } = router.query
  // useEffect(() => {
  //   if (router.query.id) {
      
  //     getHotel(router.query.id);
  //   }
  // }, [router.query.id]);

  return (
    <div className="fixed top-0 left-0 z-10 flex flex-col w-20 h-screen m-0 text-white shadow-lg bg-primary">
      <SideBarIconA icon={<FiHome size="28"/>} tooltip="Home" href="/"/>
      <SideBarIconA icon={<BsBuilding size="28" />} tooltip="Create your own hotel" href="/createHotel"/>
      {id && <SideBarIconA icon={<FiBook size="28" />} tooltip="Book a room!" href="/hotels/[id]/[bookroom]" as={`/hotels/${id}/bookroom`} />}
      <SideBarIconA icon={<FiInfo size="28"/>} tooltip="Info" href="/"/>
    </div>
  );
};

const SideBarIconA = ({ icon, tooltip, href, as }: { icon: ReactElement,tooltip?:string, href:string,as?:string }) => (
  <div className="{{tooltip=='Info' ? 'sidebar-icon-bottom group' : 'sidebar-icon group'}}">
      <Link href={href} as={as}>
        <a>
          {icon}
        </a>
      </Link>
      <span className="sidebar-tooltip group-hover:scale-100">
          {tooltip}
      </span>
  </div>


);


