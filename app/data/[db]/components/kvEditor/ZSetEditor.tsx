import { Button, Table } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";

function ZSetEditor(props: {
  value: {
    size: number;
    value: Array<{
      element: string;
      score: number | string;
    }>;
  };
}) {
  const dataSource = props.value.value;
  const columns = [
    {
      title: "score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "value",
      dataIndex: "element",
      key: "element",
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

export default ZSetEditor;
