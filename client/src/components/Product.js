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
  Tooltip,
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

const Item = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#ffffff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  width: 400,
  height: 300,
  margin: 3,
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
          sx={{
            "&:hover": {
              "& .details": {
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                bgcolor: "#CBF1F5",
                flex: 1,
                height: "50%",
                ml: { lg: 1, md: 0 },
              },
            },
          }}
        >
          <Item>
            <Stack sx={{ flex: 3 }} alignItems="center" justifyContent="center">
              <ButtonBase
                sx={{
                  flex: 1,
                  height: 200,
                  width: 300,
                  transition: "transform 1s",
                  "&:hover": { transform: "scale(1.2)" },
                  margin: 2,
                }}
                href={`/product/${item._id}`}
              >
                <Img
                  alt="PRODUCT"
                  src={item.img}
                  sx={{ maxWidth: 200, maxHeight: 150 }}
                />
              </ButtonBase>
              <Stack
                direction="column"
                justifyContent="center"
                sx={{ flex: 1 }}
              >
                <Typography
                  gutterBottom
                  variant="overline"
                  align="center"
                  component="div"
                  sx={{
                    color: "#34568B",
                    fontSize:12,
                  }}
                >
                  {item.title.replace(/^(.{50}[^\s]*).*/, "$1")}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  <small>
                    <s>৳{item.price + 10}</s>
                  </small>
                  <b>৳{item.price}</b>{" "}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              justifyContent="space-evenly"
              className="details"
              sx={{
                flex: 1,
                display: "none",
              }}
            >
              <IconButton
                color="primary"
                size="small"
                onClick={handleAddToCart}
              >
                <Tooltip title="Add to Cart" placement="right" arrow>
                  <ShoppingCartOutlined fontSize="inherit" />
                </Tooltip>
              </IconButton>
              <IconButton
                color="primary"
                size="small"
                onClick={handleAddToWishlist}
              >
                <Tooltip title="Add to Wishlist" placement="right" arrow>
                  <FavoriteBorderOutlined fontSize="inherit" />
                </Tooltip>
              </IconButton>
              <IconButton
                color="primary"
                size="small"
                href={`/product/${item._id}`}
              >
                <Tooltip title="View Details" placement="right" arrow>
                  <InfoOutlined fontSize="inherit" />
                </Tooltip>
              </IconButton>
            </Stack>
          </Item>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Product;
