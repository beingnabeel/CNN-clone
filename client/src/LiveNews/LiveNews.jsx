// NewsComponent.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
// import io from "socket.io-client";
import PulsatingDot from "../Helpers/PulsatingDot";
import NewUpdateBanner from "../Helpers/NewUpdateBanner";
import axios from "axios";
import socket from "../Helpers/Socket";
import TimeComponent from "../Helpers/TimeComponent";
import FileDisplay from "../Helpers/FileDisplay";
import Footer from "../Common/Footer/Footer";
import Header from "../Common/Header/Header";

const LiveNews = () => {
  const [news, setNews] = useState([]);
  const [firstNews, setFirstNews] = useState([]);

  const [newUpdate, setNewUpdate] = useState(false);
  // const liveUpdateType = "Israel-hamas-war";
  const { liveUpdateType } = useParams();

  const getAllNews = async () => {
    try {
      console.log("GetAllNews");
      const response = await axios.get(
        `http://localhost:8080/api/getNewsByLiveUpdateType/${liveUpdateType}`
      );
      setNews(response.data);

      console.log("GetAllNews");
      console.log("All News:", response.data);
      // ...............End For displaying file................

      // return allNews;
    } catch (error) {
      console.error("Error fetching all news:", error.message);
      throw error;
    }
  };
  const getOldestNewsArticleByType = async (liveUpdateType) => {
    try {
      console.log("liveUpdateType :", liveUpdateType);
      const response = await axios.get(
        `http://localhost:8080/api/getOldestNewsArticleByType/${liveUpdateType}`
      );
      setFirstNews(response.data);
      console.log("GetFirstNews");
      console.log("First News:", response.data);
      // return allNews;
    } catch (error) {
      console.error("Error fetching all news:", error.message);
      throw error;
    }
  };
  useEffect(() => {
    // When the component mounts, subscribe to live updates for a specific type

    console.log("liveUpdateType :", liveUpdateType);

    getOldestNewsArticleByType(liveUpdateType);
    getAllNews();
  }, [liveUpdateType]);

  socket.on("liveNewsUpdate", () => {
    getAllNews();
    setNewUpdate(true);
    console.log("From Live News");
  });

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };
  // Parse the createdAt value as a UTC date and time
  const createdAt = news[0]?.createdAt;

  // Use Intl.DateTimeFormat to format the date and time according to the ET timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Check if createdAt is a valid date string before formatting
  const formatted = createdAt ? formatter.format(new Date(createdAt)) : null;

  const [showFooterSearch, setShowFooterSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearchButtonClick = () => {
    setShowFooterSearch(!showFooterSearch);
  };

  const handleFooterSearch = () => {
    // Do something with the search text, e.g., navigate to search results page
    // ...

    // For example, update the state with the search text
    setSearchText(searchText);
  };
  return (
    <>
      <Header onSearchButtonClick={handleSearchButtonClick} />
      {!showFooterSearch && (
        <>
          <div className="mt-16 mx-12 flex">
            <div className="w-7/12 h-full ">
              <div className="flex items-center mb-3">
                <PulsatingDot />{" "}
                <span className="tracking-wide font-bold text-xl ml-2">
                  {" "}
                  Live Update
                </span>
              </div>
              <h1 className="font-bold text-5xl leading-tight ">
                <strong>{firstNews.liveUpdateHeadline}</strong>
              </h1>
              <div className=" text-gray-400 mt-2">
                By <span>{firstNews.authorName}</span>, CNN
              </div>
              <div className=" text-gray-400 mt-2">
                {" "}
                {formatted ? `Updated ${formatted}` : "Invalid date format"}
              </div>
            </div>
            <div className="w-5/12 h-full ">
              {" "}
              <div className=" relative w-305 h-171 group mb-4 ">
                <FileDisplay fileName={firstNews.file} />

                <div className="mb-2 mt-2 font-bold text-xs text-gray-600 hover:underline">
                  {" "}
                  Catch up on today’s global news
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 mx-12 flex ">
            <div className="w-4/12 p-6 m-5 border-b border-t-4 border-t-red-600 border-l border-r rounded">
              <h1 className="text-2xl">What we covered here</h1>
              <div className="sticky top-16 h-screen">
                <ul className="mt-8 overflow-y-auto">
                  {news.map((item, index) => (
                    <a
                      href={`#${item._id}`}
                      className="cursor-pointer"
                      onClick={(e) => handleLinkClick(e, item._id)}
                    >
                      <li className="list-disc mb-8 ">{item.title}</li>
                    </a>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-8/12">
              <div className="border-b mr-5 ml-5 mb-5 mt-4">
                <div className="border-b-4 w-6 pl-1 border-b-red-600">All</div>
              </div>
              {news.map((item, index) => (
                <div
                  key={index}
                  id={item._id}
                  className=" p-6 m-5 border-b border-t border-l border-r rounded"
                >
                  {" "}
                  <TimeComponent timestamp={item.createdAt} />
                  <div className="text-3xl font-bold mb-4">{item.title}</div>
                  <FileDisplay fileName={item.file} />
                  <div
                    dangerouslySetInnerHTML={{ __html: item.editorText }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Footer
        onSearch={handleFooterSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <NewUpdateBanner newUpdate={newUpdate} />
    </>
  );
};

export default LiveNews;
