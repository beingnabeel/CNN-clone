import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import Header from "../Admin/Header";
import Pagination from "../Admin/NewsListComponents/Pagination";
import Footer from "../Common/Footer/Footer";
import SearchResult from "./SearchResults";
// import SearchBox from "./SearchBox";

function Search() {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const searchTextFromParam = useParams();
  const [searchText, setSearchText] = useState(searchTextFromParam);
  const [showFooterSearch, setShowFooterSearch] = useState(false);

  const itemsPerPage = 5;
  console.log("searchTextFromParam is :", searchText.searchText);
  useEffect(() => {
    fetchNewsData();
  }, [currentPage]);

  const fetchNewsData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/mainSearch", {
        params: {
          page: currentPage + 1,
          pageSize: itemsPerPage,
          searchText: searchText.searchText, // Replace with your actual variable
        },
      });
      setNewsData(response.data.news);
      console.log(response.data.news);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchButtonClick = () => {
    setShowFooterSearch(!showFooterSearch);
  };

  const handleFooterSearch = () => {
    setSearchText(searchText);
  };

  return (
    <>
      <Header onSearchButtonClick={handleSearchButtonClick} />

      {!showFooterSearch && (
        <>
          <div className="container mx-auto mt-8 ">
            {/* <SearchBox
              data={newsData}
              onPageChange={handlePageChange}
              setData={setNewsData}
            /> */}
            {/* <hr className="mt-8" /> */}
            <div className="App mt-12 mx-4">
              <SearchResult
                data={newsData}
                onPageChange={handlePageChange}
                setData={setNewsData}
                newsCount={newsData.length}
                searchText={searchText.searchText}
              />
              <Pagination
                pageCount={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}

      <Footer
        onSearch={handleFooterSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </>
  );
}

export default Search;
