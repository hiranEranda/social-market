import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoadingButton from "@mui/lab/LoadingButton";

export default function FormDialog(props) {
  const { open, loading1, loading2, isRemoved } = props;

  ////console.log(props);
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Adding Item To Market</DialogTitle>
        {!isRemoved ? (
          <DialogContent>
            <div className="d-flex row">
              <LoadingButton
                className="mb-2"
                color="success"
                loading={loading1}
                loadingPosition="start"
                startIcon={<CheckCircleIcon />}
                variant="contained"
              >
                Approve item for sale
              </LoadingButton>{" "}
              <LoadingButton
                className="mb-2"
                color="success"
                loading={loading2}
                loadingPosition="start"
                startIcon={<CheckCircleIcon />}
                variant="contained"
              >
                Adding Item to marketplace
              </LoadingButton>
            </div>
          </DialogContent>
        ) : (
          <DialogContent>
            <div className="d-flex row">
              <LoadingButton
                className="mb-2"
                color="success"
                loading={loading2}
                loadingPosition="start"
                startIcon={<CheckCircleIcon />}
                variant="contained"
              >
                Adding Item to marketplace
              </LoadingButton>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
