import React from "react";
import Adv from "./Adv";
import Nav from "./Nav";

function Header({ onSearchButtonClick }) {
  return (
    <>
      <Adv />
      <Nav onSearchButtonClick={onSearchButtonClick} />
    </>
  );
}

export default Header;
