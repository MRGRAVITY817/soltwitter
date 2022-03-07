import { MainLayout } from "@layouts/Main.Layout";

const Profile = () => {
  const meta = {
    title: "Profile",
    description: "Profile - Soltwitter",
    image: "",
    type: "web",
  };
  return (
    <MainLayout {...meta}>
      <h1>Profile</h1>
    </MainLayout>
  );
};

export default Profile;
