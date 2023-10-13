import "./index.css";
export default function Spin() {
  return (
    <div className=" flex items-center justify-center flex-col w-full h-full self-center ">
      <div className="loading-container">
        <div className="loading"></div>
      </div>
      <div>加载中 ...</div>
    </div>
  );
}
