import Products from "../../components/Products";
import { Divider, Typography } from "@mui/material";
import Offers from "../../components/Offers";
import FlashSale from "../../components/FlashSale";
import Footer from "../../components/Footer";

const Home = ({ cartOpen, open }) => {
  return (
    <>
      <Offers />
      <FlashSale />

      <Typography variant="h5" sx={{ mt: 2 }}>
        JUST FOR YOU
      </Typography>
      <Divider variant="middle" />
      <Products cartOpen={cartOpen} open={open} />
      <Footer />
    </>
  );
};

export default Home;
