"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import StatusStats from "@/components/StatusStats/StatusStats";
import ChartOne from "@/components/Charts/ChartOne";
import { dataStats } from "@/types/dataStats";
import ViewsIcon from "../Assets/Icons/DashBoardIcons/ViewsIcon";
import DollarIcon from "../Assets/Icons/DashBoardIcons/DollarIcon";
import SquareBoxIcon from "../Assets/Icons/DashBoardIcons/SquareBoxIcon";
import UsersIcons from "../Assets/Icons/DashBoardIcons/UsersIcons";
import { statusStatsType } from "@/types/statusStats";

const StatusStatsData: statusStatsType[] = [
  {
    icon: <ViewsIcon />,
    color: "#3FD97F",
    title: "Meeting",
    value: 4,
    nextValue: 1,
    growthRate: 0.43,
  },
  {
    icon: <UsersIcons />,
    color: "#18BFFF",
    title: "Visits",
    value: 3,
    nextValue: 2,
    growthRate: -0.95,
  },
  {
    icon: <DollarIcon />,
    color: "#FF9C55",
    title: "Re-Visits",
    value: 4,
    nextValue: 2,
    growthRate: 4.35,
  },
  {
    icon: <SquareBoxIcon />,
    color: "#8155FF",
    title: "Schedule visit",
    value: 5,
    nextValue: 10,
    growthRate: 2.59,
  },
];
const totalStats: dataStats[] = [
  {
    icon: <ViewsIcon />,
    color: "#3FD97F",
    title: "All Leads",
    value: "3.456K",
    growthRate: 0.43,
  },
  {
    icon: <UsersIcons />,
    color: "#18BFFF",
    title: "Total Follow Up Leads",
    value: "3.465",
    growthRate: -0.95,
  },
  {
    icon: <DollarIcon />,
    color: "#FF9C55",
    title: "Total Profit",
    value: "$42.2K",
    growthRate: 4.35,
  },
  {
    icon: <SquareBoxIcon />,
    color: "#8155FF",
    title: "Total Agents",
    value: "2.450",
    growthRate: 2.59,
  },
];

const ECommerce: React.FC = () => {
  return (
    <>
      <DataStatsOne dataList={totalStats} />
      <StatusStats dataList={StatusStatsData} />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
