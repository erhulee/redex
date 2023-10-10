"use client";
import BaseInfoBar from "./baseInfoBar";
import HashEditor from "./hashEditor";
import ListEditor from "./listEditor";
import SetEditor from "./setEditor";
import StringEditor from "./stringEditor";
import { Editor } from "./type";
import Error from "./error";
import { setExpire } from "../../api/expire";
import { deleteKey } from "../../api/key";

function KVEditor(props: Editor.EditorProps) {
  const { db, keyName, value, keyExpire, type } = props;
  const handleChangeName = () => {};

  const handleChangeExpire = (expire: number) => {
    setExpire(keyName, db, expire);
  };

  const handleChangeValue = (value: any) => {};
  const handleDeleteKey = () => {
    deleteKey(keyName, db);
  };

  const editorInstance = () => {
    switch (props.type) {
      case "string":
        return (
          <StringEditor
            value={props.value}
            handleChangeValue={(value) => handleChangeValue(value)}
          ></StringEditor>
        );
      case "hash":
        return (
          <HashEditor
            value={props.value}
            handleChangeExpire={handleChangeExpire}
          ></HashEditor>
        );
      case "list":
        return <ListEditor></ListEditor>;
      case "set":
        return <SetEditor></SetEditor>;
      default:
        return <Error></Error>;
    }
  };

  return (
    <div className="mt-4 ml-4 flex-1 px-4 ">
      <BaseInfoBar
        keyExpire={keyExpire}
        keyName={keyName}
        type={type}
        handleChangeExpire={handleChangeExpire}
        handleChangeName={handleChangeName}
        handleDeleteKey={handleDeleteKey}
      ></BaseInfoBar>
      {editorInstance()}
    </div>
  );
}

export default KVEditor;
