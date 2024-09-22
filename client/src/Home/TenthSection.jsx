import React from "react";
import MidCard from "../components/Cards/MidCard";

function TenthSection() {
  const midCards = [
    {
      link: "/your-link-url",
      imageSrc: "images/TenthSection/11.webp",
      text: "Windows Users Didn't Know This Simple Trick To Block All Ads (Do It Now)",
      horizontal: true,
    },
    {
      link: "/your-link-url",
      imageSrc: "images/TenthSection/21.webp",
      text: "Castle-Sized Cabin on Lake Tahoe Asks Nearly $50 Million—Glass Funiculars Included",
      tag: "",
      horizontal: true,
    },
    {
      link: "/your-link-url",
      imageSrc: "images/TenthSection/31.webp",
      text: "What Happens When Kamala Harris Lives in Your Condo Complex",
      tag: "",
      horizontal: true,
    },
    {
      link: "/your-link-url",
      imageSrc: "images/TenthSection/41.webp",
      text: "Incredible News: The Pain-Relieving Product that Changes Lives!",
      tag: "",
      horizontal: true,
    },
  ];
  return (
    <>
      <h2 className="pl-3 pt-6 pb-2 text-4xl font-bold">Paid Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 group gap-4 px-4 py-2 mx-auto w-full max-w-full overflow-hidden">
        {midCards.map((card, index) => (
          <MidCard key={index} {...card} />
        ))}
      </div>
    </>
  );
}

export default TenthSection;
