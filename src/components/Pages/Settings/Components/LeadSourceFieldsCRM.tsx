import React, { useState } from "react";
import DynamicDataManagement from "@/components/DynamicDataManagement/DynamicDataManagement";
// import { randomUUID } from "crypto";

const dataInitial: {
  leadSourceName: string;
  key: string | number;
}[] = [
  { key: crypto.randomUUID(), leadSourceName: "Bhutani" },
  { key: crypto.randomUUID(), leadSourceName: "Godrej" },
];

export default function LeadSourceFieldsCRM() {
  const fields = [
    {
      name: "leadSourceName",
      label: "Lead source name",
      type: "text",
    },
  ];

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: "Lead source name",
      dataIndex: "leadSourceName",
      key: "leadSourceName",
    },
  ];
  const [data, setData] = useState(dataInitial);

  const handleAdd = (newItem: any) => {
    setData([...data, { ...newItem, key: crypto.randomUUID() }]);
  };

  const handleEdit = (key: any, updatedItem: any) => {
    setData(
      data.map((item) => (item.key === key ? { ...updatedItem, key } : item)),
    );
  };

  const handleDelete = (key: string) => {
    setData(data.filter((item) => item.key !== key));
  };
  return (
    <DynamicDataManagement
      title="Lead source name"
      fields={fields}
      columns={columns}
      data={data}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
