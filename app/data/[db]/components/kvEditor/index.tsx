"use client";
import BaseInfoBar from "./baseInfoBar";
import HashEditor from "./hashEditor";
import ListEditor from "./ListEditor";
import StringEditor from "./StringEditor";
import { Editor } from "./type";
import Error from "./error";
import { setExpire } from "../../api/expire";
import { deleteKey, setName } from "../../api/key";
import { setKeyValue } from "../../api";
import SetEditor from "./SetEditor";
import ZSetEditor from "./ZSetEditor";
import { ListUpdateParams } from "../../(api)/[key]/value/route";
import { addListItem } from "../../api/list";

function KVEditor(props: Editor.EditorProps & { refetch: () => void }) {
  const { db, keyName, keyExpire, type, refetch } = props;
  const handleChangeName = (name: string) => {
    setName(keyName, db, name);
  };

  const handleChangeExpire = (expire: number) => {
    setExpire(keyName, db, expire);
  };

  const handleChangeValue = (
    type: Pick<ListUpdateParams, "type">,
    value: Omit<ListUpdateParams, "type">
  ) => {
    switch (type) {
      case "list":
        addListItem(
          {
            db,
            key: keyName,
          },
          {
            type: "list",
            ...value,
          }
        );
        break;
      case "string":
        setKeyValue(db, keyName, type, value);
        break;
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
        return (
          <ListEditor
            value={props.value}
            onAddItem={(value) => handleChangeValue("list", value)}
          ></ListEditor>
        );
      case "set":
        return <SetEditor></SetEditor>;
      case "zset":
        return <ZSetEditor value={props.value}></ZSetEditor>;
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
