import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Nav({ onSearchButtonClick }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className="flex bg-black">
        {/* inside this div we have 2 divs where 1 is taking 3/4 and the other one is taking 1/4 parts */}
        <div className="flex basis-3/4 justify-evenly items-center mr-4">
          {/* this div is for the icon */}
          {/* ******************************** */}
          <div
            onClick={() => {
              toggleMenu();
              onSearchButtonClick();
            }}
            className="text-white focus:outline-none cursor-pointer"
          >
            {isMenuOpen ? (
              // Close icon (x)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white text-[0.937rem] font-bold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </div>
          {/* *************************** */}
          <Link to="/">
            <div className="flex justify-center">
              {/* this div is for the logo img */}
              <img className="h-10" src="/images/Header/logo.png" alt="logo" />
            </div>
          </Link>
          {/* this div is for the nav links, this will be imported from the react router dom */}
          <NavLink
            to="/category/US"
            className="text-white text-[0.937rem] font-bold"
          >
            {"US"}
          </NavLink>
          <NavLink
            to="/category/World"
            className="text-white text-[0.937rem] font-bold"
          >
            {"World"}
          </NavLink>
          <NavLink
            to="/category/Politics"
            className="text-white text-[0.937rem] font-bold"
          >
            {"Politics"}
          </NavLink>
          <NavLink
            to="/category/Business"
            className="text-white text-[0.937rem] font-bold"
          >
            {"Business"}
          </NavLink>
          <NavLink
            to="/category/Opinion"
            className="text-white text-[0.937rem] font-bold"
          >
            {"Opinion"}
          </NavLink>
          <NavLink
            to="/category/Health"
            className="text-white text-[0.937rem] font-bold"
          >
            {"Health"}
          </NavLink>
          <NavLink
            to="/category/Entertainment"
            className="text-white text-[0.937rem] font-bold"
          >
            {"Entertainment"}
          </NavLink>
          <NavLink
            to="/category/Style"
            className="text-white text-[0.937rem] font-bold"
          >
            {"Style"}
          </NavLink>
          <NavLink
            to="/category/Travel"
            className="text-white text-[0.937rem] font-bold"
          >
            {"Travel"}
          </NavLink>
          <NavLink
            to="/category/Sports"
            className="text-white text-[0.937rem] font-bold"
          >
            {"Sports"}
          </NavLink>
        </div>
        <div className="flex basis-1/4 justify-evenly items-center">
          <NavLink
            to="/category/Watch"
            className="text-white text-[0.937rem] font-bold"
          >
            {"Watch"}
          </NavLink>
          <NavLink
            to="/category/Listen"
            className="text-white text-[0.937rem] font-bold"
          >
            {"Listen"}
          </NavLink>
          <NavLink
            to="/category/Live-TV"
            className="text-white text-[0.937rem] font-bold"
          >
            {"Live TV"}
          </NavLink>
          <div className="cursor-pointer" onClick={onSearchButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <NavLink
            to="/login"
            className="text-white text-[0.937rem] font-bold border border-white p-1 rounded"
          >
            {"Log In"}
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Nav;
