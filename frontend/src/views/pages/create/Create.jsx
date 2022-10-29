import React from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import { useNavigate } from "react-router";

import { HiDocument } from "react-icons/hi";
import { HiDocumentDuplicate } from "react-icons/hi";
import { Link } from "react-router-dom";

function Create() {
  const navigate = new useNavigate();
  return (
    <>
      <Header />

      <div className="mx-auto max-w-[1300px]  mt-[250px] align-center px-3 mb-[200px]">
        <h1>Choose Type</h1>
        <p className="mt-3">
          Choose “Single” for one of a kind or “Multiple” if you want to sell
          one collectible multiple times
        </p>
        <div className="grid gap-3 mt-3 md:grid-cols-2">
          <Link to="/create/erc-721" state={{ flag: false }}>
            <div className="p-4 border-gray-400 rounded-xl border-1 align-center h-[250px] cursor-pointer hover:shadow-2xl transition-shadow ease-in-out">
              <HiDocument className="mx-auto text-black" size={100} />
              <p className="flex justify-center mt-4 text-2xl font-bold text-black">
                Single
              </p>
              <p className="flex justify-center text-center">
                If you want to highlight the uniqueness and the individuality of
                your item
              </p>
            </div>
          </Link>
          <Link to="/create/erc-1155" state={{ flag: true }}>
            <div className="p-4 border-gray-400 rounded-xl border-1 align-center h-[250px] cursor-pointer hover:shadow-2xl transition-shadow ease-in-out">
              <HiDocumentDuplicate
                className="mx-auto text-4xl text-black"
                size={100}
              />
              <p className="flex justify-center mt-4 text-2xl font-bold text-black">
                Multiple
              </p>

              <p className="flex justify-center text-center">
                If you want to share your NFT with a large number of community
                members
              </p>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Create;
