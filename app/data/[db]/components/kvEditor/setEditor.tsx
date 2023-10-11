import { Button, Input, Table } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "操作",
    key: "action",
    render: () => {
      return (
        <div>
          <Button icon={<FormOutlined />} className=" mr-2"></Button>
          <Button icon={<DeleteOutlined />}></Button>
        </div>
      );
    },
  },
];
function SetEditor() {
  const dataSource = [
    {
      id: 1,
      value: "a",
    },
  ];

  return (
    <div>
      <div className=" flex items-center gap-3 mb-4">
        <div className=" font-semibold text-sm">
          set长度: <span className=" font-medium  text-blue-700">9</span>
        </div>
        <Button>添加新记录</Button>
        <div className=" w-44">
          <Input.Search placeholder="search value"></Input.Search>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default SetEditor;
