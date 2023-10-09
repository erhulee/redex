import { Editor } from "./type";
import { Button, Input, InputNumber } from "antd";
import {
  DeleteOutlined,
  ReloadOutlined,
  CheckOutlined,
} from "@ant-design/icons";
function BaseInfoBar(
  props: Pick<Editor.EditorProps, "type" | "keyName" | "keyExpire">
) {
  const { type, keyExpire, keyName } = props;
  return (
    <div className=" flex justify-start gap-4 w-full mb-4 ">
      <span className="  bg-indigo-500 text-sm text-white p-1 px-2 rounded-md ">
        {type}
      </span>
      <div className="flex">
        <Input addonBefore="Key Name" defaultValue={keyName} />
        <Button className=" ml-1" type="primary">
          修改
        </Button>
      </div>

      <div className="flex">
        <InputNumber
          addonBefore="Expire"
          defaultValue={keyExpire}
        ></InputNumber>
        <Button className=" ml-1" type="primary">
          修改
        </Button>
      </div>
      <Button icon={<DeleteOutlined />} />
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
