import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowBackIos, ArrowLeft } from "@mui/icons-material";
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
  Avatar,
  Button,
  Card,
  Container,
  FormControl,
  FormLabel,
  Link,
  MenuItem,
  Select,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

const Img = styled("img")({
  display: "block",
  marginRight: 10,
  height: 250,
  width: 200,
});
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
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    phoneNumber: user.phoneNumber,
    // //Shipping Info
    // sFullName: user.shippingInfo.fullName,
    // sGender: user.shippingInfo.Gender,
    // sPhoneNumber: user.shippingInfo.PhoneNumber,
    // sDivision: user.shippingInfo.Division,
    // sDistrict: user.shippingInfo.District,
    // sUpazila: user.shippingInfo.Upazila,
    // sStreet: user.shippingInfo.Street,
    // sGender: user.shippingInfo.Gender,
    // //Billing Info
    // bFullName: user.billingInfo.fullName,
    // bGender: user.billingInfo.Gender,
    // bPhoneNumber: user.billingInfo.PhoneNumber,
    // bDivision: user.billingInfo.Division,
    // bDistrict: user.billingInfo.District,
    // bUpazila: user.billingInfo.Upazila,
    // bStreet: user.billingInfo.Street,
    // bGender: user.billingInfo.Gender,
  });

  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitWithFile = (e) => {
    e.preventDefault();
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
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
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
          const updatedUser = {
            ...user,
            ...inputs,
            img: downloadURL,
          };
          updateUser(userId, updatedUser, dispatch).then((res) => {
            res.status === 200
              ? setResponse(res.data)
              : res.response.data?.code === 11000
              ? setResponse({ message: "Username or email already exists" })
              : setResponse(res.response.data);
          });
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      ...inputs,
    };
    updateUser(userId, updatedUser, dispatch).then((res) => {
      res.status === 200
        ? setResponse(res.data)
        : res.response.data?.code === 11000
        ? setResponse({ message: "Username or email already exists" })
        : setResponse(res.response.data);
    });
  };

  return (
    <>
      <Link href="/" color="inherit" underline="none">
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

      {user ? (
        <>
          <Typography variant="h6">Update Info For {user.username}</Typography>
          <Card>
            <Box
              component="form"
              onSubmit={file ? handleSubmitWithFile : handleSubmit}
              noValidate
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
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
              <Stack direction="column"
                  sx={{ flex: 5 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Stack direction="column">
                    <Typography variant="h6" color="primary">
                      Account Details
                    </Typography>
                    <TextField
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      required
                      id="username"
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
                      required
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
                      name="firstName"
                      label="First Name"
                      id="firstName"
                      value={inputs.firstName || ""}
                      variant="standard"
                    />

                    <TextField
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      required
                      name="lastName"
                      label="Last Name"
                      id="lastName"
                      value={inputs.lastName || ""}
                      variant="standard"
                    />

                    <TextField
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      label="Email"
                      id="email"
                      value={inputs.email}
                      variant="standard"
                    />

                    <TextField
                      onChange={(e) => handleChange(e)}
                      margin="normal"
                      required
                      fullWidth
                      name="phoneNumber"
                      label="Phone Number"
                      type="number"
                      id="phoneNumber"
                      value={inputs.phoneNumber || ""}
                      variant="standard"
                    />

                    <FormControl fullWidth>
                      <FormLabel id="gender">Gender</FormLabel>
                      <Select
                        labelId="gender"
                        name="gender"
                        value={inputs.gender || "male"}
                        onChange={(e) => handleChange(e)}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel id="isAdmin">Account Type</FormLabel>
                      <Select
                        labelId="isAdmin"
                        name="isAdmin"
                        value="false"
                        onChange={(e) => handleChange(e)}
                      >
                        <MenuItem value="true">Admin</MenuItem>
                        <MenuItem value="false">User</MenuItem>
                      </Select>
                    </FormControl>

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
                    <TextField
                      onChange={(e) => setFile(e.target.files[0])}
                      margin="normal"
                      required
                      fullWidth
                      name="file"
                      label="Upload Image"
                      type="file"
                      id="file"
                      variant="standard"
                    />
                  </Stack>
                  <Stack direction="column">
                    <Typography variant="h6" color="primary">
                      Shipping Info
                    </Typography>
                  </Stack>
                  <Stack direction="column">
                    <Typography variant="h6" color="primary">
                      Billing Info
                    </Typography>
                  </Stack>
                </Stack>
                <Stack>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Card>
        </>
      ) : (
        <Typography>No user found with the {userId}</Typography>
      )}
    </>
  );
}
