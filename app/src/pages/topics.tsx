import { PageHeaderContainer } from "@components/PageHeaderContainer";
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
      <PageHeaderContainer>
        <h1>Topics</h1>
      </PageHeaderContainer>
    </MainLayout>
  );
};

export default Topics;
