import { Button, Input, InputNumber, Table, TableColumnProps } from "antd";
import {
  DeleteOutlined,
  ReloadOutlined,
  CheckOutlined,
  FormOutlined,
} from "@ant-design/icons";

function ListEditor() {
  const dataSource = [
    {
      id: 1,
      value: "a",
    },
  ];
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
  return <Table dataSource={dataSource} columns={columns} />;
}

export default ListEditor;
