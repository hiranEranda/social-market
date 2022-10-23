import React from "react";

import Home1 from "../views/homes/Home1";
import SingleItem from "../views/pages/SingleItem";
import Profile from "../views/pages/Profile";

// Route Specific
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const _Routes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home1 />} />
          <Route path="/view-item" element={<SingleItem />} />
          <Route path="/profile" element={<Profile />} />
          {/*<Route path="/upload-type" element={<UploadType />} />
       
          <Route path="/about-us" element={<AboutUs />} />


          <Route path="/contact" element={<Contact />} />
          <Route element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
};
export default _Routes;
