"use client";
import React from "react";
import TabPanel from "@/components/TabPanel/TabPanel";
import GeneralSetting from "./Components/GeneralSetting";
import DepartmentSetting from "./Components/DepartmentSetting";
import SubscriptionInfo from "./Components/SubscriptionInfo";

const Settings: React.FC = () => {
  const tabsData = [
    {
      tabName: "General Setting",
      component: <GeneralSetting />,
    },
    { tabName: "Department", component: <DepartmentSetting /> },
    { tabName: "CRM Field", component: <div>CRM Field Content</div> },
    { tabName: "Subscription", component: <SubscriptionInfo /> },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      {/* <h2 className="mb-6 text-2xl font-semibold text-dark dark:text-white">
        Settings
      </h2> */}

      <div className="flex">
        <div className="w-full pr-6">
          <TabPanel
            tabsData={tabsData}
            type="line"
            tabPosition="left"
            defaultActiveKey="1"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
