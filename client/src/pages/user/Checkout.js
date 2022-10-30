import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Stack,
  Typography,
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
  Container,
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
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // save billing and shipping info to the user object for re-use purpose
  const handleSave = (e) => {
    e.preventDefault();
    if (
      inputs.sFullName === "" ||
      inputs.sPhoneNumber === "" ||
      inputs.sGender === "" ||
      inputs.sDivision === "" ||
      inputs.sDistrict === "" ||
      inputs.sUpazila === "" ||
      inputs.sStreet === ""
    ) {
      setSaveError(true);
    } else {
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const groupedCart = cart.products.reduce(
      (
        sellers,
        {
          productId,
          title,
          img,
          quantity,
          price,
          seller,
          marketPrice,
          hasMerchantReturnPolicy,
        }
      ) => {
        if (!sellers[seller]) {
          sellers[seller] = {
            products: [],
          };
        }
        sellers[seller].products.push({
          productId,
          title,
          img,
          quantity,
          price,
          seller,
          marketPrice,
          hasMerchantReturnPolicy,
        });
        return sellers;
      },
      {}
    );

    const order = {
      user,
      shippingInfo: user.shippingInfo,
      billingInfo: user.billingInfo,
      products: groupedCart,
      totalAmount: cart.total,
      paymentMethod: "Cash on delivery",
    };
    addOrder(order).then((res) => {
      if (res.status === 200) {
        setSubmitSuccess(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else setSubmitSuccess(false);
    });
  };

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
    <Container maxWidth="xl">
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
          sx={{ width: "90vw" }}
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
                    direction="column"
                    sx={{
                      overflow: "auto",
                      maxWidth: "100%",
                      maxHeight: "70vh",
                    }}
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
                        required
                        error={inputs.sFullName === ""}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Phone Number"
                        id="sPhoneNumber"
                        name="sPhoneNumber"
                        value={inputs.sPhoneNumber || ""}
                        variant="standard"
                        required
                        error={inputs.sPhoneNumber === ""}
                        helperText="Phone number must contain 11 characters"
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
                        required
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
                        required
                        error={inputs.sDivision === ""}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="District"
                        id="sDistrict"
                        name="sDistrict"
                        value={inputs.sDistrict || ""}
                        variant="standard"
                        required
                        error={inputs.sDistrict === ""}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Upazila"
                        id="sUpazila"
                        name="sUpazila"
                        value={inputs.sUpazila || ""}
                        variant="standard"
                        required
                        error={inputs.sUpazila === ""}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Street"
                        id="sStreet"
                        name="sStreet"
                        value={inputs.sStreet || ""}
                        variant="standard"
                        required
                        error={inputs.sStreet === ""}
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
                        error={inputs.bFullName === ""}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Phone Number"
                        id="bPhoneNumber"
                        name="bPhoneNumber"
                        value={inputs.bPhoneNumber || ""}
                        variant="standard"
                        error={inputs.bPhoneNumber === ""}
                        helperText="Phone number must contain 11 characters"
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
                        error={inputs.bDivision === ""}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="District"
                        id="bDistrict"
                        name="bDistrict"
                        value={inputs.bDistrict || ""}
                        variant="standard"
                        error={inputs.bDistrict === ""}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Upazila"
                        id="bUpazila"
                        name="bUpazila"
                        value={inputs.bUpazila || ""}
                        variant="standard"
                        error={inputs.bUpazila === ""}
                      />
                      <TextField
                        onChange={(e) => handleChange(e)}
                        margin="normal"
                        label="Street"
                        id="bStreet"
                        name="bStreet"
                        value={inputs.bStreet || ""}
                        variant="standard"
                        error={inputs.bStreet === ""}
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
                      maxHeight: "70vh",
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
                          <Typography variant="caption">
                            {product.title}
                          </Typography>
                          <Typography variant="caption">
                            Qty: {product.quantity}{" "}
                          </Typography>
                          <Typography variant="caption">
                            ৳ {product.price * product.quantity}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                )}
                {index === 2 && (
                  <Stack direction="column" justifyContent="space-evenly">
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

      {/* Shipping Info Save Success Message */}
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

      {/* Shipping Info Save Error Message */}
      <Snackbar
        open={Boolean(saveError)}
        autoHideDuration={5000}
        onClose={() => setSaveError(false)}
      >
        <Alert
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
          onClose={() => setSaveError(false)}
        >
          Shipping info is required.
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
    </Container>
  );
};

export default Checkout;
