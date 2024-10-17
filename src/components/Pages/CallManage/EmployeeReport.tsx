"use client";

import React, { useState } from "react";
import { Table, Tabs } from "antd";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import CustomAntdTable from "@/components/Tables/CustomAntdTable";
// import { render } from "react-dom";
import useScreenHook from "@/hooks/useScreenHook";
import CallDetails from "./components/CallDetails";

const { TabPane } = Tabs;
const data = [
  { type: "Miss Call", count: 9 },
  { type: "Not Connected Call", count: 33 },
  { type: "Connected Calls", count: 182 },
  { type: "Rejected", count: 9 },
  { type: "Working Hours", count: "00:38:17" },
];

const EmployeeReport: React.FC = () => {
  const [employee, setEmployee] = useState("Admin");
  const [fromDate, setFromDate] = useState("01/05/2024");
  const [toDate, setToDate] = useState("17/10/2024");
  const { deviceType } = useScreenHook();

  const handleEmployeeChange = (value: string) => {
    setEmployee(value);
  };

  const handleFromDateChange = (selectedDates: Date[], dateStr: string) => {
    setFromDate(dateStr);
  };

  const handleToDateChange = (selectedDates: Date[], dateStr: string) => {
    setToDate(dateStr);
  };

  const handleApply = () => {
    console.log("Applying filters:", { employee, fromDate, toDate });
    // Implement filter logic here
  };

  const summaryColumns = [
    {
      title: "Call Type",
      dataIndex: "callType",
      key: "callType",
      render: (text: any) => (
        <span style={{ color: returnColorCode(text) }}>{text}</span>
      ),
    },
    { title: "Calls", dataIndex: "calls", key: "calls" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
  ];

  const summaryData = [
    { key: "1", callType: "Incoming", calls: 27, duration: "00:08:45" },
    { key: "2", callType: "Outgoing", calls: 205, duration: "01:27:45" },
    { key: "3", callType: "Missed", calls: 9, duration: "-" },
    { key: "4", callType: "Rejected", calls: 9, duration: "-" },
    { key: "5", callType: "Total", calls: 241, duration: "01:36:10" },
  ];

  const donutChartData = [74, 64, 103, 1];
  const donutChartLabels = [
    "Incoming Call",
    "Outgoing Call",
    "Missed Call",
    "Rejected Call",
  ];
  const donutChartColors = ["#10b981", "#3b82f6", "#fbbf24", "#ec4899"];

  const donutChartOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: donutChartLabels,
    colors: donutChartColors,
    legend: {
      show: true,
      position: "right", // Change legend position to right
      fontSize: deviceType === "mobile" ? "7px" : "14px",
      fontFamily: "Helvetica, Arial, sans-serif",
      fontWeight: 400,
      itemMargin: {
        horizontal: 5,
        vertical: 2,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(0) + "%";
      },
      //   style: {
      //     fontSize: "16px",
      //     fontFamily: "Helvetica, Arial, sans-serif",
      //     fontWeight: "bold",
      //     colors: ["#fff", "#10b981"], // Set data label color to white
      //   },
      // dropShadow: {
      //   enabled: false,
      //   color: '#000',
      //   top: 1,
      //   left: 1,
      //   blur: 1,
      //   opacity: 0.45
      // }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
    ],
  };

  const returnColorCode = (type: string) => {
    switch (type) {
      case "Incoming":
        return "#10b981";
      case "Outgoing":
        return "#3b82f6";
      case "Missed":
        return "#fbbf24";
      case "Rejected":
        return "#ec4899";
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-6 text-2xl font-semibold text-dark dark:text-white">
        Employee Reports
      </h2>

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="w-full lg:w-1/4">
          <SelectGroupOne
            label="Select Employee"
            options={[{ value: "Admin", label: "Admin" }]}
            setSelectedOption={handleEmployeeChange}
          />
        </div>
        <div className="w-full lg:w-1/4">
          <DatePickerOne label="From Date" onChange={handleFromDateChange} />
        </div>
        <div className="w-full lg:w-1/4">
          <DatePickerOne label="To Date" onChange={handleToDateChange} />
        </div>
        <ButtonDefault
          label="Apply"
          onClick={handleApply}
          customClasses="min-w-[130px]"
        />
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Summary" key="1">
          <div className="flex flex-col items-center gap-3 lg:gap-0 lg:flex-row">
            <div className="w-full max-w-[560px] pr-4">
              <CustomAntdTable
                columns={summaryColumns}
                dataSource={summaryData}
                pagination={false}
              />
            </div>
            <div className="flex w-full min-w-[167px] flex-wrap gap-3 lg:w-auto">
              {data?.map((item) => (
                <div
                  key={item.type + item.count}
                  className="flex w-full max-w-[159px] flex-col justify-center bg-gray-100 p-2 px-4 dark:bg-gray-7 sm:max-w-[200px]"
                >
                  <span className="text-gray-6 dark:text-gray-5">
                    {item.type}
                  </span>
                  <span className="t font-semibold text-dark dark:text-white">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full">
              <ReactApexChart
                options={donutChartOptions}
                series={donutChartData}
                type="donut"
                height={350}
              />
            </div>
          </div>
        </TabPane>
        <TabPane tab="Analysis" key="2">
          Analysis Content
        </TabPane>
        <TabPane tab="Call Details" key="3">
         <CallDetails/>
        </TabPane>
      </Tabs>

      <style jsx global>{`
        .dark .ant-table {
          background-color: #1f2937;
          color: #e5e7eb;
        }
        .dark .ant-table-thead > tr > th {
          background-color: #374151;
          color: #e5e7eb;
          border-bottom: 1px solid #4b5563;
        }
        .dark .ant-table-tbody > tr > td {
          border-bottom: 1px solid #4b5563;
        }
        .dark .ant-tabs-tab {
          color: #e5e7eb;
        }
        .dark .ant-tabs-tab-active {
          color: #fff;
        }
        .dark .ant-tabs-ink-bar {
          background: #fff;
        }
      `}</style>
    </div>
  );
};

export default EmployeeReport;
