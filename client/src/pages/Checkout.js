import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Stack,
  Typography,
  Link,
  TextField,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useState } from "react";
import { addOrder, updateUser } from "../redux/apiCalls";
import { Box } from "@mui/system";

const Checkout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const [inputs, setInputs] = useState({
    //Shipping Info
    sFullName: user.shippingInfo.fullName,
    sGender: user.shippingInfo.gender,
    sPhoneNumber: user.shippingInfo.phoneNumber,
    sDivision: user.shippingInfo.division,
    sDistrict: user.shippingInfo.district,
    sUpazila: user.shippingInfo.upazila,
    sStreet: user.shippingInfo.street,
    //Billing Info
    bFullName: user.billingInfo.fullName,
    bGender: user.billingInfo.gender,
    bPhoneNumber: user.billingInfo.phoneNumber,
    bDivision: user.billingInfo.division,
    bDistrict: user.billingInfo.district,
    bUpazila: user.billingInfo.upazila,
    bStreet: user.billingInfo.street,

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
      fullName: inputs.sFullName,
      phoneNumber: inputs.sPhoneNumber,
      gender: inputs.sGender,
      division: inputs.sDivision,
      district: inputs.sDistrict,
      upazila: inputs.sUpazila,
      street: inputs.sStreet,
    };
    const billingInfo = {
      fullName: inputs.bFullName,
      phoneNumber: inputs.bPhoneNumber,
      gender: inputs.bGender,
      division: inputs.bDivision,
      district: inputs.bDistrict,
      upazila: inputs.bUpazila,
      street: inputs.bStreet,
    };
    const updatedUser = {
      ...user,
      shippingInfo,
      billingInfo,
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
      paymentMethod: "Cash on delivery",
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
        open={Boolean(saveSuccess)}
        autoHideDuration={5000}
        onClose={() => setSaveSuccess()}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setSaveSuccess()}
        >
          Shipping & Billing Information Saved Successfully!
        </Alert>
      </Snackbar>

      {/* Modal Open For Successful Order Placement Message */}
      <Modal open={Boolean(submitSuccess)} onClose={() => setSubmitSuccess()}>
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
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Button variant="outlined">
              <Link href="/" underline="none" color="inherit">
                Forgot Something to Add?
              </Link>
            </Button>
            <Button
              variant="outlined"
              onClick={handleSubmit}
              disabled={submitSuccess}
            >
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
              <Box
                component="form"
                onSubmit={handleSave}
                noValidate
                sx={{ mt: 1 }}
              >
                {/* Shipping */}

                <Stack direction="column">
                  <Typography variant="h6" color="primary">
                    Shipping Info
                  </Typography>
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="Full Name"
                    id="sfullName"
                    name="sFullName"
                    value={inputs.sFullName || ""}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="Phone Number"
                    id="sPhoneNumber"
                    name="sPhoneNumber"
                    value={inputs.sPhoneNumber || ""}
                    variant="standard"
                  />
                  <TextField
                    select
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    fullWidth
                    label="Gender"
                    id="sGender"
                    name="sGender"
                    value={inputs.sGender || "male"}
                    variant="standard"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="Division"
                    id="sDivision"
                    name="sDivision"
                    value={inputs.sDivision || ""}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="District"
                    id="sDistrict"
                    name="sDistrict"
                    value={inputs.sDistrict || ""}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="Upazila"
                    id="sUpazila"
                    name="sUpazila"
                    value={inputs.sUpazila || ""}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="Street"
                    id="sStreet"
                    name="sStreet"
                    value={inputs.sStreet || ""}
                    variant="standard"
                  />
                </Stack>

                {/* Billing */}

                <Stack direction="column">
                  <Typography variant="h6" color="primary">
                    Billing Info
                  </Typography>
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="Full Name"
                    id="bFullName"
                    name="bFullName"
                    value={inputs.bFullName || ""}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="Phone Number"
                    id="bPhoneNumber"
                    name="bPhoneNumber"
                    value={inputs.bPhoneNumber || ""}
                    variant="standard"
                  />
                  <TextField
                    select
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    fullWidth
                    label="Gender"
                    id="bGender"
                    name="bGender"
                    value={inputs.bGender || "male"}
                    variant="standard"
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="Division"
                    id="bDivision"
                    name="bDivision"
                    value={inputs.bDivision || ""}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="District"
                    id="bDistrict"
                    name="bDistrict"
                    value={inputs.bDistrict || ""}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="Upazila"
                    id="bUpazila"
                    name="bUpazila"
                    value={inputs.bUpazila || ""}
                    variant="standard"
                  />
                  <TextField
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    label="Street"
                    id="bStreet"
                    name="bStreet"
                    value={inputs.bStreet || ""}
                    variant="standard"
                  />
                </Stack>

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
            <Stack sx={{ flex: 2, alignItems: "center" }}>
              <Typography variant="h6">Your Cart</Typography>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Products</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {cart.products.map((product) => (
                    <Stack key={product._id}>
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
                    </Stack>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Stack>
            {/* Summary */}
            <Stack sx={{ flex: 1 }} alignItems="center">
              <Typography variant="h6">Order Summary</Typography>
              <Typography>Subtotal: ৳ {cart.total}</Typography>

              <Typography>Estimated Shipping: ৳ 50</Typography>

              <Typography>Shipping Discount: ৳ -50</Typography>
              <Typography>Total: ৳ {cart.total}</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Payment Method
              </Typography>
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
