import { Button, Form, Input, Modal, Select, Table, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import JsonEditor from "@/app/components/JsonEditor";
import useModal from "@/app/data/hooks/useModal";
import { useState } from "react";

type Props = {
  value: Array<{
    id: number;
    value: string;
  }>;
  handleChange: () => {};
};
function ListEditor(props: Props) {
  const dataSource = props.value;
  const [visible, toggle] = useModal();
  const [jsonData, setJSONData] = useState("");
  const [insertType, setInsertType] = useState("left");
  const handleCreate = () => {
    console.log({
      insertType,
      jsonData,
    });
  };
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
  return (
    <div>
      <div className=" flex mb-4 ">
        <div className=" w-44 mr-4 ">
          <Input.Search placeholder="eg. 1,1-2"></Input.Search>
        </div>
        <Button onClick={toggle}>添加记录</Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />

      <Modal
        open={visible}
        title="添加记录"
        width={1200}
        okText="创建"
        cancelText="取消"
        onCancel={toggle}
        onOk={handleCreate}
      >
        <Form.Item label="插入方式">
          <Select value={insertType} onChange={setInsertType}>
            <Select.Option key={"left"}>从左插入</Select.Option>
            <Select.Option key={"right"}>从右插入</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="插入字符">
          <JsonEditor
            value={jsonData}
            handleChangeValue={setJSONData}
          ></JsonEditor>
        </Form.Item>
      </Modal>
    </div>
  );
}

export default ListEditor;
