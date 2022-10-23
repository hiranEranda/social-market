import "./assets/css/plugins/bootstrap.min.css";
import _Routes from "./Router/routes";
import "./assets/scss/style.scss";
import React, { useEffect } from "react";

function App() {
  return (
    <div className="overflow-hidden App">
      <_Routes />
    </div>
  );
}

export default App;
