import React from "react";
import { Button, Tabs, Table } from "antd";
const { TabPane } = Tabs;

interface TabComponent {
  tabName: string;
  component: React.ReactNode;
}

interface TabsInterface {
  tabsData: TabComponent[];
  type?: "line" | "card" | "editable-card";
  customClassName?: string;
  tabPosition?: "top" | "right" | "bottom" | "left";
  defaultActiveKey: string;
}

export default function TabPanel({
  tabsData,
  type = "line",
  defaultActiveKey = "1",
  customClassName = "",
  tabPosition = "top",
}: TabsInterface) {
  return (
    <>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        className={customClassName}
        type={type}
        tabPosition={tabPosition}
      >
        {tabsData?.map((item: any, index: number) => (
          <TabPane tab={item.tabName} key={index + 1}>
            {item.component}
          </TabPane>
        ))}
      </Tabs>
      <style jsx global>{`
        .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #5750f1 !important;
        }
        .ant-tabs .ant-tabs-tab:hover {
          color: #5750f1 !important;
        }
        .dark .ant-tabs .ant-tabs-tab-btn {
          color: #fff;
        }
        .ant-tabs .ant-tabs-tab-btn:focus:not(:focus-visible),
        .ant-tabs .ant-tabs-tab-remove:focus:not(:focus-visible),
        .ant-tabs .ant-tabs-tab-btn:active,
        .ant-tabs .ant-tabs-tab-remove:active {
          color: #5750f1 !important;
        }
        .ant-tabs-ink-bar {
          background: #5750f1 !important;
        }
      `}</style>
    </>
  );
}
