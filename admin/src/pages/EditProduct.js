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
import { getProduct, updateProduct } from "../redux/apiCalls";
import {
  Alert,
  Avatar,
  Button,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  Input,
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

export default function EditProduct() {
  const dispatch = useDispatch();
  const { productId } = useParams();

  // get product info from redux
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const [inputs, setInputs] = useState({
    title: product.title,
    desc: product.desc,
    price: product.price,
    inStock: product.inStock,
    unit: product.unit,
  });
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(product.cat);
  const [response, setResponse] = useState(false);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState("Update");

  // set tags everytime title changes
  useEffect(() => {
    setTags(
      inputs.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .split(" ")
    );
  }, [inputs.title]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleCat = (e) => {
    setCat(e.target.value.toLowerCase().split(","));
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
          const slug = inputs.title.toLowerCase().split(" ").join("-");
          const tags = inputs.title
            .toLowerCase()
            .replace(/[^a-zA-Z ]/g, "")
            .split(" ");
          const updatedProduct = {
            ...product,
            ...inputs,
            img: downloadURL,
            cat: cat,
            tags: tags,
            slug: slug,
          };
          updateProduct(productId, updatedProduct, dispatch).then((res) => {
            if (res.status === 200) {
              setResponse({ result: "success", message: res.data.message });
              setLoading("Update");
            } else if (res.response.data?.code === 11000) {
              setResponse({
                result: "error",
                message: "A similar product with the title already exists",
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
    const slug = inputs.title.toLowerCase().split(" ").join("-");
    const tags = inputs.title
      .toLowerCase()
      .replace(/[^a-zA-Z ]/g, "")
      .split(" ");
    const updatedProduct = {
      ...product,
      ...inputs,
      cat: cat,
      tags: tags,
      slug: slug,
    };
    updateProduct(productId, updatedProduct, dispatch).then((res) => {
      if (res.status === 200) {
        setResponse({ result: "success", message: res.data.message });
        setLoading("Update");
      } else if (res.response.data?.code === 11000) {
        setResponse({
          result: "error",
          message: "A similar product with the title already exists",
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
      <Link href="/products" color="inherit" underline="none">
        <Button variant="contained" startIcon={<ArrowBackIos />}>
          Go Back
        </Button>
      </Link>
      {product ? (
        <>
          <Typography variant="h6">Update Info For {product.title}</Typography>
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
                  src={product.img}
                  alt=""
                  style={{ borderRadious: 1, height: 300, width: 300 }}
                />
                <Typography variant="body1" color="secondary">
                  {product.title}
                </Typography>
              </Stack>
              <Stack direction="column" sx={{ flex: 3 }}>
                <TextField
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  value={inputs.title || ""}
                  autoFocus
                  variant="standard"
                  inputProps={{ style: { textTransform: "capitalize" } }}
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

                <Stack direction="row" sx={{ gap: 2 }}>
                  <TextField
                    sx={{ flex: 3 }}
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    required
                    name="price"
                    label="Price"
                    id="price"
                    type="number"
                    error={inputs.price < 1}
                    helperText={inputs.price < 1 && "Minimun price is 1"}
                    value={inputs.price || ""}
                    variant="standard"
                  />
                  <TextField
                    sx={{ flex: 1 }}
                    select
                    onChange={(e) => handleChange(e)}
                    margin="normal"
                    required
                    name="unit"
                    label="Unit"
                    id="unit"
                    value={inputs.unit || "Kg"}
                    error={!inputs.unit}
                    helperText={!inputs.unit && "Please select unit"}
                    variant="standard"
                  >
                    <MenuItem value="Kg">Kg</MenuItem>
                    <MenuItem value="Liter">Liter</MenuItem>
                    <MenuItem value="Piece">Piece</MenuItem>
                    <MenuItem value="Dozen">Dozen</MenuItem>
                    <MenuItem value="Pair">Pair</MenuItem>
                    <MenuItem value="Box">Box</MenuItem>
                  </TextField>
                </Stack>

                <TextField
                  required
                  onChange={(e) => handleCat(e)}
                  margin="normal"
                  fullWidth
                  name="cat"
                  label="Categories"
                  id="cat"
                  value={cat || ""}
                  variant="standard"
                  placeholder="tshirt, dress,male-clothing"
                  helperText="Add categories separated by comma"
                />

                <TextField
                  select
                  onChange={(e) => handleChange(e)}
                  margin="normal"
                  fullWidth
                  required
                  name="inStock"
                  label="Stock"
                  id="inStock"
                  value={inputs.inStock || "true"}
                  variant="standard"
                >
                  <MenuItem value="true">Available</MenuItem>
                  <MenuItem value="false">Unavailable</MenuItem>
                </TextField>

                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  label="Tags"
                  value={tags}
                  autoFocus
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
