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
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

const theme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  //show a success message when user comes from register page after successful registration
  const [registerSuccess, setRegisterSuccess] = useState(
    location.search.slice(17)
  );
  //fetch api response to display error or success message
  const [response, setResponse] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login(dispatch, { username, password }).then((res) => {
      if (res.response) {
        setResponse(res.response.data);
      } else {
        setResponse(res.data);
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={(e) => setUsername(e.target.value)}
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
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                Forgot password?
                <Link to="" variant="body2" sx={{ ml: 1 }}>
                  Reset Password
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?{" "}
                <Link to="/register" sx={{ ml: 1, textDecoration: "none" }}>
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Display message when user comes from registration page */}
        <Snackbar
          open={Boolean(registerSuccess)}
          autoHideDuration={10000}
          onClose={() => setRegisterSuccess(false)}
        >
          <Alert
            severity="success"
            sx={{ width: "100%" }}
            onClose={() => setRegisterSuccess(false)}
          >
            "Registration is complete. You may login now."
          </Alert>
        </Snackbar>

        {/* Display login success message or error */}
        <Snackbar
          open={Boolean(response)}
          autoHideDuration={4000}
          onClose={() => setResponse(false)}
        >
          <Alert
            onClose={() => setResponse(false)}
            severity={response.result || "error"}
            sx={{ width: "100%" }}
          >
            {response?.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
