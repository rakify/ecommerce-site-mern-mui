import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../redux/apiCalls";

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user._id)
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders(user._id).then((res) => setOrders(res));
  }, [user._id]);

  return (
    <>
      <Typography variant="h6">Your Order History</Typography>
      <Container>
        {orders.length === 0 ? (
          <Typography>You have no orders.</Typography>
        ) : (
          <Typography>
            You have made total {orders.length} order(s) with us. Thanks for staying with us.
          </Typography>
        )}
        {orders.map((order) => (
          <Paper key={order._id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ marginTop: 2 }}
            >
              <Stack direction="column">
                <Typography variant="h6">Order #{order._id}</Typography>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Products</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {order.products.map((product) => (
                      <Stack
                        direction="row"
                        key={product._id}
                        alignItems="center"
                      >
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
                          <Typography>{product.title}</Typography>
                          <Typography>
                            ৳ {product.price} * {product.quantity} ={" "}
                            {product.price * product.quantity}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Stack>
              <Stack direction="column">
                <Typography>
                  Status: {order.orderStatus.toUpperCase()}
                </Typography>
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
