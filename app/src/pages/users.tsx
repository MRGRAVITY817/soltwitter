import { PageHeaderContainer } from "@components/PageHeaderContainer";
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
      <PageHeaderContainer>
        <h1>Users</h1>
      </PageHeaderContainer>
    </MainLayout>
  );
};

export default Users;
