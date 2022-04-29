import { useState } from "react";
import { ArrowBackIos, ArrowLeft } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import app from "../firebase";
import { addUser } from "../redux/apiCalls";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  MenuItem,
  Select,
  Slide,
  Snackbar,
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

export default function AddUser() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
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
          const user = {
            ...inputs,
            img: downloadURL,
          };
          addUser(user, dispatch).then((res) => {
            res.status === 201
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
    const user = {
      ...inputs,
    };
    addUser(user, dispatch).then((res) => {
      res.status === 201
        ? setResponse(res.data)
        : res.response.data?.code === 11000
        ? setResponse({ message: "Username or email already exists" })
        : setResponse(res.response.data);
    });
  };

  return (
    <>
      <Link href="/users" color="inherit" underline="none">
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
        message={response.message}
      />

      <Typography variant="h6">Add New User</Typography>
      <Container>
        <Box
          component="form"
          onSubmit={file ? handleSubmitWithFile : handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            onChange={(e) => handleChange(e)}
            margin="normal"
            required
            fullWidth
            id="username"
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
            fullWidth
            id="password"
            label="Password"
            name="password"
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
            type="email"
            variant="standard"
          />

          <TextField
            onChange={(e) => handleChange(e)}
            margin="normal"
            fullWidth
            name="fullName"
            label="Full Name"
            id="fullName"
            variant="standard"
          />

          <TextField
            onChange={(e) => handleChange(e)}
            margin="normal"
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            type="number"
            id="phoneNumber"
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
            select
            onChange={(e) => handleChange(e)}
            margin="normal"
            fullWidth
            name="isAdmin"
            label="Account Type"
            id="isAdmin"
            value={inputs.isAdmin || "false"}
            variant="standard"
          >
            <MenuItem value="true">Admin</MenuItem>
            <MenuItem value="false">User</MenuItem>
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
          <FormControl fullWidth>
            <FormLabel filled id="file">
              Upload Image
            </FormLabel>
            <input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Container>
    </>
  );
}