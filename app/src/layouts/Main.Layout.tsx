import { RightSideSection } from "@components/RightSideSection";
import { SideNav } from "@components/SideNav";
import Head from "next/head";
import { useRouter } from "next/router";

export interface Props {
  title: string;
  description: string;
  image: string;
  type: string;
}

export const MainLayout: React.FC<Props> = ({
  title,
  description,
  image,
  type,
  children,
}) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="robot" content="follow, index" />
        <meta content={description} name="description" />
        <meta property="og:url" content={``} />
        <link rel="canonical" href={``} />
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content={`Soltwitter`} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
      </Head>
      <div className="px-auto">
        <div className="lg:px-32 md:px-24 px-8">
          <div className="w-full grid grid-cols-4 divide-x-2">
            <div className="col-span-1">
              <SideNav />
            </div>
            <main className="col-span-2">{children}</main>
            <div className="col-span-1">
              <RightSideSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
