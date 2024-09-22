import React from "react";
import { Link } from "react-router-dom";

function BigCard({ link, imageSrc, tag, text }) {
  return (
    <Link to={link}>
      <div className="max-w-screen mx-auto mb-3">
        <div className="relative group">
          {/* this div is for the image */}
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover transition-transform transform group-hover:scale-100"
          />
          {tag ? (
            <div className="absolute bottom-0 left-0 bg-white text-red-600 text-xs bold px-2 py-1 font-bold">
              {tag}
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {/* this div is for the associated text */}
          <h4 className="text-xl font-bold mb-2 mt-2 hover:underline hover:text-gray-700">
            {text}
          </h4>
        </div>
      </div>
    </Link>
  );
}

export default BigCard;
