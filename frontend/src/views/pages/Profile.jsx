import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";

import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import OnSale from "../profile/OnSale";
import Created from "../profile/Created";
import Owned from "../profile/Owned";

const Moralis = require("moralis-v1");

function Profile() {
  const person = {
    name: "john",
    ethAddress: "0xf5Cca8165459917B7db1c3d56f16Fa3A9c8A8B2c",
    followers: 10,
    following: 10,
  };

  const [filter, setFilter] = useState("On sale");
  const [alignment, setAlignment] = React.useState("ERC-721");
  const [type, setType] = React.useState(false);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const getData = async () => {
    try {
      const user = await Moralis.User.current();
      const params = {
        ethAddress: user.get("ethAddress").toString().toLowerCase(),
      };
      const data = await Moralis.Cloud.run("getUser", params);
      return data.attributes;
    } catch (error) {
      return null;
    }
  };

  const { isInitialized } = useMoralis();
  let navigate = useNavigate();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function redirectIfNotLoggedIn() {
      const user = await Moralis.User.current();
      if (!user) {
        navigate(`/`);
      } else {
        getData().then((data) => {
          // console.log(data);
          setData(data);
        });
      }
    }
    redirectIfNotLoggedIn();
  }, [isInitialized, navigate]);

  return (
    <>
      <Header />

      <div className="flex items-center justify-center w-full">
        {console.log(filter)}
        <div className="w-full bg-slate-900 h-[200px] flex justify-center items-center text-white text-4xl font-bold">
          My page
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto px-4 pb-[3rem] border-b border-gray-600">
        <div className="relative flex justify-center py-4">
          <img
            className="w-[120px] h-[120px] rounded-full object-cover border-[8px] border-white absolute -bottom-10 bg-white"
            src={
              data === null || data.avatar === undefined
                ? "/images/Avatar.png"
                : data.avatar._url
            }
            alt=""
          />
          <img
            className="rounded-xl object-cover h-[280px]"
            src="/images/back_01.png"
            alt=""
          />
        </div>
        <div className="px-4 mt-[2rem] mx-auto">
          <h2 className="flex justify-center pt-3 text-xl">
            {data === null ? person.name : data.username}
          </h2>
          <p className="flex justify-center pt-4 text-xl">
            {data === null ? person.ethAddress : data.ethAddress}
          </p>
          <div className="grid grid-cols-2 gap-2 w-[400px] mx-auto mt-4 ">
            <p className="flex justify-center text-xl w-[100px] text-black">
              <span className="flex justify-center mr-2 text-black">
                {person.followers}
              </span>
              Followers
            </p>
            <p className="flex justify-center text-xl w-[100px] text-black">
              <span className="flex justify-center mr-2 text-black">
                {person.following}
              </span>
              Following
            </p>
          </div>
          <div className="flex justify-center gap-2 mx-auto mt-4">
            <AiFillInstagram
              onClick={() => {
                window.location.href = `https://${data.instagram}`;
              }}
              className="text-2xl cursor-pointer"
            />

            <BsFacebook
              onClick={() => {
                window.location.href = `https://${data.facebook}`;
              }}
              className="text-2xl cursor-pointer"
            />

            <AiFillTwitterCircle
              onClick={() => {
                window.location.href = `https://${data.twitter}`;
              }}
              className="text-2xl cursor-pointer"
            />
          </div>
          <p className="flex justify-center mt-4">This is my bio</p>
          <div className="flex mx-auto items-center justify-center mt-4 bg-yellow-500 rounded-2xl h-[40px] w-[350px] md:w-[200px]">
            <span className="mr-2 text-xl text-white">
              <FaUserEdit />
            </span>
            <a href="/edit-profile" className="text-white hover:text-gray-700">
              Edit profile
            </a>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mx-auto mt-4 md:grid-cols-8 h-[40px]">
          <div
            onClick={() => setFilter("On sale")}
            className="flex items-center justify-center text-yellow-600 border-yellow-600 cursor-pointer border-1 rounded-3xl"
          >
            On sale
          </div>
          <div
            onClick={() => setFilter("Owned")}
            className="flex items-center justify-center text-yellow-600 border-yellow-600 cursor-pointer border-1 rounded-3xl"
          >
            Owned
          </div>
          <div
            onClick={() => setFilter("Created")}
            className="flex items-center justify-center text-yellow-600 border-yellow-600 cursor-pointer border-1 rounded-3xl"
          >
            Created
          </div>
          <div
            onClick={() => setFilter("My collection")}
            className="flex items-center justify-center text-yellow-600 border-yellow-600 cursor-pointer border-1 rounded-3xl"
          >
            My collection
          </div>
          <div
            onClick={() => setFilter("Liked NFTs")}
            className="flex items-center justify-center text-yellow-600 border-yellow-600 cursor-pointer border-1 rounded-3xl"
          >
            Liked NFTs
          </div>
          <div
            onClick={() => setFilter("Activity")}
            className="flex items-center justify-center text-yellow-600 border-yellow-600 cursor-pointer border-1 rounded-3xl"
          >
            Activity
          </div>
          <div
            onClick={() => setFilter("Follower")}
            className="flex items-center justify-center text-yellow-600 border-yellow-600 cursor-pointer border-1 rounded-3xl"
          >
            Follower
          </div>
          <div
            onClick={() => setFilter("Following")}
            className="flex items-center justify-center text-yellow-600 border-yellow-600 cursor-pointer border-1 rounded-3xl"
          >
            Following
          </div>
        </div>
        <div className="my-4">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton onClick={() => setType(false)} value="ERC-721">
              ERC-721
            </ToggleButton>
            <ToggleButton onClick={() => setType(true)} value="ERC-1155">
              ERC-1155
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="mt-4">
          {filter === "On sale" ? (
            <OnSale isMultiple={type} />
          ) : filter === "Created" ? (
            <Created />
          ) : filter === "Owned" ? (
            <Owned />
          ) : null}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
