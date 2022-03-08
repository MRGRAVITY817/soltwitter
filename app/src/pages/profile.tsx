import { SectionContainer } from "@components/SectionContainer";
import { TweetForm } from "@components/TweetForm";
import { useWorkspace } from "@hooks/useWorkspace";
import { MainLayout } from "@layouts/Main.Layout";

const Profile = () => {
  const { wallet } = useWorkspace();
  const meta = {
    title: "Profile",
    description: "Profile - Soltwitter",
    image: "",
    type: "web",
  };
  return (
    <MainLayout {...meta}>
      <div className="divide-y-2">
        <SectionContainer>
          <h1>Profile</h1>
        </SectionContainer>
        <SectionContainer>
          <div className="">
            <p className="border-b py-4 px-8 bg-gray-50">
              {wallet?.publicKey.toBase58()}
            </p>
            <div>
              <TweetForm />
            </div>
          </div>
        </SectionContainer>
      </div>
    </MainLayout>
  );
};

export default Profile;
