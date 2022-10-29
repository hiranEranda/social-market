import React from "react";
import { Link } from "react-router-dom";

const LeftMenu = [
  {
    icon: "edit",
    title: "Link1",
    link: "#",
  },
];
const RightMenu = [
  {
    icon: "gallery",
    title: "Link2",
    link: "#",
  },
];

function MegaMenu() {
  return (
    <div>
      <div className="row sub_menu_row">
        <div className="col-lg-6 space-y-10">
          {LeftMenu.map((val, i) => (
            <li key={i}>
              <Link to={val.link}>
                <i className={`ri-${val.icon}-line`} />
                {val.title}
              </Link>
            </li>
          ))}
        </div>
        <div className="col-lg-6 space-y-10">
          {RightMenu.map((val, i) => (
            <li key={i}>
              <Link to={val.link}>
                <i className={`ri-${val.icon}-line`} />
                {val.title}
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
