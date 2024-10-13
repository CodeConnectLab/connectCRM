"use client";

import React, { useState } from "react";
import { Table, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import CustomAntdTable from "@/components/Tables/CustomAntdTable";
import AddNewProduct from "./AddNewProduct";

interface ProductService {
  key: string;
  sn: number;
  productName: string;
  price: number;
  setupFee: number;
}

const data: ProductService[] = [
  { key: "1", sn: 1, productName: "Bhutani", price: 0, setupFee: 100 },
  { key: "2", sn: 2, productName: "Godrej", price: 0, setupFee: 10 },
  { key: "3", sn: 3, productName: "Whiteline", price: 0, setupFee: 100 },
  { key: "4", sn: 4, productName: "Fairfox", price: 0, setupFee: 100 },
  { key: "5", sn: 5, productName: "Noida extn", price: 0, setupFee: 100 },
  { key: "6", sn: 6, productName: "Farm House Jewer", price: 0, setupFee: 100 },
  { key: "7", sn: 7, productName: "Goa", price: 0, setupFee: 100 },
  {
    key: "8",
    sn: 8,
    productName: "Dholera Cyber city",
    price: 0,
    setupFee: 100,
  },
  { key: "9", sn: 9, productName: "DDA sec 22", price: 0, setupFee: 100 },
  { key: "10", sn: 10, productName: "Smart world", price: 555, setupFee: 100 },
  { key: "11", sn: 11, productName: "DLF Gurugram", price: 0, setupFee: 100 },
];

const ProductAndServiceDash = () => {
  const [productForm, setProductForm] = useState({
    enable: false,
    productData: {},
  });
  const handleAddNew = () => {
    setProductForm({ ...productForm, enable: !productForm.enable }); // Implement logic to add a new product/service
  };

  const columnsFormat = [
    {
      title: "S.N.",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "PRODUCT NAME",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "SETUP FEE",
      dataIndex: "setupFee",
      key: "setupFee",
      render: (price: number) => `Rs. ${price}`,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `Rs. ${price}`,
    },
    {
      title: "ACTION",
      dataIndex: "key",
      key: "action",
      render: (key: string) => (
        <span>
          <Button
            icon={<DeleteOutlined />}
            className="mr-2 bg-red-500 text-white"
            onClick={() => handleDelete(key)}
          />
          <Button
            icon={<EditOutlined />}
            className="bg-primary text-white"
            onClick={() => handleEdit(key)}
          />
        </span>
      ),
    },
  ];

  const handleDelete = (key: string) => {
    console.log("Delete product/service with key:", key);
    // Implement delete logic
  };

  const handleEdit = (key: string) => {
    console.log("Edit product/service with key:", key);
    const filterData = data.filter((item) => item?.key === key);
    setProductForm({ enable: true, productData: filterData[0] });
    // Implement edit logic
  };

  const handleSubmit = (enable: boolean, productData: any) => {
    setProductForm({
      enable,
      productData,
    });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-dark dark:text-white">
          Add or Edit product and services
        </h3>
        <ButtonDefault
          label={!productForm?.enable ? "Add New" : "Cancel"}
          onClick={handleAddNew}
        />
      </div>
      {productForm?.enable && (
        <AddNewProduct
          data={productForm?.productData}
          handleSubmit={handleSubmit}
        />
      )}
      <CustomAntdTable columns={columnsFormat} dataSource={data} />
    </div>
  );
};

export default ProductAndServiceDash;
