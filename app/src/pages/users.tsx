import { MainLayout } from "@layouts/Main.Layout";

const Users = () => {
  const meta = {
    title: "Users",
    description: "Users - Soltwitter",
    image: "",
    type: "web",
  };
  return (
    <MainLayout {...meta}>
      <h1>Users</h1>
    </MainLayout>
  );
};

export default Users;
