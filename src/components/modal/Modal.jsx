/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { WarningAmber as WarningIcon } from "@mui/icons-material";
import React from "react";

const ModalCustom = (props) => {
  const {
    open = false,
    onClose,
    onConfirm,
    onCancel,
    title,
    content,
    cancelLabel,
    confirmLabel,
    sx,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
    >
      <ModalTittle title={title} />
      <ModalContent content={content} />
      <ModalActions
        onCancel={onCancel}
        onConfirm={onConfirm}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
      />
    </Dialog>
  );
};

const ModalTittle = (props) => {
  const { title, id } = props;
  return (
    <DialogTitle id={`${id}Delete id`}>
      <WarningIcon sx={{ color: "#FF9800", marginRight: 1 }} />
      {title}
    </DialogTitle>
  );
};

const ModalActions = (props) => {
  const {
    onCancel,
    onConfirm,
    confirmLabel = "yes",
    cancelLabel = "No",
  } = props;
  const hasConfirm = Boolean(confirmLabel);
  const hasCancel = Boolean(cancelLabel);
  return (
    <DialogActions>
      {hasCancel && (
        <Button onClick={onCancel} color="primary">
          {cancelLabel}
        </Button>
      )}

      {hasConfirm && (
        <Button onClick={onConfirm} color="primary" autoFocus>
          {confirmLabel}
        </Button>
      )}
    </DialogActions>
  );
};

const ModalContent = (props) => {
  const { content } = props;
  return (
    <DialogContent>
      <DialogContentText>{content}</DialogContentText>
    </DialogContent>
  );
};

ModalCustom.ModalTittle = ModalTittle;
ModalCustom.ModalActions = ModalActions;
ModalCustom.ModalContent = ModalContent;
export default ModalCustom;
