import { FeedSharp, MenuSharp } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";
import { getProducts, getUser } from "../redux/apiCalls";
import { getCartProducts } from "../redux/apiCalls";

const Home = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser?._id);
  const [showCategory, setShowCategory] = useState(false);

  useEffect(() => {
    getProducts(dispatch);
    getCartProducts(id, dispatch);
    getUser(id, dispatch);
  }, [id, dispatch]);

  return (
    <>
      <Box>
        <Stack direction="row" justifyContent="space-between">
          {showCategory && <Sidebar />}
          <Box flex={7} p={2}>
            <MenuSharp onClick={() => setShowCategory(!showCategory)} />
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <FeedSharp sx={{ paddingRight: 1, color: "green" }} />
              Latest Products
            </Typography>

            <Products />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Home;
