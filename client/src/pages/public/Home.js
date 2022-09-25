import Newsletter from "../../components/Newsletter";
import Products from "../../components/Products";
import { Divider, Link, Stack, Typography } from "@mui/material";
import Offers from "../../components/Offers";
import FlashSale from "../../components/FlashSale";
import Footer from "../../components/Footer";

function Links() {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ padding: 2, flex: 2 }}
    >
      <Stack>
        <Stack>
          <Typography variant="h5">
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
          <Typography variant="h5">
            Earn With Bettermart
          </Typography>
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
      <Stack>
        <Stack>
          <Typography variant="h5">
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
          <Typography variant="h5">
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
    </Stack>
  );
}

const Home = () => {
  return (
    <>
      <Offers />
      <FlashSale />

      <Typography variant="h5" sx={{ mt: 2 }}>
        JUST FOR YOU
      </Typography>
      <Divider variant="middle" />
      <Products />
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ bgcolor: "#2E2E54", color: "white", padding: 0 }}
      >
        <Newsletter />
        <Links />
      </Stack>

      <Footer />
    </>
  );
};

export default Home;
