import type { NextPage } from "next";
import { MainLayout } from "@layouts/Main.Layout";
import { SectionContainer } from "@components/SectionContainer";
import { TweetForm } from "@components/TweetForm";
import { TweetList } from "@components/TweetList";
import { PageHeaderContainer } from "@components/PageHeaderContainer";

const meta = {
  title: "Home",
  description:
    "Welcome to Soltwitter - Decentralized Twitter based on Solana Blockchain!",
  type: "web",
};

const Home: NextPage = () => {
  return (
    <>
      <MainLayout {...meta}>
        <div className="divide-y-2">
          <PageHeaderContainer>
            <h1>Welcome to Soltwitter</h1>
          </PageHeaderContainer>
          <SectionContainer id="tweet-form-section">
            <TweetForm />
          </SectionContainer>
          <TweetList />
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
