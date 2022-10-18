import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { BsMessenger } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

function Footer() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <footer className="footer__1" style={{ marginTop: "auto" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 space-y-20">
              <div className="footer__logo">
                <img src="/images/fire.gif" alt="" />
              </div>
              <p className="footer__text">
                General knowledge is something that helps us to grow both on a
                personal as well as academic level
              </p>
            </div>
            <div className="col-lg-2 col-6">
              <ul className="footer__list">
                <li>
                  <Link to="#"> About Us </Link>
                </li>
                <li>
                  <Link to="#"> Events</Link>
                </li>
                <li>
                  <Link to="#"> Blogs </Link>
                </li>
                <li>
                  <Link to="#"> Gallery </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-6">
              <ul className="footer__list">
                <li>
                  <Link to="#"> Contact Us </Link>
                </li>
                <li>
                  <Link to="#"> Terms of use </Link>
                </li>
                <li>
                  <Link to="#"> Privacy policy </Link>
                </li>
                <li>
                  <Link to="#"> Refund policy </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-6">
              <h6 className="footer__title">Connect with us</h6>
              <ul className="footer__social space-x-10 mb-40">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <h2>
                      <BsFacebook />
                    </h2>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.messenger.com/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <h2>
                      <BsMessenger />
                    </h2>
                  </a>
                </li>
                <li>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h2>
                      <BsWhatsapp />
                    </h2>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#5A5A5A",
            height: "3.5rem",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <p style={{ color: "#fff" }}>© Copyright 2022 | Amble NFT</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
