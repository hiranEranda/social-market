import React from "react";
import { useNavigate } from "react-router-dom";
import MegaMenu from "./MegaMenu";
import Avatar from "@mui/material/Avatar";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
const Menu = [
  {
    title: "Marketplace",
    link: "/",
  },
  {
    title: "My page",
    link: "/profile",
  },
];
function MobileMenu() {
  let navigate = useNavigate();
  const { user, isAuthenticated, authenticate, logout } = useMoralis();
  const wallet = (flag) => {
    flag
      ? toast.success("Wallet connected successfully")
      : toast.error("Try again");
  };

  return (
    <div className="p-4 border-black border-1 rounded-3xl">
      <div className="space-y-40 header__mobile__menu ">
        <ul className="space-y-20 d-flex">
          {Menu.map((val, i) => (
            <li key={i}>
              <Link to={val.link} className="color_black">
                {val.title}
              </Link>
            </li>
          ))}
          <li className="has_popup2">
            <Link className="color_black is_new hovered" to="#">
              Customer Community <i className="ri-more-2-fill" />
            </Link>
            <ul className="space-y-20 menu__popup2">
              <MegaMenu />
            </ul>
          </li>
          <li className="has_popup2">
            <Link className="color_black is_new hovered" to="#">
              Creator Center <i className="ri-more-2-fill" />
            </Link>
            <ul className="space-y-20 menu__popup2">
              <MegaMenu />
            </ul>
          </li>
          {isAuthenticated ? (
            <li>
              <Link
                to="#"
                onClick={async () => {
                  await logout();
                  // window.location.href = "/";
                  navigate(`/`);
                }}
              >
                Log out
              </Link>
            </li>
          ) : null}
        </ul>
        <div className="space-y-20">
          <div className="w-full header__search in_mobile">
            <input type="text" placeholder="Search" />
            <button className="header__result">
              <i className="ri-search-line" />
            </button>
          </div>

          {!isAuthenticated ||
          !user ||
          user.attributes.username === undefined ? (
            <button
              className="btn btn-sm btn-grad"
              onClick={async () => {
                navigate("connect-wallet");
              }}
            >
              <i className="ri-wallet-3-line" />
              Connect wallet
            </button>
          ) : (
            <li className="flex-row has_popup2 d-flex align-items-center">
              <div className="d-inline">
                <Avatar
                  alt="avatar"
                  src={
                    user && !user.attributes.avatar
                      ? "/images/avatar.png"
                      : user.attributes.avatar._url
                  }
                  sx={{ width: 50, height: 50 }}
                />
              </div>
              <div className="ml-3 d-inline">
                {`${user.attributes.username.substring(0, 10)}`}
              </div>
            </li>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
