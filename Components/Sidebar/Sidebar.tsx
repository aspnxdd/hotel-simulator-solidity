import { PropsWithChildren, ReactElement } from "react";
import {
  FiBook,
  FiHome,
  FiInfo,
  FiPlusSquare,
  FiDatabase,
} from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import Link from "next/link";
import { pubkeyState } from "Components/states";
import { useRecoilState } from "recoil";

import { useRouter } from "next/router";

export const SideBar = ({ children }: PropsWithChildren<any>) => {
  const router = useRouter();
  const { id } = router.query;
  const [pubkey, setPubkey] = useRecoilState(pubkeyState);

  return (
    <div className="sidebar">
      <SideBarIconA icon={<FiHome size="28" />} tooltip="Home" href="/" />
      <SideBarIconA
        icon={<BsBuilding size="28" />}
        tooltip="List of hotels"
        href="/hotelslist"
      />
      <SideBarIconA
        icon={<FiPlusSquare size="28" />}
        tooltip="Create your own hotel"
        href="/createHotel"
      />
      {pubkey && (
        <SideBarIconA
          icon={<FiDatabase size="28" />}
          tooltip="My hotels"
          href="/myhotels"
        />
      )}
      {id && (
        <SideBarIconA
          icon={<FiBook size="28" />}
          tooltip="Book a room!"
          href="/hotels/[id]/[bookroom]"
          as={`/hotels/${id}/bookroom`}
        />
      )}
      <SideBarIconA
        icon={<FiInfo size="28" />}
        tooltip="Info"
        href="https://arnauespin.gitbook.io/hotel-room-booking/"
      />
    </div>
  );
};

const SideBarIconA = ({
  icon,
  tooltip,
  href,
  as,
}: {
  icon: ReactElement;
  tooltip?: string;
  href: string;
  as?: string;
}) => (
  <Link href={href} as={as}>
    <div
      className={
        tooltip == "Info" ? "sidebar-icon-bottom group" : "sidebar-icon group"
      }
    >
      <a>{icon}</a>
      <span className="span-sidebar-tooltip">{tooltip}</span>
    </div>
  </Link>
);
