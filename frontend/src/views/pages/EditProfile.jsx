import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import TextError from "../../components/errors/TextError";

const Moralis = require("moralis-v1");

function EditProfile() {
  ///  image upload //////////////////////////////////////////////////////////////////////
  const [picture, setPicture] = useState(null);
  const [avatarData, setAvatarData] = useState(null);
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setAvatarData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  /// Basic inputs ///////////////////////////////////////////////////////////////////////////////

  const initialValues = {
    name: "",
    email: "",
    twitter: "",
    instagram: "",
    facebook: "",
    customUrl: "",
    introduction: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .typeError("Must be string values")
      .required("Display name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    customUrl: Yup.string().typeError("Must be string values"),
    twitter: Yup.string().typeError("Must be string values"),
    instagram: Yup.string().typeError("Must be string values"),
    facebook: Yup.string().typeError("Must be string values"),
    introduction: Yup.string().max(255).required("introduction is required"),
  });

  /// handle form//////////////////////////////////////////////////////////////////////////////////////////////
  // const [backDrop, setBackDrop] = useState(false);

  /// toast containers
  const update = () => toast.success("Your Profile updated");
  const error = (error) => toast.error(error);

  const handleSubmit = async (values) => {
    if (picture === null || picture.length === 0) {
      error("Please select a DP");
      return;
    } else {
      // setBackDrop(true);
      const user = await Moralis.User.current();

      user.set("email", values.email);
      user.set("username", values.name);
      user.set("twitter", values.twitter);
      user.set("instagram", values.instagram);
      user.set("facebook", values.facebook);
      user.set("bio", values.introduction);
      user.set("customUrl", values.customUrl);
      const avatar = new Moralis.File("photo.jpg", picture);
      user.set("avatar", avatar);

      await user.save();
      update();
      navigate(`/profile`);
    }
  };

  const { isInitialized, isAuthenticated, user } = useMoralis();
  let navigate = useNavigate();

  let [formValues, setFormValues] = React.useState({
    name: "",
    email: "",
    twitter: "",
    instagram: "",
    facebook: "",
    customUrl: "",
    introduction: "",
  });

  React.useEffect(() => {
    setTimeout(async () => {
      const user = await Moralis.User.current();
      console.log(user);
      if (!user) {
        navigate(`/`);
      } else {
        setFormValues({
          name: user.attributes.username,
          email: user.attributes.email,
          twitter: user.attributes.twitter,
          instagram: user.attributes.instagram,
          facebook: user.attributes.facebook,
          customUrl: user.attributes.customUrl,
          introduction: user.attributes.introduction,
        });
        setAvatarData(user.attributes.avatar._url);
      }
    }, 1000);
  }, [isInitialized, navigate, isAuthenticated]);

  return (
    <>
      <Header />

      <div className="flex items-center justify-center w-full">
        <div className="w-full bg-slate-900 h-[200px] flex justify-center items-center text-white text-4xl font-bold">
          Edit Profile
        </div>
      </div>

      <div className="max-w-[1000px] border-1 border-gray-300 rounded-3xl mx-auto p-4 mt-5">
        <h2>User profile</h2>
        <div className="">
          <div className="mt-4 ">
            <p className="text-xl text-black">upload your avatar*</p>

            <div className="flex justify-center py-4 mx-auto mt-4 ">
              <Avatar
                alt="Remy Sharp"
                src={!avatarData ? `/images/upload.png` : avatarData}
                sx={{ width: 200, height: 200 }}
              />
            </div>

            <div className="flex justify-center mx-auto mt-4">
              <div className="flex justify-center">
                <span className="sr-only">Choose profile photo</span>
                <input
                  onChange={onChangePicture}
                  type="file"
                  className="block w-full text-sm bg-yellow-200 rounded-2xl text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                />
              </div>

              {/* <ToastContainer position="bottom-right" /> */}
            </div>
          </div>
          {user !== null && formValues !== null ? (
            <Formik
              initialValues={formValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              <Form>
                <div className="space-y-10">
                  <span className="nameInput">User Name*</span>
                  <Field
                    name="name"
                    type="text"
                    className="mb-4 form-control"
                  />
                  <ErrorMessage name="name" component={TextError} />
                </div>
                <div className="space-y-10">
                  <span className="nameInput d-flex justify-content-between">
                    Twitter Account
                  </span>
                  <div className="confirm">
                    <Field
                      name="twitter"
                      type="text"
                      className="mb-4 form-control"
                      placeholder="Enter your twitter handle"
                    />
                  </div>
                </div>
                <div className="space-y-10">
                  <span className="nameInput d-flex justify-content-between">
                    Instagram Account
                  </span>
                  <div className="confirm">
                    <Field
                      name="instagram"
                      type="text"
                      className="mb-4 form-control"
                      placeholder="Add your ig handle"
                    />
                  </div>
                </div>
                <div className="space-y-10">
                  <span className="nameInput d-flex justify-content-between">
                    Facebook Account
                  </span>
                  <div className="confirm">
                    <Field
                      name="facebook"
                      type="text"
                      className="mb-4 form-control"
                      placeholder="Add your Facebook profile"
                    />
                  </div>
                </div>
                <div className="space-y-10">
                  <span className="nameInput d-flex justify-content-between">
                    Personal website or portfolio
                  </span>
                  <div className="confirm">
                    <Field
                      name="customUrl"
                      type="text"
                      className="mb-4 form-control"
                      placeholder="wwww.yourWebsite.com"
                    />
                  </div>
                </div>
                <div className="space-y-10">
                  <span className="nameInput d-flex justify-content-between">
                    User email*
                  </span>
                  <div className="confirm">
                    <Field
                      name="email"
                      type="text"
                      className="mb-4 form-control"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage name="email" component={TextError} />
                  </div>
                </div>

                <div className="space-y-10">
                  <span className="nameInput">Introduction</span>
                  <Field
                    as="textarea"
                    style={{ minHeight: 110 }}
                    name="introduction"
                    type="text"
                    className="mb-4 rounded-xl form-control"
                    placeholder="Introduction"
                  />
                  <ErrorMessage name="introduction" component={TextError} />
                </div>
                <button className="mt-2 btn btn-grad" type="submit">
                  Update profile
                </button>
              </Form>
            </Formik>
          ) : null}
        </div>
        <ToastContainer position="bottom-right" />
      </div>

      <Footer />
    </>
  );
}

export default EditProfile;
