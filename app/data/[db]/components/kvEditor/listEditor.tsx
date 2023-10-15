import { Button, Form, Input, Modal, Select, Table, Tooltip } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import JsonEditor from "@/app/components/JsonEditor";
import useModal from "@/app/data/hooks/useModal";
import { useState } from "react";
import { deleteListItem } from "../../api/list";
import { useParams, useSearchParams } from "next/navigation";
import useEnv from "@/app/data/hooks/useEnv";
const useForm = Form.useForm;
type Props = {
  value: {
    count: number;
    value: Array<{
      id: number;
      value: string;
    }>;
  };
  onIndexChange: (index: number, value: string) => void;
  onIndexDelete: (index: number, value: string) => void;
  onAddItem: (value: string) => void;
  handleChange: () => {};
};

function ListEditor(props: Props) {
  const { value, onAddItem, onIndexChange, onIndexDelete } = props;
  const [visible, toggle] = useModal();
  const [jsonData, setJSONData] = useState("");
  const [insertType, setInsertType] = useState("left");
  const env = useEnv();
  const handleCreate = () => {
    const add_mode = insertType;
    const element = jsonData;
    onAddItem({
      add_mode,
      element,
    });
    toggle();
  };

  const handleDeleteElement = (element: string) => {
    deleteListItem(env, { type: "list", element, delete_count: "one" });
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
      render: (element: any) => {
        const { value } = element;
        return (
          <div>
            <Button icon={<FormOutlined />} className=" mr-2"></Button>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteElement(value)}
            ></Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className=" flex mb-4 items-center ">
        <span
          style={{ paddingTop: "1px", paddingBottom: "1px" }}
          className=" mr-2 px-1 rounded text-sm border border-primary-600 text-primary-600"
        >
          列表元素个数: <span className=" font-semibold">{value.count}</span>
        </span>
        <div className=" w-44 mr-4 ">
          <Input.Search placeholder="eg. 1,1-2"></Input.Search>
        </div>
        <Button onClick={toggle}>添加记录</Button>
      </div>
      <Table dataSource={value.value} columns={columns} />

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
