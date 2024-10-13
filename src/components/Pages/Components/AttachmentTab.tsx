import React, { useState, useRef } from "react";
import { Button, Table, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import FileUploadFillType from "@/components/FormElements/FileUpload/FileUploadFillType";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import CustomAntdTable from "@/components/Tables/CustomAntdTable";
import InputGroup from "@/components/FormElements/InputGroup";

interface FileData {
  key: string;
  serial: number;
  file: string;
  fileName: string;
  location: string;
  created: string;
}

const AttachmentTab: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log({ selectedFile });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newFile: FileData = {
        key: Date.now().toString(),
        serial: uploadedFiles.length + 1,
        file: selectedFile.name,
        fileName: fileName || selectedFile.name,
        location: "Current Location", // You might want to get this dynamically
        created: new Date().toLocaleString(),
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      setSelectedFile(null);
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const columns = [
    { title: "Serial", dataIndex: "serial", key: "serial" },
    { title: "File", dataIndex: "file", key: "file" },
    { title: "File Name", dataIndex: "fileName", key: "fileName" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Created", dataIndex: "created", key: "created" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button size="small" className="dark:text-white">
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-white">
      <div className="mb-6">
        <div className="mb-4 flex w-full items-center border-b-2 border-solid border-gray py-2">
          <span className="w-[220px] text-lg font-medium">Attach file </span>
        </div>
        <div className="flex w-full flex-col items-center space-x-4">
          <div className="flex w-full gap-3">
            <div className="w-full">
              <FileUploadFillType
                onChange={handleFileChange}
                ref={fileInputRef}
                id="fileInput"
                required={true}
              />
            </div>
            <InputGroup
              placeholder="Current Location"
              customClasses="w-full"
              readOnly
            />
            <InputGroup
              placeholder="Enter File Name"
              value={fileName}
              onChange={handleFileNameChange}
              customClasses="w-full"
            />
            <ButtonDefault
              onClick={handleUpload}
              disabled={!selectedFile}
              label="Upload"
              variant="primary"
            />
          </div>
        </div>
      </div>

      <CustomAntdTable
        columns={columns}
        dataSource={uploadedFiles}
        pagination={false}
        className="w-full"
      />
    </div>
  );
};

export default AttachmentTab;
