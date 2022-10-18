import React from "react";
import { useState, useEffect } from "react";
import { useMoralis, useChain } from "react-moralis";
import { Link, useNavigate } from "react-router-dom";
// import MobileMenu from "./Menu/MobileMenu";
import MegaMenu from "./Menu/MegaMenu";
import ProfileMenu from "./Menu/ProfileMenu";
import Avatar from "@mui/material/Avatar";

const PagesMenu = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Create",
    link: "/upload-type",
  },
  {
    title: "Marketplace",
    link: "/marketplace/collection/all",
  },
  // {
  //   title: "Collections",
  //   link: "/collections",
  // },
  // {
  //   title: " Profile",
  //   link: "/profile",
  // },
];

const Header = () => {
  const [isActive, setActive] = useState(false);
  const [text, setText] = useState(null);
  const { Moralis, isAuthenticated, user, account } = useMoralis();

  let navigate = useNavigate();

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div>
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
                    width: "50px",
                  }}
                  src="/images/CREATIVE_VAULT-01.png"
                  // src="/img/logos/coin.svg"
                  alt="logo"
                />
              </Link>
            </div>
            {/* ==================  */}
            <div className="header__menu">
              <ul className="d-flex space-x-20">
                {/* <li className="has_popup">
                  <Link className="color_black is_new" to="/">
                    Homes <i className="ri-more-2-fill" />
                  </Link>
                  <ul className="menu__popup space-y-20">
                    {HomesMenu.map((val, i) => (
                      <li key={i}>
                        <Link to={val.link}>
                          <i className={`ri-${val.icon}-line`} />
                          {val.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li> */}
                {PagesMenu.map((val, i) => (
                  <li key={i}>
                    <Link className="color_black" to={val.link}>
                      {val.title}
                    </Link>
                  </li>
                ))}

                <li className="has_popup2">
                  <Link className="color_black is_new hovered" to="#">
                    Pages <i className="ri-more-2-fill" />
                  </Link>
                  <ul className="menu__popup2 space-y-20">
                    <MegaMenu />
                  </ul>
                </li>
              </ul>
            </div>
            {/* ================= */}
            <div className="header__search">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    {
                      text === null || text === undefined || text.length === 0
                        ? navigate(`/no-results`)
                        : navigate(`/results/${text}`);
                    }
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
            </div>
            <div style={{ width: "200px" }} className="header__btns">
              {/* <Link className="btn btn-grad btn-sm" to="#">
                <i className="ri-wallet-3-line" />
                Connect wallet
              </Link> */}
              {!isAuthenticated ||
              !user ||
              user.attributes.username === undefined ? (
                <button
                  className="btn btn-sm btn-grad"
                  onClick={() => navigate("/connect-wallet")}
                >
                  <i className="ri-wallet-3-line" />
                  Connect wallet
                </button>
              ) : (
                <li className="has_popup2 d-flex flex-row align-items-center">
                  <div className="d-inline">
                    {/* <Avatar
                      onClick={() => window.location.reload()}
                      alt="avatar"
                      src={
                        user && !user.attributes.avatar
                          ? "/images/avatar.png"
                          : user.attributes.avatar._url
                      }
                      style={{ cursor: "pointer" }}
                      sx={{ width: 50, height: 50 }}
                    /> */}
                    <ul
                      style={{ width: "180px" }}
                      className="menu__popup2  border border-dark mt-3"
                    >
                      <ProfileMenu />
                    </ul>
                  </div>
                  <div className="d-inline ml-3">
                    {user.attributes.username.substring(0, 10)}...
                  </div>
                </li>
              )}
            </div>
            <div
              className="header__burger js-header-burger"
              onClick={toggleClass}
            />
            <div
              className={`header__mobile js-header-mobile  ${
                isActive ? "visible" : null
              } `}
            >
              {/* <MobileMenu /> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
