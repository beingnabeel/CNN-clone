import React from "react";
import { Link } from "react-router-dom";
import MidCard from "../components/Cards/MidCard";

function NinthSection() {
  const midCards = [
    {
      link: "/your-link-url",
      imageSrc: "images/NinthSection/11.jpg",
      text: "",
    },
    {
      link: "/your-link-url",
      imageSrc: "images/NinthSection/12.jpg",
      text: "",
      tag: "",
    },
  ];
  const midCards2 = [
    {
      link: "/your-link-url",
      imageSrc: "images/NinthSection/21.jpg",
      text: "",
      tag: "",
    },
    {
      link: "/your-link-url",
      imageSrc: "images/NinthSection/22.jpg",
      text: "",
      tag: "",
    },
  ];
  const midCards3 = [
    {
      link: "/your-link-url",
      imageSrc: "images/NinthSection/31.jpg",
      text: "",
      tag: "",
    },
    {
      link: "/your-link-url",
      imageSrc: "images/NinthSection/32.jpg",
      text: "",
      tag: "",
    },

    // Add more cards as needed
  ];
  return (
    <>
      <h2 className="text-3xl font-bold pl-3 pt-6 pb-4">
        Photos you should see
      </h2>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-1 ml-4 ">
          {midCards.map((card, index) => (
            <MidCard key={index} {...card} />
          ))}
          {midCards2.map((card, index) => (
            <MidCard key={index} {...card} />
          ))}
          {midCards3.map((card, index) => (
            <MidCard key={index} {...card} />
          ))}
        </div>
        <div className="w-full md:w-1/3 p-4">
          <Link to="/adv-link">
            <div className="w-full h-64 group mb-4">
              <div className="w-full h-full group ">
                <img
                  src="images/NinthSection/adv.jpg"
                  alt="Advertisement"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs">Advertisement</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NinthSection;
