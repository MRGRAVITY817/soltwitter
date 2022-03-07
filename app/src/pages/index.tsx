import type { NextPage } from "next";
import { MainLayout } from "@layouts/Main.Layout";
import { SectionContainer } from "@components/SectionContainer";
import { TweetForm } from "@components/TweetForm";

const Home: NextPage = () => {
  const meta = {
    title: "Home",
    description:
      "Welcome to Soltwitter - Decentralized Twitter based on Solana Blockchain!",
    image: "",
    type: "web",
  };
  return (
    <>
      <MainLayout {...meta}>
        <div className="divide-y-2">
          <SectionContainer id="welcome-section">
            <h1>Welcome to Soltwitter</h1>
          </SectionContainer>
          <SectionContainer id="tweet-form-section">
            <TweetForm />
          </SectionContainer>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
