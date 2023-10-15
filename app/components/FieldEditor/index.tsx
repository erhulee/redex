import { Form, Input } from "antd";
import JsonEditor from "../JsonEditor";

type Props = {
  field: string;
  field_readonly: boolean;
  value: string;
  mode: "string" | "json";
  onChange: (
    oldValue: { field: string; value: string },
    newValue: { field: string; value: string }
  ) => void;
};
function FieldEditor(props: Props) {
  const { field, field_readonly = false, value, mode = "string" } = props;
  return (
    <div>
      <Form>
        <Form.Item label="field">
          <Input></Input>
        </Form.Item>
        <Form.Item label="value">
          {mode == "json" ? (
            <JsonEditor width={800}></JsonEditor>
          ) : (
            <Input.TextArea></Input.TextArea>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}

export default FieldEditor;
