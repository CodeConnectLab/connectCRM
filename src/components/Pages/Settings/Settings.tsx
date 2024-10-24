"use client";
import React from "react";
import TabPanel from "@/components/TabPanel/TabPanel";
import GeneralSetting from "./Components/GeneralSetting";
import DepartmentSetting from "./Components/DepartmentSetting";
import SubscriptionInfo from "./Components/SubscriptionInfo";
import useScreenHook from "@/hooks/useScreenHook";
import { DeviceType } from "@/types/deviceType";
import CRMFields from "./Components/CRMFields";

const Settings: React.FC = () => {
  const tabsData = [
    {
      tabName: "General Setting",
      component: <GeneralSetting />,
    },
    { tabName: "Department", component: <DepartmentSetting /> },
    { tabName: "CRM Field", component:<CRMFields/>},
    { tabName: "Subscription", component: <SubscriptionInfo /> },
  ];

  const { deviceType } = useScreenHook();

  return (
    <div className="rounded-lg bg-white p-3 pt-0 lg:p-6 lg:pl-0 shadow-md dark:bg-gray-800">
      <div className="flex">
        <div className="w-full">
          {deviceType === "desktop" ? (
            <TabPanel
              tabsData={tabsData}
              type="line"
              tabPosition="left"
              defaultActiveKey="1"
            />
          ) : (
            <TabPanel
              tabsData={tabsData}
              type="line"
              tabPosition="top"
              defaultActiveKey="1"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
