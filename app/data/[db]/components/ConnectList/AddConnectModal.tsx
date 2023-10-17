import { Form, Input, Modal, Select } from "antd";
type Props = {
  visible: boolean;
  toggle: () => void;
};
const useForm = Form.useForm;
function AddConnectModal(props: Props) {
  const { visible, toggle } = props;
  const [form] = useForm();
  const handleCreate = () => {
    const formData = form.getFieldsValue();
    console.log(formData);
  };
  const handleCancel = () => {
    form.resetFields();
  };
  return (
    <Modal
      open={visible}
      title="添加链接"
      okText="创建"
      cancelText="取消"
      onOk={handleCreate}
      onCancel={handleCancel}
    >
      <div className="text-gray-400 font-thin italic text-xs flex flex-col">
        <div>1.哨兵模式仅需要填写一个哨兵节点的 Ip 或域名</div>
        <div>2.集群模式只需要填写一个群集节点的 Ip 或域名</div>
      </div>
      <div className=" p-4 pb-0">
        <Form labelCol={{ span: 5 }} labelAlign="left" form={form}>
          <Form.Item label="名称" required name="name">
            <Input></Input>
          </Form.Item>
          <Form.Item label="IP/Host" required name="host">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Port" required name="port">
            <Input></Input>
          </Form.Item>
          <Form.Item label="密码" required name="password">
            <Input></Input>
          </Form.Item>
          <Form.Item label="连接模式" required name="mode">
            <Select
              options={[
                {
                  label: "直连",
                  value: "direct",
                },
                {
                  label: "哨兵",
                  value: "sentinel",
                },
                {
                  label: "集群",
                  value: "cluster",
                },
              ]}
            ></Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default AddConnectModal;
