import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Stack,
  Typography,
  Link,
  TextField,
  Card,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
  Snackbar,
  Alert,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { addOrder, updateUser } from "../redux/apiCalls";
import { Box } from "@mui/system";

const Checkout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const [inputs, setInputs] = useState({
    fullName: 1 && user.shippingInfo.fullName,
    phoneNumber: 1 && user.shippingInfo.phoneNumber,
    division: 1 && user.shippingInfo.division,
    district: 1 && user.shippingInfo.district,
    upazila: 1 && user.shippingInfo.upazila,
    street: 1 && user.shippingInfo.street,
    deliveryTimeSlot: "",
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const shippingInfo = {
      fullName: inputs.fullName,
      phoneNumber: inputs.phoneNumber,
      division: inputs.division,
      district: inputs.district,
      upazila: inputs.upazila,
      street: inputs.street,
    };
    const updatedUser = {
      ...user,
      shippingInfo,
    };
    updateUser(user._id, updatedUser, dispatch).then((res) =>
      res.status === 200 ? setSaveSuccess(true) : setSaveSuccess(false)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      user,
      products: cart.products,
      totalAmount: cart.total,
      deliveryTimeSlot: inputs.deliveryTimeSlot,
    };
    addOrder(order).then((res) =>
      res.status === 200 ? setSubmitSuccess(true) : setSubmitSuccess(false)
    );
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "green",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {/* Shipping Info Save Messages */}
      <Snackbar
        open={saveSuccess}
        autoHideDuration={5000}
        onClose={() => setSaveSuccess()}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setSaveSuccess()}
        >
          Shipping Information Saved Successfully!
        </Alert>
      </Snackbar>

      {/* Modal Open For Successful Order Placement Message */}
      <Modal open={submitSuccess} onClose={() => setSubmitSuccess()}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "cyan" }}
          >
            Order Placed Successfully
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your order has been placed. We will contact with you shortly to
            confirm and process the order. Alternatively you can always check
            the progress of your order from your profile. Thanks for shopping
            with us.
          </Typography>
        </Box>
      </Modal>

      {/* Checkout Topbar*/}
      <Typography variant="h6">Checkout</Typography>
      {cart.products.length === 0 && (
        <Typography variant="h5">
          Theres Noting to Checkout in Your Cart!
        </Typography>
      )}
      {cart.products.length > 0 && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ margin: 2, flexDirection: { xs: "column", sm: "row" } }}
          >
            <Link href="/" underline="none" color="inherit">
              <Button variant="outlined">Forgot Something to Add?</Button>
            </Link>
            <Button variant="outlined" disabled={submitSuccess}>
              {submitSuccess ? "Order Placed" : "PLACE ORDER"}
            </Button>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              margin: { xs: 10, sm: 5 },
            }}
          >
            
            {/* Shipping Address */}
            <Stack sx={{ flex: 1 }}>
              <Typography variant="h6">Shipping Address</Typography>
              <Box
                component="form"
                onSubmit={handleSave}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  required
                  fullWidth
                  value={inputs.fullName}
                  id="fullName"
                  label="Full Name"
                  name="fullName"
                  autoFocus
                  variant="standard"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={inputs.phoneNumber}
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  variant="standard"
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  required
                  fullWidth
                  value={inputs.division}
                  id="division"
                  label="Division"
                  name="division"
                  autoFocus
                  variant="standard"
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  required
                  fullWidth
                  value={inputs.district}
                  id="district"
                  label="District"
                  name="district"
                  autoFocus
                  variant="standard"
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  required
                  fullWidth
                  value={inputs.upazila}
                  id="upazila"
                  label="Upazila"
                  name="upazila"
                  autoFocus
                  variant="standard"
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  required
                  fullWidth
                  value={inputs.street}
                  id="street"
                  label="Street"
                  name="street"
                  autoFocus
                  variant="standard"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              </Box>

              {/* Delivery Time Slot */}
              <Typography variant="h6">Prefered Delivery Timing</Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Select a date when you want us to deliver your products
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    onChange={(e) => handleChange(e)}
                  >
                    <FormControlLabel
                      name="deliveryTimeSlot"
                      id="deliveryTimeSlot"
                      value={today.toDateString()}
                      control={<Radio />}
                      label={today.toDateString()}
                    />
                    <FormControlLabel
                      name="deliveryTimeSlot"
                      id="deliveryTimeSlot"
                      value={tomorrow.toDateString()}
                      control={<Radio />}
                      label={tomorrow.toDateString()}
                    />
                    <FormControlLabel
                      name="deliveryTimeSlot"
                      id="deliveryTimeSlot"
                      value={dayAfterTomorrow.toDateString()}
                      control={<Radio />}
                      label={dayAfterTomorrow.toDateString()}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Stack>
            {/* Cart */}
            <Stack sx={{ flex: 2, alignItems: "center"}}>
              <Typography variant="h6">Your Cart</Typography>
              {cart.products.map((product) => (
                <Stack key={product._id}>
                  <Card sx={{paddingLeft:2}}>
                    <Avatar
                      src={product.img}
                      sx={{
                        height: 200,
                        width: 200,
                        borderRadius: 0,
                        transition: "transform .5s",
                        "&:hover": { transform: "scale(1.2)" },
                        margin: 5,
                      }}
                    />
                    <Typography>Product: {product.title}</Typography>
                    <Typography>Quantity: {product.quantity} </Typography>
                    <Typography>
                      Price: ৳ {product.price * product.quantity}
                    </Typography>
                  </Card>
                </Stack>
              ))}
            </Stack>
            {/* Summary */}
            <Stack sx={{ flex: 1 }} alignItems="center">
              <Typography variant="h6">Order Summary</Typography>
              <Typography>Subtotal: ৳ {cart.total}</Typography>

              <Typography>Estimated Shipping: ৳ 50</Typography>

              <Typography>Shipping Discount: ৳ -50</Typography>
              <Typography>Total: ৳ {cart.total}</Typography>
              <Typography variant="h6" sx={{mt:2}}>Payment Method</Typography>
              <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue="c"
              >
                <FormControlLabel
                  value="c"
                  control={<Radio />}
                  label="Cash On Delivery"
                  labelPlacement="end"
                />
              </RadioGroup>
              <Typography>
                Inside Dhaka delivery will take 24 hours only. Outside Dhaka
                will take 7 days atmost.
              </Typography>
              <Button
                variant="contained"
                sx={{ marginTop: 10 }}
                onClick={handleSubmit}
                disabled={submitSuccess}
              >
                {submitSuccess ? "Order Placed" : "PLACE ORDER"}
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default Checkout;
