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
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import { useState } from "react";
import { addOrder, updateUser } from "../../redux/apiCalls";
import { Box } from "@mui/system";

const steps = [
  {
    label: "Add shipping & billing info",
  },
  {
    label: "Confirm products you are about to order",
  },
  {
    label: "Place order",
  },
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  // save billing and shipping info to the user object for re-use purpose
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
    updateUser(user._id, updatedUser, dispatch).then((res) => {
      if (res.status === 200) {
        setSaveSuccess(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else setSaveSuccess(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      user,
      shippingInfo: user.shippingInfo,
      billingInfo: user.billingInfo,
      products: cart.products,
      totalAmount: cart.total,
      deliveryTimeSlot: inputs.deliveryTimeSlot,
      paymentMethod: "Cash on delivery",
    };
    addOrder(order).then((res) => {
      if (res.status === 200) {
        setSubmitSuccess(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else setSubmitSuccess(false);
    });
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
    width: "100%",
    bgcolor: "#4bd67b",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Typography variant="h6">Checkout</Typography>
      {cart.products.length === 0 && (
        <Typography variant="h5">
          Theres noting to checkout in your cart!
        </Typography>
      )}
      {cart.products.length > 0 && (
        <Stepper
        nonLinear 
          activeStep={activeStep}
          alternativeLabel
          sx={{width:"90vw"}}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {index === 0 && (
                  <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    sx={{ flexDirection: { xs: "column", sm: "row" } }}
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
                  </Stack>
                )}
                {index === 1 && (
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    sx={{
                      overflow: "auto",
                      maxWidth: "100%",
                      maxHeight: "50vh",
                    }}
                  >
                    {cart.products.map((product) => (
                      <Stack
                        key={product._id}
                        direction="row"
                        alignItems="center"
                      >
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
                )}
                {index === 2 && (
                  <Stack
                    direction="column"
                    justifyContent="space-evenly"
                  >
                    {/* Delivery Time Slot */}
                    <Box component="form" sx={{ mt: 1 }}>
                      <Typography variant="h6">
                        Prefered Delivery Timing
                      </Typography>

                      <FormControl required>
                        <FormLabel id="demo-controlled-radio-buttons-group">
                          Select a date when you want us to deliver your
                          products
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          aria-required
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
                    <Stack>
                      <Typography variant="h6">Order Summary</Typography>
                      <Typography>Subtotal: ৳ {cart.total}</Typography>

                      <Typography>Estimated Shipping: ৳ 50</Typography>

                      <Typography>Shipping Discount: ৳ -50</Typography>
                      <Typography>Total: ৳ {cart.total}</Typography>
                    </Stack>
                    <Stack>
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
                        Inside Dhaka delivery will take 24 hours only. Outside
                        Dhaka will take 7 days atmost.
                      </Typography>
                    </Stack>
                  </Stack>
                )}

                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={
                        index === 0
                          ? handleSave
                          : index === 2
                          ? handleSubmit
                          : handleNext
                      }
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1
                        ? "Place Order"
                        : index === 0
                        ? "Save & Continue"
                        : index === 1
                        ? "Confirm"
                        : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      )}
      {activeStep === steps.length && (
        <Typography sx={{ mt: 2, mb: 1 }}>Thanks for your order.</Typography>
      )}

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
            variant="h4"
            component="h2"
            sx={{ color: "black", fontWeight: "bolder" }}
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
    </>
  );
};

export default Checkout;
