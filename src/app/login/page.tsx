import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import CallReport from "@/components/Pages/Reports/CallReport";
import LoginPage from "@/components/Pages/Authentication/LoginPage";
export const metadata: Metadata = metadataStatic;

const CallReportPage = () => {
  return (
    <div className="m-auto flex items-center justify-center h-screen  max-w-6xl">
      <LoginPage />
    </div>
  );
};

export default CallReportPage;
