import { Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        color: "white", bgcolor: "#71C9CE"
      }}
    >
      <Typography variant="body2" color="text.secondary" align="right">
        {"Copyright © "}
        <Link
          variant="body2"
          color="inherit"
          href="https://www.linkedin.com/in/rakib-miah/"
          underline="hover"
          sx={{ fontSize: "large" }}
        >
          Bettermart
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;