import axios from "axios";
import React, { useState } from "react";
// import Pagination from "./Pagination";
// import { Link } from "react-router-dom";
import moment from "moment";
import FileDisplay from "../Helpers/FileDisplay";
// import FileDisplay from "../Helpers/FileDisplay";
const SearchResult = ({ data, newsCount, searchText }) => {
  const [showModal, setShowModal] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(null);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [newsData, setNewsData] = useState(data);
  const filteredData = data.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  // const handlePageChange = ({ selected }) => {
  //   onPageChange({ selected }); // Pass the page change event to the parent
  // };

  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  //   console.log(paginatedData);
  function FormattedDate(props) {
    // Parse the date string using Moment.js
    let date = moment(props.date);

    // Format the date using the desired output format
    let formattedDate = date.format("MMM D, YYYY");

    // Return a JSX element that displays the formatted date
    return <p>{formattedDate}</p>;
  }
  return (
    <div className="px-16 py-16">
      <p className="mt-1 text-gray-600">
        Displaying <span className="font-bold">{newsCount}</span> results for
        your search <span className="font-bold">{searchText}</span>
      </p>
      {paginatedData.map((item) => (
        <>
          <div key={item._id}>
            <div className="flex items-center py-4 border-b border-b-gray-200">
              <div className="w-1/3 h-48 mr-5">
                <FileDisplay fileName={item.file} />
              </div>
              <div className="w-2/3">
                <div className="font-bold text-2xl">{item.title}</div>
                {/* <div className="text-gray-500 text-sm py-2">Jan 18, 2024</div> */}
                <div className="text-gray-500 text-sm py-2">
                  <FormattedDate date={item.createdAt} />
                </div>
                <div>
                  {item.editorText
                    .replace(/<[^>]*>/g, "")
                    .split(" ")
                    .slice(0, 36)
                    .join(" ")}
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
      {/* <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.title}</td> */}

      {/* <Pagination pageCount={pageCount} onPageChange={handlePageChange} /> */}
    </div>
  );
};

export default SearchResult;
