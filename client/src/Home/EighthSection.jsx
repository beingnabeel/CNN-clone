import React from "react";
import MidCard from "../components/Cards/MidCard";

function EighthSection() {
  const midCards = [
    {
      link: "/your-link-url",
      imageSrc: "images/EighthSection/11.webp",
      text: "'She wasn't too interested in talking': Cop pulls over 2-year-old",
      tag: "Watch",
    },
    {
      link: "/your-link-url",
      imageSrc: "images/EighthSection/12.webp",
      text: "Sheep rescued after spending years at bottom of sea cliff",
      tag: "Watch",
    },

    // Add more cards as needed
  ];
  const midCards2 = [
    {
      link: "/your-link-url",
      imageSrc: "images/EighthSection/21.webp",
      text: "Watch Australian woman break world record for surfing giant wave",
      tag: "Watch",
    },
    {
      link: "/your-link-url",
      imageSrc: "images/EighthSection/22.webp",
      text: "New footage shows Alec Baldwin firing prop gun on 'Rust' set",
      tag: "Watch",
    },

    // Add more cards as needed
  ];
  return (
    <>
      <h2 className="pl-3 pt-6 pb-2 text-4xl font-bold">Watch It</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 group gap-4 px-4 py-2 mx-auto w-full max-w-full overflow-hidden">
        {midCards.map((card, index) => (
          <MidCard key={index} {...card} />
        ))}
        {midCards2.map((card, index) => (
          <MidCard key={index} {...card} />
        ))}
      </div>
    </>
  );
}

export default EighthSection;
