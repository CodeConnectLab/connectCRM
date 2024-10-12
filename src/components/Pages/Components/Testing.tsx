import React, { useState } from 'react';
import { Button } from 'antd';
import InputGroup from '@/components/FormElements/InputGroup';
import SelectGroupOne from '@/components/FormElements/SelectGroup/SelectGroupOne';

const LeadInformationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'dfdsf',
    emailId: 'tinnting@gmail.com',
    companyName: '',
    website: '',
    service: 'Fairfox',
    contactNo: '3432423424',
    alternativeNo: '',
    position: '',
    leadSource: 'Just Dial',
    leadCost: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    // Here you would typically send the data to your backend
  };

  // Mock options for the lead source dropdown
  const leadSourceOptions = [
    { value: 'Just Dial', label: 'Just Dial' },
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <div className="bg-white dark:bg-gray-dark p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-6">
        <InputGroup
          label="Full Name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Email Id"
          name="emailId"
          type="email"
          value={formData.emailId}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Company Name"
          name="companyName"
          type="text"
          value={formData.companyName}
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
          label="Service"
          name="service"
          type="text"
          value={formData.service}
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
          label="Alternative No"
          name="alternativeNo"
          type="tel"
          value={formData.alternativeNo}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Position"
          name="position"
          type="text"
          value={formData.position}
          onChange={handleInputChange}
        />
        <SelectGroupOne
          label="Lead Source"
          options={leadSourceOptions}
          setSelectedOption={(value) => handleSelectChange('leadSource', value)}
        />
        <InputGroup
          label="Lead Cost"
          name="leadCost"
          type="text"
          value={formData.leadCost}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-primary text-white border-none hover:bg-primary-dark px-8 py-2 rounded"
        >
          Submit
        </Button>
      </div>

      <style jsx global>{`
        .dark .ant-input,
        .dark .ant-select-selector {
          background-color: #1f2937;
          border-color: #374151;
          color: white;
        }
        .dark .ant-select-arrow {
          color: white;
        }
        .dark .ant-input::placeholder {
          color: #9ca3af;
        }
        .dark .ant-btn-primary {
          background-color: #1890ff;
        }
        .dark .ant-btn-primary:hover {
          background-color: #40a9ff;
        }
      `}</style>
    </div>
  );
};

export default LeadInformationForm;