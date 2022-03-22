import { BottomNav } from "@components/BottomNav";
import { RightSideSection } from "@components/RightSideSection";
import { SideNav } from "@components/SideNav";
import Head from "next/head";

export interface Props {
  title: string;
  description: string;
  type: string;
}

export const MainLayout: React.FC<Props> = ({
  title,
  description,
  type,
  children,
}) => {
  return (
    <div>
      <Head>
        <title>{title} - Soltwitter</title>
        <meta name="robot" content="follow, index" />
        <meta content={description} name="description" />
        <meta property="og:url" content={``} />
        <link rel="canonical" href={``} />
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content={`Soltwitter`} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={`/banner.png`} />
      </Head>
      <div className="px-auto">
        <div className="px-4">
          <div className="flex flex-row gap-2 items-start justify-center">
            <div className="md:block hidden">
              <SideNav />
            </div>
            <div className="md:w-[600px] w-full">{children}</div>
            <div className="lg:block hidden">
              <RightSideSection />
            </div>
            <div className="md:hidden fixed w-full">
              <BottomNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
