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
import { addProduct, addUser } from "../redux/apiCalls";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormLabel,
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

const Img = styled("img")({
  display: "block",
  marginRight: 10,
  height: 250,
  width: 200,
});
function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function AddProduct() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: "",
  });
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [response, setResponse] = useState(false);
  const [tags, setTags] = useState([]);

  // set tags everytime title changes
  useEffect(() => {
    setTags(
      inputs.title
        .toLowerCase()
        .replace(/[^a-zA-Z ]/g, "")
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
          const slug = inputs.title.toLowerCase().split(" ").join("-");
          const updatedProduct = {
            ...inputs,
            img: downloadURL,
            cat: cat,
            tags: tags,
            slug: slug,
          };
          addProduct(updatedProduct, dispatch).then((res) => {
            res.status === 201
              ? setResponse(res.data)
              : res.response.data?.code === 11000
              ? setResponse({
                  message: "A similar product with the title already exists",
                })
              : setResponse(res.response.data);
          });
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = inputs.title.toLowerCase().split(" ").join("-");
    const updatedProduct = {
      ...inputs,
      cat: cat,
      tags: tags,
      slug: slug,
    };
    addProduct(updatedProduct, dispatch).then((res) => {
      res.status === 201
        ? setResponse(res.data)
        : res.response.data?.code === 11000
        ? setResponse({
            message: "A similar product with the title already exists",
          })
        : setResponse(res.response.data);
    });
  };

  return (
    <>
      <Link href="/products" color="inherit" underline="none">
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

      <Typography variant="h6">Add New Product</Typography>
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
            id="title"
            label="Title"
            name="title"
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
            variant="standard"
          />
          <Stack direction="row" sx={{gap:2}}>
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
              value={inputs.unit || "kg"}
              variant="standard"
            >
              <MenuItem value="kg">Kg</MenuItem>
              <MenuItem value="Liter">Liter</MenuItem>
              <MenuItem value="piece">Piece</MenuItem>
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

          <FormControl fullWidth sx={{ mt: 3 }}>
            <FormLabel filled id="file">
              Product Image
            </FormLabel>
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </FormControl>

          <TextField
            margin="normal"
            disabled
            fullWidth
            label="Tags"
            value={tags}
            autoFocus
            variant="standard"
          />

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
