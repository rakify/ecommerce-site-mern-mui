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
import { Link } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Item = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#ffffff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  width: 400,
  height: 300,
  margin: 5,
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  width: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  fontWeight: 700,
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
      <Item
        sx={{
          "&:hover": {
            "& .details": {
              opacity: 1,
              height: 30,
            },
          },
        }}
      >
        <Stack
          direction="column"
          sx={{
            flex: 2,
            height: 150,
            width: 200,
            position: "relative",
          }}
        >
          <Img alt="PRODUCT" src={item.img} />
          <Stack
            direction="row"
            justifyContent="space-evenly"
            className="details"
            sx={{
              opacity: 0,
              width: "100%",
              height: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              bgcolor: "white",
              pt: 1,
              position: "absolute",
              bottom: 0,
              color: "black",
              webkitTransition: "all 0.5s linear",
              mozTransition: "all 0.5s linear",
              transition: "all 0.5s linear",
            }}
          >
            <IconButton
              color="primary"
              size="small"
              onClick={handleAddToCart}
              sx={{ "&:hover": { bgcolor: "#CBF1F5", br: "50%" } }}
            >
              <Tooltip title="Add to Cart" placement="top" arrow>
                <ShoppingCartOutlined fontSize="inherit" />
              </Tooltip>
            </IconButton>
            <IconButton
              color="primary"
              size="small"
              onClick={handleAddToWishlist}
              sx={{ "&:hover": { bgcolor: "#CBF1F5", br: "50%" } }}
            >
              <Tooltip title="Add to Wishlist" placement="top" arrow>
                <FavoriteBorderOutlined fontSize="inherit" />
              </Tooltip>
            </IconButton>
            <IconButton
              color="primary"
              size="small"
              href={`/product/${item._id}`}
              sx={{ "&:hover": { bgcolor: "#CBF1F5", br: "50%" } }}
            >
              <Tooltip title="View Details" placement="top" arrow>
                <InfoOutlined fontSize="inherit" />
              </Tooltip>
            </IconButton>
          </Stack>
        </Stack>

        <Link
          href={`/product/${item._id}`}
          underline="none"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            width: 300,
          }}
        >
          <ProductTitle>{item.title}</ProductTitle>
          <Typography sx={{ fontWeight: 600, color: "orangered" }}>
            ৳{item.price}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: 400 }}
          >
            <s>৳{item.marketPrice}</s>{" "}
            <b style={{ fontWeight: 600 }}>
              {Math.round(
                ((item.marketPrice - item.price) / item.marketPrice) * 100
              ) > 0 &&
                Math.round(
                  ((item.marketPrice - item.price) / item.marketPrice) * 100
                ) + "%"}
            </b>
          </Typography>
        </Link>
      </Item>

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
    </Grid>
  );
};

export default Product;
