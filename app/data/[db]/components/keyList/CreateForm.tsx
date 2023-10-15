import { Form, Input, Modal, Select, Switch } from "antd";
const Item = Form.Item;
const useForm = Form.useForm;
const options = [
  "string",
  "set",
  "list",
  "hash",
  "zset",
  "bitmaps",
  "hyperloglogs",
  "streams",
].map((i) => ({ value: i, label: i }));
function CreateForm(props: {
  visible: boolean;
  toggle: () => void;
  onCreate: (key: string, type: string) => Promise<any>;
}) {
  const { visible, toggle } = props;
  const [form] = useForm();
  const handleModalConfirm = async () => {
    const { key, type } = form.getFieldsValue();
    await props.onCreate(key, type);
    form.resetFields();
    toggle();
  };
  return (
    <Modal
      open={visible}
      onCancel={() => {
        toggle();
        form.resetFields();
      }}
      title="新建Key"
      okText="创建"
      onOk={handleModalConfirm}
      cancelText="退出"
    >
      <Form form={form} labelCol={{ span: 3 }}>
        <Item label="KEY" required name="key">
          <Input></Input>
        </Item>
        <Item label="类型" required name="type">
          <Select options={options}></Select>
        </Item>
        <Item label="覆盖" name="override">
          <Switch className=" bg-slate-500"></Switch>
        </Item>
      </Form>
    </Modal>
  );
}

export default CreateForm;
