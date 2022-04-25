import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import app from "../firebase";
import { updateUser } from "../redux/apiCalls";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

const Img = styled("img")({
  display: "block",
  marginRight: 10,
  height: 250,
  width: 200,
});

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  const [file, setFile] = useState(null);

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
          updateUser(user._id, updatedUser, dispatch);
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
    updateUser(user._id, updatedUser, dispatch);
  };

  return (
    <>
      <Typography variant="h6">Your Profile</Typography>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <Stack direction="column" alignItems="center">
            <Img src={user.img} alt=""></Img>
            <Typography variant="h6">{user.username}</Typography>
          </Stack>
          <Stack direction="column">
            <Typography variant="h6">Edit Profile</Typography>
            <hr />
            <Box
              component="form"
              onSubmit={file ? handleSubmitWithFile : handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(e) => handleChange(e)}
                margin="normal"
                required
                fullWidth
                value={inputs.username}
                id="username"
                label="Username"
                name="username"
                autoFocus
                variant="standard"
              />
              <TextField
                onChange={(e) => handleChange(e)}
                margin="normal"
                required
                fullWidth
                value={inputs.fullName}
                name="fullName"
                label="Full Name"
                id="fullName"
                variant="standard"
              />
              <TextField
                onChange={(e) => handleChange(e)}
                margin="normal"
                required
                fullWidth
                value={inputs.email}
                name="email"
                label="Email"
                id="email"
                variant="standard"
              />

              <TextField
                onChange={(e) => handleChange(e)}
                margin="normal"
                required
                fullWidth
                value={inputs.phoneNumber}
                name="phoneNumber"
                label="Phone Number"
                type="number"
                id="phoneNumber"
                variant="standard"
              />

              {file && (
                <img
                  src={file ? URL.createObjectURL(file) : user.img}
                  alt=""
                  style={{ width: 100, height: 100 }}
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
