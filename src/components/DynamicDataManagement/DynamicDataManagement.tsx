import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import CustomAntdTable from "../Tables/CustomAntdTable";

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
}

interface DynamicDataManagementProps {
  title: string;
  fields: Field[];
  columns: any[];
  data: any[];
  onAdd: (newItem: any) => void;
  onEdit: (key: string, updatedItem: any) => void;
  onDelete: (key: string) => void;
}

const DynamicDataManagement: React.FC<DynamicDataManagementProps> = ({
  title,
  fields,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [formData, setFormData] = useState<any>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [sectionOpen, setSectionOpen] = useState<boolean>(false);

  useEffect(() => {
    const initialFormData = fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as any);
    setFormData(initialFormData);
  }, [fields]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setSectionOpen(false);
    if (editingKey) {
      onEdit(editingKey, formData);
      setEditingKey(null);
    } else {
      onAdd(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    const resetData = fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as any);
    setFormData(resetData);
  };

  const handleEdit = (key: string) => {
    setSectionOpen(true);
    const editingItem = data.find((item) => item.key === key);
    if (editingItem) {
      setFormData(editingItem);
      setEditingKey(key);
    }
  };

  const handleDelete = (key: string) => {
    onDelete(key);
  };

  const actionColumn = {
    title: "Action",
    key: "action",
    render: (_: any, record: any) => (
      <span>
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
          className="mr-2 text-red-500"
        />
        <Button
          icon={<EditOutlined />}
          onClick={() => handleEdit(record.key)}
          className="text-blue-500"
        />
      </span>
    ),
  };

  const tableColumns = [...columns, actionColumn];

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="mb-6 text-2xl font-semibold text-dark dark:text-white">
          {title}
        </h2>
        <ButtonDefault
          label={sectionOpen ? "Cancel" : "Add New"}
          onClick={() => setSectionOpen(!sectionOpen)}
        />
      </div>

      {sectionOpen && (
        <div className="mb-4 flex flex-wrap items-end gap-4 lg:flex-nowrap">
          {fields.map((field) => (
            <InputGroup
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder || field.label}
              value={formData[field.name]}
              onChange={handleInputChange}
              customClasses="w-full"
            />
          ))}
          <ButtonDefault
            label={editingKey ? "Update" : "Submit"}
            onClick={handleSubmit}
          />
        </div>
      )}

      <CustomAntdTable
        columns={tableColumns}
        dataSource={data}
        pagination={false}
        className="w-full"
      />
    </div>
  );
};

export default DynamicDataManagement;
