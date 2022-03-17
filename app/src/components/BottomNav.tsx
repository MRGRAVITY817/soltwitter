import {
  ChatIcon,
  HomeIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { classNames } from "@utils/functions";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { navState } from "src/states/navState";

export const BottomNav = () => {
  return (
    <nav className="w-full bg-white flex justify-around border-t-2 py-4 fixed bottom-0">
      <NavItem title="Home" href="/" icon={<HomeIcon className="w-6" />} />
      <NavItem
        title="Topics"
        href="/topics"
        icon={<ChatIcon className="w-6" />}
      />
      <NavItem
        title="Users"
        href="/users"
        icon={<UsersIcon className="w-6" />}
      />
      <NavItem
        title="Profile"
        href="/profile"
        icon={<UserIcon className="w-6" />}
      />
    </nav>
  );
};

const NavItem: React.FC<{ title: string; href: string; icon: ReactNode }> = (
  props
) => {
  const [currentNav, setCurrentNav] = useRecoilState(navState);
  return (
    <Link href={props.href}>
      <a
        onClick={() => setCurrentNav(props.href)}
        className={classNames(
          currentNav === props.href
            ? "bg-indigo-100 opacity-100 text-indigo-700"
            : "bg-transparent opacity-50",
          "flex items-center xl:justify-start justify-center gap-6 p-2 hover:text-indigo-700 hover:opacity-100 transition-all rounded-lg"
        )}
      >
        {props.icon}
        <p className="text-xl font-medium xl:flex hidden">{props.title}</p>
      </a>
    </Link>
  );
};
