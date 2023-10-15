import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import { Editor } from "./type";
import { Button, Switch } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import JsonEditor from "@/app/components/JsonEditor";
function StringEditor(props: Editor.StringEditorProps) {
  const { handleChangeValue, value: originValue } = props;
  const [value, setValue] = useState(originValue);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return (
    <div>
      <JsonEditor handleChangeValue={setValue} value={value}></JsonEditor>
      <div className=" flex-1 flex justify-end mt-2">
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={() => handleChangeValue(value)}
        >
          保存
        </Button>
      </div>
    </div>
  );
}

export default StringEditor;
