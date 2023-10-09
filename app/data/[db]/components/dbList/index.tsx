import React from "react";
import "./index.css";
import Link from "next/link";
type DBListItem = {
  name: string;
  value: number;
  keys: number;
};
type Props = {
  list: Array<DBListItem>;
  className?: string;
  currentDB: number;
};
const DBList: React.FC<Props> = (props: Props) => {
  const { list } = props;

  return (
    <div className={props.className}>
      {list.map((item, index) => (
        <Link href={`/data/${index}`}>
          <div
            className={`${
              item.value == props.currentDB ? "active-item" : ""
            } text-sm px-4 py-3 hover:bg-slate-100`}
            key={item.name}
          >{`${item.name}(${item.keys})`}</div>
        </Link>
      ))}
    </div>
  );
};

export default DBList;
