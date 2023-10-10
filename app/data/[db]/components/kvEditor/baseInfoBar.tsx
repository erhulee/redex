import { Editor } from "./type";
import { Button, Input, InputNumber } from "antd";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useEnv } from "../../context";
function BaseInfoBar(
  props: Pick<Editor.EditorProps, "type" | "keyName" | "keyExpire"> &
    Pick<
      Editor.EditorController,
      "handleChangeExpire" | "handleChangeName" | "handleDeleteKey"
    >
) {
  const {
    type,
    keyExpire,
    keyName,
    handleChangeExpire,
    handleChangeName,
    handleDeleteKey,
  } = props;
  const { db, key } = useEnv();
  const [expireData, setExpireData] = useState(keyExpire);

  return (
    <div className=" flex justify-start gap-4 w-full mb-4 ">
      <span className="  bg-indigo-500 text-sm text-white p-1 px-2 rounded-md ">
        {type}
      </span>
      <div className="flex">
        <Input addonBefore="Key Name" value={keyName} />
        <Button className=" ml-1" type="primary">
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
      <Button icon={<ReloadOutlined />} />

      {/* <div className=" flex-1 flex justify-end">
        <Button type="primary" icon={<CheckOutlined />}>
          保存
        </Button>
      </div> */}
    </div>
  );
}

export default BaseInfoBar;
