import { Form, Input, Modal, Select } from "antd";
const Item = Form.Item;
const useForm = Form.useForm;
const options = ["string", "set", "list"].map((i) => ({ value: i, label: i }));
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
      <Form form={form}>
        <Item label="Key" required name="key">
          <Input></Input>
        </Item>
        <Item label="type" required name="type">
          <Select options={options}></Select>
        </Item>
      </Form>
    </Modal>
  );
}

export default CreateForm;
