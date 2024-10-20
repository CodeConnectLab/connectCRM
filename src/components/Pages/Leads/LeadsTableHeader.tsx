import React, { useState } from "react";
import SelectGroupOne from "../../FormElements/SelectGroup/SelectGroupOne";
import ButtonDefault from "../../Buttons/ButtonDefault";
import SearchForm from "../../Header/SearchForm";
import { SearchOutlined } from "@ant-design/icons";
import AdvanceFilterUI from "../Components/AdvanceFilterUI";

const selectOptionsData = {
  agents: {
    label: "Assign to agents",
    options: [
      {
        label: "Shashank",
        value: 8948492799,
      },
      {
        label: "Kiran",
        value: 9321220039,
      },
      {
        label: "Abhilekh",
        value: 33098938928,
      },
    ],
  },
  status: {
    label: "Lead status",
    options: [
      {
        value: "Call Back",
        label: "Call Back",
      },
      {
        value: "Call Back-Re-visit",
        label: "Call Back-Re-visit",
      },
      {
        value: "Call Back-Schedule-visit",
        label: "Call Back-Schedule-visit",
      },
      {
        value: "Call Back-Visit",
        label: "Call Back-Visit",
      },
      {
        value: "Fake lead",
        label: "Fake lead",
      },
      {
        value: "Lost",
        label: "Lost",
      },
      {
        value: "Meeting",
        label: "Meeting",
      },
      {
        value: "Not Attempt",
        label: "Not Attempt",
      },
      {
        value: "Pending",
        label: "Pending",
      },
      {
        value: "SMS & Whatsapp Shoots",
        label: "SMS & Whatsapp Shoots",
      },
      {
        value: "Won",
        label: "Won",
      },
    ],
  },
};

export default function LeadsTableHeader() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    leadSource: "",
    productAndService: [],
    assignedAgent: "",
    leadStatus: "",
    followUpDate: "",
    description: "",
  });

  const [isAdvanceFilterEnable, setIsAdvanceFilterEnable] =
    useState<boolean>(false);
  const handleSelectChange = (
    name: string,
    value: string | number | string[] | number[],
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      {" "}
      <div className="mb-4 flex justify-between">
        <div className="flex flex-col  items-center justify-center gap-3 rounded-md border border-stroke bg-white px-6.5 py-2 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <span className="text-base font-medium text-dark dark:text-white">
            Bulk Action on selected rows
          </span>
          <div className="flex space-x-2">
            <SelectGroupOne
              options={selectOptionsData["status"]?.options}
              setSelectedOption={(value) => handleSelectChange("status", value)}
            />
            <SelectGroupOne
              options={selectOptionsData["agents"]?.options}
              setSelectedOption={(value) => handleSelectChange("agents", value)}
            />
            <ButtonDefault label="Submit" variant="primary" fullWidth />
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <ButtonDefault
            icon={<SearchOutlined />}
            label="Advance Filter"
            variant="outline"
            onClick={() => setIsAdvanceFilterEnable(!isAdvanceFilterEnable)}
            fullWidth
          />
          <div className="flex gap-2">
            <ButtonDefault mode="link" link={"/import"} label="↓ Import" variant="outline" />
            <ButtonDefault mode="link" link={"/leads/add"} label="+ Add Lead" variant="outline" />
          </div>
        </div>
      </div>
      {isAdvanceFilterEnable && <AdvanceFilterUI />}

      <div className="mb-4 flex justify-between">
        <div className="flex min-w-[330px] gap-2">
          <ButtonDefault label="Select All" variant="primary" fullWidth />
          <ButtonDefault
            label="Select Per Page"
            variant="secondary"
            fullWidth
          />
        </div>
        <div className="ml-2 w-full">
          <SearchForm customClasses="border-stroke-dark" />
        </div>
        <div className="flex space-x-2">
          <ButtonDefault
            label="Export PDF"
            variant="outline"
            customClasses="bg-black text-white"
          />
          <ButtonDefault
            label="Export Excel"
            variant="outline"
            customClasses="bg-black text-white"
          />
          <ButtonDefault
            label="Delete"
            variant="outline"
            customClasses="bg-red-500 text-white"
          />
        </div>
      </div>
    </>
  );
}
