import { useEffect, useState } from "react";
import Select from "react-select";
import { PhotoCamera } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import app from "../firebase";
import { addSellerProduct, getCats } from "../redux/apiCalls";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
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

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function AddProduct() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: "",
    unit: "",
    inStock: "",
    seller: user.username,
    hasMerchantReturnPolicy: false,
  });
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(false);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState("Add");
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

  const [cat, setCat] = useState([]);
  const [catList, setCatList] = useState([]);
  console.log(cat);
  // get categories from api
  useEffect(() => {
    getCats().then((res) => {
      setCatList(res.data);
    });
  }, []);

  const handleSelectedCats = (data) => {
    setCat(data);
  };

  const handleSubmitWithFile = (e) => {
    e.preventDefault();
    setLoading("Ading");
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      (snapshot) => {
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
      (error) => {},
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setLoading("Uploaded");
          const slug = inputs.title.toLowerCase().split(" ").join("-");
          const updatedProduct = {
            ...inputs,
            img: downloadURL,
            cat: cat,
            tags: tags,
            slug: slug,
          };
          addSellerProduct(updatedProduct, dispatch).then((res) => {
            if (res.status === 201) {
              setResponse(res.data);
              setLoading("Add");
            } else if (res.response.data?.code === 11000) {
              setResponse({
                message: "A similar product with the title already exists.",
              });
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
    const slug = inputs.title.toLowerCase().split(" ").join("-");
    const updatedProduct = {
      ...inputs,
      cat: cat,
      tags: tags,
      slug: slug,
    };
    addSellerProduct(updatedProduct, dispatch).then((res) => {
      if (res.status === 201) {
        setResponse({ result: "success", message: res.data.message });
        setLoading("Add");
      } else if (res.response.data?.code === 11000) {
        setResponse({
          result: "error",
          message: "A similar product with the title already exists",
        });
        setLoading("Add");
      } else {
        setResponse({
          result: "error",
          message: res.response.data.message,
        });
        setLoading("Add");
      }
    });
  };

  return (
    <>
      <Typography variant="h6">Add New Product</Typography>
      <Container>
        <Box
          component="form"
          onSubmit={file ? handleSubmitWithFile : handleSubmit}
          sx={{ mt: 1 }}
          noValidate
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
            variant="outlined"
          />
          <TextField
            onChange={(e) => handleChange(e)}
            margin="normal"
            required
            fullWidth
            id="desc"
            label="Description (desc)"
            name="desc"
            variant="outlined"
            multiline
            minRows={5}
          />
          <Stack
            direction="row"
            sx={{ gap: 2, flexDirection: { xs: "column", md: "row" } }}
          >
            <TextField
              size="small"
              sx={{ flex: 2 }}
              onChange={(e) => handleChange(e)}
              margin="normal"
              required
              name="marketPrice"
              label="Market Price"
              id="marketPrice"
              type="number"
              error={inputs.marketPrice < 1}
              helperText={inputs.marketPrice < 1 && "Minimun price is 1"}
              variant="outlined"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />

            <TextField
              size="small"
              sx={{ flex: 2 }}
              onChange={(e) => handleChange(e)}
              margin="normal"
              required
              name="price"
              label="Discounted Price"
              id="price"
              type="number"
              error={inputs.marketPrice < inputs.price}
              helperText={
                inputs.marketPrice < inputs.price &&
                "Discounted price can not be greater than market price"
              }
              variant="outlined"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <TextField
              size="small"
              sx={{ flex: 1 }}
              select
              onChange={(e) => handleChange(e)}
              margin="normal"
              required
              name="unit"
              label="Unit"
              id="unit"
              value={inputs.unit || ""}
              variant="outlined"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Kg">Kg</MenuItem>
              <MenuItem value="Liter">Liter</MenuItem>
              <MenuItem value="Piece">Piece</MenuItem>
              <MenuItem value="Dozen">Dozen</MenuItem>
              <MenuItem value="Pair">Pair</MenuItem>
              <MenuItem value="Box">Box</MenuItem>
            </TextField>
            <TextField
              size="small"
              sx={{ flex: 1 }}
              onChange={(e) => handleChange(e)}
              margin="normal"
              fullWidth
              required
              name="inStock"
              label="Stock (inStock)"
              id="inStock"
              value={inputs.inStock}
              variant="outlined"
              error={inputs.inStock < 0}
              helperText={inputs.inStock < 0 && "Minimun stock is 0"}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography>Categories: </Typography>
            <Select
              closeMenuOnSelect={false}
              options={catList}
              placeholder="Select Categories *"
              isMulti
              name="cat"
              onChange={handleSelectedCats}
            />
          </Stack>
          <Stack direction="row" alignItems="center" gap={2}>
            <Typography>Accept return?</Typography>
            <Checkbox
              checked={inputs.hasMerchantReturnPolicy}
              name="hasMerchantReturnPolicy"
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.checked,
                }))
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </Stack>

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
          {response.message || "Added Successfully"}
        </Alert>
      </Snackbar>
    </>
  );
}
