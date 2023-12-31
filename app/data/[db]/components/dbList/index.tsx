import React from "react";
import "./index.css";
import Link from "next/link";
import { Button, Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { DataNode } from "antd/es/tree";
type DBListItem = {
  name: string;
  value: number;
  keys: number;
};
type Props = {
  list: Array<DBListItem>;
  className?: string;
  currentDB: number;
};
const DBList: React.FC<Props> = (props: Props) => {
  const { list } = props;
  const treeData: DataNode[] = [
    {
      title: "本地数据库",
      key: "0-0",
      children: [
        {
          title: "127.0.0.1",
          key: "0-0-0",
        },
        // {
        //   title: "leaf",
        //   key: "0-0-1",
        //   icon: ({ selected }) =>
        //     selected ? <FrownFilled /> : <FrownOutlined />,
        // },
      ],
    },
  ];

  return (
    <div className={`${props.className} w-44 mt-6 px-4 `}>
      <span className=" font-semibold mb-2 border-b-2 pb-1 block border-primary-500">
        当前数据库
      </span>
      {list.map((item, index) => (
        <Link href={`/data/${index}`}>
          <div
            className={`${
              item.value == props.currentDB ? "active-item" : ""
            } text-sm px-4 py-1 w-full font-light rounded hover:bg-slate-100`}
            key={item.name}
          >{`${item.name}(${item.keys})`}</div>
        </Link>
      ))}
    </div>
  );
};

export default DBList;
