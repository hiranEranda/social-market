import React from "react";
import { useState, useEffect } from "react";
import { useMoralis, useChain } from "react-moralis";
import { Link, useNavigate } from "react-router-dom";
// import MobileMenu from "./Menu/MobileMenu";
import MegaMenu from "./Menu/MegaMenu";
import ProfileMenu from "./Menu/ProfileMenu";
// import Avatar from "@mui/material/Avatar";

const PagesMenu = [
  {
    title: "Marketplace",
    link: "#",
  },
  {
    title: "My page",
    link: "#",
  },
];

const Header = () => {
  let navigate = useNavigate();

  const [isActive, setActive] = useState(false);
  const [text, setText] = useState(null);

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div
    // style={{
    //   overflow: "hidden",
    //   backgroundColor: "#333",
    //   position: "fixed" /* Set the navbar to fixed position */,
    //   top: "0" /* Position the navbar at the top of the page */,
    //   width: "100%" /* Full width */,
    // }}
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
                    width: "50px",
                  }}
                  src="/images/fire.gif"
                  // src="/img/logos/coin.svg"
                  alt="logo"
                />
              </Link>
            </div>
            {/* ==================  */}
            <div className="header__menu">
              <ul className="d-flex space-x-20">
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
                  <ul className="menu__popup2 space-y-20">
                    <MegaMenu />
                  </ul>
                </li>
                <li className="has_popup2">
                  <Link className="color_white is_new hovered" to="#">
                    Creator Center <i className="ri-more-2-fill" />
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
