/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import { TextField } from "@mui/material";

const TextFieldCustom = React.forwardRef((props, ref) => {
  const {
    id,
    label,
    name = "",
    variant = "standard",
    size = "small",
    margin = "none",
    value,
    onChange = () => {},
    className = "",
    onClick,
    inputRef,
    type = "text",
    validate,
    helperText,
    placeholder,
    error,
    inputProps,
    fullWidth,
    disabled,
    required,
    sx = {},
    ...rest
  } = props;

  const mergeSx = {
    maxWidth: "100%",
    "& .MuiInputBase-input": { fontSize: "11px " },
    "& .MuiInputLabel-root": { fontSize: "11px " },
    ...sx,
  };

  return (
    <TextField
      inputRef={inputRef}
      className={`${className}`}
      id={`${id} standard-basic`}
      label={label}
      required={required}
      name={name}
      variant={variant}
      size={size}
      margin={margin}
      value={value}
      fullWidth
      onClick={onClick}
      onChange={onChange}
      inputProps={inputProps}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      ref={ref}
      {...rest}
      sx={mergeSx}
    />
  );
});

export default TextFieldCustom;
