import { SectionContainer } from "@components/SectionContainer";
import { TweetForm } from "@components/TweetForm";
import { useWorkspace } from "@hooks/useWorkspace";
import { MainLayout } from "@layouts/Main.Layout";

const Profile = () => {
  const { wallet } = useWorkspace();
  const meta = {
    title: "Profile",
    description: "Profile - Soltwitter",
    type: "web",
  };
  return (
    <MainLayout {...meta}>
      <div className="divide-y-2">
        <SectionContainer>
          <h1>Profile</h1>
        </SectionContainer>
        <div className="bg-gray-50 py-4 px-8 ">
          <h3 className="mb-2">Your Address</h3>
          <p className="text-gray-500 hover:text-indigo-700">
            {wallet?.publicKey.toBase58()}
          </p>
        </div>
        <SectionContainer>
          <TweetForm />
        </SectionContainer>
      </div>
    </MainLayout>
  );
};

export default Profile;
