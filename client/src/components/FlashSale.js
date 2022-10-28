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
const FlashSell = () => {
  const products = useSelector((state) => state.product.products);
  return (
    <Box sx={{ flexGrow: 1, p:2 }}>
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
  );
};

export default FlashSell;
