import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import AddLeads from "@/components/Leads/AddLeads";

export const metadata: Metadata = metadataStatic;

const AddLeadsPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Add leads" />
        <AddLeads />{" "}
      </div>
    </DefaultLayout>
  );
};

export default AddLeadsPage;
