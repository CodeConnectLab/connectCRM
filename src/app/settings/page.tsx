import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import dynamic from 'next/dynamic'

const AddLeads = dynamic(() => import('@/components/Pages/Leads/AddLeads'), { ssr: false })
export const metadata: Metadata = metadataStatic;

const SettingsPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Settings" />
        {/* <AddLeads />{" "} */}
      </div>
    </DefaultLayout>
  );
};

export default SettingsPage;
