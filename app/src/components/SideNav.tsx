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
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { navState } from "src/states/navState";

export const SideNav = () => {
  return (
    <nav className="h-screen w-80 border-r-2 pt-8 px-8">
      <div className="relative h-20">
        <Image
          src="/logo.png"
          alt="soltwitter log"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="grid grid-flow-row gap-y-4 mt-8">
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
      </div>
      <div className="mt-8">
        <WalletMultiButton />
      </div>
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
          "flex items-center justify-start gap-6 px-4 py-2 hover:text-indigo-700 hover:opacity-100 transition-all rounded-lg"
        )}
      >
        {props.icon}
        <p className="text-xl font-medium">{props.title}</p>
      </a>
    </Link>
  );
};
