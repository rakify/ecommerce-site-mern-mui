import { useEffect, useState } from "react";
import {
  Box,
  ButtonBase,
  Container,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Product from "./Product";
import { useSelector } from "react-redux";
import FSProduct from "./FSProduct";

const FlashSell = ({ cat, limit }) => {
  const products = useSelector((state) => state.product.products);
  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ gap: 10, flexDirection: { sm: "column", md: "row" } }}
      >
        <Stack direction="column" sx={{ bgcolor: "whitesmoke" }}>
          <Typography variant="button">New arrivals</Typography>
          <Stack direction="row">
            {products.slice(0, 3).map((item) => (
              <FSProduct item={item} key={item.key} />
            ))}
          </Stack>
        </Stack>
        <Stack direction="column" sx={{ bgcolor: "whitesmoke" }}>
          <Typography variant="button">Top rankings</Typography>
          <Stack direction="row">
            {products.slice(7, 10).map((item) => (
              <FSProduct item={item} key={item.key} />
            ))}
          </Stack>{" "}
        </Stack>
        <Stack direction="column" sx={{ bgcolor: "whitesmoke" }}>
          <Typography variant="button">
            Personal Protective Equipment
          </Typography>
          <Stack direction="row">
            {products.slice(3, 6).map((item) => (
              <FSProduct item={item} key={item.key} />
            ))}
          </Stack>{" "}
        </Stack>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ gap: 10, mt: 5, flexDirection: { sm: "column", md: "row" } }}
      >
        <Stack direction="column" sx={{ bgcolor: "whitesmoke" }}>
          <Typography variant="button">Free shipping</Typography>
          <Stack direction="row">
            {products.slice(11, 14).map((item) => (
              <FSProduct item={item} key={item.key} />
            ))}
          </Stack>
        </Stack>
        <Stack direction="column" sx={{ bgcolor: "whitesmoke" }}>
          <Typography variant="button">Most searched</Typography>
          <Stack direction="row">
            {products.slice(0, 3).map((item) => (
              <FSProduct item={item} key={item.key} />
            ))}
          </Stack>{" "}
        </Stack>
        <Stack direction="column" sx={{ bgcolor: "whitesmoke" }}>
          <Typography variant="button">Weekend wonder</Typography>
          <Stack direction="row">
            {products.slice(5, 8).map((item) => (
              <FSProduct item={item} key={item.key} />
            ))}
          </Stack>{" "}
        </Stack>
      </Stack>
    </Container>
  );
};

export default FlashSell;
