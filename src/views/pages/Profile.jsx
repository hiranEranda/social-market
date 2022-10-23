import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";

function Profile() {
  const person = {
    name: "john",
    ethAddress: "0xf5Cca8165459917B7db1c3d56f16Fa3A9c8A8B2c",
    followers: 10,
    following: 10,
  };
  return (
    <>
      <Header />

      <div className="flex items-center justify-center w-full">
        <div className="w-full bg-slate-900 h-[200px] flex justify-center items-center text-white text-4xl font-bold">
          My page
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto px-4 pb-[3rem] border-b border-gray-600">
        <div className="relative flex justify-center py-4">
          <img
            className="w-[120px] h-[120px] rounded-full object-cover border-[8px] border-white absolute -bottom-10 bg-white"
            src="/images/Avatar.png"
            alt=""
          />
          <img
            className="rounded-xl object-cover h-[280px]"
            src="/images/back_01.png"
            alt=""
          />
        </div>
        <div className="px-4 mt-[2rem] mx-auto">
          <h2 className="flex justify-center pt-3 text-xl">{person.name}</h2>
          <p className="flex justify-center pt-4 text-xl">
            {person.ethAddress}
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
            <AiFillInstagram className="text-2xl" />
            <BsFacebook className="text-2xl" />
            <AiFillTwitterCircle className="text-2xl" />
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
          <div className="flex items-center justify-center text-yellow-600 border-yellow-600 border-1 rounded-3xl">
            On sale
          </div>
          <div className="flex items-center justify-center text-yellow-600 border-yellow-600 border-1 rounded-3xl">
            Owned
          </div>
          <div className="flex items-center justify-center text-yellow-600 border-yellow-600 border-1 rounded-3xl">
            Created
          </div>
          <div className="flex items-center justify-center text-yellow-600 border-yellow-600 border-1 rounded-3xl">
            My collection
          </div>
          <div className="flex items-center justify-center text-yellow-600 border-yellow-600 border-1 rounded-3xl">
            Liked NFTs
          </div>
          <div className="flex items-center justify-center text-yellow-600 border-yellow-600 border-1 rounded-3xl">
            Activity
          </div>
          <div className="flex items-center justify-center text-yellow-600 border-yellow-600 border-1 rounded-3xl">
            Follower
          </div>
          <div className="flex items-center justify-center text-yellow-600 border-yellow-600 border-1 rounded-3xl">
            Following
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
