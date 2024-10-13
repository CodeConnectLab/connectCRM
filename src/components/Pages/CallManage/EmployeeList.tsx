"use client";
import React, { useState } from 'react';
import { Table } from 'antd';
import DatePickerOne from '@/components/FormElements/DatePicker/DatePickerOne';
import ButtonDefault from '@/components/Buttons/ButtonDefault';

interface EmployeeData {
  key: string;
  srNo: number;
  user: string;
  higstestNoOfCall: number;
  totalDuration: string;
  averageCallDuration: string;
}

const EmployeeList: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleStartDateChange = (selectedDates: Date[], dateStr: string) => {
    setStartDate(dateStr);
  };

  const handleEndDateChange = (selectedDates: Date[], dateStr: string) => {
    setEndDate(dateStr);
  };

  const handleSubmit = () => {
    console.log('Submitting with date range:', startDate, 'to', endDate);
    // Implement your submit logic here
  };

  const handleRefresh = () => {
    console.log('Refreshing data');
    // Implement your refresh logic here
  };

  const columns = [
    {
      title: 'Sr. No.',
      dataIndex: 'srNo',
      key: 'srNo',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Higstest No Of Call',
      dataIndex: 'higstestNoOfCall',
      key: 'higstestNoOfCall',
    },
    {
      title: 'Total Duration',
      dataIndex: 'totalDuration',
      key: 'totalDuration',
    },
    {
      title: 'Average Call Duration',
      dataIndex: 'averageCallDuration',
      key: 'averageCallDuration',
    },
  ];

  const data: EmployeeData[] = [
    {
      key: '1',
      srNo: 1,
      user: 'riya',
      higstestNoOfCall: 0,
      totalDuration: '0h 0m 0s',
      averageCallDuration: '0h 0m 0s',
    },
    // Add more data as needed
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <DatePickerOne
            label=""
            onChange={handleStartDateChange}
          />
          <DatePickerOne
            label=""
            onChange={handleEndDateChange}
          />
        </div>
        <div className="flex items-center space-x-4">
          <ButtonDefault
            label="Submit"
            onClick={handleSubmit}
            variant="primary"
            customClasses="bg-primary text-white"
          />
          <ButtonDefault
            label="Refresh"
            onClick={handleRefresh}
            variant="secondary"
            customClasses="bg-green-500 text-white"
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="w-full"
      />

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
        .dark .ant-table-tbody > tr:hover > td {
          background-color: #2d3748;
        }
        .dark .ant-picker {
          background-color: #374151;
          border-color: #4b5563;
        }
        .dark .ant-picker-input > input {
          color: #e5e7eb;
        }
        .dark .ant-picker-suffix {
          color: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default EmployeeList;