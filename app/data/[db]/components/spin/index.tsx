import "./index.css";
export default function Spin() {
  return (
    <div className="w-full h-full self-center">
      <div className=" flex items-center justify-center flex-col ">
        <div className="loading-container">
          <div className="loading"></div>
        </div>
        <div>加载中 ...</div>
      </div>
    </div>
  );
}
