import { Alert, Input, Snackbar, styled } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import app from "../../firebase";
import { login, register, sendNotification } from "../../redux/apiCalls";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../../components/Footer";
import { Shop, Store } from "@mui/icons-material";

const theme = createTheme();

export default function RegisterSeller() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  //fetch api response to display error or success message
  const [response, setResponse] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      ...inputs,
      accountType: 2,
    };
    register(user).then((res) => {
      if (res.response) setResponse(res.response.data);
      else {
        let notification = {
          from: user,
          messageSubject: 1,
        };
        sendNotification(notification);
        navigate("/login?registerSuccess=1");
      }
    });
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
      (error) => {},
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = {
            ...inputs,
            accountType: 2,
            img: downloadURL,
          };
          register(user).then((res) => {
            if (res.response) setResponse(res.response.data);
            else {
              navigate("/login?registerSuccess=1");
            }
          });
        });
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <Store />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 5 }}>
            Seller Registration
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => (file ? handleSubmitWithFile(e) : handleSubmit(e))}
          >
            <TextField
              variant="standard"
              autoComplete="given-name"
              name="username"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
              onChange={handleChange}
              helperText="* username will be used as your shop name, it can not be changed later."
            />
            <TextField
              variant="standard"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handleChange}
            />
            <TextField
              variant="standard"
              required
              fullWidth
              name="repeat_password"
              label="Repeat Password"
              type="password"
              id="repeat_password"
              autoComplete="password"
              onChange={handleChange}
            />
            <Input
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up as Seller
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" sx={{textDecoration:"none"}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Display register error message */}
        <Snackbar
          open={response}
          autoHideDuration={4000}
          onClose={() => setResponse(false)}
        >
          <Alert
            onClose={() => setResponse(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {response?.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
