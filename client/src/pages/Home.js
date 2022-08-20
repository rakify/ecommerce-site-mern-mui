import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { Divider, Link, Stack, Typography } from "@mui/material";
import Offers from "../components/Offers";
import FlashSale from "../components/FlashSale";

function Links() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ padding: 5, bgcolor: "#71C9CE", flex:2 }}
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
      <Stack direction="row" justifyContent="center">
        <Newsletter />
        <Links />
      </Stack>
    </>
  );
};

export default Home;
