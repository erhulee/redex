import "./loading.css";
export default function Loading() {
  return (
    <div className=" bg-red w-full h-full  flex items-center justify-center flex-col ">
      <div className="loading-container">
        <div className="loading"></div>
      </div>
      <div>加载中 ...</div>
    </div>
  );
}
