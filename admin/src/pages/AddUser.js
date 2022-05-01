import { useState } from "react";
import { ArrowBackIos, ArrowLeft, PhotoCamera } from "@mui/icons-material";
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
  IconButton,
  Input,
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
  const [loading, setLoading] = useState("Add");

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitWithFile = (e) => {
    e.preventDefault();
    setLoading("Adding");
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
            setLoading("Uploading Image");
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
          setLoading("Uploaded");
          const user = {
            ...inputs,
            img: downloadURL,
          };
          addUser(user, dispatch).then((res) => {
            if (res.status === 201) {
              setResponse(res.data);
              setLoading("Add");
            } else if (res.response.data?.code === 11000) {
              setResponse({ message: "Username or email already exists" });
              setLoading("Add");
            } else {
              setResponse(res.response.data);
              setLoading("Add");
            }
          });
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading("Adding");
    const user = {
      ...inputs,
    };
    addUser(user, dispatch).then((res) => {
      if (res.status === 201) {
        setResponse(res.data);
        setLoading("Add");
      } else if (res.response.data?.code === 11000) {
        setResponse({ message: "Username or email already exists" });
        setLoading("Add");
      } else {
        setResponse(res.response.data);
        setLoading("Add");
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
            name="firstName"
            label="First Name"
            id="firstName"
            variant="standard"
          />

          <TextField
            onChange={(e) => handleChange(e)}
            margin="normal"
            fullWidth
            name="lastName"
            label="Last Name"
            id="lastName"
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
          <Button
            type="submit"
            disabled={loading !== "Add"}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading}
          </Button>
        </Box>
      </Container>
    </>
  );
}
