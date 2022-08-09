import Select from "react-select";
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
  getCats,
  getProductById,
  getProductsAsSeller,
  getSellerProduct,
  updateSellerProduct,
} from "../redux/apiCalls";
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
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function EditProduct({ productId }) {
  const dispatch = useDispatch();
  // get product info from redux
  const product =
    useSelector((state) =>
      state.product.products.find((product) => product._id === productId)
    ) || [];

  const user = useSelector((state) => state.user.currentUser);

  const [inputs, setInputs] = useState({
    title: product.title,
    desc: product.desc,
    marketPrice: product.marketPrice,
    price: product.price,
    inStock: product.inStock,
    unit: product.unit,
    seller: product.seller,
    hasMerchantReturnPolicy: product.hasMerchantReturnPolicy,
  });
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState("Update"); // submit button title

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [cat, setCat] = useState(product.cat);
  const [catList, setCatList] = useState([]);
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
          const slug = inputs.title.toLowerCase().split(" ").join("-");
          const tags = inputs.title
            .toLowerCase()
            .replace(/[^a-zA-Z ]/g, "")
            .split(" ");
          const updatedProduct = {
            ...product,
            ...inputs,
            img: downloadURL,
            tags,
            slug,
            cat,
          };
          updateSellerProduct(productId, updatedProduct, dispatch).then(
            (res) => {
              if (res.status === 200) {
                //all good. product updated with no error
                getProductsAsSeller(user.username, dispatch); //refresh productList
                setResponse({ result: "success", message: res.data.message });
                setLoading("Update");
              } else if (res.status === 400) {
                //data velidation failed
                setResponse({
                  field: res.data.field,
                  result: "error",
                  message: res.data.message,
                });
                setLoading("Update");
              } else {
                // No internet or server issue
                setResponse({
                  result: "error",
                  message: "Failed to connect to the server.",
                });
                setLoading("Update");
              }
            }
          );
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
      tags,
      slug,
      cat,
    };
    updateSellerProduct(productId, updatedProduct, dispatch).then((res) => {
      if (res.status === 200) {
        //all good. product updated with no error
        getProductsAsSeller(user.username, dispatch); //refresh productList
        setResponse({ result: "success", message: res.data.message });
        setLoading("Update");
      } else if (res.status === 400) {
        //data velidation failed
        setResponse({
          field: res.data.field,
          result: "error",
          message: res.data.message,
        });
        setLoading("Update");
      } else {
        // No internet or server issue
        setResponse({
          result: "error",
          message: "Failed to connect to the server.",
        });
        setLoading("Update");
      }
    });
  };

  return (
    <>
      <Avatar
        src={product.img}
        alt=""
        sx={{
          width: { xs: 150, md: 360 },
          height: { xs: 150, md: 320 },
          margin: { xs: 2, md: 4 },
          borderRadius: 0,
        }}
      />
      <Box
        component="form"
        onSubmit={file ? handleSubmitWithFile : handleSubmit}
        noValidate
        sx={{ maxHeight: 500, overflow: "auto", pt: 2, pr: 2 }}
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
          value={inputs.title}
          error={response.field === "title"}
          helperText={response.field === "title" && response.message}
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
          value={inputs.desc}
          error={response.field === "desc"}
          helperText={response.field === "desc" && response.message}
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
            value={inputs.marketPrice}
            error={response.field === "marketPrice"}
            helperText={response.field === "marketPrice" && response.message}
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
            value={inputs.price}
            error={response.field === "price"}
            helperText={response.field === "price" && response.message}
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
            value={inputs.unit}
            variant="outlined"
            error={response.field === "unit"}
            helperText={response.field === "unit" && response.message}
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
            error={response.field === "inStock"}
            helperText={response.field === "inStock" && response.message}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography>Categories: </Typography>
          <Select
            closeMenuOnSelect={false}
            options={catList}
            placeholder="Select Categories *"
            value={cat}
            isMulti
            name="cat"
            onChange={handleSelectedCats}
            styles={{
              control: (styles) => ({
                ...styles,
                borderColor:
                  response.field === "cat" ? "red" : styles.borderColor,
              }),
            }}
          />
          <Typography sx={{ color: "red" }}>
            {response.field === "cat" && response.message}
          </Typography>
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
            sx={{
              width: { xs: 150, md: 360 },
              height: { xs: 150, md: 320 },
              margin: { xs: 2, md: 4 },
              borderRadius: 0,
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
      </Box>
      {/* Display success message */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={Boolean(response.result === "success")}
        TransitionComponent={SlideTransition}
        autoHideDuration={5000}
        onClose={() => setResponse(false)}
      >
        <Alert
          onClose={() => setResponse(false)}
          severity={response.result}
          sx={{ width: "100%" }}
        >
          {response.message}
        </Alert>
      </Snackbar>
    </>
  );
}
