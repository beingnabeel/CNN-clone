import React from "react";
import { NavLink } from "react-router-dom";

function AuthFooter() {
  return (
    <div>
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

export default AuthFooter;
