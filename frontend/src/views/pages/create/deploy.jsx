import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { ToastContainer, toast } from "react-toastify";
import DialogTitle from "@mui/material/DialogTitle";
import { MdOutlineAdd } from "react-icons/md";
import TextError from "../../../components/errors/TextError";

// import deploy721 from "../../../contract/functions/erc721/deploy";
// import deploy1155 from "../../../contract/functions/erc1155/deploy";
import Response from "./Response1";

export default function FormDialog(props) {
  let contractAddress = null;
  const deployed = () =>
    toast.success("Your Contract is deployed to: " + contractAddress);

  const [backDrop, setBackDrop] = useState(false);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = React.useState(true);
  const [_open, _setOpen] = React.useState(false);

  let navigate = useNavigate();

  /// testing image upload//////////////////////////////////////////////////////////////////////
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
  /// testing image upload//////////////////////////////////////////////////////////////////////

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPicture(null);
    setAvatarData(null);
  };

  const handleDeploy = async (values, e) => {
    //   // setBackDrop(true);
    //   setOpen(false);
    //   if (picture === null || picture.length === 0) {
    //     setBackDrop(false);
    //     alert("Please select picture");
    //     return false;
    //   } else if (!props.isBatch) {
    //     try {
    //       _setOpen(true);
    //       contractAddress = await deploy721(picture, values);
    //       setBackDrop(false);
    //       setLoading(false);
    //       deployed();
    //       setTimeout(() => {
    //         _setOpen(true);
    //         setLoading(true);
    //         setAvatarData(null);
    //         window.location.reload();
    //       }, 1000);
    //     } catch (error) {
    //       // //console.log(error);
    //       setAvatarData(null);
    //       setBackDrop(false);
    //       _setOpen(false);
    //     }
    //   } else {
    //     try {
    //       // //console.log("deploying 1155");
    //       contractAddress = await deploy1155(picture, values);
    //       _setOpen(true);
    //       setBackDrop(false);
    //       setLoading(false);
    //       deployed();
    //       setTimeout(() => {
    //         _setOpen(true);
    //         setLoading(true);
    //         setAvatarData(null);
    //         window.location.reload();
    //       }, 1000);
    //     } catch (error) {
    //       // //console.log(error);
    //       _setOpen(false);
    //       setAvatarData(null);
    //       setBackDrop(false);
    //     }
    //   }
  };

  const initialValues = {
    name: "",
    symbol: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .typeError("Must be string values")
      .required("Display name is required"),
    symbol: Yup.string()
      .typeError("Must be string values")
      .required("Symbol is required")
      .min(3)
      .max(5),
    description: Yup.string()
      .typeError("Must be string values")
      .required("Description is required"),
  });

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Response
        open={_open}
        loading={loading}
        title={"Deploy contract"}
        message={"Contract is being deployed"}
      />
      {backDrop ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <a
        style={{
          height: 54,
          maxHeight: 54,
          minHeight: 54,
          width: 200,
          minWidth: 200,
        }}
        type="button"
        className="mb-10 mr-0 choose_collection mb-md-0 mr-md-3 is_brand"
        onClick={handleClickOpen}
      >
        <div className="icon">
          <MdOutlineAdd />
        </div>
        New collection
      </a>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <p className="inline mb-2 text-black border-b-2 border-black">
            Collection
          </p>
        </DialogTitle>
        <DialogContent>
          <div className="container pt-20 d-flex align-items-center justify-content-center">
            <Avatar
              alt="Remy Sharp"
              src={!avatarData ? `/images/upload.png` : avatarData}
              sx={{ width: 150, height: 150 }}
            />
          </div>

          <div className="container pt-20 d-flex align-items-center justify-content-center">
            <input
              className="block w-[85%] text-sm bg-yellow-200 rounded-2xl text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
              id="avatarPic"
              type="file"
              onChange={onChangePicture}
            />
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleDeploy}
          >
            <Form>
              <div className="mt-3">Name</div>
              <Field
                name="name"
                type="text"
                className="form-control"
                placeholder="Display Name"
              />
              <ErrorMessage name="name" component={TextError} />
              <div className="mt-3">Symbol</div>
              <Field
                name="symbol"
                type="text"
                className="form-control"
                placeholder="Symbol"
              />
              <ErrorMessage name="symbol" component={TextError} />
              <div className="mt-3"> Description</div>
              <Field
                name="description"
                type="text"
                className="form-control"
                placeholder="Description"
              />
              <ErrorMessage name="description" component={TextError} />
              <button className="mt-3 btn btn-grad" type="submit">
                Deploy
              </button>
              <button
                type="button"
                className="mt-3 ml-2 btn btn-grad"
                onClick={handleClose}
              >
                Cancel
              </button>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
