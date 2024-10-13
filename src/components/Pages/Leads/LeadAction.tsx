"use client";

import React, { useState } from "react";
import { Button, Tabs, Table } from "antd";
import { WhatsAppOutlined, MessageOutlined } from "@ant-design/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import ButtonDefault from "../../Buttons/ButtonDefault";
import CheckboxTwo from "../../FormElements/Checkboxes/CheckboxTwo";
import AllDetailsFields from "../Components/AllDetailsFields";
import AdditionalInformation from "../Components/AdditionalInformation";
import AttachmentTab from "../Components/AttachmentTab";
import CustomAntdTable from "../../Tables/CustomAntdTable";

const { TabPane } = Tabs;

const statusOptions = [
  { value: "Call Back", label: "Call Back" },
  { value: "Call Back-Re-visit", label: "Call Back-Re-visit" },
  { value: "Call Back-Schedule-visit", label: "Call Back-Schedule-visit" },
  { value: "Call Back-Visit", label: "Call Back-Visit" },
  { value: "Fake lead", label: "Fake lead" },
  { value: "Lost", label: "Lost" },
  { value: "Meeting", label: "Meeting" },
  { value: "Not Attempt", label: "Not Attempt" },
  { value: "Pending", label: "Pending" },
  { value: "SMS & Whatsapp Shoots", label: "SMS & Whatsapp Shoots" },
  { value: "Won", label: "Won" },
];

const staticData = [
  {
    fieldName: "Full name",
    fieldNameValue: "John Doe",
  },
  {
    fieldName: "Email",
    fieldNameValue: "johndoe@example.com",
  },
  {
    fieldName: "Contact Number",
    fieldNameValue: "+91 9876543210",
  },
  {
    fieldName: "Region",
    fieldNameValue: "Pune, Maharashtra",
  },
  {
    fieldName: "Lead source",
    fieldNameValue: "New York",
  },
  {
    fieldName: "Service",
    fieldNameValue: "Fair fox",
  },
];

const columns = [
  {
    title: "COMMENTED BY",
    dataIndex: "commentedBy",
    key: "commentedBy",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "FOLLOWUP DATE",
    dataIndex: "followupDate",
    key: "followupDate",
  },
  {
    title: "COMMENT",
    dataIndex: "comment",
    key: "comment",
  },
];

const data = [
  {
    key: "1",
    commentedBy: "Admin",
    date: "30/09/24 10:14:14",
    status: "Call Back",
    followupDate: "01/10/24 3:44:00",
    comment: "hiii",
  },
  {
    key: "2",
    commentedBy: "Admin",
    date: "25/09/24 3:32:00",
    status: "Call Back-Re-visit",
    followupDate: "27/09/24 9:01:00",
    comment: "sefse",
  },
];

const LeadAction: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "dfdsf",
    emailId: "tinnting@gmail.com",
    contactNo: "3432423424",
    service: "Fairfox",
    leadSource: "Just Dial",
    agentName: "juhi",
    status: "Call Back",
    followup: "",
    description: "",
    addToCalendar: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (selectedDates: Date[], dateStr: string) => {
    setFormData((prevData) => ({
      ...prevData,
      followup: dateStr,
    }));
  };

  const handleCheckboxChange = ({
    value,
    isChecked,
  }: {
    value: string;
    isChecked: boolean;
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      [value]: isChecked,
    }));
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-dark">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Basic Details
        </h2>
        {/* Messaging buttons :  can be used in Future.  */}
        {/* <div>
          <Button
            icon={<WhatsAppOutlined />}
            className="mr-2 border-none bg-green-500 text-white hover:bg-green-600"
          >
            Whatsapp
          </Button>
          <Button
            icon={<MessageOutlined />}
            className="hover:bg-primary-dark border-none bg-primary text-white"
          >
            Send SMS
          </Button>
        </div> */}
      </div>

      <div className="mb-8 flex w-full justify-between gap-8">
        <div className="flex w-full flex-col gap-4 border-r-2 pr-8 text-dark dark:text-white">
          {/* static Fields  */}
          {staticData?.map((item) => (
            <div
              key={item.fieldNameValue}
              className="flex w-full items-center border-b-2 border-solid border-gray py-2"
            >
              <span className="w-[220px] text-lg font-medium">
                {item.fieldName}
              </span>
              <span className="text-base ">{item.fieldNameValue}</span>
            </div>
          ))}
          <InputGroup
            label="Agent Name"
            name="agentName"
            type="text"
            placeholder="Lead's agent name"
            value={formData.agentName}
            onChange={handleInputChange}
          />
        </div>

        {/* Form Fields  */}
        <div className="flex w-full flex-col gap-4">
          <SelectGroupOne
            label="Status"
            options={statusOptions}
            setSelectedOption={(value) => handleSelectChange("status", value)}
          />

          <DatePickerOne label="Followup" onChange={handleDateChange} />

          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Notes about Lead."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              rows={2}
            />
          </div>

          <div className="flex items-center">
            <CheckboxTwo
              label="Add to Calender"
              onChange={handleCheckboxChange}
              checked={formData.addToCalendar}
              id="addToCalendar"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center ">
        <ButtonDefault
          onClick={handleSubmit}
          label="Submit"
          variant="primary"
        />
      </div>

      <Tabs defaultActiveKey="1" className="mt-6" type="card">
        <TabPane tab="History" key="1">
          <CustomAntdTable
            columns={columns}
            dataSource={data}
            pagination={false}
            className="dark:bg-gray-dark"
          />
        </TabPane>
        <TabPane tab="All Details" key="2">
          <AllDetailsFields />
        </TabPane>
        <TabPane tab="Additional Information" key="3">
          <AdditionalInformation />
        </TabPane>
        <TabPane tab="Attachment" key="4">
          <AttachmentTab />
        </TabPane>
      </Tabs>

      <style jsx global>{`
        .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #5750F1 !important;
        }
        .ant-tabs .ant-tabs-tab:hover{
          color: #5750F1 !important;
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
          background: #5750F1 !important;
        }
        .dark .ant-table {
          background: transparent;
          color: white;
        }
        .dark .ant-table-thead > tr > th {
          background: #1e2837;
          color: white;
          border-bottom: 1px solid #2d3748;
        }
        .dark .ant-table-tbody > tr > td {
          border-bottom: 1px solid #2d3748;
        }
        .dark .ant-table-tbody > tr:hover > td {
          background: #2d3748;
        }
      `}</style>
    </div>
  );
};

export default LeadAction;
