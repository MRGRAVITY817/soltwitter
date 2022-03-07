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
      <div className="px-96">
        <div className="flex">
          <SideNav />
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};
