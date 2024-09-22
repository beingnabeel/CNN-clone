import React, { useEffect, useState } from "react";
import Editor from "./TextEditor/TextEditorWithQuill";
import axios from "axios";
import socket from "../Helpers/Socket";

function CreateNews() {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [types, setTypes] = useState([]);
  const [newsCategory, setNewsCategory] = useState([]);
  const [newsSubCategory, setNewsSubCategory] = useState([]);
  const [newsTag, setNewsTag] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedNewsCategory, setSelectedNewsCategory] = useState("");
  const [selectedNewsSubCategory, setSelectedNewsSubCategory] = useState("");
  const [selectedNewsTag, setSelectedNewsTag] = useState("");
  const [EditorText, setEditorText] = useState("");
  const [error, setError] = useState(null);
  const [SelectedFile, setSelectedFile] = useState(null);

  const [fileType, setFileType] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [liveUpdateTypes, setLiveUpdateTypes] = useState([]);
  const [selectedLiveUpdateType, setSelectedLiveUpdateType] = useState("");
  const [liveUpdateHeadline, setLiveUpdateHeadline] = useState([]);
  const [isLiveUpdateType, setIsLiveUpdateType] = useState(false);
  const [showHeadLine, setShowHeadLine] = useState("");

  const handleLiveUpdateTypeChange = async (e) => {
    setSelectedLiveUpdateType(e.target.value);
    setShowHeadLine(e.target.value);
  };
  // console.log(types);
  const handleNewsTypeChange = (e) => {
    setSelectedType(e.target.value);
    console.log(e.target.value);
  };
  const handleNewsCategoryChange = (e) => {
    setSelectedNewsCategory(e.target.value);
    console.log(e.target.value);
  };
  const handleNewsSubCategoryChange = (e) => {
    setSelectedNewsSubCategory(e.target.value);
    console.log(e.target.value);
  };
  const handleNewsTagChange = (e) => {
    setSelectedNewsTag(e.target.value);
    console.log(e.target.value);
  };
  // this is the port where the backend exress server is running
  const backEndBaseUrl = "http://localhost:8080";
  // we will be using the useeffect hook for displaying the types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeResponse = await axios.get(`${backEndBaseUrl}/api/types`);
        const newsCategoryResponse = await axios.get(
          `${backEndBaseUrl}/api/newsCategory`
        );
        // // here the axios for the sub category will be conditional as such it will be displayed according to the selected category
        // if (selectedNewsCategory) {
        //   const newsSubCategoryResponse = await axios.get(
        //     `${backEndBaseUrl}/api/newsSubCategory/${selectedNewsCategory}`
        //   );
        //   setNewsSubCategory(newsSubCategoryResponse.data);
        // }
        // // for news tags
        const newsTagResponse = await axios.get(
          `${backEndBaseUrl}/api/newsTag`
        );

        // now we will be creating routes and controller for this api
        setTypes(typeResponse.data);
        setNewsCategory(newsCategoryResponse.data);
        setNewsTag(newsTagResponse.data);

        // for live update
        if (selectedType === "LiveUpdate") {
          setIsLiveUpdateType(true);
          const liveUpdateResponse = await axios.get(
            `${backEndBaseUrl}/api/getLastFiveLiveUpdateNewsType`
          );
          // setLiveUpdateTypes(liveUpdateResponse.data);
          setLiveUpdateTypes(
            liveUpdateResponse.data.map((item) => item.liveUpdateType)
          );
          if (showHeadLine) {
            const liveUpdateHeadlineResponse = await axios.get(
              `${backEndBaseUrl}/api/getHeadline/${showHeadLine}`
            );
            console.log(
              "liveUpdateHeadlineResponse is: ",
              liveUpdateHeadlineResponse
            );
            setLiveUpdateHeadline(liveUpdateHeadlineResponse.data);
          }
          console.log("liveUpdateResponse is: ", liveUpdateResponse);
        } else {
          setIsLiveUpdateType(false);
        }
        if (selectedLiveUpdateType) {
          const selectedLiveUpdateResponse = await axios.get(
            `${backEndBaseUrl}/api/getLastFiveLiveUpdateNewsType/${selectedLiveUpdateType}`
          );
          setLiveUpdateHeadline(selectedLiveUpdateResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedType, selectedLiveUpdateType]);
  // so we have passed in the dependencies in the useeffect hooks , so it basically call fetch data function again whenever there is any change in the dependencies
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        // here the axios for the sub category will be conditional as such it will be displayed according to the selected category
        if (selectedNewsCategory) {
          const newsSubCategoryResponse = await axios.get(
            `${backEndBaseUrl}/api/newsSubCategory/${selectedNewsCategory}`
          );
          setNewsSubCategory(newsSubCategoryResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubCategories();
  }, [selectedNewsCategory]);
  // this equals 52 mb
  const maxFileSizeinBytes = 50 * 1024 * 1024;
  const allowedFileTypes = [
    "image/jpeg",
    "image/JPG",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4",
    "video/webm",
    "video/ogg",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newsData = new FormData();
    newsData.append("title", title);
    newsData.append("type", selectedType);
    newsData.append("liveUpdateType", selectedLiveUpdateType);
    newsData.append("liveUpdateHeadline", liveUpdateHeadline);
    newsData.append("isLiveUpdate", isLiveUpdateType);
    newsData.append("file", SelectedFile);
    newsData.append("newsCategory", selectedNewsCategory);
    newsData.append("subCategory", selectedNewsSubCategory);
    newsData.append("tag", selectedNewsTag);
    newsData.append("editorText", EditorText);
    newsData.append("authorName", authorName);
    console.log("title", title);
    console.log("type", selectedType);
    console.log("liveUpdateType", selectedLiveUpdateType);
    console.log("liveUpdateHeadline", liveUpdateHeadline);
    console.log("file", SelectedFile);
    console.log("newsCategory", selectedNewsCategory);
    console.log("subCategory", selectedNewsSubCategory);
    console.log("tag", selectedNewsTag);
    console.log("editorText", EditorText);
    console.log("authorName", authorName);
    try {
      const response = await axios.post(
        `${backEndBaseUrl}/api/createnews`,
        newsData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      socket.emit("liveUpdate", true);
      alert(response.data);
      // for reloading the page after submission
      window.location.reload();
    } catch (error) {
      console.error("Error sending data", error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxFileSizeinBytes) {
        setError("File size exceeds the maximun allowed file size");
        return;
      }
    }
    const fileType = file.type.split("/")[0];
    // console.log(fileType);
    // this will split image/dev to [image, dev] and then we want the image from there.
    setSelectedFile(file);
    setFileType(fileType);
    setError(null);
    // now we will use the file reader api to read the file
    // console.log(file.type);
    if (allowedFileTypes.includes(file.type)) {
      if (fileType === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          const fileDataUrl = reader.result;
          setPreviewUrl(fileDataUrl);
          console.log(fileDataUrl);
        };
        reader.readAsDataURL(file);
      } else if (fileType === "video") {
        setPreviewUrl(URL.createObjectURL(file));
        console.log(setPreviewUrl);
      }
    }
    // console.log(file);
  };
  const handleEditorChange = (content) => {
    setEditorText(content);
    console.log("Editor content : ", content);
  };
  return (
    <div className="mt-28">
      <div className="mx-auto bg-white drop-shadow-md w-10/12 rounded">
        <h3 className="p-6 font-bold mb-8 text-black border-b">
          {""} Write News Article
        </h3>
        <div className="container p-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <label htmlFor="title" className="block text-sm text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
              />
            </div>

            <div className="mb-10">
              <label htmlFor="newsType" className="block text-sm text-gray-600">
                News Type
              </label>
              <select
                name="newsType"
                id="newsType"
                value={selectedType}
                onChange={handleNewsTypeChange}
                className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
              >
                <option value="" disabled>
                  Select News Type
                </option>
                {types.map((type) => (
                  <option value={type.name} key={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedType === "LiveUpdate" && (
              <>
                {liveUpdateTypes.length !== 0 ? (
                  <div className="bg-yellow-100 px-4 mb-10 rounded">
                    <div className="flex justify-between py-5">
                      <div className="w-full">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Live Update News Type
                        </label>
                        <input
                          type="text"
                          id="LiveUpdateType"
                          name="LiveUpdateType"
                          placeholder="eg: ukraine-russia-war"
                          onChange={handleLiveUpdateTypeChange}
                          className="mt-2 p-3 mr-2 bg-gray-200 focus:outline-none w-full border rounded-md"
                          required
                        />
                      </div>
                      <p className="font-medium text-xs flex items-center mb-2 ml-2 text-gray-600">
                        OR
                      </p>
                      <div className="w-full">
                        <label
                          htmlFor="LiveUpdateType"
                          className="block text-sm font-medium ml-2.5 text-gray-600"
                        >
                          Live Update News Type
                        </label>
                        <select
                          name="LiveUpdateType"
                          id="LiveUpdateType"
                          value={selectedLiveUpdateType}
                          onChange={handleLiveUpdateTypeChange}
                          className="mt-2 p-[0.95rem] ml-2 bg-gray-200 focus:outline-none w-full border rounded-md"
                        >
                          <option value="" disabled>
                            Select Live News Type
                          </option>
                          {liveUpdateTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="pb-5">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Live Update Main Headline
                      </label>
                      <input
                        type="text"
                        id="LiveUpdateType"
                        name="LiveUpdateType"
                        value={liveUpdateHeadline}
                        onChange={(e) => {
                          setLiveUpdateHeadline(e.target.value);
                        }}
                        placeholder="Live Update Main Headline"
                        className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-200 px-4 mb-10 rounded">
                    <div className="py-5">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Live Update News Type
                      </label>
                      <input
                        type="text"
                        id="LiveUpdateType"
                        name="LiveUpdateType"
                        placeholder="eg: ukrain-russia-war"
                        onChange={handleLiveUpdateTypeChange}
                        className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
                        required
                      />
                    </div>
                    <div className="pb-5">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Live Update Main Headline
                      </label>
                      <input
                        type="text"
                        id="LiveUpdateType"
                        name="LiveUpdateType"
                        value={liveUpdateHeadline}
                        onChange={(e) => {
                          setLiveUpdateHeadline(e.target.value);
                        }}
                        placeholder="Live Update Main Headline"
                        className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md "
                        required
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="mb-10">
              <label className="block text-sm text-gray-600">Upload file</label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                className="sr-only"
                accept="images/*, videos/*"
              />

              <label
                htmlFor="file"
                className="mt-1 p-2 w-full cursor-pointer border border-gray-300 rounded-md flex items-center justify-center bg-blue-600 text-white hover:bg-gray-900"
              >
                Select Image or Video
              </label>
              {error && <p className="text-red-500">{error}</p>}
              {previewUrl && (
                <div className="mt-2">
                  {fileType === "image" && (
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="max-w-full h-96"
                    />
                  )}
                  {fileType === "video" && (
                    <video
                      controls
                      className="w-100 object-cover"
                      src={previewUrl}
                      alt="preview"
                    >
                      <source src={previewUrl} type={SelectedFile.type} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </div>
            <Editor
              placeholder="Write something..."
              onChange={handleEditorChange}
              initialText={""}
            />
            <div className="mb-10"></div>
            <div className="mb-10">
              <label htmlFor="newsType" className="block text-sm text-gray-600">
                News Category
              </label>
              <select
                name="newsCategory"
                id="newsCategory"
                value={selectedNewsCategory}
                onChange={handleNewsCategoryChange}
                className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
              >
                <option value="" disabled>
                  Select News Category
                </option>
                {newsCategory.map((category) => (
                  <option value={category.name} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-10">
              <label htmlFor="newsType" className="block text-sm text-gray-600">
                News Sub Category
              </label>
              <select
                name="newsSubCategory"
                id="newsSubCategory"
                value={selectedNewsSubCategory}
                onChange={handleNewsSubCategoryChange}
                className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
              >
                <option value="" disabled>
                  Select News Sub Category
                </option>
                {newsSubCategory.map((subCategory) => (
                  <option value={subCategory.name} key={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-10">
              <label htmlFor="newsType" className="block text-sm text-gray-600">
                News Tag
              </label>
              <select
                name="newsTag"
                id="newsTag"
                value={selectedNewsTag}
                onChange={handleNewsTagChange}
                className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
              >
                <option value="" disabled>
                  Select News Tag
                </option>
                {newsTag.map((tag) => (
                  <option value={tag.name} key={tag._id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-10">
              <label htmlFor="author" className="block text-sm text-gray-600">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="mt-2 p-3 bg-gray-200 focus:outline-none w-full border rounded-md"
              />
            </div>
            <div className="mb-10 mt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-gray-900 text-white w-full p-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNews;
