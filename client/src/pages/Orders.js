import styled from "@emotion/styled";
import {
  Avatar,
  Card,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../redux/apiCalls";

const Img = styled("img")({
  display: "block",
  marginRight: 10,
  height: 150,
  width: 100,
});

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders(user._id).then((res) => setOrders(res));
  }, []);

  return (
    <>
      <Typography variant="h4">My Orders</Typography>
      <Container>
        {orders.map((order) => (
          <Paper key={order._id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ borderTop: "1px solid grey" }}
            >
              <Stack direction="column">
                <Typography variant="h6">Order #{order._id}</Typography>
                <Typography>Products</Typography>
                {order.products.map((product) => (
                  <Stack direction="row" key={product._id} alignItems="center">
                    <Avatar
                      src={
                        product.img ||
                        "https://t4.ftcdn.net/jpg/00/89/55/15/240_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg"
                      }
                      sx={{
                        height: 100,
                        width: 100,
                        borderRadius: 0,
                        transition: "transform .5s",
                        "&:hover": { transform: "scale(1.2)" },
                        margin: 5,
                      }}
                    />
                    <Stack direction="column">
                      <Typography>{product.name}</Typography>
                      <Typography>
                        ৳ {product.price} * {product.quantity}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
              <Stack direction="column">
                <Typography>Status: {order.orderStatus}</Typography>
                <Typography>Placed on: {order.updatedAt}</Typography>
                <Typography>Total Amount: {order.totalAmount}</Typography>
                <Typography>
                  Delivery Time Slot: {order.deliveryTimeSlot || "Not Selected"}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Container>
    </>
  );
};

export default Orders;
