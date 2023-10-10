import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
type Props = {
  handleChangeValue: (value: string) => void;
  value: string;
};
function JsonEditor(props: Props) {
  const { handleChangeValue, value } = props;
  return (
    <div>
      <AceEditor
        mode="json"
        theme="dracula"
        name="UNIQUE_ID_OF_DIV"
        fontSize={16}
        style={{
          width: "100%",
          borderRadius: "5px",
        }}
        value={value}
        onChange={handleChangeValue}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
}

export default JsonEditor;
