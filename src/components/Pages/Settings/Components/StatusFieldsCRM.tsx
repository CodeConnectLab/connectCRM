import React, { useState } from "react";
import DynamicDataManagement from "@/components/DynamicDataManagement/DynamicDataManagement";

const dataInitial: {
  key: string;
  status: string;
  display: string | number;
}[] = [
  { key: crypto.randomUUID(), status: "Call Back", display: "Call Back" },
  {
    key: crypto.randomUUID(),
    status: "Call Back Re-Visit",
    display: "Call Back Re-Visit",
  },
  {
    key: crypto.randomUUID(),
    status: "Call Back-Visit",
    display: "Call Back-Visit",
  },
];

export default function StatusFieldsCRM() {
  const fields = [
    {
      name: "display",
      label: "display status",
      type: "text",
    },
    {
      name: "status",
      label: "Status",
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
      title: "Display status name",
      dataIndex: "display",
      key: "display",
    },
    {
      title: "Status name",
      dataIndex: "status",
      key: "status",
    },
  ];
  const [data, setData] = useState(dataInitial);

  const handleAdd = (newItem: any) => {
    setData([
      ...data,
      { ...newItem, key: crypto.randomUUID() },
    ]);
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
      title="Lead Status List"
      fields={fields}
      columns={columns}
      data={data}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
