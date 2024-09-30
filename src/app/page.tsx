import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Overview from "@/components/Dashboard/Overview";

export const metadata: Metadata = {
  title:
    "Connect-CRM - Your Sales Buddy! ",
  description: "Connect CRM is a code connect lab product. Connect CRM can be used for Sales and lead tracking.",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Overview />
      </DefaultLayout>
    </>
  );
}
