import React from "react";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";

export default function CustomCollapse({ items }: CollapseProps) {
  return (
    <>
      <Collapse items={items} defaultActiveKey={["1"]} className="bg-primary" />

      <style jsx global>{`
        :where(.css-dev-only-do-not-override-5wsri9).ant-collapse>.ant-collapse-item >.ant-collapse-header .ant-collapse-arrow{
            color: white;
        }
        .dark :where(.css-dev-only-do-not-override-5wsri9).ant-collapse .ant-collapse-content>.ant-collapse-content-box{
        background: #122031;
        }
        .dark :where(.css-dev-only-do-not-override-5wsri9).ant-collapse{
            border-color: black;
        }
        .dark :where(.css-dev-only-do-not-override-5wsri9).ant-collapse .ant-collapse-content{
            border-color: black;

        }
    `}</style>
    </>
  );
}
