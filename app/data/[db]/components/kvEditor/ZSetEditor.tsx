import { Button, Input, Modal, Table } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import FieldEditor from "@/app/components/FieldEditor";

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
  return (
    <div>
      <div className=" flex items-center gap-3 mb-4">
        <div className=" font-semibold text-sm">
          sorted set 长度:{" "}
          <span className=" font-medium  text-blue-700">
            {props.value.size}
          </span>
        </div>
        <Button>添加新记录</Button>
        <div className=" w-44">
          <Input.Search placeholder="search value"></Input.Search>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <Modal open title="修改数据" width={900}>
        <FieldEditor mode="json"></FieldEditor>
      </Modal>
    </div>
  );
}

export default ZSetEditor;
