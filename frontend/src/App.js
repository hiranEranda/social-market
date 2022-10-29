import "./assets/css/plugins/bootstrap.min.css";
import ROUTES from "./Router/routes";
import "./assets/scss/style.scss";
import React from "react";

function App() {
  return (
    <div className="overflow-hidden App ">
      <ROUTES />
    </div>
  );
}

export default App;
