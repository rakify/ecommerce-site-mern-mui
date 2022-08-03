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
import {
  getCat,
  getProduct,
  updateCat,
  updateProduct,
} from "../redux/apiCalls";
import {
  Alert,
  Avatar,
  Button,
  Container,
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
import { useParams } from "react-router-dom";

const Img = styled("img")({
  display: "block",
  marginRight: 10,
  height: 250,
  width: 200,
});
function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function EditCat() {
  const [category, setCategory] = useState(false);
  const { categoryId } = useParams();

  // get order info from api
  useEffect(() => {
    getCat(categoryId).then((res) => {
      setCategory(res.data);
      setInputs(res.data);
    });
  }, [categoryId]);

  const [inputs, setInputs] = useState({
    label: category.label,
    desc: category.desc,
    img: category.img,
    value: category.value,
  });

  console.log(category, inputs);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState("Update");

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            setLoading("Upload is paused");
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
          const updatedCategory = {
            ...category,
            ...inputs,
            img: downloadURL,
          };
          updateCat(categoryId, updatedCategory).then((res) => {
            if (res.status === 200) {
              getCat(categoryId).then((res) => {
                setCategory(res.data);
                setInputs(res.data);
                setResponse({ result: "success", message: res.data.message });
                setLoading("Update");
              });
            } else if (res.response.data?.code === 11000) {
              setResponse({
                result: "error",
                message: "A similar category with the label already exists",
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
    const updatedCategory = {
      ...category,
      ...inputs,
    };
    updateCat(categoryId, updatedCategory).then((res) => {
      if (res.status === 200) {
        getCat(categoryId).then((res) => {
          setCategory(res.data);
          setInputs(res.data);
          setResponse({ result: "success", message: res.data.message });
          setLoading("Update");
        });
      } else if (res.response.data?.code === 11000) {
        setResponse({
          result: "error",
          message: "A similar category with the label already exists",
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
      <Link href="/categories" color="inherit" underline="none">
        <Button variant="contained" startIcon={<ArrowBackIos />}>
          Go Back
        </Button>
      </Link>
      {category ? (
        <>
          <Typography variant="h6">Update Info For {category.label}</Typography>
          <Container>
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
                  src={
                    category.img
                      ? category.img
                      : "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=740&t=st=1659084544~exp=1659085144~hmac=a3824a2d031223455bf32fd92c96c6bb01cee188ad48fb61c8611e702c8b75bb"
                  }
                  alt=""
                  style={{ borderRadious: 1, height: 300, width: 300 }}
                />
                <Typography variant="body1" color="secondary">
                  {category.title}
                </Typography>
              </Stack>
              <Stack direction="column" sx={{ flex: 3 }}>
                <TextField
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  required
                  fullWidth
                  id="label"
                  label="Label"
                  name="label"
                  value={inputs.label || ""}
                  autoFocus
                  variant="standard"
                  inputProps={{ style: { textTransform: "capitalize" } }}
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  required
                  fullWidth
                  id="value"
                  label="Value (slug)"
                  name="value"
                  value={inputs.value || ""}
                  autoFocus
                  variant="standard"
                />
                <TextField
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  required
                  fullWidth
                  id="desc"
                  label="Description"
                  name="desc"
                  value={inputs.desc || ""}
                  variant="standard"
                />
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
                  disabled={loading !== "Update"}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading}
                </Button>
              </Stack>
            </Box>
          </Container>
        </>
      ) : (
        <Typography>404 Not Found</Typography>
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
