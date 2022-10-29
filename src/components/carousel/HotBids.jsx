import React from "react";
import Slider from "react-slick";
import CardsPrice721 from "../cards/CardsPrice721";

const val = [
  {
    transaction:
      "0xe87fc719718fe7848231f8157edcfc494cf1f5b32cd73ce1e0b0f7fd4c105bba",
    timestamp: "2022-09-08T12:45:22.000Z",
    uid: "5",
    tokenId: "6",
    tokenAddress: "0x646f1f51d63ecc510ce13d460f74e9bf590a7f81",
    askingPrice: "500000000000000",
    tokenUri:
      "https://ipfs.moralis.io:2053/ipfs/QmPkNhhf3pmvXmqgMUemeVYnabwMUocAvDhQj8pnF3gnq5",
    ownerOf: "0xcd709915f64bd216cc0c62c847c73639e2c33391",
    sellerUsername: "JimmyPro",
    sellerAvatar: {
      __type: "File",
      name: "a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
      url: "https://dxtsyokzek7o.usemoralis.com:2053/server/files/vTAzWPDgVbIkiLLnBG0ZVs7rBwl7WTpIrqoevRq6/a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
    },
    name: "Headphones",
    category: "Art",
    description: "phone description",
    image:
      "https://ipfs.moralis.io:2053/ipfs/Qmb9Y6954vmfCvPDwmhpeaHtV8aKjrT1U8pPqxZ97dpwsG",
    history: {
      state: false,
      data: "Just minted",
    },
  },
  {
    transaction:
      "0xe87fc719718fe7848231f8157edcfc494cf1f5b32cd73ce1e0b0f7fd4c105bba",
    timestamp: "2022-09-08T12:45:22.000Z",
    uid: "5",
    tokenId: "6",
    tokenAddress: "0x646f1f51d63ecc510ce13d460f74e9bf590a7f81",
    askingPrice: "500000000000000",
    tokenUri:
      "https://ipfs.moralis.io:2053/ipfs/QmPkNhhf3pmvXmqgMUemeVYnabwMUocAvDhQj8pnF3gnq5",
    ownerOf: "0xcd709915f64bd216cc0c62c847c73639e2c33391",
    sellerUsername: "JimmyPro",
    sellerAvatar: {
      __type: "File",
      name: "a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
      url: "https://dxtsyokzek7o.usemoralis.com:2053/server/files/vTAzWPDgVbIkiLLnBG0ZVs7rBwl7WTpIrqoevRq6/a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
    },
    name: "Headphones",
    category: "Art",
    description: "phone description",
    image:
      "https://ipfs.moralis.io:2053/ipfs/Qmb9Y6954vmfCvPDwmhpeaHtV8aKjrT1U8pPqxZ97dpwsG",
    history: {
      state: false,
      data: "Just minted",
    },
  },
  {
    transaction:
      "0xe87fc719718fe7848231f8157edcfc494cf1f5b32cd73ce1e0b0f7fd4c105bba",
    timestamp: "2022-09-08T12:45:22.000Z",
    uid: "5",
    tokenId: "6",
    tokenAddress: "0x646f1f51d63ecc510ce13d460f74e9bf590a7f81",
    askingPrice: "500000000000000",
    tokenUri:
      "https://ipfs.moralis.io:2053/ipfs/QmPkNhhf3pmvXmqgMUemeVYnabwMUocAvDhQj8pnF3gnq5",
    ownerOf: "0xcd709915f64bd216cc0c62c847c73639e2c33391",
    sellerUsername: "JimmyPro",
    sellerAvatar: {
      __type: "File",
      name: "a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
      url: "https://dxtsyokzek7o.usemoralis.com:2053/server/files/vTAzWPDgVbIkiLLnBG0ZVs7rBwl7WTpIrqoevRq6/a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
    },
    name: "Headphones",
    category: "Art",
    description: "phone description",
    image:
      "https://ipfs.moralis.io:2053/ipfs/Qmb9Y6954vmfCvPDwmhpeaHtV8aKjrT1U8pPqxZ97dpwsG",
    history: {
      state: false,
      data: "Just minted",
    },
  },
  {
    transaction:
      "0xe87fc719718fe7848231f8157edcfc494cf1f5b32cd73ce1e0b0f7fd4c105bba",
    timestamp: "2022-09-08T12:45:22.000Z",
    uid: "5",
    tokenId: "6",
    tokenAddress: "0x646f1f51d63ecc510ce13d460f74e9bf590a7f81",
    askingPrice: "500000000000000",
    tokenUri:
      "https://ipfs.moralis.io:2053/ipfs/QmPkNhhf3pmvXmqgMUemeVYnabwMUocAvDhQj8pnF3gnq5",
    ownerOf: "0xcd709915f64bd216cc0c62c847c73639e2c33391",
    sellerUsername: "JimmyPro",
    sellerAvatar: {
      __type: "File",
      name: "a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
      url: "https://dxtsyokzek7o.usemoralis.com:2053/server/files/vTAzWPDgVbIkiLLnBG0ZVs7rBwl7WTpIrqoevRq6/a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
    },
    name: "Headphones",
    category: "Art",
    description: "phone description",
    image:
      "https://ipfs.moralis.io:2053/ipfs/Qmb9Y6954vmfCvPDwmhpeaHtV8aKjrT1U8pPqxZ97dpwsG",
    history: {
      state: false,
      data: "Just minted",
    },
  },
  {
    transaction:
      "0x805df4392f7f17d4bd7ff6afaa5a93d202145680c6952c3ee244db4d23dcc1d3",
    timestamp: "2022-09-08T12:40:52.000Z",
    uid: "4",
    tokenId: "5",
    tokenAddress: "0x646f1f51d63ecc510ce13d460f74e9bf590a7f81",
    askingPrice: "500000000000000",
    tokenUri:
      "https://ipfs.moralis.io:2053/ipfs/QmSNNVnE23iQvveDXqX92H3MWT1A9UGWcRB9RkLfKct9ym",
    ownerOf: "0xcd709915f64bd216cc0c62c847c73639e2c33391",
    sellerUsername: "JimmyPro",
    sellerAvatar: {
      __type: "File",
      name: "a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
      url: "https://dxtsyokzek7o.usemoralis.com:2053/server/files/vTAzWPDgVbIkiLLnBG0ZVs7rBwl7WTpIrqoevRq6/a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
    },
    name: "Snowman",
    category: "Art",
    description: "Snowman with led",
    image:
      "https://ipfs.moralis.io:2053/ipfs/QmU1aNuRTKrgzuyAWJgmFeHtu6puydjEstc47GgqbTXt13",
    history: {
      state: false,
      data: "Just minted",
    },
  },
  {
    transaction:
      "0xb52aa0f9b27aa8cf78500f88d7ee8186773b5f842c9b27c50d27413e483b9ba7",
    timestamp: "2022-08-29T13:53:07.000Z",
    uid: "3",
    tokenId: "4",
    tokenAddress: "0x646f1f51d63ecc510ce13d460f74e9bf590a7f81",
    askingPrice: "500000000000000",
    tokenUri:
      "https://ipfs.moralis.io:2053/ipfs/QmNWwMSjLNwGi35sRE9n4nUZq9Sk5JAzfuFPwt93NBkHdk",
    ownerOf: "0xcd709915f64bd216cc0c62c847c73639e2c33391",
    sellerUsername: "JimmyPro",
    sellerAvatar: {
      __type: "File",
      name: "a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
      url: "https://dxtsyokzek7o.usemoralis.com:2053/server/files/vTAzWPDgVbIkiLLnBG0ZVs7rBwl7WTpIrqoevRq6/a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
    },
    name: "Pac man NFT",
    category: "Art",
    description: "This is a unique logo",
    image:
      "https://ipfs.moralis.io:2053/ipfs/QmUMqvkjv8nS75CgCMyYf6CCwpcULEDht1e3FPsf5xZpNx",
    history: {
      state: false,
      data: "Just minted",
    },
  },
  {
    transaction:
      "0x66811065d2a3714803d9cf2a976b3958ef85b20feb92288c30af39d4e25f486e",
    timestamp: "2022-07-12T07:15:21.000Z",
    uid: "2",
    tokenId: "3",
    tokenAddress: "0x646f1f51d63ecc510ce13d460f74e9bf590a7f81",
    askingPrice: "400000000000000",
    tokenUri:
      "https://ipfs.moralis.io:2053/ipfs/QmZ4Pav2EbkAqKrcKbroymvzSuvF4gZDNvMhEtqDBZRrep",
    ownerOf: "0xcd709915f64bd216cc0c62c847c73639e2c33391",
    sellerUsername: "JimmyPro",
    sellerAvatar: {
      __type: "File",
      name: "a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
      url: "https://dxtsyokzek7o.usemoralis.com:2053/server/files/vTAzWPDgVbIkiLLnBG0ZVs7rBwl7WTpIrqoevRq6/a777b7c9a7e9dd310be219083fde21f2_photo.jpg",
    },
    name: "Jim NFT",
    category: "Memes",
    description: "test",
    image:
      "https://ipfs.moralis.io:2053/ipfs/Qmf5zV18RVRjq1Y1nCaFCtFFHgrJ2MrNnFs8kQbRWCmJ2d",
    history: {
      state: false,
      data: "Just minted",
    },
  },
];

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <img src="/images/left-arrow.svg" alt="prevArrow" {...props} />
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <img src="/images/right-arrow.svg" alt="nextArrow" {...props} />
);
function HotBids() {
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
          {val.map((val, i) => (
            <CardsPrice721 key={i} val={val} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default HotBids;
