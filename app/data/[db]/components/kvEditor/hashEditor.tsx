import { Button, Form, Input, Modal, Switch, Table } from "antd";
import { Editor } from "./type";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { useState } from "react";
import useModal from "@/app/data/hooks/useModal";

function hash2Table(hashData: Record<string, string>): Array<{
  key: string;
  value: string;
}> {
  return Object.entries(hashData).map(([key, value]) => ({ key, value }));
}
function HashEditor(props: Editor.HashEditorProps) {
  const { value } = props;
  const tableData = hash2Table(value);
  const [modalVisible, toggleVisible] = useModal();
  const columns = [
    {
      title: "姓名",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "年龄",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <>
          <Button icon={<FormOutlined />} className=" mr-2"></Button>
          <Button icon={<DeleteOutlined />}></Button>
        </>
      ),
    },
  ];
  return (
    <div>
      <div className=" flex">
        <Button className="mb-4" onClick={toggleVisible}>
          增加新记录
        </Button>
        <div className=" w-48 ml-4">
          <Input.Search className=""></Input.Search>
        </div>
      </div>

      <Modal title="新增键值对" open={modalVisible} onCancel={toggleVisible}>
        <Form className=" mt-5">
          <Form.Item label="field" required>
            <Input></Input>
          </Form.Item>
          <Form.Item label="value" required>
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <Form.Item label="hmset">
            <Switch></Switch>
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={tableData} columns={columns} />
    </div>
  );
}

export default HashEditor;
