import { Button, Form, Input, InputNumber, Modal, Table } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import useModal from "@/app/data/hooks/useModal";
import JsonEditor from "@/app/components/JsonEditor";
import { ZSetCURD } from "../../api/zset";
import useEnv from "@/app/data/hooks/useEnv";
import { useState } from "react";
type Props = {
  value: {
    size: number;
    value: Array<{
      element: string;
      score: number | string;
    }>;
  };
  refetch: () => void;
  onUpdateScore: (element: string, score_diff: number) => Promise<any>;
};
function ZSetEditor(props: Props) {
  const { value, onUpdateScore, refetch } = props;
  const [addModalVisible, toggleAddModalVisible] = useModal();
  const env = useEnv();
  const onDeleteItem = async (element: string) => {
    await ZSetCURD.delete(env, {
      type: "zset",
      element: element,
    });
    refetch();
  };

  const [addItemParams, setAddItemParams] = useState({
    score: 0,
    element: "",
  });
  const onAddItem = async () => {
    const { score, element } = addItemParams;
    console.log({
      score,
      element,
    });
    await ZSetCURD.add(env, {
      type: "zset",
      element: element,
      score: String(score),
    });
    toggleAddModalVisible();
    refetch();
    setAddItemParams({
      score: 0,
      element: "",
    });
  };
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
      render: (item: any) => {
        const { element, score } = item;
        return (
          <div>
            <Button icon={<FormOutlined />} className=" mr-2"></Button>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => onDeleteItem(element)}
            ></Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className=" flex items-center gap-3 mb-4">
        <div className=" text-sm ">
          sorted set 长度:{" "}
          <span className="font-semibold  text-blue-700">{value.size}</span>
        </div>
        <Button onClick={toggleAddModalVisible}>添加新记录</Button>
        <div className=" w-44">
          <Input.Search placeholder="search value"></Input.Search>
        </div>
      </div>
      <Table dataSource={value.value} columns={columns} />
      <Modal
        open={addModalVisible}
        title="修改数据"
        width={900}
        okText="创建"
        cancelText="取消"
        onCancel={toggleAddModalVisible}
        onOk={onAddItem}
      >
        <Form.Item label="score">
          <InputNumber
            value={addItemParams.score}
            onChange={(score) => {
              setAddItemParams({
                ...addItemParams,
                score: Number(score),
              });
            }}
          ></InputNumber>
        </Form.Item>
        <JsonEditor
          value={addItemParams.element}
          handleChangeValue={(content) => {
            console.log("content:", content);
            setAddItemParams({
              ...addItemParams,
              element: content,
            });
          }}
        />
      </Modal>
    </div>
  );
}

export default ZSetEditor;
