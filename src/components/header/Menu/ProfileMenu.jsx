import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LeftMenu = [
  {
    icon: "profile",
    title: "Profile",
    link: "/profile",
  },
  {
    icon: "edit",
    title: "Edit Profile",
    link: "/edit-profile",
  },
  {
    icon: "gallery",
    title: "My collections",
    link: "/collections",
  },
];

function ProfileMenu() {
  let navigate = useNavigate();
  return (
    <div>
      <div className="row sub_menu_row">
        <div>
          {LeftMenu.map((val, i) => (
            <li key={i}>
              <Link to={val.link}>{val.title}</Link>
            </li>
          ))}
          <Link
            to="#"
            onClick={async () => {
              // await logout();
              // window.location.href = "/";
              navigate(`/`);
            }}
          >
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileMenu;
