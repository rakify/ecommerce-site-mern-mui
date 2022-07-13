import { Category, FeedSharp } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Offers from "../components/Offers";
import Products from "../components/Products";
import Ads from "../components/Ads";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <>
      <Offers />
      <Navigation />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
