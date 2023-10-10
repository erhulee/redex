import { Editor } from "./type";
import { Button, Input, InputNumber } from "antd";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
function BaseInfoBar(
  props: Pick<Editor.EditorProps, "type" | "keyName" | "keyExpire"> &
    Pick<
      Editor.EditorController,
      | "handleChangeExpire"
      | "handleChangeName"
      | "handleDeleteKey"
      | "handleRefetch"
    >
) {
  const {
    type,
    keyExpire,
    keyName,
    handleChangeExpire,
    handleChangeName,
    handleDeleteKey,
    handleRefetch,
  } = props;
  const [expireData, setExpireData] = useState(keyExpire);
  const [keyNameData, setKeyNameData] = useState(keyName);

  return (
    <div className=" flex justify-start gap-4 w-full mb-4 ">
      <div className=" flex items-center justify-center w-14 bg-indigo-500 text-sm text-white p-1 px-2 rounded-md ">
        {type}
      </div>
      <div className="flex">
        <Input
          addonBefore="Key Name"
          value={keyNameData}
          onChange={(e) => setKeyNameData(e.target.value)}
        />
        <Button
          className=" ml-1"
          type="primary"
          onClick={() => handleChangeName(keyNameData)}
        >
          修改
        </Button>
      </div>

      <div className="flex">
        <InputNumber
          addonBefore="Expire"
          onChange={(e) => setExpireData(e!)}
          value={expireData}
        ></InputNumber>
        <Button
          className=" ml-1"
          type="primary"
          onClick={() => handleChangeExpire(expireData)}
        >
          修改
        </Button>
      </div>
      <Button icon={<DeleteOutlined />} onClick={handleDeleteKey} />
      <Button icon={<ReloadOutlined />} onClick={handleRefetch} />
    </div>
  );
}

export default BaseInfoBar;
