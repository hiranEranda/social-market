import React, { useState, useEffect } from "react";

import useDocumentTitle from "../../components/useDocumentTitle";
import Header from "../../components/header/Header";

import Footer from "../../components/footer/Footer";
import ResponsiveSlider from "../../components/carousel/HotBids";
import CardsPrice721 from "../../components/cards/CardsPrice721";

const Home1 = () => {
  return (
    <div>
      <Header />
      <ResponsiveSlider />

      <Footer />
    </div>
  );
};

export default Home1;
