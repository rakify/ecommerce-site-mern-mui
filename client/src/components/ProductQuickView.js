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
  Container,
  TextField,
  Divider,
  Snackbar,
  Slide,
} from "@mui/material";

import { Link } from "react-router-dom";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../redux/apiCalls";
import Review from "./Review";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const ProductQuickView = ({ productId }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const [addedToCartMsg, setAddedToCartMsg] = useState(false);
  const [addedToWishlistMsg, setAddedToWishlistMsg] = useState(false);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const desc = product.desc.split("\n");

  const user = useSelector((state) => state.user.currentUser);

  const productInfo = {
    productId: product._id,
    title: product.title,
    img: product.img,
    quantity: quantity,
    price: product.price,
    marketPrice: product.marketPrice,
    seller: product.seller,
    hasMerchantReturnPolicy: product.hasMerchantReturnPolicy,
  };

  const handleAddToCart = () => {
    !user._id && navigate("/login");
    user._id &&
      addToCart(user._id, productInfo, dispatch).then(() => {
        setAddedToCartMsg(true);
      });
  };
  const handleAddToWishlist = () => {
    !user._id && navigate("/login");
    user._id &&
      addToWishlist(user._id, productInfo).then(() => {
        setAddedToWishlistMsg(true);
      });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Stack
          direction="column"
          // sx={{ flexDirection: { xs: "column", sm: "row" } }}
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
            justifyContent="flex-start"
            sx={{ height: 500, width: 500, flex: 3 }}
          >
            <Typography variant="h5">
              ৳{product.price} /{product.unit}
            </Typography>
            <Typography variant="subtitle2">
              only {product.inStock} left In stock
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ marginTop: 5, marginBottom: 2, gap: 5 }}
            >
              <TextField
                type="number"
                error={
                  quantity < 1 ||
                  quantity > product.inStock ||
                  quantity % 1 !== 0
                }
                id="quantity"
                label="Quantity"
                value={quantity}
                size="small"
                variant="outlined"
                helperText={
                  (quantity < 1 ||
                    quantity > product.inStock ||
                    quantity % 1 !== 0) &&
                  "Quantity must be greater than 0 & below stock"
                }
                onChange={(e) => setQuantity(e.target.valueAsNumber)}
                sx={{ width: 100 }}
              />
              <Stack gap={1}>
                <Button
                  variant="contained"
                  disabled={
                    quantity < 1 ||
                    quantity > product.inStock ||
                    quantity % 1 !== 0
                  }
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outlined"
                  disabled={
                    quantity < 1 ||
                    quantity > product.inStock ||
                    quantity % 1 !== 0
                  }
                  onClick={handleAddToWishlist}
                >
                  Add to Wishlist
                </Button>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="button">Categories:</Typography>
              {product.cat.map((item) => (
                <Link
                  key={item}
                  to={`/products/${item.value}`}
                  sx={{ mr: 2, textDecoration: "none" }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
            <Typography variant="button">Description:</Typography>
            <Typography variant="body1">
              {desc.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </Typography>
            <li>
              Returns:{" "}
              {product.hasMerchantReturnPolicy
                ? "3 day returns | Buyer pays for return shipping."
                : "This product can not be returned."}
            </li>
          </Stack>
          <Stack flex={1} gap={4}>
            <Stack>
              <Typography>Seller Information</Typography>
              <Divider />
              <Typography sx={{ mt: 1 }}>
                {product.seller}
                <Typography variant="caption">
                  {" "}
                  (95% positive feedback)
                </Typography>
                <Link
                  to={`/shop/${product.seller}`}
                  sx={{ ml: 1, textDecoration: "none" }}
                >
                  [Visit Store]
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={Boolean(addedToCartMsg)}
        TransitionComponent={SlideTransition}
        autoHideDuration={2000}
        onClose={() => setAddedToCartMsg(false)}
        message="Added To Cart"
      />

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={addedToWishlistMsg}
        TransitionComponent={SlideTransition}
        autoHideDuration={2000}
        onClose={() => setAddedToWishlistMsg(false)}
        message="Added To Wishlist"
      />
    </>
  );
};

export default ProductQuickView;
