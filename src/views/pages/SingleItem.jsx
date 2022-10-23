import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";

const nft = {
  id: "3213154654",
  category: "Art",
  price: "120",
};

function SingleItem() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-full">
        <div className="w-full h-[150px] bg-slate-900 flex">
          <p className="flex items-center justify-center text-4xl text-white">
            Single Product
          </p>
        </div>
      </div>
      <div className="max-w-[560px] md:max-w-[760px] lg:max-w-[1240px] flex justify-center items-center mx-auto">
        <div className="p-4 m-4 border-gray-300 rounded-lg border-1">
          <div className="grid gap-2 lg:grid-cols-2">
            <div className="pt-3 ">
              <img
                className="flex mx-auto rounded-xl max-h-[500px]"
                src="/images/large.jpg"
                alt=""
              />
              <div className="flex items-center justify-center px-4 py-2 mt-4 bg-yellow-500 h-[40px] md:w-[200px] rounded-full gap-4">
                <AiFillInstagram className="text-xl text-white" />
                <BsFacebook className="text-xl text-white" />
                <AiFillTwitterCircle className="text-xl text-white" />
              </div>
            </div>
            <div className="mt-3 md:pl-4">
              <p className="text-black">NFT ID: {nft.id}</p>
              <p className="text-2xl font-bold text-black">
                NFT open for bid token
              </p>
              <p className="mt-3 text-black">Item category: {nft.category}</p>
              <div className="grid gap-3 my-3 md:grid-cols-2">
                <div className="p-2 border-gray-400 rounded-lg border-1 h-[70px] my-auto">
                  <div className="grid grid-flow-col grid-rows-2 gap-2 h-[50px]">
                    <div className="flex items-center row-span-2 mx-auto">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="/images/fire.gif"
                        alt=""
                      />
                    </div>
                    <div className="col-span-2">02</div>
                    <div className="col-span-2">03</div>
                  </div>
                </div>
                <div className=" p-2 border-gray-400 rounded-lg border-1 h-[70px]">
                  <div className="grid grid-flow-col grid-rows-2 gap-2 h-[50px]">
                    <div className="row-span-2">01</div>
                    <div className="col-span-2">02</div>
                    <div className="col-span-2">03</div>
                  </div>
                </div>
              </div>
              <p className="text-black">Description</p>
              <div className="overflow-auto scroll-y scroll-smooth h-[6rem] border-1 border-gray-300 rounded-lg p-2">
                <p>c dolore. Nostrum, veniam? Nemo aperiam quidem labore ex!</p>
              </div>
              <div className="px-3 mt-4">
                <p className="text-xl text-black">Price</p>
                <p className="flex text-xl font-bold text-black">
                  <span className="mr-2">
                    <img src="images/fire.gif" className="w-6 h-6" alt="" />
                  </span>
                  SMKT {nft.price}
                </p>
              </div>
              <div className="px-3 mt-4">
                <button className="px-[100px] py-2 bg-yellow-400 rounded-md">
                  Only Bid
                </button>
              </div>
              <div className="px-3 mt-4">
                <p className="text-black">Highest bid by</p>
                <p className="text-xl text-black">
                  TTyYHxpVNNPub8xwpsifQjHRTBZLLQ4Ur8
                </p>
                <p>0.0007 SMKT</p>
              </div>
              <div className="mt-4">
                <p className="text-black">Bid History</p>
                <div className="overflow-auto scroll-y scroll-smooth h-[6rem] border-1 border-gray-300 rounded-lg p-2">
                  asdsadsa
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleItem;
