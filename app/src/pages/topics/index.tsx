import { SectionContainer } from "@components/SectionContainer";
import { MainLayout } from "@layouts/Main.Layout";

const Topics = () => {
  const meta = {
    title: "Topics",
    description: "Topics - Soltwitter",
    image: "",
    type: "web",
  };
  return (
    <MainLayout {...meta}>
      <SectionContainer>
        <h1>Topics</h1>
      </SectionContainer>
    </MainLayout>
  );
};

export default Topics;
