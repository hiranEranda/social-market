import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useMoralis } from "react-moralis";

import MobileMenu from "./Menu/MobileMenu";
import MegaMenu from "./Menu/MegaMenu";
import ProfileMenu from "./Menu/ProfileMenu";
import Avatar from "@mui/material/Avatar";

import { FaWallet } from "react-icons/fa";

const PagesMenu = [
  {
    title: "Marketplace",
    link: "/marketplace",
  },
  {
    title: "My page",
    link: "/profile",
  },
];

const Header = () => {
  const wallet = (flag) => {
    flag
      ? toast.success("Wallet connected successfully")
      : toast.error("Try again");
  };

  let navigate = useNavigate();
  const { Moralis, isAuthenticated, user, account } = useMoralis();

  const [isActive, setActive] = useState(false);
  const [text, setText] = useState(null);

  const toggleClass = () => {
    setActive(!isActive);
  };
  React.useEffect(() => {
    Moralis.onAccountChanged(async (account) => {
      Moralis.User.logOut().then(() => {
        const currentUser = Moralis.User.current(); // this will now be null
        if (currentUser === null) {
          navigate(`/connect-wallet`);
        }
      });
    });
  }, [account]);
  return (
    <div
      style={{
        // overflow: "hidden",
        // backgroundColor: "#333",
        zIndex: 1,
        position: "fixed" /* Set the navbar to fixed position */,
        // top: "0" /* Position the navbar at the top of the page */,
        width: "100%" /* Full width */,
      }}
    >
      <header className="header__1">
        <div className="container">
          <div className="wrapper js-header-wrapper">
            <div className="header__logo">
              <Link to="/">
                <img
                  className="header__logo"
                  id="logo_js"
                  style={{
                    height: "50px",
                  }}
                  src="/images/logo2.png"
                  // src="/img/logos/coin.svg"
                  alt="logo"
                />
              </Link>
            </div>
            {/* ==================  */}
            <div className="header__menu">
              <ul className="space-x-20 d-flex">
                {PagesMenu.map((val, i) => (
                  <li key={i}>
                    <Link className="color_white" to={val.link}>
                      {val.title}
                    </Link>
                  </li>
                ))}

                <li className="has_popup2">
                  <Link className="color_white is_new hovered" to="#">
                    Customer Community <i className="ri-more-2-fill" />
                  </Link>
                  <ul className="space-y-20 menu__popup2">
                    <MegaMenu />
                  </ul>
                </li>
                <li className="has_popup2">
                  <Link className="color_white is_new hovered" to="/create">
                    Creator Center <i className="ri-more-2-fill" />
                  </Link>
                  {/* <ul className="space-y-20 menu__popup2">
                    <MegaMenu />
                  </ul> */}
                </li>
                <li className="has_popup2">
                  <Link className="color_white is_new hovered" to="/create">
                    Creator Center <i className="ri-more-2-fill" />
                  </Link>
                  {/* <ul className="space-y-20 menu__popup2">
                    <MegaMenu />
                  </ul> */}
                </li>
              </ul>
            </div>
            {/* ================= search bar ================= */}
            {/* <div className="header__search">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    text === null || text === undefined || text.length === 0
                      ? navigate(`/no-results`)
                      : navigate(`/results/${text}`);
                  }
                }}
              />

              <Link
                to={
                  text === null || text === undefined || text.length === 0
                    ? `/no-results`
                    : `/results/${text}`
                }
                className="header__result"
              >
                <i className="ri-search-line" />
              </Link>
            </div> */}

            {/* //////////////////////////////////////////////////////// */}

            <div className="header__btns w-[200px] ">
              {!isAuthenticated ||
              !user ||
              user.attributes.username === undefined ? (
                <button
                  className="flex py-[10px] px-[15px] bg-black text-white rounded-3xl border-2 border-yellow-500 items-center"
                  onClick={() => navigate("/connect-wallet")}
                >
                  <FaWallet className="mr-2 text-xl text-white" />
                  Connect wallet
                </button>
              ) : (
                <li className="flex-row has_popup2 d-flex align-items-center py-[5px] px-[5px] rounded-[2rem] border-2 border-yellow-500">
                  <div className="d-inline">
                    <Avatar
                      onClick={() => window.location.reload()}
                      alt="avatar"
                      src={
                        user && !user.attributes.avatar
                          ? "/images/avatar.png"
                          : user.attributes.avatar._url
                      }
                      style={{ cursor: "pointer", border: "1px solid yellow" }}
                      sx={{ width: 40, height: 40 }}
                    />
                    <ul
                      style={{ width: "180px" }}
                      className="mt-3 border menu__popup2 border-dark"
                    >
                      <ProfileMenu />
                    </ul>
                  </div>
                  <div className="ml-3 text-white d-inline">
                    {user.attributes.username.substring(0, 10)}
                  </div>
                </li>
              )}
            </div>
            <div
              className="header__burger js-header-burger"
              onClick={toggleClass}
            />

            {/* ///////////////////////////////////////////////////////// */}
            <div
              className={`header__mobile js-header-mobile  ${
                isActive ? "visible" : null
              } `}
            >
              <MobileMenu />
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </header>
    </div>
  );
};

export default Header;
