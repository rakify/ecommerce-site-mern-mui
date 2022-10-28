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
  Container,
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

export default function EditProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({
    username: user.username,
    password: "",
    email: user.email,
    accountType: user.accountType,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    currentCity: user.currentCity,
    hometown: user.hometown,
    gender: user.gender,
    phoneNumber: user.phoneNumber,
    secondaryPhoneNumber: user.secondaryPhoneNumber,
  });

  const [response, setResponse] = useState(false);
  const [changeAccountType, setChangeAccountType] = useState(false);
  const [loading, setLoading] = useState("Update");
  const [file, setFile] = useState(null);

  // This handles the change in main user profile
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //  this handle change account type request
  const handleChangeAccountType = () => {
    let notification = {
      from: user,
      messageSubject: inputs.accountType === 0 ? 1 : 0,
    };
    sendNotification(notification).then((res) => {
      const updatedUser = {
        ...user,
        accountType: 2,
      };
      setInputs({
        accountType: 2,
      });
      updateUser(user._id, updatedUser, dispatch).then((res) => {
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
      setChangeAccountType(false);
    });
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
          const updatedUser = {
            ...user,
            ...inputs,
            img: downloadURL,
          };
          updateUser(user._id, updatedUser, dispatch).then((res) => {
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
    const updatedUser = {
      ...user,
      ...inputs,
    };
    updateUser(user._id, updatedUser, dispatch).then((res) => {
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
    <Container>
      <Box
        component="form"
        onSubmit={file ? handleSubmitWithFile : handleSubmit}
        noValidate
      >
        <Stack direction="column" justifyContent="space-around">
          <TextField
            onChange={(e) => handleChange(e)}
            disabled={user.accountType === 1}
            margin="normal"
            required
            value={inputs.username}
            label={user.accountType === 1 ? "Shop Name" : "Username"}
            name="username"
            autoFocus
            variant="standard"
            helperText={
              user.accountType === 1 &&
              "Once you become seller you can not change your username anymore."
            }
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
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />

          <TextField
            onChange={(e) => handleChange(e)}
            margin="normal"
            name="secondaryPhoneNumber"
            label="Secondary Phone Number"
            id="secondaryPhoneNumber"
            value={inputs.secondaryPhoneNumber || ""}
            variant="standard"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />

          <TextField
            onChange={(e) => handleChange(e)}
            margin="normal"
            name="currentCity"
            label="Current City"
            id="currentCity"
            value={inputs.currentCity || ""}
            variant="standard"
          />

          <TextField
            onChange={(e) => handleChange(e)}
            margin="normal"
            name="hometown"
            label="Hometown"
            id="hometown"
            value={inputs.hometown || ""}
            variant="standard"
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
            onChange={(e) => handleChange(e)}
            margin="normal"
            fullWidth
            name="accountType"
            label="Account Type"
            id="accountType"
            value={
              inputs.accountType === 0
                ? "Buyer"
                : inputs.accountType === 1
                ? "Seller"
                : "Waiting for approval"
            }
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            onClick={() => setChangeAccountType(true)}
            disabled={inputs.accountType === 2}
          >
            {inputs.accountType === 0 ? "Become Seller" : "Become Customer"}
          </Button>

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
      </Box>

      {/* display dialog box when user wants to change account type */}
      <Dialog
        open={changeAccountType}
        onClose={() => setChangeAccountType(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to{" "}
          {inputs.accountType === 0
            ? "become seller"
            : "close your shop & become customer"}
          ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you now click "Agree" our team will look into your profile and
            later call you to discuss other matters before accepting your
            request. It is recommended that you update all your your profile
            informations.
            {inputs.accountType !== 1 && (
              <p style={{ color: "red" }}>
                PS: Your username is going to be used as your shop name and this
                can not be changed later.
              </p>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangeAccountType(false)}>Disagree</Button>
          <Button onClick={handleChangeAccountType} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

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
    </Container>
  );
}
