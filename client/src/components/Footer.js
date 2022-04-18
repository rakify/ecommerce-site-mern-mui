import { Link, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Better Buys
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
