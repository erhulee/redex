import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import { Editor } from "./type";
import { Button, Switch } from "antd";
import { CheckOutlined } from "@ant-design/icons";
function StringEditor(props: Editor.StringEditorProps) {
  const { handleChangeValue, value: originValue } = props;
  const [value, setValue] = useState(originValue);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return (
    <div>
      {/* <div className=" bg-slate-400 flex flex-row gap-3 items-center ">
        <div className=" text-white text-sm p-2">JSON 编辑模式</div>
        <Switch />
      </div> */}

      <AceEditor
        mode="json"
        theme="dracula"
        name="UNIQUE_ID_OF_DIV"
        fontSize={16}
        style={{
          width: "100%",
          paddingTop: "10px",
        }}
        value={value}
        onChange={(e) => {
          setValue(e);
        }}
        editorProps={{ $blockScrolling: true }}
      />

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
