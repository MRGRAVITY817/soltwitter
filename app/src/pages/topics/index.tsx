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
      <h1>Topics</h1>
    </MainLayout>
  );
};

export default Topics;
