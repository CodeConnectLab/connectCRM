import { Metadata } from "next";
import metadataStatic from "@/utils/metadataStatic";
import LoginPage from "@/components/Pages/Authentication/LoginPage";
export const metadata: Metadata = metadataStatic;

const SignUpPage = () => {
  return (
    <div className="linePattern_Container dark">
      <div className="m-auto flex h-screen max-w-6xl items-center  justify-center">
        <LoginPage isSignIn={false}/>
      </div>
    </div>
  );
};

export default SignUpPage;
