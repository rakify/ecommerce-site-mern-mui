import { Category, FeedSharp } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <Box>
        <Stack direction="row" justifyContent="space-between">
          <Box flex={7} p={2}>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Category sx={{ paddingRight: 1 }} />
              Categories
            </Typography>
            <Sidebar />

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
