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
import {
  addSellerProduct,
  getCats,
  getProductsAsSeller,
} from "../redux/apiCalls";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  Container,
  IconButton,
  LinearProgress,
  Link,
  MenuItem,
  Slide,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function AddProduct() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({
    title: "",
    unit: "",
    inStock: 0,
    marketPrice: "",
    price: "",
    seller: user.username,
    hasMerchantReturnPolicy: false,
  });
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState("Add"); //submit button title

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [cat, setCat] = useState([]);
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
    setLoading("Adding");
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
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
          const slug = inputs.title.toLowerCase().split(" ").join("-");
          const tags = inputs.title
            .toLowerCase()
            .replace(/[^a-zA-Z ]/g, "")
            .split(" ");
          const updatedProduct = {
            ...inputs,
            img: downloadURL,
            cat: cat,
            tags: tags,
            slug: slug,
          };
          addSellerProduct(updatedProduct).then((res) => {
            if (res.status === 201) {
              //New product created
              getProductsAsSeller(user.username, dispatch); //refresh productList
              setResponse({ result: "success", message: res.data.message });
              setLoading("Add");
            } else if (res.status === 400) {
              //data velidation failed
              setResponse({
                field: res.data.field,
                result: "error",
                message: res.data.message,
              });
              setLoading("Add");
            } else {
              // No internet or server issue
              setResponse({
                result: "error",
                message: "Failed to connect to the server.",
              });
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
    const tags = inputs.title
      .toLowerCase()
      .replace(/[^a-zA-Z ]/g, "")
      .split(" ");
    const updatedProduct = {
      ...inputs,
      cat: cat,
      tags: tags,
      slug: slug,
    };
    addSellerProduct(updatedProduct).then((res) => {
      if (res.status === 201) {
        //New product created
        getProductsAsSeller(user.username, dispatch); //refresh productList
        setResponse({ result: "success", message: res.data.message });
        setLoading("Add");
      } else if (res.status === 400) {
        //data verification failed
        setResponse({
          field: res.data.field,
          result: "error",
          message: res.data.message,
        });
        setLoading("Add");
      } else {
        // No internet or server down
        setResponse({
          result: "error",
          message: "Please check your internet connection.",
        });
        setLoading("Add");
      }
    });
  };

  return (
    <>
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
            value={inputs.unit || ""}
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
          disabled={loading !== "Add"}
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
