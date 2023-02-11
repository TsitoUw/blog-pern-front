import React from "react";
import { useNavigate } from "react-router-dom";

const ReturnBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 m-2">
      <button className="flex items-center justify-center p-2 font-semibold text-xl w-10 h-10 hover:bg-slate-700 rounded-full hover:shadow-lg"
      onClick={()=>navigate(-1)}>{"<"}</button>
    </div>
  );
};

export default ReturnBtn;
