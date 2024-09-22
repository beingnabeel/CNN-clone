import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import MidCard from "../components/Cards/MidCard";
import TextOnly from "../components/Cards/TextOnly";
import useNewsFetch from "../Common/FetchNews/useNewsFetch";
import FileDisplay from "../Helpers/FileDisplay";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
function Category() {
  const { categoryName } = useParams();
  const {
    data: allCards,
    loading: loading1,
    error: error1,
  } = useNewsFetch(categoryName, null, null, null, 6, "desc");

  const midCards = allCards.slice(0, 3);
  const midCards2 = allCards.slice(3);

  const {
    data: textOnly,
    loading: loading3,
    error: error3,
  } = useNewsFetch(categoryName, null, null, null, 6, "desc");

  const [showFooterSearch, setShowFooterSearch] = useState(false);
  const onSearchButtonClick = () => {
    setShowFooterSearch(!showFooterSearch);
  };

  return (
    <>
      <Header onSearchButtonClick={onSearchButtonClick} />
      {!showFooterSearch && (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 p-4 ">
            {midCards.map((card, index) => (
              <MidCard
                key={`cat1-${index}`}
                link={`/${card._id}`}
                imageSrc={card.file}
                text={card.title}
                tag={card.tag}
                db={true}
              />
            ))}
          </div>
          <div className="w-full md:w-1/3 p-4 ">
            {midCards2.map((card, index) => (
              <MidCard
                key={`cat1-${index}`}
                link={`/${card._id}`}
                imageSrc={card.file}
                text={card.title}
                tag={card.tag}
                db={true}
              />
            ))}
          </div>
          <div className="w-full md:w-1/3 p-4 ">
            <Link to="/news-link" className="relative w-305 h-171 group mb-4">
              <video
                autoPlay={true}
                muted
                playsinline
                loop
                controls
                className="w-full  rounded-sm"
              >
                <source src="/videos/FirstSection/video.mp4" />
              </video>
            </Link>
            <div>
              <div className="mb-2 mt-4 font-bold text-xl hover:underline">
                Catch up on todays global news
              </div>
              <div>
                {textOnly.map((card, index) => (
                  <TextOnly
                    key={`cat2-${index}`}
                    link={`/${card._id}`}
                    text={card.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Category;
