import React from "react";

function Adv() {
  return (
    <div className="hidden md:block">
      <div className="h-64 bg-black flex items-center justify-center flex-col">
        <img src="/images/Header/adv.jpg" alt="adv" />
        <p className="text-zinc-600 text-xs self-start mt-1 ml-15%">
          Advertisement
        </p>
      </div>
    </div>
  );
}

export default Adv;
