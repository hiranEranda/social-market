import React from "react";
import { useMoralis, useChain } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MegaMenu from "./MegaMenu";
import ProfileMenu from "./ProfileMenu";
import Avatar from "@mui/material/Avatar";

import { Link } from "react-router-dom";
const Menu = [
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
  {
    title: "Profile",
    link: "/Profile",
  },
  {
    title: "Edit Profile",
    link: "/edit-profile",
  },
  {
    title: "My collections",
    link: "/collections",
  },
];
function MobileMenu() {
  const {
    authenticate,
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    user,
    logout,
  } = useMoralis();
  const { switchNetwork, chainId } = useChain();

  const authenticateAsync = async () => {
    try {
      await authenticate({
        signingMessage: "Log in using Moralis",
      })
        .then(function (user) {
          // //console.log("logged in user:", user);
          // //console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          // //console.log(error);
        });
    } catch (e) {
      // //console.log(e);
    }
    // if (chainId === "0x1") {
    //   try {
    //     await authenticate();
    //   } catch (e) {
    //     // //console.log(e);
    //   }
    // } else {
    //   try {
    //     switchNetwork("0x1");
    //     await authenticate();
    //   } catch (error) {
    //     // //console.log(error);
    //   }
    // }
  };

  let navigate = useNavigate();

  return (
    <div>
      <div className="space-y-40 header__mobile__menu">
        <ul className="space-y-20 d-flex">
          {Menu.map((val, i) => (
            <li key={i}>
              <Link to={val.link} className="color_black">
                {val.title}
              </Link>
            </li>
          ))}
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
              onClick={() => navigate("/connect-wallet")}
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
                {`${user.attributes.username.substring(0, 10)}...`}
              </div>
            </li>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;

// function MobileMenu() {
//   return (
//     <div>
//       <div className="space-y-40 header__mobile__menu">
//         <ul className="space-y-20 d-flex">
//           {Menu.map((val, i) => (
//             <li key={i}>
//               <Link to={val.link} className="color_black">
//                 {val.title}
//               </Link>
//             </li>
//           ))}
//         </ul>
//         <div className="space-y-20">
//           <div className="w-full header__search in_mobile">
//             <input type="text" placeholder="Search" />
//             <button className="header__result">
//               <i className="ri-search-line" />
//             </button>
//           </div>
//           <Link className="btn btn-grad btn-sm" to="connect-wallet">
//             Connect wallet
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MobileMenu;
