import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsTable from "./NewsListComponents/NewsTable";
import Pagination from "./NewsListComponents/Pagination";

function NewsList() {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // in every single page we are going to display 5 news in list
  const itemsPerPage = 5;
  // useEffect hook is used when the page is rendered, so whenever there is any change in the dependency that is the currenPage then fetchNewsData() function will be triggered.
  useEffect(() => {
    fetchNewsData();
  }, [currentPage]);

  const fetchNewsData = async () => {
    try {
      // so here we are making axios get request to the backend with the parameters
      const response = await axios.get(`http://localhost:8080/newsList`, {
        params: { page: currentPage + 1, pageSize: itemsPerPage },
      });
      setNewsData(response.data.news);
      console.log(response.data.news);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching news data: ", error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <div className="App mt-12 mx-4">
      <h1 className="text-3xl font-bold mb-4 ">CNN NEWS</h1>
      {/* here in the Newstable component newsData we will fetch from the database  */}
      {/*  whenever there is any change in the data we will run this handlepagechange*/}
      <NewsTable
        data={newsData}
        onPageChange={handlePageChange}
        setData={setNewsData}
      />
      <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default NewsList;
