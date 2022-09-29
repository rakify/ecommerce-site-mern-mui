import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";

function LinksAndNewsletter() {
  const user = useSelector((state) => state.user.currentUser) || "";
  return (
    <Stack
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{
        bgcolor: "#2E2E54",
        color: "white",
        padding: 1,
        flex: 3,
        flexDirection: { sm: "column", md: "row" },
      }}
    >
      <Stack flex={1}>
        <Stack>
          <Typography variant="h5">About Us</Typography>
          <Link variant="body2" href="/#about1" underline="hover">
            Read our blog
          </Link>
          <Link variant="body2" href="/#about3" underline="hover">
            FAQ
          </Link>
          <Link variant="body2" href="/#about4" underline="hover">
            Join us!
          </Link>
        </Stack>
        <Stack>
          <Typography variant="h5">Earn With Bettermart</Typography>
          <Link variant="body2" href="/#about1" underline="hover">
            Sell on Daraz
          </Link>
          <Link variant="body2" href="/#about1" underline="hover">
            Code of Conduct
          </Link>
          <Link variant="body2" href="/#about1" underline="hover">
            Join the Daraz Affiliate Program
          </Link>
        </Stack>
      </Stack>
      <Stack flex={1}>
        <Stack>
          <Typography variant="h5">Customer Care</Typography>
          <Link variant="body2" href="/#help1" underline="hover">
            Return policy
          </Link>
          <Link variant="body2" href="/#help2" underline="hover">
            Privacy Policy
          </Link>
          <Link variant="body2" href="/#help3" underline="hover">
            Terms and conditions
          </Link>
          <Link variant="body2" href="/#help4" underline="hover">
            Submit complaint
          </Link>
        </Stack>
        <Stack>
          <Typography variant="h5">Follow</Typography>
          <Link variant="body2" href="/#help1" underline="hover">
            Instagram
          </Link>
          <Link variant="body2" href="/#help1" underline="hover">
            Facebook
          </Link>
          <Link variant="body2" href="/#help1" underline="hover">
            Newsletter
          </Link>
        </Stack>
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        {user === "" && (
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            Sign Up For 20% Off Your First Order
          </Typography>
        )}
        <Typography
          sx={{
            fontWeight: 300,
            mb: "20px",
            textAlign: { md: "center" },
          }}
        >
          Hear Updates (Get updates for offers, promo codes directly in your
          inbox.)
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <input
            placeholder="Your email"
            style={{
              backgroudColor: "lightblue",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "center",
              height: 40,
              outline: "none",
            }}
          />
          <Button variant="contained" sx={{ width: 100, ml: 1, height: 30 }}>
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ textAlign: "center" }}
    >
      {"Copyright © "}
      <Link
        variant="body2"
        color="inherit"
        href="/"
        underline="hover"
        sx={{ fontSize: "large" }}
      >
        Bettermart
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
      }}
    >
      <LinksAndNewsletter />
      <Container maxWidth="xl" sx={{ pb: { sm: 20, md: 0 } }}>
        <Copyright />
      </Container>
    </Box>
  );
}
