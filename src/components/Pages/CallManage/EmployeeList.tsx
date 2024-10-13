"use client";
import React, { useState } from 'react';
import DatePickerOne from '@/components/FormElements/DatePicker/DatePickerOne';
import ButtonDefault from '@/components/Buttons/ButtonDefault';
import CustomAntdTable from '@/components/Tables/CustomAntdTable';

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

      <CustomAntdTable
        columns={columns}
        dataSource={data}
        pagination={false}
        className="w-full"
      />

    </div>
  );
};

export default EmployeeList;