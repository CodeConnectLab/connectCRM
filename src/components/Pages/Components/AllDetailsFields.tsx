import React, { useState } from "react";
import { Button, Tabs, Table } from "antd";
import { WhatsAppOutlined, MessageOutlined } from "@ant-design/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import ButtonDefault from "../../Buttons/ButtonDefault";
import CheckboxTwo from "../../FormElements/Checkboxes/CheckboxTwo";

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

const AllDetailsFields: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "dfdsf",
    emailId: "tinnting@gmail.com",
    companyName: "",
    website: "",
    service: "Fairfox",
    contactNo: "3432423424",
    alternativeNo: "",
    position: "",
    leadSource: "Just Dial",
    leadCost: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = () => {
    console.log("Form data:", formData);
    // Here you would typically send the data to your backend
  };

  // Mock options for the lead source dropdown
  const leadSourceOptions = [
    { value: "Just Dial", label: "Just Dial" },
    { value: "Website", label: "Website" },
    { value: "Referral", label: "Referral" },
    { value: "Other", label: "Other" },
  ];
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-dark">
      <div className="mb-8 flex w-full justify-between gap-8">
        <div className="flex w-full flex-col gap-4 border-r-2 pr-8 text-dark dark:text-white">
          {/* left Fields  */}
          <InputGroup
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <SelectGroupOne
            label="Status"
            options={statusOptions}
            setSelectedOption={(value) => handleSelectChange("status", value)}
          />
          <InputGroup
            label="Company Name"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Service"
            name="service"
            type="text"
            value={formData.service}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Alternative No"
            name="alternativeNo"
            type="tel"
            value={formData.alternativeNo}
            onChange={handleInputChange}
          />
          <SelectGroupOne
            label="Lead Source"
            options={leadSourceOptions}
            setSelectedOption={(value) =>
              handleSelectChange("leadSource", value)
            }
          />
        </div>
        {/* Right Fields  */}
        <div className="flex w-full flex-col gap-4">
          <InputGroup
            label="Email Id"
            name="emailId"
            type="email"
            value={formData.emailId}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Website"
            name="website"
            type="text"
            value={formData.website}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Contact No"
            name="contactNo"
            type="tel"
            value={formData.contactNo}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Position"
            name="position"
            type="text"
            value={formData.position}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Lead Cost"
            name="leadCost"
            type="text"
            value={formData.leadCost}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex w-full justify-center ">
        <ButtonDefault
          onClick={handleSubmit}
          label="Submit"
          variant="primary"
        />
      </div>
    </div>
  );
};

export default AllDetailsFields;
