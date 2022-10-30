import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import app from "../firebase";
import { sendNotification, updateUser } from "../redux/apiCalls";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { Box } from "@mui/system";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function EditAddressBook() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const [inputs2, setInputs2] = useState({
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
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState("Update");

  // this handles the changes in user saved address
  const handleChange2 = (e) => {
    setInputs2((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const shippingInfo = {
      fullName: inputs2.sFullName,
      phoneNumber: inputs2.sPhoneNumber,
      gender: inputs2.sGender,
      division: inputs2.sDivision,
      district: inputs2.sDistrict,
      upazila: inputs2.sUpazila,
      street: inputs2.sStreet,
    };
    const billingInfo = {
      fullName: inputs2.bFullName,
      phoneNumber: inputs2.bPhoneNumber,
      gender: inputs2.bGender,
      division: inputs2.bDivision,
      district: inputs2.bDistrict,
      upazila: inputs2.bUpazila,
      street: inputs2.bStreet,
    };

    const updatedUser = {
      ...user,
      shippingInfo,
      billingInfo,
    };
    updateUser(user._id, updatedUser, dispatch).then((res) => {
      if (res.status === 200) {
        setResponse({ result: "success", message: res.data.message });
        setLoading("Update");
      } else if (res.response.data?.code === 11000) {
        setResponse({
          result: "error",
          message: "Something Went Wrong!",
        });
        setLoading("Update");
      } else {
        setResponse({
          result: "error",
          message: res.response.data.message,
        });
        setLoading("Update");
      }
    });
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "space-between",
        }}
        noValidate
      >
        <Stack
          direction="column"
          justifyContent="space-around"
          sx={{ flex: 3 }}
        >
          <Stack
            direction="row"
            justifyContent="space-around"
            sx={{
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            {/* Shipping */}

            <Stack direction="column">
              <Typography variant="body2" color="primary">
                Shipping Info
              </Typography>
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="Full Name"
                id="sfullName"
                name="sFullName"
                value={inputs2.sFullName || ""}
                variant="standard"
              />
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="Phone Number"
                id="sPhoneNumber"
                name="sPhoneNumber"
                value={inputs2.sPhoneNumber || ""}
                variant="standard"
              />
              <TextField
                select
                onChange={(e) => handleChange2(e)}
                margin="normal"
                fullWidth
                label="Gender"
                id="sGender"
                name="sGender"
                value={inputs2.sGender || "male"}
                variant="standard"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="Division"
                id="sDivision"
                name="sDivision"
                value={inputs2.sDivision || ""}
                variant="standard"
              />
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="District"
                id="sDistrict"
                name="sDistrict"
                value={inputs2.sDistrict || ""}
                variant="standard"
              />
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="Upazila"
                id="sUpazila"
                name="sUpazila"
                value={inputs2.sUpazila || ""}
                variant="standard"
              />
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="Street"
                id="sStreet"
                name="sStreet"
                value={inputs2.sStreet || ""}
                variant="standard"
              />
            </Stack>

            {/* Billing */}

            <Stack direction="column">
              <Typography variant="body2" color="primary">
                Billing Info
              </Typography>
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="Full Name"
                id="bFullName"
                name="bFullName"
                value={inputs2.bFullName || ""}
                variant="standard"
              />
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="Phone Number"
                id="bPhoneNumber"
                name="bPhoneNumber"
                value={inputs2.bPhoneNumber || ""}
                variant="standard"
              />
              <TextField
                select
                onChange={(e) => handleChange2(e)}
                margin="normal"
                fullWidth
                label="Gender"
                id="bGender"
                name="bGender"
                value={inputs2.bGender || "male"}
                variant="standard"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="Division"
                id="bDivision"
                name="bDivision"
                value={inputs2.bDivision || ""}
                variant="standard"
              />
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="District"
                id="bDistrict"
                name="bDistrict"
                value={inputs2.bDistrict || ""}
                variant="standard"
              />
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="Upazila"
                id="bUpazila"
                name="bUpazila"
                value={inputs2.bUpazila || ""}
                variant="standard"
              />
              <TextField
                onChange={(e) => handleChange2(e)}
                margin="normal"
                label="Street"
                id="bStreet"
                name="bStreet"
                value={inputs2.bStreet || ""}
                variant="standard"
              />
            </Stack>
          </Stack>
          <Stack>
            <Button
              type="submit"
              disabled={loading !== "Update"}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading}
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Display error or success message */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={Boolean(response)}
        TransitionComponent={SlideTransition}
        autoHideDuration={4000}
        onClose={() => setResponse(false)}
      >
        <Alert
          onClose={() => setResponse(false)}
          severity={response.result}
          sx={{ width: "100%" }}
        >
          {response.message || "Updated Successfully"}
        </Alert>
      </Snackbar>
    </>
  );
}
