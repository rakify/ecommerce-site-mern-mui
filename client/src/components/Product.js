import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import {
  Button,
  ButtonBase,
  Grid,
  IconButton,
  Paper,
  Slide,
  Snackbar,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  justifyContent: "space-around",
}));

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const Product = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [addedToCartMsg, setAddedToCartMsg] = useState(false);
  const [addedToWishlistMsg, setAddedToWishlistMsg] = useState(false);

  const productInfo = {
    productId: item._id,
    title: item.title,
    img: item.img,
    quantity: 1,
    price: item.price,
  };

  const handleAddToCart = () => {
    !user && navigate("/login");
    user &&
      addToCart(user._id, productInfo, dispatch).then(() => {
        setAddedToCartMsg(true);
      });
  };

  const handleAddToWishlist = () => {
    !user && navigate("/login");
    user &&
      addToWishlist(user._id, productInfo).then(() => {
        setAddedToWishlistMsg(true);
      });
  };

  return (
    <Grid item lg={3} sm={5} xs={10}>
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

      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            "&:hover": {
              "& .details": {
                display: "flex",
                cursor: "pointer",
                ml: { lg: 5, md: 0 },
              },
            },
          }}
        >
          <Item>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ "&:hover": { backgroundColor: "whitesmoke" } }}
            >
              <ButtonBase
                sx={{
                  height: 100,
                  width: 200,
                  transition: "transform 1s",
                  "&:hover": { transform: "scale(1.2)" },
                  margin: 2,
                }}
                href={`/product/${item._id}`}
              >
                <Img
                  alt="PRODUCT"
                  src={item.img}
                  sx={{ maxWidth: 80, maxHeight: 150 }}
                />
              </ButtonBase>
              <Stack direction="column" justifyContent="center">
                <Typography
                  gutterBottom
                  variant="overline"
                  align="center"
                  component="div"
                  sx={{ color: "#34568B" }}
                >
                  <strong>{item.title}</strong>
                </Typography>
                <Typography variant="subtitle1" component="div">
                  <small>
                    <s>৳{item.price + 10}</s>
                  </small>
                  <b>৳{item.price}</b>{" "}
                  <small>{`/${item.unit.toLowerCase()}`}</small>
                </Typography>
              </Stack>

              <Stack
                justifyContent="space-evenly"
                className="details"
                sx={{
                  display: "none",
                }}
              >
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleAddToCart}
                >
                  <ShoppingCartOutlined fontSize="inherit" />
                </IconButton>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={handleAddToWishlist}
                >
                  <FavoriteBorderOutlined fontSize="inherit" />
                </IconButton>
                <IconButton
                  color="primary"
                  size="small"
                  href={`/product/${item._id}`}
                >
                  <InfoOutlined fontSize="inherit" />
                </IconButton>
              </Stack>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Product;
