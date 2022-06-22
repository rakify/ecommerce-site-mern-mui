import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowBackIos, PhotoCamera } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import app from "../firebase";
import { addUser, getUsers, updateUser } from "../redux/apiCalls";
import {
  Alert,
  Avatar,
  Button,
  Card,
  IconButton,
  Link,
  MenuItem,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function EditUser() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );
  const [inputs, setInputs] = useState({
    username: user.username,
    password: "",
    email: user.email,
    isAdmin: user.isAdmin,
    accountType: user.accountType,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    phoneNumber: user.phoneNumber,
  });

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

  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState("Update");

  // This handle the change in main user profile
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // this handle the changes in user saved address
  const handleChange2 = (e) => {
    setInputs2((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitWithFile = (e) => {
    e.preventDefault();
    setLoading("Updating");
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            setLoading("Upload is Paused");
            break;
          case "running":
            setLoading("Uploading Picture");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
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
            ...inputs,
            shippingInfo,
            billingInfo,
            img: downloadURL,
          };
          updateUser(userId, updatedUser, dispatch).then((res) => {
            if (res.status === 200) {
              setResponse({ result: "success", message: res.data.message });
              setLoading("Update");
            } else if (res.response.data?.code === 11000) {
              setResponse({
                result: "error",
                message: "Username or email already exists",
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
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading("Updating");
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
      ...inputs,
      shippingInfo,
      billingInfo,
    };
    console.log(updatedUser);
    updateUser(userId, updatedUser, dispatch).then((res) => {
      if (res.status === 200) {
        setResponse({ result: "success", message: res.data.message });
        setLoading("Update");
      } else if (res.response.data?.code === 11000) {
        setResponse({
          result: "error",
          message: "Username or email already exists",
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
      <Link href="/users" color="inherit" underline="none">
        <Button variant="contained" startIcon={<ArrowBackIos />}>
          Go Back
        </Button>
      </Link>
      {user ? (
        <>
          <Typography variant="h6">
            Update Info For {user.username}
            {user.accountType == 1 && " (Seller)"}
          </Typography>
          <Card>
            <Box
              component="form"
              onSubmit={file ? handleSubmitWithFile : handleSubmit}
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: "space-between",
                gap: 5,
              }}
              noValidate
            >
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ flex: 1 }}
              >
                <img
                  src={user.img}
                  alt=""
                  style={{ borderRadious: 1, height: 300, width: 300 }}
                />
                <Typography variant="body1" color="secondary">
                  {user.username}
                </Typography>
              </Stack>
              <Stack direction="column" sx={{ flex: 3 }}>
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  sx={{
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                  }}
                >
                  <Stack direction="column">
                    <Typography variant="h6" color="primary">
                      Account Details
                    </Typography>
                    <TextField
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      required
                      value={inputs.username}
                      label="Username"
                      name="username"
                      autoFocus
                      variant="standard"
                    />
                    <TextField
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      type="password"
                      id="password"
                      value={inputs.password}
                      label="Password"
                      name="password"
                      variant="standard"
                    />

                    <TextField
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      required
                      name="email"
                      label="Email"
                      id="email"
                      type="email"
                      value={inputs.email}
                      variant="standard"
                    />

                    <TextField
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      name="firstName"
                      label="First Name"
                      id="firstName"
                      value={inputs.firstName || ""}
                      variant="standard"
                    />

                    <TextField
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      name="lastName"
                      label="Last Name"
                      id="lastName"
                      value={inputs.lastName || ""}
                      variant="standard"
                    />

                    <TextField
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      name="phoneNumber"
                      label="Phone Number"
                      id="phoneNumber"
                      value={inputs.phoneNumber || ""}
                      variant="standard"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />

                    <TextField
                      select
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      fullWidth
                      name="gender"
                      label="Gender"
                      id="gender"
                      value={inputs.gender || "male"}
                      variant="standard"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </TextField>
                    <TextField
                      select
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      fullWidth
                      name="isAdmin"
                      label="Priority"
                      id="isAdmin"
                      value={inputs.isAdmin || "false"}
                      variant="standard"
                    >
                      <MenuItem value="false">User</MenuItem>
                      <MenuItem value="true">Admin</MenuItem>
                    </TextField>

                    <TextField
                      select
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      fullWidth
                      name="accountType"
                      label="Account Type"
                      id="accountType"
                      value={inputs.accountType || "0"}
                      variant="standard"
                    >
                      <MenuItem value="0">Buyer</MenuItem>
                      <MenuItem value="1">Seller</MenuItem>
                    </TextField>

                    {file && (
                      <Avatar
                        src={file && URL.createObjectURL(file)}
                        alt=""
                        style={{
                          width: 260,
                          height: 220,
                          marginTop: 20,
                          marginLeft: "10vw",
                        }}
                      />
                    )}

                    <label htmlFor="file">
                      <input
                        accept=".png, .jpg, .jpeg"
                        id="file"
                        name="file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera /> Upload Picture
                      </IconButton>
                    </label>
                  </Stack>

                  {/* Shipping */}
                  {(user.isAdmin === "false" || !user.isAdmin) && (
                    <>
                      <Stack direction="column">
                        <Typography variant="h6" color="primary">
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
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                        <Typography variant="h6" color="primary">
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
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                    </>
                  )}
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
          </Card>
        </>
      ) : (
        <Typography>No user found with the {userId}</Typography>
      )}

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
