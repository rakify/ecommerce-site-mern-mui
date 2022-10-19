import Products from "../../components/Products";
import { Divider, Typography } from "@mui/material";
import Offers from "../../components/Offers";
import FlashSale from "../../components/FlashSale";
import Footer from "../../components/Footer";

const Home = ({ cartOpen, open }) => {
  return (
    <>
      <div
        style={{
          background:
            "url(https://chaldn.com/asset/Egg.ChaldalWeb.Fabric/Egg.ChaldalWeb1/1.0.0+Deploy-Release-126/Default/stores/chaldal/components/landingPage2/LandingPage/images/landingBannerTop.png)",
          backgroundSize: "cover",
          height: "325px",
          paddingTop: "100px",
        }}
      >
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold" }}
          variant="h3"
        >
          On-time Delivery Gurantee
        </Typography>
      </div>
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
