"use client";
import { Input, Button } from "antd";
import { KeyItem } from "@/lib/type";
import "./index.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useModal from "@/app/data/hooks/useModal";
import CreateForm from "./CreateForm";
type Props = {
  list: KeyItem[];
  pattern: string;
  onChange: (pattern: string) => void;
  onCreate: (key: string, type: string) => Promise<any>;
  className?: string;
};
const KeyList: React.FC<Props> = (props) => {
  const { list } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [visible, toggleVisible] = useModal();
  const handleClick = (key: string) => {
    router.replace(pathname + "?key=" + key);
  };

  return (
    <div className={` w-64 ${props.className}`}>
      <div className="mb-2">
        <Button type="primary" className=" w-full mb-1" onClick={toggleVisible}>
          新建Key
        </Button>
        <div className=" flex">
          <Input.Search
            defaultValue={props.pattern}
            onSearch={props.onChange}
          ></Input.Search>
        </div>
      </div>
      <div className=" flex flex-col  ">
        {list.map(({ type, name }) => (
          <div
            className=" flex flex-row py-2 px-2 hover:bg-slate-100 "
            onClick={() => handleClick(name)}
          >
            <div className="w-14 text-center text-xs border-blue-600 border text-blue-700 font-semibold px-2 py-1 rounded ">
              {type}
            </div>
            <div className=" ml-2">{name}</div>
          </div>
        ))}
      </div>
      <CreateForm
        visible={visible}
        toggle={toggleVisible}
        onCreate={props.onCreate}
      ></CreateForm>
    </div>
  );
};
export default KeyList;
