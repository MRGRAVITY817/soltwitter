import type { NextPage } from "next";
import { MainLayout } from "@layouts/Main.Layout";
import { SectionContainer } from "@components/SectionContainer";
import { TweetForm } from "@components/TweetForm";
import { useState } from "react";
import { useWorkspace } from "@hooks/useWorkspace";
import { Tweet } from "@models/Tweet";
import { TweetList } from "@components/TweetList";

const meta = {
  title: "Home",
  description:
    "Welcome to Soltwitter - Decentralized Twitter based on Solana Blockchain!",
  image: "",
  type: "web",
};

const Home: NextPage = () => {
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
          <TweetList />
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
