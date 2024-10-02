"use client";
import React, { useState } from "react";
import { Table, Button, Input, Select, Checkbox } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CustomAntdTable from "../Tables/CustomAntdTable";
import CheckboxTwo from "../FormElements/Checkboxes/CheckboxTwo";
import LeadsTableHeader from "./LeadsTableHeader";
const Option = Select;
const FollowupLeads = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const columns = [
    {
      title: "Checkbox",
      dataIndex: "key",
      key: "Checkbox",
      render: (data: number) => (
        <div>
          <CheckboxTwo id={data} onChange={rowSelection} />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Lead Source",
      dataIndex: "leadSource",
      key: "leadSource",
    },
    {
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
    },
    {
      title: "Follow Up data",
      dataIndex: "status",
      key: "followUp",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex space-x-2">
          <Button icon={<EditOutlined />} className="bg-primary text-white" />
          <Button icon="C" className="bg-green text-sm text-white" />
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "testing",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
    {
      key: "2",
      name: "testing2",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
    {
      key: "3",
      name: "testing3",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
    {
      key: "4",
      name: "testing4",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
    {
      key: "5",
      name: "testing5",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
    {
      key: "6",
      name: "testing6",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
    {
      key: "7",
      name: "testing8",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
    {
      key: "8",
      name: "testing10",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
    {
      key: "9",
      name: "testing12",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
    {
      key: "10",
      name: "testing14",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
    {
      key: "11",
      name: "testing17",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
    {
      key: "12",
      name: "testing18",
      number: "2342342342",
      leadSource: "Just Dial",
      agent: "Anu",
      status: "Call Back",
      service: "Godrej",
    },
  ];

  const rowSelection = ({
    value,
    isChecked,
  }: {
    value: number;
    isChecked: boolean;
  }) => {
    if (isChecked) {
      setSelectedRowKeys([...selectedRowKeys, value]);
    } else {
      const filteredArray = selectedRowKeys.filter((item) => item !== value);
      setSelectedRowKeys(filteredArray);
    }
  };

  return (
    <div className="p-4">
      <LeadsTableHeader/>
      {/* <Table
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          total: 12,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `1-${total} of ${total}`,
        }}
      /> */}
      <CustomAntdTable columns={columns} dataSource={data} />

      <div className="mt-4 flex items-center justify-between">
        <Select defaultValue="10" className="w-32">
          <Option value="10">10</Option>
        </Select>
        <div>1-12 of 12</div>
      </div>
    </div>
  );
};

export default FollowupLeads;
