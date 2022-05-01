import { useEffect, useState } from "react";
import { ArrowBackIos } from "@mui/icons-material";
import Moment from "react-moment";
import {
  getOrder,
  getProduct,
  updateOrder,
  updateProduct,
} from "../redux/apiCalls";
import {
  Avatar,
  Button,
  Container,
  Link,
  Slide,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function EditOrder() {
  const [order, setOrder] = useState(false);
  const { orderId } = useParams();

  // get order info from api
  useEffect(() => {
    getOrder(orderId).then((res) => {
      setOrder(res.data);
    });
  }, [orderId]);

  const [response, setResponse] = useState(false);

  const handleSubmit = () => {
    let orderStatus;
    if (order.orderStatus === "pending") orderStatus = "approved";
    else if (order.orderStatus === "approved") orderStatus = "completed";
    else if (order.orderStatus === "completed") orderStatus = "pending";

    console.log(orderStatus);
    const updatedOrder = {
      ...order,
      orderStatus,
    };
    console.log(updatedOrder.orderStatus);
    updateOrder(orderId, updatedOrder).then((res) => {
      if (res.status === 200) {
        getOrder(orderId).then((res) => {
          setOrder(res.data);
        });
        setResponse({ message: "Order Status Updated." });
      }
    });
  };

  return (
    <>
      <Link href="/orders" color="inherit" underline="none">
        <Button variant="contained" startIcon={<ArrowBackIos />}>
          Go Back
        </Button>
      </Link>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={Boolean(response)}
        TransitionComponent={SlideTransition}
        autoHideDuration={3000}
        onClose={() => setResponse(false)}
        message={response.message || "Updated Successfully"}
      />
      {order ? (
        <>
          <Typography variant="h6">Order Info for ID #{order._id}</Typography>
          <Container>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="column" sx={{ mt: 3 }}>
                <Typography>
                  Placed At: <Moment>{order.createdAt}</Moment>
                </Typography>
                <Typography>
                  Customer:{" "}
                  <Link href={`/user/${order.user._id}`}>
                    {order.user.username}
                  </Link>
                </Typography>
                <Typography>
                  Phone Number:
                  <Link href={`tel:${order.user.phoneNumber}`}>
                    {order.user.phoneNumber}
                  </Link>
                </Typography>
                <Typography>
                  Email:
                  <Link href={`mailto:${order.user.email}`}>
                    {order.user.email}
                  </Link>
                </Typography>
              </Stack>
              <Stack direction="column">
                <Typography>
                  Ship To:{" "}
                  {order.user.shippingInfo.district &&
                  order.user.shippingInfo.division
                    ? order.user.shippingInfo.district +
                      ", " +
                      order.user.shippingInfo.division
                    : ""}
                </Typography>
                <Typography>
                  Payment Method: {order.paymentMethod || "Cash on delivery"}
                </Typography>
                <Typography>
                  Delivery Slot: {order.deliveryTimeSlot || "Not seleceted"}
                </Typography>
                <Typography>
                  Order Status: {order.orderStatus}{" "}
                  <Button onClick={(e) => handleSubmit(e)} variant="text">
                    Mark as{" "}
                    {order.orderStatus === "pending"
                      ? "approved"
                      : order.orderStatus === "approved"
                      ? "completed"
                      : order.orderStatus === "completed"
                      ? "pending again"
                      : ""}
                  </Button>
                </Typography>
              </Stack>
            </Stack>

            {/* //Products */}
            <Typography
              sx={{ textAlign: "center", textDecoration: "underline" }}
            >
              Products
            </Typography>
            <Stack
              direction="column"
              justifyContent="space-between"
              sx={{
                overflow: "auto",
                maxWidth: "100%",
                maxHeight: "50vh",
              }}
            >
              {order.products.map((product) => (
                <Stack key={product._id} direction="row" alignItems="center">
                  <Avatar
                    src={product.img}
                    sx={{
                      height: 100,
                      width: 80,
                      borderRadius: 0,
                      transition: "transform .5s",
                      "&:hover": { transform: "scale(1.2)" },
                      margin: 5,
                    }}
                  />
                  <Stack>
                    <Typography>Product: {product.title}</Typography>
                    <Typography>Quantity: {product.quantity} </Typography>
                    <Typography>
                      Price: ৳ {product.price * product.quantity}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>

            {/* Shipping n Billing */}
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="column">
                <Typography variant="h6" sx={{ textDecoration: "underline" }}>
                  Shipping Info
                </Typography>
                <Typography sx={{ mt: 3 }}>
                  Full Name: {order.shippingInfo.fullName}
                </Typography>
                <Typography>Gender: {order.shippingInfo?.gender}</Typography>
                <Typography>
                  Phone Number:{" "}
                  <Link href={`tel:${order.shippingInfo.phoneNumber}`}>
                    {order.shippingInfo.phoneNumber}
                  </Link>
                </Typography>
                <Typography>
                  Address: {order.shippingInfo.street + ", "}{" "}
                  {order.shippingInfo.upazila + ", "}{" "}
                  {order.shippingInfo.district + ", "}{" "}
                  {order.shippingInfo.division}
                </Typography>
              </Stack>
              <Stack direction="column">
                <Typography variant="h6" sx={{ textDecoration: "underline" }}>
                  Billing Info
                </Typography>
                <Typography sx={{ mt: 3 }}>
                  Full Name: {order.billingInfo.fullName}
                </Typography>
                <Typography>Gender: {order.billingInfo?.gender}</Typography>
                <Typography>
                  Phone Number:{" "}
                  <Link href={`tel:${order.billingInfo.phoneNumber}`}>
                    {order.billingInfo.phoneNumber}
                  </Link>
                </Typography>
                <Typography>
                  Address: {order.billingInfo.street + ", "}{" "}
                  {order.billingInfo.upazila + ", "}{" "}
                  {order.billingInfo.district + ", "}{" "}
                  {order.billingInfo.division}
                </Typography>
                <Typography></Typography>
              </Stack>
            </Stack>
          </Container>
        </>
      ) : (
        <Typography>Does not exist</Typography>
      )}
    </>
  );
}
