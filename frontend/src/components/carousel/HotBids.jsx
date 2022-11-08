import React from "react";
import Slider from "react-slick";
import CardsPrice721 from "../cards/CardsPrice721";

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <img src="/images/left-arrow.svg" alt="prevArrow" {...props} />
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <img src="/images/right-arrow.svg" alt="nextArrow" {...props} />
);
function HotBids({ data }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="justify-self-center mx-auto max-w-[1400px]">
      <div
        className="max-w-[2180px] "
        style={{ padding: "3rem", backgroundColor: "#fff" }}
      >
        <div style={{ marginBottom: "5px" }}>
          <h2>
            <span style={{ color: "#c19a2e" }}>Hot </span> Bids 🔥
          </h2>
        </div>

        <Slider {...settings}>
          {data.map((val, i) => (
            <div
              key={i}
              className="grid gap-1 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-[1350px] pt-2"
            >
              <CardsPrice721 val={val} />
            </div>
          ))}
          {/* <CardsPrice721 val={val} /> */}
        </Slider>
      </div>
    </div>
  );
}

export default HotBids;
