import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Footer({ SearchText }) {
  // this is the useNavgiate hook which is used to navigate to the specified url
  const navigation = useNavigate();
  const [searchText, setSearchText] = useState("");
  const handleInputChange = (e) => {
    console.log(e);
    setSearchText(e.target.value);
  };
  const handleSearch = () => {
    navigation(`/search/${searchText}`);
  };

  const categoriesRow1 = [
    {
      title: "World",
      items: [
        "Africa",
        "Americas",
        "Asia",
        "Australia",
        "China",
        "Europe",
        "India",
        "Middle East",
        "United Kingdom",
      ],
    },
    {
      title: "US Politics",
      items: ["The Biden Presidency", "Facts First", "2024 Elections"],
    },
    {
      title: "Business",
      items: ["Markets", "Tech", "Media", "Calculators", "Videos"],
    },
    {
      title: "Health",
      items: [
        "Life, But Better",
        "Fitness",
        "Food",
        "Sleep",
        "Mindfulness",
        "Relationships",
      ],
    },
    {
      title: "Entertainment",
      items: ["Movies", "Television", "Celebrity"],
    },
    {
      title: "Tech",
      items: [
        "Innovate",
        "Gadget",
        "Foreseeable Future",
        "Mission: Ahead",
        "Upstarts",
        "Work Transformed",
        "Innovative Cities",
      ],
    },
    {
      title: "Style",
      items: [
        "Arts",
        "Design",
        "Fashion",
        "Architecture",
        "Luxury",
        "Beauty",
        "Video",
      ],
    },

    // Add other categories similarly
  ];
  const categoriesRow2 = [
    {
      title: "Travel",
      items: ["Destinations", "Food & Drink", "Stay", "News", "Videos"],
    },
    {
      title: "Sports",
      items: [
        "Football",
        "Tennis",
        "Golf",
        "Motorsport",
        "US Sports",
        "Olympics",
        "Climbing",
        "Esports",
        "Hockey",
      ],
    },
    {
      title: "Watch",
      items: [
        "Live TV",
        "Digital Studios",
        "CNN Films",
        "HLN",
        "TV Schedule",
        "TV Shows A-Z",
        "CNNVR",
      ],
    },
    {
      title: "Features",
      items: [
        "As Equals",
        "Call to Earth",
        "Freedom Project",
        "Impact Your World",
        "Inside Africa",
        "2 Degrees",
        "CNN Heroes",
        "All Features",
      ],
    },
    {
      title: "Weather",
      items: ["Climate", "Wildfire Tracker", "Video"],
    },
    {
      title: "More",
      items: [
        "Photos",
        "Longform",
        "Investigations",
        "CNN Profiles",
        "CNN Leadership",
        "CNN Newsletters",
        "Work for CNN",
      ],
    },
    // Add other categories similarly
  ];
  return (
    <div className="bg-black p-4">
      <hr className="pb-5" />
      <div className="flex items-center p-2 mt-4">
        <input
          type="text"
          value={SearchText}
          className="h-8 px-2 w-full bg-white border-none outline-none rounded-1"
          onChange={handleInputChange}
        />
        <button
          onClick={handleSearch}
          className="h-8 bg-white text-black px-2 rounded-r flex items-center font-bold"
        >
          Search
          <span className="ml-1 font-bold text-2xl pb-1">&#8594;</span>
        </button>
      </div>
      <div className="bg-black text-white p-6">
        <div className="grid grid-cols-7 pb-4 ">
          {categoriesRow1.map((category, index) => (
            <div key={index} className="border-b-3 border-white">
              <span className="font-bold text-lg">{category.title}</span>
              <div className="flex flex-col flex-wrap mt-2">
                {category.items.map((item, i) => (
                  <NavLink
                    key={i}
                    to={`/${category.title.toLowerCase()}/${item.toLowerCase()}`}
                    className="py-1 text-sm leading-none hover:underline"
                    exact
                  >
                    {item}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 pb-4 ">
          {categoriesRow2.map((category, index) => (
            <div key={index} className="border-b-3 border-white">
              <span className="font-bold text-lg">{category.title}</span>
              <div className="flex flex-col flex-wrap mt-2">
                {category.items.map((item, i) => (
                  <NavLink
                    key={i}
                    to={`/${category.title.toLowerCase()}/${item.toLowerCase()}`}
                    className="py-1 text-sm leading-none hover:underline"
                    exact
                  >
                    {item}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-black w-full pt-8 pb-8 px-5 flex flex-col items-start text-white border-y border-gray-700">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <img
              src="images/Header/logo.png"
              alt="logo"
              className="w-auto h-8 mr-4"
            />
            <div className="font-bol text-2xl text-white">US</div>
          </div>
          <div className="flex items-center">
            <NavLink
              to="/Watch"
              className="text-white text-[0.937rem] font-bold ml-7"
            >
              {"Watch"}
            </NavLink>
            <NavLink
              to="/Listen"
              className="text-white text-[0.937rem] font-bold ml-7"
            >
              {"Listen"}
            </NavLink>
            <NavLink
              to="/Live-TV"
              className="text-white text-[0.937rem] font-bold ml-7"
            >
              {"Live TV"}
            </NavLink>
            <div className="border-r border-gray-500 w-1 h-6 mx-4"></div>
            <div className="text-white text-[0.937rem] font-bold ">
              Follow CNN
            </div>
            <NavLink
              to="/facebook"
              className="text-white  text-[0.937rem] font-bold mx-4"
            >
              <img
                src="images/Footer/Facebook.png"
                alt="facebook"
                className="h-full w-full"
              />
            </NavLink>
            <NavLink
              to="/x"
              className="text-white  text-[0.937rem] font-bold mx-4"
            >
              <img
                src="images/Footer/X.png"
                alt="x"
                className="h-full w-full"
              />
            </NavLink>
            <NavLink
              to="/instagram"
              className="text-white  text-[0.937rem] font-bold mx-4"
            >
              <img
                src="images/Footer/Instagram.png"
                alt="Instagram"
                className="h-full w-full"
              />
            </NavLink>
            <NavLink
              to="/tiktok"
              className="text-white  text-[0.937rem] font-bold mx-4"
            >
              <img
                src="images/Footer/Tiktok.png"
                alt="tiktok"
                className="h-full w-full"
              />
            </NavLink>
            <NavLink
              to="/LinkedIn"
              className="text-white  text-[0.937rem] font-bold mx-4"
            >
              <img
                src="images/Footer/LinkedIn.png"
                alt="LinkedIn"
                className="h-full w-full"
              />
            </NavLink>
            <button className="border border-white rounded-xl ml-5 px-4 py-2 hover:bg-gray-800 text-white">
              Log In
            </button>
          </div>
        </div>
      </div>
      <div className="text-white text-sm flex flex-wrap items-center justify-start w-full mt-4 ">
        <NavLink to="/terms-of-use" className="ml-4">
          Terms of Use
        </NavLink>
        <NavLink to="/privacy-policy" className="ml-4">
          Privacy Policy
        </NavLink>
        <NavLink to="/Cookie-Settings" className="ml-4">
          Cookie Settings
        </NavLink>
        <NavLink to="/Ad-Choice" className="ml-4">
          Ad Choices
        </NavLink>
        <NavLink to="/Accessibility-&-CC" className="ml-4">
          Accessibility & CC
        </NavLink>
        <NavLink to="/About" className="ml-4">
          About
        </NavLink>
        <NavLink to="/Newsletters" className="ml-4">
          Newsletters
        </NavLink>
        <NavLink to="/Transcripts" className="ml-4">
          Transcripts
        </NavLink>
      </div>
      <div className="text-white text-sm mt-4 ml-4">
        © 2024 Cable News Network. A Warner Bros. Discovery Company. All Rights
      </div>
      <div className="text-white text-sm pb-6 ml-4">
        Reserved. CNN Sans ™ & © 2016 Cable News Network.
      </div>
    </div>
  );
}

export default Footer;
