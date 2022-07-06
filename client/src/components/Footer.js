import { Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Footer = () => {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: 5 }}
      >
        <Stack>
          <Typography variant="h5" align="center">
            About Us
          </Typography>
          <Link color="inherit" href="/#about1" underline="hover">
            Read our blog
          </Link>
          <Link color="inherit" href="/#about3" underline="hover">
            FAQ
          </Link>
          <Link color="inherit" href="/#about4" underline="hover">
            Join us!
          </Link>
        </Stack>
        <Stack>
          <Typography variant="h5" align="center">
            Help
          </Typography>
          <Link color="inherit" href="/#help1" underline="hover">
            Return policy
          </Link>
          <Link color="inherit" href="/#help2" underline="hover">
            Privacy Policy
          </Link>
          <Link color="inherit" href="/#help3" underline="hover">
            Terms and conditions
          </Link>
          <Link color="inherit" href="/#help4" underline="hover">
            Submit complaint
          </Link>
        </Stack>
        <Stack>
          <Typography variant="h5" align="center">
            Contact Us
          </Typography>
          <Link color="inherit" href="/#help1" underline="hover">
            Contact Us
          </Link>
        </Stack>
      </Stack>
      <Typography align="center" sx={{ paddingLeft: 10, paddingRight: 10 }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
        aspernatur dignissimos delectus a adipisci fuga autem provident, eum
        excepturi quibusdam dolor laborum et nemo officia natus magni nam neque
        distinctio.
      </Typography>

      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          Better Buys
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
