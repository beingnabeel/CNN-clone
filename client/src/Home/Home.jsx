import React, { useState } from "react";
import Header from "../Common/Header/Header";
import Firstsection from "./Firstsection";
import SecondSection from "./SecondSection";
import ThirdAdv from "./ThirdAdv";
import FourthSection from "./FourthSection";
import FifthSection from "./FifthSection";
import SixthSection from "./SixthSection";
import SeventhSection from "./SeventhSection";
import EighthSection from "./EighthSection";
import NinthSection from "./NinthSection";
import TenthSection from "./TenthSection";
import EleventhSection from "./EleventhSection";
import Footer from "../Common/Footer/Footer";

function Home() {
  const [showFooterSearch, setShowFooterSearch] = useState(false);
  const onSearchButtonClick = () => {
    setShowFooterSearch(!showFooterSearch);
  };
  return (
    <>
      <Header onSearchButtonClick={onSearchButtonClick} />
      {!showFooterSearch && (
        <>
          <Firstsection />
          <SecondSection />
          <ThirdAdv />
          <FourthSection />
          <FifthSection />
          <SixthSection />
          <SeventhSection />
          <EighthSection />
          <NinthSection />
          <TenthSection />
          <EleventhSection />
        </>
      )}
      <Footer />
    </>
  );
}

export default Home;
