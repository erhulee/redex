"use client";
import BaseInfoBar from "./baseInfoBar";
import HashEditor from "./hashEditor";
import ListEditor from "./listEditor";
import StringEditor from "./stringEditor";
import { Editor } from "./type";
import Error from "./error";
import { setExpire } from "../../api/expire";
import { deleteKey, setName } from "../../api/key";
import { setKeyValue } from "../../api";
import SetEditor from "./SetEditor";

function KVEditor(props: Editor.EditorProps & { refetch: () => void }) {
  const { db, keyName, keyExpire, type, refetch } = props;
  console.log(props);
  const handleChangeName = (name: string) => {
    setName(keyName, db, name);
  };

  const handleChangeExpire = (expire: number) => {
    setExpire(keyName, db, expire);
  };

  const handleChangeValue = (type: string, value: any) => {
    switch (type) {
      case "string":
        setKeyValue(db, keyName, type, value);
    }
  };
  const handleDeleteKey = () => {
    deleteKey(keyName, db);
  };

  const editorInstance = () => {
    switch (props.type) {
      case "string":
        return (
          <StringEditor
            value={props.value}
            handleChangeValue={(value) => handleChangeValue("string", value)}
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
        return <ListEditor value={props.value}></ListEditor>;
      case "set":
        return <SetEditor></SetEditor>;
      default:
        return <Error></Error>;
    }
  };

  return (
    <div className="mt-4 ml-4 px-4 ">
      <BaseInfoBar
        keyExpire={keyExpire}
        keyName={keyName}
        type={type}
        handleChangeExpire={handleChangeExpire}
        handleChangeName={handleChangeName}
        handleDeleteKey={handleDeleteKey}
        handleRefetch={refetch}
      ></BaseInfoBar>
      {editorInstance()}
    </div>
  );
}

export default KVEditor;
