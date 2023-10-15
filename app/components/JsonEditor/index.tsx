import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import { useRef, useState } from "react";
import { Switch } from "antd";
import useLocalSetting from "./useLocalSetting";
type Props = {
  handleChangeValue: (value: string) => void;
  value: string;
  width: number;
};
function JsonEditor(props: Props) {
  const { handleChangeValue, value } = props;
  const [validate, setValidate] = useState(true);
  const [content, setContent] = useState(value);
  const [setting, changeLocalSetting] = useLocalSetting(
    { json_formate: true },
    "json_editor"
  );

  const editorRef = useRef(null);
  const handleChangeValueWithFormate = () => {
    if (setting.json_formate) {
      try {
        const obj = JSON.parse(content);
        const result = JSON.stringify(obj, null, "\t");
        handleChangeValue(result);
        setContent(result);
        setValidate(true);
      } catch (e) {
        setValidate(false);
      }
    } else {
      setValidate(true);
      handleChangeValue(content);
    }
  };

  return (
    <div>
      <Switch
        className=" bg-slate-400 mb-2"
        checkedChildren={"已开启"}
        unCheckedChildren={"自动JSON格式化"}
        onChange={(val) => {
          changeLocalSetting({ json_formate: val });
        }}
      ></Switch>
      <AceEditor
        ref={editorRef}
        onBlur={handleChangeValueWithFormate}
        mode="json"
        theme="dracula"
        name="UNIQUE_ID_OF_DIV"
        fontSize={16}
        height="400px"
        width={props.width + "px"}
        style={{
          borderRadius: "5px",
        }}
        value={content}
        editorProps={{ $blockScrolling: true }}
        onChange={setContent}
      />

      {!validate && setting.json_formate ? (
        <div className=" text-danger-500 mt-2">JSON 格式化错误</div>
      ) : null}
    </div>
  );
}

export default JsonEditor;
