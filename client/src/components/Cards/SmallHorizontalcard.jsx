import React from "react";
import { Link } from "react-router-dom";

function SmallHorizontalCard({ link, imageSrc, text, tag }) {
  return (
    <Link to={link}>
      <div className="flex mt-2 border-t-2 pt-4">
        <div className="relative w-1/4 group">
          {/* this div is for the image */}
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover transition-transform transform group-hover:scale-100"
          />
        </div>
        {/* this div is for the associated text */}
        <h4 className="text-base w-3/4 self-start ml-2 hover:underline hover:text-gray-700">
          {text}
        </h4>
      </div>
    </Link>
  );
}

export default SmallHorizontalCard;
