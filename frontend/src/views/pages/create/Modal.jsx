import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { ToastContainer, toast } from "react-toastify";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoadingButton from "@mui/lab/LoadingButton";

export default function FormDialog(props) {
  const { open, loading1, loading2, loading3, loading4, selected, isLazy } =
    props;

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Complete Your Listing</DialogTitle>

        <DialogContent>
          <div className="d-flex row">
            {selected && !isLazy ? (
              <>
                {" "}
                <LoadingButton
                  className="mb-2"
                  color="success"
                  loading={loading1}
                  loadingPosition="start"
                  startIcon={<CheckCircleIcon />}
                  variant="contained"
                >
                  Saving NFT to IPFS
                </LoadingButton>
                <LoadingButton
                  className="mb-2"
                  color="success"
                  loading={loading2}
                  loadingPosition="start"
                  startIcon={<CheckCircleIcon />}
                  variant="contained"
                >
                  Minting NFT
                </LoadingButton>
                <LoadingButton
                  className="mb-2"
                  color="success"
                  loading={loading3}
                  loadingPosition="start"
                  startIcon={<CheckCircleIcon />}
                  variant="contained"
                >
                  Approve item for sale
                </LoadingButton>
                <LoadingButton
                  className="mb-2"
                  color="success"
                  loading={loading4}
                  loadingPosition="start"
                  startIcon={<CheckCircleIcon />}
                  variant="contained"
                >
                  Adding Item to marketplace
                </LoadingButton>{" "}
              </>
            ) : !selected && !isLazy ? (
              <>
                <LoadingButton
                  className="mb-2"
                  color="success"
                  loading={loading1}
                  loadingPosition="start"
                  startIcon={<CheckCircleIcon />}
                  variant="contained"
                >
                  Saving NFT to IPFS
                </LoadingButton>
                <LoadingButton
                  className="mb-2"
                  color="success"
                  loading={loading2}
                  loadingPosition="start"
                  startIcon={<CheckCircleIcon />}
                  variant="contained"
                >
                  Minting NFT
                </LoadingButton>
                <LoadingButton
                  className="mb-2"
                  color="success"
                  loading={loading3}
                  loadingPosition="start"
                  startIcon={<CheckCircleIcon />}
                  variant="contained"
                >
                  Approve item for sale
                </LoadingButton>
              </>
            ) : isLazy ? (
              <>
                <LoadingButton
                  className="mb-2"
                  color="success"
                  loading={loading1}
                  loadingPosition="start"
                  startIcon={<CheckCircleIcon />}
                  variant="contained"
                >
                  Saving NFT to IPFS
                </LoadingButton>
                <LoadingButton
                  className="mb-2"
                  color="success"
                  loading={loading2}
                  loadingPosition="start"
                  startIcon={<CheckCircleIcon />}
                  variant="contained"
                >
                  Adding to marketplace
                </LoadingButton>
              </>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
