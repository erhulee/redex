import React from "react";
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
const ConnectList: React.FC<Props> = (props: Props) => {
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
    <div className={`${props.className} w-44 mt-4 px-4 `}>
      <span className=" font-semibold mb-2 border-b-2 pb-1 block border-primary-500">
        当前链接池
      </span>

      <Tree
        showIcon
        defaultExpandAll
        treeData={treeData}
        defaultSelectedKeys={["0-0-0"]}
        switcherIcon={<DownOutlined />}
      ></Tree>
    </div>
  );
};

export default ConnectList;
