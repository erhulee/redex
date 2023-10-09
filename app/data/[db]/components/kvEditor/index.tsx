"use client";
import { usePathname } from "next/navigation";
import BaseInfoBar from "./baseInfoBar";
import HashEditor from "./hashEditor";
import ListEditor from "./listEditor";
import SetEditor from "./setEditor";
import StringEditor from "./stringEditor";
import { Editor } from "./type";

function KVEditor(props: Editor.EditorProps) {
  const { db, keyName, value, keyExpire, type } = props;
  const handleChangeName = (value: string) => {
    console.log(value);
  };

  console.log("props: ", props);
  const handleChangeExpire = (expire: number) => {};

  const handleChangeValue = (value: any) => {};

  const editorInstance = () => {
    switch (props.type) {
      case "string":
        return (
          <StringEditor
            value={props.value}
            handleChangeExpire={handleChangeExpire}
            handleChangeName={handleChangeName}
            handleChangeValue={handleChangeName}
          ></StringEditor>
        );
      case "hash":
        return (
          <HashEditor
            value={props.value}
            handleChangeExpire={handleChangeExpire}
            handleChangeName={handleChangeName}
            handleChangeValue={handleChangeName}
          ></HashEditor>
        );
      case "list":
        return <ListEditor></ListEditor>;
      case "set":
        return <SetEditor></SetEditor>;
    }
  };

  return (
    <div className="mt-4 ml-4 flex-1 px-4 ">
      <BaseInfoBar
        keyExpire={keyExpire}
        keyName={keyName}
        type={type}
      ></BaseInfoBar>
      {editorInstance()}
    </div>
  );
}

export default KVEditor;
