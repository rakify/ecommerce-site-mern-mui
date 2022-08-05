import { Avatar, Container, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSellerDetails, getSellerProducts } from "../redux/apiCalls";
import Product from "../components/Product";

const Shop = () => {
  const location = useLocation();
  const shopName = location.pathname.split("/")[2];
  const [products, setProducts] = useState();
  const [seller, setSeller] = useState();

  useEffect(() => {
    getSellerProducts(shopName).then((res) => setProducts(res));
    getSellerDetails(shopName).then((res) => setSeller(res));
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box sx={{ position: "relative", textAlign: "left" }}>
        <Avatar
          src={seller?.img}
          sx={{ borderRadius: 0, width: "100%", height: 200 }}
        />
        <Typography
          variant="h3"
          sx={{
            position: "absolute",
            bottom: 0,
            background: "rgb(0, 0, 0)" /* Fallback color */,
            background:
              "rgba(0, 0, 0, 0.5)" /* Black background with 0.5 opacity */,
            color: "#f1f1f1" /* Grey text */,
            width: "100%",
          }}
        >
          {seller?.username}
        </Typography>
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ bgcolor: "whitesmoke" }}
      >
        <Box flex={7} p={2}>
          <Grid container columns={10} sx={{}}>
            {/* 10 columns thus each with size 2 = 5 items in a column */}
            {products &&
              products
                .slice(0, 20)
                .map((item) => <Product item={item} key={item._id} />)}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default Shop;
