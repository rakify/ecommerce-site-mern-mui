import { Inventory } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateOrder } from "../redux/apiCalls";
import Review from "./Review";

const OrderDetails = ({ orderDetails }) => {
  const [order, setOrder] = useState(orderDetails);
  const [activeStep, setActiveStep] = useState(0);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [reviewProduct, setReviewProduct] = useState(null);

  let daysPassed =
    (new Date() - new Date(order.updatedAt)) / (1000 * 3600 * 24);
  const steps = [
    {
      label: "Pending",
      description: `Your order is pending. One of our agent is going to approve your order as soon as possible.`,
    },
    {
      label: "Approved",
      description:
        "Our team has approved your order. Be assured that the seller is preparing your order right away.",
    },
    {
      label: "Reached Our Warehouse",
      description: `Your package has been arrived at our warehouse with tracking number BEX-BDN-${order._id} from where it will be sent to your address soon.`,
    },
    {
      label: "Out for Delivery",
      description: "Your package is currently out for delivery.",
    },
    {
      label: "Delivered",
      description: `Your package has been delivered.`,
    },
  ];

  const handleCancelOrder = () => {
    const newOrder = {
      ...order,
      orderStatus: "cancelled",
      orderComment:
        cancelReason === "" ? "User: change of mind" : `User: ${cancelReason}`,
    };
    updateOrder(order._id, newOrder).then((res) => {
      res.status === 200 && setOrder(res?.data);
    });
    setCancelModalOpen(false);
  };

  useEffect(() => {
    order.orderStatus === "pending"
      ? setActiveStep(0)
      : order.orderStatus === "approved"
      ? setActiveStep(1)
      : order.orderStatus === "shipped"
      ? setActiveStep(2)
      : order.orderStatus === "outForDelivery"
      ? setActiveStep(3)
      : order.orderStatus === "delivered" && setActiveStep(4);
  }, [order.orderStatus]);

  return (
    <>
      <Container maxWidth="xl" sx={{ bgcolor: "#dcdcdc", pb: 10 }}>
        <Typography variant="h6">Order Details</Typography>

        <Container maxWidth="lg" sx={{ bgcolor: "#dcdcdc" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ marginTop: 2, marginBottom: 2, bgcolor: "white", p: 2 }}
          >
            <Stack direction="column">
              <Typography variant="h6">Order #{order._id}</Typography>
              <Typography variant="caption">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                {order.orderStatus === "cancelled" ? (
                  `Cancelled : Reason (${order?.orderComment})`
                ) : order.orderStatus === "pending" ? (
                  <Button
                    variant="text"
                    onClick={() => setCancelModalOpen(true)}
                  >
                    Cancel Order
                  </Button>
                ) : (
                  order.orderStatus !== "delivered" &&
                  order.orderStatus !== "cancelled" && (
                    <Typography>
                      Now that your order is approved. Cancellation is currently
                      not available.
                    </Typography>
                  )
                )}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ alignItems: "flex-end" }}>
              Total: <b>৳{order.totalAmount}</b>
            </Typography>
          </Stack>

          {order.orderStatus !== "cancelled" && (
            <Stepper
              orientation="vertical"
              activeStep={activeStep}
              sx={{ m: 5 }}
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          )}

          {Object.entries(order.products).map(
            ([seller, { products }], index) => {
              return (
                <Paper key={seller} elevation={1} sx={{ mt: 5, mb: 5, p: 2 }}>
                  <Stack
                    direction="row"
                    sx={{
                      bgcolor: "gray",
                      color: "white",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: 2,
                      p: 1,
                      mb: 1,
                    }}
                  >
                    {" "}
                    <Inventory />{" "}
                    <Stack direction="column">
                      <Typography variant="body2">
                        Package {index + 1}
                      </Typography>
                      <Typography variant="caption">
                        Sold by:{" "}
                        <Link
                          to={`/shop/${seller}`}
                          sx={{ textDecoration: "none", color: "white", }}
                        >
                          {seller}
                        </Link>
                      </Typography>
                    </Stack>
                  </Stack>
                  {products.map(
                    ({
                      productId,
                      title,
                      img,
                      quantity,
                      price,
                      seller,
                      marketPrice,
                      hasMerchantReturnPolicy,
                    }) => (
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                          flexDirection: { xs: "column", sm: "row" },
                          bgcolor: "white",
                        }}
                        key={productId}
                      >
                        <Stack direction="row" sx={{ gap: 2, w: "60%" }}>
                          <Avatar
                            src={img}
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 0,
                              mr: 1,
                            }}
                          />
                          <Stack direction="column">
                            <Link
                              to={`/product/${productId}`}
                              sx={{ textDecoration: "none", color: "black" }}
                            >
                              <Typography
                                sx={{
                                  width: 300,
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  fontWeight: 400,
                                }}
                              >
                                {title}
                              </Typography>
                            </Link>
                            <Typography>
                              {hasMerchantReturnPolicy && daysPassed <= 7
                                ? "Return available"
                                : "No warranty available"}
                            </Typography>
                          </Stack>
                        </Stack>

                        <Typography variant="caption" sx={{ w: "20%" }}>
                          ৳{price}
                        </Typography>
                        <Typography variant="caption" sx={{ w: "20%" }}>
                          Qty: {quantity}
                        </Typography>
                        <Stack direction="column" sx={{ w: "20%" }}>
                          {order.orderStatus === "delivered" ? (
                            <Button
                              variant="text"
                              onClick={() =>
                                setReviewProduct({ productId, title, img })
                              }
                            >
                              Give Review
                            </Button>
                          ) : (
                            order.orderStatus.toUpperCase()
                          )}
                        </Stack>
                      </Stack>
                    )
                  )}
                </Paper>
              );
            }
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexDirection: { xs: "column", sm: "row", gap: 2 } }}
          >
            <Stack
              direction="column"
              sx={{ bgcolor: "white", p: 2, width: 300, height: 200 }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Shipping Information
              </Typography>
              <Typography variant="subtitle2">
                Name: {order.shippingInfo.fullName}
              </Typography>
              <Typography variant="subtitle2">
                Phone Number: {order.shippingInfo.phoneNumber}
              </Typography>
              <Typography variant="subtitle2">
                Division: {order.shippingInfo.division}
              </Typography>
              <Typography variant="subtitle2">
                District: {order.shippingInfo.district}
              </Typography>
              <Typography variant="subtitle2">
                Upazila: {order.shippingInfo.upazila}
              </Typography>
              <Typography variant="subtitle2">
                Street: {order.shippingInfo.street}
              </Typography>
            </Stack>

            <Stack
              direction="column"
              sx={{ bgcolor: "white", p: 2, width: 300, height: 200 }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Billing Information
              </Typography>
              <Typography variant="subtitle2">
                Name: {order.billingInfo.fullName}
              </Typography>
              <Typography variant="subtitle2">
                Phone Number: {order.billingInfo.phoneNumber}
              </Typography>
              <Typography variant="subtitle2">
                Division: {order.billingInfo.division}
              </Typography>
              <Typography variant="subtitle2">
                District: {order.billingInfo.district}
              </Typography>
              <Typography variant="subtitle2">
                Upazila: {order.billingInfo.upazila}
              </Typography>
              <Typography variant="subtitle2">
                Street: {order.billingInfo.street}
              </Typography>
            </Stack>

            <Stack
              direction="column"
              sx={{ bgcolor: "white", p: 2, width: 300, height: 200 }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Summary
              </Typography>
              <Typography variant="subtitle2">
                Sub Total: ৳ {order.totalAmount}
              </Typography>
              <Typography variant="subtitle2">
                Delivery Charge: ৳ <s>50</s> free
              </Typography>
              <Typography variant="subtitle2">
                Total: ৳ {order.totalAmount}
              </Typography>
              <Typography variant="subtitle2">
                Payment Method: Cash on delivery
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Container>

      {/* Cancel Order Section */}
      <Dialog open={cancelModalOpen} onClose={() => setCancelModalOpen(false)}>
        <DialogTitle>Are you sure</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to cancel order. Please tell us the reason why you are
            doing so.
          </DialogContentText>
          <TextField
            margin="dense"
            id="cancelReason"
            label="Cancel Reason"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCancelOrder}>Proceed Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Review Section */}
      <Dialog
        open={reviewProduct !== null}
        onClose={() => setReviewProduct(null)}
      >
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <Review
            productId={reviewProduct?.productId}
            img={reviewProduct?.img}
            title={reviewProduct?.title}
            from="order"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewProduct(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default OrderDetails;
