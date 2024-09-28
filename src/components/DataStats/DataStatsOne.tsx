import React from "react";
import { dataStats } from "@/types/dataStats";
import GrowthIconGreen from "../Assets/Icons/DashBoardIcons/GrowthIconGreen";
import FallIconRed from "../Assets/Icons/DashBoardIcons/FallIconRed";

interface DataStatsProps {
  dataList: dataStats[];
}
const DataStatsOne: React.FC<DataStatsProps> = ({ dataList }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {dataList.map((item, index) => (
          <div
            key={index}
            className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
          >
            <div
              className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                  {item.value}
                </h4>
                <span className="text-body-sm font-medium">{item.title}</span>
              </div>

              <span
                className={`flex items-center gap-1.5 text-body-sm font-medium ${
                  item.growthRate && item.growthRate > 0
                    ? "text-green"
                    : "text-red"
                }`}
              >
                {item.growthRate && `${item.growthRate}%`}
                {item.growthRate && item.growthRate > 0 ? (
                  <GrowthIconGreen/>
                ) : item.growthRate && item.growthRate <= 0 ? (
                  <FallIconRed/>
                ) : null}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataStatsOne;
