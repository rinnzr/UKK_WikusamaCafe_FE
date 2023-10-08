import React from "react";
import { AiOutlineInbox } from "react-icons/ai";

const NoData = () => {
  return (
    <div className="h-[80vh] flex justify-center text-neutral-400 flex-col items-center w-full">
      Data Not Found
      <AiOutlineInbox size={100} />
    </div>
  );
};

export default NoData;
