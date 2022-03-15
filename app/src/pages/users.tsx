import { SectionContainer } from "@components/SectionContainer";
import { MainLayout } from "@layouts/Main.Layout";

const Users = () => {
  const meta = {
    title: "Users",
    description: "Users - Soltwitter",
    type: "web",
  };
  return (
    <MainLayout {...meta}>
      <SectionContainer>
        <h1>Users</h1>
      </SectionContainer>
    </MainLayout>
  );
};

export default Users;
