import React from "react";
import { AiOutlineInbox } from "react-icons/ai";

const NoData = () => {
  return (
    <p className="h-[80vh] text-xl flex justify-center text-neutral-400 flex-col items-center w-full">
      Data Not Found
      <AiOutlineInbox size={100} fontWeight={200} />
    </p>
  );
};

export default NoData;
