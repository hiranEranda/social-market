import React from "react";

import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoadingButton from "@mui/lab/LoadingButton";

export default function FormDialog(props) {
  const { open, message, title, loading } = props;

  //console.log(props);
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <div className="d-flex row">
            <LoadingButton
              className="mb-2"
              color="success"
              loading={loading}
              loadingPosition="start"
              startIcon={<CheckCircleIcon />}
              variant="contained"
            >
              {message}
            </LoadingButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
