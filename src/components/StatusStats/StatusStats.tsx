import React from "react";
import { statusStatsType } from "@/types/statusStats";
import { DoubleRightOutlined } from "@ant-design/icons";

interface DataStatsProps {
  dataList: statusStatsType[];
}
const StatusStats: React.FC<DataStatsProps> = ({ dataList }) => {
  return (
    <>
      <div className="flex w-full gap-4 overflow-auto">
        {dataList.map((item, index) => (
          <div
            key={index}
            className="w-full min-w-[268px] rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
          >
            <div
              className="flex h-14.5 w-14.5 items-center justify-center rounded-full text-2xl text-white"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div className="w-full">
                <div className="mb-1.5 flex items-center justify-between text-heading-6 font-bold text-dark dark:text-white">
                  <h4 className=" font-medium">{item.value}</h4>
                  <h4 className=" font-medium">
                    <DoubleRightOutlined />{" "}
                  </h4>
                  <h4 className=" font-medium">{item.nextValue}</h4>
                </div>
                <span className="text-body-sm  font-medium"> {item.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StatusStats;
