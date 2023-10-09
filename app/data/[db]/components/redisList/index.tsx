import { CheckCircleOutlined } from "@ant-design/icons";
type Props = {
  listData: Array<{
    name: string;
    ip: string;
    port: string;
    password: string;
    mode: string;
    status: string;
  }>;
  currentRedis: number;
};
function RedisList(props: Props) {
  const { listData, currentRedis } = props;
  return (
    <div className="">
      {listData.map((item, index) => {
        const { status, name, ip, port } = item;
        return (
          <div
            className={`py-2 px-4 flex items-center text-xs  hover:bg-slate-100 hover:text-black ${
              currentRedis == index ? " border-r-2 border-blue-600 " : ""
            } `}
          >
            <span
              className={`${
                status == "ok" ? "text-green-600" : "text-red-600"
              }`}
            >
              <CheckCircleOutlined />
            </span>
            <span className=" ml-1">
              {name}
              <span>{`[${ip}:${port}]`}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default RedisList;
