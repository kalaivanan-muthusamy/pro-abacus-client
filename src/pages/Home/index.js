import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import AboutUs from "./AboutUs/index";
import Pricing from "./Pricing/index";
import Gallery from "./Gallery";
import Footer from "./Footer";
import LevelDetails from "./LevelDetails/index";

function Home() {
  const [imglight, setimglight] = useState(true);
  const [navClass, setnavClass] = useState("");

  // Use ComponentDidMount
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 80) {
      setimglight(false);
      setnavClass("nav-sticky");
    } else {
      setimglight(true);
      setnavClass("");
    }
  }

  return (
    <React.Fragment>
      <Navbar navClass={navClass} imglight={imglight} />
      <HeroSection />
      <AboutUs />
      <Pricing />
      <LevelDetails />
      {/* <Gallery /> */}
      <Footer />
    </React.Fragment>
  );
}

export default Home;
