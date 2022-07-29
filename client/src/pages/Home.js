import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import FrontMenu from "../components/FrontMenu";
import Products from "../components/Products";
import { Container, Divider, Link, Stack, Typography } from "@mui/material";
import FlashSell from "../components/FlashSale";

const Home = () => {
  return (
    <>
      <FrontMenu />
      <FlashSell />

      <Typography variant="h5" sx={{ ml: 5, mt: 2 }}>
        JUST FOR YOU
      </Typography>
      <Divider variant="middle" />
      <Products />
      <Newsletter />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: 5, bgcolor: "#71C9CE" }}
      >
        <Stack>
          <Typography variant="h5" align="center">
            About Us
          </Typography>
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
          <Typography variant="h5" align="center">
            Customer Care
          </Typography>
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
          <Typography variant="h5" align="center">
            Follow
          </Typography>
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
    </>
  );
};

export default Home;
