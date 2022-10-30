import Carousel from "react-material-ui-carousel";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  Stack,
  Container,
  TextField,
  Divider,
  Snackbar,
  Slide,
} from "@mui/material";

import { Link } from "react-router-dom";

import {
  AddCircle,
  GppGood,
  RemoveCircle,
  SecurityUpdateGood,
} from "@mui/icons-material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../../redux/apiCalls";
import Products from "../../components/Products";
import Review from "../../components/Review";
import Question from "../../components/Question";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Product = () => {
  const navigate = useNavigate();
  const productId = useParams().productId;
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
      <Container maxWidth="lg">
        <Stack
          direction="column"
          // sx={{ flexDirection: { xs: "column", sm: "row" } }}
          spacing={2}
          justifyContent="space-between"
        >
          <Typography variant="h4">{product.title}</Typography>

          <Typography variant="subtitle2">ID: {product._id}</Typography>
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
          {/* Reviews will be here */}
          <Review productId={productId} from="" />
          {/* Questions will be here */}
          <Question productId={productId} seller={product.seller} />
          <Stack flex={1} gap={4}>
            <Stack>
              <Typography variant="button">Seller Information</Typography>
              <Divider />
              <Typography variant="button" sx={{ mt: 1 }}>
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
            <Stack>
              <Typography variant="h5">
                <GppGood />
                Top rated seller
              </Typography>
              <Typography>
                Trusted seller, fast shipping and easy returns. You can shop
                with confidence.
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h5">
                <SecurityUpdateGood />
                Money Back Gurantee
              </Typography>
              <Typography>
                Get the product you ordered or get full refund.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <Typography sx={{ mt: 5 }} variant="h5">
        You may also like
      </Typography>
      <Products cat={product.cat[0].value} limit={3} />

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

export default Product;
