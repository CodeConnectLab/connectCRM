import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";

export const metadata: Metadata = metadataStatic;

const AllLeadsPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="All leads" />
         {/* <CalendarBox /> */}
      </div>
    </DefaultLayout>
  );
};

export default AllLeadsPage;
