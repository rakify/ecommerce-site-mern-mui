import Carousel from "react-material-ui-carousel";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  CardMedia,
  CardActions,
  Stack,
} from "@mui/material";

import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/apiCalls";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const id = useSelector((state) => state.user.currentUser?._id);

  const productInfo = {
    productId: product._id,
    title: product.title,
    img: product.img,
    quantity: quantity,
    price: product.price,
  };

  const handleQuantity = (type) => {
    if (type === "dec") quantity > 1 && setQuantity(quantity - 1);
    else setQuantity(quantity + 1);
  };

  const handleClick = () => {
    !id && navigate("/login");
    id && addToCart(id, productInfo, dispatch);
  };

  return (
    <Stack
      direction="row"
      sx={{ flexDirection: { xs: "column", sm: "row" } }}
      spacing={2}
      justifyContent="space-between"
    >
      <Stack
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundColor: "whitesmoke",
          flex: 2,
        }}
      >
        <Carousel autoPlay={false} sx={{ width: 300, maxHeight: 400 }}>
          <Card>
            <CardMedia
              height="400"
              component="img"
              image={product.img}
              alt="Image"
              sx={{ objectFit: "contain" }}
            />
          </Card>
        </Carousel>
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: 500, width: 500, flex: 3 }}
      >
        <Typography variant="h4">{product.title}</Typography>
        <Typography variant="h6">
          ৳{product.price} /{product.unit}
        </Typography>
        <Typography variant="h6">Description: {product.desc}</Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: 10, marginBottom: 2 }}
        >
          <Button
            variant="outlined"
            startIcon={<RemoveCircle />}
            onClick={() => handleQuantity("dec")}
          >
            Remove
          </Button>
          <Typography
            variant="h6"
            sx={{ padding: "0 10px", backgroundColor: "white" }}
          >
            {quantity}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddCircle />}
            onClick={() => handleQuantity("inc")}
          >
            Add
          </Button>
        </Stack>

        <Button variant="contained" onClick={handleClick}>
          Add to Cart
        </Button>
      </Stack>
    </Stack>
  );
};

export default Product;
