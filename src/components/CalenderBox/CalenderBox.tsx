"use client"
import React, { useState } from "react";
import { Calendar, Badge } from "antd";
import type { Dayjs } from "dayjs";
import type { BadgeProps, CalendarProps } from "antd";
import dayjs from "dayjs";

interface CalendarEvent {
  type: BadgeProps["status"];
  content: string;
}

const getListData = (value: Dayjs): CalendarEvent[] => {
  const listData: CalendarEvent[] = [];

  if (value.date() === 1) {
    listData.push({ type: "warning", content: "Redesign Website" });
  }
  if (value.date() === 25) {
    listData.push({ type: "success", content: "App Design" });
  }

  return listData;
};

const CalendarBox: React.FC = () => {
  const [value, setValue] = useState(() => dayjs(new Date()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  return (
    <>
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
      <style jsx global>{`
    .dark .ant-picker-calendar.ant-picker-calendar-full .ant-picker-panel {
      background: #122031 !important;
    }
    
    .dark .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-calendar-date, .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-calendar-date-today{
      background-color: #374151 ;
    }

    .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-calendar-date, .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-calendar-date-today{
      background-color: #e6f4ff ;
    }
      
    .ant-picker-calendar{
      background: transparent !important;

    }
    .ant-picker-calendar .ant-picker-content th{
      color: white;
      text-align:center
    }

    .ant-picker-calendar .ant-picker-content thead{
      background: #5750F1;
      font-size: 18px;
      font-weight: 800;
      font-family: 'Satoshi';
      height: 41px;
    }

    .dark .ant-picker-calendar .ant-picker-cell{
    color: rgb(156 163 175) ;
    }

    .dark .ant-picker-calendar .ant-picker-cell-in-view{
      color: white ;
    }
    
    .dark .ant-picker-calendar.ant-picker-calendar-full .ant-picker-calendar-date{
      border-color: white;
    }

    .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-selected .ant-picker-calendar-date .ant-picker-calendar-date-value, .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-selected:hover .ant-picker-calendar-date .ant-picker-calendar-date-value, .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-selected .ant-picker-calendar-date-today .ant-picker-calendar-date-value, .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-selected:hover .ant-picker-calendar-date-today .ant-picker-calendar-date-value{
      font-size: 24px;
    }

    .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-selected .ant-picker-calendar-date .ant-picker-calendar-date-value, .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-selected:hover .ant-picker-calendar-date .ant-picker-calendar-date-value, .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-selected .ant-picker-calendar-date-today .ant-picker-calendar-date-value, .ant-picker-calendar.ant-picker-calendar-full .ant-picker-cell-selected:hover .ant-picker-calendar-date-today .ant-picker-calendar-date-value{
      color: #3183f6;
      font-size: 26px;
      font-weight: 600;
    }

    .ant-picker-calendar .ant-picker-calendar-header{
      border-radius: 8px;
      background: #5750F1;
      padding: 12px 12px;
    }
    `}</style>
    </>
  );
};

export default CalendarBox;
