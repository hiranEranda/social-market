import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ToggleButton from "@mui/material/ToggleButton";
import CheckIcon from "@mui/icons-material/Check";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { FaEthereum } from "react-icons/fa";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import TextError from "../../../components/errors/TextError";
import Collection from "./Collection";
import create1155 from "../../../contract/functions/erc1155/create";

import useDocumentTitle from "../../../components/useDocumentTitle";
import { useMoralis } from "react-moralis";

import Modal from "./Modal";
const Moralis = require("moralis-v1");

function Erc1155() {
  let tooltip = "Here type the tooltip message";
  useDocumentTitle("ERC-1155");

  const { isInitialized, isAuthenticated } = useMoralis();
  let navigate = useNavigate();
  React.useEffect(() => {
    setTimeout(async () => {
      const user = await Moralis.User.current();
      if (!user) {
        // window.location.href = `/connect-wallet`;
        navigate(`/connect-wallet`);
      }
    }, 1000);
  }, [isInitialized, isAuthenticated]);

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
    amount: 1,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .typeError("Must be string values")
      .required("Title is required"),
    collection: Yup.string()
      .typeError("Must be string values")
      .required("Collection is required"),
    price: Yup.number().typeError("Must be a number").min(0),

    royalty: Yup.number().typeError("Must be a number").min(0).max(10),

    amount: Yup.number()
      .integer()
      .default(1)
      .min(1)
      .typeError("Must be string values")
      .required("Amount is required"),
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

  const [selected, setSelected] = React.useState(true);
  const [isLazy, setIsLazy] = React.useState(false);
  const [collectionAddress, setCollectionAddress] = React.useState(null);

  const [isCustomToken, setIsCustomToken] = React.useState(false);
  const handleChange = (event) => {
    setIsCustomToken(event.target.value);
  };

  const handleSubmit = async (values) => {
    const user = await Moralis.User.current();
    if (user) {
      if (picture === null || picture.length === 0) {
        createdWarn("Please select picture");
        return;
      }
      if (collectionAddress === null || collectionAddress.length === 0) {
        createdWarn("Please choose a collection");
      } else {
        // setBackDrop(true);
        let status = null;
        setOpen(true);
        status = await create1155(
          values,
          picture,
          collectionAddress,
          selected,
          isLazy,
          setLoading1,
          setLoading2,
          setLoading3,
          setLoading4,
          isCustomToken
        );
        setTimeout(() => {
          setOpen(false);
        }, 1000);
        if (status.state) {
          setBackDrop(false);
          setLoading1(true);
          setLoading2(true);
          setLoading3(true);
          setLoading4(true);
          created(status.message);
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        } else {
          setBackDrop(false);
          setLoading1(true);
          setLoading2(true);
          setLoading3(true);
          setLoading4(true);
          createdError(status.message);
        }
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
          isLazy={isLazy}
        />
        <div className="p-4 border-gray-300 rounded-lg border-1">
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
                    <span className="text-lg text-black nameInput">Title</span>
                    <Field
                      name="title"
                      type="text"
                      className="form-control"
                      placeholder="e. g. `Design art`"
                    />
                    <ErrorMessage name="title" component={TextError} />
                  </div>
                  <div className="mt-3 space-y-10">
                    <span className="text-lg text-black nameInput">
                      Category
                    </span>

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
                    <span className="text-lg text-black nameInput">
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
                  <div className="mt-3">
                    <span className="text-lg text-black nameInput">Amount</span>
                    <Field
                      name="amount"
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                    />
                    <ErrorMessage name="amount" component={TextError} />
                  </div>
                  <div className="mt-3">
                    <span className="text-lg text-black nameInput">
                      Royalty
                    </span>
                    <Field
                      name="royalty"
                      type="number"
                      className="form-control"
                      placeholder="Royalty"
                    />
                    <ErrorMessage name="royalty" component={TextError} />
                  </div>
                  <Collection
                    value={{ flag: true }}
                    setCollectionAddress={setCollectionAddress}
                  />
                  {/*---------------------------------------------------------------------------------------------------------------*/}
                  <div className="flex mt-2 mb-3">
                    <div className="mt-3 d-flex align-items-center">
                      <div className="mr-5">
                        <span className="mr-3 text-lg text-black">
                          Free minting
                        </span>
                        <p className="mr-3 text-sm">
                          Buyer will pay gas fees for minting
                        </p>
                      </div>

                      <ToggleButton
                        value="check"
                        selected={isLazy}
                        onChange={() => {
                          setIsLazy(!isLazy);
                        }}
                        style={
                          isLazy
                            ? { color: "black", backgroundColor: "#90EE90" }
                            : { color: "black" }
                        }
                      >
                        <CheckIcon />
                      </ToggleButton>
                    </div>
                    {/* {!isLazy ? (
                        <div className="mt-3 ml-3 d-flex align-items-center">
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
                      ) : null} */}
                  </div>
                  {/*---------------------------------------------------------------------------------------------------------------*/}

                  <div className="space-y-10">
                    <div>
                      <div className="mt-3 col">
                        <span className="text-lg text-black nameInput">
                          Price
                        </span>
                        <Tooltip title={tooltip}>
                          <i className="float-right ri-information-line d-flex"></i>
                        </Tooltip>
                        <div className="d-flex align-items-center">
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl
                              sx={{ m: 1, minWidth: 120 }}
                              size="small"
                            >
                              {/* <InputLabel id="demo-simple-select-label">
                              Token
                            </InputLabel> */}
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={isCustomToken}
                                // label="Age"
                                onChange={handleChange}
                              >
                                <MenuItem value={true}>
                                  <div className="flex items-center justify-center">
                                    <img
                                      className="w-[30px] mr-2"
                                      src="/images/smkt.jpeg"
                                      alt=""
                                    />
                                    <span>SMKT</span>
                                  </div>
                                </MenuItem>

                                <MenuItem value={false}>
                                  <div className="flex items-center justify-center">
                                    <FaEthereum size={25} />
                                    <span>ETH</span>
                                  </div>
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Box>

                          <Field
                            name="price"
                            type="number"
                            className="ml-4 form-control"
                            placeholder="Price "
                          />
                        </div>
                        <ErrorMessage name="price" component={TextError} />
                      </div>
                    </div>
                  </div>
                  <button className="mt-3 btn btn-grad" type="submit">
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

export default Erc1155;
