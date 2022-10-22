import {
  Avatar,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSellerDetails, getSellerProducts } from "../../redux/apiCalls";
import Product from "../../components/ProductComponent";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/apiCalls";
import Products from "../../components/Products";

const Shop = ({ cartOpen, open }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const shopName = location.pathname.split("/")[2];
  const [seller, setSeller] = useState();

  useEffect(() => {
    getSellerDetails(shopName).then((res) => setSeller(res));
  }, [shopName]);
  const handleFollow = () => {
    let followedStores = [...user.followedStores];
    //check if seller id exists
    let itemIndex = followedStores.findIndex((s) => s === seller._id);
    if (itemIndex > -1) {
      //seller id exists in the followedStores, remove it
      followedStores.splice(itemIndex, 1);
    } else {
      //seller id does not exists in followedStores, add new
      followedStores.push(seller._id);
    }
    const updatedUser = {
      ...user,
      followedStores: followedStores,
    };

    updateUser(user._id, updatedUser, dispatch);
  };

  return (
    <Container
      maxWidth="xl"
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
            background:
              "rgba(0, 0, 0, 0.5)" /* Black background with 0.5 opacity */,
            color: "#f1f1f1" /* Grey text */,
            width: "100%",
          }}
        >
          {seller?.username}
        </Typography>
      </Box>
      {user && (
        <Button variant="outlined" startIcon={<Add />} onClick={handleFollow}>
          {user?.followedStores.includes(seller?._id)
            ? "Unfollow Shop"
            : "Follow Shop"}
        </Button>
      )}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ bgcolor: "whitesmoke" }}
      >
        <Products cartOpen={cartOpen} open={open} shopName={shopName} />
        {/* <Box flex={7} p={2}>
          <Grid container columns={10} sx={{}}>
            {products &&
              products
                .slice(0, 20)
                .map((item) => <Product item={item} key={item._id} />)}
          </Grid>
        </Box> */}
      </Stack>
    </Container>
  );
};

export default Shop;
