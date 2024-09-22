import React from "react";

function ColumnHead({ columnHeadTag }) {
  return (
    <div className="relative">
      <div className="absolute h-1 left-0 top-0 w-4 bg-red-700"></div>
      <div className="h-[0.0625rem] bg-gray-400"></div>
      <p className="text-sm font-bold my-2">{columnHeadTag}</p>
    </div>
  );
}

export default ColumnHead;
