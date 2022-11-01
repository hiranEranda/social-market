import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import ToggleButton from "@mui/material/ToggleButton";
import CheckIcon from "@mui/icons-material/Check";
import Tooltip from "@mui/material/Tooltip";
import { FaEthereum } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import TextError from "../../../components/errors/TextError";
import Collection from "./Collection";
import create721 from "../../../contract/functions/erc721/create";

import Modal from "./Modal";
const Moralis = require("moralis-v1");

function Erc721() {
  let tooltip = "Here type the tooltip message";

  /// testing image upload//////////////////////////////////////////////////////////////////////
  const [picture, setPicture] = React.useState(null);
  const [imgData, setImgData] = React.useState(null);
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  /// Basic inputs ///////////////////////////////////////////////////////////////////////////////
  const initialValues = {
    title: "",
    description: "",
    collection: "Art",
    price: 0,
    royalty: 0,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .typeError("Must be string values")
      .required("Title is required"),
    collection: Yup.string()
      .typeError("Must be string values")
      .required("Collection is required"),
    price: Yup.number()
      .typeError("Must be a number")
      .required("Price is required")
      .min(0),
    royalty: Yup.number().typeError("Must be a number").min(0).max(10),
  });

  /// handle form//////////////////////////////////////////////////////////////////////////////////////////////
  const [backDrop, setBackDrop] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading1, setLoading1] = React.useState(true);
  const [loading2, setLoading2] = React.useState(true);
  const [loading3, setLoading3] = React.useState(true);
  const [loading4, setLoading4] = React.useState(true);

  /// toast containers
  const created = (msg) => toast.success(msg);
  const createdError = (msg) => toast.error(msg);
  const createdWarn = (msg) => toast.warn(msg);

  const [selected, setSelected] = React.useState(false);
  const [collectionAddress, setCollectionAddress] = React.useState(null);

  const handleSubmit = async (values) => {
    const user = await Moralis.User.current();
    if (user) {
      let state = null;
      if (picture === null || picture.length === 0) {
        createdWarn("Please select picture");
        return;
      }
      if (collectionAddress === null || collectionAddress.length === 0) {
        createdWarn("Please choose a collection");
      } else {
        // setBackDrop(true);

        setOpen(true);
        state = await create721(
          values,
          picture,
          collectionAddress,
          selected,
          setLoading1,
          setLoading2,
          setLoading3,
          setLoading4
        );
        setTimeout(() => {
          setOpen(false);
        }, 1000);
      }
      if (state.state) {
        setBackDrop(false);
        created(state.message);
        setTimeout(() => {
          // navigate("/profile");
        }, 1000);
      } else {
        setBackDrop(false);
        setLoading1(true);
        setLoading2(true);
        setLoading3(true);
        setLoading4(true);
        createdError(state.message);
      }
    } else {
      createdError("Please connect your wallet before proceeding...");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <Modal
          open={open}
          loading1={loading1}
          loading2={loading2}
          loading3={loading3}
          loading4={loading4}
          selected={selected}
        />
        <div className="p-4 border-gray-300 rounded-lg m- border-1">
          <div className="grid gap-2 lg:grid-cols-2">
            <div className="pt-3 pr-3 mr-3 overflow-auto border-r border-black">
              {imgData ? (
                <img
                  className="flex mx-auto rounded-xl max-h-[500px]"
                  src={imgData}
                  alt=""
                />
              ) : (
                <div className="h-[500px] w-[500px] border-1 border-dashed border-gray-400 mx-auto flex justify-center items-center rounded-xl">
                  Upload your artwork
                </div>
              )}

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
            <div className="mt-3 md:pl-4">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="space-y-10">
                    <span className="nameInput">Title</span>
                    <Field
                      name="title"
                      type="text"
                      className="form-control"
                      placeholder="e. g. `vault design art`"
                    />
                    <ErrorMessage name="title" component={TextError} />
                  </div>
                  <div className="mt-3 space-y-10">
                    <span className="nameInput">Category</span>

                    <Field
                      as="select"
                      name="collection"
                      type="text"
                      className="form-control"
                      placeholder="collection name"
                    >
                      <option value="Art">Art</option>
                      <option value="Games">Games</option>
                      <option value="Memes">Memes</option>
                      <option value="Music">Music</option>
                    </Field>
                    <ErrorMessage name="collection" component={TextError} />
                  </div>
                  <div className="mt-3 space-y-10">
                    <span className="nameInput">
                      Description
                      <span className="color_text">(optional) </span>
                    </span>
                    <Field
                      name="description"
                      type="text"
                      className="form-control"
                      placeholder="e. g. `vault design art`"
                    />
                    <ErrorMessage name="description" component={TextError} />
                  </div>

                  <>
                    <div className="mt-3 space-y-10">
                      <span className="nameInput">Royalty</span>
                      <Field
                        name="royalty"
                        type="number"
                        className="form-control"
                        placeholder="Royalty"
                      />
                      <ErrorMessage name="royalty" component={TextError} />
                    </div>
                    <Collection
                      value={{ flag: false }}
                      setCollectionAddress={setCollectionAddress}
                    />

                    <div className="mt-3 d-flex align-items-center">
                      <span className="mr-3">Add Items to marketplace</span>
                      <ToggleButton
                        value="check"
                        selected={selected}
                        onChange={() => {
                          setSelected(!selected);
                        }}
                        style={
                          selected ? { color: "green" } : { color: "black" }
                        }
                      >
                        <CheckIcon />
                      </ToggleButton>
                    </div>
                    {selected ? (
                      <div className="space-y-10">
                        <span className="nameInput">Price</span>
                        <Tooltip title={tooltip}>
                          <i className="float-right ri-information-line d-flex"></i>
                        </Tooltip>
                        <div className="d-flex align-items-center">
                          <FaEthereum size={25} />
                          <span className="mx-2">ETH</span>
                          <Field
                            name="price"
                            type="number"
                            className="form-control"
                            placeholder="Price"
                          />
                        </div>
                        <ErrorMessage name="price" component={TextError} />
                      </div>
                    ) : null}
                  </>
                  <button className="mt-2 btn btn-grad" type="submit">
                    Create NFT
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Erc721;
