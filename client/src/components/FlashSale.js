import { useEffect, useState } from "react";
import {
  Box,
  ButtonBase,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Product from "./ProductComponent";
import { useSelector } from "react-redux";
import FSProduct from "./FSProduct";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 170,
  display: "flex",
}));
const FlashSell = ({ cat, limit }) => {
  const products = useSelector((state) => state.product.products);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="button">New Arrivals</Typography>
          <Item>
            {products.slice(0, 3).map((item) => (
              <FSProduct item={item} key={item._id} />
            ))}
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="button">Top rankings</Typography>
          <Item>
            {products.slice(7, 10).map((item) => (
              <FSProduct item={item} key={item._id} />
            ))}
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="button">
            Personal Protective Equipment
          </Typography>
          <Item>
            {products.slice(3, 6).map((item) => (
              <FSProduct item={item} key={item._id} />
            ))}
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="button">Free Shipping</Typography>
          <Item>
            {products.slice(11, 14).map((item) => (
              <FSProduct item={item} key={item._id} />
            ))}
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="button">Most Searched</Typography>
          <Item>
            {products.slice(4, 7).map((item) => (
              <FSProduct item={item} key={item._id} />
            ))}
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="button">Weekend wonder</Typography>
          <Item>
            {products.slice(6, 9).map((item) => (
              <FSProduct item={item} key={item._id} />
            ))}
          </Item>
        </Grid>
      </Grid>
    </Box>
    // <Container maxWidth="xl">
    //   <Stack
    //     direction="column"
    //     justifyContent="space-between"
    //     sx={{
    //       gap: { sm: 0, md: 10 },
    //       flexDirection: { sm: "column", md: "row" },
    //     }}
    //   >
    //     <Stack direction="column" sx={{ bgcolor: "whitesmoke", flex: 1 }}>
    //       <Typography variant="button">New arrivals</Typography>
    //       <Stack direction="row">
    //         {products.slice(0, 3).map((item) => (
    //           <FSProduct item={item} key={item.key} />
    //         ))}
    //       </Stack>
    //     </Stack>
    //     <Stack direction="column" sx={{ bgcolor: "whitesmoke", flex: 1 }}>
    //       <Typography variant="button">Top rankings</Typography>
    //       <Stack direction="row">
    //         {products.slice(7, 10).map((item) => (
    //           <FSProduct item={item} key={item.key} />
    //         ))}
    //       </Stack>{" "}
    //     </Stack>
    //     <Stack direction="column" sx={{ bgcolor: "whitesmoke", flex: 1 }}>
    //       <Typography variant="button">
    //         Personal Protective Equipment
    //       </Typography>
    //       <Stack direction="row">
    //         {products.slice(3, 6).map((item) => (
    //           <FSProduct item={item} key={item.key} />
    //         ))}
    //       </Stack>{" "}
    //     </Stack>
    //   </Stack>

    //   <Stack
    //     direction="column"
    //     justifyContent="space-between"
    //     sx={{
    //       gap: { sm: 0, md: 10 },
    //       mt: 5,
    //       flex: 3,
    //       flexDirection: { sm: "column", md: "row" },
    //     }}
    //   >
    //     <Stack direction="column" sx={{ bgcolor: "whitesmoke", flex: 1 }}>
    //       <Typography variant="button">Free shipping</Typography>
    //       <Stack direction="row">
    //         {products.slice(11, 14).map((item) => (
    //           <FSProduct item={item} key={item.key} />
    //         ))}
    //       </Stack>
    //     </Stack>
    //     <Stack direction="column" sx={{ bgcolor: "whitesmoke", flex: 1 }}>
    //       <Typography variant="button">Most searched</Typography>
    //       <Stack direction="row">
    //         {products.slice(0, 3).map((item) => (
    //           <FSProduct item={item} key={item.key} />
    //         ))}
    //       </Stack>{" "}
    //     </Stack>
    //     <Stack direction="column" sx={{ bgcolor: "whitesmoke", flex: 1 }}>
    //       <Typography variant="button">Weekend wonder</Typography>
    //       <Stack direction="row">
    //         {products.slice(5, 8).map((item) => (
    //           <FSProduct item={item} key={item.key} />
    //         ))}
    //       </Stack>{" "}
    //     </Stack>
    //   </Stack>
    // </Container>
  );
};

export default FlashSell;
